$(document).ready(function () {
  const grades = mockExamData;
  let gradeHtmlContent = "";

  // 첫 번째 학년을 초기 active로 설정
  const firstGrade = Object.keys(grades)[0];

  // 각 학년
  for (const [grade, examYears] of Object.entries(grades)) {
    const isActiveGrade = grade === firstGrade ? "active" : "";
    gradeHtmlContent += `
      <div class="sub-menu-grp ${isActiveGrade}" onclick="activateGrade(this, '${grade}')">
        <button type="button" class="sub-menu-btn">${grade}</button>
        <ul class="more-btn-list-grp">
    `;

    // 첫 번째 출제년도를 초기 active로 설정
    const firstYear = Object.keys(examYears)[0];

    // 각 출제년도
    for (const [year] of Object.entries(examYears)) {
      const isActiveYear = year === firstYear ? "active" : "";
      gradeHtmlContent += `
        <li class="more-btn-list">
          <button type="button" class="more-btn ${isActiveYear}" onclick="showExamItems('${grade}', '${year}', this)">- ${year}</button>
        </li>
      `;
    }

    gradeHtmlContent += `</ul></div>`;
  }

  $(".major-sidebar-sub-menu").html(gradeHtmlContent);

  // 초기 첫 번째 출제년도의 항목번호를 보여줌
  showExamItems(firstGrade, Object.keys(grades[firstGrade])[0]);
});

function activateGrade(element, grade) {
  $(".sub-menu-grp").removeClass("active");
  $(element).addClass("active");

  // 첫 번째 출제년도의 항목번호를 보여줌
  // const firstYear = Object.keys(mockExamData[grade])[0];
  // showExamItems(grade, firstYear);

  // 첫 번째 출제년도 버튼 클릭
  // const firstMoreBtn = $(element).find("ul > li > button").first();
  // firstMoreBtn.addClass("active");
  // firstMoreBtn.trigger("click");
}

function showExamItems(grade, year, element) {
  if (element) {
    $(".more-btn").removeClass("active");
    $(element).addClass("active");
  }

  const items = mockExamData[grade][year];
  let itemHtmlContent = "";

  // 각 항목번호
  items.forEach((item, index) => {
    itemHtmlContent += `
      <li class="list">
        <div class="checkbox-item">
          <input type="checkbox" name="range" id="range${index}" class="custom-checkbox-inp none" onclick="addToCard('${grade}', '${year}', '${item}', this)" />
          <label for="range${index}" class="custom-checkbox"></label>
          <label for="range${index}" class="dark-txt">${item}</label>
        </div>
      </li>
    `;
  });

  $(".check-list-grp").html(itemHtmlContent);
}

// 선택된 항목들을 저장할 배열
let selectedItems = [];

function addToCard(grade, year, item, element) {
  if (element.checked) {
    // 항목을 배열에 추가
    selectedItems.push({ grade, year, item });
  } else {
    // 항목을 배열에서 제거
    selectedItems = selectedItems.filter(
      (selectedItem) =>
        !(
          selectedItem.grade === grade &&
          selectedItem.year === year &&
          selectedItem.item === item
        )
    );
  }

  // 배열을 정렬
  selectedItems.sort((a, b) => {
    if (a.grade < b.grade) return -1;
    if (a.grade > b.grade) return 1;
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    if (a.item < b.item) return -1;
    if (a.item > b.item) return 1;
    return 0;
  });

  // 정렬된 항목을 DOM에 업데이트
  const cardList = $(".choice-list-grp.range");
  cardList.html(""); // 기존 항목을 지우고

  selectedItems.forEach((selectedItem) => {
    const itemElement = `
      <li class="list">
        <div class="list-left">
          <span class="dark-txt dot-txt">${selectedItem.grade}</span>
          <span class="gray-txt sm-txt">(${selectedItem.year})</span>
          <span class="dark-txt">/ ${selectedItem.item}</span>
        </div>
        <button type="button" class="right-btn" onclick="removeFromCard('${selectedItem.grade}', '${selectedItem.year}', '${selectedItem.item}')">
          <span class="txt-hidden">삭제하기</span>
          <i class="ico ico-x ico-red-x"></i>
        </button>
      </li>
    `;
    cardList.append(itemElement);
  });
}

function removeFromCard(grade, year, item) {
  // 배열에서 항목 제거
  selectedItems = selectedItems.filter(
    (selectedItem) =>
      !(
        selectedItem.grade === grade &&
        selectedItem.year === year &&
        selectedItem.item === item
      )
  );

  // DOM에서 항목 제거
  const cardList = $(".choice-list-grp.range");
  cardList.find(`span:contains('${item}')`).closest("li").remove();
}
