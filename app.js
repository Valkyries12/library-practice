const btnSubmit = document.querySelector(".btn-submit");
const sectionBooks = document.querySelector(".section-books");
const myLibrary = [];


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
    myLibrary.push(newBook);
    cleanForm();
    drawBook(library);
};

const removeFromLibrary = (e, library) => {
    if(e.target.classList.contains("card-remove")) {
        const index = parseInt(e.target.parentElement.attributes["data-index"].value);
        console.log(index)
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
    //const isRead = document.querySelector("#readIt").checked;
    title.value = "";
    author.value = "";
    pages.value = "";
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

};

const drawBook = (library) => {
    library.map(book => {
        const card = `<div data-index=${library.length-1} class="card">
                    <p class="card-title">${book.title}</p>
                    <p class="card-author">${book.author}</p>
                    <p class="card-pages">${book.pages}</p>
                    <button class="card-isRead btn">${book.isRead ? "Read" : "Not read"}</button>
                    <button class="card-remove btn">Remove</button>
                </div>`;
        const sectionBooks = document.querySelector(".section-books");
        sectionBooks.innerHTML += card;
    });
    
};

//btnAdd.addEventListener("click", togglePopup);
window.addEventListener("click", (e) => {togglePopup(e)});
btnSubmit.addEventListener("click", function(e) { addToLibrary(e, createBook(), myLibrary)});
sectionBooks.addEventListener("click", function(e) { removeFromLibrary(e, myLibrary) })


