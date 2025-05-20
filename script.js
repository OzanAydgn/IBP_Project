document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                let offset = 0;

                if (targetId === '#skills') {
                    offset = 140;
                } else {
                    offset = 0;
                }

                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const skillLevels = document.querySelectorAll('.skill-level');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                if (entry.target.closest('#skills')) {
                    skillLevels.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        bar.style.width = level;
                    });
                } else if (!entry.target.closest('#skills')) {
                    observer.unobserve(entry.target);
                }
            } else {
                if (entry.target.closest('#skills')) {
                    skillLevels.forEach(bar => {
                        bar.style.width = '0%';
                    });
                }
            }
        });
    }, sectionObserverOptions);

    animatedElements.forEach(element => {
        sectionObserver.observe(element);
    });

    const sectionsForScrollSpy = document.querySelectorAll('main section');
    const updateActiveNavLink = () => {
        let currentActiveId = '';

        sectionsForScrollSpy.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            let scrollSpyOffset = 0;

            if (section.id === 'skills') {
                scrollSpyOffset = 140;
            }

            if (window.scrollY >= sectionTop - scrollSpyOffset && window.scrollY < sectionTop + sectionHeight - scrollSpyOffset) {
                currentActiveId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentActiveId) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
});
