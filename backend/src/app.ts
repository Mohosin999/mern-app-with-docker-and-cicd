import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import Article from "./models/Article";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Your API is running");
});

app.post("/articles", async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const article = await Article.create({ title, content });

    res.status(201).json({
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default app;
