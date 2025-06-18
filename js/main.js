// Lottie Animations
lottie.loadAnimation({
  container: document.getElementById('lottie-hero-2'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets2.lottiefiles.com/packages/lf20_3rwasyjy.json'
});

lottie.loadAnimation({
  container: document.getElementById('lottie-why'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets10.lottiefiles.com/packages/lf20_9wpyhdzo.json',
  rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
});

// WhatsApp Button: Transparent background, animated pulse
const whatsappBtn = document.createElement('a');
whatsappBtn.href = "https://wa.me/213561631866";
whatsappBtn.target = "_blank";
whatsappBtn.id = "whatsapp-btn";
whatsappBtn.setAttribute('aria-label', 'Contacter sur WhatsApp');
whatsappBtn.style.cssText = `
  position:fixed;
  bottom:32px;
  right:32px;
  z-index:9999;
  text-decoration:none;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const whatsappButton = document.createElement('button');
whatsappButton.setAttribute('aria-label', 'Contacter sur WhatsApp');
whatsappButton.style.cssText = `
  background: transparent;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;
  box-shadow: 0 0 0 0 rgba(37,211,102,0.7);
  transition: box-shadow 0.3s, transform 0.2s;
`;

whatsappButton.innerHTML = `<i class="fab fa-whatsapp" style="color:#25D366;font-size:2em;z-index:1;position:relative;"></i>`;
whatsappBtn.appendChild(whatsappButton);
document.body.appendChild(whatsappBtn);

// Pulse effect using a span element
const pulseSpan = document.createElement('span');
pulseSpan.style.cssText = `
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  background: rgba(37,211,102,0.25);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(1);
  opacity: 0.7;
  z-index: 0;
  pointer-events: none;
  animation: whatsapp-pulse-span 1.1s infinite cubic-bezier(.66,0,0,1);
`;
whatsappButton.insertBefore(pulseSpan, whatsappButton.firstChild);

// WhatsApp Button Styles
const style = document.createElement('style');
style.textContent = `
  @keyframes whatsapp-pulse-span {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
    }
    70% {
      transform: translate(-50%, -50%) scale(1.8);
      opacity: 0.12;
    }
    100% {
      transform: translate(-50%, -50%) scale(2.2);
      opacity: 0;
    }
  }
  #whatsapp-btn button:hover, #whatsapp-btn button:focus {
    background: rgba(37,211,102,0.10) !important;
    transform: scale(1.13);
    box-shadow: 0 4px 24px rgba(37,211,102,0.25);
  }
`;
document.head.appendChild(style);

if (whatsappBtn) {
  const btn = whatsappBtn.querySelector('button');
  btn.style.background = 'rgba(37,211,102,0.15)';
  btn.style.boxShadow = '0 0 0 0 rgba(37,211,102,0.5)';
  btn.style.transition = 'box-shadow 0.4s, background 0.3s';

  // Add pulse animation via CSS
  const style = document.createElement('style');
  style.textContent = `
    #whatsapp-btn button {
      animation: whatsapp-pulse 1.5s infinite;
    }
    @keyframes whatsapp-pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(37,211,102,0.5);
      }
      70% {
        box-shadow: 0 0 0 16px rgba(37,211,102,0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(37,211,102,0);
      }
    }
    #whatsapp-btn button:hover {
      background: rgba(37,211,102,0.25) !important;
      transform: scale(1.1);
      box-shadow: 0 4px 20px rgba(37,211,102,0.3), 0 0 0 16px rgba(37,211,102,0.15);
    }
  `;
  document.head.appendChild(style);
}

// Duplicate WhatsApp button (for fallback/legacy reasons)
document.body.insertAdjacentHTML('beforeend', `
  <a href="https://wa.me/213561631866" target="_blank" id="whatsapp-btn" style="position:fixed;bottom:32px;right:32px;z-index:9999;text-decoration:none;">
    <button aria-label="Contacter sur WhatsApp" style="background:#25D366;border:none;border-radius:50%;width:60px;height:60px;box-shadow:0 2px 12px rgba(0,0,0,0.15);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;">
      <i class="fab fa-whatsapp" style="color:#fff;font-size:2em;transition:transform 0.2s;"></i>
    </button>
  </a>
  <style>
    #whatsapp-btn button:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
    }
    #whatsapp-btn button:active {
      transform: scale(0.95);
    }
  </style>
