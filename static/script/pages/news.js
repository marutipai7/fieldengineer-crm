const mockNewsArticles = [
    {
        id: 1,
        title: "FE Launches Enterprise AI Dispatching Engine for Global Service Orchestration",
        category: "Product Updates",
        badgeColorClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
        date: "July 29, 2026",
        readTime: "4 min read",
        author: "FE Product Team",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        authorBio: "Dedicated to building next-generation dispatching intelligence and field service operational frameworks for international teams.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        summary: "Introducing our new AI-driven dispatch system designed to reduce engineer matching times by 75% for enterprise field projects.",
        featured: true,
        trending: true,
        views: "1,240",
        tags: ["AI", "Enterprise", "Dispatching"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    Authoritatively pontificate synergistic total linkage and pandemic metrics. Assertively initiate interactive architectures with end-to-end meta-services. Conveniently build standardized schemas without technically sound architectures.
                </p>
                <p class="mb-6">
                    Fingerstache YOLO cred single-origin coffee Shoreditch. Flannel Shoreditch try-hard, milksh forage Godard jean shorts quinoa church-key bitters actually small batch bicycle rights trust fund. Cold-pressed milksh cray pop-up, sriracha organic mixtape authentic Etsy artisan scenester leggings. Direct trade Brooklyn selvage four loko squid organic. Twee typewriter gastropub polaroid cardigan migas, post-ironic yr shabby chic wolf.
                </p>
                <div class="article-blockquote my-8">
                    "Fashion axe VHS biodiesel try-hard, before they sold out Thundercats stumptown deep v crucifix distillery. Fixie meditation ennui synth disrupt. Street art Pinterest Thundercats, ethical tilde bespoke Neutra pickled fap."
                </div>
                <p class="mb-6">
                    Plaid YOLO 8-bit fanny pack, cred Shoreditch synth try-hard bitters sartorial blog listicle Pinterest asymmetrical aesthetic. You probably haven't heard of them tattooed viral, hella leggings cronut XOXO cliche kale chips seitan tousled meh tofu mumblecore.
                </p>
                <p class="mb-6">
                    Slow-carb viral Austin, direct trade cray lomo cold-pressed raw denim. Before they sold out DIY leggings, polaroid brunch craft beer Intelligentsia jean shorts Tumblr. Biodiesel tattooed Bushwick yr bitters forage.
                </p>
            `
    },
    {
        id: 2,
        title: "Why 5G Deployment Relies on Smart Dispatching of Telecom Field Services",
        category: "Tech & Innovation",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
        date: "July 27, 2026",
        readTime: "5 min read",
        author: "Marcus Sterling",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        authorBio: "Marcus is an industry veteran specializing in telecommunication networking infrastructure and 5G deployment strategies.",
        image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=800&q=80",
        summary: "As 5G towers expand globally, on-demand field engineers are critical to maintaining SLA standards and minimizing network downtime.",
        featured: true,
        trending: true,
        views: "982",
        tags: ["5G", "Telecom", "Infrastructure"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    Assertively initiate interactive architectures with end-to-end meta-services. Intrinsically reinvent principle-centered value with top-line information. Conveniently harness functional schemas rather than client-centric paradigms.
                </p>
                <p class="mb-6">
                    Street art Pinterest Thundercats, ethical tilde bespoke Neutra pickled fap. Fingerstache YOLO cred single-origin coffee Shoreditch. Flannel Shoreditch try-hard, milksh forage Godard jean shorts quinoa church-key bitters actually small batch bicycle rights trust fund.
                </p>
                <div class="article-blockquote my-8">
                    "Smart dispatching algorithms pair the closest certified technicians with real-time hardware status updates, cutting down 5G site activation latency significantly."
                </div>
                <p class="mb-6">
                    Plaid YOLO 8-bit fanny pack, cred Shoreditch synth try-hard bitters. Slow-carb viral Austin, direct trade cray lomo cold-pressed raw denim. Before they sold out DIY leggings, polaroid brunch craft beer Intelligentsia jean shorts.
                </p>
            `
    },
    {
        id: 3,
        title: "Case Study: How a Leading Fiber Provider Scaled Across 15 States in 30 Days",
        category: "Case Study",
        badgeColorClass: "bg-amber-100 text-amber-800 border-amber-200",
        date: "July 25, 2026",
        readTime: "6 min read",
        author: "Alisha Vance",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        authorBio: "Alisha is a Senior Operations Director specializing in rapid corporate infrastructure expansion and field vendor logistics.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        summary: "Using FieldEngineer's automated workforce management, a Tier-1 fiber provider deployed 200+ engineers rapidly to hit tight roll-out deadlines.",
        featured: true,
        trending: false,
        views: "812",
        tags: ["Fiber", "Operations", "CaseStudy"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    Conveniently build standardized schemas without technically sound architectures. Intrinsically reinvent principle-centered value with top-line information.
                </p>
                <p class="mb-6">
                    Cold-pressed milksh cray pop-up, sriracha organic mixtape authentic Etsy artisan scenester leggings. Direct trade Brooklyn selvage four loko squid organic. Twee typewriter gastropub polaroid cardigan migas, post-ironic yr shabby.
                </p>
                <div class="article-blockquote my-8">
                    "Leveraging FieldEngineer's pre-vetted technician marketplace allowed us to launch multi-state deployments in parallel without sacrificing SLA quality."
                </div>
                <p class="mb-6">
                    Tote bag drinking vinegar art party, lo-fi Intelligentsia small batch umami Vice pug flannel authentic literally. Cronut messenger bag quinoa Etsy Marfa. Slow-carb viral Austin, direct trade.
                </p>
            `
    },
    {
        id: 4,
        title: "A Guide to Standard Operating Procedures for Off-Grid Telecom Sites",
        category: "Field Service Tips",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
        date: "July 22, 2026",
        readTime: "4 min read",
        author: "Lisa Scholfield",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
        authorBio: "Lisa Scholfield is a systems specialist with deep knowledge in off-grid field support, microwave backhauls, and solar telecom sites.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
        summary: "Key maintenance checklists, safety precautions, and site documentation tips for field engineers operating in remote regions.",
        featured: false,
        trending: false,
        views: "643",
        tags: ["StandardOperatingProcedures", "Safety", "FieldTips"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    Objectively myocordinate top-line processes whereas next-generation human capital. Quickly customize collaborative niche markets through functionalized "outside the box" thinking.
                </p>
                <p class="mb-6">
                    Standard operating procedures (SOPs) are critical when engineers are deployed to remote, off-grid locations. This includes solar panels checks, battery cell diagnostics, diesel generator fuel metrics, and secure access clearances.
                </p>
                <div class="article-blockquote my-8">
                    "Safety is paramount. Off-grid site engineers must verify communication uplinks and document backup power sequences before executing antenna maintenance."
                </div>
                <p class="mb-6">
                    Conveniently harness functional schemas rather than client-centric paradigms. Fingerstache YOLO cred single-origin coffee Shoreditch. Flannel Shoreditch try-hard, milksh forage Godard jean shorts quinoa.
                </p>
            `
    },
    {
        id: 5,
        title: "How IoT Device Proliferation is Driving the Need for Smart Tech Dispatching",
        category: "Tech & Innovation",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
        date: "July 18, 2026",
        readTime: "5 min read",
        author: "Marcus Sterling",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        authorBio: "Marcus is an industry veteran specializing in telecommunication networking infrastructure and 5G deployment strategies.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        summary: "With billions of connected devices, on-site diagnostics and field maintenance require a highly versatile, certified technician base.",
        featured: false,
        trending: true,
        views: "870",
        tags: ["IoT", "SmartTech", "Innovation"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    With billions of connected IoT nodes worldwide, physical maintenance and device troubleshooting are scaling at exponential rates.
                </p>
                <p class="mb-6">
                    From smart meter deployments to industrial sensor grids, field tech services must leverage advanced routing metrics to match technicians with specific sensor certificates.
                </p>
                <div class="article-blockquote my-8">
                    "IoT troubleshooting is not generic; it requires localized certifications, firmware configurations, and secure hardware interfaces."
                </div>
                <p class="mb-6">
                    Fingerstache YOLO cred single-origin coffee Shoreditch. Flannel Shoreditch try-hard, milksh forage Godard jean shorts.
                </p>
            `
    },
    {
        id: 6,
        title: "Introducing FE Certified: Advanced Certification Badging for Field Engineers",
        category: "Company News",
        badgeColorClass: "bg-cyan-100 text-cyan-800 border-cyan-200",
        date: "July 15, 2026",
        readTime: "3 min read",
        author: "FE Support Team",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        authorBio: "Dedicated to building next-generation dispatching intelligence and field service operational frameworks for international teams.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
        summary: "We are introducing credential verification badges to help customers select pre-vetted engineers with specialized Cisco, Nokia, or Juniper skills.",
        featured: false,
        trending: false,
        views: "520",
        tags: ["CompanyNews", "Certification", "Verification"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    Today, we are announcing FE Certified, a new verified skills initiative built to reward top field engineering specialists.
                </p>
                <p class="mb-6">
                    Field engineers can now upload active credentials from key networking vendors like Cisco, Juniper, Nokia, and Huawei. Once validated, these badges display directly on their profiles for recruiters to verify instantly.
                </p>
                <div class="article-blockquote my-8">
                    "FE Certified ensures transparency, helping operators hire qualified field specialists matching complex engineering requirements."
                </div>
            `
    },
    {
        id: 7,
        title: "Navigating Cybersecurity Compliance in On-Site IT and Telecom Implementations",
        category: "Company News",
        badgeColorClass: "bg-cyan-100 text-cyan-800 border-cyan-200",
        date: "July 12, 2026",
        readTime: "4 min read",
        author: "Alisha Vance",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        authorBio: "Alisha is a Senior Operations Director specializing in rapid corporate infrastructure expansion and field vendor logistics.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
        summary: "How field service operations must align with ISO 27001 and NIST frameworks when working in secure enterprise data centers.",
        featured: false,
        trending: true,
        views: "790",
        tags: ["Cybersecurity", "Compliance", "IT"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    On-site hardware setups must align with zero-trust policies and localized cybersecurity frameworks.
                </p>
                <p class="mb-6">
                    FieldEngineers are trained in standard access protocols, secure cabling procedures, offline network resets, and secure console logins to guarantee complete facility safety.
                </p>
                <div class="article-blockquote my-8">
                    "Field engineering compliance is the final mile of corporate network security operations."
                </div>
            `
    },
    {
        id: 8,
        title: "The Role of Freelance Engineers in Bridging the Rural Broadband Gap",
        category: "Case Study",
        badgeColorClass: "bg-amber-100 text-amber-800 border-amber-200",
        date: "July 08, 2026",
        readTime: "5 min read",
        author: "FE Support Team",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        authorBio: "Dedicated to building next-generation dispatching intelligence and field service operational frameworks for international teams.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        summary: "How community network operators are leveraging freelance field engineers to install high-speed wireless networks in underserved counties.",
        featured: false,
        trending: false,
        views: "480",
        tags: ["Broadband", "Rural", "CaseStudy"],
        content: `
                <p class="font-extrabold text-slate-800 text-lg leading-relaxed mb-6">
                    Rural broadband rollouts require localized, agile dispatching structures to support remote wireless backhauls.
                </p>
                <p class="mb-6">
                    By contracting local freelance technicians through FieldEngineer, community broadband suppliers are skipping typical logistics overheads and deploying internet directly to households weeks ahead of schedule.
                </p>
                <div class="article-blockquote my-8">
                    "On-demand dispatch of local talent is key to closing county connectivity gaps efficiently."
                </div>
            `
    }
];

// State Variables for rendering & filtering
let currentCategory = 'All';
let searchQuery = '';
let visibleCount = 6;

// Elements cache
const feedContainer = document.getElementById('articles-feed-container');
const emptyState = document.getElementById('feed-empty-state');
const loadMoreSection = document.getElementById('load-more-section');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreSpinner = document.getElementById('load-more-spinner');
const searchInput = document.getElementById('news-search');
const resultsCountEl = document.getElementById('results-count');

// 1. Initial Launch
document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    renderTrendingWidget();
});

// 2. Render Article Cards
function renderArticles(isLoadMore = false) {
    // Filter elements based on State (Category + Search query)
    const filtered = mockNewsArticles.filter(art => {
        const matchesCategory = (currentCategory === 'All') || (art.category === currentCategory);
        const matchesSearch = !searchQuery ||
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Update statistics label
    resultsCountEl.innerText = `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length} article${filtered.length === 1 ? '' : 's'}`;

    // Toggle empty state
    if (filtered.length === 0) {
        feedContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        loadMoreSection.classList.add('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    // Check if more button should show (hide entire section if no articles available to load)
    if (filtered.length <= visibleCount) {
        loadMoreSection.classList.add('hidden');
    } else {
        loadMoreSection.classList.remove('hidden');
        loadMoreBtn.classList.remove('hidden');
        loadMoreSpinner.classList.add('hidden');
    }

    // Slice for visible count
    const visibleArticles = filtered.slice(0, visibleCount);

    // Setup Grid layout classes dynamically
    feedContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300';

    let html = '';
    visibleArticles.forEach(art => {
        html += `
            <div class="fade-in-enter gridlove-card group cursor-pointer" onclick="showArticleDetail(${art.id})">
                <div class="gridlove-image-container h-48 md:h-52">
                    <img src="${art.image}" alt="${art.title}" class="gridlove-img">
                    <span class="absolute bottom-3 left-3 bg-slate-900/85 text-white font-bold text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-lg z-10">
                        ${art.category}
                    </span>
                </div>
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-2 text-slate-400 text-[11px] mb-2 font-medium">
                            <span class="flex items-center gap-0.5"><span class="material-symbols-outlined text-[14px]">schedule</span> ${art.readTime}</span>
                            <span>&bull;</span>
                            <span>${art.date}</span>
                        </div>
                        <h4 class="font-extrabold text-slate-800 text-md leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 mb-2">
                            ${art.title}
                        </h4>
                        <p class="text-slate-500 text-xs md:text-sm line-clamp-3 leading-relaxed mb-4">
                            ${art.summary}
                        </p>
                    </div>
                    <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span class="text-xs text-slate-400">By ${art.author}</span>
                        <span class="text-[var(--color-primary)] font-bold text-xs inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read Article <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </span>
                    </div>
                </div>
            </div>
            `;
    });

    feedContainer.innerHTML = html;

    // Apply dynamic animation delays
    setTimeout(() => {
        const elements = feedContainer.querySelectorAll('.fade-in-enter');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in-active');
            }, index * 40);
        });
    }, 10);
}

// 3. Category Filter selection Handler
window.filterCategory = function (category, buttonElement) {
    currentCategory = category;
    visibleCount = 6; // Reset visible count on filter switch

    // Update active tab visuals
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.className = "category-tab px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap text-slate-600 hover:bg-slate-100 hover:text-slate-900";
    });

    if (buttonElement) {
        buttonElement.className = "category-tab px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap bg-[var(--color-primary)] text-white";
    }

    renderArticles();
};

// 4. Search Handler
window.handleSearch = function (value) {
    searchQuery = value.trim();
    visibleCount = 6;
    renderArticles();
};

// Trigger Search (Button click)
window.triggerSearch = function () {
    renderArticles();
    // Scroll page down to content container if needed
    const filterSection = document.getElementById('results-count');
    filterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// 5. Simulate Load More action
window.loadMoreArticles = function () {
    loadMoreBtn.classList.add('hidden');
    loadMoreSpinner.classList.remove('hidden');

    // Simulate network call
    setTimeout(() => {
        visibleCount += 4;
        loadMoreSpinner.classList.add('hidden');
        renderArticles(true);
    }, 600);
};

// 6. Reset Filters helper
window.resetFilters = function () {
    searchInput.value = '';
    searchQuery = '';
    currentCategory = 'All';
    visibleCount = 6;

    // Reset tabs
    const firstTab = document.querySelector('.category-tab');
    if (firstTab) filterCategory('All', firstTab);
};

// 7. Render Trending widget list (sidebar)
function renderTrendingWidget() {
    const container = document.getElementById('trending-container');
    const trending = mockNewsArticles.filter(a => a.trending).slice(0, 4);

    let html = '';
    trending.forEach((art, index) => {
        html += `
            <div class="blog-popular-item flex items-start gap-3 group cursor-pointer" onclick="showArticleDetail(${art.id})">
                <span class="blog-popular-rank shrink-0">0${index + 1}</span>
                <div class="blog-popular-content min-w-0">
                    <h5 class="blog-popular-title text-sm font-semibold text-slate-800 leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                        ${art.title}
                    </h5>
                    <time class="text-xs text-slate-400 mt-1 block">${art.date} &bull; ${art.readTime}</time>
                </div>
            </div>
            `;
    });
    container.innerHTML = html;
}

// 8. Sidebar Newsletter Subscription Handler
window.handleSubscribe = function (event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input');
    const email = emailInput.value.trim();

    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
    }
};

// ======================================================================
// ====================== 10. NEWS DETAIL VIEW LOGIC ====================
// ======================================================================

window.showArticleDetail = function (id) {
    const art = mockNewsArticles.find(a => a.id === id);
    if (!art) return;

    // Hide Feed, Show Detail
    document.getElementById('news-feed-view').classList.add('hidden');
    const detailView = document.getElementById('news-detail-view');
    detailView.classList.remove('hidden');

    // Scroll to top instantly
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Populate detail fields
    document.getElementById('detail-cover-img').src = art.image;
    document.getElementById('detail-cover-img').alt = art.title;
    document.getElementById('detail-breadcrumb-title').innerText = art.title;
    document.getElementById('detail-title').innerText = art.title;
    document.getElementById('detail-author-avatar').src = art.authorAvatar;
    document.getElementById('detail-author-name').innerText = art.author;
    document.getElementById('detail-date').innerText = art.date;
    document.getElementById('detail-read-time').innerText = art.readTime;
    document.getElementById('detail-body-content').innerHTML = art.content;

    // Author bio box
    document.getElementById('detail-author-bio-avatar').src = art.authorAvatar;
    document.getElementById('detail-author-bio-name').innerText = art.author;
    document.getElementById('detail-author-bio-text').innerText = art.authorBio;

    // Populate category badge
    const catContainer = document.getElementById('detail-category-container');
    catContainer.innerHTML = `
            <span class="gridlove-category-badge border ${art.badgeColorClass}">
                ${art.category}
            </span>
        `;

    // Populate tags
    let tagsHtml = '';
    if (art.tags && art.tags.length > 0) {
        art.tags.forEach(t => {
            tagsHtml += `
                    <span class="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer">
                        #${t.toLowerCase()}
                    </span>
                `;
        });
    }
    document.getElementById('detail-tags-container').innerHTML = tagsHtml;

    // Pagination navigation
    const currentIndex = mockNewsArticles.findIndex(a => a.id === id);
    const prevArticle = currentIndex > 0 ? mockNewsArticles[currentIndex - 1] : null;
    const nextArticle = currentIndex < mockNewsArticles.length - 1 ? mockNewsArticles[currentIndex + 1] : null;

    const prevLink = document.getElementById('detail-prev-link');
    const prevTitle = document.getElementById('detail-prev-title');
    if (prevArticle) {
        prevLink.classList.remove('opacity-40', 'pointer-events-none');
        prevLink.onclick = () => showArticleDetail(prevArticle.id);
        prevTitle.innerText = prevArticle.title;
    } else {
        prevLink.classList.add('opacity-40', 'pointer-events-none');
        prevTitle.innerText = "First Article";
    }

    const nextLink = document.getElementById('detail-next-link');
    const nextTitle = document.getElementById('detail-next-title');
    if (nextArticle) {
        nextLink.classList.remove('opacity-40', 'pointer-events-none');
        nextLink.onclick = () => showArticleDetail(nextArticle.id);
        nextTitle.innerText = nextArticle.title;
    } else {
        nextLink.classList.add('opacity-40', 'pointer-events-none');
        nextTitle.innerText = "Last Article";
    }

    // Render widgets in detail view
    renderDetailTopics();
    renderDetailRecent(id);
};

window.showFeedView = function () {
    document.getElementById('news-detail-view').classList.add('hidden');
    document.getElementById('news-feed-view').classList.remove('hidden');
    // Scroll to grid filters
    const filterSection = document.getElementById('results-count');
    if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

function renderDetailTopics() {
    const container = document.getElementById('detail-topics-list');
    const counts = {};
    mockNewsArticles.forEach(a => {
        counts[a.category] = (counts[a.category] || 0) + 1;
    });

    // Color circles exactly like in user's layout image
    const colors = {
        'Product Updates': 'bg-red-500',
        'Tech & Innovation': 'bg-orange-500',
        'Case Study': 'bg-emerald-500',
        'Field Service Tips': 'bg-sky-500',
        'Company News': 'bg-purple-500'
    };

    let html = '';
    for (const cat in counts) {
        const circleColor = colors[cat] || 'bg-slate-500';
        html += `
            <li class="flex items-center justify-between border-b border-slate-100 pb-2.5 pt-1 text-slate-600 font-semibold hover:text-[var(--color-primary)] transition-colors cursor-pointer" onclick="filterByTopicFromDetail('${cat}')">
                <span>${cat}</span>
                <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${circleColor}">
                    ${counts[cat]}
                </span>
            </li>
            `;
    }
    container.innerHTML = html;
}

function renderDetailRecent(excludeId) {
    const container = document.getElementById('detail-recent-container');
    // Filter out current active post and grab 3 posts
    const recent = mockNewsArticles.filter(a => a.id !== excludeId).slice(0, 3);

    let html = '';
    recent.forEach(art => {
        html += `
            <div class="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0 cursor-pointer group" onclick="showArticleDetail(${art.id})">
                <div class="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <img src="${art.image}" alt="${art.title}" class="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="min-w-0 flex-1">
                    <h5 class="text-xs font-bold text-slate-800 leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                        ${art.title}
                    </h5>
                </div>
            </div>
            `;
    });
    container.innerHTML = html;
}

window.filterByTopicFromDetail = function (category) {
    showFeedView();
    // Scroll and filter tabs
    const tabBtns = document.querySelectorAll('.category-tab');
    tabBtns.forEach(btn => {
        if (btn.innerText.trim().toLowerCase() === category.toLowerCase() || (category === 'All' && btn.innerText.trim().toLowerCase() === 'all news')) {
            btn.click();
        }
    });
};