$(document).ready(function () {
  const textbooks = textbookData["교과서"];
  let subjectHtmlContent = "";

  // 첫 번째 과목을 초기 active로 설정
  const firstSubject = Object.keys(textbooks)[0];

  // 각 과목
  for (const [subject, publishers] of Object.entries(textbooks)) {
    const isActiveSubject = subject === firstSubject ? "active" : "";
    subjectHtmlContent += `
      <div class="sub-menu-grp ${isActiveSubject}">
        <button type="button" class="sub-menu-btn" onclick="activateSubject(this, '${subject}')">${subject}</button>
        <ul class="more-btn-list-grp">
    `;

    // 첫 번째 출판사를 초기 active로 설정
    const firstPublisher = Object.keys(publishers)[0];

    // 각 출판사
    for (const [publisher, lessons] of Object.entries(publishers)) {
      const isActivePublisher = publisher === firstPublisher ? "active" : "";
      subjectHtmlContent += `
        <li class="more-btn-list">
          <button type="button" class="more-btn ${isActivePublisher}" onclick="showLessons('${subject}', '${publisher}', this)">- ${publisher}</button>
        </li>
      `;
    }

    subjectHtmlContent += `</ul></div>`;
  }

  $(".major-sidebar-sub-menu").html(subjectHtmlContent);

  // 초기 첫 번째 출판사의 첫 번째 과를 보여줌
  showLessons(firstSubject, Object.keys(textbooks[firstSubject])[0]);
});

function activateSubject(element, subject) {
  $(".sub-menu-grp").removeClass("active");
  $(element).parent().addClass("active");

  // 첫 번째 출판사의 첫 번째 과를 보여줌
  // const firstPublisher = Object.keys(textbookData["교과서"][subject])[0];
  // showLessons(subject, firstPublisher);
}

function showLessons(subject, publisher, element) {
  if (element) {
    $(".more-btn").removeClass("active");
    $(element).addClass("active");
  }
  const lessons = textbookData["교과서"][subject][publisher];
  let lessonHtmlContent = "";

  // 첫 번째 과를 초기 active로 설정
  const firstLesson = Object.keys(lessons)[0];

  // 각 과
  Object.keys(lessons).forEach((lesson, index) => {
    const isActiveLesson = lesson === firstLesson ? "checked" : "";
    lessonHtmlContent += `
      <li class="list">
        <input type="radio" name="teacher" id="teacher${index}" class="gray-label-inp none" ${isActiveLesson} onclick="showTexts('${subject}', '${publisher}', '${lesson}')" />
        <label for="teacher${index}" class="txt-wrap">
          <span class="dark-txt dot-txt">${lesson}</span>
        </label>
      </li>
    `;
  });

  $(".choice-list-grp.lesson").html(lessonHtmlContent);
  showTexts(subject, publisher, firstLesson);
}

function showTexts(subject, publisher, lesson) {
  const texts = textbookData["교과서"][subject][publisher][lesson];
  let textHtmlContent = "";

  texts.forEach((text, index) => {
    textHtmlContent += `
      <li class="list">
        <div class="checkbox-item">
          <input type="checkbox" name="range" id="range${index}" class="custom-checkbox-inp none" onclick="addToCard('${subject}', '${publisher}', '${lesson}', '${text}', this)" />
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

function addToCard(subject, publisher, lesson, text, element) {
  // 출판사명과 저자명 분리
  const publisherName = publisher.replace(/\s*\(.*?\)\s*/g, "");
  const authorName = publisher.match(/\((.*?)\)/)[1];

  if (element.checked) {
    // 항목을 배열에 추가
    selectedTexts.push({ subject, publisherName, authorName, lesson, text });
  } else {
    // 항목을 배열에서 제거
    selectedTexts = selectedTexts.filter(
      (item) =>
        !(
          item.subject === subject &&
          item.publisherName === publisherName &&
          item.authorName === authorName &&
          item.lesson === lesson &&
          item.text === text
        )
    );
  }

  // 배열을 정렬
  selectedTexts.sort((a, b) => {
    if (a.publisherName < b.publisherName) return -1;
    if (a.publisherName > b.publisherName) return 1;
    if (a.lesson < b.lesson) return -1;
    if (a.lesson > b.lesson) return 1;
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });

  // 정렬된 항목을 DOM에 업데이트
  const cardList = $(".choice-list-grp.range");
  cardList.html(""); // 기존 항목을 지우고

  selectedTexts.forEach((item) => {
    const textItem = `
      <li class="list">
        <div class="list-left">
          <span class="dark-txt dot-txt">${item.publisherName}</span>
          <span class="gray-txt sm-txt">(${item.authorName})</span>
          <span class="dark-txt">/ ${item.lesson}</span>
          <span class="dark-txt">/ ${item.text}</span>
        </div>
        <button type="button" class="right-btn" onclick="removeFromCard('${item.subject}', '${item.publisherName}', '${item.authorName}', '${item.lesson}', '${item.text}')">
          <span class="txt-hidden">삭제하기</span>
          <i class="ico ico-x ico-red-x"></i>
        </button>
      </li>
    `;
    cardList.append(textItem);
  });
}

function removeFromCard(subject, publisherName, authorName, lesson, text) {
  // 배열에서 항목 제거
  selectedTexts = selectedTexts.filter(
    (item) =>
      !(
        item.subject === subject &&
        item.publisherName === publisherName &&
        item.authorName === authorName &&
        item.lesson === lesson &&
        item.text === text
      )
  );

  // DOM에서 항목 제거
  const cardList = $(".choice-list-grp.range");
  cardList.find(`span:contains('${text}')`).closest("li").remove();
}
