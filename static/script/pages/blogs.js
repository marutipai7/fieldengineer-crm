document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('blog-page');
  if (!root) return;

  initBlogPage(root);
});

const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Articles' },
  { id: 'industry-insights', label: 'Industry Insights', icon: 'bar_chart' },
  { id: 'field-operations', label: 'Field Operations', icon: 'engineering' },
  { id: 'technology', label: 'Technology', icon: 'memory' },
  { id: 'leadership', label: 'Leadership', icon: 'groups' },
  { id: 'customer-stories', label: 'Customer Stories', icon: 'star' },
];

const BLOG_POSTS = [
  {
    id: 1,
    slug: 'future-of-field-operations-2025',
    title: 'The Future of Field Operations: Trends Shaping 2025 and Beyond',
    excerpt: 'Explore how AI-driven reporting, real-time tracking, and digital work logs are transforming enterprise field operations across India and beyond.',
    category: 'industry-insights',
    categoryLabel: 'Industry Insights',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'May 15, 2025',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    slug: 'real-time-tracking-enterprise',
    title: 'Why Real-Time Tracking is Critical for Enterprise Projects',
    excerpt: 'Learn how live GPS tracking and job status updates reduce delays, improve accountability, and boost SLA compliance on large-scale deployments.',
    category: 'field-operations',
    categoryLabel: 'Field Operations',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'May 10, 2025',
    readTime: '6 min read',
  },
  {
    id: 3,
    slug: 'digital-work-logs-compliance',
    title: 'Digital Work Logs: The New Standard for Field Compliance',
    excerpt: 'Paper-based reporting is fading fast. Discover why digital work logs are becoming mandatory for enterprise infrastructure projects.',
    category: 'technology',
    categoryLabel: 'Technology',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'May 5, 2025',
    readTime: '5 min read',
  },
  {
    id: 4,
    slug: 'scaling-field-workforce-india',
    title: 'Scaling Your Field Workforce Across 120+ Indian Cities',
    excerpt: 'A practical guide to deploying certified engineers at scale while maintaining quality, safety, and cost efficiency nationwide.',
    category: 'leadership',
    categoryLabel: 'Leadership',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Apr 28, 2025',
    readTime: '7 min read',
  },
  {
    id: 5,
    slug: 'vendor-partnership-success',
    title: 'How a Leading ISP Cut Deployment Time by 40% with FE Vendors',
    excerpt: 'A customer story on how verified vendor partnerships and centralized dispatch accelerated fibre rollout across metro regions.',
    category: 'customer-stories',
    categoryLabel: 'Customer Stories',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Apr 22, 2025',
    readTime: '6 min read',
  },
  {
    id: 6,
    slug: 'smart-hands-data-centers',
    title: 'Smart Hands in Data Centers: What Enterprise Teams Need to Know',
    excerpt: 'From rack installations to remote hands support — best practices for managing critical infrastructure with on-site expertise.',
    category: 'field-operations',
    categoryLabel: 'Field Operations',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Apr 18, 2025',
    readTime: '5 min read',
  },
  {
    id: 7,
    slug: 'ai-reporting-field-ops',
    title: 'AI-Powered Reporting: Reducing Admin Overhead in Field Ops',
    excerpt: 'Automated summaries, anomaly detection, and predictive scheduling — how AI is cutting admin time for operations managers.',
    category: 'technology',
    categoryLabel: 'Technology',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Apr 12, 2025',
    readTime: '7 min read',
  },
  {
    id: 8,
    slug: 'sla-management-best-practices',
    title: 'SLA Management Best Practices for Infrastructure Projects',
    excerpt: 'Hitting 99%+ SLA success requires more than tracking — learn the frameworks top enterprises use to measure and improve outcomes.',
    category: 'industry-insights',
    categoryLabel: 'Industry Insights',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Apr 5, 2025',
    readTime: '8 min read',
  },
  {
    id: 9,
    slug: 'building-resilient-field-teams',
    title: 'Building Resilient Field Teams in a Distributed Economy',
    excerpt: 'Leadership insights on hiring, training, and retaining certified engineers in competitive infrastructure markets.',
    category: 'leadership',
    categoryLabel: 'Leadership',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Mar 30, 2025',
    readTime: '6 min read',
  },
  {
    id: 10,
    slug: 'enterprise-cctv-rollouts',
    title: 'Enterprise CCTV Rollouts: Lessons from 500+ Site Deployments',
    excerpt: 'Customer story highlighting how standardized workflows and verified engineers accelerated security infrastructure projects.',
    category: 'customer-stories',
    categoryLabel: 'Customer Stories',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Mar 24, 2025',
    readTime: '5 min read',
  },
  {
    id: 11,
    slug: 'network-cabling-at-scale',
    title: 'Network Cabling at Scale: Quality Control Across Multiple Sites',
    excerpt: 'Field operations playbook for maintaining cabling standards when deploying across dozens of locations simultaneously.',
    category: 'field-operations',
    categoryLabel: 'Field Operations',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Mar 18, 2025',
    readTime: '6 min read',
  },
  {
    id: 12,
    slug: 'infrastructure-workforce-2025',
    title: 'The Infrastructure Workforce Shift: Skills for 2025',
    excerpt: 'Industry analysis on emerging skill requirements for field engineers as networks, cloud, and edge computing converge.',
    category: 'industry-insights',
    categoryLabel: 'Industry Insights',
    image: '',
    author: 'Field Engineer Team',
    authorInitials: 'FE',
    date: 'Mar 10, 2025',
    readTime: '7 min read',
  },
];

