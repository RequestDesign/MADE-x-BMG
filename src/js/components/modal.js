import $ from "jquery";
$(function () {

	$('[data-modal]').on('click', () => {
		$('body').addClass('lock');
	})

	$('.modal-back').on('click', closeModal);
	$('.modal-exit').on('click', closeModal);

	function closeModal() {
		$('.modal').removeClass('active');
		$('body').removeClass('lock');
	}
})