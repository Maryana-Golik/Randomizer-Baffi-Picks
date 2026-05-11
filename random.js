
let shuttleInterval;
let countdownInterval;

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('books-grid');
    const timerDisplay = document.getElementById('random-count');
    const footer = document.querySelector('.modal-footer'); 
    const btnAgain = document.querySelector('.btn-outline'); 
    const userBooks = JSON.parse(localStorage.getItem('myBookList')) || [];

    // Створюємо 18 карток один раз при завантаженні

// Визначаємо кількість карток залежно від ширини екрана
const cardCount = window.innerWidth < 768 ? 8 : 18;

grid.innerHTML = '';
for (let i = 0; i < cardCount; i++) {
    const card = document.createElement('div');
    card.className = 'book-card';
    grid.appendChild(card);
}

const cards = document.querySelectorAll('.book-card');

    function startRandomizer() {
        // КРОК 0: Зупиняємо всі старі процеси, якщо вони йшли
        clearInterval(shuttleInterval);
        clearInterval(countdownInterval);
        
        // Скидаємо стилі карток до початкових
        cards.forEach(card => {
            card.classList.remove('active');
            card.style.opacity = '1';
        });

        if (footer) footer.style.display = 'none';
        
        let timeLeft = 7;
        timerDisplay.textContent = `00:07`;

        // КРОК 1: Ефект хаосу
        shuttleInterval = setInterval(() => {
            cards.forEach(card => {
                const randomBook = userBooks[Math.floor(Math.random() * userBooks.length)];
                card.textContent = randomBook;
                card.classList.remove('active');
            });
        }, 100);

        // КРОК 2: Таймер
        countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft >= 0) {
                timerDisplay.textContent = `00:0${timeLeft}`;
            }
            if (timeLeft <= 0) clearInterval(countdownInterval);
        }, 1000);

        // КРОК 3: Фінал через 7 секунд
        setTimeout(() => {
            clearInterval(shuttleInterval);
            clearInterval(countdownInterval);
            
            const winnerTitle = userBooks[Math.floor(Math.random() * userBooks.length)];
            const winnerIndex = Math.floor(Math.random() * cards.length);

            cards.forEach((card, index) => {
                card.style.opacity = '1';
                if (index === winnerIndex) {
                    card.textContent = winnerTitle;
                    card.classList.add('active'); 
                } else {
                    card.textContent = ''; 
                    card.style.opacity = '0.1';
                }
            });

            if (footer) footer.style.display = 'flex';
        }, 7000);
    }

    if (btnAgain) {
        btnAgain.onclick = (e) => {
            e.preventDefault();
            startRandomizer();
        };
    }

    if (userBooks.length > 0) {
        startRandomizer();
    }
});