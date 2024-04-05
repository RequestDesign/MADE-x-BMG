import $ from "jquery";

$('[data-modal="share-pass-final"]').on("click", function () {
    $(".modal__share-pass").removeClass("active");
    // $(".modal__success").addClass("active");
});

$('[data-modal="move-choice"]').on("click", function () {
    $(".modal__share-pass").removeClass("active");
    $(".modal__move-choice").addClass("active");
});

$('[data-modal="close-modal-ok"]').on("click", function () {
    $(".modal__move-choice").removeClass("active");
    $('.notifications-detail__btn').prop("disabled", false)
});

$('[data-modal="move-choice-final"]').on("click", function (e) {
    e.preventDefault()
    // $(".modal__success").addClass("active");
});

$('[data-modal="success"]').on("click", function (e) {
    e.preventDefault()
    $(".modal__success").addClass("active");
});

$('[data-modal="make-request"]').on("click", function (e) {
    e.preventDefault()
    // $(".modal__success").addClass("active");
});

$('[data-modal="add-open"]').on("click", function (e) {
    e.preventDefault()
    $(".modal__move-choice").addClass("active");
});

$('[data-modal="success-open"]').on("click", function (e) {
    e.preventDefault()
    $(".modal__move-choice").removeClass("active");
    // $(".modal__success").addClass("active");
});