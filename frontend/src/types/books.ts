import { User } from "./user"

export type book = {
  title: string
  coverImage: string
  description: string
  publishedDate: string
  author: string
  postedBy: User
  likedBy: any[]
  slug: string
}