const POSTS_PER_PAGE = 6;

function initBlogPage(root) {
  const staticBase = root.dataset.staticBase || '';

  const state = {
    category: 'all',
    search: '',
    page: 1,
  };

  const els = {
    tabs: root.querySelector('[data-blog-tabs]'),
    featured: root.querySelector('[data-blog-featured]'),
    grid: root.querySelector('[data-blog-grid]'),
    pagination: root.querySelector('[data-blog-pagination]'),
    sidebarCategories: root.querySelector('[data-blog-sidebar-categories]'),
    sidebarPopular: root.querySelector('[data-blog-sidebar-popular]'),
    searchForm: root.querySelector('[data-blog-search-form]'),
    searchInput: root.querySelector('[data-blog-search-input]'),
    newsletterForm: root.querySelector('[data-blog-newsletter-form]'),
  };

  renderTabs(els.tabs, state, (category) => {
    state.category = category;
    state.page = 1;
    renderAll();
  });

  renderSidebarCategories(els.sidebarCategories, (category) => {
    state.category = category;
    state.page = 1;
    renderAll();
    els.tabs?.querySelector(`[data-category="${category}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center' });
  });

  renderSidebarPopular(els.sidebarPopular, staticBase);

  els.searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    state.search = els.searchInput?.value.trim() || '';
    state.page = 1;
    renderAll();
  });

  els.searchInput?.addEventListener('input', () => {
    if (!els.searchInput.value.trim() && state.search) {
      state.search = '';
      state.page = 1;
      renderAll();
    }
  });

  els.newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = els.newsletterForm.querySelector('input[type="email"]');
    if (emailInput?.value.trim()) {
      emailInput.value = '';
      els.newsletterForm.classList.add('is-submitted');
      setTimeout(() => els.newsletterForm.classList.remove('is-submitted'), 3000);
    }
  });

  function renderAll() {
    const filtered = getFilteredPosts(state);
    const featuredPost = filtered.find((post) => post.featured) || filtered[0] || null;
    const gridPosts = filtered.filter((post) => post.id !== featuredPost?.id);
    const totalPages = Math.max(1, Math.ceil(gridPosts.length / POSTS_PER_PAGE));
    if (state.page > totalPages) state.page = totalPages;

    const pageStart = (state.page - 1) * POSTS_PER_PAGE;
    const pagePosts = gridPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

    updateTabs(els.tabs, state.category);
    renderFeatured(els.featured, featuredPost, staticBase);
    renderGrid(els.grid, pagePosts, staticBase);
    renderPagination(els.pagination, state, totalPages, (page) => {
      state.page = page;
      renderAll();
      root.querySelector('[data-blog-content]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    updateSidebarCategories(els.sidebarCategories, state.category);
  }

  renderAll();
}

function getFilteredPosts(state) {
  const query = state.search.toLowerCase();

  return BLOG_POSTS.filter((post) => {
    const matchesCategory = state.category === 'all' || post.category === state.category;
    const matchesSearch = !query || [
      post.title,
      post.excerpt,
      post.categoryLabel,
      post.author,
    ].some((text) => text.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });
}

function getCategoryCount(categoryId) {
  if (categoryId === 'all') return BLOG_POSTS.length;
  return BLOG_POSTS.filter((post) => post.category === categoryId).length;
}

function renderTabs(container, state, onSelect) {
  if (!container) return;

  container.innerHTML = BLOG_CATEGORIES.map((cat) => `
    <button
      type="button"
      class="blog-tab${state.category === cat.id ? ' is-active' : ''}"
      data-category="${cat.id}"
      aria-current="${state.category === cat.id ? 'true' : 'false'}"
    >${cat.label}</button>
  `).join('');

  container.querySelectorAll('[data-category]').forEach((btn) => {
    btn.addEventListener('click', () => onSelect(btn.dataset.category));
  });
}

function updateTabs(container, activeCategory) {
  if (!container) return;

  container.querySelectorAll('[data-category]').forEach((btn) => {
    const isActive = btn.dataset.category === activeCategory;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function imgSrc(staticBase, image) {
  return `${staticBase}${image}`;
}

function renderFeatured(container, post, staticBase) {
  if (!container) return;

  if (!post) {
    container.hidden = true;
    container.innerHTML = '';
    return;
  }

  container.hidden = false;
  container.innerHTML = `
    <a href="#" class="blog-featured-card" aria-label="${escapeHtml(post.title)}">
      <div class="blog-featured-media">
        <img src="${imgSrc(staticBase, post.image)}" alt="blog featured" loading="lazy">
      </div>
      <div class="blog-featured-body">
        <span class="blog-badge blog-badge--featured">Featured</span>
        <p class="blog-card-category">${escapeHtml(post.categoryLabel)}</p>
        <h2 class="blog-featured-title">${escapeHtml(post.title)}</h2>
        <p class="blog-featured-excerpt">${escapeHtml(post.excerpt)}</p>
        <div class="blog-card-meta blog-card-meta--featured">
          <span class="blog-author-avatar">${escapeHtml(post.authorInitials)}</span>
          <span class="blog-author-name">${escapeHtml(post.author)}</span>
          <span class="blog-meta-dot" aria-hidden="true"></span>
          <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
          <span class="blog-meta-dot" aria-hidden="true"></span>
          <span>${escapeHtml(post.readTime)}</span>
        </div>
      </div>
    </a>
  `;
}

function renderGrid(container, posts, staticBase) {
  if (!container) return;

  if (!posts.length) {
    container.innerHTML = `
      <div class="blog-empty" role="status">
        <span class="material-symbols-outlined">article</span>
        <p>No articles found. Try a different search or category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = posts.map((post) => `
    <article class="blog-card">
      <a href="#" class="blog-card-link" aria-label="${escapeHtml(post.title)}">
        <div class="blog-card-media">
          <img src="${imgSrc(staticBase, post.image)}" alt="blog card link image" loading="lazy">
        </div>
        <div class="blog-card-body">
          <p class="blog-card-category">${escapeHtml(post.categoryLabel)}</p>
          <h3 class="blog-card-title">${escapeHtml(post.title)}</h3>
          <p class="blog-card-excerpt">${escapeHtml(post.excerpt)}</p>
          <div class="blog-card-footer">
            <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
            <span class="blog-meta-dot" aria-hidden="true"></span>
            <span>${escapeHtml(post.readTime)}</span>
            <span class="blog-card-arrow material-symbols-outlined" aria-hidden="true">arrow_forward</span>
          </div>
        </div>
      </a>
    </article>
  `).join('');
}

function renderPagination(container, state, totalPages, onPageChange) {
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    container.hidden = true;
    return;
  }

  container.hidden = false;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  container.innerHTML = `
    <button type="button" class="blog-page-btn blog-page-btn--nav" data-page="prev" ${state.page === 1 ? 'disabled' : ''}>Prev</button>
    ${pages.map((page) => `
      <button
        type="button"
        class="blog-page-btn${state.page === page ? ' is-active' : ''}"
        data-page="${page}"
        aria-current="${state.page === page ? 'page' : 'false'}"
      >${page}</button>
    `).join('')}
    <button type="button" class="blog-page-btn blog-page-btn--nav" data-page="next" ${state.page === totalPages ? 'disabled' : ''}>Next</button>
  `;

  container.querySelectorAll('[data-page]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.page;
      if (target === 'prev' && state.page > 1) onPageChange(state.page - 1);
      else if (target === 'next' && state.page < totalPages) onPageChange(state.page + 1);
      else if (target !== 'prev' && target !== 'next') onPageChange(Number(target));
    });
  });
}

