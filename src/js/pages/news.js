import $ from "jquery";
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

setTimeout(()=>{},100)
$('.news__card__toggle').on('click', function() {
    let $newsCard = $(this).closest('.news__card');
    let $newsDesc = $newsCard.find('.news__card__desc');
    $newsDesc.toggleClass('open');
    let buttonText = $newsDesc.hasClass('open') ? 'Скрыть' : 'Читать полностью';
    $(this).text(buttonText);
});

const swiper = new Swiper('.news__card__swiper', {
    loop: true,
    modules: [Pagination],
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});