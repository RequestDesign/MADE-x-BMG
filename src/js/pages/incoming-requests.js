import $ from "jquery";

$(".incoming-requests__view").on("click", function (e) {
    if (!$(this).hasClass("active")) {
        $(".incoming-requests__view").removeClass("active");
        $(this).addClass("active");
        if ($(".incoming-requests__view")[0].classList.contains("active")) {
            $(".incoming-requests__change").removeClass("right");
            $(".incoming-requests").addClass("incoming-requests__other");
        } else {
            $(".incoming-requests__change").addClass("right");
            $(".incoming-requests").removeClass("incoming-requests__other");
        }
    }
});

$(".incoming-requests__filter__input-wrapper").on("click", function () {
    $(this).toggleClass("open");
    $(this).closest(".incoming-requests__filter").find(".incoming-requests__filter__dropdown").slideToggle();
});

//select options in filters
$(".incoming-requests__filter__dropdown input[type='radio']").on("change", function () {
    let $input = $(this);
    let $dropdown = $input.closest(".incoming-requests__filter__dropdown");
    let selectedOption = $input.closest("label").find(".request-filter-list__title").text();

    let $inputWrapper = $dropdown.closest(".incoming-requests__filter").find(".incoming-requests__filter__input-wrapper");
    $inputWrapper.find("input[type='text']").val(selectedOption);

    $inputWrapper.removeClass("open");
    $dropdown.slideUp();
});

//star
$('.star-ico').on('click', function(){
    $(this).toggleClass('filled')
})
