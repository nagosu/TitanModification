// 스크롤 하단으로 내리는 함수
function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// 선택완료 버튼에 클릭 이벤트 추가
document
  .getElementById("complete-selection-btn")
  .addEventListener("click", scrollToBottom);
