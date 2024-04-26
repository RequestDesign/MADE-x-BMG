import $ from "jquery";

$('[data-modal="share-pass"]').on("click", function () {
    $(".modal__pass").removeClass("active");
    $(".modal__share-pass").addClass("active");
    // if($('.modal__share-pass__user-list').length){
    //     uncheckAllUsers();
    // }
    // if($('.modal__share-pass__department-list').length){
    //     uncheckAllDepartment();
    // }
    // updateShareButtonState();
});
$('[data-modal="share-pass-dep"]').on("click", function () {
    $(".modal__pass").removeClass("active");
    $(".modal__share-pass-dep").addClass("active");
    // if($('.modal__share-pass__user-list').length){
    //     uncheckAllUsers();
    // }
    // if($('.modal__share-pass__department-list').length){
    //     uncheckAllDepartment();
    // }
    // updateShareButtonState();
});
$('[data-modal="share-pass-final"]').on("click", function () {
    $(".modal__share-pass").removeClass("active");
    // uncheckAllUsers();
    // updateShareButtonState();
});
$('[data-modal="move-choice"]').on("click", function () {
    $(".modal__share-pass").removeClass("active");
    // uncheckAllDepartment();
    // updateShareButtonState();
});
$('[data-modal="close-modal"]').on("click", function () {
    $(".modal__share-pass").removeClass("active");
    // uncheckAllUsers();
    // updateShareButtonState();
});

// const userListContainer = $(".modal__share-pass__user-list");

// const users = [
//     {
//         name: "Смирнов Евгений Сергеевич",
//         role: "арендатор",
//         workplace: "Магазин Цветы",
//         photo: "./assets/images/common/user-1.webp",
//         checked: false,
//     },
//     {
//         name: "Иванчук Лариса Викторовна",
//         role: "старший администратор",
//         workplace: "Магазин Цветы",
//         photo: "./assets/images/common/user-2.webp",
//         checked: false,
//     },
//     {
//         name: "Константинов Максим Петрович",
//         role: "кассир",
//         workplace: "Магазин Цветы",
//         photo: "./assets/images/common/user-1.webp",
//         checked: false,
//     },
//     {
//         name: "Иванчук Лариса Викторовна",
//         role: "продавец-консультант",
//         workplace: "Магазин Цветы",
//         photo: "./assets/images/common/user-2.webp",
//         checked: false,
//     },
//     {
//         name: "Иванчук Лариса Андреевна",
//         role: "уборщица",
//         workplace: "Магазин Цветы",
//         photo: "./assets/images/common/user-2.webp",
//         checked: false,
//     },
//     {
//         name: "Константинов Максим Петрович",
//         role: "арендатор",
//         workplace: "Магазин Цветы",
//         photo: "./assets/images/common/user-1.webp",
//         checked: false,
//     },
//     {
//         name: "Смирнов Евгений Андреевич",
//         role: "арендатор",
//         workplace: "Магазин Цветы",
//         photo: "./assets/images/common/user-1.webp",
//         checked: false,
//     },
// ];

// const department = [
//     {
//         name: "Отдел Комерциализвации",
//         checked: false,
//     },
//     {
//         name: "Отдел Комерциализвации 2",
//         checked: false,
//     },
//     {
//         name: "Отдел Комерциализвации 3",
//         checked: false,
//     },
//     {
//         name: "Отдел Комерциализвации 4",
//         checked: false,
//     },
//     {
//         name: "Отдел Комерциализвации 5",
//         checked: false,
//     },
//     {
//         name: "Calzedonia",
//         checked: false,
//     },
//     {
//         name: "Calzedonia 1",
//         checked: false,
//     },
// ];

//creating user list
// let users =[]
// let department =[]

// function renderUserList() {
//     $('.modal__share-pass__user').each(function() {
//         let $user = $(this);
        
//         let name = $user.find('.modal__share-pass__user__name').text().trim();
//         let role = $user.find('.modal__share-pass__user__role .job').text().trim();
//         let workplace = $user.find('.modal__share-pass__user__role .workplace').text().trim();
//         let isChecked = $user.find('.modal__share-pass__user__checkbox input[type="checkbox"]').prop('checked');

//         let user = {
//             name: name,
//             role: role,
//             workplace: workplace,
//             checked: isChecked
//         };

//         users.push(user);
//     }); 
    
//     users.sort((a, b) => (b.checked ? 1 : 0) - (a.checked ? 1 : 0));
//     // render sorted users
//     // userListContainer.html(
//     //     users
//     //         .map(
//     //             (user, index) => `
//     //         <li class="modal__share-pass__user ${user.checked ? 'checked' : ''}">
//     //             <div class="modal__share-pass__user__photo"><img src="${user.photo}" alt="User" /></div>
//     //             <div class="modal__share-pass__user__info">
//     //                 <div class="modal__share-pass__user__name">${user.name}</div>
//     //                 <div class="modal__share-pass__user__role">
//     //                     <span class="job">${user.role}</span> | <span class="workplace">${user.workplace}</span>
//     //                 </div>
//     //             </div>
//     //             <div class="modal__share-pass__user__checkbox checkbox-wrapper">
//     //                 <input type="checkbox" id="user${index}" ${user.checked ? "checked" : ""} data-index="${index}" />
//     //                 <label for="user${index}" class="checkbox-icon"></label>
//     //             </div>
//     //         </li>`
//     //         )
//     //         .join("")
//     // );
// }

