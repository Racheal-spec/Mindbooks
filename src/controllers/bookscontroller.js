const { findBook } = require("../models/booksmodel");

async function getBooks(req, res) {
  try {
    const results = await findBook();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(results));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getBooks,
};
