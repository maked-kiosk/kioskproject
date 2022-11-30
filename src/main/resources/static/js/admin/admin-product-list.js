let nowPage = 1;
const productSelect = document.querySelector(".product-input");
let fileInput = document.querySelectorAll(".file-input");



getMenuList(nowPage);
setProductSelectChangeEvent();



function getMenuList(nowPage) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/menu/menu/list`,
        data: {
            "page" : nowPage,
            "menuType": getMenuType()
        },
        dataType: "json",
        success: (response) => {
            getList(response.data);
            if(response.data != null) {
                menuPageNumber(response.data[0].totalCount)
                setMenuDetailButtonClickEvent();
            }else {
                menuPageNumber(0);
            }
        },
        error: (error) => {
            console.log(error);
        }
    });
}

function getList(list) {
    const tbody = document.querySelector(".list-body");
    tbody.innerHTML = "";
    list.forEach((menu, index) => {
        if(index == 0) {
            return;
        }
        
        tbody.innerHTML += `
        <tr>
            <th>
                ${menu.menuCategoryName}
                <input type="hidden" class="menu-code" value="${menu.id}">
                <input type="hidden" class="menu-type" value="${menu.menuCategoryName}">
            </th>
            <th>${menu.name}</th>
            <th>${menu.price}</th>
            <th>${menu.size}</th>
            <td><button type="button" class="list-button detail-button"><i class="fa-regular fa-file-lines"></i></button></td>
            <td><button type="button" class="list-button delete-button"><i class="fa-regular fa-trash-can"></i></button></td>
        </tr>
        <tr class="menu-detail visible">
            <td colspan="8">
                <table class="product-info">
                    <tr>
                        <td>
                            <select class="product-input product-type">
                                <option value="burger">햄버거</option>
                                <option value="side">사이드</option>
                                <option value="drink">음류수</option>
                                <option value="dessert">디저트</option>
                            </select>
                        </td>
                        <td><input type="text" class="product-input" value="${menu.name}" placeholder="이름"></td>
                        <td><input type="text" class="product-input" value="${menu.price}" placeholder="가격"></td>
                        <td><input type="text" class="product-input" value="${menu.kcal}" placeholder="칼로리"></td>
                        <td><input type="text" class="product-input" value="${menu.size}" placeholder="사이즈"></td>
                    </tr>
                    <tr>
                        <td>
                            ${menu.menuCategoryName == `burger` ? 
                            `<span class="mc-lunch-flag-check mc-lunch-flag-visible">
                                <input type="checkbox" name="radio-check" class="product-input mc-lunch-flag" ${menu.mc_lunch_flag ? `checked`:``}>맥런치
                            </span>
                            <span class="only-mc-morning-check only-mc-morning-visible">
                                <input type="checkbox" name="radio-check" class="product-input only-mc-morning" ${menu.hamburger_mc_morning_flag ? `checked`:``}>맥모닝
                            </span>` : ``}

                            ${menu.menuCategoryName == `side` ? 
                            `<span class="only-mc-morning-check only-mc-morning-visible">
                                <input type="checkbox" name="radio-check" class="product-input only-mc-morning" ${menu.only_mc_morning_flag ? `checked`:``}>맥모닝
                            </span>
                            <span class="set-menu-flag-check set-menu-flag-visible">
                                <input type="checkbox" name="radio-check" class="product-input set-menu-flag" ${menu.set_menu_flag ? `checked`:``}>세트메뉴
                            </span>` : ``}

                            ${menu.menuCategoryName == `drink` ? 
                            `<span class="only-mc-morning-check only-mc-morning-visible">
                                <input type="checkbox" name="radio-check" class="product-input only-mc-morning" ${menu.only_mc_morning_flag ? `checked`:``}>맥모닝
                            </span>
                            <span class="set-menu-flag-check set-menu-flag-visible">
                                <input type="checkbox" name="radio-check" class="product-inputset-menu-flag" ${menu.set_menu_flag ? `checked`:``}>세트메뉴
                            </span>` : ``}

                            ${menu.menuCategoryName == `dessert` ? 
                            `<span class="only-mc-morning-check only-mc-morning-visible">
                                <input type="checkbox" name="radio-check" class="product-input only-mc-morning" ${menu.only_mc_morning_flag ? `checked`:``}>맥모닝
                            </span>` : ``}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <form enctype="multipart/form-data">
                                <div class="product-img-inputs">
                                    <label>상품 이미지</label>
                                    <button type="button" class="add-button">추가</button>
                                    <input type="file" class="file-input product-invisible" name="file" >
                                </div>
                            </form>
                            <div class="product-images">

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <button type="button" class="update-button">수정하기</button>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        `;
        console.log(menu)
        
    })
    
}

function getMenuType() {
    return productSelect.value;
}


function menuPageNumber(totalMenuCount) {
	const pageBtn = document.querySelector(".page-btn-box");
	const totalPageCount = totalMenuCount % 10 == 0 ? totalMenuCount / 10 : (totalMenuCount / 10) + 1;
	const startIndex = nowPage % 5 == 0 ? nowPage - 4 : nowPage - (nowPage % 5) + 1;
	const endIndex = startIndex + 4 <= totalPageCount ? startIndex + 4 : totalPageCount;
	
	pageBtn.innerHTML = ``;
	
	if(startIndex != 0) {
		pageBtn.innerHTML += `
			<button type="button" class="page-button pre">&lt;</button>
		`;
	}
	
	for(let i = startIndex; i <= endIndex; i++) {
		pageBtn.innerHTML += `
			<button type="button" class="page-button">${i}</button>
		`
	}
	
	if(endIndex != totalMenuCount) {
		pageBtn.innerHTML += `
			<button type="button" class="page-button next">&gt;</button>
		`;
	}
	
	if(startIndex != 1) {
		const prePageButton = document.querySelector(".pre");
		prePageButton.onclick = () => {
			nowPage = startIndex - 1;
			getMenuList(nowPage);
		}
	}
	
	if(endIndex != totalMenuCount) {
		const nextPageButton = document.querySelector(".next");
		nextPageButton.onclick = () => {
			nowPage = endIndex + 1;
			getMenuList(nowPage);
		}
	}
	
	const pageNumberButtons = document.querySelectorAll(".page-button");
	pageNumberButtons.forEach(button => {
		if(button.textContent != "<" && button.textContent != ">"){
			button.onclick = () => {
				nowPage = button.textContent;
				getMenuList(nowPage);
			}
		}
	})
}

function setProductSelectChangeEvent() {
    productSelect.onchange = () => getMenuList(1);
}

function menuType() {
    const menuType = document.querySelector(".menu-type");
    return menuType.value;
} 

function setMenuDetailButtonClickEvent() {
    const menuDetailButton = document.querySelectorAll(".detail-button");

    for(let i = 0; i < menuDetailButton.length; i++) {

        menuDetailButton[i].onclick = () =>  {
            const menuCode = document.querySelectorAll(".menu-code");
            let fileInput = document.querySelectorAll(".file-input");
            
            $.ajax({
                async: false,
                type: "get",
                url: `/api/v1/menu/details`,
                data: {
                    "id" : menuCode[i].value,
                    "menuType": menuType()
                },
                dataType: "json",
                success: (response) => {
                    console.log(response.data)
                    getMenuDetails(response.data[0].img, menuCode[i].value, i);
                },
                error: (error) => {
                    console.log(error);
                }
            });

            const menuDetails = document.querySelectorAll(".menu-detail");


            if(menuDetails[i].classList.contains("visible")){
                menuDetails.forEach(menuDetail => menuDetail.classList.add("visible"));
                menuDetails[i].classList.remove("visible");
            }else {
                confirm("수정을 취소하시겠습니까?")
                menuDetails[i].classList.add("visible");
            }
	    }
    }

}

function getMenuDetails(img, code, index) {
    const productImages = document.querySelectorAll(".product-images")[index];
 
    if(img != null) {
        menuImg(img, productImages);
    }
    
    let fileInput = document.querySelectorAll(".file-input");
    const addButton = document.querySelectorAll(".add-button");

    if(productImages.hasChildNodes()) {
        addButton[index].setAttribute("disabled", true);
    }
    addButton[index].onclick = () => {
        addButton[index].removeAttribute("disabled");
        fileInput[index].click();

        fileInput[index].onchange = () => {
            const formData = new FormData(document.querySelectorAll("form")[index]);
            let changeFlge = false;
            let imageValue = null;
        
            formData.forEach((value) => {
                if(value.size != 0) {
                    imageValue = value;
                    changeFlge = true;
                }
            });
            
            if(changeFlge){
                getImagePreview(imageValue, productImages, addButton[index]);
            }
        }
    }

   setImageDeleteButtonClickEvent(addButton[index]);
    const productInput = document.querySelectorAll(".product-input");

    let formData = new FormData();
    
    formData.append("menuType", productInput[0].value);
    formData.append("name", productInput[1].value);
    formData.append("price", productInput[2].value);
    formData.append("kcal", productInput[3].value);
    formData.append("size", productInput[4].value);
    if(menuType() == 'burger') {
        formData.append("mcLunchFlag", productInput[6].checked)
        formData.append("hamburgerMcMorningFlag", productInput[7].checked)
    }else if (menuType() == 'side' || menuType() == 'drink') {
        formData.append("setMenuFlag", productInput[6].checked)
        formData.append("onlyMcMorningFlag", productInput[7].checked)
    }else {
        formData.append("onlyMcMorningFlag", productInput[6].checked)
    }


    const updateButton = document.querySelector(".update-button");

    updateButton.onclick = () => {
       $.ajax({
            async: false,
            type: "put",
            url: `/api/v1/menu/updateMenu`,
            enctype: "multipart/form-data",
            contentType: false,
            processData: false,
            data: formData,
            dataType: "json",
            success: (response) => {
                console.log(response.data)
            },
            error: (error) => {
                console.log(error);
            }
       })
    }

}

function getImagePreview(imageValue, productImages, addButton) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        productImages.innerHTML += `
            <div class="img-box">
                <span class="fa-solid fa-xmark"></span>
                <img class="product-img" src="${e.target.result}">
            </div>
        `;

        addButton.setAttribute("disabled", true);
        setImageDeleteButtonClickEvent(addButton);
        
    }
    setTimeout(() => { reader.readAsDataURL(imageValue)}, 100);
   
}

function menuImg(img, productImages) {
    productImages.innerHTML = "";

    productImages.innerHTML += `
    <div class="img-box">
        <span class="fa-solid fa-xmark"></span>
        <img class="product-img" src="/static/images/${menuType()}/${img}">
    </div>
`;
}

function setImageDeleteButtonClickEvent(addButton) {
    const deleteButton = document.querySelectorAll(".fa-xmark");
    for(let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].onclick = (e) => {
            if(confirm("상품 이미지를 지우시겠습니까?")) {
                e.target.parentNode.parentNode.innerHTML = "";
                addButton.removeAttribute("disabled");
            }
        }
    }
}




    

   
