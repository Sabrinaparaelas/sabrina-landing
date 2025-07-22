// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFAQ();
    initContactForm();
    initCountdown();
    initSmoothScroll();
    initNavbar();
    applyPhoneMask();
});

// FAQ Accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Contact Form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const nome = document.getElementById('nome').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        const pacote = document.getElementById('pacote').value;
        const observacoes = document.getElementById('observacoes').value.trim();
        
        // Validation
        if (!nome || !whatsapp || !email) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        if (!validatePhone(whatsapp)) {
            alert('Por favor, insira um WhatsApp válido.');
            return;
        }
        
        // Create WhatsApp message with correct packages
        const pacoteText = {
            'slim': 'Pacote Slim - R$ 570',
            'admirase': 'Pacote Admira-se - R$ 770',
            'gestante': 'Ensaio Sensual Gestante - R$ 470',
            'aniversario': 'Ensaio de Aniversário - R$ 570',
            'empresarial': 'Ensaio Empresarial - R$ 450'
        };

        let message = `Olá! Gostaria de agendar uma sessão de planejamento 😍\n\n`;
        message += `*Nome:* ${nome}\n`;
        message += `*WhatsApp:* ${whatsapp}\n`;
        message += `*E-mail:* ${email}\n`;
        if (pacote && pacoteText[pacote]) {
            message += `*Pacote de interesse:* ${pacoteText[pacote]}\n`;
        } else {
            message += `*Pacote de interesse:* Não selecionado\n`;
        }
        if (observacoes) {
            message += `*Observações:* ${observacoes}\n`;
        }
        message += `\nEspero retorno para agendarmos! ✨`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp URL with correct number
        const whatsappURL = `https://wa.me/5511969529607?text=${encodedMessage}`;
        
        // Show success message
        showSuccessMessage();
        
        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            form.reset();
        }, 1500);
    });
}

// Package-specific WhatsApp functions
function agendarSlim() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Pacote Slim* (R$ 570). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarAdmirase() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Pacote Admira-se* (R$ 770). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarGestante() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Ensaio Sensual Gestante* (R$ 470). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarAniversario() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Ensaio de Aniversário* (R$ 570). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

function agendarEmpresarial() {
    const message = encodeURIComponent('Olá! Gostaria de agendar o *Ensaio Empresarial* (R$ 450). Podemos conversar sobre disponibilidade?');
    window.open(`https://wa.me/5511969529607?text=${message}`, '_blank');
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation (Brazilian format)
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="background: var(--color-success); color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: center;">
            <strong>✓ Mensagem enviada com sucesso!</strong><br>
            Você será redirecionada para o WhatsApp em instantes...
        </div>
    `;
    
    form.appendChild(successDiv);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Countdown functionality
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Set target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            targetDate.setDate(targetDate.getDate() + 7);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Phone input mask (Brazilian format)
function applyPhoneMask() {
    const phoneInput = document.getElementById('whatsapp');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, function(_, p1, p2, p3) {
                    return `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`;
                });
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, function(_, p1, p2, p3) {
                    return `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`;
                });
            }
        }
        
        e.target.value = value;
    });
}
