const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
};

exports.getBooks = async (req, res) => {
  const { author, category, rating, title, sort, page = 1, limit = 5 } = req.query;

  let query = {};

  if (author) query.author = author;
  if (category) query.category = category;
  if (rating) query.rating = { $gte: Number(rating) };
  if (title) query.title = { $regex: title, $options: "i" };

  let booksQuery = Book.find(query);

  // Sorting
  if (sort === "price" || sort === "rating") {
    booksQuery = booksQuery.sort({ [sort]: 1 });
  }

  // Pagination
  const skip = (page - 1) * limit;
  booksQuery = booksQuery.skip(skip).limit(Number(limit));

  const books = await booksQuery;
  res.json(books);
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json(book);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json(book);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Book deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
