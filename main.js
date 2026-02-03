let sr = ScrollReveal({
  duration: 1200,
  distance: "80px",
  reset: true,
});

sr.reveal(".text-reveal-top-100", { origin: "top", delay: 100 });
sr.reveal(".text-reveal-left-100", { origin: "left", delay: 100 });
sr.reveal(".text-reveal-top-200", { origin: "top", delay: 200 });
sr.reveal(".text-reveal-right-100", { origin: "right", delay: 100 });
sr.reveal(".text-reveal-bottom-100", { origin: "bottom", delay: 100 });

const texts = ["Rifa Mazharul Haq Dini Hari Putra", "Software Engineering", "Universitas Pendidikan Indonesia"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

const changingText = document.getElementById("changing-text");

if (changingText){
  (function type() {
    if (count === texts.length) count = 0;
    currentText = texts[count];
    letter = currentText.slice(0, ++index);
    changingText.textContent = letter;

    changingText.classList.add("text-fade-in");
    setTimeout(() => changingText.classList.remove("text-fade-in"), 300);

    if (letter.length === currentText.length) {
      setTimeout(() => {
        changingText.classList.add("text-fade-out");
        setTimeout(() => {
          changingText.classList.remove("text-fade-out");
          count++;
          index = 0;
          setTimeout(type, 500);
        }, 500);
      }, 1000);
    } else {
      setTimeout(type, 50);
    }
  })();
}

const navbar = document.getElementById('navbar');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const navLinks = document.querySelectorAll(".nav-link");
const sections = Array.from(navLinks)
  .map((link) => document.getElementById(link.getAttribute("href").replace("#", "")))
  .filter(Boolean);

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  navbar.classList.toggle('navbar-transparent', scrollY > 50);

  if (scrollY > 20) {
    scrollToTopBtn.style.display = 'block';
    scrollToTopBtn.classList.add('fadeIn');
  } else {
    scrollToTopBtn.classList.remove('fadeIn');
    scrollToTopBtn.classList.add('fadeOut');
    setTimeout(() => {
      scrollToTopBtn.style.display = 'none';
      scrollToTopBtn.classList.remove('fadeOut');
    }, 500);
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href").replace("#", "");
    if ((scrollY < sections[0].offsetTop - 200 && link.getAttribute("href") === "#") || href === current) {
      link.classList.add("active");
    }
  });
});

scrollToTopBtn.addEventListener('click', function () {
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    let scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }

  this.classList.add('clicked');
  setTimeout(() => this.classList.remove('clicked'), 300);
});

document.addEventListener('DOMContentLoaded', function () {
  new Splide('#project-carousel', {
    type: 'loop',
    perPage: 3,
    gap: '1rem',
    breakpoints: {
      768: { perPage: 1 },
      1024: { perPage: 2 }
    }
  }).mount();

  new Splide('#certificate-carousel', {
    type: 'loop',
    perPage: 5,
    gap: '1rem',
    breakpoints: {
      768: { perPage: 1 },
      1024: { perPage: 2 }
    }
  }).mount();
});

emailjs.init("xup3XLPaEmGygCnjq");

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm('service_bc7l02j', 'template_9tuwpdw', this)
    .then(function (response) {
      alert("Email berhasil dikirim! 🎉");
      document.getElementById('contact-form').reset();
    }, function (error) {
      alert("Gagal mengirim email 😢");
      console.log(error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});

document.querySelectorAll('img').forEach(img => {
  img.setAttribute('loading', 'lazy');
});