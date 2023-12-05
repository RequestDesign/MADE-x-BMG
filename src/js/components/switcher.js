import $ from "jquery";

$('.switcher__btn').on('click', function (evt) {
    evt.preventDefault();
    let $this = $(this);
    let index = $this.index();
    let $switcher = $this.closest('.switcher');
    let $switcher_container = $switcher.find('.switcher__container');
    let $switcher_contents = $switcher_container.find('.switcher__content');
    $this.siblings('.switcher__btn').removeClass('active');
    $this.addClass('active');
    $switcher_contents.removeClass('active')
    $($switcher_contents[index]).addClass('active');
})

$('.users__tab').on('click', function (evt) {
    evt.preventDefault();
    let $this = $(this);
    let data = $this.data("department");
    let $switcher = $this.closest('.users__container');
    let $switcher_container = $switcher.find('.users__tbody');
    let $switcher_contents = $switcher_container.find('.users__item');
    $this.siblings('.users__tab').removeClass('active');
    $this.addClass('active');
    if(data == 'all') {
        $switcher_contents.css('display', 'grid');
    } else {
        let $switcher_contents_need = $switcher_container.find(`*[data-department="${data}"]`);
        $switcher_contents.css('display', 'none')
        $switcher_contents_need.css('display', 'grid');
    }
}) 