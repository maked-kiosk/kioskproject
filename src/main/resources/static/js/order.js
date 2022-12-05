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
const insertModal = document.querySelector(".insert-modal");
const insertUser = document.querySelector(".insert-user");
const insertCancelButton = document.querySelector(".insert-cancel-button");
const userName = document.querySelector(".user-name");
const userPhoneNumber = document.querySelector(".user-phone-number");
const earnPoints = document.querySelector(".earn-points");


let count = 1;
let amount = 4500;
let price = amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
let result = amount.toLocaleString('ko-KR');
console.log(amount);

const point = document.querySelector(".total-amount-span").textContent;
let num = point.replace("￦", "");
let num2 = num.replace("," , "");
let point2 = parseInt(num2);
let earnPoint = (point2 / 100) * 5;


minusButton.onclick = () => {
    if(setCount.innerHTML <= 1) {
        alert("최소 수량은 1입니다");
    } else if(setCount.innerHTML > 1) { 
       count = count - 1;
       setCount.innerHTML = count;
    }
    result = (setCount.innerHTML * amount).toLocaleString('ko-KR');
    menuAmount.innerHTML = "￦" + result;
    subTotalAmountSpan.innerHTML = menuAmount.innerHTML;
    totalAmountSpan.innerHTML = menuAmount.innerHTML;
    
}


plusButton.onclick = () => {
    if(setCount.innerHTML >= 1){
        count = count + 1;
        setCount.innerHTML = count;
    }
    result = (setCount.innerHTML * amount).toLocaleString('ko-KR');
    menuAmount.innerHTML = "￦" +  result;
    subTotalAmountSpan.innerHTML = menuAmount.innerHTML;
    totalAmountSpan.innerHTML = menuAmount.innerHTML;
    const point = document.querySelector(".total-amount-span").textContent;
        let num = point.replace("￦", "");
        console.log(num);
        let num2 = num.replace("," , "");
        console.log(num2);
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
    if(checkUser()){
        havingPointInfo.classList.remove("use-point-visible");
    }
}


earnPoints.onclick = () => {
    if(checkUser()) {
        alert(earnPoint + "포인트 적립되었습니다.");
        updateUserPoint();
        // updateUserPoint(user)
        

        // $.ajax({
        //     async: false,
        //     type: "put",
        //     url: `/api/v1/check/point`
        // })
    }
}

cancelButton.forEach(button => {
    button.onclick = () => {
        pointModal.classList.add("modal-visible");
        havingPointInfo.classList.add("use-point-visible");
    }
})

function checkUser() {
    let status = false;
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
                
                status = false;
            }else {
                // console.log(response.data);
                status = true;
                updateUserPoint(response.data);
                // alert("성공");
            }
        },
        error: (error) => {
            console.log(error);
        }
    })
    return status;
}

function updateUserPoint(user) {
    const id = user.id;
    console.log(id);

    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/check/point`,
        data:{
            "id": id,
            "point": earnPoint
        },
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            alert("포인트 적립 성공");
        },
        error: (error) => {
            console.log(error);
            alert("포인트 적립 실패");
        }
    });

}

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
            insertModalVisibleEvent();
            alert("등록 성공");
            
        },
        error: (error) => {
            console.log(error);
            alert("등록 실패");
        }
    });
}

function insertModalVisibleEvent() {
    insertModal.classList.add("insert-modal-visible");
}

insertCancelButton.onclick = () => {
    insertModalVisibleEvent();
}





