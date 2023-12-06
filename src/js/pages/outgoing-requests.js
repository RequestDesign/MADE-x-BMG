import $ from "jquery";
$('.outgoing-requests__view').on('click', function(e){

    if(!$(this).hasClass('active')) {
        $('.outgoing-requests__view').removeClass('active')
        $(this).addClass('active')
        if($('.outgoing-requests__view')[0].classList.contains('active')) {
            $('.outgoing-requests__change').removeClass('right')
            $('.outgoing-requests').addClass('outgoing-requests__other')
        } else {
            $('.outgoing-requests__change').addClass('right')
            $('.outgoing-requests').removeClass('outgoing-requests__other')
        }
    }
})