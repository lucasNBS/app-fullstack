import { parseCookies } from "nookies"
import { useNavigate, useParams } from "react-router-dom"
import BookForm from "src/components/organisms/BookForm"
import { UserPreferences } from "src/contexts/UserContext"
import Token from "src/utils/token"
import styled from "styled-components"
import { useContextSelector } from "use-context-selector"

export default function UpdateBook() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useContextSelector(UserPreferences, (ctx) => {
    return {
      user: ctx.user
    }
  })

  async function submit() {
    const form = document.getElementById("form") as HTMLFormElement
    const newData = new FormData(form)
    newData.append("email", user ? JSON.stringify(user.email) : "{}")

    await Token()

    const token = parseCookies()["AccessToken"]

    const res = await fetch(`http://localhost:8000/book/edit/${slug}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: newData,
    })

    if (res.status === 204) {
      navigate("/")
    }
  }

  return (
    <Container>
      <BookForm submit={submit} editPage />
    </Container>
  )
}

const Container = styled.section`
  width: calc(100% - 6rem);
  max-width: 1200px;
  min-height: calc(100vh - 285px - 4rem);
  margin: 2rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  gap: 2rem;
`