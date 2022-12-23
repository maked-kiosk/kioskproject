window.onload = () => {
  PointViewer.getInstance();
  PageLoader.getInstance();
  Imp.getInstance();
  ButtonClickEventSetter.getInstance();
}

class User {
  static #instance = null;

  user = null;
  userFlag = false;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new User();
    }

    return this.#instance;
  }

  constructor() {
    this.setUser();
  }

  setUser() {
    this.user = localStorage.user;

    if(this.user != null) {
      this.user = JSON.parse(this.user);
    }

    this.userFlag = this.user != null;
  }
}

class Point {
  static #instance = null;

  usingPointValue = 0;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new Point();
    }

    return this.#instance;
  }
}

class PointViewer {
  static #instance = null;

  usingPointInput = null;
  pointUseQuestionModal = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new PointViewer();
    }

    return this.#instance;
  }

  constructor() {
    this.pointUseQuestionModal = document.querySelector(".point-use-question-modal");
    if(User.getInstance().userFlag) {
      this.setPointEvent();

    }

  }

  setPointEvent() {
    const finalAmountInput = document.querySelector(".final-amount-input");
    this.usingPointInput = document.querySelector(".using-point-input");
    let currentPointValue = document.querySelector(".current-point-value");
    let totalPrice = parseInt(localStorage.totalPrice.replace("￦", "").replace(",", ""));

    currentPointValue.value = User.getInstance().user.point;

    this.usingPointInput.onkeydown = () => {

      setTimeout(() => {
        let usingPointValue = parseInt(this.usingPointInput.value);
          // usingPointValue = parseInt(usingPointInput.value);
        Point.getInstance().usingPointValue = usingPointValue;


          // if(usingPointInput.value.length == 0) {
          //     // usingPointInput.value = 0;
          //     // usingPointValue = usingPointInput.value ;
          //     finalAmountInput.value = totalPrice;
          //     console.log(totalPrice);
          // }
    
          if(usingPointValue + 1 > currentPointValue.value) {
    
            this.usingPointInput.value = currentPointValue.value;
              usingPointValue = parseInt(this.usingPointInput.value);
    
              console.log(usingPointValue);
              finalAmountInput.value = totalPrice - usingPointValue;
    
              if(finalAmountInput.value < 0) {
                  this.usingPointInput.value =  totalPrice;
                  finalAmountInput.value = 0;
              }
          } else if(usingPointValue + 1 > totalPrice) {
              this.usingPointInput.value =  totalPrice;
              finalAmountInput.value = 0;
          }else if(usingPointValue < 1 || this.usingPointInput.value.length == 0) {
            this.usingPointInput.value = "";
            finalAmountInput.value = totalPrice - 0;
          }else {
            finalAmountInput.value = totalPrice - usingPointValue;
          }
          localStorage.totalPrice = finalAmountInput.value
    
    
      }, 100);
    
    }
  }

  
}


class PageLoader {
  static #instance = null;

