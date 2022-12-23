# kiosk-teamProject
> 저번에 웹 사이트를 한번 클론 코딩을 진행하였기 때문에 이번에는 조금 색다른 것을 시도해 보고 싶어서 키오스크 프로그램을 구현했습니다  
> 그중에서 흔하게 접해볼 수 있는 맥도날드 키오스크를 목표로 하고 진행하였습니다.  

# **기술 스택**
<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/>
</p>
<p>
  <img src="https://img.shields.io/badge/Java-FF9E0F?style=flat-square&logo=Java&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=Spring Boot&logoColor=white"/>
  <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat-square&logo=Spring Security&logoColor=white"/>
</p>
<p>
  <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=MariaDB&logoColor=white"/>
  <img src="https://img.shields.io/badge/MyBatis-003545?style=flat-square&logo=MyBatis&logoColor=white"/>
</P>


# **주요 구현 기능**

### 멤버십 
![멤버쉽](https://user-images.githubusercontent.com/101931879/209305010-fefa9f44-7b6e-47cb-9a93-c5e73e04d685.jpg)
> 주문하기를 누르면 멤버십 등록 또는 일반 결제 선택 창이 나타납니다.  
> 멤버십으로 주문하려면 성명과 전화번호가 필요합니다.  
> DB에 해당 데이터가 없다면 INSERT가 진행되고 있다면 그대로 진행이 됩니다.  




### 메인 화면
![kiosk-main](https://user-images.githubusercontent.com/101931879/209305243-a9e82428-5908-4f47-89a6-05c8ef41bc83.png)
> 메인 화면 구성입니다.  
<br>

![메인](https://user-images.githubusercontent.com/101931879/209305005-6b771d16-af35-4364-bd34-931f821c8ef9.jpg)
> 왼쪽 카테고리를 선택하여 선택한 메뉴의 카테고리를 볼 수 있습니다.  
<br>

![맥런치](https://user-images.githubusercontent.com/101931879/209305247-83d11640-9440-4134-8351-87175e0d82cb.png)
> 햄버거 리스트를 조회할 때 해당 데이터가 맥런치에 해당하는 버거라면 따로 표시를 해줍니다.  
<br>

![맥모닝](https://user-images.githubusercontent.com/101931879/209305004-c0e1fc93-da2f-400f-a33f-69de24bb77eb.jpg)
> 맥모닝의 메뉴는 정해진 시간이 아니라면 접근 불가하게 구현하였습니다.  
<br>


### 주문
![세트 선택](https://user-images.githubusercontent.com/101931879/209305013-c57caf09-d2c4-4ce5-a9fe-36105354f297.jpg)
> 단품이 아닌 세트 메뉴를 선택한다면 버거와 같이 먹을 메뉴를 선택할 수 있게 됩니다.  
<br>

![세트 메뉴 수정](https://user-images.githubusercontent.com/101931879/209305012-41bf0b6e-47ea-446c-a27b-2e3795b30005.jpg)
> 세트를 선택했다면 수정 버튼을 통해서 사이드 메뉴, 음료를 수정할 수 있는 창이 차액과 함께 나타납니다.  
<br>

![장바구니](https://user-images.githubusercontent.com/101931879/209305015-741775ab-6856-4390-ab51-3862404371ce.jpg)
> 추가 주문 버튼을 누르게 되면 메인 화면으로 다시 넘어가고 장바구니에 담긴 상품의 개수와 가격을 화면에 보여줍니다.  
> 다른 메뉴를 추가해 준다면 장바구니에 추가가 되며 메뉴 전체를 보여줍니다.  
<br>

![결제](https://user-images.githubusercontent.com/101931879/209304998-7220b56b-a6ee-486f-97ee-12a684eb07da.jpg)
> 결제를 진행하기 전에 멤버십 등록이 되어있다면 포인트 사용 여부를 선택할 수 있고,  
> 포인트를 사용하면 가지고 있는 포인트와 사용할 포인트, 최종 금액을 표시해 줍니다.  
> 최종적으로 iamport를 이용해서 카카오페이 결제창으로 넘어가서 결제를 진행하게 됩니다.  


<br>


# **부가 구현 기능**
### iamport를 이용한 결제 기능  


# 데이터베이스 
> 이미 한번 프로젝트를 진행한 경험이 있기 때문에 이번에는 DB 설계를 가장 먼저 진행해 보았습니다.  
> 지난 프로젝트보다는 테이블 개수가 상당히 작은 점이 아쉽습니다.  
> 

[Table Diagram](https://www.erdcloud.com/d/BJZx8b2stEzvRm8oj)  
<br>

> ![ERD](https://user-images.githubusercontent.com/101931879/209321620-ca5bfc12-2942-4dae-aa2f-6e562ee81795.png)
<br>  

# 아쉬운 점

> 웹 사이트 클론 코딩은 한번 진행해 본 적이 있어 색다르게 키오스크를 선택해서 프로젝트를 진행하였지만 웹 사이트보다는 구현할 수 있는 기능이 현저히 적었고,  
> DB 테이블 또한 적었기 때문에 프로젝트를 진행하면서 아쉬운 부분으로 적용되었습니다.  
> 그리고 팀 프로젝트로 진행하였기 때문에 새로운 기술을 사용을 못 해보고 저번 프로젝트와 동일한 기술을 사용한 것이 아쉽습니다.  
<br>  

# 프로젝트 전체 소감
  
> 아쉬운 점에서 언급했듯이 새로운 기술을 사용을 못 해본 것이 가장 아쉽지만 저번 프로젝트에서 사용했던 기술에 대해서 이해도를 더욱 높일 수 있었고,  
> 정해진 기간 내에 급하게 구현해야 했던 저번 프로젝트와는 다르게 처음 설계 과정에서 더욱 신중하게 설계를 하였으며,  
> API 명세서를 작성을 먼저 하고, DB에서 쿼리문을 통해 데이터를 들고 오는 과정을 전부 마치고 나서야 API 구현을 진행하였습니다.  
> API 명세서를 먼저 만들어 놓고 API를 작성하니 조금 더 RESTful 한 설계를 할 수 있었고 기능대로 잘 분류를 시켜놓았기 때문에  
> API 작성을 하면서 수정하는 일 없이 정해진 틀대로 작성을 하여 문제없이 잘 설계할 수 있었습니다.  
