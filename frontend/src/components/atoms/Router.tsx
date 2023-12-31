import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "src/pages/Home"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teste" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}