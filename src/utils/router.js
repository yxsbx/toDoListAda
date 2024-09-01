import { fetchWithAbort } from './layout.js';
import { initializeKanbanBoard } from './kanbanBoard.js';

let navigateTimeout = null;

export function navigateTo(url) {
    if (navigateTimeout) {
        clearTimeout(navigateTimeout);
    }

    navigateTimeout = setTimeout(() => {
        history.pushState(null, null, url);
        setTimeout(() => {
            router();
        }, 100);
    }, 300);
}

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

function loadComponent(componentName) {
    const app = document.getElementById('app');
    if (!app) {
        console.error(`Elemento com ID 'app' não encontrado.`);
        return;
    }

    fetchWithAbort(
        `/components/${componentName}.html`,
        (html) => {
            app.innerHTML = html;
            initializeLinkListeners();

            if (componentName === 'roadmap-details') {
                initializeKanbanBoard();
            }
        },
        () => {
            app.innerHTML = `<p>Error loading component. Please try again.</p>`;
        },
        () => {}
    );
}

export function router() {
    const routes = [
        { path: '/', view: () => loadComponent('about-roadmap') },
        { path: '/roadmaps', view: () => loadComponent('roadmaps') },
        {
            path: '/roadmap-details',
            view: () => loadComponent('roadmap-details'),
        },
        { path: '/about-roadmap', view: () => loadComponent('about-roadmap') },
    ];

    const potentialMatches = routes.map((route) => ({
        route: route,
        isMatch: location.pathname === route.path,
    }));

    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.isMatch
    );

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true,
        };
    }

    match.route.view();
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
    router();
});
