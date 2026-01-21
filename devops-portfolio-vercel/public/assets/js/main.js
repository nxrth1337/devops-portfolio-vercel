// Основные функции сайта
document.addEventListener('DOMContentLoaded', function() {
    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        // Устанавливаем иконку
        const icon = themeToggle.querySelector('.theme-toggle__icon');
        if (icon) {
            icon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Меняем иконку
            if (icon) {
                icon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            }
            
            // Анимация
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    }
    
    // Мобильное меню
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
        
        // Закрытие при клике вне меню
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav__menu') && 
                !event.target.closest('.nav__toggle') &&
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Анимация счетчиков
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    // Запускаем анимацию при появлении в viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    // Копирование кода
    document.querySelectorAll('.guide-card__copy').forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.guide-card')
                .querySelector('code');
            
            if (codeBlock) {
                const code = codeBlock.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    const original = this.innerHTML;
                    this.innerHTML = '✅';
                    
                    setTimeout(() => {
                        this.innerHTML = original;
                    }, 2000);
                });
            }
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню если открыто
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Анимация печатающего текста в терминале
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});

// Vercel Analytics (опционально)
if (typeof window !== 'undefined') {
    // Можно добавить позже
}