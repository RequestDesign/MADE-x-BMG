import $ from "jquery";
import "../utils/jquery-ui.min";
import Swiper from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";
import itemTemplates from './../utils/templates'

function remToPx(remValue) {
    var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    var pxValue = remValue * htmlFontSize;
    return Math.round(pxValue) + "px";
}

//ввод с конца текста
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
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

let clickedItem = null;
let clickedEmployeeItem = null;
let clickedCheckbox = null;

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

//изменить фото справа
$("body").on("change", ".adding_application__photo_add input", function (e) {
    if ($(this).closest(".adding_application__photo").find(".adding_application__photo_empty").length) {
        $(this).closest(".adding_application__photo").find(".adding_application__photo_empty").remove();
        let fileImgElement = document.createElement("img");
        fileImgElement.src = URL.createObjectURL(this.files[0]);
        $(this).closest(".adding_application__photo")[0].prepend(fileImgElement);
    } else {
        const imgTake = $(this).closest(".adding_application__photo").find("img");
        imgTake.attr("src", URL.createObjectURL(this.files[0]));
    }
});

//меняем поля местами
$(function () {
    $(".adding_application__list").sortable({
        handle: ".adding_application__item_position",
        cursor: "grabbing",
    });
});

//изменить название поля
$("body").on("click", ".adding_application__item_name svg, .adding_application__title svg", function () {
    $(this).siblings("span").attr("contenteditable", true);
    placeCaretAtEnd($(this).siblings("span")[0]);
});

$("body").on("keydown", ".adding_application__item_name span, .adding_application__title span", function (e) {
    if (e.which === 13) {
        e.preventDefault();
        $(this).attr("contenteditable", false);
    }
});

//меняем название поля + плейсхолдер
$("body").on("keyup", ".adding_application__item_name_text", function () {
    $(this)
        .closest(".adding_application__item")
        .find(".adding_application__item_input_text")
        .text(`Введите ${$(this).text().toLowerCase()}`);
});

//Dropdown (.adding_application__item_box)
$("body").on("click", ".adding_application__item_settings", function () {
    let $activeElement = $(this).closest(".adding_application__item");
    $(".adding_application__item").not($activeElement).removeClass("active").find(".adding_application__item_box").slideUp();
    $activeElement.toggleClass("active");
    let $itemBox = $activeElement.find(".adding_application__item_box");
    $itemBox.slideToggle($activeElement.hasClass("active"));

    if ($activeElement.hasClass("adding_application__item--checkbox")) {
        clickedCheckbox = $activeElement;
    }
});

// $(document).on("click", function (e) {
//     const count = $(e.target).closest(".adding_application__item_box").length + $(e.target).closest(".adding_application__item_settings").length;
//     if (count === 0) {
//         $(".adding_application__item").each(function (params) {
//             if ($(this).hasClass("active")) {
//                 $(this).find(".adding_application__item_box").slideToggle();
//             }
//             $(this).removeClass("active");
//         });
//     }
// });

//удалить поле
$("body").on("click", ".adding_application__item_choice--delete", function () {
    $(this).closest(".adding_application__item").remove();
    checkListEmpty();
    checkCheckboxGroup();
});

//удалены все чек боксы - удаляем группу
function checkCheckboxGroup() {
    $(".adding_application__item_group").each(function () {
        if (!$(this).find(".adding_application__item--checkbox").length) {
            $(this).remove();
        }
    });
}

//удалить поле с чекбоксами
$("body").on("click", ".adding_application__item_choice--delete-group", function () {
    $(this).closest(".adding_application__item_group").remove();
    checkListEmpty();
});

//дублировать поле
$("body").on("click", ".adding_application__item_choice--duplicate", function () {
    let $originalItem = $(this).parents(".adding_application__item_group, .adding_application__item--checkbox").first();

    if ($originalItem.length === 0) {
        $originalItem = $(this).closest(".adding_application__item");
    }

    if ($originalItem.length > 0) {
        $originalItem.find(".adding_application__item_box").slideUp();
        $originalItem.removeClass("active");
        const $clone = $originalItem.clone(true);
        $originalItem.after($clone);
        $clone.find(".adding_application__item_box").hide();

        if ($clone.find(".adding_application__item_input_tags").length) {
            $(".adding_application__item_input_tags").each(function () {
                initializeSwiper(this);
            });
        }
    }
});

//чекбокс "обязательное поле"
$("body").on("change", ".adding_application__item_choice--checkbox", function () {
    if ($(this).is(":checked")) {
        $(this).closest(".adding_application__item_input").find(".adding_application__item_input_text").addClass("required");
    } else {
        $(this).closest(".adding_application__item_input").find(".adding_application__item_input_text").removeClass("required");
    }
});

