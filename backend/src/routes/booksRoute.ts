import express, { Request, Response } from "express"
import bookModel from "../models/bookModel"
import multer from "multer"
import path from "path"
import fs from "fs"
import { authenticateToken, isAuthor } from "../utils/functions"
import userModel from "../models/userModel"

// Initialize route
const router = express.Router()
const upload = multer({ dest: "uploads/" })

// Get all books
router.get("/all", async (req: Request, res: Response) => {
  const page = Number(req.query.page) ? Number(req.query.page) : 1

  const books = await bookModel.find()

  const pageBooks = books.slice((Number(page) - 1) * 20, Number(page) * 20)

  const maxPageValue = Math.ceil(books.length / 20)

  const prev = page > 1 ? `http://localhost:8000/book/all?page=${page - 1}` : null
  const next = page < maxPageValue ? `http://localhost:8000/book/all?page=${page + 1}` : null

  const objectToSend = {
    prev: prev,
    next: next,
    results: pageBooks
  }

  res.send(JSON.stringify(objectToSend))
})

router.get("/most-liked", async (req: Request, res: Response) => {
  const books = await bookModel.find()

  books.sort((book1, book2) => book2.likedBy.length - book1.likedBy.length)

  res.send(JSON.stringify(books.slice(0, 15)))
})

// Create book
router.post("/create", authenticateToken, upload.single("coverImage"), async (req: Request, res: Response) => {
  const { title, description, publishedDate, author, email } = req.body
  const coverImage = req.file?.originalname

  const imageURL = `http://localhost:8000/${coverImage}`

  const tempPath = req.file?.path
  const targetPath = path.join(__dirname, `../../uploads/${coverImage}`)

  if (tempPath) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return res.status(500)
    })
  }

  const user = await userModel.findOne({ email })

  if (!user) return res.sendStatus(401)

  const book = new bookModel({
    title,
    description,
    coverImage: imageURL,
    publishedDate,
    author,
    postedBy: user._id,
  })

  try {
    await book.save()
    res.sendStatus(201)
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

// Update book
router.put("/edit/:slug", upload.single("coverImage"), isAuthor(), async (req: Request, res: Response) => {
  const { slug } = req.params
  const { title, description, publishedDate, author } = req.body
  const coverImage = req.file?.originalname

  const imageURL = `http://localhost:8000/${coverImage}`

  const tempPath = req.file?.path
  const targetPath = path.join(__dirname, `../../uploads/${coverImage}`)

  if (tempPath) {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return res.status(500)
    })
  }

  const book = await bookModel.findOne({ slug })

  try {
    if (!book) throw Error("Book not found")

    if (title) book.title = title
    if (description) book.description = description
    if (coverImage) book.coverImage = imageURL
    if (publishedDate) book.publishedDate = publishedDate
    if (author) book.author = author

    await book.save()
    res.sendStatus(204)
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

// Delete book
router.delete("/delete/:slug", isAuthor(), async (req: Request, res: Response) => {
  const { slug } = req.params

  try {
    await bookModel.findOneAndDelete({ slug })
    res.sendStatus(200)
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

// Get a book
router.get("/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params

  try {
    const book = await bookModel.findOne({ slug })

    if (!book) return res.sendStatus(404)

    const userId = book.postedBy

    const user = await userModel.findById(userId)

    const bookToSend = {
      title: book.title,
      coverImage: book.coverImage,
      description: book.description,
      publishedDate: book.publishedDate,
      author: book.author,
      slug: book.slug,
      postedBy: user,
      likedBy: book.likedBy,
    }

    res.send(JSON.stringify(bookToSend))
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

router.put("/like/:slug", upload.none(), authenticateToken, async (req, res) => {
  const { slug } = req.params
  const { email } = req.body

  const user = await userModel.findOne({ email })
  let book = await bookModel.findOne({ slug })

  if (!book || !user) return res.sendStatus(404)

  if (book.likedBy.includes(user._id)) {
    book.likedBy = book.likedBy.filter((id) => !id.equals(user._id))
  } else {
    book.likedBy.push(user._id)
  }

  await book.save()

  res.sendStatus(200)
})

export const bookRouter = router