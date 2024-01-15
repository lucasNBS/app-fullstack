import { useNavigate, useParams } from "react-router-dom"
import BookForm from "src/components/organisms/BookForm"
import styled from "styled-components"

export default function UpdateBook() {
  const { slug } = useParams()
  const navigate = useNavigate()

  async function submit() {
    const form = document.getElementById("form") as HTMLFormElement
    const newData = new FormData(form)

    const res = await fetch(`http://localhost:8000/book/edit/${slug}`, {
      method: "PUT",
      body: newData,
    })

    if (res.status === 201) {
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