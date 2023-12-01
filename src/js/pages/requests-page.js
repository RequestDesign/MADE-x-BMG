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
    loop: true,
    spaceBetween: `${remToPx(1.6)}rem`,
    slidesPerView: 6,
    navigation: {
        nextEl: ".swiper-button-next",
    },
});

//switchers
$(function () {
    $(".switcher-content").hide();
    $('.switcher-content[data-content="works"]').show();

    $(".switcher-category").on("click", function () {
        $(".switcher-category").removeClass("switcher--active");
        $(this).addClass("switcher--active");

        $(".switcher-content").hide();
        let switcherValue = $(this).data("switcher");
        $('.switcher-content[data-content="' + switcherValue + '"]').show();
    });
});