//добавить новое поле
function addNewField(targetContainer, type) {
    const selectedTemplate = itemTemplates.find((item) => item.type === type);

    if (selectedTemplate) {
        const newCategory = $(selectedTemplate.html);
        $(targetContainer).append(newCategory);
        checkListEmpty();
        bindLinkEventHandlers();
        updateLinkField();
    }
}

$("body").on("click", ".adding_application.adding_application--links .adding_application__bottom_add", () => addNewField(".adding_application--links .adding_application__list", "link"));
$("body").on("click", ".adding_application:not(.adding_application--links) .adding_application__bottom_add", () =>
    addNewField(".adding_application:not(.adding_application--links) .adding_application__list", "text-input")
);
$("body").on("click", ".btn__add-field", () => addNewField(".modal__edit-employee__list", "text-input"));

//добавить подсказку
$("body").on("click", ".adding_application__item_choice--hint", function () {
    let hintHTML = `
    <div class="adding_application__item_hint">
        <input type="text" placeholder="Текст подсказки">
        <svg class="delete-hint" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="none" />
            <path d="M8.57157 15.4285L15.4287 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.4287 15.4285L8.57157 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
    `;

    if ($(this).closest(".adding_application__item").parent().hasClass("adding_application__item_group")) {
        let itemGroup = $(this).closest(".adding_application__item").parent();
        itemGroup.append(hintHTML);
        $(this).closest(".adding_application__item_box").slideUp();
    } else {
        $(this).closest(".adding_application__item_input-wrapper").append(hintHTML);
        $(this).closest(".adding_application__item_box").slideUp();
    }
});

//удалить подсказку
$("body").on("click", ".delete-hint", function () {
    $(this).closest(".adding_application__item_hint").remove();
});

//модалка изменить тип поля
$(".adding_application, .modal__edit-employee").on("click", '[data-modal="modal-create"]', function () {
    $(".modal__create__form_item:nth-of-type(14)").hide();
    $(".modal__create").addClass("active");
    //скрываем "выбор сотрудников", "чек-боксы", "буллиты", "текст", "подзаголовок", если модалка вызвана из .modal__edit-employee
    const isBothModalsActive = $(".modal__create").hasClass("active") && $(".modal__edit-employee").hasClass("active");
    $(".modal__create__form_item:nth-of-type(7)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(10)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(11)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(12)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(13)").toggle(!isBothModalsActive);
});

//модалка изменить тип поля вызвана с заявки типа ссылки
$(".adding_application--links").on("click", '[data-modal="modal-create"]', function () {
    $(".modal__create").addClass("active");
    $(".modal__create__form_item").hide();
    $(".modal__create__form_item:nth-of-type(11)").show();
    $(".modal__create__form_item:nth-of-type(12)").show();
    $(".modal__create__form_item:nth-of-type(13)").show();
    $(".modal__create__form_item:nth-of-type(14)").show();
});

//галочка в модалке соответствует типу поля (при изменении типа поля)
function syncModalItem() {
    if (!clickedItem) return;
    const dataType = clickedItem.data("type");
    const radioInput = $(`.modal__create__form [data-type="${dataType}"]`);
    if (radioInput.length > 0) {
        $(".modal__create__form input[name='field']").prop("checked", false);
        radioInput.prop("checked", true);
    }
}

$("body").on("click", ".adding_application__item_choice--change", function () {
    clickedItem = $(this).closest(".adding_application__item");
    syncModalItem();
});

$("body").on("click", ".adding_application__item_group .adding_application__item_choice--change", function () {
    clickedItem = $(this).closest(".adding_application__item_group");
    syncModalItem();
});

$("body").on("click", ".adding_application__item_choice-addbox", function () {
    const item = $(this).closest(".adding_application__item");
    const selectedTemplate = itemTemplates.find((item) => item.type === 'checkboxes');

    if (selectedTemplate) {
        console.log(123);
        const newCategory = $(selectedTemplate.html);
        $(item).after(newCategory);
        checkListEmpty();
        bindLinkEventHandlers();
        updateLinkField();
    }
});

