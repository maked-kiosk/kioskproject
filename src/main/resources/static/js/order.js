const minusButton = document.querySelector(".minus-button");
const plusButton = document.querySelector(".plus-button");
const setCount = document.querySelector(".set-count-span");
const homeButton = document.querySelector(".load-main-page-button");
const menuAmount = document.querySelector(".menu-amount");
const subTotalAmountSpan = document.querySelector(".sub-total-amount-span");
const totalAmountSpan = document.querySelector(".total-amount-span");
const pointButton = document.querySelector(".point-button");
const pointModal = document.querySelector(".point-modal");
const usePoint = document.querySelector(".use-point");
const havingPointInfo = document.querySelector(".having-point-info");
const cancelButton = document.querySelectorAll(".cancel-button");
const addOrdersButton = document.querySelector(".add-orders-button");
const userCheckButton = document.querySelectorAll(".user-check");
const insertModal = document.querySelector(".insert-modal");
const insertUser = document.querySelector(".insert-user");
const insertCancelButton = document.querySelector(".insert-cancel-button");
const userName = document.querySelector(".user-name");
const userPhoneNumber = document.querySelector(".user-phone-number");


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
    location.href = "/kioskmain";
}

addOrdersButton.onclick = () => {
    location.href = "/kioskmain";
}

pointButton.onclick = () => {
    pointModal.classList.remove("modal-visible");
}

usePoint.onclick = () => {
    havingPointInfo.classList.remove("use-point-visible");
}

cancelButton.forEach(button => {
    button.onclick = () => {
        pointModal.classList.add("modal-visible");
        havingPointInfo.classList.add("use-point-visible");
    }
})

userCheckButton.forEach(button => {
    button.onclick = () => {
        
        $.ajax({
            async: false,
            type: "get",
            url: `/api/v1/check/user`,
            data: {
                "userName": userName.value,
                "userPhoneNumber": userPhoneNumber.value
            },
            dataType: "json",
            success: (response) => {
                if(response.data == null) {
                    insertModalInVisibleEvent();
                }else {
                    console.log(response.data);
                    alert("성공");
                }
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
})

function insertModalInVisibleEvent() {
    insertModal.classList.remove("insert-modal-visible");
}

insertUser.onclick = () => {
    $.ajax({
        async: false,
        type: "post",
        url: `/api/v1/check/insert-user`,
        data: {
            "userName": userName.value,
            "userPhoneNumber": userPhoneNumber.value
        },
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            alert("등록 성공");
            insertModalInVisibleEvent();
        },
        error: (error) => {
            console.log(error);
            alert("등록 실패");
        }
    });
}

insertCancelButton.onclick = () => {
    insertModal.classList.add("insert-modal-visible");
}





