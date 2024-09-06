import { fetchWithAbort } from './layout.js';
import { initializeKanbanBoard } from './kanbanManager.js';

export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
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

export function loadComponent(componentName, callback) {
    const app = document.getElementById('app');
    if (!app) {
        console.error(`Elemento com ID 'app' não encontrado.`);
        return;
    }

    fetchWithAbort(
        `/components/${componentName}.html`,
        (html) => {
            app.innerHTML = html;
            if (callback) callback();
        },
        () => {
            app.innerHTML = `<p>Error loading component. Please try again.</p>`;
        }
    );
}

export function router() {
    const routes = [
        { path: '/', view: () => loadComponent('about-roadmap') },
        {
            path: '/roadmaps',
            view: () => loadComponent('roadmaps', initializeRoadmapSelection),
        },
        {
            path: '/roadmap-details',
            view: () => loadComponent('roadmap-details', initializeKanbanBoard),
        },
        { path: '/about-roadmap', view: () => loadComponent('about-roadmap') },
        { path: '/404', view: () => loadComponent('404') },
    ];

    const potentialMatch = routes.find(
        (route) => route.path === location.pathname
    );

    if (!potentialMatch) {
        loadComponent('404');
    } else {
        potentialMatch.view();
    }
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
    router();
});

export function initializeRoadmapSelection() {
    const roadmapButtons = [
        { id: 'logicProgrammingBtn', key: 'logicProgramming' },
        {
            id: 'objectOrientedProgrammingBtn',
            key: 'objectOrientedProgramming',
        },
        { id: 'webDevelopmentBtn', key: 'webDevelopment' },
        { id: 'dataStructuresBtn', key: 'dataStructures' },
        { id: 'algorithmsBtn', key: 'algorithms' },
        { id: 'pythonBtn', key: 'python' },
    ];

    roadmapButtons.forEach((btn) => {
        const buttonElement = document.getElementById(btn.id);
        if (buttonElement) {
            buttonElement.addEventListener('click', () => {
                const newUrl = `/roadmap-details?roadmap=${btn.key}`;
                navigateTo(newUrl);
            });
        }
    });
}
