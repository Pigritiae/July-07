document.addEventListener('DOMContentLoaded', () => {
    const reactionArea = document.getElementById('reaction-area');
    const numElements = 150;
    const elements = [];
    const reactionDelay = 70;
    const reactionRadius = 150;

    function createElements() {
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');
            element.classList.add('reaction-element');
            // Calcule as posições garantindo que o elemento caiba dentro da área
            const x = Math.random() * (reactionArea.offsetWidth - 30); // 30 é a largura/altura do elemento
            const y = Math.random() * (reactionArea.offsetHeight - 30); // 30 é a largura/altura do elemento

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            // Armazenar as posições como data attributes
            element.dataset.x = x;
            element.dataset.y = y;

            reactionArea.appendChild(element);
            elements.push(element);
        }
    }

    function getDistance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function startReaction(centerX, centerY) {
        let clickedElement = null;
        let minDistance = Infinity;

        // Encontrar o elemento mais próximo do clique
        elements.forEach(el => {
            const elX = parseFloat(el.dataset.x);
            const elY = parseFloat(el.dataset.y);
            const dist = getDistance(centerX, centerY, elX, elY);
            if (dist < minDistance) {
                minDistance = dist;
                clickedElement = el;
            }
        });

        if (clickedElement) {
            activateElement(clickedElement);
            // *** MUDANÇA AQUI: Iniciar a propagação a partir da posição do elemento clicado ***
            propagateReaction(parseFloat(clickedElement.dataset.x), parseFloat(clickedElement.dataset.y), 0);
        }
    }

    function activateElement(element) {
        // Evita reativar um elemento que já está no processo de ativação/desativação
        if (element.classList.contains('active')) {
            return;
        }
        element.classList.add('active');
        setTimeout(() => {
            element.classList.remove('active');
        }, 800);
    }

    function propagateReaction(originX, originY, currentDelay) {
        const reactiveElements = elements.filter(el => {
            const elX = parseFloat(el.dataset.x);
            const elY = parseFloat(el.dataset.y);
            const dist = getDistance(originX, originY, elX, elY);
            // Verifica se está dentro do raio de reação E se ainda não está ativo
            return dist < reactionRadius && !el.classList.contains('active');
        });

        if (reactiveElements.length === 0) {
            return;
        }

        // Ordena os elementos por distância para uma propagação mais "natural"
        reactiveElements.sort((a, b) => {
            const distA = getDistance(originX, originY, parseFloat(a.dataset.x), parseFloat(a.dataset.y));
            const distB = getDistance(originX, originY, parseFloat(b.dataset.x), parseFloat(b.dataset.y));
            return distA - distB;
        });

        reactiveElements.forEach((el, index) => {
            setTimeout(() => {
                activateElement(el);
                // Propaga a partir do elemento que acabou de ser ativado, com um atraso reduzido para próxima camada
                propagateReaction(parseFloat(el.dataset.x), parseFloat(el.dataset.y), reactionDelay / 2);
            }, currentDelay + (index * (reactionDelay / reactiveElements.length)));
        });
    }

    reactionArea.addEventListener('click', (e) => {
        // Obtenha a posição do clique relativa à 'reactionArea'
        const clickX = e.clientX - reactionArea.getBoundingClientRect().left;
        const clickY = e.clientY - reactionArea.getBoundingClientRect().top;
        startReaction(clickX, clickY);
    });

    createElements();

    // Adicione um ouvinte para o evento de redimensionamento da janela
    window.addEventListener('resize', () => {
        // Remova todos os elementos existentes
        elements.forEach(el => el.remove());
        // Limpe o array de elementos
        elements.length = 0;
        // Crie os elementos novamente para se ajustarem à nova dimensão
        createElements();
    });
});
/* Código Corrigido pela IA Gemini */