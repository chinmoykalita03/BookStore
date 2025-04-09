const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const auth = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(auth); // Protect all routes

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
