import Sortable from 'sortablejs';
import { renderKanbanBoard } from './kanbanRenderer';

class KanbanBoardManager {
    constructor() {
        this.kanbanButtons = [
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

        this.columns = ['blocked', 'TODO', 'progress', 'completed'];
        this.currentRoadmap = null;

        document.addEventListener('DOMContentLoaded', () => {
            this.checkKanbanElementsExist();
        });
    }

    checkKanbanElementsExist = () => {
        const checkExistInterval = setInterval(() => {
            const columnsExist = this.columns.every((columnId) =>
                document.getElementById(columnId)
            );

            if (columnsExist) {
                clearInterval(checkExistInterval);
                this.initializeKanbanBoard();
            } else {
                console.warn(
                    'As colunas do Kanban ainda não estão disponíveis no DOM.'
                );
            }
        }, 100);
    };

    updateKanbanBoard = (roadmap) => {
        this.currentRoadmap = roadmap || this.getSelectedRoadmap();
        renderKanbanBoard(this.currentRoadmap);
        this.enableDragAndDrop();
    };

    getSelectedRoadmap = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('roadmap') || 'logicProgramming';
    };

    initializeKanbanBoard = () => {
        this.updateKanbanBoard();

        this.kanbanButtons.forEach((btn) => {
            const buttonElement = document.getElementById(btn.id);
            if (buttonElement) {
                buttonElement.addEventListener('click', () => {
                    this.handleRoadmapChange(btn.key);
                });
            }
        });

        window.addEventListener('popstate', () => this.updateKanbanBoard());
    };

    handleRoadmapChange = (roadmapKey) => {
        const newUrl = `${window.location.origin}/roadmap-details?roadmap=${roadmapKey}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        this.updateKanbanBoard(roadmapKey);
    };

    enableDragAndDrop = () => {
        this.columns.forEach((columnId) => {
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
                        this.adjustColumnHeight(evt.from);
                        this.adjustColumnHeight(evt.to);
                    },
                });
            }
        });
    };

    adjustColumnHeight = (columnEl) => {
        if (columnEl.children.length === 0) {
            columnEl.style.minHeight = '50px';
        } else {
            columnEl.style.minHeight = '';
        }
    };
}

export const kanbanBoardManager = new KanbanBoardManager();
