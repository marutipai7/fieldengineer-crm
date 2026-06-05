 // Logic to close other accordion items when one is opened
            const items = document.querySelectorAll('.faq-item');

            items.forEach((item) => {
                item.addEventListener('click', () => {
                    items.forEach((otherItem) => {
                        if (otherItem !== item) {
                            otherItem.removeAttribute('open');
                        }
                    });
                });
            });


             // Initialize Lucide Icons
        lucide.createIcons();

        // 1. Tab Switching Logic
        const tabs = document.querySelectorAll('#consult-tabs button');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('text-emerald-700', 'font-bold', 'border-b-2', 'border-emerald-700');
                    t.classList.add('text-gray-400');
                });
                tab.classList.add('text-emerald-700', 'font-bold', 'border-b-2', 'border-emerald-700');
                tab.classList.remove('text-gray-400');
            });
        });

        // 2. Dynamic Calendar Logic
        let date = new Date();
        let selectedDay = 1;

        function renderCalendar() {
            const monthYear = document.getElementById('currentMonthYear');
            const grid = document.getElementById('calendarGrid');

            const month = date.getMonth();
            const year = date.getFullYear();

            monthYear.innerText = date.toLocaleString('default', { month: 'long', year: 'numeric' });

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Adjust for Monday start (0=Sun, 1=Mon...)
            let startingPoint = firstDay === 0 ? 6 : firstDay - 1;

            grid.innerHTML = "";

            // Empty slots
            for (let i = 0; i < startingPoint; i++) {
                grid.innerHTML += `<span></span>`;
            }

            // Actual days
            for (let d = 1; d <= daysInMonth; d++) {
                const isSelected = d === selectedDay;
                grid.innerHTML += `
                <span onclick="selectDay(${d})" class="cursor-pointer w-7 h-7 flex items-center justify-center rounded-full mx-auto transition-all ${isSelected ? 'bg-emerald-700 text-white font-bold' : 'text-gray-700 hover:bg-emerald-50'}">
                    ${d}
                </span>`;
            }
        }

        window.selectDay = (d) => {
            selectedDay = d;
            renderCalendar();
        };

        window.changeMonth = (dir) => {
            date.setMonth(date.getMonth() + dir);
            renderCalendar();
        };

        // 3. Time Slot Selection
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                timeSlots.forEach(s => s.classList.remove('bg-emerald-600', 'text-white'));
                slot.classList.add('bg-emerald-600', 'text-white');
            });
        });

        renderCalendar();