function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

function router() {
    const routes = [
        { path: "/", view: () => loadComponent('roadmaps') },
        { path: "/roadmaps", view: () => loadComponent('roadmaps') },
        { path: "/roadmap-details", view: () => loadComponent('roadmap-details') },
        { path: "/roadmap-item", view: () => loadComponent('roadmap-item') },
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    match.route.view();
}

function loadComponent(componentName) {
    const app = document.getElementById('app');
    fetch(`./src/components/${componentName}.html`)
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            initializeListeners();
        });
}

function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    fetch(`./src/components/header.html`)
        .then(response => response.text())
        .then(html => {
            headerContainer.innerHTML = html;
            initializeListeners();
        });
}

function initializeListeners() {
    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            navigateTo(event.target.getAttribute('data-link'));
        });
    });
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    router();
});
