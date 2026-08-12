document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const tocLinks = document.querySelectorAll('.toc-link');

    function updateActiveToc() {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        let activeId = '';

        // If user has scrolled near/to the bottom of the page, highlight the last section
        if (scrollPosition + windowHeight >= documentHeight - 120) {
            if (sections.length > 0) {
                activeId = sections[sections.length - 1].getAttribute('id');
            }
        } else {
            // Find the section that has its top closest to/above the scroll threshold
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + scrollPosition - 150; // 150px offset for sticky header
                if (scrollPosition >= sectionTop) {
                    activeId = section.getAttribute('id');
                }
            });
        }

        // Default to the first section if none match (i.e. we are at the top)
        if (!activeId && sections.length > 0) {
            activeId = sections[0].getAttribute('id');
        }

        tocLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('border-primary-green', 'text-primary-green', 'font-semibold');
                link.classList.remove('border-transparent', 'text-article-light-gray');
            } else {
                link.classList.remove('border-primary-green', 'text-primary-green', 'font-semibold');
                link.classList.add('border-transparent', 'text-article-light-gray');
            }
        });

    }

    // Smooth scroll when clicking TOC link
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - 100; // 100px offset
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', updateActiveToc);
    // Initial check
    setTimeout(updateActiveToc, 100);
});


//ARTICLES JS MAIN PART

/**
* static/script/pages/articles.js
* ---------------------------------------------------------------
* Single source of truth for every Help Center article, plus the
* rendering logic that turns an article ID (read from the URL)
* into a fully formatted article page (templates/help/articles.html).
*
* HOW TO ADD A NEW ARTICLE
* ---------------------------------------------------------------
* Append a new object to the ARTICLES array below. No rendering
* code needs to change — any card linking to
* `{% url 'articles' %}?id=<your-id>` will work automatically.
*
* CONTENT BLOCK TYPES (used inside `content: []`)
*   { type: 'paragraph', text }
*   { type: 'heading',   id, text }               // id used for the TOC anchor
*   { type: 'list',      items: [string, ...] }
*   { type: 'steps',     items: [{ title, text }] }
*   { type: 'tips',      items: [{ title, text }] } // rendered as 3-up tip cards
*   { type: 'faq',       items: [{ q, a }] }
* ---------------------------------------------------------------
*
* WHICH ARTICLE POWERS WHICH CARD — quick reference
* ---------------------------------------------------------------
* Popular Articles section (Help Center, 6 cards, in order):
*   1. track-service-request
*   2. understanding-invoices-payments
*   3. vendor-registration-process
*   4. work-updates-reports
*   5. engineer-app-guide
*   6. account-security
*
* Browse by Category section (Help Center, 6 cards) — each opens
* its category's "landing article" (see CATEGORY_LANDING_ARTICLE
* below for the full id -> category mapping):
*   For Customers        -> track-service-request
*   For Engineers         -> engineer-app-guide
*   For Vendors            -> vendor-registration-process
*   Billing & Payments     -> understanding-invoices-payments
*   Account & Security     -> account-security
*   Technical Support      -> raise-an-issue
*
* Every other article below (post-first-job, engineer-selection-process,
* budget-range-bidding, upload-site-documents, setting-up-account,
* customer-dashboard, track-engineer-live, job-completion) isn't linked
* from a Help Center card directly — you only reach them through the
* "Related Articles" and "Popular in [category]" links on another
* article's page. Each article object below has its own `// CARD MAP:`
* comment confirming exactly where it's reachable from.
* ---------------------------------------------------------------
*/

/* ============================================================
   1. DATA SOURCE
   ============================================================ */

