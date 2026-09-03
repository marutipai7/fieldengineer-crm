/**
 * ============================================================================
 * FIELD ENGINEER CRM :: MY JOBS -- SINGLE CONSOLIDATED FILE
 * ----------------------------------------------------------------------------
 * This is the ONLY JavaScript file needed for the entire My Jobs screen,
 * including all its flow screens and modals.
 *
 * STRUCTURE (sections are clearly marked and can be extended independently):
 *   SECTION 1: CONFIG & MOCK DATA
 *   SECTION 2: SHARED UTILITIES & HELPERS
 *   SECTION 3: MY JOBS LIST SCREEN (fe-my-jobs-*)
 *     - 3.1: Tab Registry & Filtering
 *     - 3.2: Card Renderers (by status)
 *     - 3.3: Stats & Pagination
 *   SECTION 4: PROGRESS FLOW (progress-*)
 *     - 4.1: Job Details Screen
 *     - 4.2: Task Details Screen
 *     - 4.3: Modals (Attached Files, Special Instructions, Cancel Job)
 *   SECTION 5: EVENT BINDING & INIT
 *
 * Each section has its own namespace prefix to prevent conflicts:
 *   - List screen:  fe-my-jobs-* / feMyJobs*
 *   - Progress flow: progress-* / progress*
 *
 * TO ADD A NEW TAB FLOW (e.g. Upcoming):
 *   - Create a new SECTION (e.g. SECTION 5: UPCOMING FLOW)
 *   - Use prefix upcoming-* / upcoming*
 *   - Wire it into the View Details handler in Section 3
 * ============================================================================
 */

