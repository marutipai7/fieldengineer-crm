/* ============================================================
   Profile & Verification Center — dynamic flow controller
   Pure vanilla JS. No jQuery required.
   ============================================================ */
(function () {
    "use strict";

    if (window.__PV_PROFILE_INITIALIZED__) return;
    window.__PV_PROFILE_INITIALIZED__ = true;

    document.addEventListener("DOMContentLoaded", init);
    if (document.readyState === "interactive" || document.readyState === "complete") {
        init();
    }

    var initialized = false;

    function init() {
        if (initialized) return;
        initialized = true;

        var app = document.getElementById("profileVerificationApp");
        if (!app) {
            console.error("[profile-verification.js] #profileVerificationApp was not found in the DOM.");
            return;
        }

        /* ---------------------------------------------------------
           0. CONFIG & VALIDATION PATTERNS
           --------------------------------------------------------- */
        var STEP_ORDER = ["profileDetails", "identityVerification", "businessInfo", "paymentMethod", "documents"];

        var STEP_META = {
            profileDetails: { label: "Profile Details", formId: "stepProfileDetails" },
            identityVerification: { label: "Identity Verification", formId: "stepIdentityVerification" },
            businessInfo: { label: "Business Information", formId: "stepBusinessInfo" },
            paymentMethod: { label: "Payment Method", formId: "stepPaymentMethod" },
            documents: { label: "Documents", formId: "stepDocuments" }
        };

        var CHECKLIST_META = [
            { key: "email", label: "Email Verified", alwaysTrue: true },
            { key: "mobile", label: "Mobile Verified", alwaysTrue: true },
            { key: "gst", label: "GST Verified", linkedStep: "businessInfo" },
            { key: "company", label: "Company Verified", linkedStep: "documents" },
            { key: "identity", label: "Identity Verified", linkedStep: "identityVerification" }
        ];

        var VALIDATORS = {
            name: {
                regex: /^[A-Za-z\s.'-]+$/,
                minLen: 2,
                msg: "Please enter a valid name (letters only)."
            },
            email: {
                regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                msg: "Please enter a valid email address."
            },
            phone: {
                regex: /^(\+91[\s-]?)?[6-9]\d{9}$/,
                msg: "Please enter a valid 10-digit phone number."
            },
            pincode: {
                regex: /^\d{6}$/,
                msg: "Please enter a valid 6-digit pincode."
            },
            pan: {
                regex: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i,
                msg: "Please enter a valid PAN (e.g. GXBPM1211E)."
            },
            gst: {
                regex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i,
                msg: "Please enter a valid GSTIN number."
            },
            cin: {
                regex: /^[a-zA-Z0-9]{5,21}$/,
                msg: "Please enter a valid Registration Number."
            },
            upi: {
                regex: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
                msg: "Please enter a valid UPI ID (e.g. name@upi)."
            },
            year: {
                regex: /^\d{4}$/,
                msg: "Please enter a valid 4-digit year (e.g. 2020)."
            }
        };

        /* ---------------------------------------------------------
           helpers: $ / $$ / class utils
           --------------------------------------------------------- */
        function $(sel, ctx) { return (ctx || document).querySelector(sel); }
        function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
        function addClass(el, cls) { if (el) el.classList.add.apply(el.classList, cls.split(" ")); }
        function removeClass(el, cls) { if (el) el.classList.remove.apply(el.classList, cls.split(" ")); }
        function toggleClass(el, cls, force) { if (el) el.classList.toggle(cls, force); }
        function escapeHtml(str) {
            var div = document.createElement("div");
            div.textContent = str == null ? "" : str;
            return div.innerHTML;
        }
        function trim(v) { return (v == null ? "" : String(v)).trim(); }
        function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }
        function smoothScrollTo(y) {
            window.scrollTo({ top: y, behavior: "smooth" });
        }

        /* ---------------------------------------------------------
           1. STATE MANAGEMENT
           --------------------------------------------------------- */
        function defaultState() {
            return {
                viewMode: "setup",
                currentStep: STEP_ORDER[0],
                setupComplete: false,
                steps: {
                    profileDetails: false,
                    identityVerification: false,
                    businessInfo: false,
                    paymentMethod: false,
                    documents: false
                },
                data: {
                    profileDetails: {},
                    identityVerification: {},
                    businessInfo: {},
                    paymentMethod: {},
                    documents: {}
                }
            };
        }

        function loadState() {
            return defaultState();
        }

        function saveState() {
            // Frontend session state
        }

        var state = loadState();

        function completedCount() {
            var n = 0;
            STEP_ORDER.forEach(function (s) { if (state.steps[s]) n++; });
            return n;
        }

        function getStepProgressPct(stepKey) {
            if (state.setupComplete) return 100;
            var idx = STEP_ORDER.indexOf(stepKey || state.currentStep);
            if (idx === -1) idx = 0;
            return (idx + 1) * 20; // Step 1: 20%, Step 2: 40%, Step 3: 60%, Step 4: 80%, Step 5: 100%
        }

        function firstIncompleteStep() {
            for (var i = 0; i < STEP_ORDER.length; i++) {
                if (!state.steps[STEP_ORDER[i]]) return STEP_ORDER[i];
            }
            return STEP_ORDER[STEP_ORDER.length - 1];
        }

        /* ---------------------------------------------------------
           2. TOAST MESSAGES
           --------------------------------------------------------- */
        function showToast(message, type, icon) {
            type = type || "default";
            icon = icon || (type === "success" ? "check_circle" : type === "error" ? "error" : "info");
            var container = document.getElementById("pvToastContainer");
            if (!container) return;

            var toast = document.createElement("div");
            toast.className = "pv-toast pv-toast-" + type;
            toast.innerHTML =
                '<span class="material-symbols-outlined">' + icon + "</span>" +
                "<span>" + escapeHtml(message) + "</span>";
            container.appendChild(toast);

            setTimeout(function () {
                toast.classList.add("pv-toast-leaving");
                setTimeout(function () { toast.remove(); }, 200);
            }, 3500);
        }

        /* ---------------------------------------------------------
           3. STEPPER RENDERING (Setup Timeline Stepper)
           --------------------------------------------------------- */
        function renderStepper(mount, opts) {
            if (!mount) return;
            opts = opts || {};
            var allowJump = !!opts.allowJump;
            mount.innerHTML = "";

            STEP_ORDER.forEach(function (stepKey, idx) {
                var meta = STEP_META[stepKey];
                var isComplete = !!state.steps[stepKey];
                var isActive = state.currentStep === stepKey && !isComplete;

                var classes = "pv-step-node";
                if (isComplete) classes += " is-complete";
                if (isActive) classes += " is-active";
                if (allowJump) classes += " is-clickable";

                var node = document.createElement("div");
                node.className = classes;
                node.dataset.step = stepKey;

                // Discrete connector segment between prev step and this step
                if (idx > 0) {
                    var connector = document.createElement("div");
                    connector.className = "pv-node-connector";

                    var prevStepKey = STEP_ORDER[idx - 1];
                    var prevComplete = !!state.steps[prevStepKey];
                    var prevActive = state.currentStep === prevStepKey && !prevComplete;

                    if (prevComplete) {
                        connector.classList.add("connector-complete");
                    } else if (prevActive) {
                        connector.classList.add("connector-active");
                    }
                    node.appendChild(connector);
                }

                // Circle indicator with Material Symbols checkmark for completed
                var circle = document.createElement("div");
                circle.className = "pv-node-circle";
                if (isComplete) {
                    circle.innerHTML = '<span class="material-symbols-outlined text-xs font-bold">check</span>';
                } else {
                    circle.textContent = (idx + 1).toString();
                }
                node.appendChild(circle);

                // Label
                var label = document.createElement("span");
                label.className = "pv-node-label";
                label.textContent = meta.label;
                node.appendChild(label);

                mount.appendChild(node);
            });
        }

        function renderAllSteppers() {
            renderStepper(document.getElementById("dashStepper"), {});
            renderStepper(document.getElementById("wizardStepper"), { allowJump: state.setupComplete });

            var pct = getStepProgressPct(state.currentStep);

            var pctBadge = document.getElementById("profileCompletionPct");
            if (pctBadge) pctBadge.textContent = state.setupComplete ? "100" : pct.toString();

            var wizStatus = document.getElementById("wizardStatusPct");
            if (wizStatus) wizStatus.textContent = pct + "%";

            var wizBar = document.getElementById("wizardStatusBar");
            if (wizBar) wizBar.style.width = pct + "%";

            var counter = document.getElementById("wizardStepCounter");
            if (counter) {
                counter.textContent = "Step " + (STEP_ORDER.indexOf(state.currentStep) + 1) + " of " + STEP_ORDER.length;
            }
        }

        /* ---------------------------------------------------------
           4. VERIFICATION STATUS CARD
           --------------------------------------------------------- */
        function renderVerificationStatus() {
            var anyCompletedStep = false;
            STEP_ORDER.forEach(function(s) { if (state.steps[s]) anyCompletedStep = true; });
            if (!anyCompletedStep && !state.setupComplete) return;

            var list = document.getElementById("verificationChecklist");
            if (!list) return;
            list.innerHTML = "";
            var doneCount = 0;

            CHECKLIST_META.forEach(function (item) {
                var isDone = item.alwaysTrue || (item.linkedStep && state.steps[item.linkedStep]);
                if (isDone) doneCount++;

                var iconWrap = isDone
                    ? '<div class="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">' +
                    '<span class="material-symbols-outlined text-xs font-bold">check</span></div>'
                    : '<div class="w-5 h-5 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">' +
                    '<span class="material-symbols-outlined text-xs">radio_button_unchecked</span></div>';

                var textClass = isDone ? "text-ink" : "text-slate-400";
                var row = document.createElement("div");
                row.className = "flex items-center gap-3";
                row.innerHTML = iconWrap + '<span class="text-sm font-medium ' + textClass + '">' + escapeHtml(item.label) + "</span>";
                list.appendChild(row);
            });

            var pct = Math.round((doneCount / CHECKLIST_META.length) * 100);
            var pctEl = document.getElementById("verificationStatusPct");
            var barEl = document.getElementById("verificationStatusBar");
            var labelEl = document.getElementById("verificationStatusLabel");
            if (pctEl) pctEl.textContent = pct + "%";
            if (barEl) barEl.style.width = pct + "%";
            if (labelEl) {
                labelEl.textContent = pct + "% Completed";
                toggleClass(labelEl, "text-emerald-600", pct === 100);
                toggleClass(labelEl, "text-slate-400", pct !== 100);
            }
        }

        /* ---------------------------------------------------------
           5. DASHBOARD SHELL & DATA RENDERING
           --------------------------------------------------------- */
        function renderDashboardShellState() {
            var banner = document.getElementById("continueSetupBanner");
            var editBtn = document.getElementById("editProfileBtn");
            if (state.setupComplete) {
                addClass(banner, "hidden");
                removeClass(editBtn, "hidden");
            } else {
                removeClass(banner, "hidden");
                removeClass(editBtn, "hidden"); // Both Edit and Continue Setup visible initially
            }
        }

        function todayLabel() {
            return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        }

        function infoBlock(label, value, full) {
            return '<div' + (full ? ' class="md:col-span-4"' : '') + '>' +
                '<p class="text-sm font-semibold text-slate-700">' + escapeHtml(label) + '</p>' +
                '<p class="text-xs text-slate-400 mt-1">' + escapeHtml(value || "—") + '</p></div>';
        }

        function renderDashboardData() {
            var pd = state.data.profileDetails || {};
            var pm = state.data.paymentMethod || {};
            var docs = state.data.documents || {};

            if (state.steps.profileDetails) {
                setText("viewContactPerson", pd.contactName);
                setText("viewPhoneNumber", pd.contactPhone);
                setText("viewEmail", pd.workEmail);
                setText("viewBusinessType", pd.businessType);

                setHtml("viewBusinessInfo",
                    infoBlock("Company Name", pd.companyName) +
                    infoBlock("Business Type", pd.businessType) +
                    infoBlock("Industry Type", pd.industryType) +
                    infoBlock("GST Number", pd.gstNumber) +
                    infoBlock("Pan Number", pd.panNumber) +
                    infoBlock("Company Registration Number", pd.companyRegNumber) +
                    infoBlock("Website", pd.website)
                );
                setHtml("viewOfficeAddress",
                    infoBlock("Address Type", pd.addressType) +
                    infoBlock("Pin code", pd.pinCode) +
                    infoBlock("Phone Number", pd.officePhone) +
                    infoBlock("Land Mark", pd.landmark) +
                    infoBlock("Address", pd.address, true)
                );
                setHtml("viewAuthorizedContact",
                    infoBlock("Name", pd.contactName) +
                    infoBlock("Designation", pd.designation) +
                    infoBlock("Phone Number", pd.contactPhone) +
                    infoBlock("Work Email", pd.workEmail)
                );
            }

            var pmList = document.getElementById("paymentMethodsList");
            if (pmList && state.steps.paymentMethod) {
                pmList.innerHTML = "";
                if (pm.paymentType) {
                    var label = pm.paymentType === "UPI" ? "UPI: " + (pm.upiId || "") : pm.paymentType;
                    pmList.innerHTML =
                        '<div class="flex items-center justify-between border border-slate-100 rounded-xl p-3 bg-white">' +
                        '<div class="flex items-center gap-3">' +
                        '<div class="w-9 h-9 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center text-slate-400">' +
                        '<span class="material-symbols-outlined text-sm">account_balance_wallet</span></div>' +
                        '<div><p class="text-xs font-bold text-ink">' + escapeHtml(label) + '</p>' +
                        '<p class="text-[10px] text-medium mt-0.5">Linked on ' + todayLabel() + '</p></div></div>' +
                        '<span class="material-symbols-outlined text-slate-400 text-sm cursor-pointer">more_vert</span></div>';
                }
            }

            var docBody = document.getElementById("documentsTableBody");
            if (docBody && state.steps.documents) {
                docBody.innerHTML = "";
                var docLabels = ["GST Certificate", "Company PAN Card", "Company Incorporation Certificate", "Address Proof", "Authorized Signatory ID", "Additional Documents"];
                docLabels.forEach(function (docLabel) {
                    var uploaded = docs[docLabel];
                    var status = uploaded
                        ? '<span class="inline-flex items-center px-2.5 py-1 text-xs font-bold bg-pale-mint text-light-green rounded-md border border-emerald-100">Verified</span>'
                        : '<span class="inline-flex items-center px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded-md">Upload</span>';
                    var dateLabel = uploaded ? todayLabel() : "-";
                    var row = document.createElement("tr");
                    row.className = "hover:bg-slate-50/70 transition";
                    row.innerHTML =
                        '<td class="p-3 px-4 font-semibold text-dark-gray">' + escapeHtml(uploaded || docLabel + ".pdf") + '</td>' +
                        '<td class="p-3 px-4 text-center text-dark-gray">' + escapeHtml(docLabel) + '</td>' +
                        '<td class="p-3 px-4 text-center">' + status + '</td>' +
                        '<td class="p-3 px-4 text-center text-dark-gray">' + dateLabel + '</td>' +
                        '<td class="p-3 px-4 text-center text-slate-400">' +
                        (uploaded ? '<span class="material-symbols-outlined text-base cursor-pointer mr-1">visibility</span><span class="material-symbols-outlined text-base cursor-pointer">download</span>' : '<span class="material-symbols-outlined text-base cursor-pointer">upload</span>') +
                        '</td>';
                    docBody.appendChild(row);
                });
            }
        }

        function setText(id, value) {
            var el = document.getElementById(id);
            if (el && value) el.textContent = value;
        }
        function setHtml(id, html) {
            var el = document.getElementById(id);
            if (el) el.innerHTML = html;
        }

        /* ---------------------------------------------------------
           6. WIZARD & EDIT TABS NAVIGATION
           --------------------------------------------------------- */
        function openWizard(stepKey, mode) {
            mode = mode || (state.setupComplete ? "edit" : "setup");
            state.viewMode = mode;
            state.currentStep = stepKey || (mode === "edit" ? STEP_ORDER[0] : firstIncompleteStep());

            addClass(document.getElementById("dashboardView"), "hidden");
            removeClass(document.getElementById("wizardView"), "hidden");

            var setupContainer = document.getElementById("setupStepperContainer");
            var editContainer = document.getElementById("editTabsContainer");

            if (mode === "edit") {
                addClass(setupContainer, "hidden");
                removeClass(editContainer, "hidden");
                updateEditTabsNav(state.currentStep);
            } else {
                removeClass(setupContainer, "hidden");
                addClass(editContainer, "hidden");
            }

            showStep(state.currentStep);
        }

        function updateEditTabsNav(activeStepKey) {
            $$("#editProfileTabsNav .pv-edit-tab").forEach(function (btn) {
                var tab = btn.dataset.tab;
                if (tab === activeStepKey) {
                    addClass(btn, "is-active");
                } else {
                    removeClass(btn, "is-active");
                }
            });
        }

        function closeWizardToDashboard() {
            addClass(document.getElementById("wizardView"), "hidden");
            removeClass(document.getElementById("dashboardView"), "hidden");
            renderAll();
            smoothScrollTo(0);
        }

        function showStep(stepKey) {
            if (!STEP_META[stepKey]) return;
            state.currentStep = stepKey;

            $$(".pv-step").forEach(function (el) { addClass(el, "hidden"); });
            var targetForm = document.getElementById(STEP_META[stepKey].formId);
            if (targetForm) removeClass(targetForm, "hidden");

            populateStepForm(stepKey);

            if (state.viewMode === "edit") {
                updateEditTabsNav(stepKey);
            } else {
                renderAllSteppers();
            }

            var wizardView = document.getElementById("wizardView");
            if (wizardView) {
                var top = wizardView.getBoundingClientRect().top + window.pageYOffset - 20;
                smoothScrollTo(top);
            }
        }

        function goToStepIndex(delta) {
            var idx = STEP_ORDER.indexOf(state.currentStep);
            var nextIdx = idx + delta;
            if (nextIdx < 0) {
                closeWizardToDashboard();
                return;
            }
            if (nextIdx >= STEP_ORDER.length) return;
            showStep(STEP_ORDER[nextIdx]);
        }

        function updatePaymentFieldsVisibility(pval) {
            var upi = document.getElementById("upiDetailsFields");
            var bank = document.getElementById("bankDetailsFields");
            var card = document.getElementById("cardDetailsFields");

            if (upi) toggleClass(upi, "hidden", pval !== "UPI");
            if (bank) toggleClass(bank, "hidden", pval !== "Bank Account");
            if (card) toggleClass(card, "hidden", pval !== "Credit Card" && pval !== "Debit Card");
        }

        /* ---------------------------------------------------------
           7. FORM POPULATION & FIELD VALIDATION
           --------------------------------------------------------- */
        function getOrCreateErrorMsgEl(el) {
            var parent = el.parentElement;
            if (!parent) return null;
            var errEl = $(".pv-error-msg", parent);
            if (!errEl) {
                errEl = document.createElement("span");
                errEl.className = "pv-error-msg text-[11px] font-semibold text-red-500 hidden mt-1 block";
                parent.appendChild(errEl);
            }
            return errEl;
        }

        function showFieldError(el, msg) {
            addClass(el, "pv-input-error");
            var errEl = getOrCreateErrorMsgEl(el);
            if (errEl) {
                errEl.textContent = msg;
                removeClass(errEl, "hidden");
            }
        }

        function clearFieldError(el) {
            removeClass(el, "pv-input-error");
            var errEl = getOrCreateErrorMsgEl(el);
            if (errEl) {
                errEl.textContent = "";
                addClass(errEl, "hidden");
            }
        }

        function validateSingleInput(el) {
            if (!el || !el.name) return true;

            var name = el.name;
            var val = trim(el.value);
            var isRequired = el.getAttribute("data-required") === "true";

            if (isRequired && !val) {
                showFieldError(el, "This field is required.");
                return false;
            }

            if (!val && !isRequired) {
                clearFieldError(el);
                return true;
            }

            var fieldType = null;
            if (["contactName", "idFullName"].indexOf(name) !== -1) fieldType = "name";
            else if (["workEmail", "email"].indexOf(name) !== -1 || el.type === "email") fieldType = "email";
            else if (["contactPhone", "officePhone"].indexOf(name) !== -1) fieldType = "phone";
            else if (["pinCode", "biPincode"].indexOf(name) !== -1) fieldType = "pincode";
            else if (["panNumber", "biPan"].indexOf(name) !== -1) fieldType = "pan";
            else if (["gstNumber", "gstin"].indexOf(name) !== -1) fieldType = "gst";
            else if (["companyRegNumber", "cin"].indexOf(name) !== -1) fieldType = "cin";
            else if (name === "upiId") fieldType = "upi";
            else if (name === "yearEstablished") fieldType = "year";

            if (fieldType && VALIDATORS[fieldType]) {
                var v = VALIDATORS[fieldType];
                if (!v.regex.test(val) || (v.minLen && val.length < v.minLen)) {
                    showFieldError(el, v.msg);
                    return false;
                }
            }

            clearFieldError(el);
            return true;
        }

        function validateStep(stepKey, form) {
            var valid = true;
            var firstInvalid = null;

            $$("input[name], select[name], textarea[name]", form).forEach(function (el) {
                if (el.type === "file" || el.type === "hidden") return;
                var fieldValid = validateSingleInput(el);
                if (!fieldValid) {
                    valid = false;
                    if (!firstInvalid) firstInvalid = el;
                }
            });

            $$("[data-required='true']", form).forEach(function (el) {
                if (el.type === "file") {
                    var docCard = el.closest(".pv-doc-upload");
                    var docName = docCard ? docCard.dataset.doc : null;
                    var container = el.closest(".pv-upload-drop, .pv-doc-upload");
                    var alreadySaved = docName
                        ? (state.data.documents || {})[docName]
                        : (container && container.classList.contains("has-file"));
                    var val = alreadySaved ? "x" : "";

                    if (!val) {
                        valid = false;
                        var errTarget = container || el;
                        addClass(errTarget, "pv-input-error");
                        if (!firstInvalid) firstInvalid = errTarget;
                    } else {
                        removeClass(container || el, "pv-input-error");
                    }
                }
            });

            if (!valid) {
                showToast("Please fix errors in highlighted fields before continuing.", "error");
                if (firstInvalid) {
                    var top = firstInvalid.getBoundingClientRect().top + window.pageYOffset - 120;
                    smoothScrollTo(top);
                }
            }
            return valid;
        }

        function validateUploadedFile(file) {
            if (!file || !file.name) return false;
            var allowedExts = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"];
            var fileName = file.name;
            var ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
            return allowedExts.indexOf(ext) !== -1;
        }

        function populateStepForm(stepKey) {
            var form = document.getElementById(STEP_META[stepKey].formId);
            if (!form) return;
            var saved = state.data[stepKey] || {};

            $$("input[name], select[name], textarea[name]", form).forEach(function (el) {
                var name = el.name;
                if (name in saved) el.value = saved[name];
                clearFieldError(el);
            });

            if (stepKey === "identityVerification") {
                var vType = saved.verificationType || "Aadhaar Card";
                $$("#idTypeOptions button").forEach(function (btn) {
                    removeClass(btn, "is-selected border-primary-yellow bg-yellow-50/40");
                    addClass(btn, "border-slate-200");
                });
                var activeIdBtn = $("#idTypeOptions button[data-value='" + vType + "']");
                if (activeIdBtn) {
                    removeClass(activeIdBtn, "border-slate-200");
                    addClass(activeIdBtn, "is-selected border-primary-yellow bg-yellow-50/40");
                }
                var vTypeInput = $("input[name='verificationType']");
                if (vTypeInput) vTypeInput.value = vType;
            }

            if (stepKey === "paymentMethod") {
                var pType = saved.paymentType || "UPI";
                $$("#paymentTypeOptions button").forEach(function (btn) {
                    removeClass(btn, "is-selected border-primary-yellow bg-yellow-50/40");
                    addClass(btn, "border-slate-200");
                });
                var activePmBtn = $("#paymentTypeOptions button[data-value='" + pType + "']");
                if (activePmBtn) {
                    removeClass(activePmBtn, "border-slate-200");
                    addClass(activePmBtn, "is-selected border-primary-yellow bg-yellow-50/40");
                }
                var pTypeInput = $("input[name='paymentType']");
                if (pTypeInput) pTypeInput.value = pType;
                updatePaymentFieldsVisibility(pType);
            }

            if (stepKey === "documents") {
                $$(".pv-doc-upload", form).forEach(function (card) {
                    var docName = card.dataset.doc;
                    var statusEl = $(".pv-doc-status", card);
                    var fileNameEl = $(".pv-file-name", card);
                    if (saved[docName]) {
                        addClass(card, "is-uploaded");
                        if (statusEl) {
                            statusEl.className = "pv-doc-status inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200";
                            statusEl.innerHTML = '<span class="material-symbols-outlined text-xs font-bold">check</span> UPLOADED';
                        }
                        if (fileNameEl) fileNameEl.textContent = saved[docName];
                    }
                });
            }
        }

        function collectStepData(stepKey, form) {
            var out = state.data[stepKey] ? deepClone(state.data[stepKey]) : {};
            $$("input[type='text'], input[type='email'], input[type='hidden'], select, textarea", form).forEach(function (el) {
                if (el.name) out[el.name] = el.value;
            });
            return out;
        }

        /* ---------------------------------------------------------
           8. STEP SUBMIT HANDLERS
           --------------------------------------------------------- */
        function handleStepSubmit(stepKey, form) {
            if (!validateStep(stepKey, form)) return;

            state.data[stepKey] = collectStepData(stepKey, form);
            state.steps[stepKey] = true;

            var idx = STEP_ORDER.indexOf(stepKey);
            var isLastStep = idx === STEP_ORDER.length - 1;

            if (state.viewMode === "edit") {
                renderDashboardData();
                renderVerificationStatus();
                showToast(STEP_META[stepKey].label + " updated successfully.", "success");
            } else {
                if (isLastStep) {
                    finishSetup();
                } else {
                    showToast(STEP_META[stepKey].label + " saved.", "success");
                    showStep(STEP_ORDER[idx + 1]);
                }
            }
        }

        function finishSetup() {
            state.setupComplete = true;
            renderAll();
            showToast("Profile submitted for verification successfully!", "success", "task_alt");
            closeWizardToDashboard();
        }

        /* ---------------------------------------------------------
           9. EVENT BINDINGS & REAL-TIME INPUT RESTRICTIONS
           --------------------------------------------------------- */
        function bindEvents() {
            app.addEventListener("keydown", function (e) {
                var el = e.target;
                if (el.tagName !== "INPUT") return;
                var name = el.name;

                var isControlKey = e.key === "Backspace" || e.key === "Delete" || e.key === "Tab" ||
                    e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "Home" || e.key === "End" ||
                    e.ctrlKey || e.metaKey;

                if (isControlKey) return;

                var isNumericField = ["contactPhone", "officePhone", "pinCode", "biPincode", "idNumber", "yearEstablished", "cardNumber", "cardCvv", "bankAccountNumber"].indexOf(name) !== -1;
                if (isNumericField) {
                    if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                        return;
                    }
                }

                var isNameField = ["contactName", "idFullName", "bankAccountName", "cardName"].indexOf(name) !== -1;
                if (isNameField) {
                    if (/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                        return;
                    }
                }
            });

            app.addEventListener("input", function (e) {
                var el = e.target;
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                    var name = el.name;

                    if (["contactPhone", "officePhone", "pinCode", "biPincode", "idNumber", "yearEstablished", "cardNumber", "cardCvv", "bankAccountNumber"].indexOf(name) !== -1) {
                        el.value = el.value.replace(/\D/g, "");
                    } else if (["contactName", "idFullName", "bankAccountName", "cardName"].indexOf(name) !== -1) {
                        el.value = el.value.replace(/[^A-Za-z\s.'-]/g, "");
                    } else if (["panNumber", "biPan", "gstNumber", "gstin", "companyRegNumber", "cin", "bankIfsc"].indexOf(name) !== -1) {
                        el.value = el.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
                    }

                    validateSingleInput(el);
                }
            });

            app.addEventListener("blur", function (e) {
                var el = e.target;
                if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
                    validateSingleInput(el);
                }
            }, true);

            app.addEventListener("click", function (e) {
                if (e.target.closest("#continueSetupBtn")) {
                    openWizard(null, "setup");
                    return;
                }

                if (e.target.closest("#editProfileBtn")) {
                    openWizard(null, "edit");
                    return;
                }

                if (e.target.closest("#closeEditBtn")) {
                    closeWizardToDashboard();
                    return;
                }

                var editTabBtn = e.target.closest("#editProfileTabsNav .pv-edit-tab");
                if (editTabBtn) {
                    var tabKey = editTabBtn.dataset.tab;
                    showStep(tabKey);
                    return;
                }

                var backBtn = e.target.closest(".pv-back-btn");
                if (backBtn) {
                    if (state.viewMode === "edit") {
                        closeWizardToDashboard();
                    } else {
                        goToStepIndex(-1);
                    }
                    return;
                }

                var idTypeBtn = e.target.closest("#idTypeOptions button");
                if (idTypeBtn) {
                    var val = idTypeBtn.dataset.value;
                    $$("#idTypeOptions button").forEach(function (btn) {
                        removeClass(btn, "is-selected border-primary-yellow bg-yellow-50/40");
                        addClass(btn, "border-slate-200");
                    });
                    removeClass(idTypeBtn, "border-slate-200");
                    addClass(idTypeBtn, "is-selected border-primary-yellow bg-yellow-50/40");
                    var vTypeInput = $("input[name='verificationType']");
                    if (vTypeInput) vTypeInput.value = val;
                    return;
                }

                var pmTypeBtn = e.target.closest("#paymentTypeOptions button");
                if (pmTypeBtn) {
                    var pval = pmTypeBtn.dataset.value;
                    $$("#paymentTypeOptions button").forEach(function (btn) {
                        removeClass(btn, "is-selected border-primary-yellow bg-yellow-50/40");
                        addClass(btn, "border-slate-200");
                    });
                    removeClass(pmTypeBtn, "border-slate-200");
                    addClass(pmTypeBtn, "is-selected border-primary-yellow bg-yellow-50/40");
                    var pTypeInput = $("input[name='paymentType']");
                    if (pTypeInput) pTypeInput.value = pval;
                    updatePaymentFieldsVisibility(pval);
                    return;
                }

                var stepNode = e.target.closest(".pv-step-node.is-clickable");
                if (stepNode && state.viewMode === "setup") {
                    showStep(stepNode.dataset.step);
                    return;
                }

                if (e.target.closest("#profilePhotoWrapper")) {
                    var input = document.getElementById("profileImageInput");
                    if (input) input.click();
                    return;
                }

                if (e.target.closest("#addPaymentMethodBtn")) {
                    openWizard("paymentMethod", state.setupComplete ? "edit" : "setup");
                    return;
                }
            });

            app.addEventListener("submit", function (e) {
                var form = e.target.closest(".pv-step");
                if (!form) return;
                e.preventDefault();
                handleStepSubmit(form.dataset.step, form);
            });

            app.addEventListener("change", function (e) {
                var fileInput = e.target;
                if (fileInput.type !== "file") return;

                if (fileInput.id === "profileImageInput") {
                    var imgFile = fileInput.files && fileInput.files[0];
                    if (!imgFile) return;
                    var reader = new FileReader();
                    reader.onload = function (ev) {
                        var img = document.getElementById("profileImage");
                        if (img) img.src = ev.target.result;
                    };
                    reader.readAsDataURL(imgFile);
                    return;
                }

                var docFile = fileInput.files && fileInput.files[0];
                if (!docFile) return;

                if (!validateUploadedFile(docFile)) {
                    fileInput.value = "";
                    showToast("Invalid file format. Please upload a PDF, Word or Image document (.pdf, .doc, .docx, .png, .jpg).", "error");
                    
                    var container = fileInput.closest(".pv-upload-drop, .pv-doc-upload");
                    if (container) {
                        addClass(container, "pv-input-error");
                    }
                    return;
                }

                var dropWrap = fileInput.closest(".pv-upload-drop");
                if (dropWrap) {
                    addClass(dropWrap, "has-file");
                    removeClass(dropWrap, "pv-input-error");
                    var fnEl = $(".pv-file-name", dropWrap);
                    if (fnEl) fnEl.textContent = docFile.name;
                    return;
                }

                var docCard = fileInput.closest(".pv-doc-upload");
                if (docCard) {
                    var docName = docCard.dataset.doc;
                    addClass(docCard, "is-uploaded");
                    removeClass(docCard, "pv-input-error");
                    var statusEl = $(".pv-doc-status", docCard);
                    var nameEl = $(".pv-file-name", docCard);
                    if (statusEl) {
                        statusEl.className = "pv-doc-status inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200";
                        statusEl.innerHTML = '<span class="material-symbols-outlined text-xs font-bold">check</span> UPLOADED';
                    }
                    if (nameEl) nameEl.textContent = docFile.name;
                    state.data.documents[docName] = docFile.name;
                    return;
                }
            });
        }

        /* ---------------------------------------------------------
           10. MASTER RENDER & INIT
           --------------------------------------------------------- */
        function renderAll() {
            renderDashboardShellState();
            renderAllSteppers();
            renderVerificationStatus();
            renderDashboardData();
        }

        bindEvents();
        renderAll();

        window.PVProfile = {
            getState: function () { return deepClone(state); },
            resetState: function () {
                state = defaultState();
                closeWizardToDashboard();
            },
            openWizard: openWizard
        };
    }
})();