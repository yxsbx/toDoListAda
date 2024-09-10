import { layoutManager } from './layout';
import { defaultRoadmaps } from '../data/roadmapsData';
import { renderKanbanBoard } from './kanbanRenderer';

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
        this.searchInput = document.querySelector('.input-search-toadmaps');
        this.searchResults = document.querySelector('.search-results');
        this.initializeSearchListener();
    }

    initialize() {
        const roadmapsFromStorage =
            layoutManager.loadRoadmapsFromLocalStorage();
        const allRoadmaps = { ...defaultRoadmaps, ...roadmapsFromStorage };

        const roadmapContainer = document.querySelector(
            '.roadmap-buttons-container'
        );
        if (!roadmapContainer) {
            console.error('Container de botões de roadmap não encontrado.');
            return;
        }

        roadmapContainer.innerHTML = '';

        Object.keys(allRoadmaps).forEach((roadmapKey) => {
            layoutManager.addRoadmapButton(
                this.formatDisplayName(roadmapKey),
                roadmapKey
            );
        });
    }

    formatDisplayName(roadmapKey) {
        return roadmapKey
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    }

    initializeSearchListener() {
        if (!this.searchInput || !this.searchResults) return;

        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            if (searchTerm.length === 0) {
                this.searchResults.classList.add('hidden');
                return;
            }

            const roadmapsFromStorage =
                layoutManager.loadRoadmapsFromLocalStorage();
            const allRoadmaps = { ...defaultRoadmaps, ...roadmapsFromStorage };

            const filteredRoadmaps = Object.keys(allRoadmaps).filter(
                (roadmapKey) => roadmapKey.toLowerCase().includes(searchTerm)
            );

            this.displaySearchResults(filteredRoadmaps);
        });
    }

    displaySearchResults(roadmaps) {
        this.searchResults.innerHTML = '';
        if (roadmaps.length === 0) {
            this.searchResults.classList.add('hidden');
            return;
        }

        roadmaps.forEach((roadmapKey) => {
            const li = document.createElement('li');
            li.className = 'cursor-pointer px-4 py-2 hover:bg-gray-200';
            li.textContent = this.formatDisplayName(roadmapKey);
            li.addEventListener('click', () => {
                const newUrl = `/roadmap-details?roadmap=${roadmapKey}`;
                this.router.navigateTo(newUrl);
                this.searchResults.classList.add('hidden');
            });
            this.searchResults.appendChild(li);
        });

        this.searchResults.classList.remove('hidden');
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
            router.loadComponent('roadmap-details', () => {
                const urlParams = new URLSearchParams(window.location.search);
                let roadmapKey = urlParams.get('roadmap');
                if (!roadmapKey) {
                    roadmapKey = 'logicProgramming';
                    const newUrl = `${window.location.origin}/roadmap-details?roadmap=${roadmapKey}`;
                    window.history.replaceState({ path: newUrl }, '', newUrl);
                }

                renderKanbanBoard(roadmapKey);
            }),
    },
    {
        path: '/about-roadmap',
        view: () => router.loadComponent('about-roadmap'),
    },
    { path: '/404', view: () => router.loadComponent('404') },
]);
