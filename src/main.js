document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. МОБИЛЬНОЕ МЕНЮ --- */
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        nav.classList.toggle('nav--active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('nav--active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(nav.classList.contains('nav--active')) toggleMenu();
        });
    });

    /* --- 2. COOKIE POPUP --- */
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookiePopup.classList.add('cookie-popup--active');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookiePopup.classList.remove('cookie-popup--active');
    });

    /* --- 3. HERO АНИМАЦИЯ (GSAP) --- */
    if (typeof gsap !== 'undefined') {
        const runHeroAnimation = () => {
            const heroTitle = new SplitType('#hero-title', { types: 'chars, words' });
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(heroTitle.chars, {
                y: 100, opacity: 0, duration: 1, stagger: 0.02, delay: 0.5
            })
            .from('.hero__subtitle', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
            .from('.hero__btns', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
            .from('.hero__badge', { scale: 0.8, opacity: 0, duration: 0.6 }, "-=1");

            // Параллакс фона
            document.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 40;
                const yPos = (clientY / window.innerHeight - 0.5) * 40;
                gsap.to('.hero__circle--1', { x: xPos, y: yPos, duration: 1 });
                gsap.to('.hero__circle--2', { x: -xPos, y: -yPos, duration: 1 });
            });
        };
        window.addEventListener('load', runHeroAnimation);
    }

    /* --- 4. ФОРМА КОНТАКТОВ --- */
    const form = document.getElementById('ai-form');
    if (form) {
        const phoneInput = document.getElementById('phone');
        const captchaText = document.getElementById('captcha-question');
        const statusDiv = document.getElementById('form-status');

        let num1 = Math.floor(Math.random() * 10) + 1;
        let num2 = Math.floor(Math.random() * 10) + 1;
        let correctAnswer = num1 + num2;
        captchaText.innerText = `${num1} + ${num2} = ?`;

        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const userCaptcha = parseInt(document.getElementById('captcha-answer').value);

            if (userCaptcha !== correctAnswer) {
                showStatus('Ошибка капчи. Попробуйте снова.', 'error');
                return;
            }

            const submitBtn = form.querySelector('button');
            submitBtn.disabled = true;
            submitBtn.innerText = 'Отправка...';

            setTimeout(() => {
                showStatus('Спасибо! Ваша заявка принята. Платформа уже доступна в Европе.', 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = 'Начать сейчас';
                
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                correctAnswer = num1 + num2;
                captchaText.innerText = `${num1} + ${num2} = ?`;
            }, 1500);
        });

        function showStatus(msg, type) {
            statusDiv.innerText = msg;
            statusDiv.className = `form__status ${type}`;
            statusDiv.style.display = 'block';
            if(type === 'success') {
                setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
            }
        }
    }

    /* --- 5. ПЛАВНЫЙ СКРОЛЛ --- */
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
});