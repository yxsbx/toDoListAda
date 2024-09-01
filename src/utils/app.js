import '../styles/styles.css';
import { loadHeader, loadSidebar, loadMobileNavbar } from './layout.js';
import { router } from './router.js';
import { initializeKanbanBoard } from './kanbanBoard.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadSidebar();
    loadMobileNavbar();
    router();

    if (window.location.pathname.includes('roadmap-details')) {
        initializeKanbanBoard();
    }
});
