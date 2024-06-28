$(document).ready(function () {
  const ebs = ebsData["EBS"];
  let subjectHtmlContent = "";

  // 첫 번째 과목을 초기 active로 설정
  const firstSubject = Object.keys(ebs)[0];

  // 각 과목
  for (const [subject, parts] of Object.entries(ebs)) {
    const isActiveSubject = subject === firstSubject ? "active" : "";
    subjectHtmlContent += `
        <div class="sub-menu-grp ${isActiveSubject}">
          <button type="button" class="sub-menu-btn" onclick="activateSubject(this, '${subject}')">${subject}</button>
          <ul class="more-btn-list-grp">
      `;

    // 첫 번째 파트를 초기 active로 설정
    const firstPart = Object.keys(parts)[0];

    // 각 파트
    for (const [part, lessons] of Object.entries(parts)) {
      const isActivePart = part === firstPart ? "active" : "";
      subjectHtmlContent += `
          <li class="more-btn-list">
            <button type="button" class="more-btn ${isActivePart}" onclick="showLessons('${subject}', '${part}', this)">- ${part}</button>
          </li>
        `;
    }

    subjectHtmlContent += `</ul></div>`;
  }

  $(".major-sidebar-sub-menu").html(subjectHtmlContent);

  // 초기 첫 번째 파트의 첫 번째 과를 보여줌
  showLessons(firstSubject, Object.keys(ebs[firstSubject])[0]);
});

function activateSubject(element, subject) {
  $(".sub-menu-grp").removeClass("active");
  $(element).parent().addClass("active");
  // 첫 번째 파트의 첫 번째 과를 보여줌
  // const firstPart = Object.keys(ebs[subject])[0];
  // showLessons(subject, firstPart);
}

function showLessons(subject, part, element) {
  if (element) {
    $(".more-btn").removeClass("active");
    $(element).addClass("active");
  }

  const lessons = ebsData["EBS"][subject][part];
  let lessonHtmlContent = "";

  // 첫 번째 과를 초기 active로 설정
  const firstLesson = Object.keys(lessons)[0];

  // 각 과
  Object.keys(lessons).forEach((lesson, index) => {
    const isActiveLesson = lesson === firstLesson ? "checked" : "";
    lessonHtmlContent += `
        <li class="list">
          <input type="radio" name="teacher" id="teacher${index}" class="gray-label-inp none" ${isActiveLesson} onclick="showTexts('${subject}', '${part}', '${lesson}')" />
          <label for="teacher${index}" class="txt-wrap">
            <span class="dark-txt dot-txt">${lesson}</span>
          </label>
        </li>
      `;
  });

  $(".choice-list-grp.lesson").html(lessonHtmlContent);
  showTexts(subject, part, firstLesson);
}

function showTexts(subject, part, lesson) {
  const texts = ebsData["EBS"][subject][part][lesson];
  let textHtmlContent = "";

  texts.forEach((text, index) => {
    textHtmlContent += `
        <li class="list">
          <div class="checkbox-item">
            <input type="checkbox" name="range" id="range${index}" class="custom-checkbox-inp none" onclick="addToCard('${subject}', '${part}', '${lesson}', '${text}', this)" />
            <label for="range${index}" class="custom-checkbox"></label>
            <label for="range${index}" class="dark-txt">${text}</label>
          </div>
        </li>
      `;
  });

  $(".check-list-grp").html(textHtmlContent);
}

// 선택된 항목들을 저장할 배열
let selectedTexts = [];

function addToCard(subject, part, lesson, text, element) {
  if (element.checked) {
    // 항목을 배열에 추가
    selectedTexts.push({ subject, part, lesson, text });
  } else {
    // 항목을 배열에서 제거
    selectedTexts = selectedTexts.filter(
      (item) =>
        !(
          item.subject === subject &&
          item.part === part &&
          item.lesson === lesson &&
          item.text === text
        )
    );
  }

  // 배열을 정렬
  selectedTexts.sort((a, b) => {
    if (a.subject < b.subject) return -1;
    if (a.subject > b.subject) return 1;
    if (a.part < b.part) return -1;
    if (a.part > b.part) return 1;
    if (a.lesson < b.lesson) return -1;
    if (a.lesson > b.lesson) return 1;
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });

  // 정렬된 항목을 DOM에 업데이트
  const cardList = $("#range-list");
  cardList.html(""); // 기존 항목을 지우고

  selectedTexts.forEach((item, index) => {
    const textItem = `
      <li class="list">
        <div class="list-left">
          <span class="dark-txt dot-txt">${item.subject}</span>
          <span class="gray-txt sm-txt">(${item.part})</span>
          <span class="dark-txt">/ ${item.lesson}</span>
          <span class="dark-txt">/ ${item.text}</span>
        </div>
        <button type="button" class="right-btn" onclick="removeFromCard(${index})">
          <span class="txt-hidden">삭제하기</span>
          <i class="ico ico-x ico-red-x"></i>
        </button>
      </li>
    `;
    cardList.append(textItem);
  });
}

function removeFromCard(index) {
  // 배열에서 항목 제거
  selectedTexts.splice(index, 1);

  // DOM에서 항목 제거
  const cardList = $("#range-list");
  cardList.html(""); // 기존 항목을 지우고

  selectedTexts.forEach((item, index) => {
    const textItem = `
      <li class="list">
        <div class="list-left">
          <span class="dark-txt dot-txt">${item.subject}</span>
          <span class="gray-txt sm-txt">(${item.part})</span>
          <span class="dark-txt">/ ${item.lesson}</span>
          <span class="dark-txt">/ ${item.text}</span>
        </div>
        <button type="button" class="right-btn" onclick="removeFromCard(${index})">
          <span class="txt-hidden">삭제하기</span>
          <i class="ico ico-x ico-red-x"></i>
        </button>
      </li>
    `;
    cardList.append(textItem);
  });
}
