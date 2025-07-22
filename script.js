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

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const book2 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, true);
const book3 = new Book("The Silmarillion", "J.R.R. Tolkien", 365, false);

console.log(book1.info());
console.log(book2.info());
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function displayBooks(library) {
  library.forEach((book) => console.log(book.info()));
}

displayBooks(myLibrary);

const booksDisplay = document.getElementById("books-display");
for (const book of myLibrary) {
  const bookElement = document.createElement("div");
  bookElement.textContent = book.info();
  booksDisplay.appendChild(bookElement);
}
