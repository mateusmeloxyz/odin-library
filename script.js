const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new'operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages} pages, ${this.read ? "read" : "not read yet"}`;
  };
}

function getBookFromLibrary(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  return myLibrary[index];
}

function getBookIndexFromLibrary(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);
  return index;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function deleteBookFromLibrary(bookId) {
  const index = getBookIndexFromLibrary(bookId);
  myLibrary.splice(index, 1);
}

addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, false));
addBookToLibrary(
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, true),
);
addBookToLibrary(new Book("The Silmarillion", "J.R.R. Tolkien", 365, false));

function logBooks(library) {
  library.forEach((book) => console.log(book.info()));
}

logBooks(myLibrary);

const booksDisplay = document.getElementById("books-display");

function refreshBooksDisplay() {
  booksDisplay.innerHTML = "";
  for (const book of myLibrary) {
    const bookElement = document.createElement("div");
    bookElement.textContent = book.info();
    const deleteBookButton = document.createElement("button");
    deleteBookButton.textContent = "🗑️";
    deleteBookButton.setAttribute("id", bookElement.id);
    deleteBookButton.addEventListener("click", (event) => {
      deleteBookFromLibrary(event.target.id);
      refreshBooksDisplay();
    });
    bookElement.appendChild(deleteBookButton);
    booksDisplay.appendChild(bookElement);
  }
}

refreshBooksDisplay();

const addBookModal = document.getElementById("add-book-modal");
const addBookConfirm = document.getElementById("add-book-confirm");
const addBookShowModal = document.getElementById("add-book-show-modal");

addBookShowModal.addEventListener("click", () => {
  addBookModal.showModal();
});

addBookConfirm.addEventListener("click", (event) => {
  event.preventDefault();
  const newBook = new Book(
    event.target.form.elements.title.value,
    event.target.form.elements.author.value,
    event.target.form.elements.pages.value,
    event.target.form.elements.read.checked,
  );
  addBookToLibrary(newBook);
  refreshBooksDisplay();
  addBookModal.close();
});
