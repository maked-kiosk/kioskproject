const plusAndMinusButton = document.querySelector(".amount-modify-div");

const plusButton = document.querySelector(".plus-button");
const minusButton = document.querySelector(".minus-button");
const amountDetailSpan = document.querySelector(".amount-detail-span");

setPlusButtonClickEvetn();
setMinusButtonClickEvent();
setCancelButtonClickEvent();
setLoadMainPageButtonClickEvent();
setShoppingBasketAddButtonClickEvent();


function setPlusButtonClickEvetn() {
    plusButton.onclick = increaseAmount;
}

function setMinusButtonClickEvent() {
    minusButton.onclick = decreaseAmount;
}

function increaseAmount() {
    amountDetailSpan.textContent = getAmount() + 1;
    checkToSeeIfTheAmountIsOne();
}

function decreaseAmount() {
    if(getAmount() != 1) {
        amountDetailSpan.textContent = getAmount() - 1;
        checkToSeeIfTheAmountIsOne();
    }
}

function getAmount() {
    return parseInt(amountDetailSpan.textContent);
}

function checkToSeeIfTheAmountIsOne() {
    if(getAmount() == 1) {
        minusButtonIsDisabled();
    }else {
        minusButtonIsActivated();
    }
}

function minusButtonIsDisabled() {
    minusButton.classList.add("disable-amount-button")
}

function minusButtonIsActivated() {
    minusButton.classList.remove("disable-amount-button")
}

function setCancelButtonClickEvent() {
    const cancelButton = document.querySelector(".cancel-button");
    // cancelButton.onclick = () => history.back();
}

function setLoadMainPageButtonClickEvent() {
    const loadMainPageButton = document.querySelector(".load-main-page-button");
    loadMainPageButton.onclick = () => location.replace("/main");
}

function setShoppingBasketAddButtonClickEvent() {

}