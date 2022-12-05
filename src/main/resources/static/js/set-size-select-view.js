const typeBtn = document.querySelectorAll("#button");
const typeBox = document.querySelector(".type-box");



typeBtn[0].onclick = () => {
  typeBox.style.display = 'block';
  typeBox.innerHTML = `<div class="type">
        <div class="type-content">
          <p>기본 세트를 선택 하시겠습니까?</p>
          <div class="type-btns btns">
            <button type="button" class="m-set-confirm">확인</button>
            <button type="button" class="cancel">취소</button>
          </div>
        </div>
      </div>`
  setCancelButtonClickEvent();
  const mSetConfirm = document.querySelector(".m-set-confirm");
  mSetConfirm.onclick = () => {
    location.href = "/set-select-view";
  }
}

typeBtn[1].onclick = () => {
  typeBox.style.display = 'block';
  typeBox.innerHTML = `
      <div class="type">
        <div class="type-content">
          <p>라지 세트를 선택 하시겠습니까?</p>
          <div class="type-btns btns">
            <button type="button" class="l-set-confirm">확인</button>
            <button type="button" class="cancel">취소</button>
          </div>
        </div>
      </div>`
  setCancelButtonClickEvent();
  const lSetConfirm = document.querySelector(".l-set-confirm");
  lSetConfirm.onclick = () => {
    location.href = "/set-select-view";
  }
}

typeBtn[2].onclick = () => {
  typeBox.style.display = 'block';
  typeBox.innerHTML = `
      <div class="type">
        <div class="type-content">
          <p>단품을 선택 하시겠습니까?</p>
          <div class="type-btns btns">
            <button type="button" class="single-confirm">확인</button>
            <button type="button" class="cancel">취소</button>
          </div>
        </div>
      </div>`
  setCancelButtonClickEvent();
  
  const singleConfirm = document.querySelector(".single-confirm");
  singleConfirm.onclick = () => {
    location.href = "/order";
}
}

function setCancelButtonClickEvent () {
  const cancel = document.querySelector(".cancel");

  cancel.onclick = () => {
    typeBox.style.display = 'none';
  }
}


singleConfirm.onclick = () => {
  location.href = "/order";
}





