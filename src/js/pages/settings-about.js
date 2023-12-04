import $ from "jquery";

$('.settings-about__dropdown_top').on('click', function(e){
    $(this).toggleClass('open')
    $(this).closest('.settings-about__dropdown').find('.settings-about__dropdown_bottom').slideToggle()
})