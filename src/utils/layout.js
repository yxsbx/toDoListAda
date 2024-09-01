import { initializeLinkListeners } from './router.js'; // Importando de router.js

let headerFetchController = null;
let sidebarFetchController = null;
let mobileNavbarFetchController = null;

function abortFetch(controller) {
    if (controller) {
        console.log('Aborting previous fetch');
        controller.abort();
    }
}

export function fetchWithAbort(url, onSuccess, onError, controllerSetter) {
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
    loadLayoutComponent('header', 'header-container');
}

export function loadSidebar() {
    loadLayoutComponent(
        'sidebar',
        'sidebar-container',
        initializeSidebarListeners
    );
}

export function loadMobileNavbar() {
    loadLayoutComponent(
        'mobile-navbar',
        'mobile-navbar-container',
        initializeLinkListeners
    );
}

function loadLayoutComponent(componentName, containerId, callback) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Elemento com ID '${containerId}' não encontrado.`);
        return;
    }

    let controllerSetter;

    if (componentName === 'header') {
        controllerSetter = (controller) => {
            abortFetch(headerFetchController);
            headerFetchController = controller;
        };
    } else if (componentName === 'sidebar') {
        controllerSetter = (controller) => {
            abortFetch(sidebarFetchController);
            sidebarFetchController = controller;
        };
    } else if (componentName === 'mobile-navbar') {
        controllerSetter = (controller) => {
            abortFetch(mobileNavbarFetchController);
            mobileNavbarFetchController = controller;
        };
    } else {
        controllerSetter = () => {};
    }

    fetchWithAbort(
        `/components/${componentName}.html`,
        (html) => {
            container.innerHTML = html;
            if (callback) callback();
        },
        () => {
            container.innerHTML = `<p>Error loading ${componentName}. Please try again.</p>`;
        },
        controllerSetter
    );
}

export function initializeSidebarListeners() {
    const sidebar = document.getElementById('sidebar-container');
    const mainContainer = document.getElementById('main-container');

    if (sidebar && mainContainer) {
        initializeLinkListeners();
    } else {
        console.error('Sidebar ou mainContainer não encontrado!');
    }
}
