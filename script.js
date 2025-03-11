// Меню кнопки каталог в шапке
document.addEventListener("DOMContentLoaded", function () {
    const catalogButton = document.getElementById("catalogButton");
    const catalogMenu = document.getElementById("catalogMenu");

    catalogButton.addEventListener("click", function () {
        catalogMenu.style.display = (catalogMenu.style.display === "block") ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!catalogButton.contains(event.target) && !catalogMenu.contains(event.target)) {
            catalogMenu.style.display = "none";
        }
    });
}); 

// Слайдер блока подбора экипировки и логика чекбокса
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    const wrapper = document.querySelector(".slider-wrapper");
    const indicatorsContainer = document.querySelector(".slider-indicators");
    let index = 0;
    let autoSlide;

    function updateIndicators() {
      indicatorsContainer.innerHTML = "";
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add(i === index ? "active" : "");
        indicatorsContainer.appendChild(dot);
      }
    }

    function moveSlide(next = true) {
      index = next ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
      wrapper.style.transform = `translateX(-${index * 100}%)`;
      updateIndicators();
    }

    document.querySelector(".slider-next").addEventListener("click", () => moveSlide(true));
    document.querySelector(".slider-prev").addEventListener("click", () => moveSlide(false));
    updateIndicators();
    autoSlide = setInterval(() => moveSlide(true), 5000);

    document.querySelector("#policy-checkbox").addEventListener("change", function() {
      document.querySelector("#submit-button").disabled = !this.checked;
    });
  });

  //Кнопка категории в выгодных предложениях
  document.querySelectorAll(".profitable-offer-category-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        // Убираем класс у всех кнопок
        document.querySelectorAll(".profitable-offer-category-btn").forEach((b) => 
            b.classList.remove("profitable-offer-category-btn__checked")
        );

        // Добавляем класс только к нажатой кнопке
        btn.classList.add("profitable-offer-category-btn__checked");
    });
});

// Слайдер в популярных категориях и выгодных предложениях

document.addEventListener("DOMContentLoaded", function () {
  function initializeSlider(containerSelector, prevBtnSelector, nextBtnSelector) {
    const sliderContainer = document.querySelector(containerSelector);
    if (!sliderContainer) return;

    const slider = document.createElement("div");
    slider.classList.add("slider-inner");

    while (sliderContainer.firstChild) {
      slider.appendChild(sliderContainer.firstChild);
    }
    sliderContainer.appendChild(slider);

    sliderContainer.style.overflow = "hidden";
    slider.style.display = "flex";
    slider.style.transition = "transform 0.3s ease-in-out";
    slider.style.gap = "16px";

    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const categories = Array.from(slider.children);

    let visibleCards = getVisibleCards();
    let currentIndex = 0;

    function getVisibleCards() {
      if (window.innerWidth >= 1441) {
        return 6;
      } else if (window.innerWidth >= 1025) {
        return 5;
      } else if (window.innerWidth >= 451) {
        return 4;
      } else {
        return 3;
      }
    }

    function updateSlider() {
      visibleCards = getVisibleCards();
      const totalGap = (visibleCards - 1) * 16;
      const cardWidth = (sliderContainer.clientWidth - totalGap) / visibleCards;
      slider.style.width = `${categories.length * cardWidth + totalGap}px`;
      categories.forEach(card => {
        card.style.width = `${cardWidth}px`;
      });
      const offset = -currentIndex * (cardWidth + 16);
      slider.style.transform = `translateX(${offset}px)`;

      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      nextBtn.style.opacity = currentIndex + visibleCards >= categories.length ? "0.5" : "1";
    }

    function moveNext() {
      if (currentIndex + visibleCards < categories.length) {
        currentIndex++;
        updateSlider();
      }
    }

    function movePrev() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    }

    nextBtn.addEventListener("click", moveNext);
    prevBtn.addEventListener("click", movePrev);
    window.addEventListener("resize", updateSlider);

    updateSlider();
  }

  initializeSlider(".popular-categories-slider", ".popular-categories-slider + .slider-buttons .slider-btn-prev", ".popular-categories-slider + .slider-buttons .slider-btn-next");
  initializeSlider(".profitable-offer-block", ".profitable-offer-block + .slider-buttons .slider-btn-prev", ".profitable-offer-block + .slider-buttons .slider-btn-next");
});

// Слайдер изображений магазина в секции о компании
document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector('.about-company-slider');
  const slides = document.querySelectorAll('.about-company-slide');
  let currentIndex = 0;
  const totalSlides = slides.length;
  const intervalTime = 3000; // Время переключения слайдов (3 секунды)

  // Функция для переключения слайдов
  function changeSlide() {
    // Убираем активный класс с текущего слайда
    slides[currentIndex].classList.remove('active');
    
    // Обновляем индекс
    currentIndex = (currentIndex + 1) % totalSlides; // Переключаем индекс по кругу
    
    // Добавляем активный класс новому слайду
    slides[currentIndex].classList.add('active');
  }

  // Устанавливаем первый слайд как активный
  slides[currentIndex].classList.add('active');

  // Автоматическое переключение слайдов
  let slideInterval = setInterval(changeSlide, intervalTime);

  // Остановка слайдера на наведении
  slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  // Возобновление слайдера после удаления курсора
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(changeSlide, intervalTime);
  });
});