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
$('body').on('click', '.adding_application__title svg', function(){
    $(this).siblings('span').attr('contenteditable', true)
    placeCaretAtEnd($(this).siblings('span')[0]);
})
$('body').on('keydown', '.adding_application__item_name span', function (e) {
    if (e.which === 13) {
        e.preventDefault
        $(this).attr('contenteditable', false)
    }
})
$('body').on('keydown', '.adding_application__title span', function (e) {
    if (e.which === 13) {
        e.preventDefault
        $(this).attr('contenteditable', false)
    }
})
$('body').on('keyup', '.adding_application__item_name_text', function (e) {
    $(this).closest('.adding_application__item').find('.adding_application__item_input_text').text($(this).text())
})

$('body').on('click', '.adding_application__item_choice--delete', function(){
    $(this).closest('.adding_application__item').remove()
})
$('body').on('click', '.adding_application__item_choice--duplicate', function(){
    $(this).closest('.adding_application__item').removeClass('active')
    $(this).closest('.adding_application__item').find('.adding_application__item_box').slideToggle()
    var $clone = $(this).closest('.adding_application__item').clone(true)
    $clone.find('.adding_application__item_box').css('display', 'none')
    $(this).closest('.adding_application__item').after($clone)
})
$('body').on('change', '.adding_application__item_choice--checkbox', function(){
    if ($(this).is(':checked')) {
        $(this).closest('.adding_application__item_input').find('.adding_application__item_input_text').addClass('required')
    } else {
        $(this).closest('.adding_application__item_input').find('.adding_application__item_input_text').removeClass('required')
    }
})
$('body').on('click', '[data-modal="modal-create"]', function(){
    $('.modal__create').addClass('active')
})
$('body').on('click', '.adding_application__bottom_add', function(){
    var newCategory = $( `
    <div class="adding_application__item">
        <div class="adding_application__item_position ui-sortable-handle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="6" y1="8.5" x2="18" y2="8.5" stroke="#ACACAC"/>
                <line x1="6" y1="11.5" x2="18" y2="11.5" stroke="#ACACAC"/>
                <line x1="6" y1="14.5" x2="18" y2="14.5" stroke="#ACACAC"/>
            </svg>
        </div>
        <div class="adding_application__item_name">
            <span class="adding_application__item_name_text">Название</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 18.5H16.5" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.5 14.9999L8.5 15.5399L9 12.4999L15.73 5.78994C15.823 5.69621 15.9336 5.62182 16.0554 5.57105C16.1773 5.52028 16.308 5.49414 16.44 5.49414C16.572 5.49414 16.7027 5.52028 16.8246 5.57105C16.9464 5.62182 17.057 5.69621 17.15 5.78994L18.21 6.84994C18.3037 6.9429 18.3781 7.0535 18.4289 7.17536C18.4797 7.29722 18.5058 7.42793 18.5058 7.55994C18.5058 7.69195 18.4797 7.82266 18.4289 7.94452C18.3781 8.06637 18.3037 8.17698 18.21 8.26994L11.5 14.9999Z" fill="#101010" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="adding_application__item_input">
            <div class="adding_application__item_input_text">Название</div>
            <div class="adding_application__item_settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="17" r="1" transform="rotate(-180 12 17)" fill="#101010" stroke="#101010" stroke-width="0.5"/>
                    <circle cx="12" cy="12" r="1" transform="rotate(-180 12 12)" fill="#101010" stroke="#101010" stroke-width="0.5"/>
                    <circle cx="12" cy="7" r="1" transform="rotate(-180 12 7)" fill="#101010" stroke="#101010" stroke-width="0.5"/>
                </svg>
            </div>
            <div class="adding_application__item_box">
                <div class="adding_application__item_choices">
                    <div class="adding_application__item_choice adding_application__item_choice--delete"><span>Удалить поле</span></div>
                    <div class="adding_application__item_choice adding_application__item_choice--change" data-modal="modal-create" data-type="text"><span>Изменить тип поля</span></div>
                    <div class="adding_application__item_choice adding_application__item_choice--duplicate"><span>Продублировать поле</span></div>
                    <label class="adding_application__item_choice checkbox-wrapper">
                        <span>Обязательное поле</span>
                        <input class="adding_application__item_choice--checkbox" type="checkbox">
                        <div class="checkbox-icon"></div>
                    </label>
                </div>
            </div>
        </div>
    </div>
    `)
    $('.adding_application__list').append(newCategory)
})

$('body').on('change', '.adding_application__photo_add input', function (e) {
    if($(this).closest('.adding_application__photo').find('.adding_application__photo_empty').length) {
        $(this).closest('.adding_application__photo').find('.adding_application__photo_empty').remove()
        let fileImgElement = document.createElement('img');
        fileImgElement.src = URL.createObjectURL(this.files[0]);
        $(this).closest('.adding_application__photo')[0].prepend(fileImgElement)
    } else {
        const imgTake = $(this).closest('.adding_application__photo').find('img')
        imgTake.attr('src', URL.createObjectURL(this.files[0]));
    }
})