// $(function() {
//     if ($('.modal__share-pass').hasClass('active')) {
//         renderUserList();
//     }
// });

//creating department list
// function renderDepartmentList() {
//     $('.modal__share-pass__department').each(function(index) {
//         let $department = $(this);
        
//         let name = $department.find('.modal__share-pass__user__name').text().trim();
//         let isChecked = $department.find('.modal__share-pass__user__checkbox input[type="checkbox"]').prop('checked');

//         let departmentItem = {
//             name: name,
//             checked: isChecked
//         };

//         department.push(departmentItem);
//     }); 
    
//     department.sort((a, b) => (b.checked ? 1 : 0) - (a.checked ? 1 : 0));

//     // render sorted department
//     // $(".modal__share-pass__department-list").html(
//     //     department
//     //         .map(
//     //             (departmentItem, index) => `
//     //             <li class="modal__share-pass__department ${departmentItem.checked ? 'checked' : ''}">
//     //                 <div class="modal__share-pass__user__name">${departmentItem.name}</div>

//     //                 <div class="modal__share-pass__user__checkbox checkbox-wrapper">
//     //                     <input type="checkbox" id="department${index}" ${departmentItem.checked ? "checked" : ""} data-index="${index}" />
//     //                     <label for="department${index}" class="checkbox-icon"></label>
//     //                 </div>
//     //             </li>`
//     //         )
//     //         .join("")
//     // );
// }

// $(function() {
//     if ($('.modal__share-pass__department').hasClass('active')) {
//         renderUserList();
//     }
// });

// renderUserList();
// renderDepartmentList();

// handle checkbox changes
// $(document).on("change", ".modal__share-pass__user__checkbox input", function () {
//     const index = $(this).data("index");
//     if($('.modal__share-pass__user-list').length){
//         users[index].isChecked = $(this).prop("checked");
//         renderUserList();
//     }
//     if($('.modal__share-pass__department-list').length){
//         department[index].isChecked = $(this).prop("checked");
//         renderDepartmentList();
//     }
//     // if($('.modal__share-pass__department-list').length){
//     //     department[index].checked = $(this).prop("checked");
//     //     renderDepartmentList();
//     // }

//     updateShareButtonState();
// });

//uncheck all users when modal is closed
// function uncheckAllUsers() {
//     users.forEach((user) => {
//         user.checked = false;
//     });
//     renderUserList();
// }
// function uncheckAllDepartment() {
//     department.forEach((user) => {
//         user.checked = false;
//     });
//     renderDepartmentList();
// }

//make btn active when at least one user was choosen
// function updateShareButtonState() {
//     $('[data-modal="share-pass-final"]').prop('disabled', !users.some((user) => user.isChecked));
//     $('[data-modal="move-choice"]').prop('disabled', !department.some((user) => user.isChecked))
//     if($('.users').length) {
//         $('.btn__share-pass-final').prop('disabled', !users.some((user) => user.isChecked));
//     }
// }


$(function () {
    $(".modal__share-pass__search input").on("input", function () {
        const searchTerm = $(this).val().toLowerCase();
        if($('.modal__share-pass__user-list').length){
            $(".modal__share-pass__user-list .modal__share-pass__user").each(function () {
                const userName = $(this).find(".modal__share-pass__user__name").text().toLowerCase();
                const userRole = $(this).find(".modal__share-pass__user__role .job").text().toLowerCase();
                const userWorkplace = $(this).find(".modal__share-pass__user__role .workplace").text().toLowerCase();
    
                const isMatch = userName.includes(searchTerm) || userRole.includes(searchTerm) || userWorkplace.includes(searchTerm);
    
                $(this).toggle(isMatch);
            });
        }
        if($('.modal__share-pass__department-list').length){
            $(".modal__share-pass__department-list .modal__share-pass__department ").each(function () {
                const userName = $(this).find(".modal__share-pass__user__name").text().toLowerCase();
                const isMatch = userName.includes(searchTerm);
                $(this).toggle(isMatch);
            });
        }

    });
});

$(function() {
    function updateButtonState() {
        let anyChecked = $('.modal__share-pass__user__checkbox input[type="checkbox"]:checked').length > 0;
        $('.btn__share-pass-final').prop('disabled', !anyChecked);
    }
    updateButtonState();
    $(document).on('change', '.modal__share-pass__user__checkbox input[type="checkbox"]', function() {
        updateButtonState();
    });
});