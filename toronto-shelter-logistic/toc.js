document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('div[id]');
    const tocLinks = document.querySelectorAll('#table-of-contents a');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    tocLinks.forEach((link) => link.parentElement.classList.remove('active'));
                    const activeLink = document.querySelector(`#table-of-contents a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.parentElement.classList.add('active');
                    }
                }
            });
        },
        {
            root: null, // Use the viewport as the root
            threshold: 0.2, // Trigger when 20% of the section is visible
        }
    );

    sections.forEach((section) => observer.observe(section));
});

tocLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});