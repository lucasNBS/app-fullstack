require("dotenv").config()
import express, { Request, Response } from "express"
import userModel from "../models/userModel"
import multer from "multer"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()
const upload = multer({})

router.post("/register", upload.none(), async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)
  const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)

  const user = new userModel({
    username,
    email,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  })

  try {
    await user.save()
    res.sendStatus(201)
  } catch (err) {
    res.send(JSON.stringify(err))
  }
})

router.post("/login", upload.none(), async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await userModel.findOne({ email })

    if (!user) return res.sendStatus(404)

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) return res.sendStatus(401)

    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    }

    const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "20s" })
    const refreshToken = jwt.sign(newUser, process.env.REFRESH_TOKEN_SECRET as string)

    res.cookie("AccessToken", accessToken, { maxAge: 20000 })
    res.cookie("RefreshToken", refreshToken)

    res.send(JSON.stringify({ username: newUser.username }))
  } catch (err) {
    res.sendStatus(500)
  }
})

router.delete("/logout", (req: Request, res: Response) => {
  res.clearCookie("AccessToken")
  res.clearCookie("RefreshToken")
  res.sendStatus(200)
})

router.post("/token", upload.none(), (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) return res.sendStatus(401)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403)

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "20s" })
    res.cookie("AccessToken", accessToken, { maxAge: 20000 })
  })

})

export const userRouter = router