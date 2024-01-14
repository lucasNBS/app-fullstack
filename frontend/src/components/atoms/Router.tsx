import { BrowserRouter, Routes, Route } from "react-router-dom"
import Book from "src/pages/Book"
import CreateBook from "src/pages/CreateBook"
import Home from "src/pages/Home"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:slug" element={<Book />} />
        <Route path="/new-book" element={<CreateBook />} />
      </Routes>
    </BrowserRouter>
  )
}