function renderSidebarCategories(container, onSelect) {
  if (!container) return;

  const sidebarCats = BLOG_CATEGORIES.filter((cat) => cat.id !== 'all');

  container.innerHTML = `
    <div class="blog-sidebar-block">
      <h2 class="blog-sidebar-title">Categories</h2>
      <ul class="blog-sidebar-categories">
        ${sidebarCats.map((cat) => `
          <li>
            <button type="button" class="blog-sidebar-category" data-sidebar-category="${cat.id}">
              <span class="blog-sidebar-category-icon">
                <span class="material-symbols-outlined">${cat.icon}</span>
              </span>
              <span class="blog-sidebar-category-label">${cat.label}</span>
              <span class="blog-sidebar-category-count">(${getCategoryCount(cat.id)})</span>
            </button>
          </li>
        `).join('')}
      </ul>
    </div>
  `;

  container.querySelectorAll('[data-sidebar-category]').forEach((btn) => {
    btn.addEventListener('click', () => onSelect(btn.dataset.sidebarCategory));
  });
}

function updateSidebarCategories(container, activeCategory) {
  if (!container) return;

  container.querySelectorAll('[data-sidebar-category]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.sidebarCategory === activeCategory);
  });
}

function renderSidebarPopular(container, staticBase) {
  if (!container) return;

  const popular = [...BLOG_POSTS]
    .filter((post) => !post.featured)
    .slice(0, 5);

  container.innerHTML = `
    <div class="blog-sidebar-block">
      <h2 class="blog-sidebar-title">Popular Articles</h2>
      <ol class="blog-popular-list">
        ${popular.map((post, index) => `
          <li>
            <a href="#" class="blog-popular-item">
              <span class="blog-popular-rank">${String(index + 1).padStart(2, '0')}</span>
              <span class="blog-popular-thumb">
                <img src="${imgSrc(staticBase, post.image)}" alt="blog popular rank image" loading="lazy">
              </span>
              <span class="blog-popular-content">
                <span class="blog-popular-title">${escapeHtml(post.title)}</span>
                <time datetime="${escapeHtml(post.date)}">${escapeHtml(post.date)}</time>
              </span>
            </a>
          </li>
        `).join('')}
      </ol>
    </div>
  `;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
