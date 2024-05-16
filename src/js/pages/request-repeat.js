console.log('bigtest-open');
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

import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import Swiper from "swiper";
import { Navigation } from "swiper/modules";

Fancybox.bind('[data-fancybox="gallery"]', {
    Hash: false,
	Thumbs: false,

	compact: false,
	Toolbar: {
		display: {
			left: [],
			middle: [],
			right: ['close'],
		},
	}
});

let innerTagHtml = `
<div class="inner-tag">
    <span></span>
    <svg class="delete-hint" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="none"/>
        <path d="M8.57157 15.4285L15.4287 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15.4287 15.4285L8.57157 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> 
</div>
`;
let clickedEmployeeItem = null;
$('body').on("click", '.adding_application__item--imp .adding_application__item_settings', function () {
    clickedEmployeeItem = $(this).closest('.adding_application__item_input')
})

//добавляем тэги из модалки "выбор сотрудников" в инпут
$("body").on("click", ".modal__edit-employee--add .btn__save", function () {
    let $tagsList = clickedEmployeeItem.find(".adding_application__item_input_tags .swiper-wrapper");
    // $tagsList.empty();

    //получем названия полей из модалки и их обязательность
    let fieldData = $(this).closest('.modal-content').find('.modal__edit-employee-main').find('input').val()

    if(fieldData) {
        const $innerTag = $(innerTagHtml);
        $innerTag.find("span").text(fieldData);
        const $swiperSlide = $('<div class="swiper-slide"></div>').attr("data-id", 'test').append($innerTag);
        $tagsList.append($swiperSlide);
        clickedEmployeeItem.find(".adding_application__item_input_text").css('display','none');
        clickedEmployeeItem.find(".adding_application__item_input_tags").css('display','block');
    }

    //обновляем свайпер после добавления
    if ($(".adding_application__item_input_tags").length) {
        updateSwiper($(".adding_application__item_input_tags"));
    }
});
$("body").on("click", ".btn__share-pass-final", function () {
    if(clickedEmployeeItem) {
        let $tagsList = clickedEmployeeItem.find(".adding_application__item_input_tags .swiper-wrapper");
        // $tagsList.empty();
    
        let fieldData = $(".modal__share-pass__user")
        .map(function () {
            if($(this).find('input:checked')) {
                let $itemName = $(this);
                let itemNameText = $itemName.find(".modal__share-pass__user__name").text();
                return {
                    name: itemNameText,
                };
            }

        })
        .get();

        //вставляем тэги
        $.each(fieldData, function (_, item) {
            const $innerTag = $(innerTagHtml);
            $innerTag.find("span").text(item.name);
            const $swiperSlide = $('<div class="swiper-slide"></div>').attr("data-id", 'type').append($innerTag);

            $tagsList.append($swiperSlide);
            clickedEmployeeItem.find(".adding_application__item_input_text").css('display','none');
            clickedEmployeeItem.find(".adding_application__item_input_tags").css('display','block');
        });
    
        //обновляем свайпер после добавления
        if ($(".adding_application__item_input_tags").length) {
            updateSwiper($(".adding_application__item_input_tags"));
        }
    }

});

function updateSwiper($swiperContainer) {
    $swiperContainer.each(function () {
        const swiperInstance = $(this).data("swiper");
        if (swiperInstance) {
            swiperInstance.destroy();
        }
        console.log(this);
        initializeSwiper(this);
    });
}
//свайпер тэгов
function initializeSwiper(element) {
    return new Swiper(element, {
        loop: false,
        slidesPerView: "auto",
        modules: [Navigation],
        navigation: {
            nextEl: $(element).siblings(".swiper-button-next")[0],
        },
    });
}
$('body').on("click", '.adding_application__item--imp .delete-hint', function () {
    updateSwiper($(".adding_application__item_input_tags"));
})
console.log('bigtest-close');