import $ from "jquery";
import IMask from "imask";
import "jquery-ui/ui/widgets/datepicker";

function checkRequiredFields(form) {
    // const allFieldsFilled = $(`${form} :input[required]`).toArray().every(element => $(element).val() !== "");
    // $(".form__btn").prop("disabled", !allFieldsFilled);
}

$("#price-mask, #price-mask1").on("input", function () {
    const inputValue = $(this).val();
    const unformattedValue = inputValue.replace(/[^\d]/g, '');

    if (unformattedValue.length > 0) {
        const formattedValue = parseInt(unformattedValue).toLocaleString('ru-RU') + ' ₽';
        $(this).val(formattedValue);
        this.setSelectionRange(this.value.length - 2, this.value.length - 2);
    } else {
        $(this).val('');
    }
});

$("#price-mask, #price-mask1").on("blur", function () {
    const inputValue = $(this).val();
    const unformattedValue = inputValue.replace(/[^\d]/g, '');

    if (unformattedValue.length > 0) {
        $(this).val(unformattedValue + ' ₽');
    } else {
        $(this).val('');
    }
});

$("#time-mask").on("input", function () {
    if ($("#time-mask").length) {
        IMask(document.getElementById("time-mask"), {
            overwrite: true,
            autofix: true,
            mask: "HH:MM",
            blocks: {
                HH: {
                    mask: IMask.MaskedRange,
                    placeholderChar: "HH",
                    from: 0,
                    to: 23,
                    maxLength: 2,
                },
                MM: {
                    mask: IMask.MaskedRange,
                    placeholderChar: "MM",
                    from: 0,
                    to: 59,
                    maxLength: 2,
                },
            },
        });
    }
});

// Step 1
$(function () {
    if($('.making-request').length) {
        $(".making-request__step-content").hide();
        $('[data-content="step1"]').show();
        checkRequiredFields('#formContact');
    
        //textarea length
        $(function () {
            let textarea = $('.form__item--textarea textarea');
            textarea.on('input', function () {
                let currentLength = textarea.val().length;
                $('.max-length span').text(currentLength);
            });
        }); 
    
        //make btn active
        $(".executor-list__option input[type='radio']").on("change", function () {
            let selectedText = $(this).closest(".executor-list__option").find(".executor-list__title").text();
            $(this).closest('.form__item').find("input[type='text']").val(selectedText);
            checkRequiredFields('#formContact');
        });
    
        $("#formContact .form__input input").on("input", function () {
            checkRequiredFields('#formContact');
        });
    }
});

// Step 2
$("#firstStepBtn").on("click", function (e) {
    e.preventDefault();
    $(".making-request__step-content").hide();
    $('[data-content="step2"]').show();
    $(".making-request__step").removeClass("making-request__step--active");
    $("[data-step='step2']").addClass("making-request__step--active");
    checkRequiredFields('#formPrice');

    // Make btn active on input change in step 2
    $("#formPrice .form__input input").on("input", function () {
        checkRequiredFields('#formPrice');
    });
});

$("#toFirstStep").on("click", function () {
    $(".making-request__step-content").hide();
    $('[data-content="step1"]').show();
    $(".making-request__step").removeClass("making-request__step--active");
    $("[data-step='step1']").addClass("making-request__step--active");
    checkRequiredFields('#formContact');
});

// Step 3
$("#thirdStepBtn").on("click", function (e) {
    e.preventDefault();
    $(".making-request__step-content").hide();
    $(".making-request__step").removeClass("making-request__step--active");
    $("[data-step='step3']").addClass("making-request__step--active");
    $('[data-content="step3"]').show();
    checkRequiredFields('#formDate');

    $.datepicker.regional['ru'] = {
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        dateFormat: 'dd.mm.yy',
        firstDay: 1
    };

    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $("#formDate .form__input input").on("input", function () {
        checkRequiredFields('#formDate');
    });

    $("#datepicker").datepicker({
        nextText: "",
        prevText: "",
        onSelect: function (date) {
            $("#inputDate").val(date);
            checkRequiredFields('#formDate');
        },
    });

});
$("#datepicker1").datepicker({
    nextText: "",
    prevText: "",
    onSelect: function (date) {
        $(this).closest('.form__dropdown').find(`input[type='text']`).val(date)
    },
});
$("#datepicker2").datepicker({
    nextText: "",
    prevText: "",
    onSelect: function (date) {
        $(this).closest('.form__dropdown').find(`input[type='text']`).val(date)
    },
});
$("#toSecStep").on("click", function () {
    $(".making-request__step-content").hide();
    $('[data-content="step2"]').show();
    $(".making-request__step").removeClass("making-request__step--active");
    $("[data-step='step2']").addClass("making-request__step--active");
    checkRequiredFields('#formPrice');
});