const ARTICLES = [
    // CARD MAP: Popular Articles card #1  |  Category landing: "For Customers"
    {
        id: "track-service-request",
        icon: "schedule", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Track Your Service Request in Real Time",
        category: "For Customers",
        heroImage: "/static/img/articles/track-service-request.webp",
        shortDescription:
            "Learn how to check your job status, track your engineer's location, and stay updated on the progress of your service request.",
        readingTime: "3 min read",
        lastUpdated: "May 10, 2025",
        tags: ["Tracking", "Service Request", "Dashboard"],
        relatedArticleIds: ["customer-dashboard", "track-engineer-live", "job-completion"],
        content: [
            { type: "heading", id: "where-to-track", text: "Where to Track Your Request" },
            {
                type: "paragraph",
                text: "Once your job is live and an engineer has been assigned, FieldEngineer gives you full visibility into its progress. Every active job lives on your Customer Dashboard under the Active Jobs tab. Selecting a job opens a live timeline showing each milestone, from acceptance to completion, along with your engineer's estimated arrival window.",
            },
            {
                type: "list",
                items: [
                    "Job Accepted — an engineer has confirmed and is preparing for the visit",
                    "En Route — your engineer is travelling to the site, with live ETA",
                    "On Site — work has started and status updates begin appearing",
                    "Completed — the job report and any invoice are ready for review",
                ],
            },
            { type: "heading", id: "live-location", text: "Following Your Engineer's Location" },
            {
                type: "paragraph",
                text: "For jobs marked En Route, the dashboard displays a live map with your engineer's approximate location, refreshed every few minutes. This is available on both desktop and the mobile app, so you can keep an eye on things without staying at your screen.",
            },
            {
                type: "tips",
                items: [
                    { title: "Turn on Notifications", text: "Enable push or email notifications so you're alerted the moment a status changes, without needing to check manually." },
                    { title: "Use the Mobile App", text: "The FE mobile app shows the same live tracking view and is the fastest way to check status while you're away from your desk." },
                    { title: "Message Directly", text: "If an ETA looks off, use the in-app chat to message your engineer directly rather than waiting for the next update." },
                ],
            },
            { type: "heading", id: "faqs", text: "Frequently Asked Questions" },
            {
                type: "faq",
                items: [
                    { q: "Why isn't my tracker updating?", a: "Live location relies on the engineer's app having connectivity. If it hasn't updated in over 20 minutes, use in-app chat to reach out directly." },
                    { q: "Can I share tracking with someone else on-site?", a: "Yes. Use the Share Tracking Link option on the job page to send a read-only tracking view to a site contact." },
                    { q: "What happens if the engineer is delayed?", a: "You'll receive an automatic notification with an updated ETA. If a delay affects your schedule significantly, you can message the engineer or contact support." },
                ],
            },
        ],
    },

    // CARD MAP: Popular Articles card #2  |  Category landing: "Billing & Payments"
    {
        id: "understanding-invoices-payments",
        icon: "receipt_long", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Understanding Invoices & Payments",
        category: "Billing & Payments",
        heroImage: "/static/img/articles/invoice-payments.webp",
        shortDescription:
            "Learn how invoices are created, when payments are made, and how tax is applied to your FieldEngineer jobs.",
        readingTime: "4 min read",
        lastUpdated: "May 8, 2025",
        tags: ["Invoices", "Payments", "Billing"],
        relatedArticleIds: ["budget-range-bidding", "job-completion", "account-security"],
        content: [
            { type: "heading", id: "how-invoices-are-created", text: "How an Invoice Is Created" },
            {
                type: "paragraph",
                text: "When an engineer marks a job as complete and submits their final work report, the platform automatically compiles an invoice using the agreed budget, any approved additional hours, and applicable taxes.",
            },
            {
                type: "list",
                items: [
                    "Base job cost, as agreed at the time of booking",
                    "Any approved extra hours or materials logged during the job",
                    "Applicable local tax, calculated automatically based on your billing address",
                    "Platform service fee, shown as a separate line item",
                ],
            },
            { type: "heading", id: "payment-timing", text: "When Payment Is Charged" },
            {
                type: "paragraph",
                text: "Payment is captured from your saved payment method within 24 hours of the job being marked complete, giving you a short window to review the report before charges are finalized.",
            },
            { type: "heading", id: "tax-handling", text: "How Tax Is Applied" },
            {
                type: "paragraph",
                text: "Tax is calculated based on the billing address associated with your account and the service category of the job. Business accounts with a valid tax ID can add it under Account Settings to have it reflected on every invoice.",
            },
            {
                type: "tips",
                items: [
                    { title: "Download Anytime", text: "Every invoice is available as a PDF from the Billing tab, and can be re-downloaded at any time for your records." },
                    { title: "Add a Tax ID Early", text: "Add your business tax ID before your first job so it appears correctly on all future invoices without needing corrections." },
                    { title: "Review Before Approving", text: "Always review the final work report before the 24-hour window closes if you have questions about additional hours billed." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "Can I dispute a charge on my invoice?", a: "Yes, open a support ticket referencing the invoice number within 7 days of the charge and our billing team will review it." },
                    { q: "Do you support purchase orders for enterprise accounts?", a: "Enterprise accounts can enable PO-based billing under Account Settings > Billing Preferences." },
                ],
            },
        ],
    },

    // CARD MAP: Popular Articles card #3  |  Category landing: "For Vendors"
    {
        id: "vendor-registration-process",
        icon: "store", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Vendor Registration Process",
        category: "For Vendors",
        heroImage: "/static/img/articles/vendor-registration-process.webp",
        shortDescription:
            "Learn how to register, get verified, and start offering your services on the platform.",
        readingTime: "5 min read",
        lastUpdated: "May 6, 2025",
        tags: ["Vendors", "Registration", "Verification"],
        relatedArticleIds: ["engineer-app-guide", "account-security", "work-updates-reports"],
        content: [
            { type: "heading", id: "registration-steps", text: "Registering as a Vendor" },
            {
                type: "steps",
                items: [
                    { title: "Submit Your Company Profile", text: "Provide your company name, registration number, service regions, and the categories of work your team covers." },
                    { title: "Upload Compliance Documents", text: "Insurance certificates, business licenses, and any relevant trade certifications are required before verification can begin." },
                    { title: "Add Your Engineers", text: "Invite the engineers on your team so their individual profiles and certifications can be linked to your vendor account." },
                    { title: "Verification Review", text: "Our compliance team reviews submitted documents, typically within 3–5 business days." },
                    { title: "Go Live", text: "Once approved, your vendor dashboard unlocks and your team becomes eligible to apply for jobs in your registered service areas." },
                ],
            },
            { type: "heading", id: "service-areas", text: "Setting Your Service Areas" },
            {
                type: "paragraph",
                text: "Service areas determine which jobs your team can see and apply for. You can add multiple regions and adjust them at any time from the Vendor Dashboard under Coverage Settings.",
            },
            {
                type: "tips",
                items: [
                    { title: "Keep Documents Current", text: "Expired insurance or licenses will automatically pause your vendor account until updated documents are uploaded." },
                    { title: "Start Narrow", text: "New vendors often see faster approval and better job matches by starting with one or two focused service categories." },
                    { title: "Assign a Dashboard Owner", text: "Designate one team member to manage the vendor dashboard so applications and compliance stay on top of schedule." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "How long does verification take?", a: "Most applications are reviewed within 3–5 business days, provided all required documents are submitted correctly." },
                    { q: "Can I add more engineers after approval?", a: "Yes, engineers can be added to your vendor account at any time from the Team Management section." },
                ],
            },
        ],
    },

    // CARD MAP: Popular Articles card #4
    {
        id: "work-updates-reports",
        icon: "smartphone", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "How Work Updates & Reports Are Created",
        category: "For Engineers",
        heroImage: "/static/img/articles/updates-reports.webp",
        shortDescription: "Learn how work updates are recorded and service reports are prepared.",
        readingTime: "6 min read",
        lastUpdated: "May 5, 2025",
        tags: ["Reports", "Work Updates", "Engineers"],
        relatedArticleIds: ["engineer-app-guide", "engineer-selection-process", "job-completion"],
        content: [
            { type: "heading", id: "logging-updates", text: "Logging Updates On Site" },
            {
                type: "paragraph",
                text: "Clear, timely work updates keep customers informed and build trust in your work. From the Engineer App, tap Add Update on any active job to log progress. Updates can include a short note, photos, and time spent, and are visible to the customer instantly.",
            },
            {
                type: "list",
                items: [
                    "Arrival confirmation with a timestamp and optional site photo",
                    "Progress notes at key milestones during longer jobs",
                    "Any parts used or additional hours that need customer approval",
                    "Completion note summarizing the work performed",
                ],
            },
            { type: "heading", id: "final-report", text: "Preparing the Final Report" },
            {
                type: "paragraph",
                text: "When you mark a job complete, the app compiles all logged updates into a structured service report automatically. Review the auto-generated summary, add any final notes, and attach closing photos before submitting.",
            },
            {
                type: "tips",
                items: [
                    { title: "Photograph Before and After", text: "Before-and-after photos are the single most requested detail by customers and reduce follow-up questions significantly." },
                    { title: "Log Extra Hours Immediately", text: "Request approval for additional hours as soon as they occur, rather than waiting until the report is submitted." },
                    { title: "Keep Notes Specific", text: "Specific, factual notes ('replaced 2 fuses in panel B') are rated more helpful by customers than general summaries." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "Can I edit a report after submitting it?", a: "Reports can be amended within 24 hours of submission from the Job History tab. After that, contact support for corrections." },
                    { q: "Are reports visible to the vendor account I'm linked to?", a: "Yes, vendor administrators can view all reports submitted by engineers on their team from the Vendor Dashboard." },
                ],
            },
        ],
    },

    // CARD MAP: Popular Articles card #5  |  Category landing: "For Engineers"
    {
        id: "engineer-app-guide",
        icon: "person_add", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Engineer App: Complete Guide",
        category: "For Engineers",
        heroImage: "/static/img/articles/engineer-app.webp",
        shortDescription: "Everything you need to know about using the Field Engineer app.",
        readingTime: "4 min read",
        lastUpdated: "May 2, 2025",
        tags: ["Engineer App", "Mobile", "Getting Started"],
        relatedArticleIds: ["work-updates-reports", "engineer-selection-process", "vendor-registration-process"],
        content: [
            { type: "heading", id: "finding-jobs", text: "Finding and Applying for Jobs" },
            {
                type: "paragraph",
                text: "The Jobs tab shows open requests matched to your skills and service area. Tap any listing to view full details, then submit an application with your rate and availability.",
            },
            { type: "heading", id: "managing-schedule", text: "Managing Your Schedule" },
            {
                type: "paragraph",
                text: "Your calendar view shows upcoming and in-progress jobs. Set your availability in Settings so you're only matched with jobs that fit your working hours.",
            },
            { type: "heading", id: "getting-paid", text: "Tracking Earnings and Payouts" },
            {
                type: "paragraph",
                text: "The Earnings tab shows a running total of completed jobs, pending payouts, and payment history. Payouts are issued automatically once a job report is approved, following your chosen payout schedule.",
            },
            {
                type: "tips",
                items: [
                    { title: "Complete Your Profile", text: "Profiles with certifications, past work photos, and a full bio are matched with significantly more job opportunities." },
                    { title: "Respond Quickly", text: "Applying within the first hour of a job posting meaningfully increases your chances of being selected." },
                    { title: "Set Payout Preferences", text: "Choose between weekly and instant payouts from Settings to match your cash flow needs." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "Is the app available offline?", a: "Core features like viewing job details and logging updates work offline and sync automatically once you're back online." },
                    { q: "How do I update my certifications?", a: "Go to Profile > Certifications to upload new documents. Updates are reviewed within 2 business days." },
                ],
            },
        ],
    },

    // CARD MAP: Popular Articles card #6  |  Category landing: "Account & Security"
    {
        id: "account-security",
        icon: "shield", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Account Security",
        category: "Account & Security",
        heroImage: "/static/img/articles/account-security.webp",
        shortDescription: "Learn how to protect your account and keep it secure.",
        readingTime: "3 min read",
        lastUpdated: "Apr 30, 2025",
        tags: ["Security", "Account", "Two-Factor Authentication"],
        relatedArticleIds: ["setting-up-account", "understanding-invoices-payments", "raise-an-issue"],
        content: [
            { type: "heading", id: "strong-password", text: "Use a Strong, Unique Password" },
            {
                type: "paragraph",
                text: "Choose a password you don't reuse elsewhere, and update it immediately if you ever suspect it may have been exposed in a breach on another service.",
            },
            { type: "heading", id: "two-factor", text: "Enable Two-Factor Authentication" },
            {
                type: "paragraph",
                text: "Two-factor authentication (2FA) adds a one-time code to your login process. Enable it from Account Settings > Security using an authenticator app or SMS.",
            },
            {
                type: "list",
                items: [
                    "Go to Account Settings and select Security",
                    "Choose Enable Two-Factor Authentication",
                    "Scan the QR code with an authenticator app, or select SMS verification",
                    "Save your backup codes somewhere safe in case you lose access to your device",
                ],
            },
            { type: "heading", id: "suspicious-activity", text: "Spotting Suspicious Activity" },
            {
                type: "paragraph",
                text: "Review your Login History periodically under Security settings. If you see a login you don't recognize, change your password immediately and contact support.",
            },
            {
                type: "tips",
                items: [
                    { title: "Never Share Login Codes", text: "FE staff will never ask for your password or 2FA code over phone, chat, or email. Treat any such request as fraudulent." },
                    { title: "Review Connected Devices", text: "Periodically check Security > Devices and log out anything you don't recognize." },
                    { title: "Update Recovery Info", text: "Keep your recovery email and phone number current so you can regain access quickly if needed." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "What do I do if I'm locked out of my account?", a: "Use the Forgot Password flow on the login screen, or contact support with your registered email for identity verification." },
                    { q: "Can I have more than one 2FA method?", a: "Yes, you can register both an authenticator app and a backup phone number for SMS codes." },
                ],
            },
        ],
    },

    // CARD MAP: Category landing: "Getting Started"  |  otherwise reached via Related Articles
    {
        id: "post-first-job",
        icon: "add_task", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "How to Post Your First Job on FE",
        category: "Getting Started",
        heroImage: "",
        shortDescription:
            "Posting your first job on FE – FieldEngineer is simple and takes less than 5 minutes. Once your request is live, verified field engineers in your area will review the details and submit their applications.",
        readingTime: "5 min read",
        lastUpdated: "Jul 18, 2026",
        tags: ["Getting Started", "Booking", "First Job", "Service Request"],
        relatedArticleIds: ["engineer-selection-process", "budget-range-bidding", "upload-site-documents"],
        content: [
            { type: "heading", id: "what-you-need", text: "What You'll Need" },
            {
                type: "list",
                items: [
                    "An active FE account (sign up free at fieldengineer.com)",
                    "Your site address and contact person details",
                    "A clear description of the work required and an approximate budget",
                ],
            },
            { type: "heading", id: "step-by-step", text: "Step-by-Step: Posting Your Job" },
            {
                type: "steps",
                items: [
                    { title: "Log in and go to your Dashboard", text: "Once logged in, navigate to your customer dashboard. You will see a prominent 'Post a Job' or 'Create New Request' button in the top action bar. Click it to begin the job creation flow." },
                    { title: "Select a Service Category", text: "Choose the service category that best describes the work needed — for example, Electrical, Networking, HVAC, or Facility Management. Sub-categories help engineers understand the scope instantly and improve match quality." },
                    { title: "Describe the Work & Set Your Budget", text: "Write a clear, detailed description of what needs to be done. Include expected hours, any special tools or certifications required, and site access details. Set a realistic budget range using the slider — competitive budgets attract more qualified engineers. Note: FE Admin does NOT assign engineers — you always review all applicants and personally choose the right fit for your job." },
                    { title: "Add Site Details & Upload Documents", text: "Enter the full site address, contact person name, and any parking or access instructions. Upload supporting documents such as floor plans, site photos, network diagrams, or previous job reports. Well-documented jobs receive higher quality applications." },
                    { title: "Review and Submit", text: "Review all details on the summary screen. Once satisfied, click Submit Job Request. Your request will be instantly visible to verified engineers nearby. You will receive a confirmation email and can track applications in real time from your dashboard." },
                ],
            },
            { type: "heading", id: "tips", text: "Tips for a Better Job Post" },
            {
                type: "tips",
                items: [
                    { title: "Be Specific About Scope", text: "Vague job descriptions attract fewer applicants. Specify the exact issue, the environment (office, warehouse, data center), and any compliance requirements." },
                    { title: "Upload Clear Photos", text: "A picture is worth a thousand words. Photos of the equipment, fault, or site layout help engineers submit accurate bids and arrive better prepared." },
                    { title: "Set a Realistic Budget", text: "Research typical rates for your category. Jobs with realistic budgets fill 3x faster than those with below-market ranges. You can always negotiate once engineers apply." },
                ],
            },
            { type: "heading", id: "after-posting", text: "What Happens After You Post?" },
            {
                type: "list",
                items: [
                    "Nearby verified engineers receive an instant notification about your request",
                    "Engineers review your job details and submit their applications with profiles and bids",
                    "You compare applicants, check ratings and certifications, and award the job to your chosen engineer",
                ],
            },
            { type: "paragraph", text: "The whole process typically takes just a few hours from posting to awarding." },
        ],
    },

    // CARD MAP: Reached only via Related Articles (not a Help Center card directly)
    {
        id: "engineer-selection-process",
        icon: "engineering", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "How the Engineer Selection Process Works",
        category: "Getting Started",
        heroImage: "",
        shortDescription:
            "Understand how verified engineers apply for your job, how to review profiles, and how to award the job.",
        readingTime: "4 min read",
        lastUpdated: "Jul 12, 2026",
        tags: ["Getting Started", "Booking", "Engineers"],
        relatedArticleIds: ["post-first-job", "budget-range-bidding", "track-service-request"],
        content: [
            { type: "heading", id: "how-applications-arrive", text: "How Applications Arrive" },
            {
                type: "paragraph",
                text: "Applications appear on your job page as they come in, typically within the first hour of posting. Each includes the engineer's rate, availability, relevant certifications, and a short note about their approach to the job.",
            },
            { type: "heading", id: "reviewing-profiles", text: "What to Look For in a Profile" },
            {
                type: "list",
                items: [
                    "Overall rating and number of completed jobs in your service category",
                    "Relevant certifications and licenses for the type of work required",
                    "Response time and reliability score from past jobs",
                    "Photos or reports from similar previous work, where available",
                ],
            },
            { type: "heading", id: "awarding-the-job", text: "Awarding the Job" },
            {
                type: "paragraph",
                text: "Once you've compared applicants, select Award Job on your chosen engineer's application. They'll be notified instantly and the job status will move to Accepted, starting the scheduling process.",
            },
            {
                type: "tips",
                items: [
                    { title: "Message Before Awarding", text: "Use in-app chat to ask clarifying questions before making a decision, especially for complex or technical jobs." },
                    { title: "Don't Wait Too Long", text: "Top-rated engineers often have limited availability. Reviewing and awarding within the first day usually secures the best match." },
                    { title: "Check Recent Reviews", text: "Recent reviews are more predictive of current quality than an engineer's overall lifetime rating." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "Can I award a job to more than one engineer?", a: "No, each job is awarded to a single engineer. For larger projects requiring multiple engineers, post separate linked job requests." },
                    { q: "What if no one applies within 24 hours?", a: "Consider broadening your budget range or service radius. You can also contact support to help boost visibility on your listing." },
                ],
            },
        ],
    },

    // CARD MAP: Category landing: "Booking a Job"  |  also appears in Related Articles
    {
        id: "budget-range-bidding",
        icon: "payments", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Understanding Budget Range & Bidding",
        category: "Booking a Job",
        heroImage: "",
        shortDescription:
            "Learn how to set competitive budgets, how engineers submit bids, and how to compare offers effectively.",
        readingTime: "4 min read",
        lastUpdated: "Jul 10, 2026",
        tags: ["Booking", "Budget", "Bidding"],
        relatedArticleIds: ["post-first-job", "engineer-selection-process", "understanding-invoices-payments"],
        content: [
            { type: "heading", id: "setting-a-range", text: "Setting a Budget Range" },
            {
                type: "paragraph",
                text: "Rather than a fixed price, jobs are posted with a minimum and maximum budget. This gives engineers room to bid based on the specifics of the work while keeping your costs predictable.",
            },
            { type: "heading", id: "how-bids-work", text: "How Bidding Works" },
            {
                type: "list",
                items: [
                    "Engineers review your job details and submit a bid within, at, or occasionally above your stated range",
                    "Each bid includes an estimated time to complete and any assumptions the engineer is making",
                    "You can message an engineer to negotiate or clarify scope before accepting a bid",
                    "Bids remain open until you award the job or the listing expires",
                ],
            },
            { type: "heading", id: "comparing-bids", text: "Comparing Bids Effectively" },
            {
                type: "paragraph",
                text: "The lowest bid isn't always the best value. Weigh price against the engineer's rating, relevant experience, and estimated completion time to find the strongest overall match.",
            },
            {
                type: "tips",
                items: [
                    { title: "Widen Tight Budgets", text: "Budget ranges set below market rate typically receive fewer, lower-quality bids. A slightly wider range usually pays off." },
                    { title: "Ask About Assumptions", text: "If a bid seems unusually low, ask what's included — it may exclude parts, travel, or after-hours work." },
                    { title: "Lock Scope Early", text: "Clearly defined scope before bidding opens reduces the chance of budget disputes once work is underway." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "Can I negotiate a bid after it's submitted?", a: "Yes, use in-app chat to discuss scope or price with the engineer before awarding the job." },
                    { q: "What happens if actual work exceeds the agreed budget?", a: "The engineer must request approval for any additional hours or costs before they're added to your final invoice." },
                ],
            },
        ],
    },

    // CARD MAP: Reached only via Related Articles (not a Help Center card directly)
    {
        id: "upload-site-documents",
        icon: "upload_file", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "How to Upload Site Documents & Floor Plans",
        category: "Booking a Job",
        heroImage: "",
        shortDescription:
            "Attach relevant documents, floor plans, and photos to help engineers understand your site layout and instructions.",
        readingTime: "4 min read",
        lastUpdated: "Jul 8, 2026",
        tags: ["Booking", "Documents", "Site Details"],
        relatedArticleIds: ["post-first-job", "engineer-selection-process", "customer-dashboard"],
        content: [
            { type: "heading", id: "what-to-upload", text: "What You Can Upload" },
            {
                type: "list",
                items: [
                    "Floor plans or network diagrams relevant to the work",
                    "Photos of the equipment, fault, or work area",
                    "Access instructions, such as gate codes or parking notes",
                    "Previous job reports for recurring or follow-up work",
                ],
            },
            { type: "heading", id: "how-to-upload", text: "How to Upload Documents" },
            {
                type: "steps",
                items: [
                    { title: "Open the Job Creation Flow", text: "Documents can be attached at Step 4 of posting a job, or added later from the job's detail page." },
                    { title: "Select Add Documents", text: "Choose files from your device, or drag and drop directly into the upload area." },
                    { title: "Label Each File", text: "Give each document a short, clear label so engineers can quickly identify what they're looking at." },
                    { title: "Save and Continue", text: "Uploaded documents attach to the job listing and remain visible to any engineer who applies." },
                ],
            },
            {
                type: "tips",
                items: [
                    { title: "Redact Sensitive Info", text: "Blur or remove sensitive details like security codes from photos before uploading if the job is public." },
                    { title: "Keep Files Under 25MB", text: "Large files can be compressed before upload to avoid failed uploads on slower connections." },
                    { title: "Update Before Rescheduling", text: "If site conditions change, update your documents before the engineer's visit to avoid delays." },
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "What file types are supported?", a: "PDF, JPG, PNG, and DWG files are supported, up to 25MB per file." },
                    { q: "Can I remove a document after posting?", a: "Yes, documents can be removed or replaced from the job detail page at any time before the job is awarded." },
                ],
            },
        ],
    },

    // CARD MAP: Reached only via Related Articles (not a Help Center card directly)
    {
        id: "setting-up-account",
        icon: "person", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Setting Up Your FE Account",
        category: "Getting Started",
        heroImage: "",
        shortDescription:
            "A complete walkthrough of creating and configuring your FieldEngineer account for the first time.",
        readingTime: "3 min read",
        lastUpdated: "Jul 5, 2026",
        tags: ["Getting Started", "Account"],
        relatedArticleIds: ["account-security", "customer-dashboard", "post-first-job"],
        content: [
            { type: "heading", id: "creating-account", text: "Creating Your Account" },
            {
                type: "steps",
                items: [
                    { title: "Sign Up", text: "Visit fieldengineer.com and select Sign Up. You can register with an email address or a supported single sign-on provider." },
                    { title: "Verify Your Email", text: "Click the verification link sent to your inbox to activate your account." },
                    { title: "Choose Your Account Type", text: "Select Customer, Engineer, or Vendor depending on how you plan to use the platform. This determines your default dashboard." },
                    { title: "Complete Your Profile", text: "Add your name, company (if applicable), and contact details so engineers or customers can identify you clearly." },
                ],
            },
            { type: "heading", id: "recommended-settings", text: "Recommended First Settings" },
            {
                type: "list",
                items: [
                    "Enable two-factor authentication under Security",
                    "Add a payment method under Billing (for customer accounts)",
                    "Set your notification preferences for job updates",
                    "Add a profile photo to build trust with the other party",
                ],
            },
            {
                type: "faq",
                items: [
                    { q: "Can I switch account types later?", a: "Yes, contact support to convert your account type if your needs change after sign-up." },
                    { q: "Is there a cost to create an account?", a: "Creating an account is free. Fees only apply per completed job, as outlined at checkout." },
                ],
            },
        ],
    },

    // CARD MAP: Reached only via Related Articles (not a Help Center card directly)
    {
        id: "customer-dashboard",
        icon: "dashboard", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "Understanding Your Customer Dashboard",
        category: "Getting Started",
        heroImage: "",
        shortDescription: "A tour of the customer dashboard and where to find jobs, invoices, and account settings.",
        readingTime: "3 min read",
        lastUpdated: "Jul 3, 2026",
        tags: ["Getting Started", "Dashboard"],
        relatedArticleIds: ["track-service-request", "understanding-invoices-payments", "setting-up-account"],
        content: [
            { type: "heading", id: "dashboard-sections", text: "Key Dashboard Sections" },
            {
                type: "list",
                items: [
                    "Active Jobs — jobs currently posted, in progress, or awaiting award",
                    "Job History — a searchable archive of all past requests and reports",
                    "Billing — invoices, payment methods, and billing preferences",
                    "Messages — all conversations with engineers, organized by job",
                    "Account Settings — profile, notifications, and security preferences",
                ],
            },
            { type: "heading", id: "quick-actions", text: "Using Quick Actions" },
            {
                type: "paragraph",
                text: "The Quick Actions panel on your dashboard surfaces the most common tasks — posting a job, tracking a booking, or downloading a report — so you rarely need to dig through menus.",
            },
            {
                type: "faq",
                items: [{ q: "Can I customize what appears on my dashboard?", a: "Pin frequently used sections from Settings > Dashboard Layout to reorder your view." }],
            },
        ],
    },

    // CARD MAP: Reached only via Related Articles (not a Help Center card directly)
    {
        id: "track-engineer-live",
        icon: "location_on", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "How to Track Your Engineer Live",
        category: "For Customers",
        heroImage: "",
        shortDescription: "A closer look at live location tracking during an active job visit.",
        readingTime: "3 min read",
        lastUpdated: "Jun 28, 2026",
        tags: ["Tracking", "For Customers"],
        relatedArticleIds: ["track-service-request", "customer-dashboard", "job-completion"],
        content: [
            { type: "heading", id: "enabling-tracking", text: "When Tracking Becomes Available" },
            {
                type: "paragraph",
                text: "Live tracking activates automatically once your engineer marks their status as En Route, and remains available until they check in as On Site.",
            },
            {
                type: "list",
                items: [
                    "Live map view with estimated arrival time",
                    "Automatic notifications if the ETA shifts by more than 10 minutes",
                    "A direct chat and call option from the tracking screen",
                ],
            },
            {
                type: "tips",
                items: [
                    { title: "Share the Link", text: "Use Share Tracking Link to give a site contact visibility without needing their own FE account." },
                    { title: "Watch for Delay Alerts", text: "Delay notifications include an updated ETA automatically, so you rarely need to check in manually." },
                ],
            },
        ],
    },

    // CARD MAP: Reached only via Related Articles (not a Help Center card directly)
    {
        id: "job-completion",
        icon: "task_alt", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "What Happens After Job Completion?",
        category: "Getting Started",
        heroImage: "",
        shortDescription: "Understand the steps that follow once your engineer marks a job as complete.",
        readingTime: "3 min read",
        lastUpdated: "Jun 20, 2026",
        tags: ["Getting Started", "Reports", "Invoices"],
        relatedArticleIds: ["understanding-invoices-payments", "work-updates-reports", "track-service-request"],
        content: [
            { type: "heading", id: "completion-flow", text: "The Completion Flow" },
            {
                type: "steps",
                items: [
                    { title: "Report Submitted", text: "Your engineer submits a final work report summarizing what was done, along with any photos taken during the job." },
                    { title: "Review Window", text: "You have a short window to review the report and flag any concerns before payment is finalized." },
                    { title: "Invoice Generated", text: "An invoice is generated automatically and payment is captured from your saved method." },
                    { title: "Leave a Review", text: "Rate your experience to help other customers and reward great engineers with visibility." },
                ],
            },
            {
                type: "faq",
                items: [{ q: "What if I disagree with the final report?", a: "Flag it within the review window and our support team will help mediate before any charge is finalized." }],
            },
        ],
    },

    // CARD MAP: Category landing: "Technical Support"  |  also appears in Related Articles
    {
        id: "raise-an-issue",
        icon: "report_problem", // Material Symbols icon — shown behind heroImage as a fallback badge
        title: "How to Raise a Support Ticket",
        category: "Technical Support",
        heroImage: "/static/img/articles/browse-category-technical-support.webp",
        shortDescription:
            "Step-by-step guide to reporting an issue or getting help from the FieldEngineer support team.",
        readingTime: "3 min read",
        lastUpdated: "Jun 15, 2026",
        tags: ["Support", "Technical Support"],
        relatedArticleIds: ["account-security", "understanding-invoices-payments", "engineer-app-guide"],
        content: [
            { type: "heading", id: "opening-a-ticket", text: "Opening a Ticket" },
            {
                type: "steps",
                items: [
                    { title: "Go to Help Center", text: "Select Contact Support from the footer or your dashboard's Quick Actions panel." },
                    { title: "Choose a Category", text: "Select the category that best matches your issue — Billing, Technical, Account, or a specific job." },
                    { title: "Describe the Issue", text: "Include as much detail as possible — job ID, screenshots, and steps to reproduce speed up resolution significantly." },
                    { title: "Submit and Track", text: "You'll receive a ticket number and can track responses from the same Contact Support page." },
                ],
            },
            {
                type: "tips",
                items: [
                    { title: "Include the Job ID", text: "Tickets referencing a specific job ID are routed and resolved noticeably faster." },
                    { title: "Attach Screenshots", text: "A screenshot of any error message saves back-and-forth and helps our team diagnose the issue immediately." },
                ],
            },
            {
                type: "faq",
                items: [{ q: "What's the average response time?", a: "Most tickets receive a first response within 2 hours during business days, and live chat is available 24/7 for urgent issues." }],
            },
        ],
    },
];

