export type booksList = {
  id: string
  title: string
  coverImage: {
    type: "Buffer",
    data: number[]
  }
  description: string
  publishedDate: string
  author: string
  likedBy: any[]
  slug: string
}