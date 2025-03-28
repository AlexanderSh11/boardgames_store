let currentSlide = 0;
document.getElementById("slider").innerHTML += '<div class="lightbox" onclick="closeLightbox()">\
                                                    <img id="lightboxImage" src="">\
                                                </div>';
function showSlide(index) {
    const slides = document.querySelector('.slides');
    currentSlide = index;
    slides.style.transform = `translateX(-${index * 100}%)`;
}
function openLightbox(src) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = src;
    lightbox.style.display = 'flex';
}
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
}