/**
 * Which article acts as the "landing article" when someone clicks a
 * category card (e.g. the "For Customers" card on the Help Center) rather
 * than a specific article. That article's own Related Articles / Popular
 * in Category sections then surface the rest of the category.
 */
const CATEGORY_LANDING_ARTICLE = {
    "For Customers": "track-service-request",
    "For Engineers": "engineer-app-guide",
    "For Vendors": "vendor-registration-process",
    "Billing & Payments": "understanding-invoices-payments",
    "Account & Security": "account-security",
    "Technical Support": "raise-an-issue",
    "Getting Started": "post-first-job",
    "Booking a Job": "budget-range-bidding",
};

/* ============================================================
   2. HELPERS
   ============================================================ */

const getArticleById = (id) => ARTICLES.find((article) => article.id === id);

const getArticleIdFromUrl = () => new URLSearchParams(window.location.search).get("id");

/** Build the canonical link for an article card / related-article link. */
const buildArticleUrl = (id) => {
    const base = window.ARTICLES_URL || "articles.html"; // set window.ARTICLES_URL = "{% url 'articles' %}" in your base template if needed
    return `${base}?id=${encodeURIComponent(id)}`;
};

/**
 * Resolves an article's `heroImage` (a path relative to STATIC_URL, e.g.
 * "img/articles/track-service-request.jpg") into a real, loadable URL.
 * Uses window.STATIC_URL, which articles.html sets from Django's
 * {% get_static_prefix %} — the only reliable way for a plain static JS
 * file to know the real static prefix (handles CDNs, hashed filenames,
 * anything other than the plain "/static/" default). Falls back to
 * "/static/" if that script tag is missing, so nothing breaks silently.
 */
