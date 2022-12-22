
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



window.onload = () => {
  Imp.getInstance();
  ButtonClickEventSetter.getInstance();
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

class PageLoader {
  static #instance = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new pageLoader();
    }

    return this.#instance;
  }

  paymentSuccessfulAndLoadMainPage() {
    let price = localStorage.totalPrice.replace("￦", "");
    localStorage.removeItem("orderMenuList");
    localStorage.totalPrice = "￦0";
  
    alert(price + "원 결제 되었습니다")
    location.replace("/main");
  }
} 

class Imp {
  static #instance = null;

  IMP = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new Imp();
    }

    return this.#instance;
  }

  constructor() {
    this.impInit();
  }

  impInit() {
    this.IMP = window.IMP;
    this.IMP.init('imp50204722');
  }

  requestPay() {
    this.IMP.request_pay({
      pg: "kakaopay.TC0ONETIME",
      pay_method: "card",
      merchant_uid: "mc_" + new Date().getTime(),
      name: "불고기 버거",
      amount: 100,
      buyer_email : 'dhmk47@naver.com',
      buyer_name : '한대경',
      buyer_tel : '010-4966-3160',
      buyer_addr : '서울 강남구 도곡동',
      buyer_postcode : '123-456'
    },
    (response) => {
      console.log(response);
      if(response.success) {

        alert("결제 성공");
        PageLoader.getInstance().paymentSuccessfulAndLoadMainPage();
        
        // $.ajax({
        //   async: false,
        //   type: "post",
        //   url: `/api/v1/auth/verify-iamport`,
        //   data: JSON.stringify({"impUid": response.imp_uid}),
        //   contentType: "application/json",
        //   dataType: "json",
        //   success: (response) => {
        //     console.log(response);

            
        //   },
        //   error: (request, status, error) => {
        //     console.log(request.status);
        //     console.log(request.responseText);
        //     console.log(error);
        //   }
        // })

      }else {
        alert("결제 실패")
      }
    }
    );
  }
}

class ButtonClickEventSetter {
  static #instance = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ButtonClickEventSetter();
    }
    
    return this.#instance;
  }

  constructor() {
    this.setBackButtonClickEvent();
    this.setCardPaymentClickEvent();
  }

  setBackButtonClickEvent() {
    const backButton = document.querySelector(".back-button");

    backButton.onclick = () => {
      history.back();
    }
  }

  setCardPaymentClickEvent() {
    const cardPayment = document.querySelector(".card-payment");

    cardPayment.onclick = () => {
      Imp.getInstance().requestPay();
    }
  }
}