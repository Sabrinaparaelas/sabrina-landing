// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFAQ();
    initContactForm();
    initCountdown();
    initSmoothScroll();
    initNavbar();
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
        
        // Create WhatsApp message
        let message = `Olá! Gostaria de agendar uma sessão de planejamento.`;
        message += `*Nome:* ${nome}\n`;
        message += `*WhatsApp:* ${whatsapp}\n`;
        message += `*E-mail:* ${email}\n`;
        
        if (pacote) {
            const pacoteText = {
                'essencial': 'Pacote Essencial - R$ 297',
                'completo': 'Pacote Completo - R$ 497',
                'premium': 'Pacote Premium - R$ 797'
            };
            message += `*Pacote de interesse:* ${pacoteText[pacote]}\n`;
        }
        
        if (observacoes) {
            message += `*Observações:* ${observacoes}\n`;
        }
        
        message += `\Espero retorno para agendarmos!`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // WhatsApp URL
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
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="background: #d4edda; color: #155724; padding: 16px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            âœ… Dados enviados com sucesso! VocÃª serÃ¡ redirecionada para o WhatsApp em instantes.
        </div>
    `;
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Countdown Timer
function initCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!hoursEl || !minutesEl || !secondsEl) return;
    
    // Set initial values
    let hours = 23;
    let minutes = 45;
    let seconds = 12;
    
    function updateCountdown() {
        // Update display
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        
        // Decrease time
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else {
            // Reset when reaches 00:00:00
            hours = 23;
            minutes = 59;
            seconds = 59;
        }
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll behavior
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition for smooth navbar movement
    navbar.style.transition = 'transform 0.3s ease-in-out';
}

// Package selection helpers
function selectPackage(packageName) {
    const select = document.getElementById('pacote');
    if (select) {
        select.value = packageName;
        
        // Scroll to form
        const form = document.getElementById('formulario');
        if (form) {
            const headerOffset = 80;
            const elementPosition = form.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Add event listeners for package buttons
document.addEventListener('DOMContentLoaded', function() {
    const packageButtons = document.querySelectorAll('.package-item .btn');
    
    packageButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const packages = ['essencial', 'completo', 'premium'];
            selectPackage(packages[index]);
        });
    });
});

// Gallery lightbox effect (simple modal)
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Simple click effect for demonstration
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    
    input.value = value;
}

// Add phone formatting to WhatsApp input
document.addEventListener('DOMContentLoaded', function() {
    const whatsappInput = document.getElementById('whatsapp');
    
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
        
        whatsappInput.addEventListener('keypress', function(e) {
            // Only allow numbers
            if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Enter'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
});

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all content is loaded
    setTimeout(() => {
        initScrollAnimations();
        initGallery();
    }, 100);
});

// Utility function to track form interactions (for analytics)
function trackFormInteraction(field) {
    // This would typically send data to an analytics service
    console.log(`Form field interacted: ${field}`);
}

// Add form interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    const formFields = ['nome', 'whatsapp', 'email', 'pacote'];
    
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('focus', function() {
                trackFormInteraction(fieldId);
            });
        }
    });
});

// Error handling for form submission
function handleFormError(error) {
    console.error('Form submission error:', error);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #f8d7da; color: #721c24; padding: 16px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            âŒ Ocorreu um erro. Por favor, tente novamente ou entre em contato via WhatsApp.
        </div>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}
