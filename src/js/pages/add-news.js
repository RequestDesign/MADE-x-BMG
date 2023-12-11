import $ from "jquery";

$(function() {
    $('#addNewsForm input').on('input', function() {
        let allInputsFilled = $('#addNewsForm input').toArray().every(function(input) {
            return $(input).val().trim() !== '';
        });
        $('.btn__send-news').prop('disabled', !allInputsFilled);
    });
});

$('.btn__send-news').on('click', function(e){
e.preventDefault()
})