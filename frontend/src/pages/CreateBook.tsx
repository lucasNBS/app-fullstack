import styled from "styled-components"
import BookForm from "src/components/organisms/BookForm"
import { useNavigate } from "react-router-dom"
import { parseCookies } from "nookies"
import { useContextSelector } from "use-context-selector"
import { UserPreferences } from "src/contexts/UserContext"
import Token from "src/utils/token"

export default function CreateBook() {
  const navigate = useNavigate()
  const { user } = useContextSelector(UserPreferences, (ctx) => {
    return {
      user: ctx.user
    }
  })

  async function submit() {
    const token = parseCookies()["AccessToken"]
    const form = document.getElementById("form") as HTMLFormElement
    const newData = new FormData(form)
    newData.append("email", user ? user.email : "")

    await Token()

    const res = await fetch("http://localhost:8000/book/create", {
      method: "POST",
      body: newData,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if (res.status === 201) {
      navigate("/")
    }
  }

  return (
    <Container>
      <BookForm submit={submit} />
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