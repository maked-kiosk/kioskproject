const foodMenus = document.querySelectorAll('.food-menus');     // 메뉴 리스트
const navBtnsList = document.querySelectorAll('nav > ul > li'); // 메뉴 버튼
const foodType = document.querySelectorAll('food-type li'); 
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
    let n = 0;//현재 클릭된 버튼에 인덱스값이 초기값설정
    navBtnsList[i].index = i;//메뉴의 인덱스 값을 미리 설정

    navBtnsList[i].onclick = (e) => {
        e.preventDefault();//a태그의 이벤트 상실
        n = e.currentTarget.index; //==$(this).index(); 0 1 2 3 4 5                 
        //e.target //자식요소에 이벤트를 적용하는 대상
        //e.currentTarget//부모요소 이벤트 적용하는 대상


        for (let j = 0; j < navBtnsList.length; j++) {
            //클릭된 버튼을 비교하고 스타일을 설정하기 위한 반복문
            if (j == n) {
                foodMenus[j].style.display = 'block';
            } else {
                foodMenus[j].style.display = 'none';
            }
        }
    }
}


for(let i = 0; i < foodType.length; i++) {
    foodType[i].onclick = (act) => {
        function act() {
            for(let j = 0; j < foodType.length; j++) {
                foodType[j].removeAttribute('class', 'active');
            }
            this.setAttribute('class', 'active');
        }
    }
}


class MenuLoader {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MenuLoader();
        }

        return this.#instance;
    }

    getTopRankingMenuLoad() {
        $.ajax({
            async: false,
            type: "get",
            url: ``,
            dataType: "json",
            success: (response) => {
                this.setDataList(response.data, true)
            },
            error: this.errorMessage
        })
    }

    setDataList(dataList, rankingDataFlag) {
        if(rankingDataFlag) {
            
        }
    }

    errorMessage(request, status, error){
        alert("에러");
        console.log(request.status);
        console.log(request.responseText);
        console.log(error);
    }
}
