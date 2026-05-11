// Знаходимо саме кнопку (button), а не посилання (a)
const startBtn = document.querySelector('button.main-button');
const textarea = document.getElementById('books-bulk-input');
const counter = document.getElementById('book-count');

// Рахуємо книги
textarea.addEventListener('input', () => {
    const text = textarea.value.trim();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    counter.textContent = `Books: ${lines.length}`;
});

// Клік на кнопку
startBtn.onclick = function() {
    const text = textarea.value.trim();
    const lines = text.split('\n').filter(line => line.trim() !== '');

    if (lines.length > 0) {
        // Зберігаємо
        localStorage.setItem('myBookList', JSON.stringify(lines));
        // Переходимо
        window.location.href = 'random.html';
    } else {
        alert('Будь ласка, додайте хоча б одну книгу!');
    }
};