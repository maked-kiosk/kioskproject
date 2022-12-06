const foodMenus = document.querySelectorAll('.food-menus');     // 메뉴 리스트
const navBtnsList = document.querySelectorAll('nav > ul > li'); // 메뉴 버튼
const foodType = document.querySelectorAll('.food-type li'); 
const learnMenuBtnsList = document.querySelectorAll('.learn-menu-btns-list li');

const modalBody = document.querySelector(".modal-body");

foodMenus[0].style.display = 'block';// 메인 페이지


// 메뉴 알아보기
learnMenuBtnsList[0].onclick = () => {
    foodMenus[0].style.display = 'none';
    foodMenus[1].style.display = 'block';
}

learnMenuBtnsList[1].onclick = () => {
    foodMenus[0].style.display = 'none';
    foodMenus[2].style.display = 'block';
}

learnMenuBtnsList[2].onclick = () => {
    foodMenus[0].style.display = 'none';
    foodMenus[3].style.display = 'block';
}

learnMenuBtnsList[3].onclick = () => {
    foodMenus[0].style.display = 'none';
    foodMenus[4].style.display = 'block';
}

// nav 버튼 이벤트
for (let i = 0; i < navBtnsList.length; i++) {//liList배열이기때문 선택할려면for문사용
    // let n = 0;//현재 클릭된 버튼에 인덱스값이 초기값설정
    // navBtnsList[i].index = i;//메뉴의 인덱스 값을 미리 설정


    navBtnsList[i].onclick = () => {
        // e.preventDefault();//a태그의 이벤트 상실
        // n = e.currentTarget.index; //==$(this).index(); 0 1 2 3 4 5                 
        //e.target //자식요소에 이벤트를 적용하는 대상
        //e.currentTarget//부모요소 이벤트 적용하는 대상

        getMenuList(navBtnsList[i].querySelector("span").textContent, i);

        for (let j = 0; j < navBtnsList.length; j++) {
            //클릭된 버튼을 비교하고 스타일을 설정하기 위한 반복문
            if (j == i) {
                foodMenus[j].style.display = 'block';
            } else {
                foodMenus[j].style.display = 'none';
            }
        }
    }
}

removeMenuObjectInLocalStorage();
setSelectBurgerTypeEvent();

//버거 메뉴 
function getMenuList(selectValue, index) {
    let menuType = setMenuTypeBySelectMenuType(selectValue);

    let url = selectValue == "버거" ? `/api/v1/menu/burger/list` 
    : selectValue == "맥모닝" ? `/api/v1/menu/mc-morning/list` : `/api/v1/menu/${menuType}/list?mcMorning=false`

    $.ajax({
        async: false,
        type: "get",
        url: url,
        dataType: "json",
        success: (response) => {
            setList(response.data, index, menuType);
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function setSelectBurgerTypeEvent() {
    foodType.forEach(type => {
        type.onmousedown = () => type.classList.add("active");
        type.onmouseup = () => type.classList.remove("active");
        type.onmouseout = () => type.classList.remove("active");
        
    });
}

function setMenuTypeBySelectMenuType(value) {
    let menuType = null;
    
    if(value == "버거") {
        menuType = "burger";

    }else if(value == "사이드") {
        menuType = "side";

    }else if(value == "커피") {
        menuType = "coffee";

    }else if(value == "디저트") {
        menuType = "dessert";

    }else if(value == "음료") {
        menuType = "drink";

    }else if(value == "맥모닝") {
        menuType = "mcMorning";
        
    }

    return menuType;
}

function setList(list, index, menuType){
    const menuButton = document.querySelectorAll(".food-menu-btns");

    menuButton.forEach(menuUl => menuUl.innerHTML = "");

    list.forEach(menu => {
        menuButton[index].innerHTML += `
            <li class="menu-li">
                <div class="food-menu-img">
                    <img src="/image/images/${menuType}/${menu.image}">
                </div>
                <div>
                    <p>${menu.menuName}</p>
                    <div class="food-menu-price">
                    <p>₩ ${menu.price.toLocaleString('ko-KR')}</p>
                    <p>${menu.kcal.toLocaleString('ko-KR')}<span>Kcal</span></p>
                    </div>
                </div>
            </li>
        `
    });

    setMenuClickEvent(list, menuType);
}

function setMenuClickEvent(menuList, menuType) {
    const menuListLi = document.querySelectorAll(".menu-li");
    let burgerFlag = setMenuFlagByMenuType(menuType);

    let url = burgerFlag ? "/set-size-select-view" : "/order";

    menuListLi.forEach((menu, index) => {
        menu.onclick = () => {
            burgerFlag ? loadSetSizeSelectViewPage(menuList[index], url) : showAddShoppingBasketModalView(menuList[index]);
        }
    })
}

function setMenuFlagByMenuType(menuType) {
    return menuType == "burger";
}

function loadSetSizeSelectViewPage(menu, url) {
    localStorage.menuObject = JSON.stringify(menu);
    location.href = url;
}

function showAddShoppingBasketModalView(menu) {
    modalBody.classList.remove("visible");

    setRequestButtonClickEvent(menu);
    
}

function setRequestButtonClickEvent(menu) {
    const requestButtonItems = document.querySelectorAll(".show-add-shopping-basket-modal-view button");

    requestButtonItems.forEach((button, index) => {
        button.onclick = () => index == 0 ? showAddShoppingBasket(menu) : cancelModal();
    });
}

function showAddShoppingBasket(menu) {
    alert(menu.id);
}

function cancelModal() {
    modalBody.classList.add("visible");
}

function removeMenuObjectInLocalStorage() {
    localStorage.removeItem("size");
    localStorage.removeItem("menuObject");
    localStorage.removeItem("sideMenuObject");
    localStorage.removeItem("drinkMenuObject");
    localStorage.removeItem("burgerSet");
}