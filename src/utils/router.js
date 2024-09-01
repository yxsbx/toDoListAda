import { fetchWithAbort } from './fetchUtils.js';
import { initializeLinkListeners } from './domUtils.js';
import { initializeKanbanBoard } from './kanbanBoard.js';

let navigateTimeout = null;

export function navigateTo(url) {
    if (navigateTimeout) {
        clearTimeout(navigateTimeout);
    }

    navigateTimeout = setTimeout(() => {
        history.pushState(null, null, url);
        router();
    }, 300);
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
        }
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
