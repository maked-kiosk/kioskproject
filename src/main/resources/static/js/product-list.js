let nowPage = 1;
const productSelect = document.querySelector(".product-input");
let fileInput = document.querySelectorAll(".file-input");

let productImageFiles = new Array();

getMenuList(nowPage);
setProductSelectChangeEvent();



function getMenuList(nowPage) {
    $.ajax({
        async: false,
        type: "get",
        url: `/api/v1/menu/menuList`,
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
                            <select>
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
                        <td colspan="5">
                            <form enctype="multipart/form-data">
                                <div class="product-img-inputs">
                                    <label>상품 이미지</label>
                                    <button type="button" class="add-button">추가</button>
                                    <input type="file" class="file-input product-invisible" name="file">
                                </div>
                            </form>
                            <div class="product-images">

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <button type="button" class="black-button update-button">수정하기</button>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        `;
    })

    console.log(list[1]);
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
        const menuCode = document.querySelector(".menu-code");
        let fileInput = document.querySelectorAll(".file-input");
        const addButton = document.querySelectorAll(".add-button");
       

        $.ajax({
            async: false,
            type: "get",
            url: `/api/v1/menu/details`,
            data: {
                "id" : menuCode.value,
                "menuType": menuType()
            },
            dataType: "json",
            success: (response) => {
                console.log(response.data[0].img)
                getMenuDetails(response.data[0].img, i);
            },
            error: (error) => {
                console.log(error);
            }
        });

        const menuDetails = document.querySelectorAll(".menu-detail");

        // for(let i = 0; i < menuDetails.length; i++) {
            if(menuDetails[i].classList.contains("visible")){
                menuDetails[i].classList.remove("visible");
            }else {
                confirm("수정을 취소하시겠습니까?")
                menuDetails[i].classList.add("visible");
            }
        // }

        // for(let i = 0; i < addButton.length; i++) {
            addButton[i].onclick = () => {
                fileInput[i].click();
            }
        // }
        

	    
        // setTimeout(() => {reader.readAsDataURL(file)}, i * 100);
	}
}

}




        
// fileInput.onchange = () => {
//     const formData = new FormData(document.querySelector("form"));
//     let changeFlge = false;

//     formData.forEach((value) => {
//         if(value.size != 0) {
//             productImageFiles.push(value);
//             changeFlge = true;
//         }
//     });
    
//     if(changeFlge){
//         getImagePreview(img);
//         fileInput.value = null;
//     }
// }


function getMenuDetails(img, index) {
    
    // let menuType = document.querySelector(".menu-type");
    const productImages = document.querySelectorAll(".product-images")[index];
    
    productImages.innerHTML = "";

    productImages.innerHTML += `
        <div class="img-box">
            <span class="fa-solid fa-xmark"></span>
            <img class="product-img" src="/static/images/${menuType()}/${img}">
        </div>
    `;

    const deleteButton = document.querySelector(".fa-xmark");
    deleteButton.onclick = () => {
        if(confirm("상품 이미지를 지우시겠습니까?")) {
                productImageFiles.splice(index, 1);
                console.log(productImageFiles);
            }
     }
    // deleteButton.forEach((xbutton, index) => {
    //     xbutton.onclick = () => {
    //         if(confirm("상품 이미지를 지우시겠습니까?")) {
    //             productImageFiles.splice(index, 1);
    //             console.log(productImageFiles);
    //         }
    //     };
    // })
}




    

   
