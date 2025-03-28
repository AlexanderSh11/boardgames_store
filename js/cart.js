document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    document.getElementById('cart-items').addEventListener('click', event => {
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = event.target.dataset.id;
  
            removeItemFromCart(productId);
        }
    });
  });
  
  function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
  
    let totalSum = 0;
  
    cart.forEach(item => {
        let price = parseInt(item.price)/100*(100-parseInt(item.discount));
        totalSum += price;
  
        productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <img src="${item.imgSrc}" onclick="location.href=/product/${item.id};">
            <div class="game-info">
                <h2>${item.gameName} - ${price} ₽</h2>
                <button class="remove-from-cart" data-id="${item.gameName}">Удалить</button>
            </div>`;
  
        cartItemsDiv.appendChild(productDiv);
    });
  
    document.getElementById('total-sum').textContent = totalSum;
  }
  
  function removeItemFromCart(gameName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.gameName !== gameName);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    renderCartItems();
  }