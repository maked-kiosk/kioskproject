



// cardPayment.onclick = () => {
//   let price = localStorage.totalPrice.replace("￦", "");
  
//   alert(price + "원 결제 되었습니다")
//   localStorage.removeItem("orderMenuList");
//   localStorage.totalPrice = "￦0";
  
//   location.replace("/main");
// }

window.onload = () => {
  Imp.getInstance();
  ButtonClickEventSetter.getInstance();
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