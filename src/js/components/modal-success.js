import $ from "jquery";

$('[data-modal="share-pass-final"]').on("click", function () {
    $(".modal__share-pass").removeClass("active");
    $(".modal__success").addClass("active");
});