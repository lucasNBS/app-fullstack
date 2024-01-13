import mongoose from "mongoose"
import slugify from "slugify"

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  // postedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  }
})

BookSchema.pre("validate", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true })
  next()
})

export default mongoose.model("Book", BookSchema)