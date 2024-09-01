import { navigateTo } from './router.js';

export function initializeLinkListeners() {
    document.querySelectorAll('[data-link]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = event.currentTarget.getAttribute('data-link');
            if (url) {
                navigateTo(url);
            } else {
                console.error(
                    'A data-link attribute is missing on the clicked element.'
                );
            }
        });
    });
}
