import $ from "jquery";

$('[data-modal="share-pass"]').on("click", function () {
    $(".modal__pass").removeClass("active");
    $(".modal__share-pass").addClass("active");
    uncheckAllUsers();
    updateShareButtonState();
});

$('[data-modal="share-pass-final"]').on("click", function () {
    $(".modal__share-pass").removeClass("active");
    uncheckAllUsers();
    updateShareButtonState();
});

const userListContainer = $(".modal__share-pass__user-list");
const users = [
    {
        name: "Смирнов Евгений Сергеевич",
        role: "арендатор",
        workplace: "Магазин Цветы",
        photo: "./assets/images/common/user-1.webp",
        checked: false,
    },
    {
        name: "Иванчук Лариса Викторовна",
        role: "старший администратор",
        workplace: "Магазин Цветы",
        photo: "./assets/images/common/user-2.webp",
        checked: false,
    },
    {
        name: "Константинов Максим Петрович",
        role: "кассир",
        workplace: "Магазин Цветы",
        photo: "./assets/images/common/user-1.webp",
        checked: false,
    },
    {
        name: "Иванчук Лариса Викторовна",
        role: "продавец-консультант",
        workplace: "Магазин Цветы",
        photo: "./assets/images/common/user-2.webp",
        checked: false,
    },
    {
        name: "Иванчук Лариса Андреевна",
        role: "уборщица",
        workplace: "Магазин Цветы",
        photo: "./assets/images/common/user-2.webp",
        checked: false,
    },
    {
        name: "Константинов Максим Петрович",
        role: "арендатор",
        workplace: "Магазин Цветы",
        photo: "./assets/images/common/user-1.webp",
        checked: false,
    },
    {
        name: "Смирнов Евгений Андреевич",
        role: "арендатор",
        workplace: "Магазин Цветы",
        photo: "./assets/images/common/user-1.webp",
        checked: false,
    },
];

//creating user list
function renderUserList() {
    // sort users to show checked users first
    users.sort((a, b) => (b.checked ? 1 : 0) - (a.checked ? 1 : 0));

    // render sorted users
    userListContainer.html(
        users
            .map(
                (user, index) => `
            <li class="modal__share-pass__user ${user.checked ? 'checked' : ''}">
                <div class="modal__share-pass__user__photo"><img src="${user.photo}" alt="User" /></div>
                <div class="modal__share-pass__user__info">
                    <div class="modal__share-pass__user__name">${user.name}</div>
                    <div class="modal__share-pass__user__role">
                        <span class="job">${user.role}</span> | <span class="workplace">${user.workplace}</span>
                    </div>
                </div>
                <div class="modal__share-pass__user__checkbox checkbox-wrapper">
                    <input type="checkbox" id="user${index}" ${user.checked ? "checked" : ""} data-index="${index}" />
                    <label for="user${index}" class="checkbox-icon"></label>
                </div>
            </li>`
            )
            .join("")
    );
}

renderUserList();

// handle checkbox changes
$(document).on("change", ".modal__share-pass__user__checkbox input", function () {
    const index = $(this).data("index");
    users[index].checked = $(this).prop("checked");
    renderUserList();
    updateShareButtonState();
});

// handle search input
$(function () {
    $(".modal__share-pass__search input").on("input", function () {
        const searchTerm = $(this).val().toLowerCase();

        $(".modal__share-pass__user-list .modal__share-pass__user").each(function () {
            const userName = $(this).find(".modal__share-pass__user__name").text().toLowerCase();
            const userRole = $(this).find(".modal__share-pass__user__role .job").text().toLowerCase();
            const userWorkplace = $(this).find(".modal__share-pass__user__role .workplace").text().toLowerCase();

            const isMatch = userName.includes(searchTerm) || userRole.includes(searchTerm) || userWorkplace.includes(searchTerm);

            $(this).toggle(isMatch);
        });
    });
});

//uncheck all users when modal is closed
function uncheckAllUsers() {
    users.forEach((user) => {
        user.checked = false;
    });
    renderUserList();
}

//make btn active when at least one user was choosen
function updateShareButtonState() {
    $('[data-modal="share-pass-final"]').prop('disabled', !users.some((user) => user.checked));
}
updateShareButtonState();

