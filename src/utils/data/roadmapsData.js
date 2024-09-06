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
        blocked: [
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
        blocked: [
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

    webDevelopment: {
        TODO: [
            {
                title: 'HTML e CSS',
                description:
                    'Aprender a estruturar e estilizar páginas da web usando HTML e CSS.',
                label: 'Teoria',
                labelColor: 'bg-blue-200',
                deadline: 'Em breve',
            },
            {
                title: 'JavaScript Básico',
                description:
                    'Compreender os fundamentos do JavaScript e como ele interage com HTML e CSS.',
                label: 'Prática',
                labelColor: 'bg-blue-200',
                deadline: 'Próxima semana',
            },
        ],
        progress: [
            {
                title: 'JavaScript Avançado',
                description:
                    'Aprofundar o conhecimento em JavaScript, incluindo closures, promises e async/await.',
                label: 'Prática',
                labelColor: 'bg-blue-200',
                deadline: 'Hoje',
            },
            {
                title: 'Responsive Design',
                description:
                    'Aprender como criar layouts que se adaptam a diferentes tamanhos de tela.',
                label: 'Teoria',
                labelColor: 'bg-blue-200',
                deadline: 'Em andamento',
            },
        ],
        completed: [
            {
                title: 'Frameworks Front-end',
                description:
                    'Aprender sobre frameworks populares como React, Vue ou Angular.',
                label: 'Teoria',
                labelColor: 'bg-green-300',
                deadline: 'Semana passada',
            },
        ],
        blocked: [
            {
                title: 'Otimização para SEO',
                description:
                    'Compreender como otimizar páginas para motores de busca como o Google.',
                label: 'Teoria',
                labelColor: 'bg-green-300',
                deadline: 'Em breve',
            },
        ],
    },

    dataStructures: {
        TODO: [
            {
                title: 'Listas Ligadas',
                description:
                    'Compreender a implementação e os usos de listas ligadas.',
                label: 'Teoria',
                labelColor: 'bg-purple-200',
                deadline: 'Esta semana',
            },
            {
                title: 'Filas e Pilhas',
                description:
                    'Aprender as estruturas de dados básicas de filas e pilhas.',
                label: 'Prática',
                labelColor: 'bg-purple-200',
                deadline: 'Próxima semana',
            },
        ],
        progress: [
            {
                title: 'Árvores Binárias',
                description:
                    'Entender o conceito e as operações em árvores binárias e suas variantes.',
                label: 'Teoria',
                labelColor: 'bg-purple-200',
                deadline: 'Hoje',
            },
            {
                title: 'Grafos',
                description:
                    'Aprender sobre grafos, sua representação e algoritmos relacionados.',
                label: 'Teoria',
                labelColor: 'bg-purple-200',
                deadline: 'Em andamento',
            },
        ],
        completed: [
            {
                title: 'Tabelas Hash',
                description:
                    'Implementar tabelas hash e entender sua importância na busca eficiente.',
                label: 'Prática',
                labelColor: 'bg-green-300',
                deadline: 'Ontem',
            },
        ],
        blocked: [],
    },

    algorithms: {
        TODO: [
            {
                title: 'Busca Binária',
                description: 'Entender a busca binária e sua implementação.',
                label: 'Prática',
                labelColor: 'bg-yellow-200',
                deadline: 'Esta semana',
            },
            {
                title: 'Ordenação por Inserção',
                description: 'Aprender o algoritmo de ordenação por inserção.',
                label: 'Teoria',
                labelColor: 'bg-yellow-200',
                deadline: 'Em breve',
            },
        ],
        progress: [
            {
                title: 'QuickSort',
                description:
                    'Implementar o QuickSort e entender seu desempenho.',
                label: 'Prática',
                labelColor: 'bg-yellow-200',
                deadline: 'Hoje',
            },
            {
                title: 'Busca em Largura (BFS)',
                description:
                    'Compreender o algoritmo de busca em largura em grafos.',
                label: 'Teoria',
                labelColor: 'bg-yellow-200',
                deadline: 'Em andamento',
            },
        ],
        completed: [
            {
                title: 'Merge Sort',
                description:
                    'Implementar e compreender o Merge Sort e sua eficiência.',
                label: 'Teoria',
                labelColor: 'bg-green-300',
                deadline: 'Semana passada',
            },
        ],
        blocked: [],
    },

    python: {
        TODO: [
            {
                title: 'Sintaxe Básica',
                description: 'Aprender a sintaxe básica da linguagem Python.',
                label: 'Teoria',
                labelColor: 'bg-indigo-200',
                deadline: 'Esta semana',
            },
            {
                title: 'Estruturas de Controle',
                description:
                    'Compreender as estruturas de controle, como loops e condicionais, em Python.',
                label: 'Prática',
                labelColor: 'bg-indigo-200',
                deadline: 'Próxima semana',
            },
        ],
        progress: [
            {
                title: 'Funções e Escopo',
                description:
                    'Aprender sobre funções, parâmetros e escopo de variáveis em Python.',
                label: 'Teoria',
                labelColor: 'bg-indigo-200',
                deadline: 'Hoje',
            },
            {
                title: 'Programação Funcional',
                description:
                    'Entender os conceitos de programação funcional e sua aplicação em Python.',
                label: 'Teoria',
                labelColor: 'bg-indigo-200',
                deadline: 'Em andamento',
            },
        ],
        completed: [
            {
                title: 'Orientação a Objetos',
                description:
                    'Compreender e aplicar os conceitos de orientação a objetos em Python.',
                label: 'Teoria',
                labelColor: 'bg-green-300',
                deadline: 'Ontem',
            },
        ],
        blocked: [],
    },
};