const resolveStaticUrl = (relativePath) => {
    // If the path already starts with /static/, return as is
    if (relativePath.startsWith('/static/')) {
        return relativePath;
    }

    // Get the base static URL
    let base = window.STATIC_URL || "/static/";

    // Ensure base ends with /
    if (!base.endsWith("/")) {
        base = base + "/";
    }

    // Remove leading slash from relativePath if it has one
    const path = relativePath.startsWith("/") ? relativePath.substring(1) : relativePath;

    return `${base}${path}`;
};

const escapeHtml = (str = "") =>
    str.replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[c]));

/* ============================================================
   3. CONTENT BLOCK RENDERERS
   ============================================================ */

const blockRenderers = {
    paragraph: (block) => `
    <p class="text-b2 text-article-medium-gray font-normal leading-relaxed mb-4">
      ${escapeHtml(block.text)}
    </p>`,

    heading: (block) => `
    <h2 id="${block.id}" class="text-xl font-bold text-article-black mb-4 mt-2 border-b border-slate-mist pb-1 scroll-mt-24">
      ${escapeHtml(block.text)}
    </h2>`,

    list: (block) => `
    <ul class="space-y-3 mb-6">
      ${block.items
            .map(
                (item) => `
        <li class="flex items-start gap-3 text-b3 text-article-medium-gray font-normal">
          <span class="material-symbols-outlined text-emerald-teal mt-0.5 text-[18px]">check</span>
          <span>${escapeHtml(item)}</span>
        </li>`
            )
            .join("")}
    </ul>`,

    steps: (block) => `
    <div class="space-y-6 mb-8">
      ${block.items
            .map(
                (step, i) => `
        <div class="flex gap-4 items-start">
          <div class="w-7 h-7 rounded-full bg-primary-green text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            ${i + 1}
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-b2 font-bold text-article-black mb-1">${escapeHtml(step.title)}</h3>
            <p class="text-b2 text-article-medium-gray font-normal leading-relaxed">${escapeHtml(step.text)}</p>
          </div>
        </div>`
            )
            .join("")}
    </div>`,

    tips: (block) => `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      ${block.items
            .map(
                (tip) => `
        <div class="bg-article-light-green border border-article-medium-green rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200">
          <div class="w-5 h-5 rounded-full border-2 border-about-green flex items-center justify-center text-emerald-teal mb-3">
            <span class="material-symbols-outlined">check_small</span>
          </div>
          <h3 class="font-bold text-article-black text-b3 mb-1.5">${escapeHtml(tip.title)}</h3>
          <p class="text-b3 font-normal text-article-medium leading-relaxed">${escapeHtml(tip.text)}</p>
        </div>`
            )
            .join("")}
    </div>`,

    faq: (block) => `
    <div class="space-y-3 mb-6">
      ${block.items
            .map(
                (item) => `
        <details class="group border border-slate-mist rounded-xl px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-center justify-between cursor-pointer text-b3 font-bold text-article-black list-none">
            <span>${escapeHtml(item.q)}</span>
            <span class="material-symbols-outlined text-primary-green transition-transform group-open:rotate-180">expand_more</span>
          </summary>
          <p class="text-b3 text-article-medium-gray font-normal leading-relaxed mt-3">${escapeHtml(item.a)}</p>
        </details>`
            )
            .join("")}
    </div>`,
};

