 document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('section[id]');
        const tocLinks = document.querySelectorAll('.toc-link');

        function updateActiveToc() {
            const scrollPosition = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            let activeId = '';

            // If user has scrolled near/to the bottom of the page, highlight the last section
            if (scrollPosition + windowHeight >= documentHeight - 120) {
                if (sections.length > 0) {
                    activeId = sections[sections.length - 1].getAttribute('id');
                }
            } else {
                // Find the section that has its top closest to/above the scroll threshold
                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top + scrollPosition - 150; // 150px offset for sticky header
                    if (scrollPosition >= sectionTop) {
                        activeId = section.getAttribute('id');
                    }
                });
            }

            // Default to the first section if none match (i.e. we are at the top)
            if (!activeId && sections.length > 0) {
                activeId = sections[0].getAttribute('id');
            }

            tocLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${activeId}`) {
                    link.classList.add('border-primary-green', 'text-primary-green', 'font-semibold');
                    link.classList.remove('border-transparent', 'text-article-light-gray');
                } else {
                    link.classList.remove('border-primary-green', 'text-primary-green', 'font-semibold');
                    link.classList.add('border-transparent', 'text-article-light-gray');
                }
            });
        }

        // Smooth scroll when clicking TOC link
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const targetTop = targetSection.getBoundingClientRect().top + window.scrollY - 100; // 100px offset
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        window.addEventListener('scroll', updateActiveToc);
        // Initial check
        setTimeout(updateActiveToc, 100);
    });