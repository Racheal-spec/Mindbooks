// const { results } = require("../data");
const { findBook, findBookById, create } = require("../models/booksmodel");

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
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
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
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBooks,
  getOneBook,
  createNewBooks,
};
