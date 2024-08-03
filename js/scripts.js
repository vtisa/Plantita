document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrusel
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
        fade: true,
        cssEase: 'linear'
    });

    // Manejador del menú hamburguesa
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    menuIcon.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
        }
    });

    // Efecto parallax
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
    });

    // Animación de entrada de tarjetas
    const animateCards = () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate__fadeInUp');
            }, index * 100);
        });
    };
    animateCards();

    // Cambiar estilo de navegación al hacer scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Calcular y mostrar porcentaje de descuento
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const originalPrice = parseFloat(card.querySelector('.original-price')?.textContent.replace('$', '') || 0);
        const discountedPrice = parseFloat(card.querySelector('.discounted-price')?.textContent.replace('$', '') || 0);
        
        if (originalPrice && discountedPrice) {
            const discountPercentage = ((originalPrice - discountedPrice) / originalPrice * 100).toFixed(2);
            const discountBadge = card.querySelector('.discount-badge');
            if (discountBadge) {
                discountBadge.textContent = `-${discountPercentage}%`;
            }
        }
    });

    // Actualizar año en el footer automáticamente
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Botón "Volver arriba"
    const createBackToTopButton = () => {
        const backToTop = document.createElement('a');
        backToTop.href = '#';
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    };
    createBackToTopButton();

    // Desplazamiento suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy loading para imágenes
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Validación simple para formulario de contacto (si existe)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showNotification('Gracias por tu mensaje. Te contactaremos pronto.');
            this.reset();
        });
    }
});

// Función auxiliar para mostrar notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
