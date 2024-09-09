import { router } from './router';
import './kanbanSearch';

class LayoutManager {
    constructor() {
        this.controllers = {
            header: null,
            sidebar: null,
            mobileNavbar: null,
        };
    }

    loadComponent(componentName, containerId, callback = null) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Elemento com ID '${containerId}' não encontrado.`);
            return;
        }

        this.abortFetch(this.controllers[componentName]);

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
        this.loadComponent('header', 'header-container');
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
