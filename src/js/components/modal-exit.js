import $ from "jquery";

$('[data-modal="exit"]').on("click", function (e) {
    e.preventDefault()
    $(".modal__exit").addClass("active");
});