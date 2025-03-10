import Swiper from 'swiper';
import 'swiper/css';

function initCategorySlider() {
  new Swiper('.popular-categories-slider', {
    slidesPerView: 5,
    spaceBetween: 16,
    navigation: {
      nextEl: '.slider-btn-next.categories',
      prevEl: '.slider-btn-prev.categories',
    },
    breakpoints: {
      1440: {
        slidesPerView: 6,
      },
    },
  });
}

function initOfferSlider() {
  new Swiper('.profitable-offer-block', {
    slidesPerView: 5,
    spaceBetween: 16,
    navigation: {
      nextEl: '.slider-btn-next.offers',
      prevEl: '.slider-btn-prev.offers',
    },
    breakpoints: {
      1440: {
        slidesPerView: 6,
      },
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCategorySlider();
  initOfferSlider();
});
