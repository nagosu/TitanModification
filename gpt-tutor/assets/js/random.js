$(document).ready(function () {
  $("#question-type02-random").on("change", function () {
    if ($(this).is(":checked")) {
      $("#question-options").hide(); // 숨기기
      $("#question-list").hide(); // 숨기기
    } else {
      $("#question-options").show(); // 보이기
      $("#question-list").show(); // 보이기
    }
  });
});
