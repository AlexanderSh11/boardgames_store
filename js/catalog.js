let games = [];
let currentIndex = 0;
const gamesPerPage = 3;
document.getElementById("search").addEventListener("input", function() {
    const searchTerm = this.value;
    games = [];
    document.getElementById("catalog").innerHTML = '';
    if (searchTerm.length >= 1) {
        fetch(`/api/search?title=${encodeURIComponent(searchTerm)}`) // запрос к API для поиска
            .then(response => {
                if (!response.ok) {
                    throw new Error('Products not found');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(game => {
                    games.push({
                        id: game.id,
                        title: game.title,
                        description: game.description,
                        age: game.age,
                        time: game.time,
                        players: game.players,
                        price: game.price,
                        img: game.img
                    });
                });
                currentIndex = 0;
                displayGames(); // Вызов функции для отображения игр
                manageShowMoreButton(); // Вызов функции для отображения кнопки "Показать еще"щ
            })
            .catch(error => console.error('Error fetching games:', error));
    } else {
        fetch('/api/games') // Запрос к API
        .then(response => response.json())
        .then(data => {
            data.forEach(game => {
                games.push({
                    id: game.id,
                    title: game.title,
                    description: game.description,
                    age: game.age,
                    time: game.time,
                    players: game.players,
                    price: game.price,
                    img: game.img
                });
            });
            currentIndex = 0;
            displayGames(); // Вызов функции для отображения игр
            manageShowMoreButton(); // Вызов функции для отображения кнопки "Показать еще"
        })
        .catch(error => console.error('Error fetching games:', error));
    }
});

// Добавляем кнопку "Показать еще"
const showMoreButton = document.createElement("button");
showMoreButton.id = "show-more";
showMoreButton.innerText = "Показать еще";
showMoreButton.className = "btn btn-primary"; // Используем Bootstrap для стилизации
showMoreButton.onclick = displayGames; // Привязываем функцию к кнопке

fetch('/api/games') // Запрос к API для отображения всего каталога
.then(response => response.json())
.then(data => {
    data.forEach(game => {
        games.push({
            id: game.id,
            title: game.title,
            description: game.description,
            age: game.age,
            time: game.time,
            players: game.players,
            price: game.price,
            img: game.img
        });
    });
    currentIndex = 0;
    displayGames(); // Вызов функции для отображения игр
    manageShowMoreButton(); // Вызов функции для отображения кнопки "Показать еще"
})
.catch(error => console.error('Error fetching games:', error));

function displayGames() {
    const catalog = document.getElementById("catalog");
    let html = '';
    for (let i = currentIndex; i < currentIndex + gamesPerPage && i < games.length; i++) {
        const game = games[i];
        html += `
            <div class="game">
                <img src="${game.img}" alt="${game.title}">
                <h2>${game.title}</h2>
                <p>${game.description}</p>
                <div class="game-info">
                    <img src="${game.age}">
                    <img src="${game.time}">
                    <img src="${game.players}">
                </div>
                <h3>${game.price}₽</h3>
                <a href="/product/${game.id}"><button>Подробнее</button></a>
            </div>
        `;
    }
    catalog.innerHTML += html; // Добавляем новые игры
    currentIndex += gamesPerPage; // Увеличиваем индекс для следующей загрузки

    // Проверяем, нужно ли скрыть кнопку "Показать еще"
    if (currentIndex >= games.length) {
        document.getElementById("show-more").style.display = "none"; // Скрываем кнопку, если больше нет игр
    }
}

function manageShowMoreButton() {
    const showMoreContainer = document.getElementById("show-more-container");
    const showMoreButton = document.getElementById("show-more");

    if (currentIndex < games.length) {
        if (!showMoreButton) {
            const newShowMoreButton = document.createElement("button");
            newShowMoreButton.id = "show-more";
            newShowMoreButton.innerText = "Показать еще";
            newShowMoreButton.className = "btn btn-primary"; 
            newShowMoreButton.onclick = displayGames; 
            showMoreContainer.appendChild(newShowMoreButton);
        }
    } else {
        if (showMoreButton) {
            showMoreContainer.removeChild(showMoreButton);
        }
    }
}