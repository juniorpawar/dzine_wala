const hamburgerBtn = document.querySelector("#hamburger")
const mobileMenu = document.querySelector("#mobileMenu")
hamburgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle("hidden")
})