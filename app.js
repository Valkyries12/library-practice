const btnSubmit = document.querySelector(".btn-submit");
const sectionBooks = document.querySelector(".section-books");
const inputPages = document.querySelector("#pages");

let myLibrary;

if(window.localStorage.length == 0) {
    localStorage.setItem("myLibrary", JSON.stringify([]));
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
} else {
    drawBook(JSON.parse(localStorage.getItem("myLibrary")));
};



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
    if(e.target.classList.contains("btn-submit")) {
        modal.classList.toggle("hide");
        overlay.classList.toggle("hide");
    };
};

const addToLibrary = (e, newBook, library) => {
    e.preventDefault();
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    if(title.value == "" || author.value == "" || pages.value == "") {
        return
    };
    const localStLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    localStLibrary.push(newBook);
    localStorage.setItem("myLibrary", JSON.stringify(localStLibrary));
    cleanForm();
    cleanBooks();
    drawBook(localStLibrary);
};

const removeFromLibrary = (e, library) => {
    if(e.target.classList.contains("card-remove")) {
        const index = parseInt(e.target.parentElement.attributes["data-index"].value);
        for(let i = 0; i < library.length; i++ ) {
            if(library[i] === library[index]) {
                library.splice(i, 1);
            }
        };
        cleanBooks();
        localStorage.setItem("myLibrary", JSON.stringify(library));
        drawBook(JSON.parse(localStorage.getItem("myLibrary")));
    };
};

const createBook = () => {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#readIt").checked;

    const book = new Book(title, author, pages, isRead);
    return book
};

const cleanForm = () => {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    title.value = "";
    author.value = "";
    pages.value = "";
};

const cleanBooks = () => {
    const sectionBooks = document.querySelector(".section-books");
    sectionBooks.innerHTML = "";
};

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

};

function drawBook(library) {
    library.map((book, index) => {
        const card = `<div data-index=${index} id="${index}" class="card">
                    <p class="card-title">"${book.title}"</p>
                    <p class="card-author">${book.author}</p>
                    <p class="card-pages">${book.pages}</p>
                    <button class="card-isRead btn">${book.isRead ? "Read" : "Not read"}</button>
                    <button class="card-remove btn">Remove</button>
                </div>`;
        const sectionBooks = document.querySelector(".section-books");
        sectionBooks.innerHTML += card;
        const buttonIsRead = document.getElementById(`${index}`).querySelector(".card-isRead");
        if(book.isRead) {
            buttonIsRead.classList.toggle("isread");
        };
    });
};

const toggleIsRead = (e, library) => {
    if(e.target.classList.contains("card-isRead")) {
        const index = e.target.parentElement.id;
        const book = library[index];
        book["isRead"] = book.isRead ? false : true;
        localStorage.setItem("myLibrary", JSON.stringify(library));
    };
    cleanBooks();
    drawBook(library);
};

const isNum = (e) => {
    if(e.target.id == "pages") {
        const isnum = /^\d+$/.test(e.target.value);
        let val = e.target.value.replace(/[^\d]/g, '');;
        e.target.value = val;
    };
     
};



window.addEventListener("click", (e) => {togglePopup(e)});
btnSubmit.addEventListener("click", function(e) { addToLibrary(e, createBook(), JSON.parse(localStorage.getItem("myLibrary")))});
sectionBooks.addEventListener("click", function(e) { removeFromLibrary(e, JSON.parse(localStorage.getItem("myLibrary"))) });
sectionBooks.addEventListener("click", function(e) { toggleIsRead(e, JSON.parse(localStorage.getItem("myLibrary"))) });
inputPages.addEventListener("keydown", function(e) { isNum(e) });
inputPages.addEventListener("keyup", function(e) { isNum(e) });

