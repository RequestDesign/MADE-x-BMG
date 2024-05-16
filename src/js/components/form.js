import $ from "jquery";
import IMask from "imask";

$('.form__dropdown_top').on("click", function () {
    if(!$(this).closest('.form__dropdown_search').length) {
        $(this).toggleClass("open");
        $(this).closest('.form__item').toggleClass("active");
        $(this).closest('.form__dropdown').find('.form__dropdown_bottom').slideToggle()
    }
});
$('.form__dropdown_search .form__dropdown_top input').on("focus", function () {
    let $currentDropdown = $(this).closest('.form__dropdown');
    if (!$currentDropdown.find('.form__dropdown_top').hasClass('open')) {
        $('.form__dropdown_top.open').removeClass('open');
        $('.form__item.active').removeClass('active');
        $('.form__dropdown_bottom').slideUp();
        $currentDropdown.find('.form__dropdown_bottom').slideDown();
        $currentDropdown.find('.form__dropdown_top').addClass("open");
        $currentDropdown.find('.form__item').addClass("active");
    }
});


function checkBtn(item) {
    var count = 0
    $(item).closest('.form').find('.input.required').each(function (param) {
        if(!$(this).val()) {
            count++
        }
    })
    $(item).closest('.form').find('.form__dropdown.required').each(function (param) {
        if(!$(this).find(':checked').length) {
            count++
        }
    })

    if(!count){
        $(item).closest('.form').find('.form__btn').prop("disabled", false)
    } else {
        $(item).closest('.form').find('.form__btn').prop("disabled", true)
    }
}

$('.form__dropdown_item').on("click", function (e) {
    if($(this).closest('.form__dropdown_employees').length) {
        const topText = $(this).closest('.form__dropdown').find('.form__dropdown_top span')
        switch($(this).closest('.form__dropdown_list').find(':checked').length) {
            case 0:
                topText.html('Добавить сотрудников')
                topText.removeClass('active')
                break;
            case 1:
                topText.html('Выбран 1 сотрудник')
                topText.addClass('active')
              break;
              case 2:
                topText.html('Выбрано 2 сотрудника')
                topText.addClass('active')
              break;
              case 3:
                topText.html('Выбрано 3 сотрудника')
                topText.addClass('active')
              break;
              case 4:
                topText.html('Выбрано 4 сотрудника')
                topText.addClass('active')
              break;
              
            default:
                topText.html(`Выбрано ${$(this).closest('.form__dropdown_list').find(':checked').length} сотрудников`)
                topText.addClass('active')
        }
    }
    if ($(this).closest('.form__dropdown_search').length) {
        $(this).closest('.form__dropdown').find('.form__dropdown_top input').val($(this).find('.form__dropdown_item_name').text())
        const dataId = $(this).find('.form__dropdown_item_checkbox input').val();
        $(this).closest('.form__dropdown').find('.form__dropdown_top input').attr("data-id", dataId);
    }
    checkBtn(this)
});

$(document).on('click', function (e) {
    if ($(e.target).closest(".form__dropdown").length === 0) {
        $('.form__dropdown_top.open').each(function (params) {
            $(this).removeClass("open");
            $(this).closest('.form__dropdown').find('.form__dropdown_bottom').slideToggle()
            $(this).closest('.form__item').removeClass("active");
        })
    }
});

$('.input.required').on("input", function (e) {
    checkBtn(this)
});
$('.form__grid-item input').on("change", function (e) {
    checkBtn(this)
});

if($('#phone-mask').length){
    IMask(document.getElementById("phone-mask"), {
        mask: "+{7} 000 000-00-00",
    });
}
if($('#phone-mask1').length){
    IMask(document.getElementById("phone-mask1"), {
        mask: "+{7} 000 000-00-00",
    });
}

if($('#phone-mask2').length){
    IMask(document.getElementById("phone-mask2"), {
        mask: "+{7} 000 000-00-00",
    });
}

$(".form__dropdown_top input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(this).closest(".form__dropdown").find('.form__dropdown_item').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
