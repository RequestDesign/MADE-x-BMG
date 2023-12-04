import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";

function remToPx(remValue) {
    var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var pxValue = remValue * htmlFontSize;
    return Math.round(pxValue) + "px";
}

const swiper = new Swiper(".requests__popular__cards", {
    modules: [Navigation],
    loop: false,
    spaceBetween: `${remToPx(1.6)}rem`,
    slidesPerView: 6,
    navigation: {
        nextEl: ".swiper-button-next",
    },
});