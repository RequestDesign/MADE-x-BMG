import $ from "jquery";

const requestType = [
    {
        title: 'Все',
        checked: false,
    },
    {
        title: 'option 1',
        checked: false,
    },
    {
        title: 'option 2',
        checked: false,
    },
    {
        title: 'option 3',
        checked: false,
    },
];

const requestTenant = [
    {
        title: 'Все',
        checked: false,
    },
    {
        title: 'Calzedonia',
        checked: false,
    },
    {
        title: 'Аskona',
        checked: false,
    },
    {
        title: 'Афродита',
        checked: false,
    },
];

//request type filter, request tenant filter
function initializeFilterList(containerId, searchInputId, inputValueId, data) {
    const container = $(`#${containerId}`);
    const searchInput = $(`#${searchInputId}`);
    const inputValue = $(`#${inputValueId}`);

    function renderFilterList(filteredOptions) {
        filteredOptions.sort((a, b) => (b.checked ? 1 : 0) - (a.checked ? 1 : 0));

        container.html(
            filteredOptions
                .map(
                    (option, index) => {
                        const title = option.title;
                        const highlightedTitle = highlightMatches(title, (searchInput.val() || '').trim());
                        return `
                            <li class="request-filter-list__option ${option.checked ? 'checked' : ''}">
                                <span class="request-filter-list__title">${highlightedTitle}</span>
                                <div class="request-filter-list__checkbox checkbox-wrapper">
                                    <input type="checkbox" id="${containerId}Option${index}" ${option.checked ? "checked" : ""} data-index="${index}" />
                                    <label for="${containerId}Option${index}" class="checkbox-icon"></label>
                                </div>
                            </li>`;
                    }
                )
                .join("")
        );

        updateInputValue();
    }

    function highlightMatches(text, query) {
        if (!query) {
            return text;
        }
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    $(document).on("change", `#${containerId} .request-filter-list__checkbox input`, function () {
        const title = $(this).closest("li").find(".request-filter-list__title").text();

        if (title === 'Все') {
            const allChecked = $(this).prop("checked");
            data.forEach(option => {
                option.checked = allChecked;
            });

            if (!allChecked) {
                data.slice(1).forEach(option => {
                    option.checked = false;
                });
            }
        } else {
            const index = data.findIndex(option => option.title === title);
            if (index !== -1) {
                data[index].checked = $(this).prop("checked");

                if (!$(this).prop("checked")) {
                    data[0].checked = false;
                }
            }
        }
        const searchQuery = searchInput.val().trim().toLowerCase();
        const filteredOptions = data.filter(option => option.title.toLowerCase().includes(searchQuery));
        renderFilterList(filteredOptions);
    });

    searchInput.on("input", function () {
        const searchQuery = $(this).val().trim().toLowerCase();
        const filteredOptions = data.filter(option => option.title.toLowerCase().includes(searchQuery));
        renderFilterList(filteredOptions);
    });

    function updateInputValue() {
        const selectedOptions = data.filter(option => option.checked).map(option => option.title);
        inputValue.val(selectedOptions.includes('Все') ? 'Все' : selectedOptions.join(', '));
    }
    renderFilterList(data);
    updateInputValue();
}

initializeFilterList("requestTypeList", "searchTypeInput", "requestTypeInput", requestType);
initializeFilterList("requestTenantList", "searchTenantInput", "requestTenantInput", requestTenant);

//request date filter
$.datepicker.regional['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    dateFormat: 'dd.mm.yy',
    firstDay: 1
};

$.datepicker.setDefaults($.datepicker.regional['ru']);

$("#filterDatepicker").datepicker({
    minDate: 0,
    beforeShowDay: function (date) {
        let date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#startDate").val());
        let date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#endDate").val());
        let isFirstDay = date1 && date.getTime() == date1.getTime();
        let isLastDay = date2 && date.getTime() == date2.getTime();
        if (isFirstDay && isLastDay) {
            return [true, "dp-highlight dp-special"];
        }
        let isHighlight = date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2));
        let classes = isHighlight ? "dp-highlight" : "";
        if (isFirstDay) {
            classes += " dp-first-special";
        }
        if (isLastDay) {
            classes += " dp-last-special";
        }
        return [true, classes];
    },
    onSelect: function (dateText, inst) {
        let date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#startDate").val());
        let date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#endDate").val());
        let selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);
        
        if (!date1 || date2) {
            $("#requestDateInput").val(dateText);
            $("#startDate").val(dateText);
            $("#endDate").val("");
        } else if (selectedDate < date1) {
            $("#requestDateInput").val(`с ${dateText} по ${$("#startDate").val()}`);
            $("#endDate").val($("#startDate").val());
            $("#startDate").val(dateText);
        } else {
            $("#requestDateInput").val(`с ${$("#startDate").val()} по ${dateText}`);
            $("#endDate").val(dateText);
        }
        $("#startDate, #endDate").trigger('input');
    },
    nextText: "",
    prevText: ""
});