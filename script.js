// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', body.dataset.theme);
});

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.dataset.theme = savedTheme;
}

// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Анимации при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.card, .timeline-item, .feature-card').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});



// Параллакс-эффект
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelector('.hero').style.backgroundPositionY = scrolled * 0.5 + 'px';
});
// Функция загрузки и воспроизведения видео
function loadVideo(videoFile) {
    const videoPlayer = document.querySelector('.emergency-video');
    const videoContainer = document.querySelector('.video-container');
    const placeholder = document.querySelector('.placeholder-text');

    if (videoFile) {
        // Показываем видео и скрываем плейсхолдер
        videoContainer.classList.add('has-video');
        placeholder.style.display = 'none';
        videoPlayer.src = videoFile;
        videoPlayer.load();
        
        // Пытаемся запустить автовоспроизведение
        videoPlayer.play().catch(error => {
            console.log('Автовоспроизведение заблокировано. Нажмите на видео для запуска.');
        });
    } else {
        // Сбрасываем видео и показываем плейсхолдер
        videoContainer.classList.remove('has-video');
        placeholder.style.display = 'block';
        videoPlayer.src = '';
    }

    // Обновляем активную кнопку
    document.querySelectorAll('.scenario-buttons button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.video === videoFile) btn.classList.add('active');
    });
}

// Обработчики кнопок
document.querySelectorAll('.scenario-buttons button[data-video]').forEach(button => {
    button.addEventListener('click', () => {
        const videoFile = button.dataset.video;
        loadVideo(videoFile); // Запуск выбранного видео
    });
});

// Кнопка сброса
document.getElementById('resetBtn').addEventListener('click', () => {
    loadVideo(null); // Скрываем видео и показываем плейсхолдер
});