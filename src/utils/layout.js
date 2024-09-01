import { fetchWithAbort } from './fetchUtils.js';
import { initializeLinkListeners } from './domUtils.js';

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

    fetchWithAbort(
        `/components/${componentName}.html`,
        (html) => {
            container.innerHTML = html;
            if (callback) callback();
        },
        () => {
            container.innerHTML = `<p>Error loading ${componentName}. Please try again.</p>`;
        }
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
