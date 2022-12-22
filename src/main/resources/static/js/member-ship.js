const memberShipRegistration = document.querySelector(".member-ship-registration");
const mainModalDiv = document.querySelector(".main-modal-div");
const registrationButton = document.querySelector(".registration-button");
const cancelButton = document.querySelector(".cancel-button");
const userCheckInput = document.querySelectorAll(".user-check-input");
const userName = document.querySelector(".user-name");
const userPhoneNumber = document.querySelector(".user-phone-number");

memberShipRegistration.onclick = () => {
    mainModalDiv.classList.remove("member-ship-modal-visible");
}

cancelButton.onclick = () => {
    mainModalDiv.classList.add("member-ship-modal-visible");
    userCheckInput[0].value = "";
    userCheckInput[1].value = "";
}

registrationButton.onclick = () => {
    checkUser();
    
}

function checkUser() {
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
            if(response.data != null) {
                alert("멤버십 등록 성공")
                console.log(response.data)
                localStorage.user = JSON.stringify(response.data);
                location.replace("/kiosk-main");
            }else {
                registrationUser();
            }
        },
        error: (error) => {
            console.log(error);
        }
    })
    
}

function registrationUser() {
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
            alert("새로운 멤버십 추가 성공");
            localStorage.user = JSON.stringify(response.data);
            location.replace("/kiosk-main");
        },
        error: (error) => {
            console.log(error);
            alert("멤버십 등록 실패");
        }
    });
}
