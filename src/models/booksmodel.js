const { parse } = require("csv-parse");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../services");

function booksWithRatings(books) {
  return (
    books["characters"] !== "[]" &&
    books["setting"] !== "[]" &&
    books["rating"] > "4.40" &&
    books["awards"] !== "[]" &&
    books["language"] === "English"
  );
}
const results = [];

fs.createReadStream("src/book_data.csv")
  .pipe(
    parse({
      columns: true,
    })
  )
  .on("data", (data) => {
    if (booksWithRatings(data)) {
      results.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
    reject(err);
  })
  .on("end", () => {
    const num = results.length;
    console.log(`Found ${num} best selling books`);
  });

function findBook() {
  return new Promise((resolve, reject) => {
    resolve(results);
  });
}

function findBookById(id) {
  return new Promise((resolve, reject) => {
    const singleResult = results.find((book) => book.bookId === id);
    resolve(singleResult);
  });
}

function create(book) {
  return new Promise((resolve, reject) => {
    const createNewBook = { bookId: uuidv4(), ...book };
    results.push(createNewBook);
    writeDataToFile("./book_data.csv", results);
    resolve(createNewBook);
  });
}

module.exports = {
  findBook,
  findBookById,
  create,
};
