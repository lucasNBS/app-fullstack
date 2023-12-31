require("dotenv").config()
import express, { Request, Response } from "express"
import mongoose from "mongoose"
import { bookRouter } from "./routes/booksRoute"

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

// Server routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server")
})
app.use("/book", bookRouter)

// Initialize server
app.listen("8000", () => {
  console.log("Server is running")
})