//открываем модалку "изменить тип поля" по клику на "добавить поле при активном чекбоксе"
$("body").on("click", ".adding_application__item_choice--add-checkbox-field", function () {
    $(this).closest(".adding_application__item_box").slideUp();

    const modalCreate = $(".modal__create");
    modalCreate.addClass("active");
    modalCreate.find(".btn").addClass("add-active-checkbox-field");
    modalCreate.find("input").prop("checked", false);

    const addingActiveCheckboxField = $(".modal__create").hasClass("active");
    $(".modal__create__form_item:nth-of-type(10)").toggle(!addingActiveCheckboxField);
    $(".modal__create__form_item:nth-of-type(11)").toggle(!addingActiveCheckboxField);
    $(".modal__create__form_item:nth-of-type(12)").toggle(!addingActiveCheckboxField);
    $(".modal__create__form_item:nth-of-type(13)").toggle(!addingActiveCheckboxField);
    $(".modal__create__form_item:nth-of-type(14)").hide();
});

let chosenFieldText = null;
let chosenFieldType = null;
let chosenField = null;

//вызываем обновление data-type у кнопки при клике на тип поля
$(".modal__create input").on("click", function () {
    chosenField = $(this);
    updateDataModalAttribute(chosenField);
    chosenFieldText = chosenField.closest(".modal__create__form_item").find("span").text();
    
    chosenFieldType = chosenField.closest(".modal__create__form_item").find('input').data('type');
    console.log(chosenFieldType)
});

//обновляем data-type у кнопки, чтобы вызвать нужную модалку
const updateDataModalAttribute = function (chosenField) {
    const modalCreateBtn = $(".modal__create .add-active-checkbox-field");
    if (chosenField.attr("data-type") === "employee-input") {
        modalCreateBtn.attr("data-modal", "edit-employee");
    } else {
        modalCreateBtn.attr("data-modal", "edit-field");
    }
};

//модалка "отредактируйте поле"
$("body").on("click", '[data-modal="edit-field"]', function () {
    $(".modal__create").removeClass("active");
    $(".modal__edit-field").addClass("active");
    $(".modal__edit-field").find("input:first").val(chosenFieldText);
});

//добавляем поле при активном чекбоксе(кроме "выбор сотрудников")
$(".modal__edit-field").on("click", ".btn__save", function () {
    let $modal = $(this).closest(".modal__edit-field");
    let $tagsList = clickedCheckbox.find(".adding_application__item_input_tags .swiper-wrapper");

    let fieldTitle = $modal.find(".adding_application__item input:first-of-type").val() || chosenFieldText;
    let hintText = $modal.find(".input-hint").val();

    const $innerTag = $(innerTagHtml);
    $innerTag.find("span").text(fieldTitle);
    const $swiperSlide = $('<div class="swiper-slide"></div>').attr("data-id", chosenFieldType).append($innerTag);

    //если галочка "обязательное поле"
    if ($(".modal__edit-field__input-check input").prop("checked")) {
        $swiperSlide.find('span').parent().addClass('required')
        $swiperSlide.find('span').html(`${fieldTitle}<b>*</b>`)
    }

    //если есть подсказка
    if (hintText !== '') {
        $swiperSlide.find('.inner-tag').after(`
        <div class="inner-tag-hint">
            ${hintText}
        </div>
        `)
    }

    $tagsList.append($swiperSlide);

    //обновляем свайпер после добавления
    if ($(".adding_application__item_input_tags").length) {
        updateSwiper($(".adding_application__item_input_tags"));
    }

    checkTags();
    checkCheckboxTags();
});

//удаляем поле при активном чек-боксе/тэг в "добавить сотрудника"
$("body").on("click", ".inner-tag .delete-hint", function () {
    const $tagToDelete = $(this).closest(".inner-tag");
    const $swiperContainer = $tagToDelete.closest(".adding_application__item_input_tags");

    if ($tagToDelete.closest(".swiper-slide").length > 0) {
        $tagToDelete.closest(".swiper-slide").remove();
        updateSwiper($swiperContainer);
        checkTags();
        checkCheckboxTags();
    } else {
        $tagToDelete.remove();
        updateSwiper($swiperContainer);
    }
    checkTags();
    checkCheckboxTags();
});

//модалка введите данные сотрудника
$("body").on("click", '[data-modal="edit-employee"]', function () {
    //вызвана из "добавить поле при активном чек боксе"
    if ($(this).hasClass("add-active-checkbox-field")) {
        clickedEmployeeItem = clickedCheckbox;
        $(".modal__edit-employee").addClass("active");
    } else {
        //вызвана из "редактировать поле"
        clickedEmployeeItem = $(this).closest(".adding_application__item[data-type='employee-input']");
    }
    $(".modal__edit-employee").addClass("active");
    checkTags();
    checkCheckboxTags();
});

//удалены все поля в модалке
function checkListEmpty() {
    const $modalList = $(".modal__edit-employee__list");
    const $modalListEmpty = $(".modal__edit-employee__list_empty");
    $modalListEmpty.toggle(!$modalList.find(".adding_application__item").length);
}

