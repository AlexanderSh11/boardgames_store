const filterGame = document.querySelectorAll('.game');
document.querySelector('ul').addEventListener('click', event => {
    if (event.target.tagName !== 'LI') return false;
    let filterClass = event.target.dataset['f'];
    console.log(filterClass);
    filterGame.forEach(elem => {
        elem.classList.remove('hide');
        if (!elem.classList.contains(filterClass) && filterClass!== 'all') {
            elem.classList.add('hide');
        };
    });
});