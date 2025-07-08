document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const newCharBtn = document.getElementById('new-character');
    const charForm = document.getElementById('character-form');
    const cancelBtn = document.getElementById('cancel-edit');
    const charFormElement = document.getElementById('character-sheet-form');
    const charsGrid = document.getElementById('characters-grid');
    const searchInput = document.getElementById('character-search');
    
    // Dados dos personagens (simulando banco de dados)
    let characters = JSON.parse(localStorage.getItem('op-characters')) || [];
    let currentEditId = null;

    // Inicialização
    renderCharacters();

    // Event Listeners
    newCharBtn.addEventListener('click', showCharForm);
    cancelBtn.addEventListener('click', hideCharForm);
    charFormElement.addEventListener('submit', saveCharacter);
    searchInput.addEventListener('input', filterCharacters);

    // Mostrar formulário para novo personagem
    function showCharForm() {
        currentEditId = null;
        resetForm();
        charForm.style.display = 'block';
        window.scrollTo({ top: charForm.offsetTop, behavior: 'smooth' });
    }

    // Esconder formulário
    function hideCharForm() {
        charForm.style.display = 'none';
    }

    // Resetar formulário
    function resetForm() {
        charFormElement.reset();
        document.getElementById('char-nex').value = '5';
        document.querySelectorAll('.attribute-input input').forEach(input => {
            input.value = '1';
        });
    }

    // Salvar personagem
    function saveCharacter(e) {
        e.preventDefault();
        
        const charData = {
            id: currentEditId || Date.now().toString(),
            name: document.getElementById('char-name').value,
            class: document.getElementById('char-class').value,
            nex: parseInt(document.getElementById('char-nex').value),
            attributes: {
                for: parseInt(document.getElementById('attr-for').value),
                agi: parseInt(document.getElementById('attr-agi').value),
                int: parseInt(document.getElementById('attr-int').value),
                vig: parseInt(document.getElementById('attr-vig').value),
                pre: parseInt(document.getElementById('attr-pre').value)
            },
            createdAt: new Date().toISOString()
        };

        if (currentEditId) {
            // Editar personagem existente
            const index = characters.findIndex(c => c.id === currentEditId);
            if (index !== -1) {
                characters[index] = charData;
            }
        } else {
            // Adicionar novo personagem
            characters.push(charData);
        }

        // Salvar no localStorage
        localStorage.setItem('op-characters', JSON.stringify(characters));
        
        // Atualizar lista e esconder formulário
        renderCharacters();
        hideCharForm();
    }

    // Renderizar lista de personagens
    function renderCharacters(chars = characters) {
        if (chars.length === 0) {
            charsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-slash"></i>
                    <p>NENHUM PERSONAGEM CRIADO</p>
                    <small>Clique em "Novo Personagem" para começar</small>
                </div>
            `;
            return;
        }

        charsGrid.innerHTML = chars.map(character => `
            <div class="character-card" data-id="${character.id}">
                <div class="character-header">
                    <span class="character-name">${character.name}</span>
                    <span class="character-class">${character.class}</span>
                </div>
                <span class="character-nex">NEX ${character.nex}%</span>
                
                <div class="attributes-display">
                    <div class="attr-display">
                        <div class="attr-label">FOR</div>
                        <div class="attr-value">${character.attributes.for}</div>
                    </div>
                    <div class="attr-display">
                        <div class="attr-label">AGI</div>
                        <div class="attr-value">${character.attributes.agi}</div>
                    </div>
                    <div class="attr-display">
                        <div class="attr-label">INT</div>
                        <div class="attr-value">${character.attributes.int}</div>
                    </div>
                    <div class="attr-display">
                        <div class="attr-label">VIG</div>
                        <div class="attr-value">${character.attributes.vig}</div>
                    </div>
                    <div class="attr-display">
                        <div class="attr-label">PRE</div>
                        <div class="attr-value">${character.attributes.pre}</div>
                    </div>
                </div>
                
                <div class="character-actions">
                    <button class="edit-btn cyber-button small">
                        <i class="fas fa-edit"></i> EDITAR
                    </button>
                    <button class="delete-btn cyber-button small secondary">
                        <i class="fas fa-trash"></i> REMOVER
                    </button>
                </div>
            </div>
        `).join('');

        // Adicionar eventos aos botões
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', editCharacter);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', deleteCharacter);
        });
    }

    // Editar personagem
    function editCharacter(e) {
        const card = e.target.closest('.character-card');
        const charId = card.getAttribute('data-id');
        const character = characters.find(c => c.id === charId);
        
        if (character) {
            currentEditId = charId;
            
            // Preencher formulário
            document.getElementById('char-name').value = character.name;
            document.getElementById('char-class').value = character.class;
            document.getElementById('char-nex').value = character.nex;
            document.getElementById('attr-for').value = character.attributes.for;
            document.getElementById('attr-agi').value = character.attributes.agi;
            document.getElementById('attr-int').value = character.attributes.int;
            document.getElementById('attr-vig').value = character.attributes.vig;
            document.getElementById('attr-pre').value = character.attributes.pre;
            
            // Mostrar formulário
            charForm.style.display = 'block';
            window.scrollTo({ top: charForm.offsetTop, behavior: 'smooth' });
        }
    }

    // Deletar personagem
    function deleteCharacter(e) {
        if (!confirm('Tem certeza que deseja remover este personagem?')) return;
        
        const card = e.target.closest('.character-card');
        const charId = card.getAttribute('data-id');
        
        characters = characters.filter(c => c.id !== charId);
        localStorage.setItem('op-characters', JSON.stringify(characters));
        
        renderCharacters();
    }

    // Filtrar personagens
    function filterCharacters() {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = characters.filter(char => 
            char.name.toLowerCase().includes(searchTerm) || 
            char.class.toLowerCase().includes(searchTerm)
        );
        
        renderCharacters(filtered);
    }
});