import $ from "jquery";

$(function () {
    toggleButtonState();
    $("#inputDate").on("input", toggleButtonState);
    function toggleButtonState() {
        let inputValue = $("#inputDate").val();
        if (inputValue && inputValue.trim() !== "") {
            $(".btn__repeat-request").prop("disabled", false);
        } else {
            $(".btn__repeat-request").prop("disabled", true);
        }
    }
});
