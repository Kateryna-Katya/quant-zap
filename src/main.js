// Базовый функционал для мобильного меню
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (burger) {
      burger.addEventListener('click', () => {
          // Здесь будет логика открытия меню (добавим при необходимости)
          console.log('Mobile menu toggled');
      });
  }

  // Плавный скролл для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
              window.scrollTo({
                  top: target.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  // Добавьте этот код в начало вашего script.js или внутрь DOMContentLoaded
const runHeroAnimation = () => {
  // 1. Инициализируем SplitType
  const heroTitle = new SplitType('#hero-title', { types: 'chars, words' });

  // 2. Настройка GSAP анимации
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(heroTitle.chars, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.02,
      delay: 0.5
  })
  .from('.hero__subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8
  }, "-=0.6")
  .from('.hero__btns', {
      y: 20,
      opacity: 0,
      duration: 0.8
  }, "-=0.6")
  .from('.hero__badge', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6
  }, "-=1");

  // Параллакс эффект для кругов на фоне
  document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('.hero__circle--1', { x: xPos, y: yPos, duration: 1 });
      gsap.to('.hero__circle--2', { x: -xPos, y: -yPos, duration: 1 });
  });
};

// Запуск после загрузки страницы
window.addEventListener('load', runHeroAnimation);
});