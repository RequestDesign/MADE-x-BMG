import $ from "jquery";

$(function() {
    $('.login__form__inputs input').on('input', function() {
        let allInputsFilled = $('.login__form__inputs input').toArray().every(function(input) {
            return $(input).val().trim() !== '';
        });
        $('.btn__login').prop('disabled', !allInputsFilled);
    });
});

$('.btn__login').on('click', function(e){
e.preventDefault()
})