import $ from "jquery";

$('[data-modal="edit-employee"]').on("click", function (e) {
    e.preventDefault()
    $(".modal__edit-employee").addClass("active");
});