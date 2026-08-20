document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // MOCK DATA
    // =============================================
    const engineers = [
        { name: 'Rahul Sharma', rating: '4.8', reviews: 248, initials: 'RS', color: 'bg-primary-yellow text-white' },
        { name: 'Rahul Sharma', rating: '4.8', reviews: 248, initials: 'RS', color: 'bg-electric-violet text-white' },
        { name: 'Rahul Sharma', rating: '4.8', reviews: 248, initials: 'RS', color: 'bg-dark-orange text-white' }
    ];

   function makeOffer(i) {
    const offerConfigs = [
        { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow' },
        { title: 'CCTV Installation', icon: 'photo_camera', bg: 'bg-lavender-mist', color: 'text-purple-500' },
        { title: 'Fiber Optic Setup', icon: 'device_hub', bg: 'bg-amber-50', color: 'text-amber-500' },
        { title: 'Server Room Setup', icon: 'dns', bg: 'bg-emerald-50', color: 'text-emerald-500' },
        { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow' },
        { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow' }
    ];

    const cfg = offerConfigs[i % offerConfigs.length];
    const eng = engineers[i % engineers.length];

    return {
        status: 'offer',
        title: cfg.title,
        icon: cfg.icon,
        bg: cfg.bg,
        color: cfg.color,
        location: 'DLF Cyber City, Gurgaon',
        date: '29 May 2026',
        time: '15 Hours',
        engineer: eng,
        engineersCount: 10,
        price: '7,434'
    };
}
    function makeConfirmed(i) {
        const iconConfigs = [
            { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow', engBg: 'bg-amber-400' },
            { title: 'Rack Installation', icon: 'dns', bg: 'bg-emerald-50', color: 'text-emerald-500', engBg: 'bg-emerald-600' },
            { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow', engBg: 'bg-amber-400' }
        ];
        const cfg = iconConfigs[i % iconConfigs.length];
        return {
            status: 'confirmed',
            title: cfg.title,
            icon: cfg.icon, bg: cfg.bg, color: cfg.color,
            bookingId: 'BK-56874',
            location: 'DLF Cyber City, Gurgaon',
            date: '29 May 2026',
            time: '12 Hours',
            engineer: { name: 'Rahul Sharma', rating: '4.8', reviews: 248, initials: 'RS', color: cfg.engBg + ' text-white' },
            vendor: 'Tech Solutions Pvt. Ltd.'
        };
    }

    function makeInProgress(i) {
        const iconConfigs = [
            { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow' },
            { title: 'Network Cabling', icon: 'photo_camera', bg: 'bg-lavender-mist', color: 'text-purple-500' }
        ];
        const cfg = iconConfigs[i % iconConfigs.length];
        return {
            status: 'inprogress',
            title: cfg.title,
            icon: cfg.icon, bg: cfg.bg, color: cfg.color,
            bookingId: 'BK-56874',
            location: 'DLF Cyber City, Gurgaon',
            date: '29 May 2026',
            time: '12 Hours',
            engineersCount: 10
        };
    }

    function makeCompleted(i) {
        return {
            status: 'completed',
            title: 'Network Cabling',
            icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow',
            bookingId: 'BK-56874',
            location: 'DLF Cyber City, Gurgaon',
            date: '29 May 2026',
            time: '12 Hours',
            completedDate: '18 jan 2024 at 01:30 PM',
            paidAmount: '12,500',
            engineersCount: 10
        };
    }

    function makeCancelled(i) {
        const iconConfigs = [
            { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow' },
            { title: 'Network Cabling', icon: 'photo_camera', bg: 'bg-lavender-mist', color: 'text-purple-500' }
        ];
        const cfg = iconConfigs[i % iconConfigs.length];
        return {
            status: 'cancelled',
            title: cfg.title,
            icon: cfg.icon, bg: cfg.bg, color: cfg.color,
            bookingId: 'BK-56874',
            location: 'DLF Cyber City, Gurgaon',
            date: '29 May 2026',
            time: '12 Hours',
            cancelledDate: '28 April 2026',
            estPrice: '7,434'
        };
    }

    let bookings = [];
    for (let i = 0; i < 6; i++) bookings.push(makeOffer(i));
    for (let i = 0; i < 5; i++) bookings.push(makeConfirmed(i));
    for (let i = 0; i < 7; i++) bookings.push(makeInProgress(i));
    for (let i = 0; i < 4; i++) bookings.push(makeCompleted(i));
    for (let i = 0; i < 2; i++) bookings.push(makeCancelled(i));

    // =============================================
    // ELEMENTS
    // =============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const metricCards = document.querySelectorAll('.metric-card');
    const bookingContainer = document.getElementById('bookingContainer');
    const activeTabTitle = document.getElementById('activeTabTitle');
    const activeTabCount = document.getElementById('activeTabCount');
    const showingCountText = document.getElementById('showingCountText');

    const sortBtn = document.getElementById('sortBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortOptions = document.querySelectorAll('.sort-option');

    let currentTab = 'all';
    let currentSort = 'recent';

    // =============================================
    // CARD RENDERERS
    // Each button gets a class prefixed by its section:
    //   offer-...-btn      -> Offers cards
    //   confirmed-...-btn  -> Confirmed cards
    //   progress-...-btn   -> In Progress cards
    //   completed-...-btn  -> Completed cards
    //   cancelled-...-btn  -> Cancelled cards
    // =============================================

    // 1. OFFER ROW
    function offerRow(b, index) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4" data-index="${index}" data-status="offer">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-3 min-w-[240px]">
                    <div class="w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined ${b.color} text-[20px]">${b.icon}</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-ink text-sm">${b.title}</h4>
                            <span class="status-pill badge-offers">Offers</span>
                        </div>
                        <div class="text-xs text-slate-500 mt-1 flex items-center gap-3">
                            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}</span>
                        </div>
                        <div class="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">calendar_today</span>${b.date}</span>
                            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}</span>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full ${b.engineer.color} flex items-center justify-center text-xs font-bold shrink-0">
                        ${b.engineer.initials}
                    </div>
                    <div class="text-xs">
                        <p class="font-bold text-ink">${b.engineer.name}</p>
                        <p class="text-slate-500 flex items-center gap-1 mt-0.5">
                            <span class="material-symbols-outlined text-[14px] text-amber-400">star</span>
                            <span class="font-bold text-ink">${b.engineer.rating}</span>
                            <span class="text-slate-400">(${b.engineer.reviews})</span>
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-1.5">
                            <span class="status-pill badge-onsite">On Site</span>
                            <span class="status-pill badge-team-leader">Team Leader</span>
                        </div>
                        <div class="flex items-center gap-2 mt-0.5">
                            <div class="flex -space-x-1.5">
                                <div class="w-4 h-4 rounded-full bg-slate-300 border border-white"></div>
                                <div class="w-4 h-4 rounded-full bg-slate-400 border border-white"></div>
                                <div class="w-4 h-4 rounded-full bg-slate-600 border border-white"></div>
                            </div>
                            <span class="text-xs font-semibold text-slate-700">${b.engineersCount} engineers</span>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <p class="text-[11px] font-semibold text-[#969696]">Estimated Price</p>
                    <p class="font-bold text-ink text-base">Rs.${b.price}</p>
                    <span class="status-pill badge-best-match mt-0.5">Best Match</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <button class="btn-outline-yellow offer-view-btn">View Details</button>
                    <button class="btn-fill-yellow offer-accept-btn">Accept Offer</button>
                </div>
            </div>
        </div>`;
    }

    // 2. CONFIRMED ROW
    function confirmedRow(b, index) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4" data-index="${index}" data-status="confirmed">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div class="flex items-center gap-3 min-w-[260px]">
                    <div class="w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined ${b.color} text-[20px]">${b.icon}</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-ink text-sm">${b.title}</h4>
                            <span class="badge-booking-id">${b.bookingId}</span>
                            <span class="status-pill badge-confirmed">Confirmed</span>
                        </div>
                        <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}
                            <span class="material-symbols-outlined text-[13px] ml-1">calendar_today</span>${b.date}
                        </p>
                        <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full ${b.engineer.color} flex items-center justify-center text-xs font-bold shrink-0">
                        ${b.engineer.initials}
                    </div>
                    <div class="text-xs">
                        <p class="font-bold text-ink">${b.engineer.name}</p>
                        <p class="text-slate-500 flex items-center gap-1 mt-0.5">
                            <span class="material-symbols-outlined text-[14px] text-amber-400">star</span>
                            <span class="font-bold text-ink">${b.engineer.rating}</span>
                            <span class="text-slate-400">(${b.engineer.reviews})</span>
                        </p>
                    </div>
                </div>

                <div class="text-xs">
                    <span class="text-slate-400 block">Vendor</span>
                    <span class="font-bold text-ink">${b.vendor}</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <button class="btn-outline-yellow confirmed-view-btn">View Details</button>
                    <button class="btn-fill-yellow confirmed-track-btn">Track Live</button>
                </div>
            </div>
        </div>`;
    }

    // 3. IN PROGRESS ROW
    function inProgressRow(b, index) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4" data-index="${index}" data-status="inprogress">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div class="flex items-center gap-3 min-w-[260px]">
                    <div class="w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined ${b.color} text-[20px]">${b.icon}</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-ink text-sm">${b.title}</h4>
                            <span class="badge-booking-id">${b.bookingId}</span>
                            <span class="status-pill badge-inprogress">In Progress</span>
                        </div>
                        <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}
                            <span class="material-symbols-outlined text-[13px] ml-1">calendar_today</span>${b.date}
                        </p>
                        <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-1.5">
                        <span class="status-pill badge-onsite">On Site</span>
                        <span class="status-pill badge-team-leader">Team Leader</span>
                    </div>
                    <div class="flex items-center gap-2 mt-0.5">
                        <div class="flex -space-x-1.5">
                            <div class="w-4 h-4 rounded-full bg-slate-300 border border-white"></div>
                            <div class="w-4 h-4 rounded-full bg-slate-400 border border-white"></div>
                            <div class="w-4 h-4 rounded-full bg-slate-600 border border-white"></div>
                        </div>
                        <span class="text-xs font-semibold text-slate-700">${b.engineersCount} engineers</span>
                    </div>
                </div>

                <div>
                    <span class="status-pill badge-inprogress px-3 py-1 text-xs">In Progress</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <button class="btn-outline-yellow progress-report-btn">View Report</button>
                    <button class="btn-fill-yellow progress-track-btn">Track Live</button>
                </div>
            </div>
        </div>`;
    }

    // 4. COMPLETED ROW
    function completedRow(b, index) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4" data-index="${index}" data-status="completed">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div class="flex items-center gap-3 min-w-[260px]">
                    <div class="w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined ${b.color} text-[20px]">${b.icon}</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-ink text-sm">${b.title}</h4>
                            <span class="badge-booking-id">${b.bookingId}</span>
                            <span class="status-pill badge-completed">Completed</span>
                        </div>
                        <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}
                            <span class="material-symbols-outlined text-[13px] ml-1">calendar_today</span>${b.date}
                        </p>
                        <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}
                        </p>
                        <p class="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">check_circle</span>
                            Job completed on ${b.completedDate}
                        </p>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <div class="flex items-center gap-1.5 mb-1">
                        <span class="status-pill badge-onsite">On Site</span>
                        <span class="status-pill badge-team-leader">Team Leader</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="flex -space-x-1.5">
                            <div class="w-4 h-4 rounded-full bg-slate-300 border border-white"></div>
                            <div class="w-4 h-4 rounded-full bg-slate-400 border border-white"></div>
                            <div class="w-4 h-4 rounded-full bg-slate-600 border border-white"></div>
                        </div>
                        <span class="text-xs font-semibold text-slate-700">${b.engineersCount} engineers</span>
                    </div>
                    <p class="font-extrabold text-ink text-base mt-3">$ ${b.paidAmount} paid</p>
                </div>

                <div>
                    <span class="status-pill badge-completed px-3 py-1 text-xs">Completed</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <button class="btn-outline-yellow completed-view-btn">View Details</button>
                    <button class="btn-fill-yellow completed-bookagain-btn">Book Again</button>
                </div>
            </div>
        </div>`;
    }

    // 5. CANCELLED ROW
    function cancelledRow(b, index) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4" data-index="${index}" data-status="cancelled">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div class="flex items-center gap-3 min-w-[260px]">
                    <div class="w-10 h-10 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined ${b.color} text-[20px]">${b.icon}</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="font-bold text-ink text-sm">${b.title}</h4>
                            <span class="badge-booking-id">${b.bookingId}</span>
                            <span class="status-pill badge-cancelled">Cancelled</span>
                        </div>
                        <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}
                            <span class="material-symbols-outlined text-[13px] ml-1">calendar_today</span>${b.date}
                        </p>
                        <p class="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}
                        </p>
                        <p class="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">info</span>
                            This booking was cancelled on ${b.cancelledDate}
                        </p>
                    </div>
                </div>

                <div class="text-center">
                    <p class="font-extrabold text-ink text-base">Est. $${b.estPrice}</p>
                </div>

                <div>
                    <span class="status-pill badge-cancelled px-3 py-1 text-xs">Cancelled</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <button class="btn-fill-yellow cancelled-bookagain-btn">Book Again</button>
                </div>
            </div>
        </div>`;
    }

    function rowHTML(b, index) {
        switch (b.status) {
            case 'offer': return offerRow(b, index);
            case 'confirmed': return confirmedRow(b, index);
            case 'inprogress': return inProgressRow(b, index);
            case 'completed': return completedRow(b, index);
            case 'cancelled': return cancelledRow(b, index);
            default: return offerRow(b, index);
        }
    }

    // =============================================
    // RENDER LOGIC
    // =============================================
    function getVisible() {
        let list = currentTab === 'all' ? bookings : bookings.filter(b => b.status === currentTab);
        if (currentSort === 'price') {
            list = [...list].sort((a, b) => parseFloat((b.price || b.paidAmount || b.estPrice || '0').replace(/,/g,'')) - parseFloat((a.price || a.paidAmount || a.estPrice || '0').replace(/,/g,'')));
        }
        if (currentSort === 'oldest') list = [...list].reverse();
        return list;
    }

    function render() {
        const visible = getVisible();

        const activeBtn = document.querySelector(`.tab-btn[data-tab="${currentTab}"]`);
        if (activeBtn) {
            activeTabTitle.textContent = activeBtn.dataset.label || activeBtn.innerText.split('\n')[0].trim();
            activeTabCount.textContent = visible.length;
        }

        showingCountText.textContent = `Showing ${visible.length} of ${bookings.length} bookings`;

        if (visible.length === 0) {
            bookingContainer.innerHTML = `
                <div class="text-center py-16">
                    <span class="material-symbols-outlined text-6xl text-gray-300 mb-4">event_busy</span>
                    <h3 class="text-lg font-semibold text-gray-600 mb-1">No bookings found</h3>
                    <p class="text-sm text-gray-400">Bookings in this category will show up here.</p>
                </div>`;
            return;
        }
        bookingContainer.innerHTML = visible.map((b, i) => rowHTML(b, i)).join('');
    }

    // =============================================
    // TABS & CARDS HANDLERS
    // =============================================
    function switchTab(targetTab) {
        currentTab = targetTab;
        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === currentTab));
        render();
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    metricCards.forEach(card => {
        card.addEventListener('click', () => switchTab(card.dataset.cardTab));
    });

    // =============================================
    // SORT DROPDOWN HANDLER
    // =============================================
    sortBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        sortDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => sortDropdown.classList.add('hidden'));
    sortOptions.forEach(opt => {
        opt.addEventListener('click', function () {
            currentSort = this.dataset.sort;
            sortDropdown.classList.add('hidden');
            render();
        });
    });

    // View All Offers Footer Action
    document.getElementById('viewAllOffersBtn').addEventListener('click', function() {
        switchTab('offer');
    });

    render();

    // =============================================
    // VIEW DETAILS (same-page toggle)
    // =============================================
    const listView = document.getElementById('listView');
    const detailsView = document.getElementById('detailsView');

    function showDetails(b) {
        let html = '';
        switch (b.status) {
            case 'offer':      html = offerDetailHTML(b);     break;
            case 'confirmed':  html = confirmedDetailHTML(b); break;
            case 'inprogress': html = progressDetailHTML(b);  break;
            case 'completed':  html = completeDetailHTML(b);  break;
            case 'cancelled':  html = cancelDetailHTML(b);    break;
            default:            html = offerDetailHTML(b);
        }
        detailsView.innerHTML = html;
        listView.classList.add('hidden');
        detailsView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        bindDetailTabHandlers();
    }

    function bindDetailTabHandlers() {
        document.getElementById('backToBookingBtn')?.addEventListener('click', () => {
            detailsView.classList.add('hidden');
            listView.classList.remove('hidden');
        });
    }

    // -------- shared partials --------
    function jobDetailsCardHTML(b) {
        return `
        <div class="detail-card mb-4">
            <h3 class="detail-card-title"><span class="material-symbols-outlined text-[18px] align-middle mr-1">description</span>Job Details</h3>
            <div class="job-detail-row"><span class="job-detail-label">Service Type</span><span class="job-detail-value">${b.title}</span></div>
            <div class="job-detail-row"><span class="job-detail-label">Location</span><span class="job-detail-value">${b.location}</span></div>
            <div class="job-detail-row"><span class="job-detail-label">Date</span><span class="job-detail-value">${b.date}</span></div>
            <div class="job-detail-row job-detail-row-last"><span class="job-detail-label">Duration</span><span class="job-detail-value">${b.time}</span></div>
        </div>`;
    }

    function scopeOfWorkCardHTML() {
        const scope = ['Rack setup and arrangement', 'Cable laying (Cat6)', 'Termination and labeling', 'Network testing and validation', 'Complete documentation and handover', 'Post-installation support'];
        return `
        <div class="detail-card mb-4">
            <h3 class="detail-card-title">Scope of Work</h3>
            <div class="scope-grid">
                ${scope.map(s => `<div class="scope-item"><span class="material-symbols-outlined text-primary-yellow text-[16px]">circle</span>${s}</div>`).join('')}
            </div>
        </div>`;
    }

    function whatsIncludedCardHTML() {
        const included = ['10 Verified Engineers', 'All tools and equipment', 'Testing and quality check', 'Work report and documentation', 'Post work support'];
        return `
        <div class="detail-card mb-4">
            <h3 class="detail-card-title">What's Included</h3>
            <div class="included-row">
                ${included.map(i => `<span class="included-pill"><span class="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>${i}</span>`).join('')}
            </div>
        </div>`;
    }

    function sidebarHTML(b) {
        const eng = b.engineer || { name: 'Rahul Sharma', rating: '4.8', reviews: 24, initials: 'RS', color: 'bg-dark-orange text-white' };
        return `
        <div class="lg:sticky lg:top-4">
            <div class="detail-card mb-4">
                <h3 class="detail-card-title">Team Leader</h3>
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full ${eng.color} flex items-center justify-center font-bold shrink-0">${eng.initials}</div>
                    <div>
                        <p class="font-bold text-ink text-sm">${eng.name}</p>
                        <p class="text-xs mt-0.5 flex items-center gap-2">
                            <span class="flex items-center gap-0.5 font-bold text-ink"><span class="material-symbols-outlined text-[14px] text-amber-400">star</span>${eng.rating}<span class="text-slate-400 font-normal">(${eng.reviews})</span></span>
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2 mt-3">
                    <button class="btn-outline-yellow flex-1">Call</button>
                    <button class="btn-fill-yellow flex-1">Message</button>
                </div>
            </div>
        </div>`;
    }

    function backButtonHTML() {
        return `
        <button id="backToBookingBtn" class="inline-flex items-center gap-1 text-sm font-semibold text-granite-gray hover:text-ink mb-4">
            <span class="material-symbols-outlined text-[18px]">arrow_back</span> Back to Booking
        </button>`;
    }

    // =============================================
    // 1. OFFER — id="offerViewDetail"
    // =============================================
    function offerDetailHTML(b) {
        return `
        <div id="offerViewDetail" class="detail-view">
            ${backButtonHTML()}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
                <div>
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined ${b.color} text-[22px]">${b.icon}</span>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h1 class="text-lg font-bold text-ink">${b.title}</h1>
                                        <span class="status-pill badge-offers">Offer</span>
                                    </div>
                                    <p class="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">calendar_today</span>${b.date}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="text-right shrink-0">
                                <p class="text-[11px] font-semibold text-[#969696]">Estimated Price</p>
                                <p class="font-bold text-ink text-xl">Rs.${b.price}</p>
                                <span class="status-pill badge-best-match mt-1">Best Match</span>
                                <button class="btn-fill-yellow offer-detail-accept-btn block mt-2 w-full">Accept Offer</button>
                            </div>
                        </div>
                    </div>

                    <div class="detail-card mb-4">
                        <h3 class="detail-card-title">Offers Timeline</h3>
                        <div class="timeline-row">
                            <div class="timeline-step">
                                <div class="timeline-icon timeline-icon-posted"><span class="material-symbols-outlined text-[16px]">event_available</span></div>
                                <div>
                                    <p class="text-sm font-semibold text-ink">Offer Posted</p>
                                    <p class="text-xs text-slate-500 flex items-center gap-1 mt-0.5">${b.date}, 09:00 AM</p>
                                </div>
                            </div>
                            <div class="timeline-line"></div>
                            <div class="timeline-step">
                                <div class="timeline-icon timeline-icon-expires"><span class="material-symbols-outlined text-[16px]">check</span></div>
                                <div>
                                    <p class="text-sm font-semibold text-ink">Offer Expires In</p>
                                    <p class="text-xs text-slate-500 flex items-center gap-1 mt-0.5">${b.date}, 12:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    ${jobDetailsCardHTML(b)}
                    ${scopeOfWorkCardHTML()}
                    ${whatsIncludedCardHTML()}
                </div>
                ${sidebarHTML(b)}
            </div>

            <div class="sticky-action-bar">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-emerald-500 text-[20px]">verified</span>
                    <span class="text-sm font-semibold text-ink">1 Verified Engineer Ready for Assignment</span>
                </div>
                <div class="flex items-center gap-6">
                    <div class="text-right"><p class="text-[11px] text-slate-400">Estimated Cost</p><p class="font-bold text-ink text-base">₹${b.price}</p></div>
                    <div class="flex items-center gap-2">
                        <button class="btn-outline-yellow offer-detail-cancel-btn">Cancel</button>
                        <button class="btn-fill-yellow offer-detail-accept-bottom-btn">Accept Offer</button>
                    </div>
                </div>
            </div>
        </div>`;
    }

    // =============================================
    // 2. CONFIRMED — id="confirmedViewDetail"
    // =============================================
    function confirmedDetailHTML(b) {
        return `
        <div id="confirmedViewDetail" class="detail-view">
            ${backButtonHTML()}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
                <div>
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined ${b.color} text-[22px]">${b.icon}</span>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h1 class="text-lg font-bold text-ink">${b.title}</h1>
                                        <span class="badge-booking-id">${b.bookingId}</span>
                                        <span class="status-pill badge-confirmed">Confirmed</span>
                                    </div>
                                    <p class="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">calendar_today</span>${b.date}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}</span>
                                    </p>
                                    <p class="text-xs text-slate-500 mt-1">Vendor: <span class="font-bold text-ink">${b.vendor}</span></p>
                                </div>
                            </div>
                            <div class="text-right shrink-0">
                                <button class="btn-fill-yellow confirmed-detail-track-btn block mt-2 w-full">Track Live</button>
                            </div>
                        </div>
                    </div>

                    ${jobDetailsCardHTML(b)}
                    ${scopeOfWorkCardHTML()}
                    ${whatsIncludedCardHTML()}
                </div>
                ${sidebarHTML(b)}
            </div>

            <div class="sticky-action-bar">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-emerald-500 text-[20px]">verified</span>
                    <span class="text-sm font-semibold text-ink">Booking confirmed with ${b.vendor}</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn-outline-yellow confirmed-detail-cancel-btn">Cancel</button>
                    <button class="btn-fill-yellow confirmed-detail-track-bottom-btn">Track Live</button>
                </div>
            </div>
        </div>`;
    }

    // =============================================
    // 3. IN PROGRESS — id="progressViewDetail"
    // =============================================
    function progressDetailHTML(b) {
        return `
        <div id="progressViewDetail" class="detail-view">
            ${backButtonHTML()}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
                <div>
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined ${b.color} text-[22px]">${b.icon}</span>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h1 class="text-lg font-bold text-ink">${b.title}</h1>
                                        <span class="badge-booking-id">${b.bookingId}</span>
                                        <span class="status-pill badge-inprogress">In Progress</span>
                                    </div>
                                    <p class="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">calendar_today</span>${b.date}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>${b.time}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">engineering</span>${b.engineersCount} engineers on site</span>
                                    </p>
                                </div>
                            </div>
                            <div class="text-right shrink-0">
                                <button class="btn-fill-yellow progress-detail-track-btn block mt-2 w-full">Track Live</button>
                            </div>
                        </div>
                    </div>

                    ${jobDetailsCardHTML(b)}
                    ${scopeOfWorkCardHTML()}
                    ${whatsIncludedCardHTML()}
                </div>
                ${sidebarHTML(b)}
            </div>

            <div class="sticky-action-bar">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-amber-500 text-[20px]">schedule</span>
                    <span class="text-sm font-semibold text-ink">Work in progress — ${b.engineersCount} engineers on site</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn-outline-yellow progress-detail-report-btn">View Report</button>
                    <button class="btn-fill-yellow progress-detail-track-bottom-btn">Track Live</button>
                </div>
            </div>
        </div>`;
    }

    // =============================================
    // 4. COMPLETED — id="completeViewDetail"
    // =============================================
    function completeDetailHTML(b) {
        return `
        <div id="completeViewDetail" class="detail-view">
            ${backButtonHTML()}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
                <div>
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined ${b.color} text-[22px]">${b.icon}</span>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h1 class="text-lg font-bold text-ink">${b.title}</h1>
                                        <span class="badge-booking-id">${b.bookingId}</span>
                                        <span class="status-pill badge-completed">Completed</span>
                                    </div>
                                    <p class="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">calendar_today</span>${b.date}</span>
                                    </p>
                                    <p class="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                                        <span class="material-symbols-outlined text-[14px]">check_circle</span>Job completed on ${b.completedDate}
                                    </p>
                                </div>
                            </div>
                            <div class="text-right shrink-0">
                                <p class="text-[11px] font-semibold text-[#969696]">Amount Paid</p>
                                <p class="font-bold text-ink text-xl">Rs.${b.paidAmount}</p>
                                <button class="btn-fill-yellow completed-detail-bookagain-btn block mt-2 w-full">Book Again</button>
                            </div>
                        </div>
                    </div>

                    ${jobDetailsCardHTML(b)}
                    ${scopeOfWorkCardHTML()}
                    ${whatsIncludedCardHTML()}
                </div>
                ${sidebarHTML(b)}
            </div>

            <div class="sticky-action-bar">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
                    <span class="text-sm font-semibold text-ink">Job completed — Rs.${b.paidAmount} paid</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn-outline-yellow completed-detail-invoice-btn">View Invoice</button>
                    <button class="btn-fill-yellow completed-detail-bookagain-bottom-btn">Book Again</button>
                </div>
            </div>
        </div>`;
    }

    // =============================================
    // 5. CANCELLED — id="cancelViewDetail"
    // =============================================
    function cancelDetailHTML(b) {
        return `
        <div id="cancelViewDetail" class="detail-view">
            ${backButtonHTML()}
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">
                <div>
                    <div class="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined ${b.color} text-[22px]">${b.icon}</span>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <h1 class="text-lg font-bold text-ink">${b.title}</h1>
                                        <span class="badge-booking-id">${b.bookingId}</span>
                                        <span class="status-pill badge-cancelled">Cancelled</span>
                                    </div>
                                    <p class="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">location_on</span>${b.location}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">calendar_today</span>${b.date}</span>
                                    </p>
                                    <p class="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
                                        <span class="material-symbols-outlined text-[14px]">info</span>Cancelled on ${b.cancelledDate}
                                    </p>
                                </div>
                            </div>
                            <div class="text-right shrink-0">
                                <p class="text-[11px] font-semibold text-[#969696]">Estimated Price</p>
                                <p class="font-bold text-ink text-xl">Rs.${b.estPrice}</p>
                                <button class="btn-fill-yellow cancelled-detail-bookagain-btn block mt-2 w-full">Book Again</button>
                            </div>
                        </div>
                    </div>

                    ${jobDetailsCardHTML(b)}
                </div>
                ${sidebarHTML(b)}
            </div>

            <div class="sticky-action-bar">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-red-500 text-[20px]">cancel</span>
                    <span class="text-sm font-semibold text-ink">This booking was cancelled</span>
                </div>
                <div class="flex items-center gap-2">
                    <button class="btn-fill-yellow cancelled-detail-bookagain-bottom-btn">Book Again</button>
                </div>
            </div>
        </div>`;
    }

    // =============================================
    // ROW BUTTON CLICK HANDLER (uses classList, not text)
    // =============================================
    bookingContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        const row = btn.closest('.booking-row');
        if (!row) return;
        const idx = Number(row.dataset.index);
        const clicked = getVisible()[idx];
        if (!clicked) return;

        // "View Details" style buttons -> open details page
        if (
            btn.classList.contains('offer-view-btn') ||
            btn.classList.contains('confirmed-view-btn') ||
            btn.classList.contains('completed-view-btn')
        ) {
            showDetails(clicked);
            return;
        }

        // Other row-level actions can be handled here by class name, e.g.:
        // if (btn.classList.contains('offer-accept-btn')) { ... }
        // if (btn.classList.contains('progress-report-btn')) { showDetails(clicked); }
        // if (btn.classList.contains('progress-track-btn')) { ... }
        // if (btn.classList.contains('completed-bookagain-btn')) { ... }
        // if (btn.classList.contains('cancelled-bookagain-btn')) { ... }
    });

});