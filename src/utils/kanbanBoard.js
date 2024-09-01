import { renderKanbanBoard } from './roadmapsData.js';

export function initializeKanbanBoard() {
    renderKanbanBoard('logicProgramming');

    document
        .getElementById('logicProgrammingBtn')
        .addEventListener('click', () => {
            renderKanbanBoard('logicProgramming');
        });

    document
        .getElementById('objectOrientedProgrammingBtn')
        .addEventListener('click', () => {
            renderKanbanBoard('objectOrientedProgramming');
        });
}
