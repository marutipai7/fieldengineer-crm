document.addEventListener('DOMContentLoaded', function () {

    /* =======================================================
       LIVE ENGINEER TRACKING VIEW LOGIC
    ======================================================== */
    (function () {
        const trkEngineers = [
            { name: 'Rahul Sharma', role: 'Network Cabling Expert', status: 'On Site', color: '#DC7B24', initials: 'RS', time: 'Checked in 10:33 AM' },
            { name: 'Vikas Singh', role: 'Senior Technician', status: 'On Route', color: '#00897B', initials: 'VS', time: 'Checked in 10:32 AM' },
            { name: 'Amit Kumar', role: 'Technician', status: 'On Break', color: '#8B5CF6', initials: 'AK', time: 'Checked in 10:33 AM' },
            { name: 'Pawan Verma', role: 'Technician', status: 'On Site', color: '#F97316', initials: 'PV', time: 'Checked in 10:31 AM' },
            { name: 'Neeraj Yadav', role: 'Helper', status: 'On Site', color: '#6D28D9', initials: 'NY', time: 'Checked in 10:30 AM' },
        ];

        const statusColorMap = {
            'On Site': ['#DCFCE7', '#16A34A'],
            'On Route': ['#FFF6E5', '#F5A623'],
            'On Break': ['#EDE9FE', '#7C3AED'],
            'Offline': ['#F1F5F9', '#64748B']
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

        document.addEventListener('click', function (e) {
            if (e.target.closest('#trackAllEngineersBtn') || e.target.closest('#dTrackLiveBtn')) {
                e.preventDefault();
                showTrackingView();
                return;
            }
            if (e.target.closest('#backToTeamViewBtn')) {
                e.preventDefault();
                hideTrackingView();
                return;
            }
            const mapBtn = e.target.closest('.map-toggle-btn');
            if (mapBtn) {
                document.querySelectorAll('.map-toggle-btn').forEach(b => b.classList.remove('active'));
                mapBtn.classList.add('active');
                return;
            }
        });

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
        { name: 'Vikas Singh', rating: '4.7', reviews: 180, initials: 'VS', color: 'bg-electric-violet text-white' },
        { name: 'Amit Kumar', rating: '4.6', reviews: 120, initials: 'AK', color: 'bg-dark-orange text-white' }
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
            icon: cfg.icon,
            bg: cfg.bg,
            color: cfg.color,
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
            { title: 'CCTV Installation', icon: 'photo_camera', bg: 'bg-lavender-mist', color: 'text-purple-500' }
        ];
        const cfg = iconConfigs[i % iconConfigs.length];
        return {
            status: 'inprogress',
            title: cfg.title,
            icon: cfg.icon,
            bg: cfg.bg,
            color: cfg.color,
            bookingId: 'BK-56874',
            location: 'DLF Cyber City, Gurgaon',
            date: '29 May 2026',
            time: '12 Hours',
            engineersCount: 10,
            engineer: { name: 'Rahul Sharma', rating: '4.8', reviews: 24, initials: 'RS', color: 'bg-dark-orange text-white' },
            totalAmount: '1,000',
            liveTimer: '01:15:20',
            overallProgress: 40,
            estimatedDuration: '15 Hours',
            createdOn: '28 May 2026, 10:30 AM',
            paymentStatus: 'Unpaid',
            currentStep: 2,
            milestones: [
                { label: 'Confirmed', date: '23 May 2026, 10:15 AM' },
                { label: 'Team Assigned', date: '23 May 2026, 03:45 PM' },
                { label: 'Work in Progress', date: '24 May 2026, 11:30 AM' },
                { label: 'Testing', date: '27 May 2026, 09:00 AM' },
                { label: 'Completed', date: 'Pending' }
            ],
            tasks: [
                { title: 'Extra Rack Installation', status: 'Requested', subtext: 'Requested on 29 May, 11:20 AM', cost: '2,500', duration: null },
                { title: 'Additional Cable Testing', status: 'In-Progress', subtext: 'Accepted on 29 May, 12:20 AM', cost: '2,500', duration: '01:00 Hrs' }
            ],
            teamStats: { total: 10, onSite: 3, onRoute: 2, onBreak: 0 },
            availability: 80,
            teamInfo: { reporting: '9:00 AM', workStart: '10:00 AM', duration: '15 Hours', breakTime: '1:00 AM - 1:30 AM' }
        };
    }

    function makeCompleted(i) {
        const paidAmounts = ['12,500', '8,750', '15,200', '6,300'];
        const titles = ['Network Cabling', 'CCTV Installation', 'Fiber Optic Setup', 'Server Room Setup'];
        const dates = ['18 Jan 2024 at 01:30 PM', '22 Feb 2024 at 09:15 AM', '15 Mar 2024 at 11:45 AM', '05 Apr 2024 at 03:00 PM'];
        return {
            status: 'completed',
            title: titles[i % titles.length],
            icon: 'device_hub',
            bg: 'bg-cloud-blue',
            color: 'text-primary-yellow',
            bookingId: 'BK-' + (56874 + i),
            location: 'DLF Cyber City, Gurgaon',
            date: '29 May 2026',
            time: '12 Hours',
            completedDate: dates[i % dates.length],
            paidAmount: paidAmounts[i % paidAmounts.length],
            engineersCount: 10 + (i % 3),
            engineer: { name: 'Rahul Sharma', rating: '4.8', reviews: 248, initials: 'RS' }
        };
    }

    function makeCancelled(i) {
        const iconConfigs = [
            { title: 'Network Cabling', icon: 'device_hub', bg: 'bg-cloud-blue', color: 'text-primary-yellow' },
            { title: 'CCTV Installation', icon: 'photo_camera', bg: 'bg-lavender-mist', color: 'text-purple-500' }
        ];
        const cfg = iconConfigs[i % iconConfigs.length];
        return {
            status: 'cancelled',
            title: cfg.title,
            icon: cfg.icon,
            bg: cfg.bg,
            color: cfg.color,
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
    const listView = document.getElementById('listView');
    const detailsView = document.getElementById('detailsView');
    const backBtn = document.getElementById('backToBookingBtn');

    let currentTab = 'all';
    let currentSort = 'recent';
    let currentDetailBooking = null;
    let cameFromTracking = false;

    // =============================================
    // CARD RENDERERS
    // =============================================
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
                    <div class="w-9 h-9 rounded-full ${b.engineer.color} flex items-center justify-center text-xs font-bold shrink-0">${b.engineer.initials}</div>
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
                    <div class="w-9 h-9 rounded-full ${b.engineer.color} flex items-center justify-center text-xs font-bold shrink-0">${b.engineer.initials}</div>
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
                <div><span class="status-pill badge-inprogress px-3 py-1 text-xs">In Progress</span></div>
                <div class="flex items-center gap-2 shrink-0">
                    <button class="progress-view-details btn-outline-yellow">View Report</button>
                    <button class="btn-fill-yellow">Track Live</button>
                </div>
            </div>
        </div>`;
    }

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
                <div><span class="status-pill badge-completed px-3 py-1 text-xs">Completed</span></div>
                <div class="flex items-center gap-2 shrink-0">
                    <button class="completed-view-details btn-outline-yellow">View Details</button>
                    <button class="btn-fill-yellow">Book Again</button>
                </div>
            </div>
        </div>`;
    }

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
                <div><span class="status-pill badge-cancelled px-3 py-1 text-xs">Cancelled</span></div>
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
            list = [...list].sort((a, b) => parseFloat((b.price || b.paidAmount || b.estPrice || b.totalAmount || '0').replace(/,/g, '')) - parseFloat((a.price || a.paidAmount || a.estPrice || a.totalAmount || '0').replace(/,/g, '')));
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

    document.getElementById('viewAllOffersBtn').addEventListener('click', function () {
        switchTab('offer');
    });

    render();

    // =============================================
    // UTILITY FUNCTIONS
    // =============================================
    function fillText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }

    function renderMilestones(milestones, currentStep) {
        const wrap = document.getElementById('milestoneRow');
        if (!wrap) return;
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
            let lineClass;
            if (idx < currentStep - 1) {
                lineClass = 'milestone-line-done';
            } else if (idx === currentStep - 1) {
                lineClass = 'milestone-line-transition';
            } else {
                lineClass = 'milestone-line-pending';
            }
            const lineHTML = idx < milestones.length - 1 ? `<div class="milestone-line ${lineClass}"></div>` : '';
            let dateHTML;
            const isPending = m.date.trim().toLowerCase() === 'pending';
            const dateClass = isPending ? 'milestone-date-pending' : 'milestone-date';
            if (m.date.includes(',')) {
                const parts = m.date.split(',');
                const datePart = parts[0].trim();
                const timePart = parts.slice(1).join(',').trim();
                dateHTML = `<p class="${dateClass}">${datePart}</p><p class="${dateClass}">${timePart}</p>`;
            } else {
                dateHTML = `<p class="${dateClass}">${m.date}</p>`;
            }
            return `
                <div class="milestone-step">
                    <div class="milestone-icon-row">
                        <div class="milestone-icon ${circleClass}">${iconName ? `<span class="material-symbols-outlined">${iconName}</span>` : ''}</div>
                        ${lineHTML}
                    </div>
                    <p class="milestone-step-label">${m.label}</p>
                    ${dateHTML}
                </div>`;
        }).join('');
    }

    function renderTasks(tasks) {
        const list = document.getElementById('additionalTasksList');
        if (!list) return;
        fillText('dTaskCount', tasks.length);
        list.innerHTML = tasks.map(t => `
            <div class="additional-task-row">
                <div class="additional-task-info">
                    <div class="additional-task-icon ${t.status === 'Requested' ? 'task-icon-requested' : 'task-icon-progress'}">
                        <span class="material-symbols-outlined">${t.status === 'Requested' ? 'hourglass_top' : 'check_circle'}</span>
                    </div>
                    <div>
                        <p class="additional-task-title">${t.title}</p>
                        <p class="additional-task-subtext">${t.subtext}</p>
                    </div>
                </div>
                <div class="additional-task-status-wrapper">
                    <span class="additional-task-status ${t.status === 'Requested' ? 'status-review' : 'status-progress'}">
                        ${t.status === 'Requested' ? 'In Review' : 'In Progress'}
                    </span>
                </div>
                <div class="additional-task-cost">
                    <p class="additional-task-meta">Est Cost</p>
                    <p class="additional-task-price">Rs.${t.cost}</p>
                </div>
                <div class="additional-task-duration">
                    ${t.duration ? `<p class="additional-task-meta">Est Duration</p><p class="additional-task-duration-value">${t.duration}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    function resetTeamSearch() {
        const teamSearchInput = document.getElementById('teamSearchInput');
        const teamStatusFilter = document.getElementById('teamStatusFilter');
        if (teamSearchInput) teamSearchInput.value = '';
        if (teamStatusFilter) teamStatusFilter.value = 'all';
        filterTeamTable();
    }

    function filterTeamTable() {
        const table = document.getElementById('teamMembersTable');
        if (!table) return;
        const teamSearchInput = document.getElementById('teamSearchInput');
        const teamStatusFilter = document.getElementById('teamStatusFilter');
        const term = (teamSearchInput ? teamSearchInput.value : '').trim().toLowerCase();
        const statusFilter = teamStatusFilter ? teamStatusFilter.value : 'all';
        const rows = table.querySelectorAll('tbody tr');
        const teamNoResults = document.getElementById('teamNoResults');
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
        if (teamNoResults) teamNoResults.classList.toggle('hidden', visibleCount !== 0);
    }

    const teamSearchInput = document.getElementById('teamSearchInput');
    const teamStatusFilter = document.getElementById('teamStatusFilter');
    if (teamSearchInput) teamSearchInput.addEventListener('input', filterTeamTable);
    if (teamStatusFilter) teamStatusFilter.addEventListener('change', filterTeamTable);

    // =============================================
    // SHOW DETAILS - MAIN DISPATCHER
    // =============================================
    function showDetails(b) {
        currentDetailBooking = b;
        if (b.status === 'completed') {
            showCompletedDetails(b);
            return;
        }
        if (b.status === 'confirmed') {
            showConfirmedDetails(b);
            return;
        }
        if (b.status === 'cancelled') {
            showCancelledDetails(b);
            return;
        }
        showOfferOrInProgressDetails(b);
    }

    // =============================================
    // OFFER / IN PROGRESS DETAILS
    // =============================================
    function showOfferOrInProgressDetails(b) {
        const isInProgress = b.status === 'inprogress';

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

        const pill = document.getElementById('dStatusPill');
        const iconWrap = document.getElementById('dTitleIconWrap');
        const icon = document.getElementById('dTitleIcon');
        iconWrap.className = 'w-12 h-12 rounded-xl ' + (b.bg || 'bg-cloud-blue') + ' flex items-center justify-center shrink-0';
        icon.className = 'material-symbols-outlined ' + (b.color || 'text-primary-yellow') + ' text-[22px]';
        icon.textContent = b.icon || 'device_hub';

        const scope = ['Rack setup and arrangement', 'Cable laying (Cat6)', 'Termination and labeling', 'Network testing and validation', 'Complete documentation and handover', 'Post-installation support'];
        document.getElementById('dScopeGrid').innerHTML = scope.map(s =>
            `<div class="scope-item"><span class="material-symbols-outlined text-primary-yellow text-[16px]" style="font-variation-settings: 'FILL' 1;">circle</span>${s}</div>`
        ).join('');

        const included = ['10 Verified Engineers', 'All tools and equipment', 'Testing and quality check', 'Work report and documentation', 'Post work support'];
        document.getElementById('dIncludedRow').innerHTML = included.map(i =>
            `<span class="included-pill"><span class="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>${i}</span>`
        ).join('');

        if (isInProgress) {
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

            const stats = b.teamStats || { total: 10, onSite: 0, onRoute: 0, onBreak: 0 };
            fillText('dStatTotal', stats.total);
            fillText('dStatOnSite', stats.onSite);
            fillText('dStatOnRoute', stats.onRoute);
            fillText('dStatOnBreak', stats.onBreak);

            const pct = b.availability != null ? b.availability : 80;
            const circumference = 314.16;
            const offset = circumference - (circumference * pct / 100);
            const ring = document.getElementById('dAvailabilityRing');
            if (ring) {
                ring.setAttribute('stroke-dasharray', circumference.toFixed(2));
                ring.setAttribute('stroke-dashoffset', offset.toFixed(2));
            }
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

            offersTimelineCard.classList.add('hidden');
            milestoneCard.classList.remove('hidden');
            additionalTasksCard.classList.remove('hidden');
            dPaymentStatusRow.classList.remove('hidden');
            dCreatedOnRow.classList.remove('job-detail-row-last');
            dPaymentStatusRow.classList.add('job-detail-row-last');

            teamOverviewOfferBlock.classList.add('hidden');
            teamOverviewProgressBlock.classList.remove('hidden');
            teamSearchRow.classList.remove('hidden');
            whyChooseTeamContainer.classList.add('hidden');
            teamAvailabilityCard.classList.remove('hidden');
            teamInfoCard.classList.remove('hidden');

        } else {
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

            offersTimelineCard.classList.remove('hidden');
            milestoneCard.classList.add('hidden');
            additionalTasksCard.classList.add('hidden');
            dPaymentStatusRow.classList.add('hidden');
            dCreatedOnRow.classList.add('job-detail-row-last');
            dPaymentStatusRow.classList.remove('job-detail-row-last');

            teamOverviewOfferBlock.classList.remove('hidden');
            teamOverviewProgressBlock.classList.add('hidden');
            teamSearchRow.classList.add('hidden');
            whyChooseTeamContainer.classList.remove('hidden');
            teamAvailabilityCard.classList.add('hidden');
            teamInfoCard.classList.add('hidden');
        }

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
        document.getElementById('confirm-detail-view').classList.add('hidden');
        document.getElementById('cancelled-detail-view').classList.add('hidden');
        document.getElementById('completed-detail-view').classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =============================================
    // CONFIRMED DETAILS
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

        const scope = ['Rack setup and arrangement', 'Cable laying (Cat6)', 'Termination and labeling', 'Network testing and validation', 'Complete documentation and handover', 'Post-installation support'];
        document.getElementById('cScopeGrid').innerHTML = scope.map(s =>
            `<div class="scope-item"><span class="bg-primary-yellow w-[7px] h-[7px] rounded-full"></span>${s}</div>`
        ).join('');

        const included = ['10 Certified Engineers', 'All tools and equipment', 'Testing and quality check', 'Work report and documentation', 'Post work support'];
        document.getElementById('cIncludedRow').innerHTML = included.map(i =>
            `<span class="included-pill"><span class="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>${i}</span>`
        ).join('');

        document.querySelectorAll('.confirm-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === 'overview');
        });
        document.getElementById('confirm-overviewContent').classList.remove('hidden');
        document.getElementById('confirm-teamContent').classList.add('hidden');

        listView.classList.add('hidden');
        detailsView.classList.add('hidden');
        document.getElementById('completed-detail-view').classList.add('hidden');
        document.getElementById('cancelled-detail-view').classList.add('hidden');
        document.getElementById('confirm-detail-view').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =============================================
    // CANCELLED DETAILS
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
        document.getElementById('confirm-detail-view').classList.add('hidden');
        document.getElementById('completed-detail-view').classList.add('hidden');
        document.getElementById('cancelled-detail-view').classList.remove('hidden');

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
            if (overviewBtn) overviewBtn.className = "bg-[#FAB819] text-white text-xs font-semibold py-1.5 px-4 rounded-full cursor-pointer transition";
            if (teamBtn) teamBtn.className = "bg-white border border-slate-200 text-granite-gray text-xs font-semibold py-1.5 px-4 rounded-full hover:bg-slate-50 transition cursor-pointer";
            if (overviewContent) overviewContent.classList.remove('hidden');
            if (teamContent) teamContent.classList.add('hidden');
            if (sumWidget) sumWidget.classList.remove('hidden');
            if (payWidget) payWidget.classList.add('hidden');
            if (chgWidget) chgWidget.classList.add('hidden');
            if (bannerWidget) bannerWidget.classList.add('hidden');
        } else {
            if (overviewBtn) overviewBtn.className = "bg-white border border-slate-200 text-granite-gray text-xs font-semibold py-1.5 px-4 rounded-full hover:bg-slate-50 transition cursor-pointer";
            if (teamBtn) teamBtn.className = "bg-[#FAB819] text-white text-xs font-semibold py-1.5 px-4 rounded-full cursor-pointer transition";
            if (overviewContent) overviewContent.classList.add('hidden');
            if (teamContent) teamContent.classList.remove('hidden');
            if (sumWidget) sumWidget.classList.add('hidden');
            if (payWidget) payWidget.classList.remove('hidden');
            if (chgWidget) chgWidget.classList.remove('hidden');
            if (bannerWidget) bannerWidget.classList.remove('hidden');
        }
    }

    document.getElementById('canTabBtnOverview').addEventListener('click', () => switchCancelledTab('overview'));
    document.getElementById('canTabBtnTeam').addEventListener('click', () => switchCancelledTab('team'));

    document.querySelectorAll('.go-back-bookings').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('cancelled-detail-view').classList.add('hidden');
            listView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    document.getElementById('canChatSupportBtn').addEventListener('click', function () {
        document.getElementById('cancelled-detail-view').classList.add('hidden');
        const chatView = document.getElementById('chatView');
        if (chatView) {
            chatView.classList.remove('hidden');
            populateChatContext(currentDetailBooking);
            const container = document.getElementById('chatMessagesContainer');
            if (container) container.scrollTop = container.scrollHeight;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =============================================
    // COMPLETED DETAILS - FULL WORKING CODE
    // =============================================
    // ===== COMPLETED DETAILS =====
function showCompletedDetails(b) {
    currentDetailBooking = b;
    fillText('compTitle', b.title);
    fillText('compBookingId', b.bookingId || 'BK-56874');
    fillText('compLocation', b.location);
    fillText('compDate', b.date);
    fillText('compDuration', b.time);
    fillText('compEngText', `${b.engineersCount || 10} Engineers Assigned`);
    fillText('compFinalCost', b.paidAmount || '1,000');
    fillText('compFinalCost2', '$' + (b.paidAmount || '1,000'));
    fillText('compCompletionDate', b.completedDate || b.date);
    fillText('compEngDeployed', b.engineersCount || 10);
    fillText('compTeamCount', b.engineersCount || 10);
    fillText('compStatEng', b.engineersCount || 10);

    const icon = document.getElementById('compIcon');
    if (icon) {
        icon.textContent = b.icon || 'device_hub';
        icon.className = 'material-symbols-outlined ' + (b.color || 'text-primary-yellow') + ' text-[28px]';
    }

    renderCompletedMilestones([
        { label: 'Confirmed', date: '23 May 2026, 10:15 AM' },
        { label: 'Team Assigned', date: '23 May 2026, 03:45 PM' },
        { label: 'Work in Progress', date: '24 May 2026, 11:30 AM' },
        { label: 'Testing', date: '27 May 2026, 09:00 AM' },
        { label: 'Completed', date: b.completedDate || 'Pending' }
    ]);
    renderCompletedTeam();
    renderCompletedFeedbackList();

    document.querySelectorAll('.comp-star').forEach(s => s.classList.remove('comp-star-filled'));

    // reset to Overview tab state every time details are opened
    document.querySelectorAll('.completed-tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === 'overview'));
    document.getElementById('completed-overviewContent').classList.remove('hidden');
    document.getElementById('completed-teamContent').classList.add('hidden');
    document.getElementById('compSidebarOverview').classList.remove('hidden');
    document.getElementById('compSidebarTeam').classList.add('hidden');
    fillText('compEngCardTitle', 'Lead Engineer');
    const secondBtn = document.getElementById('compEngSecondBtn');
    if (secondBtn) secondBtn.textContent = 'Manage';

    listView.classList.add('hidden');
    detailsView.classList.add('hidden');
    document.getElementById('confirm-detail-view').classList.add('hidden');
    document.getElementById('cancelled-detail-view').classList.add('hidden');
    document.getElementById('completed-detail-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCompletedMilestones(milestones) {
    const wrap = document.getElementById('compMilestoneRow');
    if (!wrap) return;
    wrap.innerHTML = milestones.map((m, idx) => {
        const lineHTML = idx < milestones.length - 1 ? `<div class="milestone-line milestone-line-done"></div>` : '';
        const parts = m.date.split(',');
        const dateHTML = parts.length > 1
            ? `<p class="milestone-date">${parts[0].trim()}</p><p class="milestone-date">${parts.slice(1).join(',').trim()}</p>`
            : `<p class="milestone-date">${m.date}</p>`;
        return `
        <div class="milestone-step">
            <div class="milestone-icon-row">
                <div class="milestone-icon milestone-icon-done"><span class="material-symbols-outlined">check</span></div>
                ${lineHTML}
            </div>
            <p class="milestone-step-label">${m.label}</p>
            ${dateHTML}
        </div>`;
    }).join('');
}

function renderCompletedTeam() {
    const list = Array.from({ length: 6 }, () => ({
        name: 'Rahul Sharma', role: 'Lead Engineer', initials: 'RS',
        location: 'DLF Cyber City, Gurgaon'
    }));
    document.getElementById('compTeamTableBody').innerHTML = list.map(e => `
        <tr class="border-b border-slate-100 hover:bg-slate-50" data-eng-status="Completed">
            <td class="py-2 px-4">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-xs shrink-0">${e.initials}</div>
                    <div><p class="font-semibold text-ink text-sm">${e.name}</p><p class="text-[10px] text-slate-400 font-medium">ID: ENG-1001</p></div>
                </div>
            </td>
            <td class="text-ink font-semibold text-xs">${e.role}</td>
            <td class="py-2 px-4"><span class="status-pill badge-completed">Completed</span></td>
            <td class="py-2 px-4 text-xs text-granite-gray font-semibold">${e.location}</td>
            <td class="py-2 px-4 text-right"><button class="btn-fill-yellow-2">Rate Engineer</button></td>
        </tr>`).join('');
}

function renderCompletedFeedbackList() {
    const feedback = Array.from({ length: 4 }, () => ({
        name: 'Maudie', rating: '4.5',
        text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry',
        date: '5 Sept 2025'
    }));
    document.getElementById('compFeedbackList').innerHTML = feedback.map(f => `
        <div class="border border-light-medium rounded-[10px] p-3">
            <div class="flex items-center justify-between mb-1">
                <span class="font-semibold text-ink text-sm">${f.name}</span>
                <span class="flex items-center gap-1 text-xs">
                    <span class="material-symbols-outlined text-amber-400 text-[14px]">star</span>
                    <span class="font-bold text-ink">${f.rating}</span>
                </span>
            </div>
            <p class="text-xs text-granite-gray">${f.text}</p>
            <p class="text-[10px] text-slate-400 mt-1">${f.date}</p>
        </div>`).join('');
}

// TAB SWITCH — toggles content + sidebar + card title/button per tab
document.querySelectorAll('.completed-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.completed-tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const isTeam = this.dataset.tab === 'team';
        document.getElementById('completed-overviewContent').classList.toggle('hidden', isTeam);
        document.getElementById('completed-teamContent').classList.toggle('hidden', !isTeam);
        document.getElementById('compSidebarOverview').classList.toggle('hidden', isTeam);
        document.getElementById('compSidebarTeam').classList.toggle('hidden', !isTeam);

        fillText('compEngCardTitle', isTeam ? 'Team Leader' : 'Lead Engineer');
        const secondBtn = document.getElementById('compEngSecondBtn');
        if (secondBtn) secondBtn.textContent = isTeam ? 'Message' : 'Manage';
    });
});

document.querySelectorAll('.comp-star').forEach(star => {
    star.addEventListener('click', function () {
        const val = parseInt(this.dataset.val);
        document.querySelectorAll('.comp-star').forEach(s => s.classList.toggle('comp-star-filled', parseInt(s.dataset.val) <= val));
    });
});

    function renderCompletedMilestones(milestones) {
        const wrap = document.getElementById('compMilestoneRow');
        if (!wrap) return;
        wrap.innerHTML = milestones.map((m, idx) => {
            const lineHTML = idx < milestones.length - 1 ? `<div class="milestone-line milestone-line-done"></div>` : '';
            const parts = m.date.split(',');
            const dateHTML = parts.length > 1
                ? `<p class="milestone-date">${parts[0].trim()}</p><p class="milestone-date">${parts.slice(1).join(',').trim()}</p>`
                : `<p class="milestone-date">${m.date}</p>`;
            return `
            <div class="milestone-step">
                <div class="milestone-icon-row">
                    <div class="milestone-icon milestone-icon-done"><span class="material-symbols-outlined">check</span></div>
                    ${lineHTML}
                </div>
                <p class="milestone-step-label">${m.label}</p>
                ${dateHTML}
            </div>`;
        }).join('');
    }

    function renderCompletedTeam() {
        const list = [
            { name: 'Rahul Sharma', role: 'Lead Engineer', initials: 'RS', location: 'DLF Cyber City, Gurgaon' },
            { name: 'Vikas Singh', role: 'Senior Technician', initials: 'VS', location: 'DLF Cyber City, Gurgaon' },
            { name: 'Amit Kumar', role: 'Technician', initials: 'AK', location: 'DLF Phase 3' },
            { name: 'Pawan Verma', role: 'Technician', initials: 'PV', location: 'DLF Phase 3' },
            { name: 'Neeraj Yadav', role: 'Helper', initials: 'NY', location: 'DLF Cyber City, Gurgaon' },
            { name: 'Sanjay Dutt', role: 'Helper', initials: 'SD', location: 'DLF Cyber City, Gurgaon' }
        ];
        document.getElementById('compTeamTableBody').innerHTML = list.map(e => `
            <tr class="border-b border-slate-100 hover:bg-slate-50" data-eng-status="Completed">
                <td class="py-2 px-4">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-xs shrink-0">${e.initials}</div>
                        <div><p class="font-semibold text-ink text-sm">${e.name}</p><p class="text-[10px] text-slate-400 font-medium">ID: ENG-1001</p></div>
                    </div>
                </td>
                <td class="text-ink font-semibold text-xs">${e.role}</td>
                <td class="py-2 px-4"><span class="status-pill badge-completed">Completed</span></td>
                <td class="py-2 px-4 text-xs text-granite-gray font-semibold">${e.location}</td>
                <td class="py-2 px-4 text-right"><button class="btn-fill-yellow-2 text-xs">Rate Engineer</button></td>
            </tr>`).join('');
    }

    // Completed Tab Switching
    document.querySelectorAll('.completed-tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.completed-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const isTeam = this.dataset.tab === 'team';
            document.getElementById('completed-overviewContent').classList.toggle('hidden', isTeam);
            document.getElementById('completed-teamContent').classList.toggle('hidden', !isTeam);
            document.getElementById('compWhyChooseTeam').classList.toggle('hidden', !isTeam);
            fillText('compEngCardTitle', isTeam ? 'Team Leader' : 'Lead Engineer');
        });
    });

    // Star Rating
    document.querySelectorAll('.comp-star').forEach(star => {
        star.addEventListener('click', function () {
            const val = parseInt(this.dataset.val);
            document.querySelectorAll('.comp-star').forEach(s => s.classList.toggle('comp-star-filled', parseInt(s.dataset.val) <= val));
        });
    });

    // Back Button for Completed
    const backToBookingBtn4 = document.getElementById('backToBookingBtn4');
    if (backToBookingBtn4) {
        backToBookingBtn4.addEventListener('click', function () {
            document.getElementById('completed-detail-view').classList.add('hidden');
            listView.classList.remove('hidden');
        });
    }

    // ===== INVOICE MODAL =====
    function openInvoiceModal() {
        document.getElementById('invoiceModal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeInvoiceModal() {
        document.getElementById('invoiceModal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    const compInvoiceBtn = document.getElementById('compInvoiceBtn');
    const compDownloadInvoiceBtn = document.getElementById('compDownloadInvoiceBtn');
    if (compInvoiceBtn) compInvoiceBtn.addEventListener('click', openInvoiceModal);
    if (compDownloadInvoiceBtn) compDownloadInvoiceBtn.addEventListener('click', openInvoiceModal);
    
    const invoiceModalClose = document.getElementById('invoiceModalClose');
    if (invoiceModalClose) invoiceModalClose.addEventListener('click', closeInvoiceModal);
    
    const invoiceModal = document.getElementById('invoiceModal');
    if (invoiceModal) {
        invoiceModal.addEventListener('click', function (e) { 
            if (e.target === this) closeInvoiceModal(); 
        });
    }

    const invoiceCopyBtn = document.getElementById('invoiceCopyBtn');
    if (invoiceCopyBtn) {
        invoiceCopyBtn.addEventListener('click', function () {
            const content = document.getElementById('invoiceContent');
            navigator.clipboard.writeText(content.innerText);
        });
    }

    const invoiceDownloadBtn = document.getElementById('invoiceDownloadBtn');
    if (invoiceDownloadBtn) {
        invoiceDownloadBtn.addEventListener('click', function () {
            const node = document.getElementById('invoiceContent');
            const blob = new Blob([node.innerText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.download = 'invoice.txt';
            link.href = URL.createObjectURL(blob);
            link.click();
        });
    }

    // =============================================
    // CHAT SUPPORT
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
        if (b.status === 'completed') progressPercent = '100%';
        else if (b.status === 'cancelled') progressPercent = '0%';
        else if (b.status === 'confirmed') progressPercent = '20%';
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
            messageDiv.innerHTML = `<div class="user-chat-box">${text}</div><span class="text-[12px] text-time-gray font-normal mt-1 mr-1">${timeString}</span>`;
        } else {
            messageDiv.className = 'flex flex-col items-start max-w-[35%]';
            messageDiv.innerHTML = `<div class="system-chat-box">${text}</div><span class="text-[12px] text-time-gray font-normal mt-1 ml-1">${timeString}</span>`;
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

    document.querySelectorAll('.chat-suggestion-pill').forEach(pill => {
        pill.addEventListener('click', function () {
            const text = this.textContent.trim();
            appendMessage(text, true);
            triggerSupportReply();
        });
    });

    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    const chatSendBtn = document.getElementById('chatSendBtn');
    if (chatSendBtn) chatSendBtn.addEventListener('click', handleSendMessage);

    const chatSupportBtn = document.getElementById('chatSupportBtn');
    if (chatSupportBtn) {
        chatSupportBtn.addEventListener('click', function () {
            document.getElementById('confirm-detail-view').classList.add('hidden');
            document.getElementById('detailsView').classList.add('hidden');
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

    const trkChatBtn = document.getElementById('trkChatBtn');
    if (trkChatBtn) {
        trkChatBtn.addEventListener('click', function () {
            document.getElementById('trackingView').classList.add('hidden');
            const chatView = document.getElementById('chatView');
            if (chatView) {
                chatView.classList.remove('hidden');
                populateChatContext(currentDetailBooking);
                cameFromTracking = true;
                const container = document.getElementById('chatMessagesContainer');
                if (container) container.scrollTop = container.scrollHeight;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function goBackFromChat() {
        const chatView = document.getElementById('chatView');
        if (chatView) chatView.classList.add('hidden');

        if (cameFromTracking) {
            cameFromTracking = false;
            document.getElementById('trackingView').classList.remove('hidden');
        } else if (currentDetailBooking && currentDetailBooking.status === 'confirmed') {
            document.getElementById('confirm-detail-view').classList.remove('hidden');
        } else if (currentDetailBooking && currentDetailBooking.status === 'cancelled') {
            document.getElementById('cancelled-detail-view').classList.remove('hidden');
        } else if (currentDetailBooking && currentDetailBooking.status === 'completed') {
            document.getElementById('completed-detail-view').classList.remove('hidden');
        } else if (currentDetailBooking && (currentDetailBooking.status === 'offer' || currentDetailBooking.status === 'inprogress')) {
            document.getElementById('detailsView').classList.remove('hidden');
        } else {
            listView.classList.remove('hidden');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const backToConfirmDetailBtn = document.getElementById('backToConfirmDetailBtn');
    if (backToConfirmDetailBtn) backToConfirmDetailBtn.addEventListener('click', goBackFromChat);
    
    const chatCtxViewDetailsBtn = document.getElementById('chatCtxViewDetailsBtn');
    if (chatCtxViewDetailsBtn) chatCtxViewDetailsBtn.addEventListener('click', goBackFromChat);

    // =============================================
    // CONFIRM TABS
    // =============================================
    document.querySelectorAll('.confirm-tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.confirm-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const isTeam = this.dataset.tab === 'team';
            document.getElementById('confirm-overviewContent').classList.toggle('hidden', isTeam);
            document.getElementById('confirm-teamContent').classList.toggle('hidden', !isTeam);
            document.getElementById('confirm-sidebar-overview-widgets').classList.toggle('hidden', isTeam);
            document.getElementById('confirm-sidebar-team-widgets').classList.toggle('hidden', !isTeam);
        });
    });

    // Back button for confirmed view
    const backToBookingBtn3 = document.getElementById('backToBookingBtn3');
    if (backToBookingBtn3) {
        backToBookingBtn3.addEventListener('click', function () {
            document.getElementById('confirm-detail-view').classList.add('hidden');
            listView.classList.remove('hidden');
        });
    }

    // =============================================
    // DETAIL TABS (Offer/InProgress)
    // =============================================
    document.querySelectorAll('.detail-tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            document.getElementById('overviewContent').classList.add('hidden');
            document.getElementById('teamContent').classList.add('hidden');

            const isInProgress = currentDetailBooking && currentDetailBooking.status === 'inprogress';

            if (this.dataset.tab === 'overview') {
                document.getElementById('overviewContent').classList.remove('hidden');
                document.getElementById('trackSummaryContainer').classList.remove('hidden');
                document.getElementById('whyBestMatchContainer').classList.remove('hidden');
                document.getElementById('whyChooseTeamContainer').classList.add('hidden');
                document.getElementById('teamAvailabilityCard').classList.add('hidden');
                document.getElementById('teamInfoCard').classList.add('hidden');
                fillText('dEngCardTitle', 'Team Leader');
                document.getElementById('helpTitle').textContent = 'Need Help Deciding?';
                document.getElementById('helpDesc').textContent = 'Our experts can help you choose the best team for your job.';
                document.getElementById('helpMainBtnText').textContent = 'Talk to Expert';
                document.getElementById('helpExtraButtons').classList.add('hidden');
            } else if (this.dataset.tab === 'team') {
                document.getElementById('teamContent').classList.remove('hidden');
                document.getElementById('trackSummaryContainer').classList.add('hidden');
                document.getElementById('whyBestMatchContainer').classList.add('hidden');

                if (isInProgress) {
                    document.getElementById('whyChooseTeamContainer').classList.add('hidden');
                    document.getElementById('teamAvailabilityCard').classList.remove('hidden');
                    document.getElementById('teamInfoCard').classList.remove('hidden');
                    fillText('dEngCardTitle', 'Lead Engineer');
                    document.getElementById('helpTitle').textContent = 'Need help?';
                    document.getElementById('helpDesc').textContent = 'Questions about your bookings, assigned engineers or project progress?';
                    document.getElementById('helpMainBtnText').textContent = 'Chat Support';
                    document.getElementById('helpExtraButtons').classList.remove('hidden');
                } else {
                    document.getElementById('whyChooseTeamContainer').classList.remove('hidden');
                    document.getElementById('teamAvailabilityCard').classList.add('hidden');
                    document.getElementById('teamInfoCard').classList.add('hidden');
                    fillText('dEngCardTitle', 'Team Leader');
                    document.getElementById('helpTitle').textContent = 'Need help?';
                    document.getElementById('helpDesc').textContent = 'Questions about your bookings, assigned engineers or project progress?';
                    document.getElementById('helpMainBtnText').textContent = 'Talk to Expert';
                    document.getElementById('helpExtraButtons').classList.add('hidden');
                }
            }
        });
    });

    // =============================================
    // CLICK HANDLER FOR VIEW DETAILS BUTTONS
    // =============================================
   // =============================================
// CLICK HANDLER FOR VIEW DETAILS BUTTONS - FIXED
// =============================================
// =============================================
// CLICK HANDLER FOR VIEW DETAILS BUTTONS - FIXED
// =============================================
bookingContainer.addEventListener('click', function (e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    if (!btn.classList.contains('offer-view-details') &&
        !btn.classList.contains('progress-view-details') &&
        !btn.classList.contains('confirmed-view-details') &&
        !btn.classList.contains('completed-view-details') &&
        !btn.classList.contains('cancelled-view-details')) return;

    const row = btn.closest('.booking-row');
    if (!row) return;
    
    const visible = getVisible();

    // TRY 1: Match by title + status
    const titleEl = row.querySelector('h4');
    const statusEl = row.querySelector('.status-pill');
    
    if (titleEl && statusEl) {
        const title = titleEl.textContent.trim();
        const statusText = statusEl.textContent.trim().toLowerCase();
        
        // Map status text to status key
        let statusKey = '';
        if (statusText.includes('offer') || statusText.includes('offers')) statusKey = 'offer';
        else if (statusText.includes('confirm')) statusKey = 'confirmed';
        else if (statusText.includes('progress')) statusKey = 'inprogress';
        else if (statusText.includes('complete')) statusKey = 'completed';
        else if (statusText.includes('cancel')) statusKey = 'cancelled';
        
        // Find by title + status
        let clicked = visible.find(b => b.title === title && b.status === statusKey);
        
        if (clicked) {
            showDetails(clicked);
            return;
        }
    }

    // TRY 2: Match by index (fallback)
    const rows = bookingContainer.querySelectorAll('.booking-row');
    const idx = Array.from(rows).indexOf(row);
    if (idx >= 0 && idx < visible.length) {
        showDetails(visible[idx]);
        return;
    }

    // TRY 3: Match by title only (last resort)
    if (titleEl) {
        const title = titleEl.textContent.trim();
        const clicked = visible.find(b => b.title === title);
        if (clicked) {
            showDetails(clicked);
            return;
        }
    }
});
    // =============================================
    // BACK BUTTON FOR OFFER/INPROGRESS
    // =============================================
    backBtn.addEventListener('click', function () {
        detailsView.classList.add('hidden');
        listView.classList.remove('hidden');
    });

    // =============================================
    // CANCEL BOOKING MODAL
    // =============================================
    const trkCancelBtn = document.getElementById('trkCancelBtn');
    const cancelBookingModal = document.getElementById('cancelBookingModal');
    const cancelModalCloseBtn = document.getElementById('cancelModalClose');
    const cancelModalKeepBtn = document.getElementById('cancelModalKeepBtn');
    const cancelModalConfirmBtn = document.getElementById('cancelModalConfirmBtn');

    function openCancelModal() {
        if (!cancelBookingModal) return;
        const b = currentDetailBooking || {};
        fillText('cancelModalServiceTitle', b.title || 'Network Cabling');
        fillText('cancelModalBookingId', b.bookingId || 'BK-56874');
        fillText('cancelModalLocation', b.location || 'DLF Cyber City, Gurgaon');
        cancelBookingModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closeCancelModal() {
        if (!cancelBookingModal) return;
        cancelBookingModal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    if (trkCancelBtn) trkCancelBtn.addEventListener('click', openCancelModal);
    if (cancelModalCloseBtn) cancelModalCloseBtn.addEventListener('click', closeCancelModal);
    if (cancelModalKeepBtn) cancelModalKeepBtn.addEventListener('click', closeCancelModal);
    if (cancelModalConfirmBtn) {
        cancelModalConfirmBtn.addEventListener('click', function () {
            closeCancelModal();
        });
    }
    if (cancelBookingModal) {
        cancelBookingModal.addEventListener('click', function (e) {
            if (e.target === cancelBookingModal) closeCancelModal();
        });
    }

    // =============================================
    // ACTIVE JOB VIEW
    // =============================================
    const activeJobSteps = [
        { title: 'Engineer Arrived', desc: 'Your booking request has been submitted successfully', date: '29 May 2026', time: '09:00 AM', status: 'completed', completedBy: 'Customer' },
        { title: 'Site check-in complete', desc: 'Engineer team arrived at site and started installation', status: 'completed', completedBy: '—' },
        { title: 'Work in progress', desc: 'Engineer team arrived at site and started installation', date: '29 May 2026', time: '09:00 AM', status: 'completed', completedBy: 'Customer' },
        { title: 'Job Completed', desc: 'Installation tested and validated successfully', status: 'completed', completedBy: '—' },
        { title: 'Make the Payment', desc: 'Project completed and handed over successfully', status: 'pending', completedBy: '—', payNow: true },
        { title: 'Payment Completed', desc: 'Project completed and handed over successfully', status: 'pending', completedBy: '—' },
        { title: 'Engineers exit the site', desc: 'Project completed and handed over successfully', status: 'pending', completedBy: '—' }
    ];

    function ajRenderTimeline(steps) {
        const wrap = document.getElementById('ajTimeline');
        if (!wrap) return;
        wrap.innerHTML = steps.map((s, idx) => {
            const isCompleted = s.status === 'completed';
            const isCurrent = s.status === 'current';
            const iconHTML = isCompleted ?
                `<span class="aj-step-icon aj-icon-done"><span class="material-symbols-outlined">check</span></span>` :
                isCurrent ?
                    `<span class="aj-step-icon aj-icon-current"><span class="material-symbols-outlined">schedule</span></span>` :
                    `<span class="aj-step-icon aj-icon-pending"></span>`;

            let badgeHTML;
            if (s.payNow) {
                badgeHTML = `<span class="status-pill badge-pay-now">Pay Now</span>`;
            } else if (isCompleted) {
                badgeHTML = `<span class="status-pill badge-completed">Completed</span>`;
            } else {
                badgeHTML = `<span class="status-pill badge-not-started">Not Started</span>`;
            }

            const lineHTML = idx < steps.length - 1 ? `<div class="aj-step-line ${isCompleted ? 'aj-line-done' : ''}"></div>` : '';
            const metaHTML = s.date ?
                `<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">calendar_today</span>${s.date}</span>
                   <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">schedule</span>${s.time}</span>` :
                `<span>—</span>`;

            return `
            <div class="aj-step-row">
                <div class="aj-step-track">
                    ${iconHTML}
                    ${lineHTML}
                </div>
                <div class="aj-step-card ${isCompleted ? 'aj-step-completed' : ''}">
                    <div class="flex items-start justify-between gap-2">
                        <p class="aj-step-title">${s.title}</p>
                        ${badgeHTML}
                    </div>
                    <p class="aj-step-desc">${s.desc}</p>
                    <div class="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                        <span class="flex items-center gap-3">${metaHTML}</span>
                        <span>Completed by: <strong class="text-slate-500">${s.completedBy || '—'}</strong></span>
                    </div>
                    ${s.note ? `<p class="text-[11px] text-slate-400 mt-1">${s.note}</p>` : ''}
                    ${s.payNow ? `<button type="button" class="aj-pay-now-btn">Pay Now</button>` : ''}
                </div>
            </div>`;
        }).join('');

        wrap.querySelectorAll('.aj-pay-now-btn').forEach(btn => {
            btn.addEventListener('click', openPaymentModal);
        });
    }

    function ajRenderEngineers() {
        const list = document.getElementById('ajEngineerList');
        if (!list) return;
        const trkEngineers = [
            { name: 'Rahul Sharma', role: 'Network Cabling Expert', status: 'On Site', color: '#DC7B24', initials: 'RS' },
            { name: 'Vikas Singh', role: 'Senior Technician', status: 'On Route', color: '#00897B', initials: 'VS' },
            { name: 'Amit Kumar', role: 'Technician', status: 'On Site', color: '#F97316', initials: 'AK' }
        ];
        const statusColorMap = {
            'On Site': ['#DCFCE7', '#16A34A'],
            'On Route': ['#FFF6E5', '#F5A623'],
            'On Break': ['#EDE9FE', '#7C3AED'],
            'Offline': ['#F1F5F9', '#64748B']
        };
        list.innerHTML = trkEngineers.map(eng => {
            const colors = statusColorMap[eng.status] || statusColorMap['Offline'];
            return `
            <div class="trk-eng-card">
                <div class="trk-eng-left">
                    <div class="trk-eng-avatar" style="background:${eng.color}">${eng.initials}</div>
                    <div>
                        <p class="trk-eng-name">${eng.name}</p>
                        <p class="trk-eng-role">${eng.role}</p>
                        <span class="trk-eng-status-badge" style="background:${colors[0]};color:${colors[1]};">${eng.status}</span>
                    </div>
                </div>
                <button type="button" class="trk-track-btn">Track</button>
            </div>`;
        }).join('');
    }

    function initActiveJobView() {
        ajRenderTimeline(activeJobSteps);
        ajRenderEngineers();
    }

    const trkJobDetailsBtn = document.getElementById('trkJobDetailsBtn');
    if (trkJobDetailsBtn) {
        trkJobDetailsBtn.addEventListener('click', function () {
            document.getElementById('trackingView').classList.add('hidden');
            document.getElementById('activeJobView').classList.remove('hidden');
            initActiveJobView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const backToTrackingFromJobBtn = document.getElementById('backToTrackingFromJobBtn');
    if (backToTrackingFromJobBtn) {
        backToTrackingFromJobBtn.addEventListener('click', function () {
            document.getElementById('activeJobView').classList.add('hidden');
            document.getElementById('trackingView').classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // PAYMENT MODAL
    // =============================================
    const recommendedPayments = [
        { id: 'netbanking-rec', icon: 'account_balance', label: 'Net Banking',
            details: { accountNumber: '7412 4785 4568 1254', ifsc: 'HDFC0001234', holder: 'Vikram Singh' } }
    ];

    const savedPaymentMethods = [
        { id: 'upi', icon: 'bolt', label: 'UPI', type: 'upi', details: { vpa: 'aditya03@paytm' } },
        { id: 'netbanking-saved', icon: 'account_balance', label: 'Net Banking', type: 'bank',
            details: { accountNumber: '7412 4785 4568 1254', ifsc: 'HDFC0001234', holder: 'Vikram Singh' } },
        { id: 'card', icon: 'credit_card', label: 'Debit / Credit Card', type: 'card',
            details: { masked: '**** **** **** 3456', nameOnCard: 'Aditya Singh', cardType: 'Visa' } }
    ];

    function pmDetailBody(p) {
        if (p.type === 'upi') {
            return `<p class="pm-detail-label">UPI ID</p><p class="pm-detail-value">${p.details.vpa}</p>`;
        }
        if (p.type === 'card') {
            return `
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-[10px] font-bold px-1.5 py-0.5 border border-slate-200 rounded">${p.details.cardType}</span>
                    <span class="pm-detail-value">${p.details.masked}</span>
                </div>
                <p class="pm-detail-label">Name on Card</p><p class="pm-detail-value mb-2">${p.details.nameOnCard}</p>
                <p class="pm-detail-label">Type</p><p class="pm-detail-value">${p.details.cardType}</p>`;
        }
        return `
            <p class="pm-detail-label">Account Number</p><p class="pm-detail-value mb-2">${p.details.accountNumber}</p>
            <p class="pm-detail-label">IFSC Code</p><p class="pm-detail-value mb-2">${p.details.ifsc}</p>
            <p class="pm-detail-label">Account Holder Name</p><p class="pm-detail-value">${p.details.holder}</p>`;
    }

    function pmAccordionHTML(p) {
        return `
        <div class="pm-accordion" data-id="${p.id}">
            <button type="button" class="pm-accordion-header">
                <span class="flex items-center gap-2 text-sm font-medium">
                    <span class="material-symbols-outlined text-emerald-500 text-[18px]">${p.icon}</span>${p.label}
                </span>
                <span class="material-symbols-outlined pm-chevron text-[18px]">expand_more</span>
            </button>
            <div class="pm-accordion-body hidden pt-3">
                <div class="flex items-end justify-between gap-3">
                    <div class="text-xs">${pmDetailBody(p)}</div>
                    <button type="button" class="pm-proceed-btn shrink-0" data-method-id="${p.id}">Proceed</button>
                </div>
            </div>
        </div>`;
    }

    function pmRenderRecommended() {
        document.getElementById('pmRecommendedList').innerHTML = recommendedPayments.map(pmAccordionHTML).join('');
    }

    function pmRenderSaved() {
        document.getElementById('pmSavedList').innerHTML = savedPaymentMethods.map(pmAccordionHTML).join('');
    }

    function openPaymentModal() {
        pmRenderRecommended();
        pmRenderSaved();
        document.getElementById('paymentModal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function closePaymentModal() {
        document.getElementById('paymentModal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    const paymentModalClose = document.getElementById('paymentModalClose');
    if (paymentModalClose) paymentModalClose.addEventListener('click', closePaymentModal);
    
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
        paymentModal.addEventListener('click', function (e) {
            if (e.target === this) closePaymentModal();
        });
    }

    document.getElementById('paymentModal').addEventListener('click', function (e) {
        const header = e.target.closest('.pm-accordion-header');
        if (header) {
            const body = header.closest('.pm-accordion').querySelector('.pm-accordion-body');
            const chevron = header.querySelector('.pm-chevron');
            const isOpen = !body.classList.contains('hidden');
            document.querySelectorAll('#paymentModal .pm-accordion-body').forEach(b => b.classList.add('hidden'));
            document.querySelectorAll('#paymentModal .pm-chevron').forEach(c => c.textContent = 'expand_more');
            if (!isOpen) {
                body.classList.remove('hidden');
                chevron.textContent = 'expand_less';
            }
            return;
        }
        const proceedBtn = e.target.closest('.pm-proceed-btn');
        if (proceedBtn) {
            closePaymentModal();
            processPayment();
        }
    });

    // =============================================
    // PAYMENT RESULT MODAL
    // =============================================
    function processPayment() {
        const success = Math.random() > 0.3;
        showPaymentResult(success);
    }

    function showPaymentResult(success) {
        const iconWrap = document.getElementById('prIconWrap');
        const icon = document.getElementById('prIcon');
        const title = document.getElementById('prTitle');
        const bookingId = document.getElementById('prBookingId');

        iconWrap.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ' + (success ? 'pr-success' : 'pr-fail');
        icon.textContent = success ? 'check' : 'close';
        title.textContent = success ? 'Payment Successful' : 'Payment Failed';
        bookingId.textContent = '#SZF-2024-00847';

        document.getElementById('paymentResultModal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

        if (success) {
            activeJobSteps[4].status = 'completed';
            activeJobSteps[4].payNow = false;
            activeJobSteps[5].status = 'completed';
            activeJobSteps[6].status = 'completed';
            ajRenderTimeline(activeJobSteps);
        }
    }

    function closePaymentResultModal() {
        document.getElementById('paymentResultModal').classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    const paymentResultClose = document.getElementById('paymentResultClose');
    if (paymentResultClose) paymentResultClose.addEventListener('click', closePaymentResultModal);
    
    const paymentResultModal = document.getElementById('paymentResultModal');
    if (paymentResultModal) {
        paymentResultModal.addEventListener('click', function (e) {
            if (e.target === this) closePaymentResultModal();
        });
    }
    
    const prBackHomeBtn = document.getElementById('prBackHomeBtn');
    if (prBackHomeBtn) prBackHomeBtn.addEventListener('click', closePaymentResultModal);
    
    const prBookingHistoryBtn = document.getElementById('prBookingHistoryBtn');
    if (prBookingHistoryBtn) {
        prBookingHistoryBtn.addEventListener('click', function () {
            closePaymentResultModal();
            document.getElementById('activeJobView').classList.add('hidden');
            listView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Sidebar support button
    const helpMainBtn = document.getElementById('helpMainBtnText') ? document.getElementById('helpMainBtnText').closest('button') : null;
    if (helpMainBtn) {
        helpMainBtn.addEventListener('click', function () {
            const helpMainBtnText = document.getElementById('helpMainBtnText');
            if (helpMainBtnText && helpMainBtnText.textContent === 'Chat Support') {
                document.getElementById('confirm-detail-view').classList.add('hidden');
                document.getElementById('detailsView').classList.add('hidden');
                const chatView = document.getElementById('chatView');
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