import { roadmaps } from '../data/roadmapsData';
import { kanbanBoardManager } from './kanbanManager';
import { renderKanbanBoard } from './kanbanRenderer';

function filterTasks(title) {
    const newObject = {};
    Object.keys(roadmaps).forEach((roadmapKey) => {
        newObject[roadmapKey] = [];
        Object.keys(roadmaps[roadmapKey]).forEach((column) => {
            const filterTask = roadmaps[roadmapKey][column].filter((i) =>
                i.title.toLowerCase().includes(title)
            );

            newObject[roadmapKey][column] = filterTask;
        });
    });

    renderKanbanBoard(kanbanBoardManager.currentRoadmap, newObject);
}

function init() {
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener('input', (e) =>
        filterTasks(e.target.value.toLowerCase())
    );
}

window.addEventListener('load', () => init());
