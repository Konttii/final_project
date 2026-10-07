// Task 10: Получение всех книг с помощью Axios (Promise)
public_users.get('/',function (req, res) {
  const get_books = new Promise((resolve, reject) => {
      resolve(books);
  });
  get_books.then((books) => res.send(JSON.stringify(books, null, 4)));
});

// Task 11: Поиск по ISBN с использованием Axios
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
      if (books[isbn]) {
          resolve(books[isbn]);
      } else {
          reject({message: "Book not found"});
      }
  })
  .then((result) => res.send(result))
  .catch((error) => res.status(404).send(error));
});

// Task 12: Поиск по автору с использованием Axios / async-await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
      let filtered_books = [];
      for (let isbn in books) {
          if (books[isbn].author === author) {
              filtered_books.push({
                  isbn: isbn,
                  title: books[isbn].title,
                  reviews: books[isbn].reviews
              });
          }
      }
      res.send(JSON.stringify({booksbyauthor: filtered_books}, null, 4));
  } catch (error) {
      res.status(404).send({message: "Error fetching books by author"});
  }
});

// Task 13: Поиск по названию с использованием Axios / async-await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
      let filtered_books = [];
      for (let isbn in books) {
          if (books[isbn].title === title) {
              filtered_books.push({
                  isbn: isbn,
                  author: books[isbn].author,
                  reviews: books[isbn].reviews
              });
          }
      }
      res.send(JSON.stringify({booksbytitle: filtered_books}, null, 4));
  } catch (error) {
      res.status(404).send({message: "Error fetching books by title"});
  }
});