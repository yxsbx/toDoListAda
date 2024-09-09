import { router } from './router';
import { defaultRoadmaps } from './data/roadmapsData';

class LayoutManager {
    constructor() {
        this.controllers = {
            header: null,
            sidebar: null,
            mobileNavbar: null,
        };
        this.roadmapColors = {};

        document.addEventListener('DOMContentLoaded', () => {
            this.loadComponents();
            this.restoreSavedRoadmaps();
        });
    }

    toCamelCase(input) {
        return input
            .toLowerCase()
            .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
                index === 0 ? match.toLowerCase() : match.toUpperCase()
            )
            .replace(/\s+/g, '');
    }

    loadComponent(componentName, containerId, callback = null) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Elemento com ID '${containerId}' não encontrado.`);
            return;
        }

        this.fetchWithAbort(
            `/components/${componentName}.html`,
            (html) => {
                container.innerHTML = html;
                if (callback) callback();

                if (componentName === 'sidebar') {
                    this.initializeSidebarListeners();
                }
            },
            () => {
                container.innerHTML = `<p>Error loading ${componentName}. Please try again.</p>`;
            },
            (controller) => (this.controllers[componentName] = controller)
        );
    }

    loadComponents() {
        this.loadComponent('header', 'header-container', () => {
            this.initializeHeaderListeners();
        });
        this.loadComponent('sidebar', 'sidebar-container');
        this.loadComponent('mobile-navbar', 'mobile-navbar-container');
    }

    fetchWithAbort(url, onSuccess, onError, controllerSetter) {
        const controller = new AbortController();
        if (controllerSetter) controllerSetter(controller);
        const signal = controller.signal;

        fetch(url, { signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}`);
                }
                return response.text();
            })
            .then(onSuccess)
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Fetch error:', error);
                    onError(error);
                }
            });
    }

    abortFetch(controller) {
        if (controller && typeof controller.abort === 'function') {
            controller.abort();
        }
    }

    initializeHeaderListeners() {
        const newRoadmapButton = document.querySelector('.btn-new-roadmap');
        const modal = document.getElementById('newRoadmapModal');
        const closeModal = document.getElementById('closeModal');
        const createRoadmapButton = document.getElementById(
            'createRoadmapButton'
        );
        const newRoadmapNameInput = document.getElementById('newRoadmapName');

        newRoadmapButton.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });

        createRoadmapButton.addEventListener('click', () => {
            const roadmapName = newRoadmapNameInput.value.trim();
            if (roadmapName) {
                const formattedName = this.toCamelCase(roadmapName);
                const roadmaps = this.loadRoadmapsFromLocalStorage();

                if (!roadmaps[formattedName]) {
                    roadmaps[formattedName] = {
                        TODO: [],
                        progress: [],
                        completed: [],
                        blocked: [],
                    };
                    this.saveRoadmapsToLocalStorage(roadmaps);
                    this.addRoadmapButton(roadmapName, formattedName, true);

                    modal.classList.add('hidden');
                    newRoadmapNameInput.value = '';
                } else {
                    alert('Nome já existente.');
                }
            } else {
                alert('Nome inválido.');
            }
        });

        this.initializeSearchListener();
    }

    initializeSearchListener() {
        const searchInput = document.querySelector('.input-search-toadmaps');
        const roadmapContainer = document.querySelector(
            '.roadmap-buttons-container'
        );

        if (!searchInput || !roadmapContainer) {
            console.error(
                'Input de busca ou container dos roadmaps não encontrados.'
            );
            return;
        }

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            roadmapContainer.innerHTML = '';

            const roadmapsFromStorage = this.loadRoadmapsFromLocalStorage();
            const allRoadmaps = { ...defaultRoadmaps, ...roadmapsFromStorage };

            const filteredRoadmaps = Object.keys(allRoadmaps).filter(
                (roadmapKey) => roadmapKey.toLowerCase().includes(searchTerm)
            );

            filteredRoadmaps.forEach((roadmapKey) => {
                this.addRoadmapButton(
                    this.formatDisplayName(roadmapKey),
                    roadmapKey,
                    false
                );
            });
        });
    }

    formatDisplayName(roadmapKey) {
        return roadmapKey
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    }

    addRoadmapButton(roadmapName, formattedName, generateNewColor = false) {
        const roadmapContainer = document.querySelector(
            '.roadmap-buttons-container'
        );
        if (!roadmapContainer) {
            console.error('Container dos botões de roadmap não encontrado.');
            return;
        }

        if (generateNewColor || !this.roadmapColors[formattedName]) {
            this.roadmapColors[formattedName] = this.getRandomTailwindColor();
        }

        const newButton = document.createElement('button');
        const colorClass = this.roadmapColors[formattedName];
        newButton.className = `text-white py-3 px-8 rounded-lg text-xl transition-colors duration-300 hover:bg-black hover:shadow-lg shadow ${colorClass}`;
        newButton.textContent = roadmapName;
        newButton.addEventListener('click', () => {
            router.navigateTo(`/roadmap-details?roadmap=${formattedName}`);
        });
        roadmapContainer.appendChild(newButton);
    }

    getRandomTailwindColor() {
        const colorClasses = [
            'bg-blue-500 hover:bg-blue-700',
            'bg-green-500 hover:bg-green-700',
            'bg-red-500 hover:bg-red-700',
            'bg-yellow-500 hover:bg-yellow-700',
            'bg-purple-500 hover:bg-purple-700',
            'bg-indigo-500 hover:bg-indigo-700',
            'bg-pink-500 hover:bg-pink-700',
            'bg-teal-500 hover:bg-teal-700',
            'bg-orange-500 hover:bg-orange-700',
            'bg-gray-500 hover:bg-gray-700',
            'bg-cyan-500 hover:bg-cyan-700',
            'bg-amber-500 hover:bg-amber-700',
            'bg-lime-500 hover:bg-lime-700',
            'bg-rose-500 hover:bg-rose-700',
            'bg-fuchsia-500 hover:bg-fuchsia-700',
            'bg-emerald-500 hover:bg-emerald-700',
            'bg-sky-500 hover:bg-sky-700',
            'bg-violet-500 hover:bg-violet-700',
            'bg-stone-500 hover:bg-stone-700',
            'bg-zinc-500 hover:bg-zinc-700',
        ];

        return colorClasses[Math.floor(Math.random() * colorClasses.length)];
    }

    saveRoadmapsToLocalStorage(roadmaps) {
        localStorage.setItem('roadmaps', JSON.stringify(roadmaps));
    }

    loadRoadmapsFromLocalStorage() {
        const savedRoadmaps = localStorage.getItem('roadmaps');
        return savedRoadmaps ? JSON.parse(savedRoadmaps) : {};
    }

    restoreSavedRoadmaps() {
        const roadmapsFromStorage = this.loadRoadmapsFromLocalStorage();
        const mergedRoadmaps = { ...defaultRoadmaps, ...roadmapsFromStorage };

        const roadmapContainer = document.querySelector(
            '.roadmap-buttons-container'
        );

        if (!roadmapContainer) {
            console.error('Container dos botões de roadmap não encontrado.');
            return;
        }

        roadmapContainer.innerHTML = '';

        Object.keys(mergedRoadmaps).forEach((roadmapKey) => {
            this.addRoadmapButton(
                this.formatDisplayName(roadmapKey),
                roadmapKey,
                false
            );
        });
    }

    initializeSidebarListeners() {
        document.querySelectorAll('[data-link]').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const url = event.currentTarget.getAttribute('data-link');
                if (url) {
                    router.navigateTo(url);
                } else {
                    console.error(
                        "O link não contém a propriedade 'data-link'."
                    );
                }
            });
        });
    }
}

export const layoutManager = new LayoutManager();
