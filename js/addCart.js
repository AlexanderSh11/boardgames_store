function addToCart(gameName, imgSrc, price, discount, id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({gameName, imgSrc, price, discount, id});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Товар "${gameName}" добавлен в корзину.`);
}