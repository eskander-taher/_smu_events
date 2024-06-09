const express = require("express");
const cors = require("cors");
const path = require("path")
const env = require("dotenv").config();
const colors = require("colors")
const port = process.env.PORT || 5000;


// Express app initailization
const app = express();

//connect db
const connectDB = require("./config/connectDB")
connectDB(process.env.MONGO_DATABASE_URL)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/dist", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/uploads", authMiddleware, express.static("uploads"));

const logger = require("./middleware/logger");
app.use(logger);

// resources routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/eventRoutes"));
app.use("/api", require("./routes/submissionRoutes"));
app.use("/api", require("./routes/newsRoutes"));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "../client/dist/index.html"));
// });

// Middleware setup: Formating responding errors
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));