  orderMenuList = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new PageLoader();
    }

    return this.#instance;
  }

  setProductName() {
    let productName = null;

    this.orderMenuList = localStorage.orderMenuList;

    if(this.orderMenuList != null) {
      this.orderMenuList = JSON.parse(this.orderMenuList);

      const product = this.orderMenuList[0];

      if(product.menuCategoryCode != 0) {
        productName = product.setFlag ? product.setName : product.menuName;
      }else {
        productName = product.menuName;
      }

      productName += this.orderMenuList.length > 1 ? `외 ${this.orderMenuList.length - 1}` : '';
    }

    return productName;
  }

  paymentSuccessfulAndLoadMainPage(price) {
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
    let price = localStorage.totalPrice.replace("￦", "");

    this.IMP.request_pay({
      pg: "kakaopay.TC0ONETIME",
      pay_method: "card",
      merchant_uid: "mc_" + new Date().getTime(),
      name: PageLoader.getInstance().setProductName(),
      amount: price
    },
    (response) => {
      console.log(response);
      if(response.success) {

        alert("결제 성공");
        if(User.getInstance().userFlag) {
          this.updateUserPoint();

        }

        let status = this.updateSalesQuantityRequest();
        PageLoader.getInstance().paymentSuccessfulAndLoadMainPage(price);
        
        if(!status) {
          alert("판매 수량 업데이트 실패");
        }
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
  
  updateUserPoint() {
    let point = parseInt(localStorage.totalPrice.replace("￦", "").replace(",", "")) * (5/100);
    let point2 = parseInt(Point.getInstance().usingPointValue);
    let userId = JSON.parse(localStorage.user).id;

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

  updateSalesQuantityRequest() {
    const menuObject = this.setMenuObject();
    let status = false;

    $.ajax({
      async: false,
      type: "put",
      url: `/api/v1/menu/sales`,
      contentType: "application/json",
      data: JSON.stringify(menuObject),
      dataType: "json",
      success: (response) => {
        status = response.data;
      },
      error: (request, status, error) => {
        console.log(request.status);
        console.log(request.responseText);
        console.log(error);
      }
    })

    return status;
  }

  setMenuObject() {
    const orderMenuList = PageLoader.getInstance().orderMenuList;

    let menuObject = {
      "menuIdentityDtoList": new Array()
    }

    orderMenuList.forEach(menu => {
      let menuIdentityDto = {
        "menuCode": 0,
        "menuCategoryCode": 0
      }

      if(menu.setFlag) {
        menuIdentityDto.menuCode = menu.burger.id;
        menuIdentityDto.menuCategoryCode = 1;

      }else {
        menuIdentityDto.menuCode = menu.id;
        menuIdentityDto.menuCategoryCode = menu.menuCategoryCode;

      }

      menuObject.menuIdentityDtoList.push(menuIdentityDto);
    })

    menuObject.menuIdentityDtoList = menuObject.menuIdentityDtoList.filter(menu => menu.menuCategoryCode == 1 || menu.menuCategoryCode == 4);

    return menuObject;
  }
}

class ButtonClickEventSetter {
  static #instance = null;

  havingPointInfo = null;
  usingPointInput = null;

  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ButtonClickEventSetter();
    }
    
    return this.#instance;
  }

  constructor() {
    this.havingPointInfo = document.querySelector(".having-point-info");
    this.usingPointInput = document.querySelector(".using-point-input");
    this.pointUseQuestionModal = PointViewer.getInstance().pointUseQuestionModal;

    this.setBackButtonClickEvent();
    this.setCardPaymentClickEvent();

    if(User.getInstance().userFlag) {
      this.setCardPaymentButotnClickEvent();

    }
    this.setPaymentClickEvent();
    this.setPointUseButtonClickEvent();
    this.setCancelButtonClickEvent();
    this.setUsingPointButtonClickEvent();
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

  setCardPaymentButotnClickEvent() {
    const cardPayment = document.querySelector(".card-payment");

    cardPayment.onclick = () => {
      this.pointUseQuestionModal.classList.remove("question-visible");
    }
  }

  setPaymentClickEvent() {
    const payment = document.querySelector(".payment");

    payment.onclick = () => {
      Imp.getInstance().requestPay();
      this.pointUseQuestionModal.classList.add("question-visible");
    }
  }
  
  setPointUseButtonClickEvent() {
    const pointUseButton = document.querySelector(".point-use-button");

    pointUseButton.onclick = () => {
      this.pointUseQuestionModal.classList.add("question-visible");
      this.havingPointInfo.classList.remove("use-point-visible");
    }
  }
  
  setCancelButtonClickEvent() {
    const cancelButton = document.querySelector(".cancel-button");

    cancelButton.onclick = () => {
      this.usingPointInput.value = "";
      this.havingPointInfo.classList.add("use-point-visible");
    }
  }

  setUsingPointButtonClickEvent() {
    const usingPointButton = document.querySelector(".using-point-button");

    usingPointButton.onclick = () => {
      let price = localStorage.totalPrice.replace("￦", "");
      
      this.usingPointInput.value = "";
      this.havingPointInfo.classList.add("use-point-visible");

      if(price == 0) {
        alert("결제 성공");
        if(User.getInstance().userFlag) {
          Imp.getInstance().updateUserPoint();

        }

        PageLoader.getInstance().paymentSuccessfulAndLoadMainPage(price);
      }else {
        Imp.getInstance().requestPay();

      }
    }
  }
  
}