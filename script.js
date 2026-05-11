const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((item) => observer.observe(item));

const heroPanel = document.querySelector('.hero-panel');

if (heroPanel && window.matchMedia('(min-width: 981px)').matches) {
  document.addEventListener('mousemove', (event) => {
    const xRatio = (event.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (event.clientY / window.innerHeight - 0.5) * 2;

    heroPanel.style.transform = `translateY(0) rotateY(${xRatio * 3}deg) rotateX(${yRatio * -2}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    heroPanel.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg)';
  });
}

const photoFiles = [
  'WhatsApp Image 2026-05-11 at 18.16.28 (1).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.28 (2).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.28.jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.29 (1).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.29 (2).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.29 (3).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.29.jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.30 (1).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.30 (2).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.30 (3).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.30.jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.31 (1).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.31 (2).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.31 (3).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.31 (4).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.31 (5).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.31.jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.32 (1).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.32 (2).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.32 (3).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.32.jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.33 (1).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.33 (2).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.33.jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.34 (1).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.34 (2).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.34 (3).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.34 (4).jpeg',
  'WhatsApp Image 2026-05-11 at 18.16.34.jpeg',
];

const photoPaths = photoFiles.map((file) => encodeURI(`images/${file}`));

const galleryTrack = document.getElementById('gallery-track');
const galleryNext = document.getElementById('gallery-next');
const galleryPrev = document.getElementById('gallery-prev');

if (galleryTrack && galleryNext && galleryPrev && photoPaths.length > 0) {
  galleryTrack.innerHTML = photoPaths
    .map(
      (path, index) => `
        <figure class="gallery-slide">
          <a class="gallery-image-link" href="${path}" target="_blank" rel="noopener noreferrer" aria-label="Abrir foto ${index + 1} em tamanho completo">
            <img src="${path}" alt="Galeria de servicos eletricos ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">
          </a>
          <figcaption>Registro ${index + 1} de ${photoPaths.length}</figcaption>
        </figure>
      `
    )
    .join('');

  let currentSlide = 0;
  let autoPlay = null;

  const updateSlide = () => {
    galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  };

  const startAutoPlay = () => {
    window.clearInterval(autoPlay);
    autoPlay = window.setInterval(() => {
      currentSlide = (currentSlide + 1) % photoPaths.length;
      updateSlide();
    }, 4500);
  };

  const resetAutoPlay = () => {
    window.clearInterval(autoPlay);
    startAutoPlay();
  };

  galleryNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % photoPaths.length;
    updateSlide();
    resetAutoPlay();
  });

  galleryPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + photoPaths.length) % photoPaths.length;
    updateSlide();
    resetAutoPlay();
  });

  galleryTrack.addEventListener('mouseenter', () => window.clearInterval(autoPlay));
  galleryTrack.addEventListener('mouseleave', () => startAutoPlay());

  updateSlide();
  startAutoPlay();
}

const rotatorImage = document.getElementById('service-rotator-image');
const rotatorCaption = document.getElementById('service-rotator-caption');
const rotatorLink = document.getElementById('service-rotator-link');

if (rotatorImage && rotatorCaption && rotatorLink && photoPaths.length > 0) {
  let currentPhoto = 0;

  const updateRotator = () => {
    rotatorImage.classList.add('is-fading');

    window.setTimeout(() => {
      rotatorImage.src = photoPaths[currentPhoto];
      rotatorLink.href = photoPaths[currentPhoto];
      rotatorCaption.textContent = `Conheca nosso servico - foto ${currentPhoto + 1} de ${photoPaths.length}`;
      rotatorImage.classList.remove('is-fading');
    }, 180);
  };

  updateRotator();

  window.setInterval(() => {
    currentPhoto = (currentPhoto + 1) % photoPaths.length;
    updateRotator();
  }, 3400);
}
