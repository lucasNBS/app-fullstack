import styled from "styled-components"
import BookForm from "src/components/organisms/BookForm"

export default function CreateBook() {

  async function submit() {
    const form = document.getElementById("form") as HTMLFormElement
    const newData = new FormData(form)

    await fetch("http://localhost:8000/book/create", {
      method: "POST",
      body: newData,
    })
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