window.onload = () => {
    MenuSetter.getInstance();
    ButtonClickEventSetter.getInstance();
}

class MenuSetter {
    static #instance = null;

    menuObject = null;
    sideMenuObject = null;
    drinkMenuObject = null;

    menuType = null;
    mainMenuModalView = null;

    totalPrice = 0;
    totalKcal = 0;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MenuSetter();
        }

        return this.#instance;
    }

    constructor() {
        this.menuObject = JSON.parse(localStorage.menuObject);
        this.sideMenuObject = JSON.parse(localStorage.sideMenuObject);
        this.drinkMenuObject = JSON.parse(localStorage.drinkMenuObject);
        this.setTotalPriceAndTotalKcal();
        this.setSetMenuInformation();
    }

    setTotalPriceAndTotalKcal() {
        this.totalPrice = this.menuObject.price + this.sideMenuObject.price + this.drinkMenuObject.price;
        this.totalKcal = this.menuObject.kcal + this.sideMenuObject.kcal + this.drinkMenuObject.kcal;

    }

    setSetMenuInformation() {
        const menuInformationTitleDiv = document.querySelector(".menu-information-div");
        const selectMenuImageDiv = document.querySelector(".select-menu-image-div");
        const burgerDetailDiv = document.querySelector(".burger-detail-div");
        const sideDetailDiv = document.querySelector(".side-detail-div");
        const drinkDetailDiv = document.querySelector(".drink-detail-div");

        const burgerImage = this.menuObject.image;
        const sideMenuImage = this.sideMenuObject.image;
        const drinkMenuImage = this.drinkMenuObject.image;

        const burgerSrc = `/image/images/burger/${burgerImage}`;
        const sideSrc = `/image/images/side/${sideMenuImage}`;
        const drinkSrc = `/image/images/drink/${drinkMenuImage}`;

        const burgerAlt = `${burgerImage.substring(burgerImage.lastIndexOf("_") + 1, burgerImage.lastIndexOf("."))}`;
        const sideAlt = `${sideMenuImage.substring(sideMenuImage.lastIndexOf("_") + 1, sideMenuImage.lastIndexOf("."))}`;
        const drinkAlt = `${drinkMenuImage.substring(drinkMenuImage.lastIndexOf("_") + 1, drinkMenuImage.lastIndexOf("."))}`;

        menuInformationTitleDiv.innerHTML = `
            <p>${this.menuObject.menuName} 세트</p>
            <p>￦<span class="price-span">${this.totalPrice}</span><span class="kcal-span">${this.totalKcal} Kcal</span></p>
                
        `;

        selectMenuImageDiv.innerHTML = `
            <div class="set-menu-image">
                <img src="${sideSrc}" alt="${sideAlt}">
                <img src="${drinkSrc}" alt="${drinkAlt}">
            </div>
            <div class="menu-image">
                <img src="${burgerSrc}" alt="${burgerAlt}">
            </div>
        `;

        burgerDetailDiv.innerHTML = `
            <div class="modify-menu-detail-div">
                <span class="detail-name-span">${this.menuObject.menuName}</span>
                <span class="detail-kcal-span">${this.menuObject.kcal} Kcal</span>
            </div>
            <img src="${burgerSrc}" alt="${burgerAlt}">
        
        `;
        sideDetailDiv.innerHTML = `
            <div class="modify-menu-detail-div">
                <span class="detail-name-span">${this.sideMenuObject.menuName}</span>
                <span class="detail-kcal-span">${this.sideMenuObject.kcal} Kcal</span>
            </div>
            <img src="${sideSrc}" alt="${sideAlt}">
        
        `;
        drinkDetailDiv.innerHTML = `
            <div class="modify-menu-detail-div">
                <span class="detail-name-span">${this.drinkMenuObject.menuName}</span>
                <span class="detail-kcal-span">${this.drinkMenuObject.kcal} Kcal</span>
            </div>
            <img src="${drinkSrc}" alt="${drinkAlt}">
        
        `;

    }

        getAddMenuList(menuType) {
            this.menuType = menuType;

            $.ajax({
                async: false,
                type: "get",
                url: `/api/v1/menu/add/${menuType}/list`,
                dataType: "json",
                success: (response) => {
                    this.setModalData(response.data);
                },
                error: (request, status, error) => {
                    alert("에러");
                    console.log(request.status);
                    console.log(request.responseText);
                    console.log(error);
                }
            })
        }
    
        setModalData(menuList) {
            this.mainMenuModalView = document.querySelector(".main-menu-modal-view");
            const modalMenuUl = document.querySelector(".menu-ul");
    
            this.clearDomObject(modalMenuUl);
            this.mainMenuModalView.classList.remove("visible");
    
            menuList.forEach(menu => {
                modalMenuUl.innerHTML += `
                    <li>
                        <div class="menu-image">
                            <img src="/image/images/${this.menuType}/${menu.image}" alt="${menu.menuName}">
                        </div>
                            <div class="modal-menu-information-div">
                                <p class="menu-name">${menu.menuName}</p>
                                <p>₩ ${menu.price}</p>
                                <p>${menu.kcal} Kcal</p>
                            </div>
                    </li>
                `;
            })
        }
        
        clearDomObject(domObject) {
            domObject.innerHTML = "";
        }
}

