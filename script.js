/**
 * Handles scroll animations for elements with the 'animate-on-scroll' class.
 * Elements become visible when they enter the viewport.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Scroll Animation Logic ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // --- New UI Logic for Navigation ---
    const dotsIcon = document.querySelector('.dots-icon');
    const dotsNav = document.querySelector('.dots-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const dotsNavLinks = document.querySelectorAll('.dots-nav a');
    const sections = document.querySelectorAll('.content-section');

    // Toggle the three-dots menu
    dotsIcon.addEventListener('click', () => {
        dotsNav.classList.toggle('active');
    });

    // Close the menu if clicked outside
    document.addEventListener('click', (event) => {
        if (!dotsMenuContainer.contains(event.target) && dotsNav.classList.contains('active')) {
            dotsNav.classList.remove('active');
        }
    });

    // Function to handle section display
    const showSection = (id) => {
        // Hide all sections first
        sections.forEach(section => {
            section.classList.remove('active-section');
            section.classList.add('hidden-section');
        });
        
        // Show the selected section
        const targetSection = document.querySelector(id);
        targetSection.classList.remove('hidden-section');
        targetSection.classList.add('active-section');

        // Close the dots menu if it's open
        if (dotsNav.classList.contains('active')) {
            dotsNav.classList.remove('active');
        }
    };

    // Add event listeners for main navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            
            // Remove active class from all main links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to the clicked link
            link.classList.add('active');
            
            // Show the corresponding section
            showSection(link.getAttribute('href'));
        });
    });

    // Add event listeners for three-dots menu links
    dotsNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            showSection(link.getAttribute('href'));
        });
    });

    // Initialize the page by showing the home section
    showSection('#home');
});
