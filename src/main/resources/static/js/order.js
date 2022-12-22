const homeButton = document.querySelector(".load-main-page-button");
const menuPrice = document.querySelectorAll(".menu-price");
const orderCompleteButton = document.querySelector(".order-complete-button");

const subTotalPriceSpan = document.querySelector(".sub-total-price-span");
const totalPriceSpan = document.querySelector(".total-price-span");
const cancelButton = document.querySelectorAll(".cancel-button");
const addOrdersButton = document.querySelector(".add-orders-button");

let count = 1;
let amount = 4500;
let price = amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
let result = amount.toLocaleString('ko-KR');
let orderMenuList = null;



setOrderMenu();
setTotalPrice();

orderCompleteButton.onclick = () => {
    let totalPriceText = document.querySelector(".total-price-span").textContent;
    localStorage.totalPrice = totalPriceText;
    location.href = "/table-service";
}

homeButton.onclick = () => {
    if(confirm("장바구니가 모두 초기화 됩니다.")) {
        localStorage.removeItem("orderMenuList");
        location.replace("/kiosk-main");
        localStorage.totalPrice = "￦0";
    }
    // let totalPriceText = document.querySelector(".total-price-span").textContent;
    // localStorage.totalPrice = totalPriceText;
}

addOrdersButton.onclick = () => {
    updateShoppingBasketInformation();
    let totalPriceText = document.querySelector(".total-price-span").textContent;
    localStorage.totalPrice = totalPriceText;
    location.replace("/kiosk-main");
}


function setOrderMenu() {
    const orderMenuDetails = document.querySelector("main");

    orderMenuList = JSON.parse(localStorage.orderMenuList);

    orderMenuDetails.innerHTML = "";

    orderMenuList.forEach(menu => {
        let totalPrice = null;
        let totalKcal = null;

        if(menu.setFlag) {
            totalPrice = "￦" + (menu.amount * menu.setPrice).toLocaleString('ko-KR');
            totalKcal = (menu.amount * menu.setKcal).toLocaleString("ko-KR") + " Kcal";
        }else {
            totalPrice = "￦" + (menu.amount * menu.defaultPrice).toLocaleString('ko-KR');
            totalKcal = (menu.amount * menu.kcal).toLocaleString("ko-KR") + " Kcal";
        }
        
        orderMenuDetails.innerHTML += `
            <div class="order-menu">
                <button type="button" class="cancel-button">취소</button>
                <div class="menu-img-info">
                    <div class="menu-info">
                        <span class="menu-title">${menu.setFlag ? menu.setName : menu.menuName} <span class="total-kcal-span">${totalKcal}</span></span>
                        <span class="menu-details">${menu.setFlag ? menu.side.menuName + " " + menu.drink.menuName : menu.menuName}</span>
                        <button type="button" class="details-button">세부정보 표시</button>
                    </div>
                </div>
                <div class="set-count-modify">
                    <button class="minus-button" type="button">-</button>
                    <div class="set-count">
                        <span class="set-count-span">${menu.amount}</span>
                    </div>
                    <button class="plus-button" type="button">+</button>
                </div>
                <span class="menu-price">${totalPrice}</span>
            </div> 
        `;
    });

    setMinusButtonClickEvent();
    setPlusButtonClickEvent();
    setCancelButtonClickEvent();
}

function setTotalPrice() {
    const subTotalPriceSpan = document.querySelector(".sub-total-price-span");
    const totalPriceSpan = document.querySelector(".total-price-span");

    let totalPrice = parseInt(getTotalPrice());

    subTotalPriceSpan.textContent = "￦" + totalPrice.toLocaleString("ko-KR");
    totalPriceSpan.textContent = "￦" + totalPrice.toLocaleString("ko-KR");
    
}

function setTotalKcal(index, count) {
    const totalKcalSpanItems = document.querySelectorAll(".total-kcal-span");
    let totalKcal = getTotalKcal(index, count);

    totalKcalSpanItems[index].textContent = totalKcal;
}

function getTotalKcal(index, count) {
    if(orderMenuList[index].setFlag) {
        return (orderMenuList[index].setKcal * count).toLocaleString("ko-KR") + " Kcal";

    }else {
        return (orderMenuList[index].kcal * count).toLocaleString("ko-KR") + " Kcal";

    }
}

function getTotalPrice() {
    const menuPriceItems = document.querySelectorAll(".menu-price");

    let totalPrice = 0;

    menuPriceItems.forEach(menuPrice => {
        totalPrice += parseInt(menuPrice.textContent.substring(1).replaceAll(",", ""));
    })

    return totalPrice;
}

function setMinusButtonClickEvent() {
    const setCountItems = document.querySelectorAll(".set-count-span");
    const minusButtons = document.querySelectorAll(".minus-button");

    minusButtons.forEach((button, index) => {
        button.onclick = () => {
            let count = parseInt(setCountItems[index].innerHTML);
            if(count < 2) {
                alert("최소 수량은 1입니다");
                
            }else {
                count -= 1;
                setCountItems[index].innerHTML = count;
            }
    
            setMenuPrice(index, count);
            setTotalKcal(index, count);
            setTotalPrice();
        }
    
    })
}

function setPlusButtonClickEvent() {
    const setCountItems = document.querySelectorAll(".set-count-span");
    const plusButtons = document.querySelectorAll(".plus-button");

    plusButtons.forEach((button, index) => {
        button.onclick = () => {
            let count = parseInt(setCountItems[index].innerHTML);
    
            if(setCountItems[index].innerHTML > 0){
                count += 1;
                setCountItems[index].innerHTML = count;
            }
    
            setMenuPrice(index, count);
            setTotalKcal(index, count);
            setTotalPrice();
        }
    })
}

function setMenuPrice(index, count) {
    const menuPrice = document.querySelectorAll(".menu-price")[index];

    if(orderMenuList[index].setFlag) {
        menuPrice.textContent = "￦" + (orderMenuList[index].setPrice * count).toLocaleString("ko-KR");

    }else {
        let price = orderMenuList[index].defaultPrice;
        menuPrice.textContent = "￦" + (price * count).toLocaleString("ko-KR");

    }
}

function updateShoppingBasketInformation() {
    const setCountItems = document.querySelectorAll(".set-count-span");

    orderMenuList.forEach((menu, index) => {
        menu.amount = setCountItems[index].textContent;
    })

    localStorage.orderMenuList = JSON.stringify(orderMenuList);
}

function setCancelButtonClickEvent() {
    const cancelButtonItems = document.querySelectorAll(".cancel-button");


    cancelButtonItems.forEach((button, buttonIndex) => {
        button.onclick = () => {
            orderMenuList = orderMenuList.filter((menu, filterIndex) => buttonIndex != filterIndex);
            
            localStorage.orderMenuList = JSON.stringify(orderMenuList);
            location.replace("/order");
        }
    })

}