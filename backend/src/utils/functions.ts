import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import bookModel from "../models/bookModel"
import userModel from "../models/userModel"

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(403)

    next()
  })
}

export function isAuthor() {

  return function (req: Request, res: Response, next: NextFunction) {
    authenticateToken(req, res, async function () {
      const { email } = req.body
      const { slug } = req.params

      const book = await bookModel.findOne({ slug })
      const user = await userModel.findOne({ email: JSON.parse(email) })

      if (!book || !user) return res.sendStatus(404)

      if (user._id.equals(book.postedBy)) {
        next()
      } else {
        res.sendStatus(403)
      }
    })
  }
}
