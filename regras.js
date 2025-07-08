document.addEventListener('DOMContentLoaded', function() {
    // Sistema de busca
    const searchInput = document.getElementById('rules-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const panels = document.querySelectorAll('.rule-panel');
            
            panels.forEach(panel => {
                const text = panel.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    panel.style.display = 'block';
                    
                    // Destacar o termo encontrado
                    const marks = panel.querySelectorAll('mark');
                    marks.forEach(mark => {
                        mark.outerHTML = mark.innerHTML;
                    });
                    
                    if (searchTerm.length > 2) {
                        panel.innerHTML = panel.innerHTML.replace(
                            new RegExp(searchTerm, 'gi'),
                            match => `<mark>${match}</mark>`
                        );
                    }
                } else {
                    panel.style.display = 'none';
                }
            });
        });
    }

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Tooltips para termos do sistema
    const terms = {
        'NEX': 'Nível de Exposição ao Paranormal - Mede o quanto seu personagem foi exposto ao outro lado',
        'PE': 'Pontos de Esforço - Recurso usado para conjurar rituais',
        'DV': 'Dificuldade do Teste - Número que você precisa superar no dado'
    };

    Object.keys(terms).forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'g');
        document.body.innerHTML = document.body.innerHTML.replace(
            regex,
            `<span class="tooltip" title="${terms[term]}">${term}</span>`
        );
    });

    // Inicializar tooltips
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', function() {
            const tooltipText = document.createElement('div');
            tooltipText.className = 'tooltip-text';
            tooltipText.textContent = this.getAttribute('title');
            this.appendChild(tooltipText);
            
            this.addEventListener('mouseout', function() {
                tooltipText.remove();
            });
        });
    });
});