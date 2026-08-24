
  // Availability toggle — flips button state + track color + status text
  function dashboardToggleAvailability(btn) {
  const isOn = btn.getAttribute('data-on') === 'true';
  const nowOn = !isOn;

  btn.setAttribute('data-on', nowOn);

  const dot = btn.querySelector('.dashboard-toggle-dot');
  const statusText = document.getElementById('dashboard-availability-status');
  const statusDot = document.getElementById('dashboard-availability-dot');

  if (nowOn) {
    // Toggle ON
    btn.classList.remove('bg-gray-300');
    btn.classList.add('bg-primary-yellow');

    dot.classList.remove('left-1');
    dot.classList.add('left-6');

    statusText.textContent = 'Online';

    statusDot.classList.remove('bg-gray-300');
    statusDot.classList.add('bg-bright-green');

  } else {
    // Toggle OFF
    btn.classList.remove('bg-primary-yellow');
    btn.classList.add('bg-gray-300');

    dot.classList.remove('left-6');
    dot.classList.add('left-1');

    statusText.textContent = 'Offline';

    statusDot.classList.remove('bg-bright-green');
    statusDot.classList.add('bg-gray-300');
  }
}

  // Customer feedback data — different ratings per customer
  const dashboardFeedbacks = [
    { name: "Maudie Reyes", date: "5 Sept 2025", rating: 5, text: "The engineer arrived on time and finished the network cabling job faster than expected. Really professional work from start to finish." },
    { name: "Priya Nair", date: "2 Sept 2025", rating: 4, text: "CCTV installation went smoothly, though the technician was about 20 minutes late. Camera quality and setup were great overall." },
    { name: "Arjun Mehta", date: "29 Aug 2025", rating: 5, text: "Booked a server room setup and the team was extremely knowledgeable. Clean cabling, proper labeling, and great documentation handed over." },
    { name: "Sneha Kapoor", date: "21 Aug 2025", rating: 3, text: "Fiber optic setup worked fine but communication before the visit could have been better. Had to follow up twice to confirm the schedule." },
  ];

  const dashboardFeedbackList = document.getElementById('dashboard-feedback-list');
  dashboardFeedbacks.forEach(f => {
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<span class="material-symbols-outlined text-[15px] ${i < f.rating ? 'text-primary-yellow' : 'text-gray-200'}">star</span>`
    ).join('');

    const initials = f.name.split(' ').map(n => n[0]).join('').slice(0, 2);

    const row = document.createElement('div');
    row.className = 'dashboard-feedback-row flex items-start gap-3 py-4';
    row.innerHTML = `
      <div class="w-9 h-9 rounded-full bg-light-warm-creme text-golden-orange  text-xs font-bold flex items-center justify-center shrink-0">${initials}</div>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-gray-900">${f.name}</p>
          <div class="flex items-center gap-1">${stars} <span class="text-xs text-gray-400 ml-1">${f.rating}/5</span></div>
        </div>
        <p class="text-xs text-gray-500 mt-1 leading-relaxed max-w-2xl">${f.text}</p>
        <p class="text-[11px] text-gray-400 mt-1">${f.date}</p>
      </div>
    `;
    dashboardFeedbackList.appendChild(row);
  });
