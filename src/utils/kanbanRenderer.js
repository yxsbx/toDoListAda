import { layoutManager } from './layout';
import { defaultRoadmaps } from './data/roadmapsData';

export function renderKanbanBoard(roadmapKey) {
    const roadmapsFromStorage = layoutManager.loadRoadmapsFromLocalStorage();
    const allRoadmaps = { ...defaultRoadmaps, ...roadmapsFromStorage };

    const roadmap = allRoadmaps[roadmapKey];

    if (!roadmap) {
        console.error(`Nenhum roadmap encontrado com a chave: ${roadmapKey}`);
        return;
    }

    Object.keys(roadmap).forEach((column) => {
        const columnElement = document.getElementById(column);

        if (columnElement) {
            const taskList = columnElement.querySelector('.task-list');

            taskList.innerHTML = '';

            roadmap[column].forEach((task, index) => {
                const taskElement = document.createElement('div');
                taskElement.className =
                    'kanban-card bg-slate-100 rounded-md p-4 mb-4';
                taskElement.draggable = true;
                taskElement.dataset.taskId = task.title;
                taskElement.dataset.column = column;

                taskElement.innerHTML = `
                    <h3 class="font-bold mb-2">${task.title}</h3>
                    <p class="text-black text-sm mb-4">${task.description}</p>
                    <div class="flex justify-between items-center text-black text-sm mb-2">
                        <span class="${task.labelColor} text-black font-bold rounded-lg p-2">${task.label}</span>
                        <span>${task.deadline}</span>
                    </div>
                    <div class="flex justify-between">
                        <button class="edit-task text-blue-500 underline">Editar</button>
                        <button class="delete-task text-red-500 underline">Excluir</button>
                    </div>
                `;

                taskElement
                    .querySelector('.delete-task')
                    .addEventListener('click', () => {
                        roadmap[column].splice(index, 1);
                        layoutManager.saveRoadmapsToLocalStorage(roadmaps);
                        renderKanbanBoard(roadmapKey);
                    });

                taskElement
                    .querySelector('.edit-task')
                    .addEventListener('click', () => {
                        const newTitle = prompt(
                            'Editar título da tarefa:',
                            task.title
                        );
                        const newDescription = prompt(
                            'Editar descrição da tarefa:',
                            task.description
                        );
                        const newLabel = prompt(
                            'Editar label da tarefa:',
                            task.label
                        );
                        const newLabelColor = prompt(
                            'Editar cor do label da tarefa (ex: bg-blue-200):',
                            task.labelColor
                        );
                        const newDeadline = prompt(
                            'Editar prazo da tarefa:',
                            task.deadline
                        );

                        if (newTitle) task.title = newTitle;
                        if (newDescription) task.description = newDescription;
                        if (newLabel) task.label = newLabel;
                        if (newLabelColor) task.labelColor = newLabelColor;
                        if (newDeadline) task.deadline = newDeadline;

                        layoutManager.saveRoadmapsToLocalStorage(roadmaps);
                        renderKanbanBoard(roadmapKey);
                    });

                taskList.appendChild(taskElement);
            });
        }
    });
}
