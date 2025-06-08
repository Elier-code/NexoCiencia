document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS con configuración mejorada
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        offset: 50
    });

    // Inicializar Swiper con efectos mejorados
    const swiper = new Swiper('.swiper-container', {
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: ['-120%', 0, -500],
                rotate: [0, 0, -15]
            },
            next: {
                translate: ['120%', 0, -500],
                rotate: [0, 0, 15]
            }
        },
        speed: 1000,
        parallax: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        on: {
            slideChangeTransitionStart: function() {
                // Reiniciar animaciones AOS
                const currentSlide = this.slides[this.activeIndex];
                const animatedElements = currentSlide.querySelectorAll('[data-aos]');
                animatedElements.forEach(el => {
                    el.classList.remove('aos-animate');
                });
            },
            slideChangeTransitionEnd: function() {
                // Activar animaciones AOS
                const currentSlide = this.slides[this.activeIndex];
                const animatedElements = currentSlide.querySelectorAll('[data-aos]');
                animatedElements.forEach(el => {
                    el.classList.add('aos-animate');
                });

                // Animar círculo de progreso si está visible
                if (currentSlide.querySelector('.progress-ring-circle')) {
                    animateProgressCircle();
                }

                // Animar barras de progreso si están visibles
                if (currentSlide.querySelector('.progress-bar')) {
                    animateProgressBars();
                }
            }
        }
    });

    // Función para animar el círculo de progreso
    function animateProgressCircle() {
        const circle = document.querySelector('.progress-ring-circle');
        if (!circle) return;

        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const progress = 85; // Porcentaje de progreso

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        setTimeout(() => {
            const offset = circumference - (progress / 100 * circumference);
            circle.style.strokeDashoffset = offset;
        }, 100);
    }

    // Función para animar las barras de progreso
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Animación de las tarjetas flip
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Animación de la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // Efecto parallax suave en el fondo
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.hero-section').forEach(hero => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
            hero.style.transition = 'transform 0.3s ease-out';
        });
    });

    // Animación del título
    const animateTitle = () => {
        const title = document.querySelector('.animated-text');
        if (title) {
            title.style.animation = 'none';
            title.offsetHeight; // Trigger reflow
            title.style.animation = 'slideInDown 1s ease-out';
        }
    };

    // Inicializar todas las animaciones
    animateProgressCircle();
    animateProgressBars();
}); 