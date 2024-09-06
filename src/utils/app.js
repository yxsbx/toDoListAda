import '../styles/styles.css';
import { loadHeader, loadSidebar, loadMobileNavbar } from './layout.js';
import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadSidebar();
    loadMobileNavbar();
    router();
});
