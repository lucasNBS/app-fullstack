import { Routes, Route } from "react-router-dom"
import Book from "src/pages/Book"
import CreateBook from "src/pages/CreateBook"
import Home from "src/pages/Home"
import MyBooks from "src/pages/MyBooks"
import UpdateBook from "src/pages/UpdateBook"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:slug" element={<Book />} />
      <Route path="/edit/:slug" element={<UpdateBook />} />
      <Route path="/new-book" element={<CreateBook />} />
      <Route path="/my-books" element={<MyBooks />} />
    </Routes>
  )
}