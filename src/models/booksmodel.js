const { parse } = require("csv-parse");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../services");
const path = require("path");

function booksWithRatings(books) {
  return (
    books["characters"] !== "[]" &&
    books["setting"] !== "[]" &&
    books["rating"] > "4.40" &&
    books["awards"] !== "[]" &&
    books["language"] === "English"
  );
}
let results = [];
const csvpath = path.join(__dirname, "data", "book_data.csv");

fs.createReadStream(csvpath)
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
    writeDataToFile(csvpath, results);
    resolve(createNewBook);
  });
}

function update(id, book) {
  return new Promise((resolve, reject) => {
    const index = results.findIndex((p) => p.bookId === id);
    results[index] = { id, ...book };
    writeDataToFile(csvpath, results);
    resolve(results[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    let removedresult = results.filter((p) => p.bookId !== id);
    writeDataToFile(csvpath, removedresult);
    resolve();
  });
}

module.exports = {
  findBook,
  findBookById,
  create,
  update,
  remove,
};
