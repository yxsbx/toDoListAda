import { roadmaps } from './data/roadmapsData';

export function renderKanbanBoard(roadmapKey, test) {
    const roadmap =
        test === undefined ? roadmaps[roadmapKey] : test[roadmapKey];

    if (!roadmap) {
        console.error(`Nenhum roadmap encontrado com a chave: ${roadmapKey}`);
        return;
    }

    // LEIAM OS COMENTÁRIOS, POR FAVOR!

    
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
                taskElement.dataset.index = index;
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

                // Deletar a tarefa que queremos:
                taskElement
                    .querySelector('.delete-task')
                    .addEventListener('click', () => {
                        roadmap[column].splice(index, 1); // Vai ser usado para remover nossa tarefa
                        renderKanbanBoard(roadmapKey); // Redesenha o quadro, neste caso, como deletamos a tarefa, ai sim faz sentido redesenhar o quadro.
                    });

                // Editar a nossa tarefa escolhida:
                taskElement
                    .querySelector('.edit-task')
                    .addEventListener('click', () => {
                        
                        // Prompt com os dados que vamos alterar no nosso card:
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

                        // é pra atualizar só os campos que tiver alguma alterações.

                        // o problema, pelo que notei, é que quando a gente editava qualquer coisa no card, ao ínves dele editar apenas a informação no card, ele redesenhava todo o quadro, porque acabava chamando a função renderKanbanBoard(roadmapKey);

                        // Por isso dava os erros de crashar no chrome, porque ficava criando um efeito em cascata , criando um monte de "redesenhos" do quadro ao mesmo tempo.

                        // agora o código vai ver se teve mudança pelos (if) e so vai atualizar o dado que teve mudança no card. Teoricamente, tem que funcionar, já que nao vai ficar atualizando todo o board, com isso o loop deve acabar (no meu não crashou mais no Chrome... safari esava OK).

                        //Basicamente, o que tava ocorrendo é, ao invés dele "apagar a informação antiga e substituir pela nova no card X", ele tava apagando todo o quadro, e refazendo ele de novo sem necessidade, mesmo não tendo sido editado nada nos quadros W,Y,Z..
                        if (newTitle) task.title = newTitle;
                        if (newDescription) task.description = newDescription;
                        if (newLabel) task.label = newLabel;
                        if (newLabelColor) task.labelColor = newLabelColor;
                        if (newDeadline) task.deadline = newDeadline;

                        taskElement.querySelector('h3').textContent =
                            task.title;
                        taskElement.querySelector('p').textContent =
                            task.description;
                        taskElement.querySelector('span').className =
                            `${task.labelColor} text-black font-bold rounded-lg p-2`;
                        taskElement.querySelector('span').textContent =
                            task.label;
                    });

                taskList.appendChild(taskElement);
            });
        }
    });
}
