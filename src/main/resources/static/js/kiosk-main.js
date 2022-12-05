const foodMenus = document.querySelectorAll('.food-menus');     // 메뉴 리스트
const navBtnsList = document.querySelectorAll('nav > ul > li'); // 메뉴 버튼
const foodType = document.querySelectorAll('.food-type li'); 
const learnMenuBtnsList = document.querySelectorAll('.learn-menu-btns-list li');

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

setSelectBurgerTypeEvent();

//버거 메뉴 
function getMenuList(selectValue, index) {
    let menuType = setMenuTypeBySelectMenuType(selectValue);

    let url = selectValue == "버거" ? `api/v1/menu/burger/list` : `api/v1/menu/${menuType}/list?mcMorning=false`

    console.log(url);
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

    }

    return menuType;
}



function setList(list, index, menuType){
    const menuButton = document.querySelectorAll(".food-menu-btns");

    menuButton.forEach(menuUl => menuUl.innerHTML = "");

    list.forEach(menu => {
        menuButton[index].innerHTML += `
            <li>
                <div class="food-menu-img">
                    <img src="/static/images/${menuType}/${menu.image}">
                </div>
                <div>
                    <p>${menu.menuName}</p>
                    <div class="food-menu-price">
                    <p><span>₩</span>${menu.price}</p>
                    <p>${menu.kcal}<span>Kcal</span></p>
                    </div>
                </div>
            </li>
        `
    });
}