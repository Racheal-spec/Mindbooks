const http = require("http");
const {
  getBooks,
  getOneBook,
  createNewBooks,
  updateBook,
  deleteBook,
} = require("./controllers/bookscontroller");

const server = http.createServer((req, res) => {
  if (req.url === "/api/allbooks" && req.method === "GET") {
    getBooks(req, res);
  } else if (
    req.url.match(/\/api\/allbooks\/([0-9])/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getOneBook(req, res, id);
  } else if (req.url === "/api/allbooks" && req.method === "POST") {
    createNewBooks(req, res);
  } else if (
    req.url.match(/\/api\/allbooks\/([0-9])/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateBook(req, res, id);
  } else if (
    req.url.match(/\/api\/allbooks\/([0-9])/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteBook(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
