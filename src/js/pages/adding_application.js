import $ from "jquery";
import "../utils/jquery-ui.min";

$( function() {
    $( ".adding_application__list" ).sortable({
        handle: ".adding_application__item_position",
    });
});
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

$('body').on('click', '.adding_application__item_settings', function(){
    if(!$(this).closest('.adding_application__item').hasClass('active')) {
        $(this).closest('.adding_application__item').addClass('active')
        $(this).closest('.adding_application__item').find('.adding_application__item_box').slideToggle()
    }
})
$(document).on('click', function (e) {
    const count = $(e.target).closest(".adding_application__item_box").length + $(e.target).closest(".adding_application__item_settings").length
    if (count  === 0) {
        $('.adding_application__item').each(function (params) {
            if($(this).hasClass('active')) {
                $(this).find('.adding_application__item_box').slideToggle()
            }
            $(this).removeClass("active");
        })
    }
});
$('body').on('click', '.adding_application__item_name svg', function(){
    $(this).siblings('span').attr('contenteditable', true)
    placeCaretAtEnd($(this).siblings('span')[0]);
})
$('body').on('keydown', '.adding_application__item_name span', function (e) {
    
    if (e.which === 13) {
        e.preventDefault
        $(this).attr('contenteditable', false)
    }
})
$('body').on('keyup', '.adding_application__item_name_text', function (e) {
    $(this).closest('.adding_application__item').find('.adding_application__item_input_text').text($(this).text())
})