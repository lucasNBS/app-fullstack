import styled from "styled-components"
import BookForm from "src/components/organisms/BookForm"

export default function CreateBook() {
  return (
    <Container>
      <BookForm />
    </Container>
  )
}

const Container = styled.section`
  max-width: 1200px;
  min-height: calc(100vh - 285px - 4rem);
  margin: 2rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: column;
  gap: 2rem;
`