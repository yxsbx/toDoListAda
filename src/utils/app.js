import '../styles/styles.css';
import { layoutManager } from './layout.js';
import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    layoutManager.loadComponents();
    router.initializeLinkListeners();
});
