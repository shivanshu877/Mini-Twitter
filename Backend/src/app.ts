import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import followRoutes from "./routes/followRoutes";
import morgan from "morgan";
import cors from "cors";
const app = express();
const router = express.Router();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  return res.send("Hello World!");
});
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
app.use("/api/follow", followRoutes);
export default app;
