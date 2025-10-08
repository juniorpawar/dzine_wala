window.addEventListener('load', () => {
    const preloader = document.querySelector("#preloader");
    const text = ["Designing something cool...", "Adding final touches...", "Almost ready to impress!"];
    const textEl = document.getElementById("loaderText");
    let i = 0;

    function changeText() {
        textEl.textContent = text[i];
        i = (i + 1) % text.length;
    }

    changeText();
    setInterval(changeText, 1500); // change every 1.5s

    setInterval(() => {
        preloader.classList.add("opacity-0", "transition-opacity", "duration-700")
    }, 1000)
    setInterval(() => {
        preloader.classList.add('hidden')
    }, 1000)
})