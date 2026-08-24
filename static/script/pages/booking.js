document.addEventListener('DOMContentLoaded', function () {

    /* =======================================================
   LIVE ENGINEER TRACKING VIEW LOGIC
======================================================== */
(function () {

    const trkEngineers = [
        { name: 'Rahul Sharma', role: 'Network Cabling Expert', status: 'On Site',  color: '#DC7B24', initials: 'RS', time: 'Checked in 10:33 AM' },
        { name: 'Rahul Sharma', role: 'Network Cabling Expert', status: 'On Route', color: '#00897B', initials: 'RS', time: 'Checked in 10:32 AM' },
        { name: 'Rahul Sharma', role: 'Network Cabling Expert', status: 'On Break', color: '#8B5CF6', initials: 'RS', time: 'Checked in 10:33 AM' },
        { name: 'Rahul Sharma', role: 'Network Cabling Expert', status: 'On Site',  color: '#F97316', initials: 'RS', time: 'Checked in 10:31 AM' },
        { name: 'Rahul Sharma', role: 'Network Cabling Expert', status: 'On Site',  color: '#6D28D9', initials: 'RS', time: 'Checked in 10:30 AM' },
    ];

    const statusColorMap = {
        'On Site':  ['#DCFCE7', '#16A34A'],
        'On Route': ['#FFF6E5', '#F5A623'],
        'On Break': ['#EDE9FE', '#7C3AED'],
        'Offline':  ['#F1F5F9', '#64748B']
    };

    function renderTrkEngineerList(list) {
        const container = document.getElementById('trkEngineerList');
        if (!container) return;

        if (!list.length) {
            container.innerHTML = '<p class="text-center text-sm text-slate-400 py-6">No engineers match your search.</p>';
            return;
        }

        container.innerHTML = list.map(eng => {
            const colors = statusColorMap[eng.status] || statusColorMap['Offline'];
            return `
            <div class="trk-eng-card">
                <div class="trk-eng-left">
                    <div class="trk-eng-avatar" style="background:${eng.color}">${eng.initials}</div>
                    <div>
                        <p class="trk-eng-name">${eng.name}</p>
                        <p class="trk-eng-role">${eng.role}</p>
                        <p class="trk-eng-time">${eng.time || ''}</p>
                        <span class="trk-eng-status-badge" style="background:${colors[0]};color:${colors[1]};">${eng.status}</span>
                    </div>
                </div>
                <button type="button" class="trk-track-btn">Track</button>
            </div>`;
        }).join('');
    }

    function initTrackingView() {
        renderTrkEngineerList(trkEngineers);

        const countEl = document.getElementById('trkEngCount');
        const viewAllCountEl = document.getElementById('trkViewAllCount');
        if (countEl) countEl.textContent = trkEngineers.length;
        if (viewAllCountEl) viewAllCountEl.textContent = trkEngineers.length;
    }

    function showTrackingView() {
        const detailsView = document.getElementById('detailsView');
        const trackingView = document.getElementById('trackingView');
        if (!trackingView) return;
        if (detailsView) detailsView.classList.add('hidden');
        trackingView.classList.remove('hidden');
        initTrackingView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function hideTrackingView() {
        const detailsView = document.getElementById('detailsView');
        const trackingView = document.getElementById('trackingView');
        if (!trackingView) return;
        trackingView.classList.add('hidden');
        if (detailsView) detailsView.classList.remove('hidden');
    }

    // ---- Delegated click handling (works even for dynamically rendered buttons) ----
    document.addEventListener('click', function (e) {

        // Open tracking view
        if (e.target.closest('#trackAllEngineersBtn') || e.target.closest('#dTrackLiveBtn')) {
            e.preventDefault();
            showTrackingView();
            return;
        }

        // Back button inside tracking view
        if (e.target.closest('#backToTeamViewBtn')) {
            e.preventDefault();
            hideTrackingView();
            return;
        }

        // Map / Satellite toggle
        const mapBtn = e.target.closest('.map-toggle-btn');
        if (mapBtn) {
            document.querySelectorAll('.map-toggle-btn').forEach(b => b.classList.remove('active'));
            mapBtn.classList.add('active');
            return;
        }
    });

    // ---- Delegated search input handling ----
    document.addEventListener('input', function (e) {
        if (e.target && e.target.id === 'trkSearchInput') {
            const q = e.target.value.toLowerCase().trim();
            const filtered = trkEngineers.filter(eng =>
                eng.name.toLowerCase().includes(q) || eng.role.toLowerCase().includes(q)
            );
            renderTrkEngineerList(filtered);
        }
    });

})();

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
            engineersCount: 10,
            engineer: { name: 'Rahul Sharma', rating: '4.8', reviews: 24, initials: 'RS', color: 'bg-dark-orange text-white' },

            // header panel
            totalAmount: '1,000',
            liveTimer: '01:15:20',
            overallProgress: 40,

            // job details
            estimatedDuration: '15 Hours',
            createdOn: '28 May 2026, 10:30 AM',
            paymentStatus: 'Unpaid',

            // milestone stepper (currentStep is 0-indexed into milestones array)
            currentStep: 2,
            milestones: [
                { label: 'Confirmed', date: '23 May 2026, 10:15 AM' },
                { label: 'Team Assigned', date: '23 May 2026, 03:45 PM' },
                { label: 'Work in Progress', date: '24 May 2026, 11:30 AM' },
                { label: 'Testing', date: '27 May 2026, 09:00 AM' },
                { label: 'Completed', date: 'Pending' }
            ],

            // additional tasks list
            tasks: [
                {
                    title: 'Extra Rack Installation',
                    status: 'Requested',
                    statusClass: 'bg-amber-50 text-amber-600',
                    subtext: 'Requested on 29 May, 11:20 AM',
                    cost: '2,500',
                    duration: null
                },
                {
                    title: 'Additional Cable Testing',
                    status: 'In-Progress',
                    statusClass: 'bg-emerald-50 text-emerald-600',
                    subtext: 'Accepted on 29 May, 12:20 AM',
                    cost: '2,500',
                    duration: '01:00 Hrs'
                }
            ],

            // team stats + availability ring (in %)
            teamStats: { total: 10, onSite: 3, onRoute: 2, onBreak: 0 },
            availability: 80,
            teamInfo: {
                reporting: '9:00 AM',
                workStart: '10:00 AM',
                duration: '15 Hours',
                breakTime: '1:00 AM - 1:30 AM'
            }
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

    // 1. OFFER ROW - View Details is CLICKABLE
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
                    <button class="offer-view-details btn-outline-yellow" data-status="offer">View Details</button>
                    <button class="btn-fill-yellow">Accept Offer</button>
                </div>
            </div>
        </div>`;
    }

    // 2. CONFIRMED ROW - View Details
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
                    <button class="confirmed-view-details btn-outline-yellow">View Details</button>
                    <button class="btn-fill-yellow">Track Live</button>
                </div>
            </div>
        </div>`;
    }

   
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
                    <button class="progress-view-details btn-outline-yellow">View Report</button>
                    <button class="btn-fill-yellow">Track Live</button>
                </div>
            </div>
        </div>`;
    }

    // 4. COMPLETED ROW - View Details
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
                    <button class="completed-view-details btn-outline-yellow">View Details</button>
                    <button class="btn-fill-yellow">Book Again</button>
                </div>
            </div>
        </div>`;
    }

    // 5. CANCELLED ROW - View Details is a regular button (no click functionality)
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
                    <button class="cancelled-view-details btn-outline-yellow">View Details</button>
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
            list = [...list].sort((a, b) => parseFloat((b.price || b.paidAmount || b.estPrice || b.totalAmount || '0').replace(/,/g,'')) - parseFloat((a.price || a.paidAmount || a.estPrice || a.totalAmount || '0').replace(/,/g,'')));
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
    // VIEW DETAILS / VIEW REPORT
    // =============================================
    const listView = document.getElementById('listView');
    const detailsView = document.getElementById('detailsView');
    const backBtn = document.getElementById('backToBookingBtn');

    // Elements that differ between Offer and In-Progress layouts
    const dAmountBlock = document.getElementById('dAmountBlock');
    const dOfferPriceBlock = document.getElementById('dOfferPriceBlock');
    const dProgressBlock = document.getElementById('dProgressBlock');
    const offersTimelineCard = document.getElementById('offersTimelineCard');
    const milestoneCard = document.getElementById('milestoneCard');
    const additionalTasksCard = document.getElementById('additionalTasksCard');
    const dPaymentStatusRow = document.getElementById('dPaymentStatusRow');
    const dCreatedOnRow = document.getElementById('dCreatedOnRow');
    const teamOverviewOfferBlock = document.getElementById('teamOverviewOfferBlock');
    const teamOverviewProgressBlock = document.getElementById('teamOverviewProgressBlock');
    const teamSearchRow = document.getElementById('teamSearchRow');
    const whyChooseTeamContainer = document.getElementById('whyChooseTeamContainer');
    const teamAvailabilityCard = document.getElementById('teamAvailabilityCard');
    const teamInfoCard = document.getElementById('teamInfoCard');
    const trackSummaryContainer = document.getElementById('trackSummaryContainer');
    const whyBestMatchContainer = document.getElementById('whyBestMatchContainer');
    const helpTitle = document.getElementById('helpTitle');
    const helpDesc = document.getElementById('helpDesc');
    const helpMainBtnText = document.getElementById('helpMainBtnText');
    const helpExtraButtons = document.getElementById('helpExtraButtons');
    const dEngCardTitle = document.getElementById('dEngCardTitle');

    // Tracks which booking is currently open, so the detail-tab click handler
    // (Overview vs Team & Engineers) knows which sidebar/content variant to show.
    let currentDetailBooking = null;

    function fillText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

  function renderMilestones(milestones, currentStep) {
    const wrap = document.getElementById('milestoneRow');
    wrap.innerHTML = milestones.map((m, idx) => {
        let iconName, circleClass;
        if (idx < currentStep) {
            iconName = 'check';
            circleClass = 'milestone-icon-done';
        } else if (idx === currentStep) {
            iconName = 'schedule';
            circleClass = 'milestone-icon-current';
        } else {
            iconName = '';
            circleClass = 'milestone-icon-pending';
        }

        // Segment connecting this node to the next one
        let lineClass;
        if (idx < currentStep - 1) {
            lineClass = 'milestone-line-done';
        } else if (idx === currentStep - 1) {
            lineClass = 'milestone-line-transition';
        } else {
            lineClass = 'milestone-line-pending';
        }

        const lineHTML = idx < milestones.length - 1 ? 
            `<div class="milestone-line ${lineClass}"></div>` : '';

        // Format date: split date and time into separate lines
        let dateHTML;
        const isPending = m.date.trim().toLowerCase() === 'pending';
        const dateClass = isPending ? 'milestone-date-pending' : 'milestone-date';
        
        if (m.date.includes(',')) {
            const parts = m.date.split(',');
            const datePart = parts[0].trim();
            const timePart = parts.slice(1).join(',').trim();
            dateHTML = `
                <p class="${dateClass}">${datePart}</p>
                <p class="${dateClass}">${timePart}</p>
            `;
        } else {
            dateHTML = `<p class="${dateClass}">${m.date}</p>`;
        }

        return `
            <div class="milestone-step">
                <div class="milestone-icon-row">
                    <div class="milestone-icon ${circleClass}">
                        ${iconName ? `<span class="material-symbols-outlined">${iconName}</span>` : ''}
                    </div>
                    ${lineHTML}
                </div>
                <p class="milestone-step-label">${m.label}</p>
                ${dateHTML}
            </div>
        `;
    }).join('');
}

  function renderTasks(tasks) {
    const list = document.getElementById('additionalTasksList');
    fillText('dTaskCount', tasks.length);

    list.innerHTML = tasks.map(t => `
        <div class="additional-task-row">

            <!-- Task -->
            <div class="additional-task-info">
                <div class="additional-task-icon ${t.status === 'Requested'
                    ? 'task-icon-requested'
                    : 'task-icon-progress'}">
                    
                    <span class="material-symbols-outlined">
                        ${t.status === 'Requested' ? 'hourglass_top' : 'check_circle'}
                    </span>
                </div>

                <div>
                    <p class="additional-task-title">
                        ${t.title}
                    </p>

                    <p class="additional-task-subtext">
                        ${t.subtext}
                    </p>
                </div>
            </div>


            <!-- Status - CENTER -->
            <div class="additional-task-status-wrapper">
                <span class="additional-task-status ${t.status === 'Requested'
                    ? 'status-review'
                    : 'status-progress'}">
                    ${t.status === 'Requested' ? 'In Review' : 'In Progress'}
                </span>
            </div>


            <!-- Estimated Cost -->
            <div class="additional-task-cost">
                <p class="additional-task-meta">Est Cost</p>
                <p class="additional-task-price">Rs.${t.cost}</p>
            </div>


            <!-- Estimated Duration -->
            <div class="additional-task-duration">
                ${t.duration ? `
                    <p class="additional-task-meta">Est Duration</p>
                    <p class="additional-task-duration-value">
                        ${t.duration}
                    </p>
                ` : ''}
            </div>

        </div>
    `).join('');
}

    function applyOverviewTabVariant(isInProgress) {
        // Overview tab: milestone/tasks vs offer timeline; sidebar track summary/why-best-match stay for both,
        // but only In Progress gets milestones + additional tasks + payment status.
        offersTimelineCard.classList.toggle('hidden', isInProgress);
        milestoneCard.classList.toggle('hidden', !isInProgress);
        additionalTasksCard.classList.toggle('hidden', !isInProgress);
        dPaymentStatusRow.classList.toggle('hidden', !isInProgress);
        dCreatedOnRow.classList.toggle('job-detail-row-last', !isInProgress);
        dPaymentStatusRow.classList.toggle('job-detail-row-last', isInProgress);
    }

    function applyTeamTabVariant(isInProgress) {
        teamOverviewOfferBlock.classList.toggle('hidden', isInProgress);
        teamOverviewProgressBlock.classList.toggle('hidden', !isInProgress);
        teamSearchRow.classList.toggle('hidden', !isInProgress);
        whyChooseTeamContainer.classList.toggle('hidden', isInProgress);
        teamAvailabilityCard.classList.toggle('hidden', !isInProgress);
        teamInfoCard.classList.toggle('hidden', !isInProgress);
    }

    function showDetails(b) {
        currentDetailBooking = b;
        if (b.status === 'confirmed') {
            showConfirmedDetails(b);
            return;
        }
        if (b.status === 'cancelled') {
            showCancelledDetails(b);
            return;
        }
        const isInProgress = b.status === 'inprogress';

        // ---- Header summary card ----
        fillText('dTitle', b.title);
        fillText('dBookingId', b.bookingId || 'BK-56874');
        fillText('dLocation', b.location);
        fillText('dLocation2', b.location);
        fillText('dDate', b.date);
        fillText('dDate2', b.date);
        fillText('dDuration', b.time);
        fillText('dDuration2', b.estimatedDuration || b.time);
        fillText('dServiceType', b.title);
        fillText('dCreatedOn', b.createdOn || (b.date + ', 10:30 AM'));

        const eng = b.engineer || { name: 'Rahul Sharma', rating: '4.8', reviews: 24, initials: 'RS' };
        fillText('dEngName', eng.name);
        fillText('dEngRating', eng.rating);
        fillText('dEngReviews', eng.reviews);
        fillText('dEngAvatar', eng.initials);
        fillText('dTrackEngineers', b.engineersCount || 10);
        fillText('dTrackRating', eng.rating);

        // status pill
        const pill = document.getElementById('dStatusPill');
        const iconWrap = document.getElementById('dTitleIconWrap');
        const icon = document.getElementById('dTitleIcon');
        iconWrap.className = 'w-12 h-12 rounded-xl ' + (b.bg || 'bg-cloud-blue') + ' flex items-center justify-center shrink-0';
        icon.className = 'material-symbols-outlined ' + (b.color || 'text-primary-yellow') + ' text-[22px]';
        icon.textContent = b.icon || 'device_hub';

        // scope of work + what's included (shared across offer/in-progress)
        const scope = [
            'Rack setup and arrangement', 'Cable laying (Cat6)',
            'Termination and labeling', 'Network testing and validation',
            'Complete documentation and handover', 'Post-installation support'
        ];
        document.getElementById('dScopeGrid').innerHTML = scope.map(s =>
            `<div class="scope-item">
                <span class="material-symbols-outlined text-primary-yellow text-[16px]" style="font-variation-settings: 'FILL' 1;">circle</span>
                ${s}
            </div>`
        ).join('');

        const included = ['10 Verified Engineers', 'All tools and equipment', 'Testing and quality check', 'Work report and documentation', 'Post work support'];
        document.getElementById('dIncludedRow').innerHTML = included.map(i =>
            `<span class="included-pill"><span class="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>${i}</span>`
        ).join('');

        if (isInProgress) {
            // ---- In Progress specific header ----
            pill.textContent = 'In Progress';
            pill.className = 'status-pill badge-inprogress';
            document.getElementById('dEngAssignedWrap').classList.remove('hidden');
            fillText('dEngAssigned', b.engineersCount || 10);

            dOfferPriceBlock.classList.add('hidden');
            dAmountBlock.classList.remove('hidden');
            dProgressBlock.classList.remove('hidden');
            fillText('dTotalAmount', b.totalAmount || '1,000');
            fillText('dLiveTimer', b.liveTimer || '01:15:20');
            fillText('dOverallProgress', b.overallProgress != null ? b.overallProgress : 40);
            document.getElementById('dProgressBar').style.width = (b.overallProgress != null ? b.overallProgress : 40) + '%';

            fillText('dDescription', `End to end ${b.title.toLowerCase()} for office setup including rack setup, cable pulling, termination, testing and handover.`);
            fillText('dPaymentStatus', b.paymentStatus || 'Unpaid');

            renderMilestones(b.milestones, b.currentStep);
            renderTasks(b.tasks);

            // team overview stats
            const stats = b.teamStats || { total: 10, onSite: 0, onRoute: 0, onBreak: 0 };
            fillText('dStatTotal', stats.total);
            fillText('dStatOnSite', stats.onSite);
            fillText('dStatOnRoute', stats.onRoute);
            fillText('dStatOnBreak', stats.onBreak);

            // availability ring: circumference = 2*pi*50 ≈ 314.16
            const pct = b.availability != null ? b.availability : 80;
            const circumference = 314.16;
            const offset = circumference - (circumference * pct / 100);
            document.getElementById('dAvailabilityRing').setAttribute('stroke-dasharray', circumference.toFixed(2));
            document.getElementById('dAvailabilityRing').setAttribute('stroke-dashoffset', offset.toFixed(2));
            fillText('dAvailabilityPct', pct + '%');

            const ti = b.teamInfo || {};
            fillText('dReportingTime', ti.reporting || '9:00 AM');
            fillText('dWorkStartTime', ti.workStart || '10:00 AM');
            fillText('dEstDuration', ti.duration || b.time);
            fillText('dBreakTime', ti.breakTime || '1:00 AM - 1:30 AM');

            fillText('dEngCardTitle', 'Team Leader');
            fillText('dBottomEngText', `${b.engineersCount || 10} Engineers Assigned to This Job`);
            fillText('dBottomPrice', b.totalAmount || '1,000');

            document.getElementById('dPrimaryActionBtn').textContent = 'Track Live';
            document.getElementById('dCancelBtn').classList.add('hidden');

            resetTeamSearch();
        } else {
            // ---- Offer (default) header ----
            pill.textContent = 'Offer';
            pill.className = 'status-pill badge-offers';

            dAmountBlock.classList.add('hidden');
            dProgressBlock.classList.add('hidden');
            dOfferPriceBlock.classList.remove('hidden');

            fillText('dPrice', b.price || '7,434');
            fillText('dBottomPrice', b.price || '7,434');
            fillText('dEngAssigned', '1');
            fillText('dPosted', b.date + ', 09:00 AM');
            fillText('dExpires', b.date + ', 12:00 PM');
            fillText('dDescription', `End to end ${b.title.toLowerCase()} for office setup including setup, testing and handover.`);
            fillText('dBottomEngText', '1 Verified Engineer Ready for Assignment');

            document.getElementById('dPrimaryActionBtn').textContent = 'Accept Offer';
        }

        // ---- Apply Overview + Team tab content variants ----
        applyOverviewTabVariant(isInProgress);
        applyTeamTabVariant(isInProgress);

        // Reset to Overview tab whenever a new booking is opened
        document.querySelectorAll('.detail-tab-btn').forEach(b2 => b2.classList.remove('active'));
        document.querySelector('.detail-tab-btn[data-tab="overview"]').classList.add('active');
        document.getElementById('overviewContent').classList.remove('hidden');
        document.getElementById('teamContent').classList.add('hidden');
        trackSummaryContainer.classList.remove('hidden');
        whyBestMatchContainer.classList.remove('hidden');
        whyChooseTeamContainer.classList.add('hidden');
        teamAvailabilityCard.classList.add('hidden');
        teamInfoCard.classList.add('hidden');
        helpTitle.textContent = 'Need Help Deciding?';
        helpDesc.textContent = 'Our experts can help you choose the best team for your job.';
        helpMainBtnText.textContent = 'Talk to Expert';
        helpExtraButtons.classList.add('hidden');

        listView.classList.add('hidden');
        detailsView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Click handler for details buttons
    bookingContainer.addEventListener('click', function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        if (!btn.classList.contains('offer-view-details') && 
            !btn.classList.contains('progress-view-details') &&
            !btn.classList.contains('confirmed-view-details') &&
            !btn.classList.contains('cancelled-view-details')) return;

        const row = btn.closest('.booking-row');
        const idx = [...bookingContainer.children].indexOf(row);
        const clicked = getVisible()[idx];
        showDetails(clicked);
    });

    backBtn.addEventListener('click', function () {
        detailsView.classList.add('hidden');
        listView.classList.remove('hidden');
    });

    // Detail Tabs (Overview | Team & Engineers) - sidebar/content swap is status-aware
    document.querySelectorAll('.detail-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            document.getElementById('overviewContent').classList.add('hidden');
            document.getElementById('teamContent').classList.add('hidden');

            const isInProgress = currentDetailBooking && currentDetailBooking.status === 'inprogress';

            if (this.dataset.tab === 'overview') {
                document.getElementById('overviewContent').classList.remove('hidden');
                trackSummaryContainer.classList.remove('hidden');
                whyBestMatchContainer.classList.remove('hidden');
                whyChooseTeamContainer.classList.add('hidden');
                teamAvailabilityCard.classList.add('hidden');
                teamInfoCard.classList.add('hidden');
                fillText('dEngCardTitle', 'Team Leader');
                helpTitle.textContent = 'Need Help Deciding?';
                helpDesc.textContent = 'Our experts can help you choose the best team for your job.';
                helpMainBtnText.textContent = 'Talk to Expert';
                helpExtraButtons.classList.add('hidden');
            } else if (this.dataset.tab === 'team') {
                document.getElementById('teamContent').classList.remove('hidden');
                trackSummaryContainer.classList.add('hidden');
                whyBestMatchContainer.classList.add('hidden');

                if (isInProgress) {
                    whyChooseTeamContainer.classList.add('hidden');
                    teamAvailabilityCard.classList.remove('hidden');
                    teamInfoCard.classList.remove('hidden');
                    fillText('dEngCardTitle', 'Lead Engineer');
                    helpTitle.textContent = 'Need help?';
                    helpDesc.textContent = 'Questions about your bookings, assigned engineers or project progress?';
                    helpMainBtnText.textContent = 'Chat Support';
                    helpExtraButtons.classList.remove('hidden');
                } else {
                    whyChooseTeamContainer.classList.remove('hidden');
                    teamAvailabilityCard.classList.add('hidden');
                    teamInfoCard.classList.add('hidden');
                    fillText('dEngCardTitle', 'Team Leader');
                    helpTitle.textContent = 'Need help?';
                    helpDesc.textContent = 'Questions about your bookings, assigned engineers or project progress?';
                    helpMainBtnText.textContent = 'Talk to Expert';
                    helpExtraButtons.classList.add('hidden');
                }
            }
        });
    });

    // =============================================
    // TEAM MEMBERS SEARCH + STATUS FILTER (In Progress)
    // =============================================
    const teamSearchInput = document.getElementById('teamSearchInput');
    const teamStatusFilter = document.getElementById('teamStatusFilter');
    const teamNoResults = document.getElementById('teamNoResults');

    function resetTeamSearch() {
        if (teamSearchInput) teamSearchInput.value = '';
        if (teamStatusFilter) teamStatusFilter.value = 'all';
        filterTeamTable();
    }

    function filterTeamTable() {
        const table = document.getElementById('teamMembersTable');
        if (!table) return;
        const term = (teamSearchInput ? teamSearchInput.value : '').trim().toLowerCase();
        const statusFilter = teamStatusFilter ? teamStatusFilter.value : 'all';
        const rows = table.querySelectorAll('tbody tr');
        let visibleCount = 0;

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const rowStatus = row.dataset.engStatus || '';
            const matchesText = !term || text.includes(term);
            const matchesStatus = statusFilter === 'all' || rowStatus === statusFilter;
            const show = matchesText && matchesStatus;
            row.style.display = show ? '' : 'none';
            if (show) visibleCount++;
        });

        teamNoResults.classList.toggle('hidden', visibleCount !== 0);
    }

    if (teamSearchInput) teamSearchInput.addEventListener('input', filterTeamTable);
    if (teamStatusFilter) teamStatusFilter.addEventListener('change', filterTeamTable);

    // =============================================
    // CONFIRMED DETAILS LOGIC
    // =============================================
    function showConfirmedDetails(b) {
        currentDetailBooking = b;
        fillText('cTitle', b.title);
        fillText('cBookingId', b.bookingId || 'BK-56874');
        fillText('cLocation', b.location);
        fillText('cLocation2', b.location);
        fillText('cLocationName', b.location);
        fillText('cDate', b.date);
        fillText('cDate2', b.date);
        fillText('cTimelineDate', b.date);
        fillText('cDuration', b.time);
        fillText('cDuration2', '15 Hours');
        fillText('cServiceType', b.title);
        fillText('cDescription', `End to end ${b.title.toLowerCase()} for office setup including rack setup, cable pulling, termination and testing.`);
        fillText('cCreatedOn', '28 May 2026, 10:30 AM');

        const eng = b.engineer || { name: 'Rahul Sharma', rating: '4.8', reviews: 280, initials: 'RS' };
        fillText('cEngName', eng.name);
        fillText('cEngRating', eng.rating);
        fillText('cEngReviews', eng.reviews);
        fillText('cEngAvatar', eng.initials);

        // scope of work
        const scope = [
            'Rack setup and arrangement', 'Cable laying (Cat6)',
            'Termination and labeling', 'Network testing and validation',
            'Complete documentation and handover', 'Post-installation support'
        ];
        document.getElementById('cScopeGrid').innerHTML = scope.map(s =>
            `<div class="scope-item"><span class="bg-primary-yellow w-[7px] h-[7px] rounded-full"></span>${s}</div>`
        ).join('');

        // what's included
        const included = ['10 Certified Engineers', 'All tools and equipment', 'Testing and quality check', 'Work report and documentation', 'Post work support'];
        document.getElementById('cIncludedRow').innerHTML = included.map(i =>
            `<span class="included-pill"><span class="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>${i}</span>`
        ).join('');

        // Reset tabs to Overview by default
        document.querySelectorAll('.confirm-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === 'overview');
        });
        document.getElementById('confirm-overviewContent').classList.remove('hidden');
        document.getElementById('confirm-teamContent').classList.add('hidden');

        listView.classList.add('hidden');
        detailsView.classList.add('hidden');
        const confirmView = document.getElementById('confirm-detail-view');
        if (confirmView) confirmView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =============================================
    // CANCELLED DETAILS LOGIC
    // =============================================
    function showCancelledDetails(b) {
        currentDetailBooking = b;
        fillText('canBookingId', b.bookingId || 'BK-56874');
        fillText('canCancelledDate', (b.cancelledDate || '29 May 2026') + ', 11:00 AM');
        fillText('canCtxTitle', b.title);
        fillText('canCtxSub', `End-to-end ${b.title.toLowerCase()} setup & support`);
        fillText('canCtxBookingId2', b.bookingId || 'BK-56874');
        fillText('canCtxEstAmount', '$' + (b.estPrice || '7,434'));

        fillText('canConfirmTime', (b.date || '29 May 2026') + ', 10:15 AM');
        fillText('canTeamAssignTime', (b.date || '29 May 2026') + ', 03:45 PM');
        fillText('canCancelTime', (b.cancelledDate || '29 May 2026') + ', 11:00 AM');

        const estAmt = parseFloat((b.estPrice || '7434').replace(/,/g, ''));
        const refundAmt = Math.floor(estAmt * 0.63);
        fillText('canRefundAmount', '$' + refundAmt.toLocaleString());
        fillText('canRefundDate', (b.cancelledDate || '29 May 2026') + ', 11:15 AM');
        
        let expectedDate = '30 May 2026';
        if (b.cancelledDate) {
            const parts = b.cancelledDate.split(' ');
            if (parts.length >= 2) {
                const day = parseInt(parts[0]);
                expectedDate = (day + 1) + ' ' + parts.slice(1).join(' ');
            }
        }
        fillText('canExpectedRefundDate', expectedDate);

        fillText('canSumServiceType', b.title);
        fillText('canSumDate', b.date || '29 May 2026');
        fillText('canSumTime', '10:00 AM - 02:30 PM');
        fillText('canSumLocation', b.location || 'DLF Cyber City, Gurgaon');
        fillText('canSumAmount', '$' + (b.estPrice || '7,434'));

        listView.classList.add('hidden');
        detailsView.classList.add('hidden');
        const confirmView = document.getElementById('confirm-detail-view');
        if (confirmView) confirmView.classList.add('hidden');
        const cancelledView = document.getElementById('cancelled-detail-view');
        if (cancelledView) cancelledView.classList.remove('hidden');

        switchCancelledTab('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function switchCancelledTab(tabName) {
        const overviewBtn = document.getElementById('canTabBtnOverview');
        const teamBtn = document.getElementById('canTabBtnTeam');
        const overviewContent = document.getElementById('canOverviewContent');
        const teamContent = document.getElementById('canTeamContent');
        
        const sumWidget = document.getElementById('canSidebarSummary');
        const payWidget = document.getElementById('canSidebarPayment');
        const chgWidget = document.getElementById('canSidebarCharges');
        const bannerWidget = document.getElementById('canSidebarNoChargesBanner');

        if (tabName === 'overview') {
            if (overviewBtn) {
                overviewBtn.className = "bg-[#FAB819] text-white text-xs font-semibold py-1.5 px-4 rounded-full cursor-pointer transition";
            }
            if (teamBtn) {
                teamBtn.className = "bg-white border border-slate-200 text-granite-gray text-xs font-semibold py-1.5 px-4 rounded-full hover:bg-slate-50 transition cursor-pointer";
            }
            if (overviewContent) overviewContent.classList.remove('hidden');
            if (teamContent) teamContent.classList.add('hidden');
            if (sumWidget) sumWidget.classList.remove('hidden');
            if (payWidget) payWidget.classList.add('hidden');
            if (chgWidget) chgWidget.classList.add('hidden');
            if (bannerWidget) bannerWidget.classList.add('hidden');
        } else if (tabName === 'team') {
            if (overviewBtn) {
                overviewBtn.className = "bg-white border border-slate-200 text-granite-gray text-xs font-semibold py-1.5 px-4 rounded-full hover:bg-slate-50 transition cursor-pointer";
            }
            if (teamBtn) {
                teamBtn.className = "bg-[#FAB819] text-white text-xs font-semibold py-1.5 px-4 rounded-full cursor-pointer transition";
            }
            if (overviewContent) overviewContent.classList.add('hidden');
            if (teamContent) teamContent.classList.remove('hidden');
            if (sumWidget) sumWidget.classList.add('hidden');
            if (payWidget) payWidget.classList.remove('hidden');
            if (chgWidget) chgWidget.classList.remove('hidden');
            if (bannerWidget) bannerWidget.classList.remove('hidden');
        }
    }

    const canTabBtnOverview = document.getElementById('canTabBtnOverview');
    if (canTabBtnOverview) {
        canTabBtnOverview.addEventListener('click', () => switchCancelledTab('overview'));
    }

    const canTabBtnTeam = document.getElementById('canTabBtnTeam');
    if (canTabBtnTeam) {
        canTabBtnTeam.addEventListener('click', () => switchCancelledTab('team'));
    }

    // Go back to bookings from cancelled view
    document.querySelectorAll('.go-back-bookings').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const cancelledView = document.getElementById('cancelled-detail-view');
            if (cancelledView) cancelledView.classList.add('hidden');
            listView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Chat support from cancelled view
    const canChatSupportBtn = document.getElementById('canChatSupportBtn');
    if (canChatSupportBtn) {
        canChatSupportBtn.addEventListener('click', function() {
            const cancelledView = document.getElementById('cancelled-detail-view');
            if (cancelledView) cancelledView.classList.add('hidden');
            
            const chatView = document.getElementById('chatView');
            if (chatView) {
                chatView.classList.remove('hidden');
                populateChatContext(currentDetailBooking);
                const container = document.getElementById('chatMessagesContainer');
                if (container) container.scrollTop = container.scrollHeight;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // CHAT SUPPORT LOGIC
    // =============================================
    function populateChatContext(b) {
        if (!b) return;

        const icon = b.icon || 'device_hub';
        const bgClass = b.bg || 'bg-cloud-blue';
        const colorClass = b.color || 'text-primary-yellow';
        
        const iconWrap = document.getElementById('chatCtxIconWrap');
        if (iconWrap) {
            iconWrap.className = `w-12 h-12 rounded-xl ${bgClass} flex items-center justify-center shrink-0 mb-2`;
        }
        const iconEl = document.getElementById('chatCtxIcon');
        if (iconEl) {
            iconEl.className = `material-symbols-outlined ${colorClass} text-[22px]`;
            iconEl.textContent = icon;
        }

        fillText('chatCtxTitle', b.title);

        const statusBadge = document.getElementById('chatCtxStatusBadge');
        if (statusBadge) {
            let statusText = 'In Progress';
            let badgeClass = 'badge-inprogress';
            if (b.status === 'confirmed') {
                statusText = 'Confirmed';
                badgeClass = 'badge-confirmed';
            } else if (b.status === 'offer') {
                statusText = 'Offer';
                badgeClass = 'badge-offers';
            } else if (b.status === 'completed') {
                statusText = 'Completed';
                badgeClass = 'badge-completed';
            } else if (b.status === 'cancelled') {
                statusText = 'Cancelled';
                badgeClass = 'badge-cancelled';
            }
            statusBadge.textContent = statusText;
            statusBadge.className = `status-pill ${badgeClass} mt-2`;
        }

        fillText('chatCtxBookingId', b.bookingId || 'BK-56874');
        fillText('chatCtxServiceType', b.title);
        fillText('chatCtxLocation', b.location || 'DLF Cyber City, Gurgaon');

        const engName = b.engineer ? b.engineer.name : 'Rahul Sharma';
        fillText('chatCtxLeadEngineer', engName);
        fillText('chatCtxDate', (b.date || '29 May 2026') + ', 10:00 AM');

        const progressVal = document.getElementById('chatCtxProgressVal');
        const progressBar = document.getElementById('chatCtxProgressBar');
        let progressPercent = '40%';
        if (b.status === 'completed') {
            progressPercent = '100%';
        } else if (b.status === 'cancelled') {
            progressPercent = '0%';
        } else if (b.status === 'confirmed') {
            progressPercent = '20%';
        }
        if (progressVal) progressVal.textContent = progressPercent;
        if (progressBar) progressBar.style.width = progressPercent;
    }

    function appendMessage(text, isUser) {
        const container = document.getElementById('chatMessagesContainer');
        if (!container) return;

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const messageDiv = document.createElement('div');

        if (isUser) {
            messageDiv.className = 'flex flex-col items-end max-w-[35%] ml-auto';
            messageDiv.innerHTML = `
                <div class="user-chat-box">
                    ${text}
                </div>
                <span class="text-[12px] text-time-gray font-normal mt-1 mr-1">${timeString}</span>
            `;
        } else {
            messageDiv.className = 'flex flex-col items-start max-w-[35%]';
            messageDiv.innerHTML = `
                <div class="system-chat-box">
                    ${text}
                </div>
                <span class="text-[12px] text-time-gray font-normal mt-1 ml-1">${timeString}</span>
            `;
        }

        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    const staticReplies = [
        "Thanks for your message! Our team is looking into this and will get back to you shortly.",
        "Your update has been received. The lead engineer on site has been notified.",
        "We are currently reviewing your request. Please wait a moment while we check the status.",
        "Understood. If you need immediate assistance, you can also use the Call Support option.",
        "Thank you! We've noted your preference and will update the job details accordingly."
    ];
    let replyIndex = 0;

    function triggerSupportReply() {
        setTimeout(() => {
            const replyText = staticReplies[replyIndex % staticReplies.length];
            replyIndex++;
            appendMessage(replyText, false);
        }, 1000);
    }

    function handleSendMessage() {
        const input = document.getElementById('chatInput');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        appendMessage(text, true);
        input.value = '';
        triggerSupportReply();
    }

    // Suggestions click listeners
    document.querySelectorAll('.chat-suggestion-pill').forEach(pill => {
        pill.addEventListener('click', function () {
            const text = this.textContent.trim();
            appendMessage(text, true);
            triggerSupportReply();
        });
    });

    // Enter key listener
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }

    // Send button click listener
    const chatSendBtn = document.getElementById('chatSendBtn');
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', handleSendMessage);
    }

    // Chat support entry button click
    const chatSupportBtn = document.getElementById('chatSupportBtn');
    if (chatSupportBtn) {
        chatSupportBtn.addEventListener('click', function () {
            const confirmView = document.getElementById('confirm-detail-view');
            const detailsView = document.getElementById('detailsView');
            const chatView = document.getElementById('chatView');

            if (confirmView) confirmView.classList.add('hidden');
            if (detailsView) detailsView.classList.add('hidden');
            if (chatView) {
                chatView.classList.remove('hidden');
                populateChatContext(currentDetailBooking);
                const container = document.getElementById('chatMessagesContainer');
                if (container) container.scrollTop = container.scrollHeight;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Go back helper
    function goBackFromChat() {
        const chatView = document.getElementById('chatView');
        if (chatView) chatView.classList.add('hidden');

        if (currentDetailBooking && currentDetailBooking.status === 'confirmed') {
            const confirmView = document.getElementById('confirm-detail-view');
            if (confirmView) confirmView.classList.remove('hidden');
        } else if (currentDetailBooking && currentDetailBooking.status === 'offer') {
            const detailsView = document.getElementById('detailsView');
            if (detailsView) detailsView.classList.remove('hidden');
        } else if (currentDetailBooking && currentDetailBooking.status === 'cancelled') {
            const cancelledView = document.getElementById('cancelled-detail-view');
            if (cancelledView) cancelledView.classList.remove('hidden');
        } else {
            const listView = document.getElementById('listView');
            if (listView) listView.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const backToConfirmDetailBtn = document.getElementById('backToConfirmDetailBtn');
    if (backToConfirmDetailBtn) {
        backToConfirmDetailBtn.addEventListener('click', goBackFromChat);
    }

    const chatCtxViewDetailsBtn = document.getElementById('chatCtxViewDetailsBtn');
    if (chatCtxViewDetailsBtn) {
        chatCtxViewDetailsBtn.addEventListener('click', goBackFromChat);
    }

    // Sidebar support button (from detailsView sidebar)
    const helpMainBtn = document.getElementById('helpMainBtnText') ? document.getElementById('helpMainBtnText').closest('button') : null;
    if (helpMainBtn) {
        helpMainBtn.addEventListener('click', function() {
            const helpMainBtnText = document.getElementById('helpMainBtnText');
            if (helpMainBtnText && helpMainBtnText.textContent === 'Chat Support') {
                const confirmView = document.getElementById('confirm-detail-view');
                const detailsView = document.getElementById('detailsView');
                const chatView = document.getElementById('chatView');

                if (confirmView) confirmView.classList.add('hidden');
                if (detailsView) detailsView.classList.add('hidden');
                if (chatView) {
                    chatView.classList.remove('hidden');
                    populateChatContext(currentDetailBooking);
                    const container = document.getElementById('chatMessagesContainer');
                    if (container) container.scrollTop = container.scrollHeight;
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});