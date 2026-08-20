
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
        { 
            title: 'Network Cabling', 
            icon: 'device_hub', 
            bg: 'bg-cloud-blue', 
            color: 'text-primary-yellow' 
        },
        { 
            title: 'CCTV Installation', 
            icon: 'photo_camera', 
            bg: 'bg-lavender-mist', 
            color: 'text-purple-500' 
        },
        { 
            title: 'Fiber Optic Setup', 
            icon: 'device_hub', 
            bg: 'bg-amber-50', 
            color: 'text-amber-500' 
        },
        { 
            title: 'Server Room Setup', 
            icon: 'dns', 
            bg: 'bg-emerald-50', 
            color: 'text-emerald-500' 
        },
        { 
            title: 'Network Cabling', 
            icon: 'device_hub', 
            bg: 'bg-cloud-blue', 
            color: 'text-primary-yellow' 
        },
        { 
            title: 'Network Cabling', 
            icon: 'device_hub', 
            bg: 'bg-cloud-blue', 
            color: 'text-primary-yellow' 
        }
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
    // =============================================

    // 1. OFFER ROW
    function offerRow(b) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4">
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
                    <button class="btn-outline-yellow">View Details</button>
                    <button class="btn-fill-yellow">Accept Offer</button>
                </div>
            </div>
        </div>`;
    }

    // 2. CONFIRMED ROW
    function confirmedRow(b) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4">
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
                    <button class="btn-outline-yellow">View Details</button>
                    <button class="btn-fill-yellow">Track Live</button>
                </div>
            </div>
        </div>`;
    }

    // 3. IN PROGRESS ROW
    function inProgressRow(b) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4">
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
                    <button class="btn-outline-yellow">View Report</button>
                    <button class="btn-fill-yellow">Track Live</button>
                </div>
            </div>
        </div>`;
    }

    // 4. COMPLETED ROW (Paid amount placed below engineers count)
    function completedRow(b) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4">
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

                <!-- Engineers & Paid Info Stacked Center Column -->
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
                    <button class="btn-outline-yellow">View Details</button>
                    <button class="btn-fill-yellow">Book Again</button>
                </div>
            </div>
        </div>`;
    }

    // 5. CANCELLED ROW
    function cancelledRow(b) {
        return `
        <div class="booking-row bg-white border border-slate-200 rounded-xl p-4">
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
                    <button class="btn-fill-yellow">Book Again</button>
                </div>
            </div>
        </div>`;
    }

    function rowHTML(b) {
        switch (b.status) {
            case 'offer': return offerRow(b);
            case 'confirmed': return confirmedRow(b);
            case 'inprogress': return inProgressRow(b);
            case 'completed': return completedRow(b);
            case 'cancelled': return cancelledRow(b);
            default: return offerRow(b);
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
        
        // Update Section Header Title and Badge Count
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${currentTab}"]`);
        if (activeBtn) {
            activeTabTitle.textContent = activeBtn.dataset.label || activeBtn.innerText.split('\n')[0].trim();
            activeTabCount.textContent = visible.length;
        }

        // Update Bottom Footer Count
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
        bookingContainer.innerHTML = visible.map(rowHTML).join('');
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
    const backBtn = document.getElementById('backToBookingBtn');

    function fillText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function showDetails(b) {
        const isOffer = b.status === 'offer';

        fillText('dTitle', b.title);
        fillText('dBookingId', b.bookingId || 'BK-56874');
        fillText('dLocation', b.location);
        fillText('dLocation2', b.location);
        fillText('dDate', b.date);
        fillText('dDate2', b.date);
        fillText('dDuration', b.time);
        fillText('dDuration2', b.time);
        fillText('dServiceType', b.title);
        fillText('dDescription', `End to end ${b.title.toLowerCase()} for office setup including setup, testing and handover.`);
        fillText('dCreatedOn', b.date + ', 10:30 AM');
        fillText('dPosted', b.date + ', 09:00 AM');
        fillText('dExpires', b.date + ', 12:00 PM');
        fillText('dPrice', b.price || b.estPrice || b.paidAmount || '7,434');
        fillText('dBottomPrice', b.price || b.estPrice || b.paidAmount || '7,434');
        fillText('dEngAssigned', isOffer ? '1' : (b.engineersCount || 1));

        const eng = b.engineer || { name: 'Rahul Sharma', rating: '4.8', reviews: 24, initials: 'RS' };
        fillText('dEngName', eng.name);
        fillText('dEngRating', eng.rating);
        fillText('dEngReviews', eng.reviews);
        fillText('dEngAvatar', eng.initials);
        fillText('dTrackEngineers', b.engineersCount || 10);
        fillText('dTrackRating', eng.rating);

        // status pill
        const pill = document.getElementById('dStatusPill');
        pill.textContent = b.status.charAt(0).toUpperCase() + b.status.slice(1);
        pill.className = 'status-pill badge-' + (b.status === 'inprogress' ? 'inprogress' : b.status === 'offer' ? 'offers' : b.status);

        // icon
        const iconWrap = document.getElementById('dTitleIconWrap');
        const icon = document.getElementById('dTitleIcon');
        iconWrap.className = 'w-12 h-12 rounded-xl ' + (b.bg || 'bg-cloud-blue') + ' flex items-center justify-center shrink-0';
        icon.className = 'material-symbols-outlined ' + (b.color || 'text-primary-yellow') + ' text-[22px]';
        icon.textContent = b.icon || 'device_hub';

        // scope of work (generic list since mock data has none)
        const scope = [
            'Rack setup and arrangement', 'Cable laying (Cat6)',
            'Termination and labeling', 'Network testing and validation',
            'Complete documentation and handover', 'Post-installation support'
        ];
        document.getElementById('dScopeGrid').innerHTML = scope.map(s =>
            `<div class="scope-item"><span class="material-symbols-outlined text-primary-yellow text-[16px]">circle</span>${s}</div>`
        ).join('');

        // what's included
        const included = ['10 Verified Engineers', 'All tools and equipment', 'Testing and quality check', 'Work report and documentation', 'Post work support'];
        document.getElementById('dIncludedRow').innerHTML = included.map(i =>
            `<span class="included-pill"><span class="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>${i}</span>`
        ).join('');

        fillText('dBottomEngText', (isOffer ? '1' : (b.engineersCount || 1)) + ' Verified Engineer' + ((b.engineersCount || 1) != 1 ? 's' : '') + ' Ready for Assignment');

        listView.classList.add('hidden');
        detailsView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    bookingContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;
        if (btn.textContent.trim() !== 'View Details') return;
        const row = btn.closest('.booking-row');
        const idx = [...bookingContainer.children].indexOf(row);
        const clicked = getVisible()[idx];
        showDetails(clicked);
    });

    backBtn.addEventListener('click', function () {
        detailsView.classList.add('hidden');
        listView.classList.remove('hidden');
    });

    // Detail Tabs
document.querySelectorAll('.detail-tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        document.getElementById('overviewContent').classList.add('hidden');
        document.getElementById('teamContent').classList.add('hidden');
        
        if (this.dataset.tab === 'overview') {
            document.getElementById('overviewContent').classList.remove('hidden');
        } else if (this.dataset.tab === 'team') {
            document.getElementById('teamContent').classList.remove('hidden');
        }
    });
});
});