const renderContentBlock = (block) => {
    const renderer = blockRenderers[block.type];
    if (!renderer) {
        console.warn(`Unknown content block type: "${block.type}"`);
        return "";
    }
    return renderer(block);
};

/* ============================================================
   4. PAGE RENDERERS
   ============================================================ */

const renderBreadcrumb = (article) => {
    const el = document.getElementById("breadcrumb");
    if (!el) return;
    const landingId = CATEGORY_LANDING_ARTICLE[article.category] || article.id;
    el.innerHTML = `
    <a href="/help-center" class="hover:text-bright-blue transition-colors">Help Center</a>
    <span class="material-symbols-outlined text-[16px]" aria-hidden="true">chevron_right</span>
    <a href="${buildArticleUrl(landingId)}" class="hover:text-bright-blue transition-colors">${escapeHtml(article.category)}</a>
    <span class="material-symbols-outlined text-[16px]" aria-hidden="true">chevron_right</span>
    <span class="font-semibold text-deep-indigo" aria-current="page">${escapeHtml(article.title)}</span>
  `;
};

/** Fills in the shared hero banner's overlay text + the per-article hero image. */
/** Fills in the shared hero banner's overlay text + the per-article hero image. */
const renderHero = (article) => {
    document.title = `${article.title} | FE Help Center`;

    const category = document.getElementById("article-hero-category");
    if (category) category.textContent = article.category;

    const title = document.getElementById("article-hero-title");
    if (title) title.textContent = article.title;

    const meta = document.getElementById("article-hero-meta");
    if (meta) {
        meta.innerHTML = `
      <span class="material-symbols-outlined text-[16px]">schedule</span>
      <span>${escapeHtml(article.readingTime)}</span>
      <span class="text-white/40">&bull;</span>
      <span>Updated ${escapeHtml(article.lastUpdated)}</span>
    `;
    }

    const heroImage = document.getElementById("article-hero-image");
    if (heroImage) {
        const imgPath = resolveStaticUrl(article.heroImage);
        console.log("Loading image from:", imgPath);

        // Clear any previous fallback content
        const parent = heroImage.closest('div');
        if (parent) {
            // Remove any existing fallback icon
            const existingFallback = parent.querySelector('.hero-fallback-icon');
            if (existingFallback) {
                existingFallback.remove();
            }
            // Remove fallback classes
            parent.classList.remove('bg-article-light-green', 'flex', 'items-center', 'justify-center');
        }

        // Reset image display
        heroImage.style.display = 'block';
        heroImage.src = imgPath;
        heroImage.alt = article.title;

        // Store the article icon for fallback use
        heroImage.dataset.fallbackIcon = article.icon || 'description';

        // Remove old onerror handler and set a new one
        heroImage.onerror = function () {
            console.error("Failed to load image:", this.src);
            this.style.display = 'none';

            const parentEl = this.closest('div');
            if (parentEl && !parentEl.querySelector('.hero-fallback-icon')) {
                parentEl.classList.add('bg-article-light-green', 'flex', 'items-center', 'justify-center');
                const fallback = document.createElement('span');
                fallback.className = 'material-symbols-outlined text-primary-green text-[48px] hero-fallback-icon';
                fallback.textContent = this.dataset.fallbackIcon || 'description';
                parentEl.appendChild(fallback);
            }
        };

        // Force a reload if the image is already cached but failed
        // This handles the case where the image was cached as broken
        if (heroImage.complete && heroImage.naturalHeight === 0) {
            heroImage.onerror.call(heroImage);
        }
    }

    const intro = document.getElementById("article-intro");
    if (intro) intro.textContent = article.shortDescription;
};
const renderContent = (article) => {
    const container = document.getElementById("article-content");
    if (!container) return;
    container.innerHTML = article.content.map(renderContentBlock).join("");
};

