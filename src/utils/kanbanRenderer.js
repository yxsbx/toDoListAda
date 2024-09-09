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
                    'kanban-card bg-white rounded-md p-4 mb-4 border-solid border border-700';
                taskElement.draggable = true;
                taskElement.dataset.taskId = task.title;
                taskElement.dataset.column = column;

                taskElement.innerHTML = `
                    <h3 class="font-bold mb-2">${task.title}</h3>
                    <p class="text-black text-sm mb-4">${task.description}</p>
                    <div class="flex justify-between">
                        <button class="edit-task text-blue-500 underline">Editar</button>
                        <button class="delete-task text-red-500 underline">Excluir</button>
                    </div>
                `;

                taskElement
                    .querySelector('.delete-task')
                    .addEventListener('click', () => {
                        roadmap[column].splice(index, 1);

                        const updatedRoadmapsFromStorage = {
                            ...roadmapsFromStorage,
                            [roadmapKey]: roadmap,
                        };
                        layoutManager.saveRoadmapsToLocalStorage(
                            updatedRoadmapsFromStorage
                        );
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

                        if (newTitle && newTitle.trim()) task.title = newTitle;
                        if (newDescription && newDescription.trim())
                            task.description = newDescription;

                        const updatedRoadmapsFromStorage = {
                            ...roadmapsFromStorage,
                            [roadmapKey]: roadmap,
                        };
                        layoutManager.saveRoadmapsToLocalStorage(
                            updatedRoadmapsFromStorage
                        );
                        renderKanbanBoard(roadmapKey);
                    });

                taskList.appendChild(taskElement);
            });
        }
    });

    const createTaskButton = document.getElementById('createTaskButton');
    const newTaskTitleInput = document.getElementById('newTaskTitle');
    const newTaskDescriptionInput =
        document.getElementById('newTaskDescription');
    const newTaskColumnSelect = document.getElementById('newTaskColumn');
    const newTaskModal = document.getElementById('newTaskModal');

    if (
        createTaskButton &&
        newTaskTitleInput &&
        newTaskDescriptionInput &&
        newTaskColumnSelect &&
        newTaskModal
    ) {
        createTaskButton.addEventListener('click', () => {
            const newTaskTitle = newTaskTitleInput.value.trim();
            const newTaskDescription = newTaskDescriptionInput.value.trim();
            const selectedColumn = newTaskColumnSelect.value;

            if (!newTaskTitle || !selectedColumn) {
                alert('Título e coluna são obrigatórios.');
                return;
            }

            const newTask = {
                title: newTaskTitle,
                description: newTaskDescription,
            };
            roadmap[selectedColumn].push(newTask);

            const updatedRoadmapsFromStorage = {
                ...roadmapsFromStorage,
                [roadmapKey]: roadmap,
            };
            layoutManager.saveRoadmapsToLocalStorage(
                updatedRoadmapsFromStorage
            );

            newTaskTitleInput.value = '';
            newTaskDescriptionInput.value = '';
            newTaskModal.classList.add('hidden');

            renderKanbanBoard(roadmapKey);
        });
    }
}
