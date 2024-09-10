import '../styles/styles.css';
import { layoutManager } from './js/layout.js';
import { router } from './js/router.js';

document.addEventListener('DOMContentLoaded', () => {
    layoutManager.loadComponents();
    router.initializeLinkListeners();
});