const renderToc = (article) => {
    const tocList = document.getElementById("toc-list");
    if (!tocList) return;

    const headings = article.content.filter((b) => b.type === "heading");
    if (headings.length === 0) {
        tocList.closest("[data-toc-card]")?.classList.add("hidden");
        return;
    }

    tocList.innerHTML = headings
        .map(
            (h, i) => `
      <li>
        <a href="#${h.id}" data-toc-target="${h.id}"
           class="toc-link block border-l-2 pl-3 border-transparent text-article-light-gray hover:text-primary-green transition-colors ${i === 0 ? "border-primary-green text-primary-green font-semibold" : ""
                }">
          ${escapeHtml(h.text)}
        </a>
      </li>`
        )
        .join("");

    setupTocScrollSpy(headings.map((h) => h.id));
};

/** Highlights the current section in the TOC as the reader scrolls. */
const setupTocScrollSpy = (headingIds) => {
    const links = document.querySelectorAll("[data-toc-target]");
    if (!links.length) return;

    const setActive = (id) => {
        links.forEach((link) => {
            const isActive = link.dataset.tocTarget === id;
            link.classList.toggle("border-primary-green", isActive);
            link.classList.toggle("text-primary-green", isActive);
            link.classList.toggle("font-semibold", isActive);
            link.classList.toggle("border-transparent", !isActive);
            link.classList.toggle("text-article-light-gray", !isActive);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        },
        { rootMargin: "-100px 0px -70% 0px" }
    );

    headingIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
};

const renderTags = (article) => {
    const el = document.getElementById("article-tags");
    if (!el) return;
    el.innerHTML = article.tags
        .map(
            (tag) => `
      <span class="px-3 py-1 bg-arctic-white text-article-light-gray text-xs border border-slate-mist rounded-full">
        #${escapeHtml(tag)}
      </span>`
        )
        .join("");
};

const relatedArticleCardHtml = (article) => `
  <article class="article-card bg-white border border-slate-mist rounded-2xl p-5 md:p-6 shadow-article hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
    <div class="flex items-start md:items-start gap-4">
      <!--
        Icon + image badge: the material icon renders first and always
        stays in the DOM. The image sits on top of it via absolute
        positioning. If the image loads, it visually covers the icon.
        If it 404s, its onerror handler removes just the <img>, and the
        icon underneath is revealed automatically — no blank circle.
      -->
      <div class="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-article-light-green flex items-center justify-center">
        <span class="material-symbols-outlined text-primary-green">${escapeHtml(article.icon || "description")}</span>
        <img src="${escapeHtml(resolveStaticUrl(article.heroImage))}" alt="hero section image"
             class="absolute inset-0 w-full h-full object-cover"
             onerror="this.remove();">
      </div>
      <div>
        <h3 class="font-bold text-article-black text-s2 mb-1 hover:text-emerald-teal transition-colors">
          ${escapeHtml(article.title)}
        </h3>
        <p class="text-b3 text-article-light-gray leading-relaxed max-w-2xl">
          ${escapeHtml(article.shortDescription)}
        </p>
        <div class="flex items-center gap-3 mt-2 text-c1 text-article-light-gray">
          <span class="px-2 py-0.5 text-primary-green font-medium rounded-full bg-article-light-green">${escapeHtml(article.readingTime)}</span>
          <span>&bull;</span>
          <span class="bg-article-light-yellow text-article-medium-yellow font-medium px-2 py-0.5 rounded-full text-[10px]">${escapeHtml(article.category)}</span>
        </div>
      </div>
    </div>
    <div class="self-end md:self-center shrink-0">
      <a href="${buildArticleUrl(article.id)}" data-article-id="${article.id}"
         class="inline-flex items-center gap-1 font-bold text-primary-green hover:text-primary-hover text-b3">
        <span>Read Article</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </a>
    </div>
  </article>`;

const renderRelatedArticles = (article) => {
    const container = document.getElementById("related-articles");
    const section = document.getElementById("related-articles-section");
    if (!container) return;

    const related = (article.relatedArticleIds || []).map(getArticleById).filter(Boolean);

    if (related.length === 0) {
        section?.classList.add("hidden");
        return;
    }

    container.innerHTML = related.map(relatedArticleCardHtml).join("");
};

/** Sidebar list of other popular articles from the same category. */
const renderPopularInCategory = (article) => {
    const container = document.getElementById("popular-in-category-list");
    const heading = document.getElementById("popular-in-category-heading");
    if (!container) return;

    const popular = ARTICLES.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 5);

    if (heading) heading.textContent = `Popular in ${article.category}`;

    if (popular.length === 0) {
        container.closest("[data-popular-card]")?.classList.add("hidden");
        return;
    }

    container.innerHTML = popular
        .map(
            (a) => `
      <li>
        <a href="${buildArticleUrl(a.id)}" data-article-id="${a.id}"
           class="block transition-colors leading-relaxed hover:text-primary-hover">
          ${escapeHtml(a.title)}
        </a>
      </li>`
        )
        .join("");
};

