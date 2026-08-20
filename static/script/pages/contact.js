document.addEventListener('DOMContentLoaded', () => {
  initContactCalendar();
  initMessageCounter();
  initContactFaq();
  initContactDropdowns();
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form-id');
  const btn = document.getElementById('contact-submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    btn.disabled = true;
    btn.textContent = 'Submitting...';

    const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'X-CSRFToken': csrfToken,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert(result.message || 'Inquiry submitted successfully!');
        form.reset();
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `Submit Inquiry <span class="material-symbols-outlined" aria-hidden="true" style="font-size: 1.125rem;">arrow_forward</span>`;
    }
  });
}

function initContactCalendar() {
  const calendarRoot = document.getElementById('contact-calendar');
  if (!calendarRoot) return;

  const monthLabel = calendarRoot.querySelector('[data-calendar-month]');
  const grid = calendarRoot.querySelector('[data-calendar-grid]');
  const prevBtn = calendarRoot.querySelector('[data-calendar-prev]');
  const nextBtn = calendarRoot.querySelector('[data-calendar-next]');

  const today = new Date();
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();
  let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const render = () => {
    monthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;
    grid.innerHTML = '';

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i += 1) {
      const empty = document.createElement('span');
      empty.className = 'contact-calendar-day contact-calendar-day--empty';
      empty.setAttribute('aria-hidden', 'true');
      grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(viewYear, viewMonth, day);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'contact-calendar-day';
      btn.textContent = String(day);
      btn.setAttribute('aria-label', date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }));

      if (isSameDay(date, today)) {
        btn.classList.add('contact-calendar-day--today');
      }

      if (isSameDay(date, selectedDate)) {
        btn.classList.add('contact-calendar-day--selected');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.setAttribute('aria-pressed', 'false');
      }

      btn.addEventListener('click', () => {
        selectedDate = date;
        render();
      });

      grid.appendChild(btn);
    }
  };

  prevBtn.addEventListener('click', () => {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    render();
  });

  nextBtn.addEventListener('click', () => {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    render();
  });

  render();
}

function initMessageCounter() {
  const textarea = document.getElementById('contact-message');
  const counter = document.getElementById('contact-message-count');
  if (!textarea || !counter) return;

  const max = Number(textarea.getAttribute('maxlength')) || 1000;

  const update = () => {
    counter.textContent = `${textarea.value.length}/${max}`;
  };

  textarea.addEventListener('input', update);
  update();
}

function initContactFaq() {
  document.querySelectorAll('[data-faq-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('[data-faq-item]');
      const panel = item.querySelector('[data-faq-panel]');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('[data-faq-item].is-open').forEach((openItem) => {
        if (openItem === item) return;
        openItem.classList.remove('is-open');
        openItem.querySelector('[data-faq-trigger]').setAttribute('aria-expanded', 'false');
        openItem.querySelector('[data-faq-panel]').hidden = true;
      });

      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
}

function initContactDropdowns() {
  const dropdowns = document.querySelectorAll('[data-contact-dropdown]');
  if (!dropdowns.length) return;

  function closeDropdown(dropdown) {
    const trigger = dropdown.querySelector('.contact-dropdown-trigger');
    const menu = dropdown.querySelector('.contact-dropdown-menu');
    dropdown.classList.remove('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (menu) menu.hidden = true;
  }

  function closeAllExcept(current) {
    dropdowns.forEach((dropdown) => {
      if (dropdown !== current) closeDropdown(dropdown);
    });
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.contact-dropdown-trigger');
    const menu = dropdown.querySelector('.contact-dropdown-menu');
    const valueEl = dropdown.querySelector('[data-contact-dropdown-value]');
    const inputEl = dropdown.querySelector('[data-contact-dropdown-input]');
    const options = dropdown.querySelectorAll('.contact-dropdown-option');

    if (!trigger || !menu || !valueEl) return;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains('is-open');
      closeAllExcept(dropdown);
      dropdown.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      menu.hidden = !willOpen;
    });

    menu.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const label = option.textContent.trim();
        const value = option.dataset.value || label;

        valueEl.textContent = label;
        valueEl.classList.remove('is-placeholder');
        if (inputEl) inputEl.value = value;

        options.forEach((item) => {
          const isSelected = item === option;
          item.classList.toggle('is-selected', isSelected);
          item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        });

        closeDropdown(dropdown);
      });
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach((dropdown) => closeDropdown(dropdown));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dropdowns.forEach((dropdown) => closeDropdown(dropdown));
    }
  });
}

// Stay Updated Form - AJAX Submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.stay-updated-form');
  const messageDiv = document.getElementById('stay-updated-message');
  const emailInput = document.getElementById('stay-updated-email');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Subscribing...';
      }

      messageDiv.innerHTML = '';
      messageDiv.className = 'mt-2 text-sm';

      const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;

      fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ email: email })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            messageDiv.textContent = data.message;
            messageDiv.className = 'mt-2 text-sm text-green-600 font-medium';
            emailInput.value = '';
          } else {
            messageDiv.textContent = data.error || 'Something went wrong.';
            messageDiv.className = 'mt-2 text-sm text-red-600 font-medium';
          }
        })
        .catch(() => {
          messageDiv.textContent = 'Network error. Please try again.';
          messageDiv.className = 'mt-2 text-sm text-red-600 font-medium';
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Subscribe <span class="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>';
          }
        });
    });
  }

  //CONTACT UPLOAD FILE 
  const attachmentInput = document.getElementById("contact-attachment");
  const fileName = document.getElementById("contact-file-name");

  attachmentInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      fileName.textContent = `Selected: ${this.files[0].name}`;
      fileName.classList.remove("hidden");
    } else {
      fileName.textContent = "";
      fileName.classList.add("hidden");
    }
  });
});

// Hero Counter Animation
document.addEventListener("DOMContentLoaded", () => {
  // ... your existing hero counter code ...
});

// Coverage Map
document.addEventListener("DOMContentLoaded", function () {
  // ... your existing Leaflet map code ...
});

function toggleDropdown(id) {
  // ... your existing code ...
}

function selectOption(id, value) {
  // ... your existing code ...
}

window.addEventListener("click", function (e) {
  // ... your existing code ...
});

document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.getElementById("contactSalesBtn");
  const salesModal = document.getElementById("salesModal");

  if (contactBtn && salesModal) {
    contactBtn.addEventListener("click", function (e) {
      e.preventDefault();
      salesModal.classList.remove("hidden");
      salesModal.classList.add("flex");
    });
  }
});


// ============================================================
// PREVENT IMAGE DRAGGING
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll("img").forEach(function (img) {

    // Prevent browser image dragging
    img.setAttribute("draggable", "false");

    // Prevent drag & drop
    img.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    // Prevent image selection
    img.style.userSelect = "none";
    img.style.webkitUserSelect = "none";
    img.style.webkitUserDrag = "none";

  });

});