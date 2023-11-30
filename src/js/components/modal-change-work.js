import $ from "jquery";

$('[data-modal="change-work"]').on('click', () => {
    $('.modal__change-work').addClass('active');
});

$(".btn__save-changes").on("click", function(){
    updateHeaderWorkLogo();
});

function updateHeaderWorkLogo() {
    const selectedCompanyImg = $('.modal__change-work__options input[name="workplace"]:checked')
        .closest('.modal__change-work__option')
        .find('.modal__change-work__company img')
        .attr('src');

    $('#headerWorkLogo').attr('src', selectedCompanyImg);
}