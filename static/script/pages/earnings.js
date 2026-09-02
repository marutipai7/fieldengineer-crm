 (function () {
        var dashboardPage = document.getElementById('feDashboardPage');
        var transactionsPage = document.getElementById('feTransactionsPage');
        var invoicesPage = document.getElementById('feInvoicesPage');
        var overlay = document.getElementById('feStatementOverlay');
        var allPages = [dashboardPage, transactionsPage, invoicesPage];

        /* ---------------- page switching ---------------- */
        function goTo(page) {
            allPages.forEach(function (p) { p.classList.remove('is-active'); });
            page.classList.add('is-active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        function showTransactions() {
            goTo(transactionsPage);
            if (!txInitialized) initTransactionsList();
        }
        function showInvoices() {
            goTo(invoicesPage);
            if (!invInitialized) initInvoicesList();
        }
        function showDashboard() { goTo(dashboardPage); }
        function openStatement() { overlay.classList.add('is-open'); }
        function closeStatement() { overlay.classList.remove('is-open'); }

        document.querySelectorAll('[data-fe-view-all], #feOpenTransactions').forEach(function (el) {
            el.addEventListener('click', showTransactions);
        });
        document.querySelectorAll('[data-fe-view-invoices]').forEach(function (el) {
            el.addEventListener('click', showInvoices);
        });
        document.querySelectorAll('[data-fe-back]').forEach(function (el) {
            el.addEventListener('click', showDashboard);
        });
        document.querySelectorAll('[data-fe-open-statement]').forEach(function (el) {
            el.addEventListener('click', openStatement);
        });
        document.querySelectorAll('[data-fe-close-statement]').forEach(function (el) {
            el.addEventListener('click', closeStatement);
        });
        overlay.addEventListener('click', function (e) { if (e.target === overlay) closeStatement(); });

        /* ---------------- payment method modals: choose / add / edit card ---------------- */
        var choosePmOverlay = document.getElementById('feChoosePmOverlay');
        var addCardOverlay = document.getElementById('feAddCardOverlay');
        var editCardOverlay = document.getElementById('feEditCardOverlay');

        function openChoosePm() { choosePmOverlay.classList.add('is-open'); }
        function closeChoosePm() { choosePmOverlay.classList.remove('is-open'); }
        function openAddCard() { addCardOverlay.classList.add('is-open'); }
        function closeAddCard() { addCardOverlay.classList.remove('is-open'); }
        function openEditCard(cardName) {
            var nameInput = document.getElementById('feEditCardName');
            if (nameInput) nameInput.value = cardName || '';
            editCardOverlay.classList.add('is-open');
        }
        function closeEditCard() { editCardOverlay.classList.remove('is-open'); }

        var upiOverlay = document.getElementById('feUpiOverlay');
        var netBankingOverlay = document.getElementById('feNetBankingOverlay');
        var walletOverlay = document.getElementById('feWalletOverlay');
        var invoiceOverlay = document.getElementById('feInvoiceOverlay');

        function openUpi(mode, name) {
            document.getElementById('feUpiModalTitle').textContent = mode === 'edit' ? 'Edit UPI ID' : 'Add UPI ID';
            document.getElementById('feUpiSubmitBtn').textContent = mode === 'edit' ? 'Save Changes' : 'Verify & Save';
            var input = document.getElementById('feUpiInput');
            input.value = mode === 'edit' ? (name || '') : '';
            input.style.borderColor = mode === 'edit' ? 'var(--gold)' : '';
            upiOverlay.classList.add('is-open');
        }
        function closeUpi() { upiOverlay.classList.remove('is-open'); }

        function openNetBanking(mode, name) {
            document.getElementById('feNetBankingModalTitle').textContent = mode === 'edit' ? 'Edit Net Banking Details' : 'Add Net Banking Details';
            var nameInput = document.getElementById('feNetBankingName');
            nameInput.value = mode === 'edit' ? (name || '') : '';
            netBankingOverlay.querySelectorAll('.fe-form-field input, .fe-select').forEach(function (field) {
                field.style.borderColor = mode === 'edit' ? 'var(--gold)' : '';
            });
            netBankingOverlay.classList.add('is-open');
        }
        function closeNetBanking() { netBankingOverlay.classList.remove('is-open'); }

        function openWallet() { walletOverlay.classList.add('is-open'); }
        function closeWallet() { walletOverlay.classList.remove('is-open'); }

        function openInvoice() { invoiceOverlay.classList.add('is-open'); }
        function closeInvoice() { invoiceOverlay.classList.remove('is-open'); }

        document.querySelectorAll('[data-fe-open-choose-pm]').forEach(function (el) {
            el.addEventListener('click', openChoosePm);
        });
        document.querySelectorAll('[data-fe-close-choose-pm]').forEach(function (el) {
            el.addEventListener('click', closeChoosePm);
        });
        choosePmOverlay.addEventListener('click', function (e) { if (e.target === choosePmOverlay) closeChoosePm(); });

        document.querySelectorAll('[data-fe-close-add-card]').forEach(function (el) {
            el.addEventListener('click', closeAddCard);
        });
        addCardOverlay.addEventListener('click', function (e) { if (e.target === addCardOverlay) closeAddCard(); });

        document.querySelectorAll('[data-fe-close-edit-card]').forEach(function (el) {
            el.addEventListener('click', closeEditCard);
        });
        editCardOverlay.addEventListener('click', function (e) { if (e.target === editCardOverlay) closeEditCard(); });

        document.querySelectorAll('[data-fe-close-upi]').forEach(function (el) { el.addEventListener('click', closeUpi); });
        upiOverlay.addEventListener('click', function (e) { if (e.target === upiOverlay) closeUpi(); });

        document.querySelectorAll('[data-fe-close-netbanking]').forEach(function (el) { el.addEventListener('click', closeNetBanking); });
        netBankingOverlay.addEventListener('click', function (e) { if (e.target === netBankingOverlay) closeNetBanking(); });

        document.querySelectorAll('[data-fe-close-wallet]').forEach(function (el) { el.addEventListener('click', closeWallet); });
        walletOverlay.addEventListener('click', function (e) { if (e.target === walletOverlay) closeWallet(); });

        document.querySelectorAll('[data-fe-close-invoice]').forEach(function (el) { el.addEventListener('click', closeInvoice); });
        invoiceOverlay.addEventListener('click', function (e) { if (e.target === invoiceOverlay) closeInvoice(); });

        /* clicking the download icon anywhere (static or dynamically rendered rows) opens the invoice popup */
        document.addEventListener('click', function (e) {
            if (e.target.closest('[data-fe-open-invoice]')) openInvoice();
        });

        document.querySelectorAll('[data-fe-pm-option]').forEach(function (el) {
            el.addEventListener('click', function () {
                document.querySelectorAll('[data-fe-pm-option]').forEach(function (o) { o.classList.remove('selected'); });
                el.classList.add('selected');
                var type = el.getAttribute('data-fe-pm-option');
                if (type === 'card') { closeChoosePm(); openAddCard(); }
                else if (type === 'upi') { closeChoosePm(); openUpi('add'); }
                else if (type === 'netbanking') { closeChoosePm(); openNetBanking('add'); }
                else if (type === 'wallet') { closeChoosePm(); openWallet(); }
            });
        });

        document.querySelectorAll('[data-fe-wallet-option]').forEach(function (el) {
            el.addEventListener('click', function () {
                document.querySelectorAll('[data-fe-wallet-option]').forEach(function (o) { o.classList.remove('selected'); });
                el.classList.add('selected');
            });
        });

        document.querySelectorAll('[data-fe-card-tab]').forEach(function (el) {
            el.addEventListener('click', function () {
                el.parentElement.querySelectorAll('.fe-card-tab').forEach(function (o) { o.classList.remove('active'); });
                el.classList.add('active');
            });
        });

        /* three-dot dropdown menus on each payment method row */
        document.querySelectorAll('[data-fe-pm-menu]').forEach(function (menuBtn) {
            menuBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                var dropdown = menuBtn.parentElement.querySelector('[data-fe-pm-dropdown]');
                var wasOpen = dropdown.classList.contains('is-open');
                document.querySelectorAll('[data-fe-pm-dropdown]').forEach(function (d) { d.classList.remove('is-open'); });
                if (!wasOpen) dropdown.classList.add('is-open');
            });
        });
        document.addEventListener('click', function () {
            document.querySelectorAll('[data-fe-pm-dropdown]').forEach(function (d) { d.classList.remove('is-open'); });
        });
        document.querySelectorAll('[data-fe-edit-method]').forEach(function (el) {
            el.addEventListener('click', function () {
                var type = el.getAttribute('data-method-type');
                var name = el.getAttribute('data-card-name');
                if (type === 'netbanking') openNetBanking('edit', name);
                else if (type === 'upi') openUpi('edit', name);
                else openEditCard(name);
            });
        });

        document.querySelectorAll('[data-fe-format]').forEach(function (el) {
            el.addEventListener('click', function () {
                document.querySelectorAll('[data-fe-format]').forEach(function (o) { o.classList.remove('selected'); });
                el.classList.add('selected');
                el.querySelector('input').checked = true;
            });
        });
        document.querySelectorAll('[data-fe-chip]').forEach(function (el) {
            el.addEventListener('click', function () {
                document.querySelectorAll('[data-fe-chip]').forEach(function (o) { o.classList.remove('active'); });
                el.classList.add('active');
            });
        });
        document.querySelectorAll('.fe-tab').forEach(function (el) {
            el.addEventListener('click', function (e) {
                var scope = el.closest('.fe-tabs');
                scope.querySelectorAll('.fe-tab').forEach(function (o) { o.classList.remove('active'); });
                el.classList.add('active');
            });
        });

        /* ---------------- transactions list + working pagination ---------------- */
        var txInitialized = false;
        var PAGE_SIZE = 7;
        var txData = buildTxData();

        function buildTxData() {
            var jobs = [
                { icon: '🏢', color: 'var(--blue)', title: 'Network Cabling Setup', tag: 'Field engineering', amount: 1800, method: 'Bank Transfer', payType: 'Job Payout' },
                { icon: '🖥️', color: 'var(--purple)', title: 'Server Installation', tag: 'Field engineering', amount: 2400, method: 'UPI - PhonePe', payType: 'Advance Payment' },
                { icon: '📶', color: 'var(--teal)', title: 'Wi-Fi Access Point Setup', tag: 'Field engineering', amount: 950, method: 'Bank Transfer', payType: 'Job Payout' },
                { icon: '🗄️', color: 'var(--gold)', title: 'Structured Cabling Installation', tag: 'Field engineering', amount: 3580, method: 'Bank Transfer', payType: 'Job Payout' },
                { icon: '🔲', color: 'var(--pink)', title: 'Patch Panel Installation', tag: 'Field engineering', amount: 750, method: 'Bank Transfer', payType: 'Job Payout' },
                { icon: '🎥', color: 'var(--blue)', title: 'Security Camera Installation', tag: 'Field engineering', amount: 1150, method: 'Google Pay', payType: 'Advance Payment' },
                { icon: '🗃️', color: 'var(--purple)', title: 'Server Rack Setup', tag: 'Field engineering', amount: 2099, method: 'Bank Transfer', payType: 'Job Payout' }
            ];
            var statuses = ['paid', 'paid', 'paid', 'paid', 'pending', 'pending', 'refunded'];
            var rows = [];
            var total = 27;
            var startDate = new Date(2026, 4, 24); // 24 May 2026, walking backwards
            for (var i = 0; i < total; i++) {
                var job = jobs[i % jobs.length];
                var d = new Date(startDate.getTime() - i * 2 * 24 * 60 * 60 * 1000);
                rows.push({
                    icon: job.icon,
                    color: job.color,
                    title: job.title,
                    code: '#GH-' + (6521 - i),
                    tag: job.tag,
                    date: d,
                    method: job.method,
                    payType: job.payType,
                    amount: job.amount + (i % 5) * 25,
                    status: statuses[i % statuses.length]
                });
            }
            return rows;
        }

        function formatDate(d) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return (d.getDate() < 10 ? '0' : '') + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
        }
        function statusPill(status) {
            if (status === 'paid') return '<span class="fe-pill paid">Paid</span>';
            if (status === 'pending') return '<span class="fe-pill pending">Pending</span>';
            return '<span class="fe-pill refunded">Refunded</span>';
        }

        var currentPage = 1;

        function renderTxPage(page) {
            var totalPages = Math.max(1, Math.ceil(txData.length / PAGE_SIZE));
            page = Math.min(Math.max(1, page), totalPages);
            currentPage = page;

            var start = (page - 1) * PAGE_SIZE;
            var pageItems = txData.slice(start, start + PAGE_SIZE);

            var body = document.getElementById('feTxListBody');
            body.innerHTML = pageItems.map(function (t) {
                return (
                    '<div class="fe-tx-list-row">' +
                    '<div class="fe-service-cell">' +
                    '<div class="fe-tx-icon" style="background:' + t.color + ';">' + t.icon + '</div>' +
                    '<div><p class="fe-service-name">' + t.title + '</p><p class="fe-service-sub">' + t.code + ' · ' + t.tag + '</p></div>' +
                    '</div>' +
                    '<div><div class="fe-cell-label">Booking date</div><div class="fe-cell-value">' + formatDate(t.date) + '</div></div>' +
                    '<div><div class="fe-cell-label">' + t.payType + '</div><div class="fe-cell-value">' + t.method + '</div></div>' +
                    '<div><div class="fe-cell-value">$' + t.amount.toLocaleString() + '</div></div>' +
                    '<div>' + statusPill(t.status) + '</div>' +
                    '</div>'
                );
            }).join('');

            var showingEnd = Math.min(start + PAGE_SIZE, txData.length);
            document.getElementById('feTxShowingText').textContent =
                'Showing ' + (start + 1) + ' to ' + showingEnd + ' of ' + txData.length + ' transactions';

            renderPager(totalPages);
        }

        function renderPager(totalPages) {
            var pager = document.getElementById('feTxPager');
            var html = '<button class="fe-page-btn" type="button" data-page="prev"' + (currentPage === 1 ? ' disabled' : '') + '>‹</button>';
            for (var p = 1; p <= totalPages; p++) {
                html += '<button class="fe-page-btn' + (p === currentPage ? ' active' : '') + '" type="button" data-page="' + p + '">' + p + '</button>';
            }
            html += '<button class="fe-page-btn" type="button" data-page="next"' + (currentPage === totalPages ? ' disabled' : '') + '>›</button>';
            pager.innerHTML = html;

            pager.querySelectorAll('.fe-page-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var val = btn.getAttribute('data-page');
                    if (val === 'prev') renderTxPage(currentPage - 1);
                    else if (val === 'next') renderTxPage(currentPage + 1);
                    else renderTxPage(parseInt(val, 10));
                    transactionsPage.querySelector('.fe-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        }

        function initTransactionsList() {
            txInitialized = true;
            renderTxPage(1);
        }

        /* ---------------- invoices list + working pagination ---------------- */
        var invInitialized = false;
        var invPageSize = 10;
        var invCurrentPage = 1;
        var invData = buildInvData();

        function buildInvData() {
            var services = [
                { desc: 'Network Cabling', amount: 5730 },
                { desc: 'Rack Installation', amount: 5730 },
                { desc: 'CCTV Installation', amount: 5730 },
                { desc: 'Fiber Optic', amount: 5730 },
                { desc: 'Wi-Fi Access Point Setup', amount: 4200 },
                { desc: 'Server Installation', amount: 6100 },
                { desc: 'Structured Cabling', amount: 7300 }
            ];
            var statuses = ['completed', 'completed', 'completed', 'pending', 'pending'];
            var rows = [];
            var total = 27;
            var startDate = new Date(2026, 4, 15); // 15 May 2026, walking backwards
            for (var i = 0; i < total; i++) {
                var svc = services[i % services.length];
                var d = new Date(startDate.getTime() - i * 3 * 24 * 60 * 60 * 1000);
                rows.push({
                    id: 'INV-2026-' + String(i + 1).padStart(3, '0'),
                    type: 'Payout',
                    desc: svc.desc,
                    amount: svc.amount,
                    date: d,
                    status: statuses[i % statuses.length]
                });
            }
            return rows;
        }

        function invStatusPill(status) {
            return status === 'completed'
                ? '<span class="fe-pill paid">Completed</span>'
                : '<span class="fe-pill pending">Pending</span>';
        }

        function renderInvPage(page) {
            var totalPages = Math.max(1, Math.ceil(invData.length / invPageSize));
            page = Math.min(Math.max(1, page), totalPages);
            invCurrentPage = page;

            var start = (page - 1) * invPageSize;
            var pageItems = invData.slice(start, start + invPageSize);

            var body = document.getElementById('feInvListBody');
            body.innerHTML = pageItems.map(function (inv) {
                return (
                    '<tr>' +
                    '<td>' + inv.id + '</td>' +
                    '<td>' + inv.type + '</td>' +
                    '<td>' + inv.desc + '</td>' +
                    '<td>Rs. ' + inv.amount.toLocaleString() + '</td>' +
                    '<td>' + invStatusPill(inv.status) + '</td>' +
                    '<td>' + formatDate(inv.date) + '</td>' +
                    '<td class="fe-action-icons"><span>👁</span><span data-fe-open-invoice>⬇</span></td>' +
                    '</tr>'
                );
            }).join('');

            var showingEnd = Math.min(start + invPageSize, invData.length);
            document.getElementById('feInvShowingText').textContent =
                'Showing ' + (start + 1) + ' to ' + showingEnd + ' of ' + invData.length + ' invoices';

            renderInvPager(totalPages);
        }

        function renderInvPager(totalPages) {
            var pager = document.getElementById('feInvPager');
            var pageNumbers = [];
            for (var p = 1; p <= totalPages; p++) {
                if (p === 1 || p === totalPages || Math.abs(p - invCurrentPage) <= 1) {
                    pageNumbers.push(p);
                } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
                    pageNumbers.push('...');
                }
            }

            var html = '<button class="fe-page-btn" type="button" data-page="prev"' + (invCurrentPage === 1 ? ' disabled' : '') + '>‹</button>';
            pageNumbers.forEach(function (p) {
                if (p === '...') {
                    html += '<span class="fe-page-ellipsis">…</span>';
                } else {
                    html += '<button class="fe-page-btn' + (p === invCurrentPage ? ' active' : '') + '" type="button" data-page="' + p + '">' + p + '</button>';
                }
            });
            html += '<button class="fe-page-btn" type="button" data-page="next"' + (invCurrentPage === totalPages ? ' disabled' : '') + '>›</button>';
            pager.innerHTML = html;

            pager.querySelectorAll('.fe-page-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var val = btn.getAttribute('data-page');
                    if (val === 'prev') renderInvPage(invCurrentPage - 1);
                    else if (val === 'next') renderInvPage(invCurrentPage + 1);
                    else renderInvPage(parseInt(val, 10));
                    invoicesPage.querySelector('.fe-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        }
        document.addEventListener('DOMContentLoaded', () => {

    const feWalletOverlay = document.getElementById('feWalletOverlay');
    const feWalletOtpOverlay = document.getElementById('feWalletOtpOverlay');
    const feWalletSuccessOverlay = document.getElementById('feWalletSuccessOverlay');
    const feOtpBoxes = document.querySelectorAll('#feWalletOtpBoxes .fe-otp-box');

    function showFeSuccess(methodType, idLabel, idValue) {
        const t = document.getElementById('feSuccessMethodType');
        const l = document.getElementById('feSuccessIdLabel');
        const v = document.getElementById('feSuccessIdValue');
        if (t) t.textContent = methodType;
        if (l) l.textContent = idLabel;
        if (v) v.textContent = idValue;
        if (feWalletSuccessOverlay) feWalletSuccessOverlay.classList.add('is-open');
    }

    const openWalletOtpBtn = document.querySelector('[data-fe-open-wallet-otp]');
    if (openWalletOtpBtn) {
        openWalletOtpBtn.addEventListener('click', () => {
            const selectedWallet = document.querySelector('.fe-wallet-option.selected .fe-wallet-name');
            if (feWalletOverlay) feWalletOverlay.classList.remove('is-open');
            if (feWalletOtpOverlay) feWalletOtpOverlay.classList.add('is-open');
            if (feOtpBoxes[0]) feOtpBoxes[0].focus();
            const nameEl = document.getElementById('feWalletSuccessName');
            if (nameEl) nameEl.textContent = selectedWallet ? selectedWallet.textContent : 'Wallet';
        });
    }

    const closeWalletOtpBtn = document.querySelector('[data-fe-close-wallet-otp]');
    if (closeWalletOtpBtn) {
        closeWalletOtpBtn.addEventListener('click', () => {
            if (feWalletOtpOverlay) feWalletOtpOverlay.classList.remove('is-open');
            if (feWalletOverlay) feWalletOverlay.classList.add('is-open');
        });
    }

    const verifyWalletOtpBtn = document.querySelector('[data-fe-verify-wallet-otp]');
    if (verifyWalletOtpBtn) {
        verifyWalletOtpBtn.addEventListener('click', () => {
            const selectedWallet = document.querySelector('.fe-wallet-option.selected .fe-wallet-name');
            if (feWalletOtpOverlay) feWalletOtpOverlay.classList.remove('is-open');
            showFeSuccess('Wallet', 'Wallet', selectedWallet ? selectedWallet.textContent : 'Wallet');
        });
    }

    const upiSubmitBtn = document.getElementById('feUpiSubmitBtn');
    if (upiSubmitBtn) {
        upiSubmitBtn.addEventListener('click', () => {
            const upiInput = document.getElementById('feUpiInput');
            const upiValue = (upiInput && upiInput.value) ? upiInput.value : 'rahul@upi';
            const upiOverlay = document.getElementById('feUpiOverlay');
            if (upiOverlay) upiOverlay.classList.remove('is-open');
            showFeSuccess('UPI ID', 'UPI ID', upiValue);
        });
    }

    document.querySelectorAll('[data-fe-close-wallet-success]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (feWalletSuccessOverlay) feWalletSuccessOverlay.classList.remove('is-open');
        });
    });

    const addAnotherBtn = document.querySelector('[data-fe-add-another-pm]');
    if (addAnotherBtn) {
        addAnotherBtn.addEventListener('click', () => {
            if (feWalletSuccessOverlay) feWalletSuccessOverlay.classList.remove('is-open');
            if (feWalletOverlay) feWalletOverlay.classList.add('is-open');
        });
    }

    feOtpBoxes.forEach((box, i) => {
        box.addEventListener('input', () => {
            if (box.value && feOtpBoxes[i + 1]) feOtpBoxes[i + 1].focus();
        });
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !box.value && feOtpBoxes[i - 1]) feOtpBoxes[i - 1].focus();
        });
    });

});

        function initInvoicesList() {
            invInitialized = true;
            var sizeSelect = document.getElementById('feInvPageSize');
            sizeSelect.value = String(invPageSize);
            sizeSelect.addEventListener('change', function () {
                invPageSize = parseInt(sizeSelect.value, 10);
                renderInvPage(1);
            });
            renderInvPage(1);
        }
    })();