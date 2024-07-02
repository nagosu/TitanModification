// sellbook.js
$(document).ready(function () {
  const sellBooks = sellbookData["시중단어책"];
  let bookHtmlContent = "";

  // 첫 번째 책을 초기 active로 설정
  const firstBook = Object.keys(sellBooks)[0];

  // 각 책
  for (const [bookTitle, contents] of Object.entries(sellBooks)) {
    const isActiveBook = bookTitle === firstBook ? "active" : "";
    bookHtmlContent += `
      <div class="sub-menu-grp ${isActiveBook}">
        <button type="button" class="sub-menu-btn" onclick="activateBook(this, '${bookTitle}')">${bookTitle}</button>
        <ul class="more-btn-list-grp">
    `;

    // 첫 번째 내용을 초기 active로 설정
    const firstContent = Object.keys(contents)[0];

    // 각 내용
    for (const contentTitle of Object.keys(contents)) {
      const isActiveContent = contentTitle === firstContent ? "active" : "";
      bookHtmlContent += `
        <li class="more-btn-list">
          <button type="button" class="more-btn ${isActiveContent}" onclick="showContent('${bookTitle}', '${contentTitle}', this)">- ${contentTitle}</button>
        </li>
      `;
    }

    bookHtmlContent += `</ul></div>`;
  }

  $(".major-sidebar-sub-menu").html(bookHtmlContent);

  // 초기 첫 번째 책의 첫 번째 내용을 보여줌
  showContent(firstBook, Object.keys(sellBooks[firstBook])[0]);
});

function activateBook(element, bookTitle) {
  $(".sub-menu-grp").removeClass("active");
  $(element).parent().addClass("active");

  // 첫 번째 내용을 active 상태로 표시하고 클릭 이벤트 실행
  const firstMoreBtn = $(element).siblings("ul").find(".more-btn").first();
  firstMoreBtn.addClass("active");
  firstMoreBtn.trigger("click");
}

function showContent(bookTitle, contentTitle, element) {
  if (element) {
    $(".more-btn").removeClass("active");
    $(element).addClass("active");
  } else {
    // 기본 active 설정
    $(
      `button[onclick="showContent('${bookTitle}', '${contentTitle}', this)"]`
    ).addClass("active");
  }

  const contents = sellbookData["시중단어책"][bookTitle][contentTitle];
  let contentHtmlContent = "";

  // 각 내용을 체크박스 항목으로 추가
  contents.forEach((content, index) => {
    contentHtmlContent += `
      <li class="list">
        <div class="checkbox-item" style="align-items: flex-start">
          <input type="checkbox" name="range" id="range${index}" class="custom-checkbox-inp none" onclick="addToCard('${bookTitle}', '${content}', this)" />
          <label for="range${index}" class="custom-checkbox" style="margin-top: 2.5px"></label>
          <label for="range${index}" class="dark-txt">${content}</label>
        </div>
      </li>
    `;
  });

  $(".check-list-grp").html(contentHtmlContent);
}

// 선택된 항목들을 저장할 배열
let selectedItems = [];

function addToCard(bookTitle, content, element) {
  if (element.checked) {
    // 항목을 배열에 추가
    selectedItems.push({ bookTitle, content });
  } else {
    // 항목을 배열에서 제거
    selectedItems = selectedItems.filter(
      (selectedItem) =>
        !(
          selectedItem.bookTitle === bookTitle &&
          selectedItem.content === content
        )
    );
  }

  // 배열을 정렬
  selectedItems.sort((a, b) => {
    if (a.bookTitle < b.bookTitle) return -1;
    if (a.bookTitle > b.bookTitle) return 1;
    if (a.content < b.content) return -1;
    if (a.content > b.content) return 1;
    return 0;
  });

  // 정렬된 항목을 DOM에 업데이트
  const cardList = $(".choice-list-grp.range");
  cardList.html(""); // 기존 항목을 지우고

  selectedItems.forEach((selectedItem, index) => {
    const itemElement = `
      <li class="list" data-index="${index}">
        <div class="list-left">
          <span class="dark-txt dot-txt">${selectedItem.bookTitle}</span>
          <span class="dark-txt">/ ${selectedItem.content}</span>
        </div>
        <button type="button" class="right-btn" onclick="removeFromCard(${index})">
          <span class="txt-hidden">삭제하기</span>
          <i class="ico ico-x ico-red-x"></i>
        </button>
      </li>
    `;
    cardList.append(itemElement);
  });
}

function removeFromCard(index) {
  // 배열에서 항목 제거
  selectedItems.splice(index, 1);

  // DOM에서 항목 제거
  const cardList = $(".choice-list-grp.range");
  cardList.find(`li[data-index="${index}"]`).remove();

  // 인덱스를 다시 설정
  cardList.find("li").each((i, li) => {
    $(li).attr("data-index", i);
    $(li).find(".right-btn").attr("onclick", `removeFromCard(${i})`);
  });
}
