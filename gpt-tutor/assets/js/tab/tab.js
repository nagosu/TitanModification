$(document).ready(function () {
  $.getJSON("gpt-tutor/assets/json/textbook-data.json", function (data) {
    const textbooks = data["교과서"];
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
});

function activateSubject(element, subject) {
  $(".sub-menu-grp").removeClass("active");
  $(element).parent().addClass("active");
  // 첫 번째 출판사의 첫 번째 과를 보여줌
  const firstPublisher = Object.keys(textbooks[subject])[0];
  showLessons(subject, firstPublisher);
}

function showLessons(subject, publisher, element) {
  if (element) {
    $(".more-btn").removeClass("active");
    $(element).addClass("active");
  }
  $.getJSON("gpt-tutor/assets/json/textbook-data.json", function (data) {
    const lessons = data["교과서"][subject][publisher];
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
  });
}

function showTexts(subject, publisher, lesson) {
  $.getJSON("gpt-tutor/assets/json/textbook-data.json", function (data) {
    const texts = data["교과서"][subject][publisher][lesson];
    let textHtmlContent = "";

    texts.forEach((text, index) => {
      textHtmlContent += `
        <li class="list">
          <div class="checkbox-item">
            <input type="checkbox" name="range" id="range${index}" class="custom-checkbox-inp none" />
            <label for="range${index}" class="custom-checkbox"></label>
            <label for="range${index}" class="dark-txt">${text}</label>
          </div>
        </li>
      `;
    });

    $(".check-list-grp").html(textHtmlContent);
  });
}
