import { Routes, Route, Navigate } from "react-router-dom"
import { UserPreferences } from "src/contexts/UserContext"
import Book from "src/pages/Book"
import CreateBook from "src/pages/CreateBook"
import Home from "src/pages/Home"
import MyBooks from "src/pages/MyBooks"
import UpdateBook from "src/pages/UpdateBook"
import { useContextSelector } from "use-context-selector"

export default function Router() {
  const { user } = useContextSelector(UserPreferences, (ctx) => {
    return {
      user: ctx.user
    }
  })

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:slug" element={<Book />} />
      <Route path="/edit/:slug" element={<UpdateBook />} />
      {user ? <Route path="/new-book" element={<CreateBook />} /> : null}
      {user ? <Route path="/my-books" element={<MyBooks />} /> : null}
      <Route path="*" element={<Navigate to={{ pathname: "/" }} />} />
    </Routes>
  )
}