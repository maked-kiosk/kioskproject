const backButton = document.querySelector(".back-button");
const cardPayment = document.querySelector(".card-payment");
const pointUseQuestionModal = document.querySelector(".point-use-question-modal");
const payment = document.querySelector(".payment");
const pointUseButton = document.querySelector(".point-use-button");
const havingPointInfo = document.querySelector(".having-point-info");
const cancelButton = document.querySelector(".cancel-button");
const currentPointValue = document.querySelector(".current-point-value");
const usingPointInput = document.querySelector(".using-point-input");
const finalAmountInput = document.querySelector(".final-amount-input");
const usingPointButton = document.querySelector(".using-point-button");

currentPointValue.value =  JSON.parse(localStorage.user).point

let userId = JSON.parse(localStorage.user).id;
let totalPrice = parseInt(localStorage.totalPrice.replace("￦", "").replace(",", ""));
let usingPointValue = null


backButton.onclick = () => {
  history.back();
}

cardPayment.onclick = () => {
  pointUseQuestionModal.classList.remove("question-visible");
}

payment.onclick = () => {
  paymentEvent();
  pointUseQuestionModal.classList.add("question-visible");
  updateUserPoint();
}

pointUseButton.onclick = () => {
  pointUseQuestionModal.classList.add("question-visible");
  havingPointInfo.classList.remove("use-point-visible");
}

cancelButton.onclick = () => {
  usingPointInput.value = "";
  havingPointInfo.classList.add("use-point-visible");
}

usingPointInput.onkeydown = () => {

  setTimeout(() => {
      usingPointValue = parseInt(usingPointInput.value);

      console.log("check: " + usingPointValue);
      // if(usingPointInput.value.length == 0) {
      //     // usingPointInput.value = 0;
      //     // usingPointValue = usingPointInput.value ;
      //     finalAmountInput.value = totalPrice;
      //     console.log(totalPrice);
      // }

      if(usingPointValue + 1 > currentPointValue.value) {

        usingPointInput.value = currentPointValue.value;
          usingPointValue = parseInt(usingPointInput.value);

          console.log(usingPointValue);
          finalAmountInput.value = totalPrice - usingPointValue;

          if(finalAmountInput.value < 0) {
              usingPoint.value =  totalPrice;
              finalAmountInput.value = 0;
          }
      } else if(usingPointValue + 1 > totalPrice) {
        usingPointInput.value =  totalPrice;
          finalAmountInput.value = 0;
      }else if(usingPointValue < 1 || usingPointInput.value.length == 0) {
        usingPointInput.value = "";
        finalAmountInput.value = totalPrice - 0;
      }else {
        finalAmountInput.value = totalPrice - usingPointValue;
      }
      localStorage.totalPrice = finalAmountInput.value


  }, 100);

}

usingPointButton.onclick = () => {
  usingPointInput.value = "";
  paymentEvent();
  havingPointInfo.classList.add("use-point-visible");
  updateUserPoint();
}

  
  // localStorage.clear();
  
  // location.replace("/main");

function updateUserPoint() {
  let point = parseInt(localStorage.totalPrice.replace("￦", "").replace(",", "")) * (5/100);
  let point2 = usingPointValue;
  $.ajax({
    async: false,
    type: "put",
    url: `/api/v1/check/point`,
    data:{
        "id": userId,
        "point": point,
        "point2": point2
    },
    dataType: "json",
    success: (response) => {
        console.log(response.data);
        alert(point + "포인트 적립 성공");
    },
    error: (error) => {
        console.log(error);
        alert("포인트 적립 실패");
    }
  });
}

function paymentEvent() {
  let price = localStorage.totalPrice.replace("￦", "");
  alert(price + "원 결제 되었습니다")
}

