import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import $ from "jquery";

function remToPx(remValue) {
    var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var pxValue = remValue * htmlFontSize;
    return Math.round(pxValue) + "px";
}

const swiper = new Swiper(".requests__popular__cards", {
    modules: [Navigation],
    loop: false,
    spaceBetween: `${remToPx(1.6)}rem`,
    slidesPerView: 'auto',
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

swiper.on('slideChange', function () {
    checkButtonVisibility();
});
  
  function checkButtonVisibility() {
    if (swiper.isBeginning) {
      $('.swiper-button-prev').css('display', 'none');
    } else {
      $('.swiper-button-prev').css('display', 'block');
    }
  
    if (swiper.isEnd) {
      $('.swiper-button-next').css('display', 'none');
    } else {
      $('.swiper-button-next').css('display', 'block');
    }
  }