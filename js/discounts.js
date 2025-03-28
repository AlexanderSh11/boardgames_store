const filterGame = document.querySelectorAll('.game');
document.addEventListener('DOMContentLoaded', event => {
    let filterClass = 'game-with-discount';
    console.log(filterClass);
    filterGame.forEach(elem => {
        elem.classList.remove('hide');
        if (!elem.classList.contains(filterClass)) {
            elem.classList.add('hide');
        };
    });
});