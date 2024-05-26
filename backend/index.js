const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db.config.js");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT;

db.connectDB();

const booksRoutes = require("./routes/BookRoute");
const userRoutes = require("./routes/UserRoute");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/book", booksRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