`);

// Sticky nav active link + smooth scroll
const navLinks = document.querySelectorAll('nav a');
const sections = Array.from(document.querySelectorAll('section'));

function setActiveLink() {
  let index = sections.length;
  while (--index && window.scrollY + 80 < sections[index].offsetTop) {}
  navLinks.forEach(link => link.classList.remove('active'));
  navLinks[index].classList.add('active');
}
setActiveLink();
window.addEventListener('scroll', setActiveLink);

// Hamburger menu
const navToggle = document.getElementById('navToggle');
const navUl = document.getElementById('navLinks');

function closeMenuOnClickOutside(e) {
  if (!navUl.classList.contains('open')) return;
  // If click is on a nav link, do nothing (let link handler close menu)
  if (e.target.closest('a') && navUl.contains(e.target)) return;
  // If click is inside navUl (but not on a link), close menu
  if (navUl.contains(e.target) || !navToggle.contains(e.target)) {
    navUl.classList.remove('open');
    document.removeEventListener('click', closeMenuOnClickOutside, true);
  }
}

if (navToggle && navUl) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navUl.classList.toggle('open');
    if (navUl.classList.contains('open')) {
      setTimeout(() => document.addEventListener('click', closeMenuOnClickOutside, true), 0);
    } else {
      document.removeEventListener('click', closeMenuOnClickOutside, true);
    }
  });
  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navUl.classList.toggle('open');
      if (navUl.classList.contains('open')) {
        setTimeout(() => document.addEventListener('click', closeMenuOnClickOutside, true), 0);
      } else {
        document.removeEventListener('click', closeMenuOnClickOutside, true);
      }
    }
  });
  navUl.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    navUl.classList.remove('open');
    document.removeEventListener('click', closeMenuOnClickOutside, true);
  }));
  const navCloseBtn = navUl.querySelector('.nav-close-btn');
  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', function(e) {
      navUl.classList.remove('open');
      document.removeEventListener('click', closeMenuOnClickOutside, true);
    });
  }
}

// Smooth scroll for anchor links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-in animations
function revealOnScroll() {
  document.querySelectorAll('.section-title, .section-desc, .about-content, .products-grid, .services-list, .why-choose, .contact-wrap').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Year in footer
document.getElementById('displayYear').textContent = new Date().getFullYear();

// Modal logic for product variations
const modal = document.getElementById('variationModal');
const modalContent = modal.querySelector('.modal-content');
const modalTitle = document.getElementById('modalTitle');
const modalVariations = document.getElementById('modalVariations');

const closeModal = () => {
  modal.classList.remove('active');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
};

// Open modal with variations
document.querySelectorAll('.product-card').forEach(card => {
  const variations = card.querySelector('.product-variations-data');
  card.addEventListener('click', function(e) {
    if (!e.target.classList.contains('variation-link')) {
      modalTitle.textContent = card.querySelector('h3').textContent;
      modalVariations.innerHTML = '';
      variations.querySelectorAll('.variation-link').forEach(link => {
        const clone = link.cloneNode(true);
        modalVariations.appendChild(clone);
      });
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 10);
      setTimeout(() => modalContent.focus(), 100);
      e.stopPropagation();
    }
  });
  card.addEventListener('keydown', function(e) {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === card) {
      e.preventDefault();
      modalTitle.textContent = card.querySelector('h3').textContent;
      modalVariations.innerHTML = '';
      variations.querySelectorAll('.variation-link').forEach(link => {
        const clone = link.cloneNode(true);
        modalVariations.appendChild(clone);
      });
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 10);
      setTimeout(() => modalContent.focus(), 100);
    }
  });
});

// Close modal on backdrop or close button
modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
modal.querySelector('.modal-close').addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (modal.classList.contains('active') && e.key === 'Escape') closeModal();
});

// Prevent click inside modal from closing
modalContent.addEventListener('click', e => e.stopPropagation());

// Preloader logic
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
  document.getElementById("content").style.display = "block";
});

/* Back to Top Button */
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.setAttribute('aria-label', 'Retour en haut');
backToTopBtn.innerHTML = '<svg width="24" height="24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
backToTopBtn.style.cssText = `
  position:fixed;
  left:24px;
  bottom:104px;
  width:48px;
  height:48px;
  border:none;
  border-radius:50%;
  background:#222;
  color:#fff;
  box-shadow:0 2px 12px rgba(0,0,0,0.15);
  cursor:pointer;
  display:none;
  align-items:center;
  justify-content:center;
  z-index:9999;
  transition:opacity 0.3s,transform 0.3s;
  opacity:0;
  padding:0;
