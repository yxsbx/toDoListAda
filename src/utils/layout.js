import { navigateTo } from './router';

let headerFetchController = null;
let sidebarFetchController = null;
let mobileNavbarFetchController = null;

function abortFetch(controller) {
    if (controller && typeof controller.abort === 'function') {
        controller.abort();
    }
}

export function fetchWithAbort(
    url,
    onSuccess,
    onError,
    controllerSetter = () => {}
) {
    const controller = new AbortController();
    controllerSetter(controller);
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

export function loadHeader() {
    loadLayoutComponent('header', 'header-container', (controller) => {
        abortFetch(headerFetchController);
        headerFetchController = controller;
    });
}

export function loadSidebar() {
    loadLayoutComponent('sidebar', 'sidebar-container', (controller) => {
        abortFetch(sidebarFetchController);
        sidebarFetchController = controller;
    });
}

export function loadMobileNavbar() {
    loadLayoutComponent(
        'mobile-navbar',
        'mobile-navbar-container',
        (controller) => {
            abortFetch(mobileNavbarFetchController);
            mobileNavbarFetchController = controller;
        }
    );
}

function loadLayoutComponent(componentName, containerId, controllerSetter) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Elemento com ID '${containerId}' não encontrado.`);
        return;
    }

    abortFetch(controllerSetter ? controllerSetter() : null);

    fetchWithAbort(
        `/components/${componentName}.html`,
        (html) => {
            container.innerHTML = html;

            if (componentName === 'sidebar') {
                initializeSidebarListeners();
            }
        },
        () => {
            container.innerHTML = `<p>Error loading ${componentName}. Please try again.</p>`;
        },
        controllerSetter
    );
}

function initializeSidebarListeners() {
    document.querySelectorAll('[data-link]').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = event.currentTarget.getAttribute('data-link');
            if (url) {
                navigateTo(url);
            } else {
                console.error("O link não contém a propriedade 'data-link'.");
            }
        });
    });
}
