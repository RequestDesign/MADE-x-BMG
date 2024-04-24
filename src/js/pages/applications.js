import $ from "jquery";
import "../utils/jquery-ui.min";


function renameElement($element,newElement){

    $element.wrap("<"+newElement+">");
    var $newElement = $element.parent();

    //Copying Attributes
    $.each($element.prop('attributes'), function() {
        $newElement.attr(this.name,this.value);
    });

    $element.contents().unwrap();       

    return $newElement;
}

$( function() {
    $( ".applications__item_body" ).sortable({
        cursor: "grabbing"
    });
} );

$('body').on('click', '.applications__item_head_settings', function(){
    let clickedItem = $(this).closest('.applications__item');
    if(clickedItem.hasClass('active')) {
        clickedItem.find('.applications__item_head_box').slideUp();
        clickedItem.removeClass("active");
    } else {
        $('.applications__item.active').not(clickedItem).each(function () {
            $(this).find('.applications__item_head_box').slideUp();
            $(this).removeClass("active");
        });
        clickedItem.addClass('active');
        clickedItem.find('.applications__item_head_box').slideToggle();
    }
});

$(document).on('click', function (e) {
    if ($(e.target).closest(".applications__item_head").length === 0) {
        $('.applications__item.active').each(function () {
            $(this).find('.applications__item_head_box').slideUp();
            $(this).removeClass("active");
        });
    }
});

$('body').on('click','.applications__delete', function(){
    $(this).closest('.applications__item').remove()
})
$('body').on('click','.applications__edit_section', function(){
    $(this).closest('.applications__item').addClass('show_change')
    $(this).closest('.applications__item').find('.applications__box').each(function (params) {
        renameElement($(this),'div');
    })
})
$('body').on('click','.applications__item_save', function(){
    $(this).closest('.applications__item').removeClass('show_change')
    $(this).closest('.applications__item').find('.applications__item_head_name').find('span').attr('contenteditable', false)
    $(this).closest('.applications__item').find('.applications__box').each(function (params) {
        renameElement($(this),'a');
    })
})
$('body').on('click', '.applications__box_name', function(){
    if($(this).closest('.applications__item').hasClass('show_change')) {
        $(this).find('span').trigger( "focus" )
    }
})

$('body').on("click",'[data-modal="modal-delete"]', function (e) {
    e.preventDefault()
    console.log($(this).closest('.applications__box').index());
    console.log($(this).closest('.applications__item').index());
    localStorage.setItem('app_item', $(this).closest('.applications__item').index())
    localStorage.setItem('app_box', $(this).closest('.applications__box').index())
    $(".modal__move-choice").addClass("active");
});

$('.btn__move-choice-final_delete').on("click", function (e) {
    e.preventDefault()
    const indexItem = Number(localStorage.getItem('app_item'))
    const indexBox = Number(localStorage.getItem('app_box'))
    $($($('.applications__item')[indexItem]).find('.applications__box')[indexBox]).remove();
    $(".modal__move-choice").removeClass("active");
});

//добавить столбец
$('body').on("click",'.applications__add_column', function (e) {
    e.preventDefault()
    let newColum = document.createElement('div')
    newColum.classList.add("applications__item")
    newColum.classList.add("show_change")
    newColum.innerHTML = `
        <div class="applications__item_head">
            <div class="applications__item_head_photo empty">
                <svg class="applications__item_head_photo_del" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5.24333 20L18.7703 20C19.4494 20 20 19.449 20 18.7693L20 5.23109C20 4.55137 19.4494 4.00035 18.7703 4.00035L5.24333 4.00035C4.56418 4.00035 4.01361 4.55137 4.01361 5.23109L4.01361 18.7693C4.01361 19.449 4.56418 20 5.24333 20Z" stroke="#ACACAC" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7614 11.3838C15.9499 11.3838 16.9134 10.4195 16.9134 9.22997C16.9134 8.04046 15.9499 7.07617 14.7614 7.07617C13.5729 7.07617 12.6094 8.04046 12.6094 9.22997C12.6094 10.4195 13.5729 11.3838 14.7614 11.3838Z" stroke="#ACACAC" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.9445 20.0001C14.5486 17.8893 13.4162 15.9881 11.7494 14.6355C10.0826 13.2829 7.98986 12.567 5.84458 12.6156C5.22563 12.6139 4.60795 12.6716 4 12.7879" stroke="#ACACAC" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.9858 15.5808C18.9954 15.2461 17.9569 15.0756 16.9115 15.0762C15.5883 15.0733 14.2784 15.3414 13.0625 15.8639" stroke="#ACACAC" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <label class="applications__item_head_photo_add">
                    <input type="file" name="section_image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1V11" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 5.9668H11" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </label>
            </div>
            <div class="applications__item_head_name">
                <span>Название</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 18.5H16.5" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.5 14.9999L8.5 15.5399L9 12.4999L15.73 5.78994C15.823 5.69621 15.9336 5.62182 16.0554 5.57105C16.1773 5.52028 16.308 5.49414 16.44 5.49414C16.572 5.49414 16.7027 5.52028 16.8246 5.57105C16.9464 5.62182 17.057 5.69621 17.15 5.78994L18.21 6.84994C18.3037 6.9429 18.3781 7.0535 18.4289 7.17536C18.4797 7.29722 18.5058 7.42793 18.5058 7.55994C18.5058 7.69195 18.4797 7.82266 18.4289 7.94452C18.3781 8.06637 18.3037 8.17698 18.21 8.26994L11.5 14.9999Z" fill="#101010" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="applications__item_head_settings">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="17" r="1" transform="rotate(-180 12 17)" fill="#101010" stroke="#101010" stroke-width="0.5"/>
                    <circle cx="12" cy="12" r="1" transform="rotate(-180 12 12)" fill="#101010" stroke="#101010" stroke-width="0.5"/>
                    <circle cx="12" cy="7" r="1" transform="rotate(-180 12 7)" fill="#101010" stroke="#101010" stroke-width="0.5"/>
                </svg>
            </div>
            <div class="applications__item_head_box">
                <div class="applications__item_head_choices">
                    <div class="applications__item_head_choice applications__edit_section">Отредактировать раздел</div>
                    <div class="applications__item_head_choice applications__delete">Удалить раздел</div>
                    <div class="applications__item_head_choice applications__add_column">Добавить столбец (категорию)</div>
                    <div class="applications__item_head_choice applications__add_subcategory">Добавить подкатегорию заявки</div>
                </div>
            </div>
        </div>
        <div class="applications__item_body">
        </div>
        <div class="applications__item_footer">
            <div class="applications__item_footer_change applications__add_subcategory">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#F9EC00"/>
                    <path d="M12 7V17" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 11.9688H17" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Добавить подкатегорию заявки</span>
            </div>
            <div class="btn applications__item_save">Сохранить</div>
        </div>
    `
    $( function() {
        $(newColum).find( ".applications__item_body" ).sortable({
            cursor: "grabbing"
        });
    } );
    document.querySelector('.applications__container').append(newColum)
});