const renderFeedbackButtons = () => {
    const yes = document.getElementById("feedback-yes");
    const no = document.getElementById("feedback-no");
    const status = document.getElementById("feedback-status");

    const handleFeedback = () => {
        if (status) status.textContent = "Thanks for your feedback!";
        yes?.setAttribute("disabled", "true");
        no?.setAttribute("disabled", "true");
        // Hook point: send feedback to analytics/backend here.
    };

    yes?.addEventListener("click", handleFeedback);
    no?.addEventListener("click", handleFeedback);
};

/** Renders a friendly empty state when the requested article ID doesn't exist. */
const renderNotFound = () => {
    const main = document.getElementById("article-main");
    if (!main) return;
    main.innerHTML = `
    <div class="lg:col-span-12 bg-white border border-slate-mist shadow-article p-10 rounded-2xl text-center">
      <span class="material-symbols-outlined text-primary-green text-[48px]">search_off</span>
      <h1 class="text-2xl font-bold text-article-black mt-4">Article Not Found</h1>
      <p class="text-b2 text-article-medium-gray mt-2 max-w-md mx-auto">
        We couldn't find the article you were looking for. It may have been moved or renamed.
      </p>
      <a href="/help-center"
         class="mt-6 inline-flex items-center gap-2 bg-primary-green hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all">
        <span class="material-symbols-outlined text-[18px]">arrow_back</span>
        Back to Help Center
      </a>
    </div>`;
    document.title = "Article Not Found | FE Help Center";
};

/* ============================================================
   5. "READ ARTICLE" PREVIEW MODAL
   ---------------------------------------------------------------
   The Related Articles section always renders exactly 3 cards
   (one per id in relatedArticleIds) with a "Read Article" link.
   Rather than navigating away immediately, clicking that link (or
   a "Popular in [category]" sidebar link) opens a quick preview
   popup first — image, category, title, description, reading time
   — with a button to continue to the full article.

   Requires the modal markup block with id="article-preview-modal"
   in articles.html. If that markup isn't present, this silently
   does nothing and links fall back to normal navigation.
   ============================================================ */

// Remembers where the page was scrolled to before the modal opened, so we
// can restore it exactly — see lockBodyScroll()/unlockBodyScroll() below.
let scrollPositionBeforeModal = 0;

/**
 * Prevents the page behind the modal from scrolling.
 *
 * IMPORTANT: we deliberately do NOT just toggle an "overflow-hidden" class
 * on <body>. Doing that while the page is already scrolled down causes the
 * browser to visually snap back to the top the instant overflow changes —
 * that's the "page scrolls up and the sidebar looks blank" bug. Pinning
 * <body> with position:fixed and a negative top offset freezes the exact
 * scroll position instead, and unlockBodyScroll() below restores it.
 */
const lockBodyScroll = () => {
    scrollPositionBeforeModal = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPositionBeforeModal}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
};

const unlockBodyScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, scrollPositionBeforeModal);
};

const getPreviewModalEls = () => ({
    modal: document.getElementById("article-preview-modal"),
    backdrop: document.getElementById("article-preview-backdrop"),
    closeBtn: document.getElementById("article-preview-close"),
    icon: document.getElementById("article-preview-icon"),
    image: document.getElementById("article-preview-image"),
    category: document.getElementById("article-preview-category"),
    title: document.getElementById("article-preview-title"),
    description: document.getElementById("article-preview-description"),
    readingTime: document.getElementById("article-preview-reading-time"),
    cta: document.getElementById("article-preview-cta"),
});

const openArticlePreview = (article) => {
    const els = getPreviewModalEls();
    if (!els.modal) return;

    // Icon renders first (always present); the image, if it loads, sits
    // on top of it via absolute positioning (see the CSS on the modal
    // markup in articles.html). If the image 404s, its onerror handler
    // removes just the <img>, leaving the icon visible underneath.
    if (els.icon) els.icon.textContent = article.icon || "description";
    if (els.image) {
        els.image.src = resolveStaticUrl(article.heroImage);
        els.image.alt = article.title;
    }
    if (els.category) els.category.textContent = article.category;
    if (els.title) els.title.textContent = article.title;
    if (els.description) els.description.textContent = article.shortDescription;
    if (els.readingTime) els.readingTime.textContent = article.readingTime;
    if (els.cta) els.cta.href = buildArticleUrl(article.id);

    els.modal.classList.remove("hidden");
    lockBodyScroll();
};

