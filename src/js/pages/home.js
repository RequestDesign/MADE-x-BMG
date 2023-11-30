import Swiper from 'swiper';
import 'swiper/css';

function remToPx(remValue) {
    var htmlFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    var pxValue = remValue * htmlFontSize;
    return Math.round(pxValue) + "px";
  }

const swiper = new Swiper('.home__my-discovery__cards', {
    loop: false,
    spaceBetween: `${remToPx(1.6)}rem`,
    slidesPerView: 'auto'
  });
