// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // ANOTACIÓN: Menú hamburguesa para dispositivos móviles
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const menu = document.querySelector('.menu');
    
    if (menuHamburguesa && menu) {
        menuHamburguesa.addEventListener('click', function() {
            menu.classList.toggle('activo');
            menuHamburguesa.classList.toggle('activo');
        });
    }
    
    // ANOTACIÓN: Cerrar menú al hacer clic en un enlace (útil en móviles)
    const enlacesMenu = document.querySelectorAll('.menu a');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function() {
            if (menu && menuHamburguesa) {
                menu.classList.remove('activo');
                menuHamburguesa.classList.remove('activo');
            }
        });
    });
    
    // ANOTACIÓN: Animación de las barras de progreso de habilidades
    function animarBarrasHabilidad() {
        const barras = document.querySelectorAll('.progreso-habilidad');
        
        barras.forEach(barra => {
            const progreso = barra.getAttribute('data-progreso');
            if (progreso) {
                barra.style.width = progreso + '%';
            }
        });
    }
    
    // ANOTACIÓN: Ejecutar la animación cuando las habilidades están en viewport
    const seccionHabilidades = document.getElementById('habilidades');
    
    if (seccionHabilidades) {
        // Usar Intersection Observer para detectar cuando la sección es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarBarrasHabilidad();
                    // Dejar de observar después de activar la animación
                    observer.unobserve(seccionHabilidades);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(seccionHabilidades);
    }
    
    //Formulario de contacto - validación y envío
    const formularioContacto = document.getElementById('formulario-contacto');
    
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            if (nombre && email && mensaje) {
                alert('¡Mensaje enviado con éxito! En una implementación real, esto se enviaría a un servidor.');
                formularioContacto.reset();
            } else {
                alert('Por favor, complete todos los campos.');
            }
        });
    }
    
    //  Navegación suave al hacer clic en los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                //Calcular posición considerando la barra de navegación fija
                const offsetTop = targetElement.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    //Efecto de aparición para elementos al hacer scroll
    function observarElementos() {
        const elementos = document.querySelectorAll('.proyecto, .experiencia-item, .sobre-mi-contenido > *');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elementos.forEach(elemento => {
            elemento.style.opacity = 0;
            elemento.style.transform = 'translateY(20px)';
            elemento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(elemento);
        });
    }
    
    // Iniciar la observación de elementos
    observarElementos();
    
    //Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(44, 62, 80, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--color-primario)';
                header.style.backdropFilter = 'none';
            }
        }
    });
});