const closeArticlePreview = () => {
    const els = getPreviewModalEls();
    els.modal?.classList.add("hidden");
    unlockBodyScroll();
};

/** Wires up click-to-preview behavior once per page load. */
const setupArticlePreviewModal = () => {
    const els = getPreviewModalEls();
    if (!els.modal) return; // Modal markup not present on this page — skip silently.

    // Defensive move: if any ancestor element in layout.html has a CSS
    // transform/filter/perspective on it, position:fixed on this modal
    // would anchor to THAT ancestor instead of the viewport, making the
    // modal appear in the wrong place or clip oddly. Re-parenting it to
    // <body> guarantees fixed positioning always behaves correctly.
    if (els.modal.parentElement !== document.body) {
        document.body.appendChild(els.modal);
    }

    els.closeBtn?.addEventListener("click", closeArticlePreview);
    els.backdrop?.addEventListener("click", closeArticlePreview);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeArticlePreview();
    });

    // Event delegation catches links even though they're injected
    // dynamically into #related-articles / #popular-in-category-list.
    document.addEventListener("click", (e) => {
        const link = e.target.closest("[data-article-id]");
        if (!link) return;

        // Only intercept "Read Article" / sidebar links — not the
        // breadcrumb's category link, which should navigate directly.
        const inRelated = link.closest("#related-articles");
        const inPopularSidebar = link.closest("#popular-in-category-list");
        if (!inRelated && !inPopularSidebar) return;

        const article = getArticleById(link.dataset.articleId);
        if (!article) return;

        e.preventDefault();
        openArticlePreview(article);
    });
};

/* ============================================================
   6. HELP CENTER SEARCH
   ---------------------------------------------------------------
   Powers the search box + "Popular Searches" tags on the Help
   Center page. This whole block only activates if #help-search-input
   is present in the DOM — on the article page it simply does
   nothing, so it's safe to include articles.js on both pages.

   BEHAVIOR
     1. User types their full query, then explicitly submits it by
        clicking the Search button or pressing Enter (clicking a
        Popular Search tag also counts as an explicit submit).
        Nothing happens while they're still typing — there's no
        live/as-you-type search.
     2. We find the single best-matching article by title/tags/
        category/description.
     3. If a card for that article is currently visible on the page
        (i.e. has a matching data-article-id), it gets visually
        highlighted (green ring) and scrolled into view.
     4. A status line confirms the match and invites the user to
        click the highlighted card themselves — we do NOT auto-
        navigate anywhere. The user decides when to open it.
     5. Submitting a new search clears the previous highlight first,
        so only the latest match is ever highlighted.
   ============================================================ */

// Tracks the currently-highlighted card element(s) so a new search
// can cleanly clear them before highlighting the next match.
let highlightedCardEls = [];

/** Scores how well one article matches a query. Higher = better match. 0 = no match. */
const scoreArticleMatch = (article, query) => {
    const q = query.trim().toLowerCase();
    if (!q) return 0;

    if (article.title.toLowerCase().includes(q)) return 3;
    if (article.tags.some((tag) => tag.toLowerCase().includes(q))) return 2;
    if (article.category.toLowerCase().includes(q)) return 2;
    if (article.shortDescription.toLowerCase().includes(q)) return 1;
    return 0;
};

/** Returns the single highest-scoring article for a query, or null if nothing matches. */
const findBestArticleMatch = (query) => {
    let best = null;
    let bestScore = 0;

    ARTICLES.forEach((article) => {
        const score = scoreArticleMatch(article, query);
        if (score > bestScore) {
            bestScore = score;
            best = article;
        }
    });

    return best;
};

const clearSearchHighlight = () => {
    highlightedCardEls.forEach((el) => {
        el.classList.remove("ring-4", "ring-primary-green", "ring-offset-2");
    });
    highlightedCardEls = [];
};

/**
 * Highlights every on-page card matching this article id. A single
 * article can appear on the Help Center twice (e.g. as both a
 * category-landing card and a Popular Article card) — both get
 * highlighted if present.
 */
const highlightArticleCards = (articleId) => {
    clearSearchHighlight();
    const matches = document.querySelectorAll(`[data-article-id="${articleId}"]`);
    matches.forEach((el) => {
        // Only highlight actual card containers, not the small "Read
        // Article" / sidebar links that also carry data-article-id.
        const card = el.closest(".article-card, .category-card") || el;
        card.classList.add("ring-4", "ring-primary-green", "ring-offset-2");
        highlightedCardEls.push(card);
    });

    if (matches.length > 0) {
        matches[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

const showSearchStatus = (message) => {
    const status = document.getElementById("help-search-status");
    if (!status) return;
    status.textContent = message;
    status.classList.remove("hidden");
};

const hideSearchStatus = () => {
    document.getElementById("help-search-status")?.classList.add("hidden");
};

/** The single entry point for every search submission (button, Enter, tag click). */
const runHelpCenterSearch = (query) => {
    if (!query.trim()) {
        clearSearchHighlight();
        hideSearchStatus();
        return;
    }

    const match = findBestArticleMatch(query);

    if (!match) {
        clearSearchHighlight();
        showSearchStatus(`No matching article found for "${query}".`);
        return;
    }

    highlightArticleCards(match.id);
    showSearchStatus(`Found "${match.title}" — click the highlighted card to open it.`);
};

const setupHelpCenterSearch = () => {
    const input = document.getElementById("help-search-input");
    if (!input) return; // Not on the Help Center page — nothing to do.

    const button = document.getElementById("help-search-button");
    const tags = document.querySelectorAll(".help-search-tag");

    // Search only runs on an explicit submit — NOT on every keystroke.
    button?.addEventListener("click", () => runHelpCenterSearch(input.value));

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            runHelpCenterSearch(input.value);
        }
    });

    // Popular Searches tags fill the input and submit immediately —
    // clicking one is itself an explicit "search for this" action.
    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
            const term = tag.dataset.searchTerm || tag.textContent.trim();
            input.value = term;
            input.focus();
            runHelpCenterSearch(term);
        });
    });
};

/* ============================================================
   7. ENTRY POINT
   ============================================================ */

const renderArticlePage = () => {
    const id = getArticleIdFromUrl();
    const article = id ? getArticleById(id) : undefined;

    console.log("Article ID:", id);
    console.log("Article found:", article);
    if (article) {
        console.log("Hero image path:", article.heroImage);
        console.log("Resolved URL:", resolveStaticUrl(article.heroImage));
    }

    setupArticlePreviewModal();

    if (!article) {
        renderNotFound();
        return;
    }

    document.getElementById("article-main")?.setAttribute("data-article-id", article.id);

    renderBreadcrumb(article);
    renderHero(article);
    renderContent(article);
    renderToc(article);
    renderTags(article);
    renderRelatedArticles(article);
    renderPopularInCategory(article);
    renderFeedbackButtons();
};

document.addEventListener("DOMContentLoaded", () => {
    // Each of these is internally guarded to no-op if its target markup
    // isn't on the current page, so it's safe to include this one script
    // on both the Help Center page and the individual article page.
    setupHelpCenterSearch();
    renderArticlePage();
});

window.FEArticles = {
    ARTICLES,
    CATEGORY_LANDING_ARTICLE,
    getArticleById,
    buildArticleUrl,
    resolveStaticUrl,
};