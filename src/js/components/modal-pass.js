import $ from "jquery";

$('[data-modal="pass"]').on('click', function () {
    const card = $(this);
    const isTemporary = card.hasClass('passes__card--temporary');

    if (isTemporary) {
        let termsType = card.find('.terms__type').text();
        let term = card.find('.terms__date').text();
        let title = card.find('.title').text();
        $('.modal__pass__type').text(title);
        $('.modal__pass__title').text(termsType);
        $('.modal__pass__term').text(`Действителен ${term}`);
    } else {
        let title = card.find('.title').text();
        $('.modal__pass__type').text(title);
        $('.modal__pass__title').empty();
    }

    let iconSrc = card.find('.icon img').attr('src');
    $('.modal__pass__img img').attr('src', iconSrc);
    $('.modal__pass').addClass('active');
});

