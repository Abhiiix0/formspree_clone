import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
// app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.use(express.json());
app.use(cookieParser());
const port = 8080;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello, World!",
  });
});

app.use("/api", router);
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
