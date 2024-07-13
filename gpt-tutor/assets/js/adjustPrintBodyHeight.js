function adjustPrintBodyHeight() {
  const appPrint = document.getElementById("appPrint");
  const printBody = document.querySelector(".print-body");
  printBody.style.height = `${appPrint.getBoundingClientRect().height}px`;
}

// 문서 로드 시 높이 조정
document.addEventListener("DOMContentLoaded", adjustPrintBodyHeight);

// 창 크기 변경 시 높이 조정
window.addEventListener("resize", adjustPrintBodyHeight);
