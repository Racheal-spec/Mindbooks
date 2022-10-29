// const { results } = require("../data");
const {
  findBook,
  findBookById,
  create,
  update,
  remove,
} = require("../models/booksmodel");
const { getBookUtil } = require("../services");
async function getBooks(req, res) {
  try {
    const results = await findBook();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  } catch (error) {
    console.log(error);
  }
}

async function getOneBook(req, res, id) {
  try {
    const result = await findBookById(id);
    if (!result) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createNewBooks(req, res) {
  try {
    let body = await getBookUtil(req);
    const { title, series, author, rating, description } = JSON.parse(body);
    const book = {
      title,
      series,
      author,
      rating,
      description,
    };
    const newBook = await create(book);

    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(newBook));
  } catch (error) {
    console.log(error);
  }
}

async function updateBook(req, res, id) {
  try {
    let book = await findBookById(id);
    if (!book) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book not found" }));
    } else {
      let body = await getBookUtil(req);
      const { title, series, author, rating, description } = JSON.parse(body);
      const bookData = {
        title: title || body.title,
        series: series || body.series,
        author: author || body.author,
        rating: rating || body.rating,
        description: description || body.description,
      };
      const updatedBook = await update(id, bookData);

      res.writeHead(200, { "Content-Type": "application/json" });

      return res.end(JSON.stringify(updatedBook));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteBook(req, res, id) {
  try {
    const result = await findBookById(id);
    if (!result) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book not found" }));
    } else {
      await remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `Book with the ID: ${id} has been removed` })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getBooks,
  getOneBook,
  createNewBooks,
  updateBook,
  deleteBook,
};