class ButtonClickEventSetter {
    static #instance = null;

    menuSetter = null;

    
    amountDetailSpan = null;
    minusButton = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ButtonClickEventSetter();
        }

        return this.#instance;
    }

    constructor() {
        this.amountDetailSpan = document.querySelector(".amount-detail-span");

        this.setPlusButtonClickEvent();
        this.setMinusButtonClickEvent();
        this.setCancelButtonClickEvent();
        this.setLoadMainPageButtonClickEvent();
        this.setMaterialAddOrModifyButtonClickEvent();
        this.modalViewCancelButtonClickEvent();
        this.setShoppingBasketAddButtonClickEvent();
    }

    setPlusButtonClickEvent() {
        const plusButton = document.querySelector(".plus-button");

        plusButton.onclick = () => this.increaseAmount();

    }
    
    setMinusButtonClickEvent() {
        this.minusButton = document.querySelector(".minus-button");

        this.minusButton.onclick = () => this.decreaseAmount();

    }

    increaseAmount() {
        this.amountDetailSpan.textContent = this.getAmount() + 1;
        this.checkToSeeIfTheAmountIsOne();
    }
    
    decreaseAmount() {
        if(this.getAmount() != 1) {
            this.amountDetailSpan.textContent = this.getAmount() - 1;
            this.checkToSeeIfTheAmountIsOne();
        }
    }
    
    getAmount() {
        return parseInt(this.amountDetailSpan.textContent);
    }
    
    checkToSeeIfTheAmountIsOne() {
        if(this.getAmount() == 1) {
            this.minusButtonIsDisabled();
        }else {
            this.minusButtonIsActivated();
        }
    }
    
    minusButtonIsDisabled() {
        this.minusButton.classList.add("disable-amount-button")
    }
    
    minusButtonIsActivated() {
        this.minusButton.classList.remove("disable-amount-button")
    }

    setCancelButtonClickEvent() {
        const cancelButton = document.querySelector(".cancel-button");
        cancelButton.onclick = () => location.replace("/kiosk-main");
    }
    
    setLoadMainPageButtonClickEvent() {
        const loadMainPageButton = document.querySelector(".load-main-page-button");

        loadMainPageButton.onclick = () => location.replace("/kiosk-main");
    }

    setMaterialAddOrModifyButtonClickEvent() {
        const materialAddOrModifyButtonItems = document.querySelectorAll(".material-add-or-modify-button");
        this.menuSetter = MenuSetter.getInstance();

        materialAddOrModifyButtonItems.forEach((button, index) => {
            button.onclick = () => this.menuSetter.getAddMenuList(index == 0 ? "burger" : index == 1 ? "side" : "drink");
        })
    }

    setModifyButtonClickEvent() {
        const modifyButtonItems = document.querySelectorAll(".modify-button");

    }

    modalViewCancelButtonClickEvent() {
        const cancelMark = document.querySelector(".cancel-mark");

        cancelMark.onclick = () => this.menuSetter.mainMenuModalView.classList.add("visible");
    }


    setShoppingBasketAddButtonClickEvent() {
    
    }

}