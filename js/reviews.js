document.getElementById('reviewFormButton').addEventListener('click', function(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let reviewText = document.getElementById('review').value;

    console.log(name, email, reviewText);

    if (name && email && reviewText) {
    
        let review = document.createElement('div');
        review.classList.add('review');
        review.innerHTML = `<div class="review-name">
                                <p>${name}</p>
                            </div>
                            <div class="review-text">
                                <p>${reviewText}</p>
                            </div>`;

        document.getElementById('reviews').appendChild(review);

        document.getElementById('reviewForm').reset();
    }
   
});