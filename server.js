const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