(function () {
  "use strict";

  /* ==========================================================================
     SECTION 1: CONFIG & MOCK DATA
     Replace with real API calls once backend is ready
  ========================================================================== */

  var FE_MY_JOBS_CONFIG = {
    pageSize: 9, // cards per page
  };

  // Job statuses: "in_progress" | "upcoming" | "completed" | "cancelled"
  // Job types: "network" | "server" | "cctv" | "fiber"
  var feMyJobsData = [
    // ---- In Progress (3) ----
    {
      id: 1,
      type: "network",
      title: "Network Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "in_progress",
      startedAt: "09:30 AM",
      budget: "$5,000",
      team: "6 Engineers",
      timeRunning: "01:24:35",
    },
    {
      id: 2,
      type: "network",
      title: "Network Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "in_progress",
      startedAt: "09:30 AM",
      budget: "$5,000",
      team: "6 Engineers",
      timeRunning: "01:24:35",
    },
    {
      id: 3,
      type: "network",
      title: "Network Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "in_progress",
      startedAt: "09:30 AM",
      budget: "$5,000",
      team: "6 Engineers",
      timeRunning: "01:24:35",
    },

    // ---- Upcoming (2) ----
    {
      id: 4,
      type: "server",
      title: "Server Installation",
      jobId: "BK-56874",
      location: "Electronic City, Bengaluru",
      date: "29 May 2026, 10:00 am",
      status: "upcoming",
      startsAt: "01h 30m",
      budget: "$5,000",
      team: "5 Engineers",
      priority: "High",
    },
    {
      id: 5,
      type: "server",
      title: "Server Installation",
      jobId: "BK-56874",
      location: "Electronic City, Bengaluru",
      date: "29 May 2026, 10:00 am",
      status: "upcoming",
      startsAt: "-",
      budget: "$5,000",
      team: "5 Engineers",
      priority: "High",
    },

    // ---- Completed (8) ----
    {
      id: 6,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },
    {
      id: 7,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },
    {
      id: 8,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },
    {
      id: 9,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },
    {
      id: 10,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },
    {
      id: 11,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },
    {
      id: 12,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },
    {
      id: 13,
      type: "cctv",
      title: "CCTV Installation",
      jobId: "BK-56874",
      location: "Prestige Tech Park, Whitefield, Bangalore",
      date: "29 May 2026, 10:00 am",
      status: "completed",
      completedOn: "27 May",
      budget: "$5,000",
      team: "6 Engineers",
    },

    // ---- Cancelled (2) ----
    {
      id: 14,
      type: "fiber",
      title: "Fiber Optic Installation",
      jobId: "BK-56874",
      location: "Electronic City, Bengaluru",
      date: "29 May 2026, 10:00 am",
      status: "cancelled",
      budget: "$5,000",
      team: "5 Engineers",
      priority: "High",
    },
    {
      id: 15,
      type: "fiber",
      title: "Fiber Optic Installation",
      jobId: "BK-56874",
      location: "Electronic City, Bengaluru",
      date: "29 May 2026, 10:00 am",
      status: "cancelled",
      budget: "$5,000",
      team: "5 Engineers",
      priority: "High",
    },
  ];

  // Progress flow mock data (tasks, team, activity, files, cancel reasons)
  var PROGRESS_TASKS = [
    {
      key: "site_inspection",
      title: "1. Site Inspection",
      description: "Engineer team arrived at site and started installation",
      status: "completed",
      meta: "Est 20 min \u2022 2 Photos",
      startedAt: "Task Started at: 20 May, 2024, 09:30 am",
      elapsed: "Elapsed Time: 00:42:10",
      instructions: [
        "Verify rack location as per layout plan",
        "Check power availability and ventilation around the rack",
        "Take photos of the rack area before proceeding",
        "Ensure the area is clean and free from any obstructions",
      ],
      checklist: [
        { label: "Verify rack location and dimensions", done: true },
        { label: "Check power and network availability", done: true },
        { label: "Ensure proper ventilation and clearance", done: true },
      ],
    },
    {
      key: "rack_installation",
      title: "2. Rack Installation",
      description:
        "Inspect the rack location and ensure all requirements are met",
      status: "completed",
      meta: "Est 20 min \u2022 2 Photos",
      startedAt: "Task Started at: 20 May, 2024, 10:05 am",
      elapsed: "Elapsed Time: 00:38:44",
      instructions: [
        "Mount the rack as per the approved layout plan",
        "Torque all mounting bolts to spec",
        "Label each rack unit before cabling begins",
        "Take before/after photos for the report",
      ],
      checklist: [
        { label: "Rack mounted and leveled", done: true },
        { label: "Grounding connected and tested", done: true },
        { label: "Unit labels applied", done: true },
      ],
    },
    {
      key: "cable_testing",
      title: "3. Cable Testing",
      description:
        "Perform connectivity testing, throughput validation and cable certification to ensure network performance meets requirements.",
      status: "in_progress",
      meta: "Est 20 min",
      startedAt: "Task Started at: today, 11:30 AM",
      elapsed: "Elapsed Time: 00:00:12",
      instructions: [
        "Verify rack location as per layout plan",
        "Check power availability and ventilation around the rack",
        "Take photos of the rack area before proceeding",
        "Ensure the area is clean and free from any obstructions",
      ],
      checklist: [
        {
          label: "Verify rack location and dimensions",
          done: false,
          photoRequired: true,
        },
        { label: "Check power and network availability", done: false },
        { label: "Ensure proper ventilation and clearance", done: false },
      ],
    },
    {
      key: "final_documentation",
      title: "4. Final Documentation",
      description: "Starts after previous task completion",
      status: "pending",
      meta: "Est 20 min \u2022 2 Photos",
      startedAt: "Task not started yet",
      elapsed: "Elapsed Time: 00:00:00",
      instructions: [
        "Compile installation report with before/after photos",
        "Attach signed customer acceptance form",
        "Upload all test certificates",
        "Submit for review once all sections are complete",
      ],
      checklist: [
        { label: "Installation report drafted", done: false },
        {
          label: "Customer sign-off collected",
          done: false,
          photoRequired: true,
        },
        { label: "Certificates uploaded", done: false },
      ],
    },
  ];

  var PROGRESS_CANCEL_REASONS = [
    "Personal Emergency",
    "Health Issue",
    "Vehicle Problem",
    "Unable to Reach Site",
    "Safety Concern",
    "Incorrect Job Assignment",
    "Lack of Required Skills",
    "Customer Requested Cancellation",
    "Site Not Accessible",
    "Schedule Conflict",
    "Technical Constraints",
    "Other",
  ];

  var PROGRESS_ACTIVITY_LOG = [
    {
      icon: "play_circle",
      color: "text-sky-500",
      title: "Task Started",
      desc: "Rack Mount Installation",
      time: "15 May, 2024, 01:30 AM",
    },
    {
      icon: "task_alt",
      color: "text-emerald-500",
      title: "Job Accepted",
      desc: "Office Network Installation.",
      time: "15 May, 2024, 12:30 AM",
    },
    {
      icon: "location_on",
      color: "text-amber-500",
      title: "Reach Site",
      desc: "Engineer checked-in at site location.",
      time: "15 May, 2024, 01:00 AM",
    },
    {
      icon: "check_circle",
      color: "text-emerald-500",
      title: "Task Completed",
      desc: "Rack Mount Installation is completed.",
      time: "15 May, 2024, 09:00 AM",
    },
    {
      icon: "payments",
      color: "text-violet-500",
      title: "Payment Complete",
      desc: "Invoice generated and payment received.",
      time: "15 May, 2024, 09:30 AM",
    },
    {
      icon: "search",
      color: "text-gray-400",
      title: "Site Inspection",
      desc: "Inspect the rack location and ensure all requirements are met.",
      time: "15 May, 2024, 01:15 AM",
    },
  ];

  var PROGRESS_TEAM_MEMBERS = [
    {
      name: "Rahul Sharma",
      role: "Network Engineer",
      rating: "4.9",
      status: "On Site",
      skills: "Cable, Rack Setup, Roting",
    },
    {
      name: "Rahul Sharma",
      role: "Network Engineer",
      rating: "4.9",
      status: "Traveling",
      skills: "Cable, Rack Setup, Roting",
    },
    {
      name: "Rahul Sharma",
      role: "Network Engineer",
      rating: "4.9",
      status: "On Site",
      skills: "Cable, Rack Setup, Roting",
    },
    {
      name: "Rahul Sharma",
      role: "Network Engineer",
      rating: "4.9",
      status: "On Site",
      skills: "Cable, Rack Setup, Roting",
    },
  ];

  var PROGRESS_ATTACHED_FILES = [
    {
      name: "Installation Report.pdf",
      size: "1.4 MB",
      by: "Global Tech Solution Customer",
      date: "19 May, 2024, 10:30",
    },
    {
      name: "Installation Report.pdf",
      size: "1.4 MB",
      by: "Global Tech Solution Customer",
      date: "19 May, 2024, 10:30",
    },
    {
      name: "Installation Report.pdf",
      size: "1.4 MB",
      by: "Global Tech Solution Customer",
      date: "19 May, 2024, 10:30",
    },
    {
      name: "Installation Report.pdf",
      size: "1.4 MB",
      by: "Global Tech Solution Customer",
      date: "19 May, 2024, 10:30",
    },
    {
      name: "Installation Report.pdf",
      size: "1.4 MB",
      by: "Global Tech Solution Customer",
      date: "19 May, 2024, 10:30",
    },
  ];

  /* ==========================================================================
     SECTION 2: SHARED UTILITIES & HELPERS
     Used by BOTH the List Screen and the Progress Flow
  ========================================================================== */

  function feMyJobsEscapeHtml(value) {
    var div = document.createElement("div");
    div.textContent = value == null ? "" : String(value);
    return div.innerHTML;
  }

  function feMyJobsGetJobById(jobId) {
    return feMyJobsData.filter(function (item) {
      return String(item.id) === String(jobId);
    })[0];
  }

  /* ==========================================================================
     SECTION 3: MY JOBS LIST SCREEN
     Handles: tabs, search, card grid, pagination, stats
     Prefix: fe-my-jobs-* / feMyJobs*
  ========================================================================== */

  // ---- 3.1: Tab Registry & Filtering ----
  var FE_MY_JOBS_TABS = [
    { key: "all", filter: null },
    {
      key: "in_progress",
      filter: function (job) {
        return job.status === "in_progress";
      },
    },
    {
      key: "upcoming",
      filter: function (job) {
        return job.status === "upcoming";
      },
    },
    {
      key: "completed",
      filter: function (job) {
        return job.status === "completed";
      },
    },
    {
      key: "cancelled",
      filter: function (job) {
        return job.status === "cancelled";
      },
    },
  ];

  var feMyJobsState = {
    activeTab: "all",
    searchQuery: "",
    currentPage: 1,
  };

  function feMyJobsGetTabConfig(key) {
    for (var i = 0; i < FE_MY_JOBS_TABS.length; i++) {
      if (FE_MY_JOBS_TABS[i].key === key) return FE_MY_JOBS_TABS[i];
    }
    return FE_MY_JOBS_TABS[0];
  }

  function feMyJobsGetFilteredJobs() {
    var tabConfig = feMyJobsGetTabConfig(feMyJobsState.activeTab);
    var jobs = tabConfig.filter
      ? feMyJobsData.filter(tabConfig.filter)
      : feMyJobsData.slice();

    var query = feMyJobsState.searchQuery.trim().toLowerCase();
    if (query) {
      jobs = jobs.filter(function (job) {
        return (
          job.title.toLowerCase().indexOf(query) !== -1 ||
          job.jobId.toLowerCase().indexOf(query) !== -1 ||
          job.location.toLowerCase().indexOf(query) !== -1
        );
      });
    }
    return jobs;
  }

  // ---- 3.2: Card Renderers (by status) ----
  var FE_MY_JOBS_TYPE_ICONS = {
    network: { bg: "bg-sky-50", fg: "text-sky-500", icon: "lan" },
    server: { bg: "bg-orange-50", fg: "text-orange-500", icon: "dns" },
    cctv: { bg: "bg-violet-50", fg: "text-violet-500", icon: "videocam" },
    fiber: { bg: "bg-pink-50", fg: "text-pink-500", icon: "cable" },
  };

  var FE_MY_JOBS_STATUS_BADGES = {
    in_progress: { label: "In Progress", classes: "bg-sky-50 text-sky-600" },
    upcoming: { label: "Upcoming", classes: "bg-amber-50 text-amber-600" },
    completed: {
      label: "Completed",
      classes: "bg-emerald-50 text-emerald-600",
    },
    cancelled: { label: "Cancelled", classes: "bg-rose-50 text-rose-600" },
  };

  function feMyJobsIconMarkup(type) {
    var icon = FE_MY_JOBS_TYPE_ICONS[type] || FE_MY_JOBS_TYPE_ICONS.network;
    return (
      '<span class="flex items-center justify-center w-9 h-9 rounded-lg ' +
      icon.bg +
      " " +
      icon.fg +
      ' shrink-0">' +
      '<span class="material-symbols-outlined" style="font-size:18px;">' +
      icon.icon +
      "</span>" +
      "</span>"
    );
  }

  function feMyJobsBadgeMarkup(status) {
    var badge =
      FE_MY_JOBS_STATUS_BADGES[status] || FE_MY_JOBS_STATUS_BADGES.upcoming;
    return (
      '<span class="text-[11px] font-medium px-2.5 py-1 rounded-full ' +
      badge.classes +
      '">' +
      badge.label +
      "</span>"
    );
  }

  function feMyJobsCardHeaderMarkup(job) {
    return (
      '<div class="flex items-start justify-between gap-2 mb-3">' +
      '<div class="flex items-start gap-2.5">' +
      feMyJobsIconMarkup(job.type) +
      "<div>" +
      '<p class="text-sm font-semibold text-gray-900 leading-tight">' +
      feMyJobsEscapeHtml(job.title) +
      "</p>" +
      '<p class="text-[11px] text-gray-400 mt-0.5">Job #' +
      feMyJobsEscapeHtml(job.jobId) +
      "</p>" +
      "</div>" +
      "</div>" +
      feMyJobsBadgeMarkup(job.status) +
      "</div>" +
      '<p class="flex items-center gap-1 text-[11px] text-gray-400 mb-1">' +
      '<span class="material-symbols-outlined shrink-0" style="font-size:14px;">location_on</span>' +
      feMyJobsEscapeHtml(job.location) +
      "</p>" +
      '<p class="flex items-center gap-1 text-[11px] text-gray-400 mb-3">' +
      '<span class="material-symbols-outlined shrink-0" style="font-size:14px;">calendar_today</span>' +
      feMyJobsEscapeHtml(job.date) +
      "</p>"
    );
  }

  function feMyJobsStatColumn(label, value, valueClasses) {
    return (
      "<div>" +
      '<p class="text-[10px] text-gray-400 leading-none mb-1">' +
      label +
      "</p>" +
      '<p class="text-xs font-medium ' +
      (valueClasses || "text-gray-700") +
      '">' +
      feMyJobsEscapeHtml(value) +
      "</p>" +
      "</div>"
    );
  }

  function feMyJobsRenderInProgressCard(job) {
    return (
      '<div class="fe-my-jobs-card border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">' +
      feMyJobsCardHeaderMarkup(job) +
      '<div class="grid grid-cols-4 gap-2 items-end">' +
      feMyJobsStatColumn("Started at", job.startedAt) +
      feMyJobsStatColumn("Budget", job.budget) +
      feMyJobsStatColumn("Team", job.team) +
      '<div class="bg-amber-400 rounded-lg px-2 py-1.5 text-right">' +
      '<p class="text-[9px] text-amber-900 leading-none mb-0.5">Time Running</p>' +
      '<p class="text-xs font-semibold text-white leading-none">' +
      feMyJobsEscapeHtml(job.timeRunning) +
      "</p>" +
      "</div>" +
      "</div>" +
      '<button type="button" class="fe-my-jobs-view-details w-full mt-3 border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-50" data-job-id="' +
      job.id +
      '">View Details</button>' +
      "</div>"
    );
  }

  function feMyJobsRenderUpcomingCard(job) {
    return (
      '<div class="fe-my-jobs-card border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">' +
      feMyJobsCardHeaderMarkup(job) +
      '<div class="grid grid-cols-4 gap-2 mb-3">' +
      feMyJobsStatColumn("Starts at", job.startsAt) +
      feMyJobsStatColumn("Budget", job.budget) +
      feMyJobsStatColumn("Team", job.team) +
      feMyJobsStatColumn(
        "Priority",
        job.priority,
        "text-rose-500 font-semibold",
      ) +
      "</div>" +
      '<button type="button" class="fe-my-jobs-view-details w-full border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-50" data-job-id="' +
      job.id +
      '">View Details</button>' +
      "</div>"
    );
  }

  function feMyJobsRenderCompletedCard(job) {
    return (
      '<div class="fe-my-jobs-card border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">' +
      feMyJobsCardHeaderMarkup(job) +
      '<div class="grid grid-cols-3 gap-2 mb-3">' +
      feMyJobsStatColumn("Completed on", job.completedOn) +
      feMyJobsStatColumn("Budget", job.budget) +
      feMyJobsStatColumn("Team", job.team) +
      "</div>" +
      '<div class="grid grid-cols-2 gap-2">' +
      '<button type="button" class="fe-my-jobs-view-details border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-50" data-job-id="' +
      job.id +
      '">View Details</button>' +
      '<button type="button" class="fe-my-jobs-invoice bg-amber-400 rounded-lg py-2 text-xs font-medium text-white hover:bg-amber-500" data-job-id="' +
      job.id +
      '">Invoice</button>' +
      "</div>" +
      "</div>"
    );
  }

  function feMyJobsRenderCancelledCard(job) {
    return (
      '<div class="fe-my-jobs-card border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow">' +
      feMyJobsCardHeaderMarkup(job) +
      '<div class="grid grid-cols-3 gap-2 mb-3">' +
      feMyJobsStatColumn("Budget", job.budget) +
      feMyJobsStatColumn("Team", job.team) +
      feMyJobsStatColumn(
        "Priority",
        job.priority,
        "text-rose-500 font-semibold",
      ) +
      "</div>" +
      '<button type="button" class="fe-my-jobs-view-details w-full border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-50" data-job-id="' +
      job.id +
      '">View Details</button>' +
      "</div>"
    );
  }

  // Dispatch table - add new renderer here for new statuses
  var FE_MY_JOBS_CARD_RENDERERS = {
    in_progress: feMyJobsRenderInProgressCard,
    upcoming: feMyJobsRenderUpcomingCard,
    completed: feMyJobsRenderCompletedCard,
    cancelled: feMyJobsRenderCancelledCard,
  };

  function feMyJobsRenderCard(job) {
    var renderer =
      FE_MY_JOBS_CARD_RENDERERS[job.status] || feMyJobsRenderUpcomingCard;
    return renderer(job);
  }

  // ---- 3.3: Stats & Pagination ----
  function feMyJobsUpdateStats() {
    var counts = {
      total: feMyJobsData.length,
      in_progress: 0,
      upcoming: 0,
      completed: 0,
      cancelled: 0,
    };
    feMyJobsData.forEach(function (job) {
      if (counts.hasOwnProperty(job.status)) counts[job.status] += 1;
    });
    Object.keys(counts).forEach(function (key) {
      var el = document.querySelector('[data-stat="' + key + '"]');
      if (el) el.textContent = counts[key];
    });
  }

  function feMyJobsRenderPagination(totalItems, totalPages) {
    var wrap = document.getElementById("fe-my-jobs-pagination");
    var indicator = document.getElementById("fe-my-jobs-page-indicator");
    var prevBtn = document.getElementById("fe-my-jobs-prev-page");
    var nextBtn = document.getElementById("fe-my-jobs-next-page");
    if (!wrap) return;

    if (totalItems <= FE_MY_JOBS_CONFIG.pageSize) {
      wrap.classList.add("hidden");
      wrap.classList.remove("flex");
      return;
    }

    wrap.classList.remove("hidden");
    wrap.classList.add("flex");
    if (indicator)
      indicator.textContent =
        "Page " + feMyJobsState.currentPage + " of " + totalPages;
    if (prevBtn) prevBtn.disabled = feMyJobsState.currentPage <= 1;
    if (nextBtn) nextBtn.disabled = feMyJobsState.currentPage >= totalPages;
  }

  function feMyJobsRender() {
    var grid = document.getElementById("fe-my-jobs-grid");
    var emptyState = document.getElementById("fe-my-jobs-empty-state");
    if (!grid) return;

    var filtered = feMyJobsGetFilteredJobs();
    var pageSize = FE_MY_JOBS_CONFIG.pageSize;
    var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

    if (feMyJobsState.currentPage > totalPages)
      feMyJobsState.currentPage = totalPages;

    var startIndex = (feMyJobsState.currentPage - 1) * pageSize;
    var pageItems = filtered.slice(startIndex, startIndex + pageSize);

    if (pageItems.length === 0) {
      grid.innerHTML = "";
      grid.classList.add("hidden");
      if (emptyState) {
        emptyState.classList.remove("hidden");
        emptyState.classList.add("flex");
      }
    } else {
      grid.classList.remove("hidden");
      if (emptyState) {
        emptyState.classList.add("hidden");
        emptyState.classList.remove("flex");
      }
      grid.innerHTML = pageItems.map(feMyJobsRenderCard).join("");
    }

    feMyJobsRenderPagination(filtered.length, totalPages);
    feMyJobsUpdateStats();
  }

  function feMyJobsSetActiveTab(tabKey) {
    feMyJobsState.activeTab = tabKey;
    feMyJobsState.currentPage = 1;

    var tabButtons = document.querySelectorAll(".fe-my-jobs-tab");
    tabButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-fe-my-jobs-tab") === tabKey;
      btn.classList.toggle("fe-my-jobs-tab-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    feMyJobsRender();
  }

  /* ==========================================================================
     SECTION 4: PROGRESS FLOW
     Handles: Job Details screen, Task Details screen, all modals
     Prefix: progress-* / progress*
  ========================================================================== */

  var progressState = {
    currentJob: null,
    activeTab: "overview",
    isCancelled: false,
    selectedCancelReason: "",
    activeTaskKey: null,
  };

  // ---- 4.1: Job Details Screen ----

  var PROGRESS_SCREEN_IDS = [
    "fe-my-jobs-page",
    "progress-job-details-view",
    "progress-task-details-view",
  ];

  function progressShowScreen(screenId) {
    PROGRESS_SCREEN_IDS.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle("hidden", id !== screenId);
    });
    window.scrollTo({
      top: 0,
      behavior: "instant" in window ? "instant" : "auto",
    });
  }

  function progressSetField(root, name, value) {
    var el = root.querySelector('[data-progress-field="' + name + '"]');
    if (el) el.textContent = value;
  }

  function progressRenderJobHeader(job) {
    var root = document.getElementById("progress-job-details-view");
    if (!root) return;
    progressSetField(root, "title", job.title || "Office Network Installation");
    progressSetField(root, "job-id", "Job #" + (job.jobId || "BK-56874"));
    progressSetField(
      root,
      "location",
      job.location || "Connaught Place, New Delhi",
    );
    progressSetField(root, "date", job.date || "20 May, 2024");
    progressSetField(
      root,
      "starts-in",
      job.startedAt ? "Started at " + job.startedAt : "01h 30m",
    );
    progressSetField(root, "team", job.team || "6 Engineers");
    progressSetField(root, "payment", job.budget || "$5,000");
    progressSetField(root, "time-running", job.timeRunning || "01:24:35");
  }

  function progressSwitchTab(tabKey) {
    progressState.activeTab = tabKey;

    var tabButtons = document.querySelectorAll(".progress-tab");
    tabButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-progress-tab") === tabKey;
      btn.classList.toggle("progress-tab-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    var panels = document.querySelectorAll(".progress-tab-panel");
    panels.forEach(function (panel) {
      panel.classList.toggle(
        "hidden",
        panel.getAttribute("data-progress-panel") !== tabKey,
      );
    });
  }

  function progressRenderTeamMembers() {
    var grid = document.getElementById("progress-team-members-grid");
    var template = document.getElementById("progress-team-member-template");
    if (!grid || !template) return;

    grid.innerHTML = "";
    PROGRESS_TEAM_MEMBERS.forEach(function (member) {
      var node = template.content.cloneNode(true);
      var card = node.querySelector("div");
      var badge = node.querySelector("span.inline-block");
      var initialsEl = node.querySelector(".progress-team-avatar");
      var nameEl = node.querySelectorAll("p")[0];
      var roleEl = node.querySelectorAll("p")[1];
      var ratingEl = node.querySelectorAll("p")[2];
      var skillsEl = node.querySelectorAll("p")[3];

      var statusClasses =
        member.status === "Traveling"
          ? "bg-amber-50 text-amber-600"
          : "bg-emerald-50 text-emerald-600";
      badge.className =
        "inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-2 " +
        statusClasses;
      badge.textContent = member.status;

      var initials = member.name
        .split(" ")
        .map(function (part) {
          return part[0];
        })
        .join("");
      initialsEl.textContent = initials;
      nameEl.textContent = member.name;
      roleEl.textContent = member.role;
      ratingEl.innerHTML = "\u2605 " + member.rating;
      skillsEl.textContent = "Skills: " + member.skills;

      grid.appendChild(card);
    });
  }

  function progressApplyCancelledState(isCancelled) {
    progressState.isCancelled = isCancelled;

    var badge = document.querySelector('[data-progress-field="status-badge"]');
    if (badge) {
      badge.textContent = isCancelled ? "Cancelled" : "In Progress";
      badge.classList.toggle("bg-sky-50", !isCancelled);
      badge.classList.toggle("text-sky-600", !isCancelled);
      badge.classList.toggle("bg-rose-50", isCancelled);
      badge.classList.toggle("text-rose-600", isCancelled);
    }

    document.querySelectorAll(".progress-stepper-wrap").forEach(function (el) {
      el.classList.toggle("hidden", isCancelled);
    });
    document.querySelectorAll(".progress-timeline-wrap").forEach(function (el) {
      el.classList.toggle("hidden", !isCancelled);
      if (!isCancelled) return;
      var timeEl = el.querySelector('[data-progress-field="cancelled-at"]');
      if (timeEl) timeEl.textContent = new Date().toLocaleString();
    });

    document
      .querySelectorAll(".progress-footer-actions")
      .forEach(function (el) {
        el.classList.toggle("hidden", isCancelled);
      });
    document
      .querySelectorAll(".progress-time-running-box")
      .forEach(function (el) {
        el.classList.toggle("hidden", isCancelled);
      });
  }

  function progressOpenJobDetails(job) {
    progressState.currentJob = job;
    progressState.isCancelled = job.status === "cancelled";

    progressRenderJobHeader(job);
    progressRenderTeamMembers();
    progressRenderTaskList();
    progressRenderActivityTimeline();
    progressApplyCancelledState(progressState.isCancelled);
    progressSwitchTab("overview");
    progressShowScreen("progress-job-details-view");
  }

  // ---- Task List (Tasks tab) ----

  var PROGRESS_TASK_STATUS_BADGES = {
    completed: {
      label: "Completed",
      classes: "bg-emerald-50 text-emerald-600",
    },
    in_progress: { label: "In Progress", classes: "bg-sky-50 text-sky-600" },
    pending: { label: "Pending", classes: "bg-gray-100 text-gray-500" },
  };

  function progressRenderTaskList() {
    var list = document.getElementById("progress-task-list");
    if (!list) return;

    list.innerHTML = PROGRESS_TASKS.map(function (task) {
      var badge =
        PROGRESS_TASK_STATUS_BADGES[task.status] ||
        PROGRESS_TASK_STATUS_BADGES.pending;
      var statusDot =
        task.status === "completed"
          ? '<span class="material-symbols-outlined text-emerald-500 mt-0.5" style="font-size:20px;">check_circle</span>'
          : task.status === "in_progress"
            ? '<span class="material-symbols-outlined text-amber-500 mt-0.5" style="font-size:20px;">pending</span>'
            : '<span class="material-symbols-outlined text-gray-300 mt-0.5" style="font-size:20px;">radio_button_unchecked</span>';

      return (
        '<div class="flex gap-3 border border-gray-100 rounded-xl p-4">' +
        statusDot +
        '<div class="flex-1">' +
        '<div class="flex items-start justify-between gap-2 mb-1">' +
        '<p class="text-sm font-semibold text-gray-800">' +
        task.title +
        "</p>" +
        '<span class="text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0 ' +
        badge.classes +
        '">' +
        badge.label +
        "</span>" +
        "</div>" +
        '<p class="text-xs text-gray-500 mb-2">' +
        task.description +
        "</p>" +
        '<div class="flex items-center justify-between">' +
        '<p class="text-[11px] text-gray-400">' +
        task.meta +
        (task.status === "in_progress" ? " \u2022 " + task.startedAt : "") +
        "</p>" +
        '<button type="button" class="progress-task-view-details text-xs font-medium text-amber-600 hover:underline" data-task-key="' +
        task.key +
        '">View Details</button>' +
        "</div>" +
        "</div>" +
        "</div>"
      );
    }).join("");
  }

  // ---- Activity Timeline (Activity tab) ----

  function progressRenderActivityTimeline() {
    var container = document.getElementById("progress-activity-timeline");
    if (!container) return;

    container.innerHTML = PROGRESS_ACTIVITY_LOG.map(function (entry) {
      return (
        '<div class="flex items-start gap-3">' +
        '<span class="material-symbols-outlined ' +
        entry.color +
        '" style="font-size:18px;">' +
        entry.icon +
        "</span>" +
        '<div class="flex-1">' +
        '<p class="text-xs font-medium text-gray-800">' +
        entry.title +
        "</p>" +
        '<p class="text-[11px] text-gray-400">' +
        entry.desc +
        "</p>" +
        "</div>" +
        '<p class="text-[11px] text-gray-400 whitespace-nowrap">' +
        entry.time +
        "</p>" +
        "</div>"
      );
    }).join("");
  }

  // ---- 4.2: Task Details Screen ----

  function progressGetActiveTask() {
    var key = progressState.activeTaskKey;
    for (var i = 0; i < PROGRESS_TASKS.length; i++) {
      if (PROGRESS_TASKS[i].key === key) return PROGRESS_TASKS[i];
    }
    return null;
  }

  function progressOpenTaskDetails(taskKey) {
    var task = PROGRESS_TASKS.filter(function (t) {
      return t.key === taskKey;
    })[0];
    if (!task) return;
    progressState.activeTaskKey = taskKey;

    var root = document.getElementById("progress-task-details-view");
    if (!root) return;

    var badge =
      PROGRESS_TASK_STATUS_BADGES[task.status] ||
      PROGRESS_TASK_STATUS_BADGES.pending;
    root.querySelector('[data-progress-task-field="title"]').textContent =
      task.title;
    var statusBadgeEl = root.querySelector(
      '[data-progress-task-field="status-badge"]',
    );
    statusBadgeEl.textContent = badge.label;
    statusBadgeEl.className =
      "text-[11px] font-medium px-2.5 py-1 rounded-full " + badge.classes;
    root.querySelector('[data-progress-task-field="description"]').textContent =
      task.description;
    root.querySelector('[data-progress-task-field="started-at"]').textContent =
      task.startedAt;
    root.querySelector('[data-progress-task-field="elapsed"]').textContent =
      task.elapsed;

    // Instructions
    var instructionsList = document.getElementById(
      "progress-task-instructions",
    );
    instructionsList.innerHTML = task.instructions
      .map(function (line) {
        return "<li>" + line + "</li>";
      })
      .join("");
    instructionsList.classList.remove("hidden");
    var toggleBtn = document.querySelector(".progress-toggle-instructions");
    if (toggleBtn) toggleBtn.textContent = "Hide";

    // Checklist
    var checklist = document.getElementById("progress-task-checklist");
    checklist.innerHTML = task.checklist
      .map(function (item, index) {
        var icon = item.done ? "check_box" : "check_box_outline_blank";
        var iconColor = item.done ? "text-emerald-500" : "text-gray-400";
        var statusLabel = item.done
          ? '<span class="text-[11px] font-medium text-emerald-600">Completed</span>'
          : item.photoRequired
            ? '<span class="text-[11px] font-medium text-rose-500">Photo required</span>'
            : '<span class="text-[11px] font-medium text-gray-400">Pending</span>';
        return (
          '<button type="button" class="progress-checklist-item w-full flex items-center justify-between gap-2 border border-gray-100 rounded-lg px-3 py-2 text-left hover:bg-gray-50" data-checklist-index="' +
          index +
          '">' +
          '<span class="flex items-center gap-2 text-xs text-gray-700">' +
          '<span class="material-symbols-outlined ' +
          iconColor +
          '" style="font-size:18px;">' +
          icon +
          "</span>" +
          item.label +
          "</span>" +
          statusLabel +
          "</button>"
        );
      })
      .join("");

    // Reset upload + notes
    document.getElementById("progress-task-photo-list").innerHTML = "";
    var notesEl = document.getElementById("progress-task-notes");
    notesEl.value = "";
    document.getElementById("progress-task-notes-count").textContent =
      "0/500 characters";

    // Show "Job Started Successfully" banner
    var banner = document.getElementById("progress-task-success-banner");
    banner.classList.remove("hidden");
    banner.classList.add("flex");

    progressShowScreen("progress-task-details-view");
  }

  function progressToggleChecklistItem(index) {
    var task = progressGetActiveTask();
    if (!task || !task.checklist[index]) return;
    task.checklist[index].done = !task.checklist[index].done;
    progressOpenTaskDetails(task.key);
  }

  function progressMarkTaskComplete() {
    var task = progressGetActiveTask();
    if (task) task.status = "completed";
    progressRenderTaskList();
    progressShowScreen("progress-job-details-view");
    progressSwitchTab("tasks");
  }

  // ---- 4.3: Modals ----

  // Attached Files Modal
  function progressRenderAttachedFilesModal() {
    var list = document.getElementById("progress-attached-files-list");
    if (!list) return;
    list.innerHTML = PROGRESS_ATTACHED_FILES.map(function (file) {
      return (
        '<div class="flex items-center justify-between text-xs">' +
        '<div class="flex items-center gap-2">' +
        '<span class="material-symbols-outlined text-rose-400" style="font-size:18px;">picture_as_pdf</span>' +
        "<div>" +
        '<p class="font-medium text-gray-700">' +
        file.name +
        "</p>" +
        '<p class="text-[10px] text-gray-400">' +
        file.size +
        " \u2022 " +
        file.by +
        " \u2022 " +
        file.date +
        "</p>" +
        "</div>" +
        "</div>" +
        '<div class="flex gap-2 shrink-0">' +
        '<button type="button" class="border border-gray-200 rounded-md px-2 py-1 text-[11px] text-gray-500 hover:bg-gray-50">Preview</button>' +
        '<button type="button" class="bg-amber-400 rounded-md px-2 py-1 text-[11px] text-white hover:bg-amber-500">Download</button>' +
        "</div>" +
        "</div>"
      );
    }).join("");
  }

  // ---- Cancel Job Modal ----
  // NOTE: the cancellation reason is a single <select> DROPDOWN only -- there
  // is no side-by-side reason list/checklist next to the form. Keep it that
  // way; do not reintroduce a second reason list here.
  function progressPopulateCancelReasons() {
    var select = document.getElementById("progress-cancel-reason-select");
    if (!select) return;

    PROGRESS_CANCEL_REASONS.forEach(function (reason) {
      var option = document.createElement("option");
      option.value = reason;
      option.textContent = reason;
      select.appendChild(option);
    });
  }

  function progressSelectCancelReason(reason) {
    progressState.selectedCancelReason = reason;

    var select = document.getElementById("progress-cancel-reason-select");
    if (select) select.value = reason;
  }

  function progressOpenCancelModal() {
    progressState.selectedCancelReason = "";
    var select = document.getElementById("progress-cancel-reason-select");
    if (select) {
      select.value = "";
      select.classList.remove("ring-2", "ring-rose-300", "border-rose-300");
    }
    var remarks = document.getElementById("progress-cancel-remarks");
    if (remarks) remarks.value = "";
    progressOpenModal("progress-modal-cancel-job");
  }

  function progressKeepJob() {
    progressCloseModal("progress-modal-cancel-job");
  }

  function progressConfirmCancelJob() {
    var select = document.getElementById("progress-cancel-reason-select");
    var reason = (select && select.value) || progressState.selectedCancelReason;

    if (!reason) {
      if (select) {
        select.classList.add("ring-2", "ring-rose-300", "border-rose-300");
        select.focus();
      }
      return;
    }

    var job = progressState.currentJob;
    if (job) {
      job.status = "cancelled";
      job.cancelReason = reason;
    }

    progressCloseModal("progress-modal-cancel-job");
    progressApplyCancelledState(true);
    progressSwitchTab("overview");
    progressShowScreen("progress-job-details-view");

    // Refresh list screen stats
    if (window.FeMyJobs && typeof window.FeMyJobs.refresh === "function") {
      window.FeMyJobs.refresh();
    }
  }

  // Generic Modal Helpers
  function progressOpenModal(modalId) {
    var el = document.getElementById(modalId);
    if (!el) return;
    el.classList.remove("hidden");
    el.classList.add("flex");
  }

  function progressCloseModal(modalId) {
    var el = document.getElementById(modalId);
    if (!el) return;
    el.classList.add("hidden");
    el.classList.remove("flex");
    if (modalId === "progress-modal-cancel-job") {
      var select = document.getElementById("progress-cancel-reason-select");
      if (select)
        select.classList.remove("ring-2", "ring-rose-300", "border-rose-300");
    }
  }

  /* ==========================================================================
     SECTION 5: EVENT BINDING & INIT
     Centralized event delegation for the entire screen
  ========================================================================== */

  function feMyJobsOnViewDetails(jobId) {
    var job = feMyJobsGetJobById(jobId);
    if (!job) return;

    // Route to the appropriate flow based on job status
    if (job.status === "in_progress") {
      progressOpenJobDetails(job);
    } else {
      console.log(
        "fe-my-jobs: view details -> no flow wired up yet for status:",
        job.status,
        job,
      );
    }
  }

  function feMyJobsBindListEvents() {
    // Tabs
    var tabbar = document.getElementById("fe-my-jobs-tabbar");
    if (tabbar) {
      tabbar.addEventListener("click", function (event) {
        var btn = event.target.closest(".fe-my-jobs-tab");
        if (!btn) return;
        feMyJobsSetActiveTab(btn.getAttribute("data-fe-my-jobs-tab"));
      });
    }

    // Search (debounced)
    var searchInput = document.getElementById("fe-my-jobs-search");
    if (searchInput) {
      var debounceTimer = null;
      searchInput.addEventListener("input", function (event) {
        clearTimeout(debounceTimer);
        var value = event.target.value;
        debounceTimer = setTimeout(function () {
          feMyJobsState.searchQuery = value;
          feMyJobsState.currentPage = 1;
          feMyJobsRender();
        }, 200);
      });
    }

    // Pagination
    var prevBtn = document.getElementById("fe-my-jobs-prev-page");
    var nextBtn = document.getElementById("fe-my-jobs-next-page");
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (feMyJobsState.currentPage > 1) {
          feMyJobsState.currentPage -= 1;
          feMyJobsRender();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        feMyJobsState.currentPage += 1;
        feMyJobsRender();
      });
    }

    // Card actions (delegated)
    var grid = document.getElementById("fe-my-jobs-grid");
    if (grid) {
      grid.addEventListener("click", function (event) {
        var viewBtn = event.target.closest(".fe-my-jobs-view-details");
        var invoiceBtn = event.target.closest(".fe-my-jobs-invoice");

        if (viewBtn) {
          feMyJobsOnViewDetails(viewBtn.getAttribute("data-job-id"));
        } else if (invoiceBtn) {
          console.log(
            "fe-my-jobs: generate invoice ->",
            invoiceBtn.getAttribute("data-job-id"),
          );
        }
      });
    }
  }

  function progressBindEvents() {
    document.addEventListener("click", function (event) {
      // ---- Navigation ----
      if (event.target.closest(".progress-back-to-list")) {
        progressShowScreen("fe-my-jobs-page");
        if (window.FeMyJobs && typeof window.FeMyJobs.refresh === "function") {
          window.FeMyJobs.refresh();
        }
        return;
      }
      if (event.target.closest(".progress-back-to-job-details")) {
        progressShowScreen("progress-job-details-view");
        return;
      }

      // ---- Job Details tabs ----
      var tabBtn = event.target.closest(".progress-tab");
      if (tabBtn) {
        progressSwitchTab(tabBtn.getAttribute("data-progress-tab"));
        return;
      }

      // ---- Overview tab: Attached Files popup ----
      if (event.target.closest(".progress-open-attached-files")) {
        progressRenderAttachedFilesModal();
        progressOpenModal("progress-modal-attached-files");
        return;
      }

      // ---- Tasks tab: Special Instructions popup ----
      if (event.target.closest(".progress-open-special-instructions")) {
        progressOpenModal("progress-modal-special-instructions");
        return;
      }

      // ---- Tasks tab: open task detail ----
      var taskViewBtn = event.target.closest(".progress-task-view-details");
      if (taskViewBtn) {
        progressOpenTaskDetails(taskViewBtn.getAttribute("data-task-key"));
        return;
      }

      // ---- Task Details: dismiss success banner ----
      if (event.target.closest(".progress-dismiss-success-banner")) {
        var banner = document.getElementById("progress-task-success-banner");
        banner.classList.add("hidden");
        banner.classList.remove("flex");
        return;
      }

      // ---- Task Details: toggle instructions ----
      if (event.target.closest(".progress-toggle-instructions")) {
        var list = document.getElementById("progress-task-instructions");
        var btn = event.target.closest(".progress-toggle-instructions");
        var nowHidden = list.classList.toggle("hidden");
        btn.textContent = nowHidden ? "Show" : "Hide";
        return;
      }

      // ---- Task Details: toggle checklist ----
      var checklistRow = event.target.closest(".progress-checklist-item");
      if (checklistRow) {
        progressToggleChecklistItem(
          Number(checklistRow.getAttribute("data-checklist-index")),
        );
        return;
      }

      // ---- Task Details: mark task complete ----
      if (event.target.closest(".progress-mark-task-complete")) {
        progressMarkTaskComplete();
        return;
      }

      // ---- Cancel Job: open/close/confirm ----
      if (event.target.closest(".progress-open-cancel-job")) {
        progressOpenCancelModal();
        return;
      }
      if (event.target.closest("#progress-keep-job-btn")) {
        progressKeepJob();
        return;
      }
      if (event.target.closest("#progress-confirm-cancel-btn")) {
        progressConfirmCancelJob();
        return;
      }

      // ---- Generic modal close ----
      var closeBtn = event.target.closest(".progress-close-modal");
      if (closeBtn) {
        progressCloseModal(
          "progress-modal-" + closeBtn.getAttribute("data-progress-modal"),
        );
        return;
      }
      var backdrop = event.target.closest(
        "#progress-modal-attached-files, #progress-modal-special-instructions, #progress-modal-cancel-job",
      );
      if (backdrop && event.target === backdrop) {
        progressCloseModal(backdrop.id);
        return;
      }
    });

    // Cancel Job: dropdown selection
    var reasonSelect = document.getElementById("progress-cancel-reason-select");
    if (reasonSelect) {
      reasonSelect.addEventListener("change", function (event) {
        progressSelectCancelReason(event.target.value);
        // Clear any validation highlight once a reason is picked
        reasonSelect.classList.remove(
          "ring-2",
          "ring-rose-300",
          "border-rose-300",
        );
      });
    }

    // Notes character counter
    var notesEl = document.getElementById("progress-task-notes");
    if (notesEl) {
      notesEl.addEventListener("input", function (event) {
        document.getElementById("progress-task-notes-count").textContent =
          event.target.value.length + "/500 characters";
      });
    }
    var saveNotesBtn = document.getElementById("progress-task-save-notes");
    if (saveNotesBtn) {
      saveNotesBtn.addEventListener("click", function () {
        var task = progressGetActiveTask();
        console.log(
          "fe-my-jobs progress flow: saved notes for",
          task && task.key,
          notesEl.value,
        );
      });
    }

    // Photo upload (cosmetic)
    var photoInput = document.getElementById("progress-task-photo-input");
    if (photoInput) {
      photoInput.addEventListener("change", function (event) {
        var listEl = document.getElementById("progress-task-photo-list");
        var files = Array.prototype.slice.call(event.target.files || []);
        listEl.innerHTML = files
          .map(function (file) {
            return (
              '<li class="flex items-center gap-1"><span class="material-symbols-outlined text-emerald-500" style="font-size:14px;">image</span>' +
              file.name +
              "</li>"
            );
          })
          .join("");
      });
    }
  }

  function feMyJobsInit() {
    if (!document.getElementById("fe-my-jobs-page")) return; // not on this screen

    // Bind list screen events
    feMyJobsBindListEvents();

    // Bind progress flow events
    progressBindEvents();

    // Populate cancel reasons once
    progressPopulateCancelReasons();

    // Initial render
    feMyJobsSetActiveTab(feMyJobsState.activeTab);
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", feMyJobsInit);
  } else {
    feMyJobsInit();
  }

  // Public API for other scripts/screens
  window.FeMyJobs = {
    refresh: feMyJobsRender,
    setTab: feMyJobsSetActiveTab,
    data: feMyJobsData,
    // Progress flow access (so future flows can call into it if needed)
    progress: {
      open: progressOpenJobDetails,
      openTask: progressOpenTaskDetails,
    },
  };
})();