`;
document.body.appendChild(backToTopBtn);

// Responsive adjustments for Back to Top Button
const updateBackToTopPosition = () => {
  if (window.innerWidth < 600) {
    backToTopBtn.style.left = '16px';
    backToTopBtn.style.bottom = '88px';
    backToTopBtn.style.width = '40px';
    backToTopBtn.style.height = '40px';
  } else {
    backToTopBtn.style.left = '24px';
    backToTopBtn.style.bottom = '104px';
    backToTopBtn.style.width = '48px';
    backToTopBtn.style.height = '48px';
  }
};
window.addEventListener('resize', updateBackToTopPosition);
updateBackToTopPosition();

// Show/hide Back to Top Button on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'flex';
    setTimeout(() => {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.transform = 'scale(1)';
    }, 10);
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      backToTopBtn.style.display = 'none';
    }, 300);
  }
});

// Scroll to top on click
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


 // Hide preloader when page is fully loaded, but keep it visible a bit longer
    window.addEventListener('load', function() {
      var loader = document.getElementById('steelLoader');
      if(loader) {
        setTimeout(function() {
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(function() {
            loader.style.display = 'none';
          }, 400);
        }, 100); // Increased delay before fade out (was 0, now 1200ms)
      }
    });

// Contact Form Submission to Telegram Bot
const botToken = '7966914169:AAHKYei-fsHa1s4EBoKw5KxqW3l4wGHuLfg';
const chatId = '6279056565';

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById('formStatus');
  status.textContent = "Envoi en cours...";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();
  const file = document.getElementById('fileInput').files[0];

  // ✅ Algerian phone number validation
  const algerianPhoneRegex = /^(05|06|07)[0-9]{8}$/;
  if (!algerianPhoneRegex.test(phone)) {
    status.textContent = "Veuillez entrer un numéro de téléphone valide (ex: 0551234567)";
    return;
  }

  // ✅ File type validation
  if (file) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      status.textContent = 'Seuls les fichiers PDF et images sont autorisés.';
      return;
    }
  }

  const telegramText = `*Nouveau consultation:*\n👤 Nom: ${name}\n📧 Email: ${email}\n📞 Téléphone: ${phone}\n📝 Message: ${message}`;

  try {
    // 1. Send message to Telegram
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'Markdown'
      })
    });

    // 2. Send file to Telegram if uploaded
    if (file) {
      const tgFormData = new FormData();
      tgFormData.append('chat_id', chatId);
      tgFormData.append('document', file);

      await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
        method: 'POST',
        body: tgFormData
      });
    }

    status.textContent = "Message envoyé avec succès !";
    form.reset();

  } catch (error) {
    console.error(error);
    status.textContent = "Erreur lors de l'envoi. Veuillez réessayer.";
  }
});

// Prevent non-digit input
document.getElementById('phoneInput').addEventListener('input', function (e) {
  this.value = this.value.replace(/\D/g, ''); // Remove all non-digits
});


// Modern Light Mode Toggle
  (function() {
    const hero = document.getElementById('hero');
    const btn = document.getElementById('hero-light-toggle');
    const icon = document.getElementById('toggle-icon');
    const header = document.querySelector('header');
    let isLight = true; // Default to light mode
    // Set initial state to light mode
    hero.classList.add('light-hero');
    btn.classList.add('active');
    icon.className = 'fas fa-moon';
    header.classList.add('light-navbar');
    btn.addEventListener('click', function() {
      isLight = !isLight;
      hero.classList.toggle('light-hero', isLight);
      btn.classList.toggle('active', isLight);
      icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
      header.classList.toggle('light-navbar', isLight);
    });
  })();
