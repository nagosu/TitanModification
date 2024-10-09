const addButton = document.querySelector('.add-btn');
const confirmButton = document
  .getElementById('confirm-del-modal')
  .querySelector('.confirm-del-btn');
let problemNumber = 0; // 문제 번호
let deleteProblemTarget = null; // 삭제할 문제

function toggleProblemType(problemContainer, selectedValue) {
  const objectiveBlock =
    problemContainer.querySelectorAll('.qst-unit-gray-box')[0]; // 객관식
  const subjective1Block =
    problemContainer.querySelectorAll('.qst-unit-gray-box')[1]; // 주관식 빈칸 (1곳)
  const subjective2Block =
    problemContainer.querySelectorAll('.qst-unit-gray-box')[2]; // 주관식 빈칸 (2곳)
  const subjective3Block =
    problemContainer.querySelectorAll('.qst-unit-gray-box')[3]; // 주관식 빈칸 (3곳)
  const grammarBlock =
    problemContainer.querySelectorAll('.qst-unit-gray-box')[4]; // 어법 단어

  // 모든 문제 유형 블록 숨기기
  objectiveBlock.style.display = 'none';
  subjective1Block.style.display = 'none';
  subjective2Block.style.display = 'none';
  subjective3Block.style.display = 'none';
  grammarBlock.style.display = 'none';

  // 선택한 값에 따라 해당 블록만 표시
  switch (selectedValue) {
    case '객관식':
      objectiveBlock.style.display = 'block';
      break;
    case '주관식 빈칸 (1곳)':
      subjective1Block.style.display = 'block';
      break;
    case '주관식 빈칸 (2곳)':
      subjective2Block.style.display = 'block';
      break;
    case '주관식 빈칸 (3곳)':
      subjective3Block.style.display = 'block';
      break;
    case '어법 단어':
      grammarBlock.style.display = 'block';
      break;
    default:
      break;
  }
}

function addProblemTypeListener() {
  const problemTypeSelects = document.querySelectorAll(
    '.problem-wrapper select'
  );

  problemTypeSelects.forEach((select) => {
    select.addEventListener('change', (e) => {
      const problemContainer = e.target.closest('.problem-wrapper');
      const selectedValue = e.target.value;
      toggleProblemType(problemContainer, selectedValue);
    });
  });
}

