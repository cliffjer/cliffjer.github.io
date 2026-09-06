// 1. PRELOADER: Dipicu saat SELURUH ASET (gambar/style) selesai dimuat penuh
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('preloader-hidden');
    }, 500);
  }
});

// 2. LOGIKA UTAMA: Dipicu setelah STRUKTUR HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {

  // --- LOGIKA GALERI LIGHTBOX ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        const caption = item.querySelector('.gallery-overlay span')?.innerText || '';

        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        lightboxCaption.innerText = caption;
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }

  // --- LOGIKA SKILL TREE: ROTASI BIANGLALA ---
  const wheel = document.getElementById('skillWheel');
  const nodes = document.querySelectorAll('#skillWheel .skill-node');
  const descBox = document.getElementById('skill-description');

  if (wheel && nodes.length > 0 && descBox) {
    const totalNodes = nodes.length;
    const radius = 130; // Jarak node dari titik pusat
    const angleStep = 360 / totalNodes;
    let currentWheelAngle = 0; // Sudut akumulasi rotasi roda

    // Tata posisi node melingkar
    function setupNodes() {
      nodes.forEach((node, index) => {
        const baseAngleDeg = (index * angleStep) - 90;
        const angleRad = baseAngleDeg * (Math.PI / 180);

        const x = Math.round(radius * Math.cos(angleRad));
        const y = Math.round(radius * Math.sin(angleRad));

        node.setAttribute('data-angle', baseAngleDeg);
        node.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`;
      });
    }

    // Memutar node yang diklik ke posisi puncak (-90 deg)
    function rotateNodeToTop(clickedNode) {
      const nodeBaseAngle = parseFloat(clickedNode.getAttribute('data-angle'));
      let targetRotation = -90 - nodeBaseAngle;

      let diff = (targetRotation - currentWheelAngle) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      currentWheelAngle += diff;

      wheel.style.transform = `rotate(${currentWheelAngle}deg)`;

      nodes.forEach(node => {
        const baseAngleDeg = parseFloat(node.getAttribute('data-angle'));
        const angleRad = baseAngleDeg * (Math.PI / 180);
        const x = Math.round(radius * Math.cos(angleRad));
        const y = Math.round(radius * Math.sin(angleRad));

        // Jaga agar teks & ikon di dalam node tetap tegak lurus
        node.style.transform = `translate(${x}px, ${y}px) rotate(${-currentWheelAngle}deg)`;
        node.classList.remove('active-node');
      });

      clickedNode.classList.add('active-node');

      // Tampilkan deskripsi
      const title = clickedNode.getAttribute('data-title') || '';
      const desc = clickedNode.getAttribute('data-desc') || '';
      const isUnlocked = clickedNode.classList.contains('unlocked');

      descBox.innerHTML = `
  <h3 style="color: ${isUnlocked ? '#8b79e7' : '#888'}">${title}</h3>
  <p style="font-size:0.9rem; margin-top:5px; color:#ccc;">
    <strong>Status:</strong> ${isUnlocked ? '<i class="fa-regular fa-circle-check"></i> Dikuasai' : '<i class="fa-solid fa-lock"></i> Akan Dipelajari'}<br>
    ${desc}
  </p>
`;
    }

    // Assign event listener ke tiap node
    nodes.forEach(node => {
      node.addEventListener('click', () => rotateNodeToTop(node));
    });

    // Inisialisasi awal
    setupNodes();
    rotateNodeToTop(nodes[0]);
  }

  // --- CAROUSEL PROYEK ON-GOING ---
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');

  if (track && slides.length > 0 && nextButton && prevButton) {
    let currentIndex = 0;

    function updateCarousel(index) {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel(currentIndex);
    });

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel(currentIndex);
    });
  }

  // --- HAK CIPTA FOOTER ---
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
