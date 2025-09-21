/**
 * Handles scroll animations for elements with the 'animate-on-scroll' class.
 * Elements become visible when they enter the viewport.
 */
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    /**
     * Callback function for the Intersection Observer.
     * @param {IntersectionObserverEntry[]} entries - An array of IntersectionObserverEntry objects.
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});
