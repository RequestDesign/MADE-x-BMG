import $ from "jquery";

$(function() {
    toggleButtonState();
    $('#inputDate').on('input', toggleButtonState);
    function toggleButtonState() {
        if ($('#inputDate').val().trim() !== '') {
            $('.btn__repeat-request').prop('disabled', false);
        } else {
            $('.btn__repeat-request').prop('disabled', true);
        }
    }
});