//добавить подкатегорию
$('body').on("click",'.applications__add_subcategory', function (e) {
    e.preventDefault()
    var newCategory = $( `
    <a href="#!" class="applications__box ui-sortable-handle">
        <label class="applications__box_change_img">
            <input type="file" name="subcategory_image">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#F9EC00"></circle>
                <path d="M12 7V17" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M7 11.9688H17" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </label>
        <div class="applications__box_img empty">
            <img>
        </div>
        <div class="applications__box_name">
            <span contenteditable>Название</span>
        </div>
        <svg data-modal="modal-delete" class="applications__box_delete" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#101010"/>
            <path d="M16 8L8 16" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 8L16 16" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </a>
    `)
    $(this).closest('.applications__item').find('.applications__item_body').append(newCategory)
    $(this).closest('.applications__item').addClass('show_change')
});

$('body').on('click', '.applications__item_head_name svg', function () {
    $(this).closest('.applications__item_head_name').find('span').attr('contenteditable', true)
})
$('body').on('keydown', '.applications__item_head_name span', function (e) {
    if (e.which === 13) {
        e.preventDefault
        $(this).attr('contenteditable', false)
    }
})
$('body').on('change', '.applications__item_head_photo_add input', function (e) {
    if($(this).closest('.applications__item_head_photo').hasClass('empty')) {
        $(this).closest('.applications__item_head_photo').removeClass('empty')
        $(this).closest('.applications__item_head_photo').find('.applications__item_head_photo_del').remove()
        let fileImgElement = document.createElement('img');
        fileImgElement.src = URL.createObjectURL(this.files[0]);
        $(this).closest('.applications__item_head_photo')[0].prepend(fileImgElement)
    } else {
        const imgTake = $(this).closest('.applications__item_head_photo').find('img')
        imgTake.attr('src', URL.createObjectURL(this.files[0]));
    }
})
$('body').on('change', '.applications__box_img_add input', function (e) {
    if($(this).closest('.applications__box_img').hasClass('empty')) {
        const box = $(this).closest('.applications__box_img')
        box.removeClass('empty')
        box.find('.applications__box_img_add').remove()
        box.find('svg').remove()
        let fileImgElement = document.createElement('img');
        fileImgElement.src = URL.createObjectURL(this.files[0]);
        box[0].prepend(fileImgElement)
    } else {
        const imgTake = $(this).closest('.applications__box_img').find('img')
        imgTake.attr('src', URL.createObjectURL(this.files[0]));
    }
})

//меняем фото в подкатегории
$('body').on('change', '.applications__box_change_img input', function (e) {
    let boxContainer = $(this).closest('.applications__box');
    if (boxContainer.hasClass('empty')) {
        boxContainer.removeClass('empty');
        boxContainer.find('.applications__box_img img').remove();
        let fileImgElement = document.createElement('img');
        fileImgElement.src = URL.createObjectURL(this.files[0]);
        boxContainer.find('.applications__box_img')[0].prepend(fileImgElement);
    } else {
        const imgElement = boxContainer.find('.applications__box_img img');
        imgElement.attr('src', URL.createObjectURL(this.files[0]));
    }
});

$('.applications__box_delete_worker').on('click', function (e) {
    $(this).closest('.applications__box_worker').remove()
})

$('.applications__add_employee').on('click', function (e) {
    $('.modal__share-pass').addClass('active')
})
