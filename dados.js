document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const diceButtons = document.querySelectorAll('.dice-btn');
    const customRollBtn = document.getElementById('roll-custom-btn');
    const customRollInput = document.getElementById('custom-roll-input');
    const currentRollResult = document.getElementById('current-roll-result');
    const currentRollDetails = document.getElementById('current-roll-details');
    const diceAnimation = document.getElementById('dice-animation');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    const diceSound = document.getElementById('dice-sound'); // Opcional

    // Histórico de rolagens
    let rollHistory = JSON.parse(localStorage.getItem('diceRollHistory')) || [];

    // Inicialização
    updateHistoryDisplay();

    // Event Listeners
    diceButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const diceType = this.getAttribute('data-dice');
            rollDice(diceType);
        });
    });

    customRollBtn.addEventListener('click', rollCustomDice);
    clearHistoryBtn.addEventListener('click', clearHistory);

    // Rolagem por tecla Enter
    customRollInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            rollCustomDice();
        }
    });

    // Função para rolar dados
    function rollDice(diceType, customRoll = false) {
        // Extrai o número de faces do dado (remove o 'd')
        const diceFaces = parseInt(diceType.substring(1));
        
        // Toca o som de rolagem (se existir)
        if (diceSound) {
            diceSound.currentTime = 0;
            diceSound.play().catch(e => console.log("Autoplay não permitido"));
        }

        // Animação
        diceAnimation.classList.add('rolling');
        const diceFace = diceAnimation.querySelector('.dice-face');
        diceFace.textContent = '...';

        // Limpa animação após 1 segundo
        setTimeout(() => {
            const result = Math.floor(Math.random() * diceFaces) + 1;
            
            // Atualiza a interface
            diceAnimation.classList.remove('rolling');
            diceFace.textContent = result;
            currentRollResult.textContent = result;
            
            const detailsText = customRoll 
                ? `Rolagem personalizada: ${customRoll}`
                : `Rolagem de ${diceType}`;
            
            currentRollDetails.textContent = detailsText;

            // Adiciona ao histórico
            addToHistory({
                type: diceType,
                result: result,
                details: detailsText,
                timestamp: new Date().toLocaleTimeString()
            });
        }, 1000);
    }

    // Função para rolagem personalizada
    function rollCustomDice() {
        const input = customRollInput.value.trim();
        
        // Expressão regular para validar o formato XdY+Z
        const regex = /^(\d+)d(\d+)([+-]\d+)?$/;
        if (!regex.test(input)) {
            alert('Formato inválido! Use: XdY+Z (Ex: 2d6+1)');
            return;
        }

        const parts = input.split(/d|\+/);
        const numDice = parseInt(parts[0]);
        const diceFaces = parseInt(parts[1]);
        const modifier = parts[2] ? parseInt(parts[2]) : 0;

        // Toca o som de rolagem (se existir)
        if (diceSound) {
            diceSound.currentTime = 0;
            diceSound.play().catch(e => console.log("Autoplay não permitido"));
        }

        // Animação
        diceAnimation.classList.add('rolling');
        const diceFace = diceAnimation.querySelector('.dice-face');
        diceFace.textContent = '...';

        // Limpa animação após 1 segundo
        setTimeout(() => {
            let total = 0;
            let rolls = [];
            
            for (let i = 0; i < numDice; i++) {
                const roll = Math.floor(Math.random() * diceFaces) + 1;
                rolls.push(roll);
                total += roll;
            }
            
            total += modifier;

            // Atualiza a interface
            diceAnimation.classList.remove('rolling');
            diceFace.textContent = total;
            currentRollResult.textContent = total;
            currentRollDetails.textContent = `${input} = [${rolls.join(', ')}] ${modifier >= 0 ? '+' : ''}${modifier}`;

            // Adiciona ao histórico
            addToHistory({
                type: input,
                result: total,
                details: `${input} = [${rolls.join(', ')}] ${modifier >= 0 ? '+' : ''}${modifier}`,
                timestamp: new Date().toLocaleTimeString()
            });
        }, 1000);
    }

    // Adiciona rolagem ao histórico
    function addToHistory(roll) {
        rollHistory.unshift(roll);
        if (rollHistory.length > 10) {
            rollHistory.pop();
        }
        localStorage.setItem('diceRollHistory', JSON.stringify(rollHistory));
        updateHistoryDisplay();
    }

    // Atualiza a exibição do histórico
    function updateHistoryDisplay() {
        if (rollHistory.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-clock-rotate-left"></i>
                    <p>Nenhuma rolagem registrada</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = rollHistory.map(roll => `
            <div class="history-item">
                <div>
                    <span class="timestamp">${roll.timestamp}</span>
                    <span class="roll">${roll.type}</span>
                </div>
                <div>
                    <span class="result">${roll.result}</span>
                </div>
            </div>
        `).join('');
    }

    // Limpa o histórico
    function clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico de rolagens?')) {
            rollHistory = [];
            localStorage.removeItem('diceRollHistory');
            updateHistoryDisplay();
        }
    }
});