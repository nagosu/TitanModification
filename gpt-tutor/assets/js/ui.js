$('#folder-name-change-btn').on('click', function () {
  $('#folder-name-change-before').removeClass('show-active');
  $('#folder-name-change-after').addClass('show-active');
})
$('#folder-name-change-cancel-btn').on('click', function () {
  $('#folder-name-change-before').addClass('show-active');
  $('#folder-name-change-after').removeClass('show-active');
})

$('.jschange-name-btn').on('click', function() {
  $(this).parents('.change-before').removeClass('show-active');
  $(this).parents('.change-before').siblings('.change-after').addClass('show-active');
})

$('.jschange-name-cancel-btn').on('click', function() {
  $(this).parents('.change-after').removeClass('show-active');
  $(this).parents('.change-after').siblings('.change-before').addClass('show-active');
})
$('#header-nav-btn').on('click', function () {
  $('#sidebar').toggleClass('active');
  $('.sidebar-overlay').toggleClass('active');
})

$('.sidebar-overlay').on('click', function() {
  $('#sidebar').removeClass('active');
  $(this).removeClass('active');
})

$('[data-iframe-src]').on('click', function () {
  var thisSrc = $(this).attr('data-iframe-src');
  var thisIframeId = $(this).parents('.modal-sidebar').attr('data-iframe-id');

  $('[data-iframe-src]').removeClass('active');
  $(this).addClass('active');

  $('#' + thisIframeId).attr('src', thisSrc);
})
function openModal(id) {
  $('#' + id).addClass('active');
  $('#' + id).children('.custom-modal').scrollTop(0);
}
function closeModal(id) {
  $('#' + id).removeClass('active');
}
function allCloseModal() {
  $('.modal-wrapper').removeClass('active');
}
$('.major-sidebar .sub-menu-btn').on('click', function () {
  $('.major-sidebar .sub-menu-grp').removeClass('active');
  $(this).parents('.sub-menu-grp').addClass('active');
})

$('.major-sidebar .more-btn').on('click', function () {
  $('.major-sidebar .more-btn').removeClass('active');
  $(this).addClass('active');
})