function addNextProblem() {
  problemNumber++;

  const addButtonContainer = document.querySelector('.add-container');
  const newProblem = `
    <div class="qst-unit problem-wrapper">
      <!-- 문제 번호 및 드롭다운 -->
      <div class="qst-unit-ttl">
        <span class="ttl">문제 ${problemNumber}.</span>
        <select class="form-inp">
          <option value="객관식">객관식</option>
          <option value="주관식 빈칸 (1곳)">주관식 빈칸 (1곳)</option>
          <option value="주관식 빈칸 (2곳)">주관식 빈칸 (2곳)</option>
          <option value="주관식 빈칸 (3곳)">주관식 빈칸 (3곳)</option>
          <option value="어법 단어">어법 단어</option>
        </select>
        <img
          src="./gpt-tutor/assets/images/Remove_light.svg"
          alt="삭제"
          class="delete-btn"
          onclick="openModal('confirm-del-modal')"
        />
      </div>

      <!-- 객관식 -->
      <div class="qst-unit-gray-box">
        <label for="q-${problemNumber}-01" class="multiple-qst">
          <input id="q-${problemNumber}-01" type="radio" name="q-${problemNumber}" class="none" />
          <label for="q-${problemNumber}-01" class="circle-txt">1</label>
        </label>
        <label for="q-${problemNumber}-02" class="multiple-qst">
          <input id="q-${problemNumber}-02" type="radio" name="q-${problemNumber}" class="none" />
          <label for="q-${problemNumber}-02" class="circle-txt">2</label>
        </label>
        <label for="q-${problemNumber}-03" class="multiple-qst">
          <input id="q-${problemNumber}-03" type="radio" name="q-${problemNumber}" class="none" />
          <label for="q-${problemNumber}-03" class="circle-txt">3</label>
        </label>
        <label for="q-${problemNumber}-04" class="multiple-qst">
          <input id="q-${problemNumber}-04" type="radio" name="q-${problemNumber}" class="none" />
          <label for="q-${problemNumber}-04" class="circle-txt">4</label>
        </label>
        <label for="q-${problemNumber}-05" class="multiple-qst">
          <input id="q-${problemNumber}-05" type="radio" name="q-${problemNumber}" class="none" />
          <label for="q-${problemNumber}-05" class="circle-txt">5</label>
        </label>
      </div>
      <!-- //객관식 -->

      <!-- 주관식 빈칸 (1곳) -->
      <div class="qst-unit-gray-box" style="position: relative; display: none">
        <textarea class="form-inp" rows="1" data-resizable style="padding-right: 40px"></textarea>
        <span style="font-size: 18px; position: absolute; top: 48%; right: 25px; transform: translate(-50%, -50%);">(s)</span>
      </div>
      <!-- //주관식 빈칸 (1곳) -->

      <!-- 주관식 빈칸 (2곳) -->
      <div class="qst-unit-gray-box" style="display: none">
        <div class="qst-form-inp-list">
          <span class="list-ttl">(A)</span>
          <textarea class="form-inp" rows="1" data-resizable></textarea>
        </div>
        <div class="qst-form-inp-list">
          <span class="list-ttl">(B)</span>
          <textarea class="form-inp" rows="1" data-resizable></textarea>
        </div>
      </div>
      <!-- //주관식 빈칸 (2곳) -->

      <!-- 주관식 빈칸 (3곳) -->
      <div class="qst-unit-gray-box" style="display: none">
        <div class="qst-form-inp-list">
          <span class="list-ttl">(A)</span>
          <textarea class="form-inp" rows="1" data-resizable></textarea>
        </div>
        <div class="qst-form-inp-list">
          <span class="list-ttl">(B)</span>
          <textarea class="form-inp" rows="1" data-resizable></textarea>
        </div>
        <div class="qst-form-inp-list">
          <span class="list-ttl">(C)</span>
          <textarea class="form-inp" rows="1" data-resizable></textarea>
        </div>
      </div>
      <!-- //주관식 빈칸 (3곳) -->

      <!-- 어법 단어 -->
      <div class="qst-unit-gray-box" style="display: none">
        <div class="tbl-arw-tbl">
          <div class="qst-word-tbl">
            <div class="tbl-row">
              <span class="txt">번호(기호)</span>
            </div>
            <div class="tbl-row">
              <span class="txt">(틀린 기호)</span>
              <textarea class="inp"></textarea>
            </div>
          </div>
          <i class="ico ico-left-to-right"></i>
          <div class="qst-word-tbl">
            <div class="tbl-row">
              <span class="txt">고친 부분</span>
            </div>
            <div class="tbl-row">
              <textarea class="inp"></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- //어법 단어 -->
    </div>
  `;

  addButtonContainer.insertAdjacentHTML('beforebegin', newProblem);

  addProblemTypeListener();
  addDeleteButtonListener();
}

function addDeleteButtonListener() {
  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      deleteProblemTarget = e.target.closest('.problem-wrapper'); // 삭제할 문제 저장
      openModal('confirm-del-modal');
    });
  });
}

function confirmDelete() {
  if (deleteProblemTarget) {
    deleteProblemTarget.remove();
    problemNumber--;
    deleteProblemTarget = null;
    closeModal('confirm-del-modal');
  }

  reorderProblemNumbers();
}

function reorderProblemNumbers() {
  const problemWrappers = document.querySelectorAll('.problem-wrapper');
  problemWrappers.forEach((problemWrapper, index) => {
    const problemTitle = problemWrapper.querySelector('.ttl');
    problemTitle.textContent = `문제 ${index + 1}.`; // 문제 번호 재정렬
  });
  problemNumber = problemWrappers.length; // 남은 문제 개수로 문제 번호 초기화
}

document.addEventListener('DOMContentLoaded', () => {
  addProblemTypeListener();
  addDeleteButtonListener();

  confirmButton.addEventListener('click', confirmDelete);

  // 기본적으로 문제 10개 생성
  for (let i = 0; i < 10; i++) {
    addNextProblem();
  }

  addButton.addEventListener('click', addNextProblem);
});
