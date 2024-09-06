import Sortable from 'sortablejs';
import { renderKanbanBoard } from './kanbanRenderer';

export function initializeKanbanBoard() {
    const updateKanbanBoard = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedRoadmap = urlParams.get('roadmap') || 'logicProgramming';

        renderKanbanBoard(selectedRoadmap);
        enableDragAndDrop();
    };

    updateKanbanBoard();

    const kanbanButtons = [
        { id: 'logicProgrammingBtn', key: 'logicProgramming' },
        {
            id: 'objectOrientedProgrammingBtn',
            key: 'objectOrientedProgramming',
        },
        { id: 'webDevelopmentBtn', key: 'webDevelopment' },
        { id: 'dataStructuresBtn', key: 'dataStructures' },
        { id: 'algorithmsBtn', key: 'algorithms' },
        { id: 'pythonBtn', key: 'python' },
    ];

    kanbanButtons.forEach((btn) => {
        const buttonElement = document.getElementById(btn.id);
        if (buttonElement) {
            buttonElement.addEventListener('click', () => {
                const newUrl = `${window.location.origin}/roadmap-details?roadmap=${btn.key}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
                updateKanbanBoard();
            });
        }
    });

    window.addEventListener('popstate', updateKanbanBoard);
}

function enableDragAndDrop() {
    const columns = ['blocked', 'TODO', 'progress', 'completed'];

    columns.forEach((columnId) => {
        const columnEl = document
            .getElementById(columnId)
            ?.querySelector('.task-list');
        if (columnEl) {
            if (columnEl.children.length === 0) {
                columnEl.style.minHeight = '50px';
            }

            Sortable.create(columnEl, {
                group: 'shared',
                animation: 200,
                delay: 0,
                ghostClass: 'sortable-ghost',
                sort: false,
                fallbackTolerance: 0,
                onEnd: (evt) => {
                    console.log(
                        `Item movido de ${evt.from.id} para ${evt.to.id}`
                    );
                    if (evt.from.children.length === 0)
                        evt.from.style.minHeight = '50px';
                    if (evt.to.children.length > 0) evt.to.style.minHeight = '';
                },
            });
        } else {
            console.error(
                `Coluna com ID ${columnId} ou '.task-list' não encontrada.`
            );
        }
    });
}
