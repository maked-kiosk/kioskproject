const backButton = document.querySelector(".back-button");
const cardPayment = document.querySelector(".card-payment");

backButton.onclick = () => {
  history.back();
}

cardPayment.onclick = () => {
  let price = localStorage.totalPrice.replace("￦", "");
  let point = parseInt(localStorage.totalPrice.replace("￦", "").replace(",", "")) * (5/100);
  let userId = JSON.parse(localStorage.user).id;
  updateUserPoint(userId, point);

  
  alert(price + "원 결제 되었습니다")
  // localStorage.clear();
  
  // location.replace("/main");
}

function updateUserPoint(id, point) {
  $.ajax({
    async: false,
    type: "put",
    url: `/api/v1/check/point`,
    data:{
        "id": id,
        "point": point,
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

