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
            // Remove apenas os cards, preservando o conteúdo existente
            const existingCards =
                columnElement.querySelectorAll('.kanban-card');
            existingCards.forEach((card) => card.remove());

            roadmap[column].forEach((task) => {
                const taskElement = document.createElement('div');
                taskElement.className =
                    'kanban-card bg-slate-100 rounded-md p-4 mb-4';
                taskElement.innerHTML = `
                    <h3 class="font-bold mb-2">${task.title}</h3>
                    <p class="text-black text-sm mb-4">${task.description}</p>
                    <div class="flex justify-between items-center text-black text-sm">
                        <span class="${task.labelColor} text-black font-bold rounded-lg p-4">${task.label}</span>
                        <span>${task.deadline}</span>
                    </div>
                `;
                columnElement.appendChild(taskElement);
            });
        } else {
            console.error(`Elemento com ID ${column} não encontrado no DOM.`);
        }
    });
}
