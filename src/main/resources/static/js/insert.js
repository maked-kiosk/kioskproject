const orderBtn = document.querySelector(".order-btn");

localStorage.clear();

orderBtn.onclick = () => {
    location.href = "/member-ship"
}