import $ from "jquery";

//request date filter
$.datepicker.regional["ru"] = {
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    dayNamesMin: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
    dateFormat: "dd.mm.yy",
    firstDay: 1,
};

$.datepicker.setDefaults($.datepicker.regional["ru"]);

$("#filterDatepicker").datepicker({
    // minDate: 0,
    beforeShowDay: function (date) {
        let date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#startDate").val());
        let date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#endDate").val());
        let isFirstDay = date1 && date.getTime() == date1.getTime();
        let isLastDay = date2 && date.getTime() == date2.getTime();
        if (isFirstDay && isLastDay) {
            return [true, "dp-highlight dp-special"];
        }
        let isHighlight = date1 && (date.getTime() == date1.getTime() || (date2 && date >= date1 && date <= date2));
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
        $("#startDate, #endDate").trigger("input");
    },
    nextText: "",
    prevText: "",
});

$(function() {
    $('.request-filter-list__checkbox input[type="checkbox"]').on('change', (function() {
        updateFilterList($(this));
    }));

    function updateFilterList(checkbox) {
        let $filterList = checkbox.closest('.request-filter-list');
        let $checkedOptions = $filterList.find('.request-filter-list__option input[type="checkbox"]:checked');
        let selectedTitles = $checkedOptions.map(function() {
            return $(this).closest('.request-filter-list__option').find('.request-filter-list__title').text().trim();
        }).get();

        let $inputField = checkbox.closest('.incoming-requests__filter').find('.incoming-requests__filter__input-wrapper input[type="text"]');
        
        if (checkbox.closest('.request-filter-list__option').find('.request-filter-list__title').text().trim() === 'Все') {
            let allChecked = checkbox.prop('checked');
            $filterList.find('.request-filter-list__option input[type="checkbox"]').not(checkbox).prop('checked', allChecked);
            $inputField.val(allChecked ? 'Все' : 'Не выбрано');
        } else {
            let $allCheckbox = $filterList.find('.request-filter-list__option input[type="checkbox"]').first();
            if (!checkbox.prop('checked')) {
                $allCheckbox.prop('checked', false);
            }
    
            let updatedTitles = selectedTitles.filter(title => title !== 'Все');
            $inputField.val($filterList.find('.request-filter-list__option input[type="checkbox"]:checked').length ? 
                            (updatedTitles.length > 0 ? updatedTitles.join(', ') : 'Не выбрано') : 'Не выбрано');
        }
    }
});