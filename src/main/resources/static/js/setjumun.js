const typeBtn = document.querySelectorAll("#button");
const typeBox = document.querySelector(".type-box");
const confirm = document.querySelector(".confirm");

typeBtn[0].onclick = () => {
  typeBox.style.display = 'block';
  typeBox.innerHTML = `<div class="type">
        <div class="type-content">
          <p>기본 세트를 선택 하시겠습니까?</p>
          <div class="type-btns btns">
            <button class="confirm">확인</button>
            <button class="cancel">취소</button>
          </div>
        </div>
      </div>`
  setCancelButtonClickEvent();
}

typeBtn[1].onclick = () => {
  typeBox.style.display = 'block';
  typeBox.innerHTML = `<div class="type">
        <div class="type-content">
          <p>라지 세트를 선택 하시겠습니까?</p>
          <div class="type-btns btns">
            <button>확인</button>
            <button class="cancel">취소</button>
          </div>
        </div>
      </div>`
  setCancelButtonClickEvent();
}

typeBtn[2].onclick = () => {
  typeBox.style.display = 'block';
  typeBox.innerHTML = `<div class="type">
        <div class="type-content">
          <p>단품을 선택 하시겠습니까?</p>
          <div class="type-btns btns">
            <button>확인</button>
            <button class="cancel">취소</button>
          </div>
        </div>
      </div>`
  setCancelButtonClickEvent();
}

function setCancelButtonClickEvent () {
  const cancel = document.querySelector(".cancel");

  cancel.onclick = () => {
    typeBox.style.display = 'none';
  }
}


