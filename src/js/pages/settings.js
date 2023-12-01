import $ from "jquery";

$('.settings__center_input_open').on('click', function(e){
    if($(this).closest('.settings__center_input').find('input[readonly]').length) {
        $(this).closest('.settings__center_input').find('input').attr("readonly", false); 
    } else {
        $(this).closest('.settings__center_input').find('input').attr("readonly", true); 
    }
})
$('.settings__right_hidden_btn').on('click', function(e){
    $(this).closest('.settings__right_hidden').css('display', 'none')
})
$('.users__tenant_settings').on('click', function(e){
    $(this).closest('.users__tenant_item').find('.users__tenant_choice').slideToggle()
    $(this).closest('.users__tenant_item').toggleClass('active')
})