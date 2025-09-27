// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation for switching content sections ---
    const navLinks = document.querySelectorAll('.nav-link, .dots-nav a');
    const sections = document.querySelectorAll('.content-section');
    const mainNavLinks = document.querySelectorAll('.main-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the browser from jumping to the anchor

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Hide all other sections
            sections.forEach(section => {
                section.classList.remove('active-section');
                section.classList.add('hidden-section');
            });

            // Show only the target section with a fade-in effect
            if (targetSection) {
                targetSection.classList.remove('hidden-section');
                targetSection.classList.add('active-section');
            }

            // Update the 'active' class on the main navigation links
            mainNavLinks.forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('href') === targetId) {
                    navLink.classList.add('active');
                }
            });

            // Automatically close the mobile menu after clicking a link
            const dotsNav = document.querySelector('.dots-nav');
            if (dotsNav.classList.contains('active')) {
                dotsNav.classList.remove('active');
            }
        });
    });

    // --- Mobile (dots) menu toggle ---
    const dotsIcon = document.querySelector('.dots-icon');
    const dotsNav = document.querySelector('.dots-nav');

    if (dotsIcon) { // Check if the element exists before adding listener
        dotsIcon.addEventListener('click', () => {
            dotsNav.classList.toggle('active');
        });
    }

    // --- Animate elements on scroll ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    // Use Intersection Observer for efficient scroll detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in the viewport, add the 'is-visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing after it has animated once
            }
        });
    }, {
        threshold: 0.1 // Trigger animation when 10% of the element is visible
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

});
