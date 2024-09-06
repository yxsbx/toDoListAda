import { initializeKanbanBoard } from './kanbanManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const checkExist = setInterval(() => {
        const blocked = document.getElementById('blocked');
        const todo = document.getElementById('TODO');
        const progress = document.getElementById('progress');
        const completed = document.getElementById('completed');

        if (
            blocked &&
            todo &&
            progress &&
            completed &&
            window.location.pathname.includes('roadmap-details')
        ) {
            clearInterval(checkExist);
            initializeKanbanBoard();
        }
    }, 100);
});
