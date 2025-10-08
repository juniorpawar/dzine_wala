document.addEventListener('DOMContentLoaded', () => {
    // THEME TOGGLE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>';

    const setTheme = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeToggleBtn.innerHTML = sunIcon;
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            themeToggleBtn.innerHTML = moonIcon;
            localStorage.setItem('theme', 'light');
        }
    };

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

    themeToggleBtn.addEventListener('click', () => {
        setTheme(!document.documentElement.classList.contains('dark'));
    });


    // SCROLL ANIMATIONS
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});