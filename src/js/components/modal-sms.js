import $ from "jquery";

if ($('.modal__sms__boxs').length) {
    const fieldset = document.querySelector(".modal__sms__boxs");
    const fields = fieldset.querySelectorAll("input");
    var timerInterval
    $('.modal-back').on('click', function() {
        if($(this).closest('.modal__sms').length) {
            clearInterval(timerInterval)
        }
    })

    function timerText(timer, display, min, sec) {
        min = parseInt(timer / 60, 10)
        sec = parseInt(timer % 60, 10);

        min = min;
        sec = sec < 10 ? "0" + sec : sec;

        display.textContent = min + ":" + sec;
    }

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        timerText(timer, display, minutes, seconds)

        timerInterval = setInterval(function () {
            timerText(timer, display, minutes, seconds)
    
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
        const value = target.value.slice(0, 1);
        target.value = value;
    
        const step = value ? 1 : -1;
        const fieldIndex = [...fields].findIndex((field) => field === target);
        const focusToIndex = fieldIndex + step;
    
        if (focusToIndex < 0) return;
        if(focusToIndex >= fields.length) {
            if($('.settings__right_hidden').length) {
                $(".modal__sms").removeClass("active");
                $('.settings__right_hidden').css('display', 'none')
                $('.settings__right_btn_disabled').removeClass('settings__right_btn_disabled')
                $("body").removeClass("lock");
            }
            return
        }
    
        fields[focusToIndex].focus();
    }
    fields.forEach((field) => {
        field.addEventListener("input", handleInputField);
    });
}

