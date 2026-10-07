// Task 10
function getAllBooks() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

public_users.get('/', function (req, res) {
  getAllBooks().then((bks) => res.send(JSON.stringify(bks, null, 4)));
}); 

// Task 11: Поиск книги по ISBN с использованием Promise
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  const getBookByIsbn = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  });

  getBookByIsbn
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(404).json({ message: err }));
});


// Task 12: Поиск книг по автору с использованием Promise
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  const getBooksByAuthor = new Promise((resolve, reject) => {
    let filteredBooks = [];
    for (let key in books) {
      if (books[key].author === author) {
        filteredBooks.push({
          isbn: key,
          title: books[key].title,
          reviews: books[key].reviews
        });
      }
    }
    if (filteredBooks.length > 0) {
      resolve({ booksbyauthor: filteredBooks });
    } else {
      reject("No books found for this author");
    }
  });

  getBooksByAuthor
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(404).json({ message: err }));
});


// Task 13: Поиск книг по названию с использованием Promise
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;

  const getBooksByTitle = new Promise((resolve, reject) => {
    let filteredBooks = [];
    for (let key in books) {
      if (books[key].title === title) {
        filteredBooks.push({
          isbn: key,
          author: books[key].author,
          reviews: books[key].reviews
        });
      }
    }
    if (filteredBooks.length > 0) {
      resolve({ booksbytitle: filteredBooks });
    } else {
      reject("No books found with this title");
    }
  });

  getBooksByTitle
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(404).json({ message: err }));
});