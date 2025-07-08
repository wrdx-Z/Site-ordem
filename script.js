// main.js - Sistema Principal
document.addEventListener('DOMContentLoaded', function() {
    // Sistema de Navegação
    function setActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.cyber-nav a').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Terminal Interativo
    function initTerminal() {
        const terminal = document.getElementById('terminal-output');
        if (!terminal) return;

        const commands = {
            help: () => `<p>> Comandos disponíveis:<br>
                > - <span class="cmd">sobre</span>: Informações do sistema<br>
                > - <span class="cmd">versao</span>: Versão atual<br>
                > - <span class="cmd">clear</span>: Limpar terminal</p>`,
            sobre: () => `<p>> Sistema Ordem Paranormal v2.3.5<br>
                > Desenvolvido para agentes da Ordo Realitas<br>
                > Acesso autorizado apenas para membros</p>`,
            versao: () => `<p>> Versão atual: 2.3.5<br>
                > Última atualização: 15/06/2023</p>`,
            clear: () => {
                terminal.innerHTML = '';
                return '';
            }
        };

        function processCommand(cmd) {
            const lowerCmd = cmd.toLowerCase();
            if (commands[lowerCmd]) {
                return commands[lowerCmd]();
            }
            return `<p>> Comando não reconhecido: "${cmd}"<br>
                > Digite <span class="cmd">help</span> para ajuda</p>`;
        }

        function addInputLine() {
            const inputLine = document.createElement('p');
            inputLine.className = 'terminal-input-line';
            inputLine.innerHTML = `><span class="cursor">█</span>`;
            terminal.appendChild(inputLine);
            return inputLine;
        }

        // Simular inicialização
        setTimeout(() => {
            const inputLine = addInputLine();
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const inputText = inputLine.textContent.replace('>', '').trim();
                    if (inputText) {
                        const result = processCommand(inputText);
                        if (result) {
                            const resultElement = document.createElement('div');
                            resultElement.innerHTML = result;
                            terminal.appendChild(resultElement);
                        }
                        inputLine.remove();
                        addInputLine();
                    }
                }
            });
        }, 2000);
    }

    // Efeitos Visuais
    function initVisualEffects() {
        // Efeito de glitch aleatório em elementos com a classe glitch
        setInterval(() => {
            document.querySelectorAll('.glitch').forEach(el => {
                if (Math.random() > 0.7) {
                    el.classList.add('glitch-active');
                    setTimeout(() => {
                        el.classList.remove('glitch-active');
                    }, 200);
                }
            });
        }, 5000);
        
        // Efeito de hover nos cartões
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const glow = document.createElement('div');
                glow.className = 'card-glow';
                card.appendChild(glow);
                setTimeout(() => {
                    glow.remove();
                }, 1000);
            });
        });
    }

    // Inicialização
    setActiveMenu();
    initTerminal();
    initVisualEffects();
});