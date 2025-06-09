// aqui se espera a que el dom esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    // CARGAR PRODUCTOS DESDE XML
    const contenedor = document.getElementById("catalogo");
    if (contenedor) {
      fetch("productos.xml")
        .then(respuesta => respuesta.text())
        .then(datos => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(datos, "application/xml");
          const productos = xml.getElementsByTagName("producto");
  
          for (let producto of productos) {
            const nombre = producto.getElementsByTagName("nombre")[0].textContent;
            const marca = producto.getElementsByTagName("marca")[0].textContent;
            const precio = producto.getElementsByTagName("precio")[0].textContent;
            const uso = producto.getElementsByTagName("uso")[0].textContent;
            const img = producto.getElementsByTagName("img")[0].textContent;
  
            const card = document.createElement("div");
            card.classList.add("producto");
            card.innerHTML = `
              <img src="${img}" alt="${nombre}">
              <h3>${nombre}</h3>
              <p><strong>Marca:</strong> ${marca}</p>
              <p><strong>Uso:</strong> ${uso}</p>
              <p><strong>Precio:</strong> $${precio} MXN</p>
            `;
            contenedor.appendChild(card);
          }
        })
        .catch(error => console.error("Error al cargar los productos:", error));
    }
  
    // BOTÓN "VER MÁS" en cards individuales
    document.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.closest('.card').querySelector(btn.dataset.target);
        if (target.style.maxHeight && target.style.maxHeight !== '180px') {
          target.style.maxHeight = '180px';
          btn.textContent = 'Ver más';
        } else {
          target.style.maxHeight = target.scrollHeight + 'px';
          btn.textContent = 'Ver menos';
        }
      });
    });
  
    // FORMULARIO DE SUSCRIPCIÓN (PÁGINA 2)
    const formSuscripcion = document.getElementById('formSuscripcion');
    if (formSuscripcion) {
      const emailInput = formSuscripcion.emailSuscriptor;
      const mensajeRespuesta = document.getElementById('mensaje-respuesta');
  
      formSuscripcion.addEventListener('submit', event => {
        event.preventDefault();
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!email) {
          mensajeRespuesta.textContent = "Por favor, ingresa tu correo electrónico para continuar.";
          mensajeRespuesta.style.color = "#bb2649";
          emailInput.focus();
          return;
        }
  
        if (!emailRegex.test(email)) {
          mensajeRespuesta.textContent = "El correo electrónico no es válido. Intenta de nuevo.";
          mensajeRespuesta.style.color = "#bb2649";
          emailInput.focus();
          return;
        }
  
        mensajeRespuesta.textContent = "¡Gracias por suscribirte a Vogue Belleza Premium!";
        mensajeRespuesta.style.color = "#5a214a";
        emailInput.value = "";
      });
    }
  
    // FORMULARIO DE CONTACTO (PÁGINA 3)
    const formContacto = document.getElementById('contactForm');
    const emailContacto = formContacto?.email;
    const emailError = document.getElementById('emailError');
    const thankYouMsg = document.getElementById('thankYouMsg');
  
    if (formContacto && emailContacto) {
      formContacto.addEventListener('submit', e => {
        e.preventDefault();
        const email = emailContacto.value.trim();
        const esGmail = /^[^\s@]+@gmail\.com$/i;
  
        // Validar si termina en @gmail.com
        if (!esGmail.test(email)) {
          emailError.style.display = 'block';
          thankYouMsg.style.display = 'none';
          emailContacto.focus();
          return;
        }
  
        // Todo válido
        emailError.style.display = 'none';
        thankYouMsg.style.display = 'block';
        formContacto.reset();
  
        // Ocultar el mensaje de agradecimiento después de 5 segundos
        setTimeout(() => {
          thankYouMsg.style.display = 'none';
        }, 5000);
      });
    }
  });
  
  // BELLEZA
  // Botón "Ver más" para sección Belleza
  const btnVerMas = document.getElementById("btnVerMas");
  const contenidoExtra = document.getElementById("contenidoExtra");
  
  if (btnVerMas && contenidoExtra) {
    let expandido = false;
  
    btnVerMas.addEventListener("click", () => {
      expandido = !expandido;
  
      if (expandido) {
        contenidoExtra.style.maxHeight = contenidoExtra.scrollHeight + "px";
        btnVerMas.textContent = "Ver menos";
      } else {
        contenidoExtra.style.maxHeight = "0";
        btnVerMas.textContent = "Ver más";
      }
    });
  }