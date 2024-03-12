import $ from "jquery";
import "../utils/jquery-ui.min";
import Swiper from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";

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
    let activeElement = $(this).closest(".adding_application__item");
    $(".adding_application__item").not(activeElement).removeClass("active").find(".adding_application__item_box").slideUp();
    activeElement.toggleClass("active").find(".adding_application__item_box").slideToggle();
});

$(document).on("click", function (e) {
    const count = $(e.target).closest(".adding_application__item_box").length + $(e.target).closest(".adding_application__item_settings").length;
    if (count === 0) {
        $(".adding_application__item").each(function (params) {
            if ($(this).hasClass("active")) {
                $(this).find(".adding_application__item_box").slideToggle();
            }
            $(this).removeClass("active");
        });
    }
});

//удалить поле
$("body").on("click", ".adding_application__item_choice--delete", function () {
    $(this).closest(".adding_application__item").remove();
    checkListEmpty();
});

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
function addNewField(targetContainer) {
    const newCategory = $(`
        <div class="adding_application__item" data-type="text-input">
            <div class="adding_application__item_position ui-sortable-handle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="6" y1="8.5" x2="18" y2="8.5" stroke="#ACACAC" />
                    <line x1="6" y1="11.5" x2="18" y2="11.5" stroke="#ACACAC" />
                    <line x1="6" y1="14.5" x2="18" y2="14.5" stroke="#ACACAC" />
                </svg>
            </div>
            <div class="adding_application__item_name">
                <span class="adding_application__item_name_text">Текстовое поле</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 18.5H16.5" stroke="#101010" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M11.5 14.9999L8.5 15.5399L9 12.4999L15.73 5.78994C15.823 5.69621 15.9336 5.62182 16.0554 5.57105C16.1773 5.52028 16.308 5.49414 16.44 5.49414C16.572 5.49414 16.7027 5.52028 16.8246 5.57105C16.9464 5.62182 17.057 5.69621 17.15 5.78994L18.21 6.84994C18.3037 6.9429 18.3781 7.0535 18.4289 7.17536C18.4797 7.29722 18.5058 7.42793 18.5058 7.55994C18.5058 7.69195 18.4797 7.82266 18.4289 7.94452C18.3781 8.06637 18.3037 8.17698 18.21 8.26994L11.5 14.9999Z"
                        fill="#101010"
                        stroke="#101010"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <div class="adding_application__item_input-wrapper"> 
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">Название</div>
                    <div class="adding_application__item_settings">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="17" r="1" transform="rotate(-180 12 17)" fill="#101010" stroke="#101010" stroke-width="0.5" />
                            <circle cx="12" cy="12" r="1" transform="rotate(-180 12 12)" fill="#101010" stroke="#101010" stroke-width="0.5" />
                            <circle cx="12" cy="7" r="1" transform="rotate(-180 12 7)" fill="#101010" stroke="#101010" stroke-width="0.5" />
                        </svg>
                    </div>
                    <div class="adding_application__item_box">
                        <div class="adding_application__item_choices">
                            <div class="adding_application__item_choice adding_application__item_choice--delete"><span>Удалить поле</span></div>
                            <div class="adding_application__item_choice adding_application__item_choice--change" data-modal="modal-create">
                                <span>Изменить тип поля</span>
                            </div>
                            <div class="adding_application__item_choice adding_application__item_choice--duplicate"><span>Продублировать поле</span></div>
                            <label class="adding_application__item_choice checkbox-wrapper">
                                <span>Обязательное поле</span>
                                <input class="adding_application__item_choice--checkbox" type="checkbox" checked />
                                <div class="checkbox-icon"></div>
                            </label>
                            <div class="adding_application__item_choice adding_application__item_choice--hint">
                                <span>Добавить подсказку</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    $(targetContainer).append(newCategory);
    checkListEmpty();
}

$("body").on("click", ".adding_application__bottom_add", () => addNewField(".adding_application__list"));
$("body").on("click", ".btn__add-field", () => addNewField(".modal__edit-employee__list"));

//добавить подсказку
$("body").on("click", ".adding_application__item_choice--hint", function () {
    let hintHTML = `
    <div class="adding_application__item_hint">
        <span>Текст подсказки</span>
        <svg class="delete-hint" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="none"/>
            <path d="M8.57157 15.4285L15.4287 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.4287 15.4285L8.57157 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>                                            
    </div>
    `;
    $(this).closest(".adding_application__item_input-wrapper").append(hintHTML);
    $(this).closest(".adding_application__item_box").slideUp();
});

//удалить подсказку
$("body").on("click", ".delete-hint", function () {
    $(this).closest(".adding_application__item_hint").remove();
});









//добавить поле при активном чекбоксе (только одно)
let chosenFieldText = null;
let clickedCheckbox = null;

const addInnerTag = function (checkboxInput) {
    const $innerTag = checkboxInput.find(".inner-tag");
    if (chosenFieldText !== null) {
        if ($innerTag.length > 0) {
            $innerTag.find("span").text(chosenFieldText);
        } else {
            const newInnerTag = $(innerTagHtml);
            newInnerTag.find("span").text(chosenFieldText);
            checkboxInput.find(".adding_application__item_input_text").after(newInnerTag);
        }
        $(".modal__create").removeClass("active");
        $(".modal__create .btn").removeClass("add-active-checkbox-field");
        chosenFieldText = null;
    }
};

$("body").on("click", ".adding_application__item_choice--add-checkbox-field", function () {
    clickedCheckbox = $(this).closest('.adding_application__item--checkbox');
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

    updateDataModalAttribute(clickedCheckbox.find("input:checked"));
});

$(".modal__create input").on('click', function () {
    let chosenField = $(this);
    chosenFieldText = chosenField.closest('.modal__create__form_item').find('span').text();
    console.log(chosenFieldText);
    updateDataModalAttribute(chosenField);
});

$(".modal__create").on('click', '.add-active-checkbox-field', function () {
    addInnerTag(clickedCheckbox);
    updateDataModalAttribute(clickedCheckbox.find("input:checked"));
});

const updateDataModalAttribute = function (chosenField) {
    const modalCreateBtn = $(".modal__create .add-active-checkbox-field");
    if (chosenField.data("type") !== "employee-input") {
        modalCreateBtn.attr("data-modal", "edit-field");
    } else {
        modalCreateBtn.attr("data-modal", "edit-employee");
    }
};






//модалка "отредактируйте поле"
$("body").on("click", '[data-modal="edit-field"]', function () {
    $(".modal__create").removeClass("active");
    $(".modal__edit-field").addClass("active");
});









//удаляем поле при активном чек-боксе/тэг в "добавить сотрудника"
$("body").on("click", ".inner-tag .delete-hint", function () {
    const $tagToDelete = $(this).closest(".inner-tag");
    const $swiperContainer = $tagToDelete.closest(".adding_application__item_input_tags");

    if ($tagToDelete.closest(".swiper-slide").length > 0) {
        $tagToDelete.closest(".swiper-slide").remove();
        updateSwiper($swiperContainer);
        checkTags();
    } else {
        $tagToDelete.remove();
        updateSwiper($swiperContainer);
    }
    checkTags();
});

//модалка изменить тип поля
$("body").on("click", '[data-modal="modal-create"]', function () {
    $(".modal__create").addClass("active");
    //скрываем "выбор сотрудников", "чек-боксы", "буллиты", "текст", "подзаголовок", если модалка вызвана из .modal__edit-employee
    const isBothModalsActive = $(".modal__create").hasClass("active") && $(".modal__edit-employee").hasClass("active");
    $(".modal__create__form_item:nth-of-type(7)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(10)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(11)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(12)").toggle(!isBothModalsActive);
    $(".modal__create__form_item:nth-of-type(13)").toggle(!isBothModalsActive);
});

//галочка в модалке соответствует типу поля
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

//модалка введите данные сотрудника
$("body").on("click", '[data-modal="edit-employee"]', function () {
    clickedEmployeeItem = $(this).closest(".adding_application__item[data-type='employee-input']");
    $(".modal__edit-employee").addClass("active");
    checkTags();
});

//удалены все поля в модалке
function checkListEmpty() {
    const $modalList = $(".modal__edit-employee__list");
    const $modalListEmpty = $(".modal__edit-employee__list_empty");
    $modalListEmpty.toggle(!$modalList.find(".adding_application__item").length);
}

const positionSVG = `
  <div class="adding_application__item_position">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="8.5" x2="18" y2="8.5" stroke="#ACACAC" />
      <line x1="6" y1="11.5" x2="18" y2="11.5" stroke="#ACACAC" />
      <line x1="6" y1="14.5" x2="18" y2="14.5" stroke="#ACACAC" />
    </svg>
  </div>
`;

const editSVG = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 18.5H16.5" stroke="#101010" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M11.5 14.9999L8.5 15.5399L9 12.4999L15.73 5.78994C15.823 5.69621 15.9336 5.62182 16.0554 5.57105C16.1773 5.52028 16.308 5.49414 16.44 5.49414C16.572 5.49414 16.7027 5.52028 16.8246 5.57105C16.9464 5.62182 17.057 5.69621 17.15 5.78994L18.21 6.84994C18.3037 6.9429 18.3781 7.0535 18.4289 7.17536C18.4797 7.29722 18.5058 7.42793 18.5058 7.55994C18.5058 7.69195 18.4797 7.82266 18.4289 7.94452C18.3781 8.06637 18.3037 8.17698 18.21 8.26994L11.5 14.9999Z"
      fill="#101010"
      stroke="#101010"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
`;

const settingsSVG = `
  <div class="adding_application__item_settings">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="17" r="1" transform="rotate(-180 12 17)" fill="#101010" stroke="#101010" stroke-width="0.5" />
      <circle cx="12" cy="12" r="1" transform="rotate(-180 12 12)" fill="#101010" stroke="#101010" stroke-width="0.5" />
      <circle cx="12" cy="7" r="1" transform="rotate(-180 12 7)" fill="#101010" stroke="#101010" stroke-width="0.5" />
    </svg>
  </div>
`;

const intemBoxDefaultHTML = `
  <div class="adding_application__item_box">
    <div class="adding_application__item_choices">
      <div class="adding_application__item_choice adding_application__item_choice--delete"><span>Удалить поле</span></div>
      <div class="adding_application__item_choice adding_application__item_choice--change" data-modal="modal-create">
        <span>Изменить тип поля</span>
      </div>
      <div class="adding_application__item_choice adding_application__item_choice--duplicate"><span>Продублировать поле</span></div>
      <label class="adding_application__item_choice checkbox-wrapper">
        <span>Обязательное поле</span>
        <input class="adding_application__item_choice--checkbox" type="checkbox" checked />
        <div class="checkbox-icon"></div>
      </label>
      <div class="adding_application__item_choice adding_application__item_choice--hint">
        <span>Добавить подсказку</span>
      </div>
    </div>
  </div>
`;

const intemBoxCheckboxHTML = `
    <div class="adding_application__item_box">
    <div class="adding_application__item_choices">
        <div class="adding_application__item_choice adding_application__item_choice--delete"><span>Удалить чек бокс</span></div>
        <div class="adding_application__item_choice adding_application__item_choice--add-checkbox-field"><span>Добавить поле при активном чекбоксе</span></div>
        <div class="adding_application__item_choice adding_application__item_choice--duplicate"><span>Продублировать поле</span></div>
        <label class="adding_application__item_choice checkbox-wrapper">
            <span>Обязательное поле</span>
            <input class="adding_application__item_choice--checkbox" type="checkbox" />
            <div class="checkbox-icon"></div>
        </label>
    </div>
    </div>
`;

//массив с видами полей
let itemTemplates = [
    {
        type: "subtitle",
        html: `
        <div class="adding_application__item adding_application__item--subtitle" data-type="subtitle">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span class="adding_application__item_name_text">Подзаголовок</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper"> 
                <div class="adding_application__item_input transparent">
                    <div class="adding_application__item_input_text required"></div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "date-input",
        html: `
        <div class="adding_application__item" data-type="date-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Дата</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper"> 
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">__\\__\\____</div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "number-input",
        html: `
        <div class="adding_application__item" data-type="number-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span class="adding_application__item_name_text">Числовое значение</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">Введите значение</div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "text-input",
        html: `
        <div class="adding_application__item" data-type="text-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span class="adding_application__item_name_text">Текстовое поле</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">Название</div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "employee-input",
        html: `
        <div class="adding_application__item" data-type="employee-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Добавить сотрудника</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">Выберите сотрудника из списка или добавьте вручную</div>
                    <div class="adding_application__item_input_tags swiper">
                        <div class="swiper-wrapper"></div>
                    </div>
                    <button class="swiper-button-next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6L14.8557 11.8557C14.9013 11.8985 14.9376 11.9501 14.9624 12.0074C14.9872 12.0647 15 12.1265 15 12.189C15 12.2514 14.9872 12.3132 14.9624 12.3706C14.9376 12.4279 14.9013 12.4795 14.8557 12.5222L9 18.378" stroke="#101010" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                                                
                    </button>
                    ${settingsSVG}
                    <div class="adding_application__item_box">
                        <div class="adding_application__item_choices">
                            <div class="adding_application__item_choice adding_application__item_choice--edit" data-modal="edit-employee"><span>Редактировать поле</span></div>
                            <div class="adding_application__item_choice adding_application__item_choice--delete"><span>Удалить поле</span></div>
                            <div class="adding_application__item_choice adding_application__item_choice--change" data-modal="modal-create">
                                <span>Изменить тип поля</span>
                            </div>
                            <div class="adding_application__item_choice adding_application__item_choice--duplicate"><span>Продублировать поле</span></div>
                            <label class="adding_application__item_choice checkbox-wrapper">
                                <span>Обязательное поле</span>
                                <input class="adding_application__item_choice--checkbox" type="checkbox" checked />
                                <div class="checkbox-icon"></div>
                            </label>
                            <div class="adding_application__item_choice adding_application__item_choice--hint">
                                <span>Добавить подсказку</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "phone-input",
        html: `
        <div class="adding_application__item" data-type="phone-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Номер телефона</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">+7 (9__)-___-__-__</div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "comment-input",
        html: `
        <div class="adding_application__item adding_application__item--big" data-type="comment-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Комментарий</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">Напишите дополнительную информацию</div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "date-interval-input",
        html: `
        <div class="adding_application__item adding_application__item--interval" data-type="date-interval-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Промежуток дат</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">
                        <div class="adding_application__item_input_inner">
                            <span>с ДД.ММ.ГГ.</span>
                        </div>
                        <div class="adding_application__item_input_inner">
                            <span>по ДД.ММ.ГГ.</span>
                        </div>
                    </div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "time-interval-input",
        html: `
        <div class="adding_application__item adding_application__item--interval" data-type="time-interval-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Временной промежуток</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text required">
                        <div class="adding_application__item_input_inner">
                            <span>с ЧЧ:ММ</span>
                        </div>
                        <div class="adding_application__item_input_inner">
                            <span>по ЧЧ:ММ</span>
                        </div>
                    </div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "file-input",
        html: `
        <div class="adding_application__item" data-type="file-input">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Добавить файл</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text">Выберите файлы</div>
                    <svg class="file-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.76471 5.70588C7.17993 5.70588 6.70588 6.17993 6.70588 6.76471V18.0588C6.70588 18.6436 7.17993 19.1176 7.76471 19.1176H16.2353C16.8201 19.1176 17.2941 18.6436 17.2941 18.0588V10.2376C17.2941 9.92846 17.1591 9.63479 16.9244 9.43364L12.8727 5.96079C12.6808 5.7963 12.4364 5.70588 12.1836 5.70588H7.76471ZM6 6.76471C6 5.79009 6.79009 5 7.76471 5H12.1836C12.6049 5 13.0123 5.15069 13.3321 5.42484L17.3838 8.89769C17.7749 9.23295 18 9.72239 18 10.2376V18.0588C18 19.0334 17.2099 19.8235 16.2353 19.8235H7.76471C6.79009 19.8235 6 19.0334 6 18.0588V6.76471Z" fill="#101010" stroke="#101010" stroke-width="0.2" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3516 8.17664V5.70605H13.0574V8.17664C13.0574 8.76141 13.5315 9.23547 14.1163 9.23547H17.2927V9.94135H14.1163C13.1416 9.94135 12.3516 9.15126 12.3516 8.17664Z" fill="#101010" stroke="#101010" stroke-width="0.2" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.105 12.0179C12.0361 11.1314 13.539 11.1314 14.4701 12.0179C15.411 12.9137 15.411 14.3737 14.4701 15.2696L12.3113 17.3249C11.7776 17.833 10.9191 17.833 10.3854 17.3249C9.84184 16.8074 9.84184 15.9609 10.3854 15.4434L12.5442 13.3881L13.0309 13.8994L10.8721 15.9547C10.6208 16.1939 10.6208 16.5744 10.8721 16.8136C11.1332 17.0622 11.5634 17.0622 11.8246 16.8136L13.9834 14.7583C14.6321 14.1407 14.6321 13.1468 13.9834 12.5291C13.3248 11.9022 12.2502 11.9022 11.5917 12.5291L8.71329 15.2696L8.22656 14.7583L11.105 12.0179Z" fill="#101010" stroke="#101010" stroke-width="0.2"/>
                        </svg>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "checkboxes",
        html: `
        <div class="adding_application__item_group" data-type="checkboxes">
            <div class="adding_application__item">
            ${positionSVG}
                <div class="adding_application__item_name">
                    <span>Чек-боксы</span>
                    ${editSVG}
                </div>
                <div class="adding_application__item_input-wrapper"> 
                <div class="adding_application__item_input transparent">
                    <div class="adding_application__item_input_text required"></div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
            </div>
            <div class="adding_application__item adding_application__item--checkbox">
                <div class="adding_application__item_input-wrapper"> 
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text">Название чек-бокса</div>
                    ${settingsSVG}
                    ${intemBoxCheckboxHTML}
                </div>
            </div>
            </div>
            <div class="adding_application__item adding_application__item--checkbox">
                <div class="adding_application__item_input-wrapper"> 
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text">Название чек-бокса</div>
                    ${settingsSVG}
                    ${intemBoxCheckboxHTML}
                </div>
            </div>
            </div>
            <div class="adding_application__item adding_application__item--checkbox">
                <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input">
                    <div class="adding_application__item_input_text">Название чек-бокса</div>
                    ${settingsSVG}
                    ${intemBoxCheckboxHTML}
                </div>
            </div>
            </div>
        </div>
    `,
    },
    {
        type: "text",
        html: `
        <div class="adding_application__item adding_application__item--text" data-type="text">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Текст</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper"> 
                <div class="adding_application__item_input transparent">
                    <div class="adding_application__item_input_text required"></div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
    {
        type: "bullets",
        html: `
        <div class="adding_application__item adding_application__item--text" data-type="bullets">
            ${positionSVG}
            <div class="adding_application__item_name">
                <span>Булиты</span>
                ${editSVG}
            </div>
            <div class="adding_application__item_input-wrapper">
                <div class="adding_application__item_input transparent">
                    <div class="adding_application__item_input_text required"></div>
                    ${settingsSVG}
                    ${intemBoxDefaultHTML}
                </div>
            </div>
        </div>
    `,
    },
];

//изменить тип поля (удаляем прошлое и всталяем из массива)
$(".modal__create__form").on("submit", function (e) {
    e.preventDefault();
    if (!clickedItem) return;
    const selectedType = $("input[name='field']:checked").data("type");
    const selectedTemplate = itemTemplates.find((item) => item.type === selectedType);
    if (selectedTemplate) {
        clickedItem.replaceWith(selectedTemplate.html);
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

$('[data-type="employee-input"] .adding_application__item_input').each(function () {
    checkTags();
});

//добавляем тэги из модалки в инпут
$("body").on("click", ".modal__edit-employee .btn__save", function () {
    let $modal = $(this).closest(".modal__edit-employee");

    //получем названия полей из модалки
    let fieldNames = $modal
        .find(".adding_application__item_name span")
        .map(function () {
            return $(this).text();
        })
        .get();

    let $tagsList = clickedEmployeeItem.find(".adding_application__item_input_tags .swiper-wrapper");
    $tagsList.empty();

    //вставляем тэги
    $.each(fieldNames, function (_, fieldName) {
        const $innerTag = $(innerTagHtml);
        $innerTag.find("span").text(fieldName);
        const $swiperSlide = $('<div class="swiper-slide"></div>').append($innerTag);
        $tagsList.append($swiperSlide);
    });

    //если галочка "выбрать из списка"
    if ($(".modal__edit-employee__input-check input").prop("checked")) {
        const $innerTagChecked = $(innerTagHtml);
        $innerTagChecked.find("span").text("Сотрудники из списка");
        const $swiperSlideChecked = $('<div class="swiper-slide"></div>').append($innerTagChecked);
        $tagsList.prepend($swiperSlideChecked);
    }

    //обновляем свайпер после добавления
    if ($(".adding_application__item_input_tags").length) {
        updateSwiper($(".adding_application__item_input_tags"));
    }

    checkTags();
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