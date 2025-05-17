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
    const scrollUpBtn = document.getElementById('scroll-up')
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
        sectionsClass = document.querySelector('.nav__menu a[href="#' + sectionId +'"]');

    if(sectionsClass){
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
document.addEventListener('DOMContentLoaded', function() {
  const subscribeForm = document.getElementById('subscribeForm');
  const emailInput = document.getElementById('footerEmail');
  const messageElement = document.getElementById('footerMessage');

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxqhuI8j5bTrHd0ZV6OezIlyakkOZ8jz3GnWBZC7ipp3pGDMFP9Cgsn1ruXmvNsUfRd/exec";

  // --- CONFIGURACIÓN DEL ENLACE DE DESCARGA DEL PDF ---
  // Reemplaza esto con el enlace de descarga directa de tu PDF
  const pdfDownloadURL = "https://drive.google.com/file/d/1ndBakfQeSnG4iXjxGb2EKCkxjWfuLSiz/view?usp=sharing"; // <--- ¡¡REEMPLAZA ESTO!!
  const pdfDownloadLinkText = "Descargar Regalo PDF"; // Texto para el enlace

  // Tiempo en milisegundos para que el mensaje de éxito (con enlace) se oculte.
  const successMessageWithLinkHideDelay = 30000; // 30 segundos

  let messageTimeout;

  // MODIFICADA LA FUNCIÓN showFooterMessage para incluir el enlace
  function showFooterMessage(text, color, autoHideDelay = 0, showDownloadLink = false) {
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }
    if(messageElement){
        messageElement.innerHTML = ''; // Limpiar contenido previo (importante para el enlace)
        const textNode = document.createTextNode(text);
        messageElement.appendChild(textNode);
        messageElement.style.color = color;
        messageElement.style.display = 'block';

        if (showDownloadLink && pdfDownloadURL) {
            const link = document.createElement('a');
            link.href = pdfDownloadURL;
            link.textContent = pdfDownloadLinkText;
            link.target = "_blank";
            link.style.display = "block";
            link.style.marginTop = "8px";
            link.style.fontWeight = "600";
            link.style.color = "hsl(195, 100%, 35%)"; // Color de enlace (ajusta si es necesario)
            messageElement.appendChild(link);
        }

        let finalHideDelay = autoHideDelay;
        if (showDownloadLink && autoHideDelay === 0 && pdfDownloadURL) {
            finalHideDelay = successMessageWithLinkHideDelay;
        }

        if (finalHideDelay > 0) {
            messageTimeout = setTimeout(() => {
                messageElement.innerHTML = '';
                messageElement.style.display = 'none';
            }, finalHideDelay);
        }
    } else {
        console.warn("Elemento 'footerMessage' no encontrado en el DOM.");
    }
  }

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      if (!emailInput || !messageElement) {
          console.error("Elementos del formulario no encontrados.");
          return;
      }

      if (messageTimeout) clearTimeout(messageTimeout);
      if (messageElement) {
          messageElement.innerHTML = '';
          messageElement.style.display = 'none';
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
      formData.append('email', email);

      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          // MODIFICADA LA LLAMADA PARA ÉXITO para mostrar el enlace
          showFooterMessage('¡Gracias por suscribirte!', 'hsl(144, 20.00%, 95.10%)', 0, true); // Antes era: ('¡Gracias por suscribirte!', 'hsl(144, 8.50%, 88.40%)', 5000);
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

  if (emailInput) {
    emailInput.addEventListener('focus', () => {
      if (messageElement && messageElement.style.display === 'block') {
        if (messageTimeout) clearTimeout(messageTimeout);
        messageElement.innerHTML = '';
        messageElement.style.display = 'none';
      }
    });
  } else {
    console.warn("Elemento 'footerEmail' no encontrado para el listener de focus.");
  }
});