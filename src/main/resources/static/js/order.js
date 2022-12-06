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
const usingPointButton = document.querySelector(".using-point-button");


let count = 1;
let amount = 4500;
let price = amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
let result = amount.toLocaleString('ko-KR');
console.log(amount);




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


usePoint.onclick = (e) => {
    if(checkUser(e.target)){
       
    }
}


earnPoints.onclick = (e) => {
    if(checkUser(e.target)) {
        // alert(earnPoint + "포인트 적립되었습니다.");
        pointModal.classList.add("modal-visible");
        havingPointInfo.classList.add("use-point-visible");
        // updateUserPoint(user)     
    }
}

cancelButton.forEach(button => {
    button.onclick = () => {
        pointModal.classList.add("modal-visible");
        havingPointInfo.classList.add("use-point-visible");
        userName.value = "";
        userPhoneNumber.value = "";
    }
})

function checkUser(button) {
    let status = false;
    let pointStatus = button.classList.contains("use-point") ? "use" : "earn";
    console.log(pointStatus);
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
            user = response.data;
            if(response.data == null) {
                insertModalInVisibleEvent();
                status = false;
            }else {
                if(pointStatus == "use") {
                    havingPointInfo.classList.remove("use-point-visible");
                    let usingPoint = document.querySelector(".using-point-input");
                    let currentPoint = document.querySelector(".current-point-value");
                    currentPoint.value = user.point;
                    const point = document.querySelector(".total-amount-span").textContent;
                    let num = point.replace("￦", "");
                    let num2 = num.replace("," , "");
                    let point2 = parseInt(num2);
                    let finalAmount = document.querySelector(".final-amount-input");


                    usingPoint.onkeydown = () => {

                        setTimeout(() => {
                            let usingPointValue = parseInt(usingPoint.value);

                            console.log("된다")
                            console.log(point2);
                            console.log(usingPointValue)
                            
                            if(usingPointValue + 1 > user.point) {

                                usingPointValue = user.point;
                                finalAmount.value = point2 - usingPointValue;

                                if(finalAmount.value < 0) {
                                    usingPoint.value =  point2;
                                    finalAmount.value = 0;
                                }
                            } else if(usingPointValue + 1 > point2) {
                                usingPoint.value =  point2;
                                finalAmount.value = 0;
                            }else if(usingPointValue < 0) {
                                usingPoint.value = 0;
                            }else {
                                finalAmount.value = point2 - usingPointValue;
                            }

                            console.log(finalAmount.value);

                        }, 100);
                       
                    }
                    usingPointButton.onclick = () => {
                        usePointButtonClick(response.data, pointStatus);
                    }
                }else {
                    updateUserPoint(response.data, pointStatus);
                }
                // console.log(response.data);
                status = true;
                // alert("성공");
            }
        },
        error: (error) => {
            console.log(error);
        }
    })
    return status;
}

function usePointButtonClick(user, pointStatus) {
    const id = user.id;
    let usingPoint = document.querySelector(".using-point-input").value;
    let finalAmountInput = document.querySelector(".final-amount-input").value;
    
    if(confirm(usingPoint + "포인트를 사용하시겠습니까?")) {
        $.ajax({
            async: false,
            type: "put",
            url: `/api/v1/check/point`,
            data:{
                "id": id,
                "point": usingPoint,
                "pointStatus": pointStatus
            },
            dataType: "json",
            success: (response) => {
                console.log(response.data);
                alert(usingPoint + "가 사용되었습니다.")
                pointModal.classList.add("modal-visible");
                havingPointInfo.classList.add("use-point-visible");
                subTotalAmountSpan.innerHTML = "￦" + finalAmountInput.toLocaleString('ko-KR');
                totalAmountSpan.innerHTML = "￦" + finalAmountInput.toLocaleString('ko-KR');
            },
            error: (error) => {
                console.log(error);
                alert("포인트 사용 실패");
            }
        });
    }
}

function updateUserPoint(user, pointStatus) {
    const point = document.querySelector(".total-amount-span").textContent;
    let num = point.replace("￦", "");
    let num2 = num.replace("," , "");
    let point2 = parseInt(num2);
    let earnPoint = (point2 / 100) * 5;

    const id = user.id;
    console.log(id);

    $.ajax({
        async: false,
        type: "put",
        url: `/api/v1/check/point`,
        data:{
            "id": id,
            "point": earnPoint,
            "pointStatus": pointStatus
        },
        dataType: "json",
        success: (response) => {
            console.log(response.data);
            alert(earnPoint + "포인트 적립 성공");
            pointModal.classList.add("modal-visible");
            havingPointInfo.classList.add("use-point-visible");
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






