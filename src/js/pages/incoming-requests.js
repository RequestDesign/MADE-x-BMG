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

$("#startDate, #endDate").on('input', function() {
    let startDateValue = $("#startDate").val();
    let endDateValue = $("#endDate").val();

    if (startDateValue && endDateValue) {
        $(".btn__apply").prop("disabled", false);
    } else {
        $(".btn__apply").prop("disabled", true);
    }
});

$(".btn__apply").on('click', function(){
    $('.incoming-requests__filter__dropdown--date').siblings('.incoming-requests__filter__input-wrapper').removeClass("open");
    $('.incoming-requests__filter__dropdown--date').slideUp();
});

//star
$(document).on('click', '.star-ico', function(e){
    e.preventDefault()
    e.stopPropagation()
    $(this).toggleClass('filled')
    $(this).closest('.incoming-requests__item').toggleClass('important')
})

//clear filters
$('.incoming-requests__filter--reset').on('click', function () {
    $('#requestTypeInput, #requestTenantInput, #requestDateInput, #startDate, #endDate').val("Не выбрано");
    $('td').removeClass('dp-highlight')
    $('#requestTenantList input, #requestTypeList input').removeAttr('checked');
});