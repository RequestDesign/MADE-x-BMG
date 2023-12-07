import $ from "jquery";

const fieldset = document.querySelector(".modal__sms__boxs");
const fields = fieldset.querySelectorAll("input");

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            $('.modal__sms__wait').css('display', 'none')
            $('.modal__sms__new').css('display', 'block')
            clearInterval(timerInterval)
        }
    }, 1000);
}

$('[data-modal="modal-sms"]').on("click", function () {
    $(".modal__sms").addClass("active");
    var minutes = 60 * 1,
        display = document.querySelector('.modal__sms__wait_time');
    startTimer(minutes, display);
});

$('.modal__sms__new').on("click", function () {
    $('.modal__sms__wait').css('display', 'block')
    $('.modal__sms__new').css('display', 'none')
    var minutes = 60 * 1,
        display = document.querySelector('.modal__sms__wait_time');
    startTimer(minutes, display);
});

function handleInputField({ target }) {
    console.log(123);
    const value = target.value.slice(0, 1);
    target.value = value;

    const step = value ? 1 : -1;
    console.log(target.value.slice(0, 1));
    const fieldIndex = [...fields].findIndex((field) => field === target);
    const focusToIndex = fieldIndex + step;

    if (focusToIndex < 0) return;
    if(focusToIndex >= fields.length) {
        if($('.settings__right_hidden').length) {
            $(".modal__sms").removeClass("active");
            $('.settings__right_hidden').css('display', 'none')
            $('.settings__right_btn_disabled').removeClass('settings__right_btn_disabled')
        }
        return
    }

    fields[focusToIndex].focus();
}
fields.forEach((field) => {
    field.addEventListener("input", handleInputField);
});

