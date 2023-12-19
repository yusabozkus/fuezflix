// Open Search Input

let searchButton = document.getElementById("searchButton")
let header = document.getElementById("header")

searchButton.addEventListener("click", () => {
    header.classList.toggle("show-search")
})