//изменить тип поля (удаляем прошлое и всталяем из массива)
$(".modal__create__form").on("submit", function (e) {
    e.preventDefault();
    if (!clickedItem) return;
    const selectedType = $("input[name='field']:checked").data("type");
    const selectedTemplate = itemTemplates.find((item) => item.type === selectedType);
    if (selectedTemplate) {
        clickedItem.replaceWith(selectedTemplate.html);
        bindLinkEventHandlers();
        updateLinkField();
    }
    clickedItem = null;
    checkTags();
});

//если есть тэги в поле "добавить сотрудника" - убираем текст, добавляем кнопку
function checkTags() {
    $('[data-type="employee-input"] .adding_application__item_input').each(function () {
        let $employeeInput = $(this);
        let $employeeInputText = $employeeInput.find(".adding_application__item_input_text");
        let $employeeBtnNext = $employeeInput.find(".swiper-button-next");
        $employeeInputText.toggle(!$employeeInput.find(".inner-tag").length);

        //показываем кнопку next если тэги не влезают
        let $innerTags = $employeeInput.find(".inner-tag");
        let totalTagsWidth = 0;
        $innerTags.each(function () {
            totalTagsWidth += parseFloat($(this).css("width"));
        });
        $employeeBtnNext.toggle(totalTagsWidth > parseFloat(remToPx(75)));

        if (!$employeeInput.find(".inner-tag").length) {
            $(this).find(".adding_application__item_input_tags").hide();
        } else {
            $(this).find(".adding_application__item_input_tags").show();
        }
    });
}

//если есть тэги в чекбоксе - добавляем кнопку
function checkCheckboxTags() {
    $(".adding_application__item--checkbox .adding_application__item_input").each(function () {
        let $checkboxInput = $(this);
        let $checkboxBtnNext = $checkboxInput.find(".swiper-button-next");
        let $innerTags = $checkboxInput.find(".inner-tag");
        let totalTagsWidth = 0;
        $innerTags.each(function () {
            totalTagsWidth += parseFloat($(this).css("width"));
        });
        $checkboxBtnNext.toggle(totalTagsWidth > parseFloat(remToPx(60)));

        if (!$checkboxInput.find(".inner-tag").length) {
            $(this).find(".adding_application__item_input_tags").hide();
        } else {
            $(this).find(".adding_application__item_input_tags").show();
        }
    });
}

$(function () {
    checkTags();
    checkCheckboxTags();
});

//добавляем тэги из модалки "выбор сотрудников" в инпут
$("body").on("click", ".modal__edit-employee .btn__save", function () {
    if($(this).hasClass('btn__add-imp')) return
    let $modal = $(this).closest(".modal__edit-employee");
    let $tagsList = clickedEmployeeItem.find(".adding_application__item_input_tags .swiper-wrapper");
    $tagsList.empty();

    //получем названия полей из модалки и их обязательность
    let fieldData = $modal
        .find(".adding_application__item_name")
        .map(function () {
            let $itemName = $(this);
            let itemNameText = $itemName.find("span").text();
            let itemType = $itemName.closest('.adding_application__item').data("type");
            let itemHintText = $itemName.closest('.adding_application__item').find('.adding_application__item_hint input').val() || ''
            let isRequired = $itemName.closest('.adding_application__item').find('.adding_application__item_input_text').hasClass('required');
            return {
                name: itemNameText,
                type: itemType,
                required: isRequired,
                hint: itemHintText
            };
        })
        .get();

    //вставляем тэги
    $.each(fieldData, function (_, item) {
        const $innerTag = $(innerTagHtml);
        $innerTag.find("span").text(item.name);
        const $swiperSlide = $('<div class="swiper-slide"></div>').attr("data-id", item.type).append($innerTag);
        //если поле обязательное
        if (item.required == true) {
            $swiperSlide.find('span').parent().addClass('required')
            $swiperSlide.find('span').html(`${item.name}<b>*</b>`)
        }

        //если есть подсказка
        if (item.hint !== '') {
            $swiperSlide.find('.inner-tag').after(`
                <div class="inner-tag-hint">
                    ${item.hint}
                </div>
            `);
        }

        $tagsList.append($swiperSlide);
        checkTags();
        checkCheckboxTags();
    });

    //если галочка "выбрать из списка"
    if ($(".modal__edit-employee__input-check input").prop("checked")) {
        const $innerTagChecked = $(innerTagHtml);
        $innerTagChecked.find("span").text("Сотрудники из списка");
        const $swiperSlideChecked = $('<div class="swiper-slide"></div>').attr("data-id", "empl-from-list").append($innerTagChecked);
        $tagsList.prepend($swiperSlideChecked);
        checkTags();
        checkCheckboxTags();
    }

    //обновляем свайпер после добавления
    if ($(".adding_application__item_input_tags").length) {
        updateSwiper($(".adding_application__item_input_tags"));
    }
});

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

