import Sortable from 'sortablejs';
import { renderKanbanBoard } from './kanbanRenderer';
import { layoutManager } from './layout';

class KanbanBoardManager {
    constructor() {
        this.columns = ['blocked', 'TODO', 'progress', 'completed'];
        this.currentRoadmap = null;

        document.addEventListener('DOMContentLoaded', () => {
            this.checkKanbanElementsExist();
        });
    }

    checkKanbanElementsExist = () => {
        const columnsExist = this.columns.every((columnId) =>
            document.getElementById(columnId)
        );

        if (columnsExist) {
            this.initializeKanbanBoard();
        }
    };

    updateKanbanBoard = (roadmapKey) => {
        this.currentRoadmap = roadmapKey || this.getSelectedRoadmap();
        renderKanbanBoard(this.currentRoadmap);
        this.enableDragAndDrop();
    };

    getSelectedRoadmap = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('roadmap') || 'logicProgramming';
    };

    initializeKanbanBoard = () => {
        this.updateKanbanBoard();

        const roadmaps = layoutManager.loadRoadmapsFromLocalStorage();

        Object.keys(roadmaps).forEach((roadmapKey) => {
            const buttonElement = document.getElementById(`${roadmapKey}Btn`);
            if (buttonElement) {
                buttonElement.addEventListener('click', () => {
                    this.handleRoadmapChange(roadmapKey);
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
