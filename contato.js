document.addEventListener('DOMContentLoaded', function() {
    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio - você pode substituir por código real
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            console.log('Mensagem enviada:', { name, email, message });
            
            // Feedback para o usuário
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Limpa o formulário
            contactForm.reset();
        });
    }

    // Efeito especial nos cards de contato
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 240, 255, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});