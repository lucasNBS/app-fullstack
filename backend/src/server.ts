require("dotenv").config()
import express, { Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import { bookRouter } from "./routes/booksRoute"
import { userRouter } from "./routes/userRoute"

// Config / Connect to DB
mongoose.connect(process.env.DATABASE_URL as string)
const db = mongoose.connection
db.on("error", (err) => console.log(err))
db.once("open", () => console.log("Connected to DB"))

// Instaciate server
const app = express()

// Server middlewares
app.use(express.static("/public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:4173"],
  credentials: true,
}))
app.use(cookieParser())

// Server routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server")
})
app.get("/:slug", (req: Request, res: Response) => {
  const { slug } = req.params

  res.sendFile(path.join(__dirname, `../uploads/${slug}`))
})
app.use("/user", userRouter)
app.use("/book", bookRouter)

// Initialize server
app.listen("8000", () => {
  console.log("Server is running")
})