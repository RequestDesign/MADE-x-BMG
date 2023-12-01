import $ from "jquery";
$('.notifications__view').on('click', function(e){

    if(!$(this).hasClass('active')) {
        $('.notifications__view').removeClass('active')
        $(this).addClass('active')
        if($('.notifications__view')[0].classList.contains('active')) {
            $('.notifications__change').removeClass('right')
            $('.notifications').addClass('notifications__other')
        } else {
            $('.notifications__change').addClass('right')
            $('.notifications').removeClass('notifications__other')
        }
    }
})