import $ from "jquery";
$(function () {
    $("[data-modal]").on("click", () => {
        $("body").addClass("lock");
    });

    $(".modal-back").on("click", closeModal);
    $(".modal-exit").on("click", closeModal);
    $(".btn__save-changes").on("click", closeModal);
    $("[data-modal='close-modal']").on("click", closeModal);

    function closeModal() {
        $(this).closest(".modal").removeClass("active");
        $("body").removeClass("lock");
    }
});
