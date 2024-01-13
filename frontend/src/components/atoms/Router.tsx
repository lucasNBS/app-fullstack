import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateBook from "src/pages/CreateBook"
import Home from "src/pages/Home"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-book" element={<CreateBook />} />
      </Routes>
    </BrowserRouter>
  )
}