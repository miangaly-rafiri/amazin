// Product image > page single
const thumbImage = new Swiper('.thumbnail-image', {
   // logo: true,
    direction: 'vertical',
    spaceBetween: 15,
    slidesPerView: 1, // Ajustez le nombre d'images visibles
    freeMode: true,
    watchSlidesProgress: true,
});

const mainImage = new Swiper('.main-image', {
   	logo: true,
    autoHeight: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    thumbs: {
        swiper: thumbImage, // Lien vers les vignettes
    },
});
