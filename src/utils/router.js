import { layoutManager } from './layout.js';
import { kanbanBoardManager } from './kanbanManager.js';

class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener('popstate', () => this.route());
        document.addEventListener('DOMContentLoaded', () => this.route());
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.route();
    }

    route() {
        const potentialMatch = this.routes.find(
            (route) => route.path === location.pathname
        );

        if (!potentialMatch) {
            this.loadComponent('404');
        } else {
            potentialMatch.view();
        }
    }

    loadComponent(componentName, callback) {
        layoutManager.loadComponent(componentName, 'app', () => {
            if (callback) callback();
        });
    }

    initializeLinkListeners() {
        document.querySelectorAll('[data-link]').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const url = event.currentTarget.getAttribute('data-link');
                if (url) {
                    this.navigateTo(url);
                } else {
                    console.error(
                        'A data-link attribute is missing on the clicked element.'
                    );
                }
            });
        });
    }
}

class RoadmapSelection {
    constructor(router) {
        this.router = router;
    }

    initialize() {
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
                    this.router.navigateTo(newUrl);
                });
            }
        });
    }
}

export const router = new Router([
    { path: '/', view: () => router.loadComponent('about-roadmap') },
    {
        path: '/roadmaps',
        view: () =>
            router.loadComponent('roadmaps', () =>
                new RoadmapSelection(router).initialize()
            ),
    },
    {
        path: '/roadmap-details',
        view: () =>
            router.loadComponent(
                'roadmap-details',
                kanbanBoardManager.initializeKanbanBoard
            ),
    },
    {
        path: '/about-roadmap',
        view: () => router.loadComponent('about-roadmap'),
    },
    { path: '/404', view: () => router.loadComponent('404') },
]);
