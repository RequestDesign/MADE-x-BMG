import $ from "jquery";

$('[data-modal="reject-request"]').on("click", function () {
    $(".modal__reject-request").addClass("active");
});

$(function () {
    let textarea = $('.modal__reject-request__textarea textarea');
    textarea.on('input', function () {
        let currentLength = textarea.val().length;
        $('.max-length span').text(currentLength);
    });
});