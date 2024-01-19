import $ from "jquery";

let input = document.getElementById("inputFile");
let thumbnailsContainer = $("#thumbnailsContainer");

$("#inputFile").on("change", function () {
    if (input.files && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
            let file = input.files[i];
            let reader = new FileReader();
            let thumb = $('<div class="input-file__thumbnail"></div>');

            if (file.size > 512 * 1024) {
                alert("Максимальный размер 512 Кбайт");
                return;
            }

            if (!["image/jpeg", "image/png"].includes(file.type)) {
                alert("Допустимое расширение: jpeg, png");
                return;
            }

            reader.onload = function (e) {
                thumb.append(
                    '<img class="input-file__thumbnail__img" src="' +
                        e.target.result +
                        '" alt="Thumbnail" /><button class="input-file__thumbnail__btn-delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25Z" fill="#101010"/><path d="M14.3936 9.59375L9.60156 14.3857" stroke="white" stroke-linecap="round"/><path d="M14.3976 14.3907L9.60156 9.59375" stroke="white" stroke-linecap="round"/></svg></button>'
                );
                // input.value = "";
            };

            reader.readAsDataURL(file);
            thumbnailsContainer.append(thumb);
        }
    }
});

thumbnailsContainer.on("click", ".input-file__thumbnail__btn-delete", function (e) {
    e.preventDefault();
    console.log("click");
    $(this).closest(".input-file__thumbnail").remove();
});