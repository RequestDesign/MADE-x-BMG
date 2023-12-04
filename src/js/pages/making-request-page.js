import $ from "jquery";

$(function () {
    $("#executorInputWrapper").on("click", function () {
        $(".executor-list").slideToggle("fast");
        $(".btn__open-list").toggleClass("open");
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".executor-list, #executorInputWrapper").length) {
            $(".executor-list").slideUp("fast");
        }
    });

    $("#executorInputWrapper input").on("input", function () {
        var searchTerm = $(this).val().toLowerCase();
        $(".executor-list__option").each(function () {
            var text = $(this).find(".executor-list__title").text().toLowerCase();
            if (text.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $(".executor-list__option").on("click", function (e) {
        e.stopPropagation();
        var selectedText = $(this).find(".executor-list__title").text();
        $("#executorInputWrapper input").val(selectedText);
        $(".executor-list").slideUp("fast");
    });
});
