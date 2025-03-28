
document.getElementById("nav").innerHTML += '\
<div class="home">\
    <img onclick="location.href=\'/index/\';" src="../images/start.svg">\
    <p>Главная</p>\
</div>\
<div class="cart">\
    <img onclick="location.href=\'/cart/\';" src="../images/cart.svg">\
    <p>Корзина</p>\
</div>\
<div class="favorites">\
    <img onclick="location.href=\'/favorites/\';" src="../images/favorite.svg">\
    <p>Избранное</p>\
</div>\
<div class="login">\
    <img onclick="location.href=\'/login/\';" src="../images/login.svg">\
    <p>Войти</p>\
</div>';
function showMessage() {
    const message = document.getElementById("message");
    message.style.display = "block"; // Показываем сообщение
}
    