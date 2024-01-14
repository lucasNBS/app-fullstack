import express, { Request, Response } from "express"
import bookModel from "../models/bookModel"
import multer from "multer"
import path from "path"
import fs from "fs"

// Initialize route
const router = express.Router()
const upload = multer({ dest: "uploads/" })

// Get all books
router.get("/all", async (req: Request, res: Response) => {
  const books = await bookModel.find()
  res.send(JSON.stringify(books))
})

// Create book
router.post("/create", upload.single("coverImage"), async (req: Request, res: Response) => {
  const { title, description, publishedDate, author } = req.body
  const coverImage = req.file?.originalname

  const imageURL = `http://localhost:8000/${req.file?.originalname}`
  const formatedDate = publishedDate.replaceAll("-", "/")

  const tempPath = req.file?.path
  const targetPath = path.join(__dirname, `../../uploads/${coverImage}`)

  if (tempPath) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return res.status(500)
    })
  }

  const book = new bookModel({
    title,
    description,
    coverImage: imageURL,
    publishedDate: formatedDate,
    author
  })

  try {
    await book.save()
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

// Update book
router.put("/edit/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params
  const { title, description, coverImage, publishedDate, author } = req.body

  const book = await bookModel.findOne({ slug })

  try {
    if (!book) throw Error("Book not found")

    if (title) book.title = title
    if (description) book.description = description
    if (coverImage) book.coverImage = coverImage
    if (publishedDate) book.publishedDate = publishedDate
    if (author) book.author = author

    await book.save()
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

// Delete book
router.delete("/delete/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params

  try {
    await bookModel.findOneAndDelete({ slug })
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

// Get a book
router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params

  try {
    const book = await bookModel.findOne({ slug })

    res.send(JSON.stringify(book))
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

export const bookRouter = router