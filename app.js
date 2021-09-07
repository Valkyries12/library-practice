//const btnAdd = document.querySelector(".btn-add");



const togglePopup = (e) => {
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    if(e.target.classList.contains("btn-add")) {
        modal.classList.toggle("hide");
        overlay.classList.toggle("hide");
    };
    if(e.target.classList.contains("overlay")) {
        modal.classList.toggle("hide");
        overlay.classList.toggle("hide");
    };
    
};


//btnAdd.addEventListener("click", togglePopup);
window.addEventListener("click", (e) => {togglePopup(e)});


