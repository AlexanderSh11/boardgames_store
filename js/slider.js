
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3, 
    spaceBetween: 50, 
    centeredSlides: true, 
    navigation: {  
        nextEl: '.swiper-button-next',  
        prevEl: '.swiper-button-prev',  
    },  
    pagination: {
    el: ".swiper-pagination",
    },  
    loop: true, 
    keyboard: true,
    clickable: true,
    autoplay: {  
        speed: 3,
        delay: 4000,  
        disableOnInteraction: false,  
    },  

    on: {
        slideChange: function () {
            const slides = document.querySelectorAll('.swiper-slide');
            slides.forEach((slide) => {
                slide.style.opacity = '0.5'; // затемнение
            });
            slides[this.activeIndex].style.opacity = '1'; // центральный слайд
        },
    },
});
