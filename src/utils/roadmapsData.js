export const roadmaps = {
    logicProgramming: {
        TODO: [
            {
                title: 'Introdução à Lógica',
                description:
                    'Entender conceitos básicos de lógica como proposições, operadores lógicos e tabelas verdade.',
                label: 'Teoria',
                labelColor: 'bg-yellow-200',
                deadline: 'Amanhã',
            },
            {
                title: 'Estruturas Condicionais',
                description:
                    'Aprender a utilizar if-else, switch-case para tomar decisões em algoritmos.',
                label: 'Prática',
                labelColor: 'bg-yellow-200',
                deadline: 'Próxima semana',
            },
        ],
        progress: [
            {
                title: 'Estruturas de Repetição',
                description:
                    'Entender e aplicar loops como for, while e do-while em problemas práticos.',
                label: 'Prática',
                labelColor: 'bg-yellow-200',
                deadline: 'Hoje',
            },
            {
                title: 'Vetores e Matrizes',
                description:
                    'Aprender a manipular arrays e matrizes para armazenar e processar múltiplos dados.',
                label: 'Teoria',
                labelColor: 'bg-yellow-200',
                deadline: 'Em andamento',
            },
        ],
        completed: [
            {
                title: 'Algoritmos de Ordenação',
                description:
                    'Implementação de algoritmos de ordenação como bubble sort, merge sort e quick sort.',
                label: 'Implementação',
                labelColor: 'bg-green-300',
                deadline: 'Ontem',
            },
        ],
        active: [
            {
                title: 'Recursão',
                description:
                    'Compreensão e aplicação de recursão em problemas complexos.',
                label: 'Teoria',
                labelColor: 'bg-green-300',
                deadline: 'Esta semana',
            },
        ],
    },

    objectOrientedProgramming: {
        TODO: [
            {
                title: 'Conceitos de OOP',
                description:
                    'Aprender os princípios fundamentais de Programação Orientada a Objetos.',
                label: 'Teoria',
                labelColor: 'bg-yellow-200',
                deadline: 'Em breve',
            },
            {
                title: 'Classes e Objetos',
                description:
                    'Compreender a definição e utilização de classes e objetos.',
                label: 'Prática',
                labelColor: 'bg-yellow-200',
                deadline: 'Próxima semana',
            },
        ],
        progress: [
            {
                title: 'Herança',
                description:
                    'Estudar e aplicar o conceito de herança entre classes.',
                label: 'Teoria',
                labelColor: 'bg-yellow-200',
                deadline: 'Hoje',
            },
            {
                title: 'Polimorfismo',
                description: 'Implementar o polimorfismo em projetos práticos.',
                label: 'Prática',
                labelColor: 'bg-yellow-200',
                deadline: 'Em andamento',
            },
        ],
        completed: [
            {
                title: 'Encapsulamento',
                description:
                    'Entender e aplicar o encapsulamento para proteger os dados de uma classe.',
                label: 'Teoria',
                labelColor: 'bg-green-300',
                deadline: 'Ontem',
            },
        ],
        active: [
            {
                title: 'Interfaces e Abstract Classes',
                description:
                    'Compreender o uso de interfaces e classes abstratas para definir contratos e estruturas de código.',
                label: 'Implementação',
                labelColor: 'bg-green-300',
                deadline: 'Esta semana',
            },
        ],
    },
};

export function renderKanbanBoard(roadmapKey) {
    const roadmap = roadmaps[roadmapKey];

    Object.keys(roadmap).forEach((column) => {
        const columnElement = document.getElementById(column);

        if (columnElement) {
            const existingCards = columnElement.querySelectorAll('.kanban-card');
            existingCards.forEach((card) => card.remove());

            roadmap[column].forEach((task, index) => {
                if (!task) return;

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
                        <span class="${task.labelColor} text-black font-bold rounded-lg p-4">${task.label}</span>
                        <span>${task.deadline}</span>
                    </div>
                    <div class="flex justify-between">
                        <button class="edit-task text-blue-500 underline">Editar</button>
                        <button class="delete-task text-red-500 underline">Excluir</button>
                    </div>
                `;

                taskElement.querySelector('.delete-task').addEventListener('click', () => {
                    roadmap[column].splice(index, 1);
                    renderKanbanBoard(roadmapKey);
                });

                taskElement.querySelector('.edit-task').addEventListener('click', () => {
                    const newTitle = prompt('Editar título da tarefa:', task.title);
                    const newDescription = prompt('Editar descrição da tarefa:', task.description);
                    const newLabel = prompt('Editar label da tarefa:', task.label);
                    const newLabelColor = prompt('Editar cor do label da tarefa (ex: bg-blue-200):', task.labelColor);
                    const newDeadline = prompt('Editar prazo da tarefa:', task.deadline);

                    if (newTitle) task.title = newTitle;
                    if (newDescription) task.description = newDescription;
                    if (newLabel) task.label = newLabel;
                    if (newLabelColor) task.labelColor = newLabelColor;
                    if (newDeadline) task.deadline = newDeadline;

                    renderKanbanBoard(roadmapKey);
                });

                taskElement.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        index: e.target.dataset.index,
                        column: e.target.dataset.column
                    }));
                });

                columnElement.appendChild(taskElement);
            });

            columnElement.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            columnElement.addEventListener('drop', (e) => {
                e.preventDefault();
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));

                const taskIndex = parseInt(data.index, 10);
                const task = roadmap[data.column].splice(taskIndex, 1)[0];

                if (task) {
                    roadmap[column].push(task);
                }

                renderKanbanBoard(roadmapKey);
            });

            const addButton = columnElement.querySelector('button');
            if (addButton && !addButton.classList.contains('initialized')) {
                addButton.classList.add('initialized');
                addButton.addEventListener('click', () => {
                    const title = prompt('Digite o título da nova tarefa:');
                    const description = prompt('Digite a descrição da nova tarefa:');

                    if (title && description) {
                        const newTask = {
                            title: title,
                            description: description,
                            label: 'Novo',
                            labelColor: 'bg-blue-200',
                            deadline: 'Sem prazo',
                        };

                        roadmap[column].push(newTask);
                        renderKanbanBoard(roadmapKey);
                    }
                });
            }
        } else {
            console.error(`Elemento com ID ${column} não encontrado no DOM.`);
        }
    });
}




