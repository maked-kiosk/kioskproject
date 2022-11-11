const minusButton = document.querySelector(".minus-button");
const plusButton = document.querySelector(".plus-button");
const setCount = document.querySelector(".set-count-span");
const homeButton = document.querySelector(".home-button");
const menuAmount = document.querySelector(".menu-amount");
const subTotalAmountSpan = document.querySelector(".sub-total-amount-span");
const totalAmountSpan = document.querySelector(".total-amount-span");

let count = 1;
let amount = 4500;
let price = amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

minusButton.onclick = () => {
    if(setCount.innerHTML <= 1) {
        alert("최소 수량은 1입니다");
    } else if(setCount.innerHTML > 1) { 
       count = count - 1;
       setCount.innerHTML = count;
    }
    menuAmount.innerHTML = "￦" +  setCount.innerHTML * amount;
    subTotalAmountSpan.innerHTML = menuAmount.innerHTML;
    totalAmountSpan.innerHTML = menuAmount.innerHTML;
}


plusButton.onclick = () => {
    if(setCount.innerHTML >= 1){
        count = count + 1;
        setCount.innerHTML = count;
    }
    menuAmount.innerHTML = "￦" +  setCount.innerHTML * amount;
    subTotalAmountSpan.innerHTML = menuAmount.innerHTML;
    totalAmountSpan.innerHTML = menuAmount.innerHTML;
}

homeButton.onclick = () => {
    location.href = "";
}


