
const submitButton = document.querySelector(".submit-button");
const addButton = document.querySelector(".add-button");
const fileInput = document.querySelector(".file-input");

let productImageFiles = new Array();

burgerTypeInput();

function burgerTypeInput() {
    const productType = document.querySelector(".product-type");
    const burgerType = document.querySelector(".burger-type");

    productType.onclick = () => {
        if(productType.value == "burger") {
            burgerType.classList.remove("burger-visible");
        } else {
            burgerType.classList.add("burger-visible");
        }
    }
}

addButton.onclick = () => {
    fileInput.click();
}

fileInput.onchange = () => {
    const formData = new FormData(document.querySelector("form"));
    let changeFlge = false;

    formData.forEach((value) => {
        if(value.size != 0) {
            productImageFiles.push(value);
            changeFlge = true;
        }
    });
    
    if(changeFlge){
        getImagePreview();
        fileInput.value = null;
    }
}

function getImagePreview() {
    const productImages = document.querySelector(".product-images");

    productImages.innerHTML = "";

    productImageFiles.forEach((file, i) => {
        const reader = new FileReader();
    
        reader.onload = (e) => {
            productImages.innerHTML += `
                <div class="img-box">
                    <span class="fa-solid fa-xmark"></span>
                    <img class="product-img" src="${e.target.result}">
                </div>
            `;

            const deleteButton = document.querySelectorAll(".fa-xmark");
            deleteButton.forEach((xbutton, index) => {
                xbutton.onclick = () => {
                    if(confirm("상품 이미지를 지우시겠습니까?")) {
                        productImageFiles.splice(index, 1);
                        console.log(productImageFiles);
                        getImagePreview();
                    }
                };
            })
        }
        setTimeout(() => {reader.readAsDataURL(file)}, i * 100);
    });
}

submitButton.onclick = () => {
    const productInput = document.querySelectorAll(".product-input");

    let formData = new FormData();

    formData.append("product-type", productInput[0].value);
    if(productInput[0].value == "burger") {
        formData.append(" burger-type", productInput[1].value);
    }
    formData.append("name", productInput[2].value);
    formData.append("price", productInput[3].value);
    formData.append("kcal", productInput[4].value);
        

    productImageFiles.forEach((file) => {
        formData.append("files", file);
    });

    
    for (var item of formData.entries()) {
        console.log(item[0] + " : " + item[1]);
    }
    
    // console.log(formData);
    // add(formData);
}

// function add(formData) {
//     $.ajax({
//         async: false,
//         type: "post",
//         url: "",
//         enctype: "multipart/form-data",
//         contentType: false,
//         processData: false,
//         data: formData,
//         dataType: "json",
//         success: (response) => {
//             alert("상품 등록 완료");
//             console.log(response.data);
//         },
//         error: (error) => {
//             alert("상품 등록 실패");
//             console.log(error);
//         }
//     });
// }


