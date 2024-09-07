import { kanbanBoardManager } from './kanbanManager.js';

class KanbanInitializer {
    constructor(maxAttempts = 50, checkInterval = 100) {
        this.checkExistInterval = null;
        this.maxAttempts = maxAttempts;
        this.checkInterval = checkInterval;
        this.currentAttempts = 0;
    }

    checkKanbanElements() {
        const blocked = document.getElementById('blocked');
        const todo = document.getElementById('TODO');
        const progress = document.getElementById('progress');
        const completed = document.getElementById('completed');

        return blocked && todo && progress && completed;
    }

    startChecking() {
        this.checkExistInterval = setInterval(() => {
            this.currentAttempts++;

            if (
                this.checkKanbanElements() &&
                window.location.pathname.includes('roadmap-details')
            ) {
                clearInterval(this.checkExistInterval);
                kanbanBoardManager.initializeKanbanBoard();
            } else if (this.currentAttempts >= this.maxAttempts) {
                clearInterval(this.checkExistInterval);
                console.error(
                    'Erro: Não foi possível encontrar os elementos do Kanban no tempo permitido.'
                );
            }
        }, this.checkInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const kanbanInitializer = new KanbanInitializer();
    kanbanInitializer.startChecking();
});
