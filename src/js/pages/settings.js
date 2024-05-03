import $ from "jquery";

$('.settings__center_input_open_block').on('click', function(e){
    if($(this).closest('.settings__center_input').find('input[readonly]').length) {
        $(this).closest('.settings__center_input').find('input').attr("readonly", false); 
    } else {
        $(this).closest('.settings__center_input').find('input').attr("readonly", true); 
    }
})
$('.users__tenant_settings').on('click', function(e){
    $(this).closest('.users__tenant_item').find('.users__tenant_choice').slideToggle()
    $(this).closest('.users__tenant_item').toggleClass('active')
})
$('.users__tenant_checkbox input').on('change', function(e){
    $(this).closest('.users__tenant').find(':checked')
    if($(this).closest('.users__tenant').find(':checked').length) {
        $(this).closest('.users__tenant').find('.users__tenant_add_btn').prop("disabled", false)
    } else {
        $(this).closest('.users__tenant').find('.users__tenant_add_btn').prop("disabled", true)
    }
})

$('[data-modal="modal-password"]').on("click", function () {
    $(".modal__password").addClass("active");
});

$('.modal__password__eye input').on('change', function(evt){
	if($(this).is(':checked')) {
		$(this).closest('.modal__password__input').find('input[type=password]')[0].type = 'text';
	} else {
		$(this).closest('.modal__password__input').find('input[type=text]')[0].type = 'password';
	}
})


// $('.settings__right_hidden_btn').on('click', function(e){
//     $(this).closest('.settings__right_hidden').css('display', 'none')
// })

$("body").on("change", ".settings__photos_change input[type='file']", function (e) {
    const file = this.files[0];
    const reader = new FileReader();
    const avatarImg = $(this).closest(".settings__photos_box").find(".settings__photos_avatar img");
    reader.onload = function (e) {
        avatarImg.attr("src", e.target.result);
    };
    if (file) {
        reader.readAsDataURL(file);
    }
});
