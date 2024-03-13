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
        if ($(this).closest(".modal").hasClass("modal__create")) {
            $(".modal__create__form_item").show();
            setTimeout(() => {
                $(".modal__create .btn").removeClass("add-active-checkbox-field");
                $(".modal__create .btn").attr("data-modal", "close-modal");
            }, 100);
        }
        if ($(this).closest(".modal").hasClass("modal__edit-field")) {
            setTimeout(() => {
                $(".adding_application__item input").val("");
            });
        }
    }
});
