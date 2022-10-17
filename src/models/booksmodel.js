const { parse } = require("csv-parse");
const fs = require("fs");

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

module.exports = {
  findBook,
};