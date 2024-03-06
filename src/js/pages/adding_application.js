import $ from "jquery";
import "../utils/jquery-ui.min";

//меняем поля местами
$(function () {
    $(".adding_application__list").sortable({
        handle: ".adding_application__item_position",
        cursor: "grabbing",
    });
});

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

//клик на 3 точки: открываем бокс у активного, закрываем остальные
$("body").on("click", ".adding_application__item_settings", function () {
    let activeElement = $(this).closest(".adding_application__item");
    $(".adding_application__item").not(activeElement).removeClass("active").find(".adding_application__item_box").slideUp();
    activeElement.toggleClass("active").find(".adding_application__item_box").slideToggle();
});

//закрываем все боксы по клику вне
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

//активируем название поля для редактирования
$("body").on("click", ".adding_application__item_name svg", function () {
    $(this).siblings("span").attr("contenteditable", true);
    placeCaretAtEnd($(this).siblings("span")[0]);
});

//активируем поле заголовка для редактирования
$("body").on("click", ".adding_application__title svg", function () {
    $(this).siblings("span").attr("contenteditable", true);
    placeCaretAtEnd($(this).siblings("span")[0]);
});

//сохраняем название поля
$("body").on("keydown", ".adding_application__item_name span", function (e) {
    if (e.which === 13) {
        e.preventDefault;
        $(this).attr("contenteditable", false);
    }
});

//сохраняем название заголовка
$("body").on("keydown", ".adding_application__title span", function (e) {
    if (e.which === 13) {
        e.preventDefault;
        $(this).attr("contenteditable", false);
    }
});

//меняем название поля + плейсхолдер
$("body").on("keyup", ".adding_application__item_name_text", function (e) {
    $(this)
        .closest(".adding_application__item")
        .find(".adding_application__item_input_text")
        .text(`Введите ${$(this).text().toLowerCase()}`);
});

//удалем поле
$("body").on("click", ".adding_application__item_choice--delete", function () {
    $(this).closest(".adding_application__item").remove();
});

//удаляем поле с чекбоксами
$("body").on("click", ".adding_application__item_choice--delete-group", function () {
    $(this).closest(".adding_application__item_group").remove();
});

//дублиируем поле
$("body").on("click", ".adding_application__item_choice--duplicate", function () {
    $(this).closest(".adding_application__item").removeClass("active");
    $(this).closest(".adding_application__item").find(".adding_application__item_box").slideToggle();
    var $clone = $(this).closest(".adding_application__item").clone(true);
    $clone.find(".adding_application__item_box").css("display", "none");
    $(this).closest(".adding_application__item").after($clone);
});

//чекбокс "обязательное поле"
$("body").on("change", ".adding_application__item_choice--checkbox", function () {
    if ($(this).is(":checked")) {
        $(this).closest(".adding_application__item_input").find(".adding_application__item_input_text").addClass("required");
    } else {
        $(this).closest(".adding_application__item_input").find(".adding_application__item_input_text").removeClass("required");
    }
});

//добавляем новое поле
$("body").on("click", ".adding_application__bottom_add", function () {
    var newCategory = $(`
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
    $(".adding_application__list").append(newCategory);
});

//добавляем подсказку
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

//удаляем подсказку
$("body").on("click", ".delete-hint", function () {
    $(this).closest(".adding_application__item_hint").remove();
});

//добавляем поле при активном чек-боксе
$("body").on("click", ".adding_application__item_choice--add-checkbox-hint", function () {
    if ($(this).closest(".adding_application__item_input").find(".checkbox-hint").length === 0) {
        let hintHTML = `
        <div class="checkbox-hint">
            <span>Текстовое поле при активном чек-боксе</span>
            <svg class="delete-hint" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" transform="rotate(180 12 12)" fill="none"/>
                <path d="M8.57157 15.4285L15.4287 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.4287 15.4285L8.57157 8.57132" stroke="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> 
        </div>
        `;
        $(this).closest(".adding_application__item_input").find(".adding_application__item_input_text").after(hintHTML);
        $(this).closest(".adding_application__item_box").slideUp();
    }
});

//удаляем поле при активном чек-боксе
$("body").on("click", ".checkbox-hint .delete-hint", function () {
    $(this).closest(".checkbox-hint").remove();
});

//меняем фото справа
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

//модалка изменить тип поля
$("body").on("click", '[data-modal="modal-create"]', function () {
    $(".modal__create").addClass("active");
});

//модалка введите данные сотрудника
$("body").on("click", '[data-modal="edit-employee"]', function () {
    $(".modal__edit-employee").addClass("active");
});

//массив с видами полей

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
        <div class="adding_application__item_choice adding_application__item_choice--add-checkbox-hint"><span>Добавить поле при активном чекбоксе</span></div>
        <div class="adding_application__item_choice adding_application__item_choice--duplicate"><span>Продублировать поле</span></div>
        <label class="adding_application__item_choice checkbox-wrapper">
            <span>Обязательное поле</span>
            <input class="adding_application__item_choice--checkbox" type="checkbox" />
            <div class="checkbox-icon"></div>
        </label>
    </div>
    </div>
`;

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
                        <div class="adding_application__item_box">
                            <div class="adding_application__item_choices">
                                <div class="adding_application__item_choice adding_application__item_choice--delete-group"><span>Удалить поле</span></div>
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

let clickedItem = null;

$("body").on("click", ".adding_application__item_choice--change", function () {
    clickedItem = $(this).closest(".adding_application__item");
});

$("body").on("click", ".adding_application__item_group .adding_application__item_choice--change", function () {
    clickedItem = $(this).closest(".adding_application__item_group");
});

//меняем тип поля (удаляем прошлое и всталяем из массива)
$(".modal__create__form").on("submit", function (e) {
    e.preventDefault();
    if (!clickedItem) return;
    const selectedType = $("input[name='field']:checked").data("type");
    const selectedTemplate = itemTemplates.find((item) => item.type === selectedType);
    if (selectedTemplate) {
        clickedItem.replaceWith(selectedTemplate.html);
    }
    clickedItem = null;
});
