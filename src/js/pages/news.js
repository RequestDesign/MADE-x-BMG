import $ from "jquery";

$('.news__card__toggle').on('click', function() {
    let $newsCard = $(this).closest('.news__card');
    let $newsDesc = $newsCard.find('.news__card__desc');
    $newsDesc.toggleClass('open');
    let buttonText = $newsDesc.hasClass('open') ? 'Скрыть' : 'Показать';
    $(this).text(buttonText);
});