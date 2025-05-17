/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*Menu hidden*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== ADD SHADOW HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header');
    window.scrollY >= 50
        ? header.classList.add('shadow-header')
        : header.classList.remove('shadow-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SWIPER POPULAR ===============*/
const swiperPopular = new Swiper('.popular__swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 32,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    breakpoints: {
        1150: {
            spaceBetween: 80,
        }
    }
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUpBtn = document.getElementById('scroll-up') // Corregido el nombre de la variable
    //When the scroll is higher than 350 viewport height
    // Usar window.scrollY en lugar de this.scrollY en el contexto global del listener
    window.scrollY >= 350 ? scrollUpBtn.classList.add('show-scroll')
                        : scrollUpBtn.classList.remove('show-scroll')
}
window.addEventListener('scroll',scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id'),
        // Corregido el selector para que funcione correctamente
        sectionsClass = document.querySelector('.nav__menu a[href="#' + sectionId +'"]');


    if(sectionsClass){ // Verificar que el elemento exista antes de manipular clases
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
      }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
    // reset: true, // Descomenta si quieres que la animación se repita al hacer scroll hacia arriba
})
sr.reveal(`.popular__swiper, .footer__container, .footer__copy`)
sr.reveal(`.home__shape`, {origin:'bottom'})
sr.reveal(`.home__coffee`, {delay:1000, distance: '200px', duration:1500})
sr.reveal(`.home__splash`, {delay:1600, scale: 0, duration:1500})
sr.reveal(`.home__bean-1, .home__bean-2`, {delay:2200, scale: 0, duration:1500, rotate:{z: 180}})
sr.reveal(`.home__ice-1, .home__ice-2`, {delay:2600, scale: 0, duration:1500, rotate:{z: 180}})
sr.reveal(`.home__leaf`, {delay:2800, scale: 0, duration:1500, rotate:{z: 90}})
sr.reveal(`.home__title`, {delay:3500})
sr.reveal(`.home__data, .home__sticker`, {delay:4000})
sr.reveal(`.about__data`,{origin:'left'})
sr.reveal(`.about__images`,{origin:'right'})
sr.reveal(`.about__coffee`,{delay: 1000})
sr.reveal(`.about__leaf-1, .about__leaf-2`,{delay: 1400, rotate:{z:90}})
sr.reveal(`.products__card, .contact__info`,{interval: 100})
sr.reveal(`.contact__shape`,{delay: 600, scale:0})
sr.reveal(`.contact__delivery`,{delay: 1200})


/*=============== FORMULARIO DE SUSCRIPCIÓN GOOGLE SHEETS ===============*/
// Envolver en DOMContentLoaded para asegurar que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  const subscribeForm = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('footerEmail'); // Asegúrate que este ID coincida con tu input en el footer
  const messageElement = document.getElementById('footerMessage'); // Asegúrate que este ID coincida con tu <p> para mensajes

  // IMPORTANTE: Reemplaza ESTA_URL_CON_LA_TUYA con la URL de tu aplicación web de Google Apps Script
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqhuI8j5bTrHd0ZV6OezIlyakkOZ8jz3GnWBZC7ipp3pGDMFP9Cgsn1ruXmvNsUfRd/exec";

  let messageTimeout;

  function showFooterMessage(text, color, autoHideDelay = 0) {
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }
    if(messageElement){ // Verificar que el elemento exista
        messageElement.textContent = text;
        messageElement.style.color = color;
        messageElement.style.display = 'block';

        if (autoHideDelay > 0) {
        messageTimeout = setTimeout(() => {
            messageElement.textContent = '';
            messageElement.style.display = 'none';
        }, autoHideDelay);
        }
    } else {
        console.warn("Elemento 'footerMessage' no encontrado en el DOM.");
    }
  }

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Verificar que emailInput y messageElement existan antes de usarlos
      if (!emailInput || !messageElement) {
          console.error("Elementos del formulario (emailInput o messageElement) no encontrados.");
          return;
      }

      const email = emailInput.value.trim();

      if (!email) {
        showFooterMessage('Por favor, ingresa tu email.', 'hsl(0, 100%, 60%)', 3000);
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
          showFooterMessage('Por favor, ingresa un email válido.', 'hsl(0, 100%, 60%)', 4000);
          return;
      }

      showFooterMessage('Enviando...', 'hsl(195, 100%, 35%)');

      const formData = new FormData();
      formData.append('email', email); // El 'name' del input en HTML debe ser 'email'

      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          showFooterMessage('¡Gracias por suscribirte!', 'hsl(144, 8.50%, 88.40%)', 5000);
          emailInput.value = '';
        } else {
          const errorMessage = data.message || 'Ocurrió un error. Intenta de nuevo.';
          showFooterMessage(errorMessage, 'hsl(0, 100%, 60%)', 7000);
          console.error('Error from Google Apps Script:', data.message);
        }
      })
      .catch(error => {
        console.error('Error al enviar el formulario:', error);
        showFooterMessage('Error de conexión. Inténtalo más tarde.', 'hsl(0, 100%, 60%)', 7000);
      });
    });
  } else {
    console.warn("Formulario 'subscribeForm' no encontrado en el DOM.");
  }

  // Opcional: Limpiar mensaje al hacer focus en el input
  if (emailInput) {
    emailInput.addEventListener('focus', () => {
      if (messageElement && messageElement.style.display === 'block') {
        if (messageTimeout) clearTimeout(messageTimeout);
        messageElement.textContent = '';
        messageElement.style.display = 'none';
      }
    });
  } else {
    console.warn("Elemento 'footerEmail' no encontrado en el DOM para el listener de focus.");
  }
});