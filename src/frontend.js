document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dmy-fold-accordion-toggle').forEach(button => {
        button.addEventListener('click', function () {
            const accordion = this.closest('.dmy-fold-accordion');
            const isOpen = accordion.classList.contains('is-open');
            const content = accordion.querySelector('.dmy-fold-accordion-content');
            if (!content) return;

            // Toggle classes and attributes
            const isNowOpen = !accordion.classList.toggle('is-open');
            this.setAttribute('aria-expanded', isNowOpen);
            content.setAttribute('aria-expanded', isNowOpen);

            // Toggle chevron icon
            const icon = this.querySelector('svg');
            icon.classList.toggle('dashicons-arrow-up', isNowOpen);
            icon.classList.toggle('dashicons-arrow-down', !isNowOpen);
        });
    });
});
