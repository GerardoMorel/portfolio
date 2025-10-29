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

// ======================
// 🌙 TEMA (oscuro/claro)
// ======================
const btnTema = document.getElementById('btn-tema');
const bodyEl  = document.body;

// inicializa por preferencia guardada
if (localStorage.getItem('tema') === 'oscuro') {
  bodyEl.classList.add('dark-mode');
  if (btnTema) btnTema.textContent = '☀️';
}

if (btnTema) {
  btnTema.addEventListener('click', () => {
    bodyEl.classList.toggle('dark-mode');
    const oscuro = bodyEl.classList.contains('dark-mode');
    btnTema.textContent = oscuro ? '☀️' : '🌙';
    localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
  });
}

// ======================
// 🌍 IDIOMA (ES / EN / PT)
// ======================
const btnIdioma = document.getElementById('btn-idioma');
let idiomaActual = localStorage.getItem('idioma') || 'es';

// Traducciones completas (menu, hero, sobre mí, habilidades, experiencia, formación, proyectos, contacto, footer)
const traducciones = {
  es: {
    // Menú
    menu: { inicio: "Inicio", sobreMi: "Sobre Mí", habilidades: "Habilidades", experiencia: "Experiencia", proyectos: "Proyectos", contacto: "Contacto" },
    // Hero
    heroTituloHTML: "Hola, soy <span class='texto-destacado'>Gerardo Morel</span>",
    heroSub: "Desarrollador Web & Técnico Informático",
    heroBtnProyectos: "Ver mis proyectos",
    heroBtnContacto: "Contactarme",
    // Sobre mí
    sobreMiTitulo: "Sobre Mí",
    sobreMiP1: "Soy una persona proactiva, organizada y responsable con excelentes habilidades interpersonales. Me destaco por mi firme compromiso con el cumplimiento de mis obligaciones de forma eficiente y profesional.",
    sobreMiP2: "Busco un puesto estimulante en el que pueda seguir desarrollando mis habilidades, crecer profesionalmente y contribuir al éxito de la organización.",
    sobreMiP3: "Además de desarrollo web, tengo conocimientos en SEO, Marketing digital, embudos de ventas, modificación de CTR y palabras clave en dominios WEB.",
    sobreMiBtn: "Contactarme",
    // Habilidades
    habilidadesTitulo: "Mis Habilidades",
    // Experiencia
    experienciaTitulo: "Experiencia Laboral",
    trabajos: [
      { puesto: "Desarrollador Web", empresa: "Freelance", periodo: "2020 - Presente", desc: "Trabajando en proyectos freelancer de desarrollo web, utilizando conocimientos en HTML5, CSS3, JavaScript y React.js." },
      { puesto: "Asistente Administrativo", empresa: "Remotask", periodo: "2020 - Presente", desc: "Realizando tareas administrativas con diferentes suites de Ofimática, como Microsoft Office, Google Sheets, Libre Office, etc." },
      { puesto: "Supervisor de Zona", empresa: "SONDA Argentina", periodo: "2018 - 2019", desc: "Realizando tareas de instalación de pisos tecnológicos, contratación de personal, diagramación de redes informáticas y supervisión de su estado y funcionamiento." },
      { puesto: "Técnico Informático", empresa: "Seguridad Misiones", periodo: "2017 - 2018", desc: "Cumpliendo funciones de reparación, instalación de alarmas y CCTV (Circuito Cerrado de Televisión)." }
    ],
    // Formación
    formacionTitulo: "Formación Académica",
    educacion: [
      { titulo: "Autodidacta", periodo: "2020 - Presente", desc: "Desarrollo web con conocimientos en HTML, CSS, Javascript y React.js. Además de contar con conocimientos en SEO y Marketing digital." },
      { titulo: "Facultad de Ingeniería de Misiones UNAM", periodo: "2006 - 2009", desc: "Completando el Ciclo básico con conocimientos en Ingeniería Electrónica." },
      { titulo: "Colegio \"San Francisco\"", periodo: "2000 - 2005", desc: "Graduado en Humanidades y Ciencias Sociales." }
    ],
    // Proyectos
    proyectosTitulo: "Mis Proyectos",
    proyectoCards: [
      { h3: "Gera's Food Landing Page", p: "Sitio web desarrollado con HTML5, CSS3 y JavaScript. Proyecto personal orientado al diseño UI/UX Responsivo.", btn: "Ver en GitHub" },
      { h3: "CV Web Interactivo", p: "CV web responsive con diseño moderno, sidebar interactiva y optimización de accesibilidad.", btn: "Ver en GitHub" },
      { h3: "Optimización SEO", p: "Proyecto de optimización para motores de búsqueda.", btn: "Ver en GitHub" }
    ],
    verTodos: "Ver Código Fuente",
    verSitio: "Ver Sitio",
    // Contacto
    contactoTitulo: "Contacto",
    hablemos: "¡Hablemos!",
    contactoTexto: "Si tienes un proyecto en mente o simplemente quieres saludar, no dudes en contactarme.",
    formLabels: { nombre: "Nombre", email: "Email", mensaje: "Mensaje", enviar: "Enviar mensaje" },
    // Footer
    footer: "© 2023 Gerardo Morel. Todos los derechos reservados.",
    // Botón idioma
    btnIdioma: "ES"
  },

  en: {
    menu: { inicio: "Home", sobreMi: "About Me", habilidades: "Skills", experiencia: "Experience", proyectos: "Projects", contacto: "Contact" },
    heroTituloHTML: "Hi, I'm <span class='texto-destacado'>Gerardo Morel</span>",
    heroSub: "Web Developer & IT Technician",
    heroBtnProyectos: "See my projects",
    heroBtnContacto: "Contact me",
    sobreMiTitulo: "About Me",
    sobreMiP1: "I am proactive, organized, and responsible, with strong interpersonal skills. I am committed to fulfilling my duties efficiently and professionally.",
    sobreMiP2: "I am looking for a stimulating position where I can continue developing my skills, grow professionally, and contribute to the organization's success.",
    sobreMiP3: "Besides web development, I have knowledge in SEO, digital marketing, sales funnels, CTR optimization and keyword strategy for web domains.",
    sobreMiBtn: "Contact me",
    habilidadesTitulo: "My Skills",
    experienciaTitulo: "Work Experience",
    trabajos: [
      { puesto: "Web Developer", empresa: "Freelance", periodo: "2020 - Present", desc: "Working on freelance web projects using HTML5, CSS3, JavaScript, and React.js." },
      { puesto: "Administrative Assistant", empresa: "Remotask", periodo: "2020 - Present", desc: "Performing administrative tasks with Microsoft Office, Google Sheets, LibreOffice, etc." },
      { puesto: "Area Supervisor", empresa: "SONDA Argentina", periodo: "2018 - 2019", desc: "Tech floor installations, staff hiring, network layout and supervision." },
      { puesto: "IT Technician", empresa: "Seguridad Misiones", periodo: "2017 - 2018", desc: "Maintenance and installation of alarms and CCTV systems." }
    ],
    formacionTitulo: "Academic Background",
    educacion: [
      { titulo: "Self-taught", periodo: "2020 - Present", desc: "Web development with HTML, CSS, JavaScript, and React.js. Also experienced in SEO and Digital Marketing." },
      { titulo: "Faculty of Engineering of Misiones UNAM", periodo: "2006 - 2009", desc: "Completed the basic cycle with a focus on Electronic Engineering." },
      { titulo: "'San Francisco' High School", periodo: "2000 - 2005", desc: "Graduated in Humanities and Social Sciences." }
    ],
    proyectosTitulo: "My Projects",
    proyectoCards: [
      { h3: "Gera's Food Landing Page", p: "Website developed with HTML5, CSS3, and JavaScript. Personal project focused on responsive UI/UX design.", btn: "View Site" },
      { h3: "Interactive Web CV", p: "Responsive web CV with modern design, interactive sidebar, and accessibility optimization.", btn: "View on GitHub" },
      { h3: "SEO Optimization", p: "Search engine optimization project.", btn: "View on GitHub" }
    ],
    verTodos: "View Source Code",
    verSitio: "View Site",
    contactoTitulo: "Contact",
    hablemos: "Let's talk!",
    contactoTexto: "If you have a project in mind or just want to say hi, feel free to reach out.",
    formLabels: { nombre: "Name", email: "Email", mensaje: "Message", enviar: "Send message" },
    footer: "© 2023 Gerardo Morel. All rights reserved.",
    btnIdioma: "EN"
  },

  pt: {
    menu: { inicio: "Início", sobreMi: "Sobre Mim", habilidades: "Habilidades", experiencia: "Experiência", proyectos: "Projetos", contacto: "Contato" },
    heroTituloHTML: "Olá, sou <span class='texto-destacado'>Gerardo Morel</span>",
    heroSub: "Desenvolvedor Web & Técnico de TI",
    heroBtnProyectos: "Ver meus projetos",
    heroBtnContacto: "Falar comigo",
    sobreMiTitulo: "Sobre Mim",
    sobreMiP1: "Sou proativo, organizado e responsável, com ótimas habilidades interpessoais. Tenho um forte compromisso em cumprir minhas obrigações de forma eficiente e profissional.",
    sobreMiP2: "Busco uma posição estimulante onde eu possa continuar desenvolvendo minhas habilidades, crescer profissionalmente e contribuir para o sucesso da organização.",
    sobreMiP3: "Além de desenvolvimento web, tenho conhecimentos em SEO, marketing digital, funis de venda, otimização de CTR e palavras-chave para domínios web.",
    sobreMiBtn: "Falar comigo",
    habilidadesTitulo: "Minhas Habilidades",
    experienciaTitulo: "Experiência Profissional",
    trabajos: [
      { puesto: "Desenvolvedor Web", empresa: "Freelance", periodo: "2020 - Presente", desc: "Projetos web freelance usando HTML5, CSS3, JavaScript e React.js." },
      { puesto: "Assistente Administrativo", empresa: "Remotask", periodo: "2020 - Presente", desc: "Tarefas administrativas com Microsoft Office, Google Sheets, LibreOffice, etc." },
      { puesto: "Supervisor de Área", empresa: "SONDA Argentina", periodo: "2018 - 2019", desc: "Instalação de pisos tecnológicos, contratação de pessoal, layout e supervisão de redes." },
      { puesto: "Técnico de TI", empresa: "Seguridad Misiones", periodo: "2017 - 2018", desc: "Manutenção e instalação de alarmes e sistemas de CFTV." }
    ],
    formacionTitulo: "Formação Acadêmica",
    educacion: [
      { titulo: "Autodidata", periodo: "2020 - Presente", desc: "Desenvolvimento web com HTML, CSS, JavaScript e React.js. Também com experiência em SEO e Marketing Digital." },
      { titulo: "Faculdade de Engenharia de Misiones UNAM", periodo: "2006 - 2009", desc: "Conclusão do ciclo básico com foco em Engenharia Eletrônica." },
      { titulo: "Colégio 'San Francisco'", periodo: "2000 - 2005", desc: "Formado em Humanidades e Ciências Sociais." }
    ],
    proyectosTitulo: "Meus Projetos",
    proyectoCards: [
      { h3: "Gera's Food Landing Page", p: "Site desenvolvido com HTML5, CSS3 e JavaScript. Projeto pessoal voltado para o design UI/UX responsivo.", btn: "Ver no GitHub" },
      { h3: "CV Web Interativo", p: "CV web responsivo com design moderno, barra lateral interativa e otimização de acessibilidade.", btn: "Ver no GitHub" },
      { h3: "Otimização de SEO", p: "Projeto de otimização para mecanismos de busca.", btn: "Ver no GitHub" }
    ],
    verTodos: "Ver Código-Fonte",
    verSitio: "Ver Site",
    contactoTitulo: "Contato",
    hablemos: "Vamos conversar!",
    contactoTexto: "Se você tem um projeto em mente ou só quer dizer oi, fale comigo.",
    formLabels: { nombre: "Nome", email: "Email", mensaje: "Mensagem", enviar: "Enviar mensagem" },
    footer: "© 2023 Gerardo Morel. Todos os direitos reservados.",
    btnIdioma: "PT"
  }
};

