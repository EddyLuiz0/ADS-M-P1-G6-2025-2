const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dots = document.querySelectorAll('.nav-dot');

let currentIndex = 0;
let autoPlayTimer;

// Função para mover o carrossel
const moveToSlide = (index) => {
  // Atualiza o índice, garantindo que ele dê a volta (loop infinito)
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  // Move a trilha no eixo X
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Atualiza a bolinha ativa
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
};

// Configura a troca automática a cada 3 segundos
const startAutoPlay = () => {
  autoPlayTimer = setInterval(() => {
    moveToSlide(currentIndex + 1);
  }, 5000);
};

// Reseta o temporizador se o usuário clicar manualmente (evita trocas duplas rápidas)
const resetAutoPlay = () => {
  clearInterval(autoPlayTimer);
  startAutoPlay();
};

// Event Listeners para as setas
nextButton.addEventListener('click', () => {
  moveToSlide(currentIndex + 1);
  resetAutoPlay();
});

prevButton.addEventListener('click', () => {
  moveToSlide(currentIndex - 1);
  resetAutoPlay();
});

// Event Listeners para as bolinhas
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    moveToSlide(index);
    resetAutoPlay();
  });
});

// Inicia o carrossel automático assim que a página carrega
startAutoPlay();