$(".adding_application__item_input_tags").each(function () {
    initializeSwiper(this);
});

function updateSwiper($swiperContainer) {
    $swiperContainer.each(function () {
        const swiperInstance = $(this).data("swiper");
        if (swiperInstance) {
            swiperInstance.destroy();
        }
        initializeSwiper(this);
    });
}

//qr
$(function () {
    $(".qr").on("click", function () {
        $(".qr__activated").toggleClass("active");
        if ($(".qr__activated").hasClass("active")) {
            $(".adding_application__top").after(`
                <div class="adding_application__item_input-wrapper adding_application__qr-field">
                    <label class="adding_application__item_input">
                        <div class="adding_application__item_input_text">Администратор выбирает срок действия пропуска</div>
                        <div class="modal__change-work__radio radio-wrapper">
                            <input type="checkbox">
                            <div class="radio-icon"></div>
                        </div>
                    </label>
                </div>
            `);
        } else {
            $(".adding_application__qr-field").remove();
        }
    });
});

//tabs
$(function () {
    $(".adding_application__tab").on("click", function () {
        if (!$(this).hasClass("active") && $(this).attr("data-modal") === "change-application-type") {
            $(".modal__change-application-type").addClass("active");
        }
    });

    $(".btn__change").on("click", function () {
        $(".adding_application__tab").removeClass("active");
        $(this).closest(".modal__change-application-type").removeClass("active");
        let clickedTab = $('.adding_application__tab[data-modal="change-application-type"]');
        $(".adding_application__tab").attr("data-modal", "change-application-type");
        clickedTab.addClass("active").attr("data-modal", "");
    });
});

//манипуляции с полем ссылка
function bindLinkEventHandlers() {
    //изменить фото
    $(".adding_application__item--link").on("change", ".adding_application__item_choice--change-pic input", function () {
        const item = $(this).closest(".adding_application__item");
        const picContainer = item.find(".adding_application__item_pic");
        const file = this.files[0];

        if (picContainer.hasClass("empty")) {
            picContainer.removeClass("empty");
            const fileImgElement = $("<img>");
            fileImgElement.attr("src", URL.createObjectURL(file));
            picContainer.prepend(fileImgElement);
        } else {
            const img = picContainer.find("img");
            img.attr("src", URL.createObjectURL(file));
        }
        $(this).closest(".adding_application__item_box").slideUp();
        item.removeClass("active");
        updateLinkField();
    });

    //удалить фото
    $(".adding_application__item--link").on("click", ".adding_application__item_choice--delete-pic", function () {
        const item = $(this).closest(".adding_application__item");
        const picContainer = item.find(".adding_application__item_pic");

        if (picContainer.hasClass("empty")) {
            return;
        } else {
            picContainer.addClass("empty");
            const fileImgElement = picContainer.find("img");
            const fileInput = item.find(".adding_application__item_choice--change-pic input");
            fileImgElement.remove();
            fileInput.val("");
        }
        $(this).closest(".adding_application__item_box").slideUp();
        item.removeClass("active");
        updateLinkField();
    });
}

//Изменить текст в "изменить фото", скрыть "удалить фото", если фото нет
const updateLinkField = function () {
    $(".adding_application__item--link").each(function () {
        const $picContainer = $(this).find(".adding_application__item_pic");
        const $deletePicChoice = $(this).find(".adding_application__item_choice--delete-pic");
        const $changePicChoice = $(this).find(".adding_application__item_choice--change-pic span");

        if ($picContainer.hasClass("empty")) {
            $deletePicChoice.hide();
            $changePicChoice.text("Добавить фото");
        } else {
            $deletePicChoice.show();
            $changePicChoice.text("Изменить фото");
        }
    });
};

$(function () {
    updateLinkField();
    bindLinkEventHandlers();
});

//фото у названия заявки
$(function () {
    $('.adding_application__top-img input[type="file"]').on("change", function (e) {
        if (e.target.files.length > 0) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                let img = $("<img>").attr("src", e.target.result);
                if ($(".adding_application__top-img").hasClass("empty")) {
                    $(".adding_application__top-img").removeClass("empty").append(img);
                } else {
                    $(".adding_application__top-img img").replaceWith(img);
                }
            };
            reader.readAsDataURL(file);
        }
    });
});