// Aplica traducción a todos los elementos visibles
function aplicarTraduccion(lang) {
  const t = traducciones[lang];
  if (!t) return;

  // Menú
  const setText = (sel, val) => { const el = document.querySelector(sel); if (el) el.textContent = val; };
  const setHTML = (sel, val) => { const el = document.querySelector(sel); if (el) el.innerHTML = val; };

  setText('a[href="#inicio"]',     t.menu.inicio);
  setText('a[href="#sobre-mi"]',   t.menu.sobreMi);
  setText('a[href="#habilidades"]',t.menu.habilidades);
  setText('a[href="#experiencia"]',t.menu.experiencia);
  setText('a[href="#proyectos"]',  t.menu.proyectos);
  setText('a[href="#contacto"]',   t.menu.contacto);

  // Hero
  setHTML('.hero-content h1', t.heroTituloHTML);
  const heroBtns = document.querySelectorAll('#inicio .btn');
  if (heroBtns[0]) heroBtns[0].textContent = t.heroBtnProyectos; // link a #proyectos
  if (heroBtns[1]) heroBtns[1].textContent = t.heroBtnContacto;  // link a #contacto
  setText('.hero-content p', t.heroSub);

  // Sobre mí
  setText('#sobre-mi .titulo-seccion', t.sobreMiTitulo);
  const sobreParrafos = document.querySelectorAll('#sobre-mi .sobre-mi-texto p');
  if (sobreParrafos[0]) sobreParrafos[0].textContent = t.sobreMiP1;
  if (sobreParrafos[1]) sobreParrafos[1].textContent = t.sobreMiP2;
  if (sobreParrafos[2]) sobreParrafos[2].textContent = t.sobreMiP3;
  setText('#sobre-mi .sobre-mi-texto .btn', t.sobreMiBtn);

  // Habilidades
  setText('#habilidades .titulo-seccion', t.habilidadesTitulo);

  // Experiencia
  setText('#experiencia .titulo-seccion', t.experienciaTitulo);
  const expItems = document.querySelectorAll('#experiencia .experiencia-item');
  for (let i = 0; i < Math.min(expItems.length, t.trabajos.length); i++) {
    const it = expItems[i], data = t.trabajos[i];
    const h3 = it.querySelector('h3'), h4 = it.querySelector('h4');
    const fecha = it.querySelector('.experiencia-fecha');
    const desc = it.querySelector('.experiencia-descripcion');
    if (h3)   h3.textContent = data.puesto;
    if (h4)   h4.textContent = data.empresa;
    if (fecha)fecha.textContent = data.periodo;
    if (desc) desc.textContent = data.desc;
  }

  // Formación (sección con id="formacion")
  const formacion = document.querySelector('#formacion');
  if (formacion) {
    setText('#formacion .titulo-seccion', t.formacionTitulo);
    const eduItems = formacion.querySelectorAll('.experiencia-item, .educacion-item');
    for (let i = 0; i < Math.min(eduItems.length, t.educacion.length); i++) {
      const it = eduItems[i], data = t.educacion[i];
      const h3 = it.querySelector('h3');
      const fecha = it.querySelector('.experiencia-fecha, .fecha');
      // primer <p> de descripción que no sea .fecha
      const desc = it.querySelector('.experiencia-descripcion') || it.querySelector('p:not(.fecha)');
      if (h3)   h3.textContent = data.titulo;
      if (fecha)fecha.textContent = data.periodo;
      if (desc) desc.textContent = data.desc;
    }
  }

  // Proyectos
  setText('#proyectos .titulo-seccion', t.proyectosTitulo);
  const cards = document.querySelectorAll('#proyectos .proyecto');
  for (let i = 0; i < Math.min(cards.length, t.proyectoCards.length); i++) {
    const card = cards[i], data = t.proyectoCards[i];
    const h3 = card.querySelector('.proyecto-info h3');
    const p  = card.querySelector('.proyecto-info p');
    const btn= card.querySelector('.proyecto-info .btn');
    if (h3) h3.textContent = data.h3;
    if (p)  p.textContent  = data.p;
    if (btn)btn.textContent= data.btn;
  }
  const verTodosBtn = document.querySelector('#proyectos a.btn[href*="github"]');
  if (verTodosBtn) verTodosBtn.textContent = t.verTodos;
  const verSitioBtn = document.querySelector('#proyectos a.btn-ver-sitio');
  if (verSitioBtn) verSitioBtn.textContent = t.verSitio;
  // Contacto
  setText('#contacto .titulo-seccion', t.contactoTitulo);
  setText('#contacto .info-contacto h3', t.hablemos);
  setText('#contacto .info-contacto > p', t.contactoTexto);
  setText('label[for="nombre"]', t.formLabels.nombre);
  setText('label[for="email"]', t.formLabels.email);
  setText('label[for="mensaje"]', t.formLabels.mensaje);
  setText('#contacto button[type="submit"]', t.formLabels.enviar);

  // Footer (si quieres traducirlo también)
  const footerP = document.querySelector('footer p');
  if (footerP) footerP.textContent = t.footer;

  // Botón que muestra el idioma actual
  if (btnIdioma) btnIdioma.textContent = t.btnIdioma;

  localStorage.setItem('idioma', lang);
}

// Inicializa traducción
aplicarTraduccion(idiomaActual);

// Click del botón para rotar ES → EN → PT
if (btnIdioma) {
  btnIdioma.addEventListener('click', () => {
    idiomaActual = idiomaActual === 'es' ? 'en' : (idiomaActual === 'en' ? 'pt' : 'es');
    aplicarTraduccion(idiomaActual);
  });
}




