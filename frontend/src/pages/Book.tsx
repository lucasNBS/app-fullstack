import { useEffect, useState } from "react"
import { book } from "src/types/books"
import styled from "styled-components"

function formatDate(date: string) {
  console.log(date)
  const index = date.indexOf("T")
  const newDateFormart = date.slice(0, index).split("-")

  let newDate = ""

  newDateFormart.reverse().forEach((date) => {
    newDate += `${date}/`
  })

  return newDate.slice(0, newDate.length - 1)
}

export default function Book() {
  const [book, setBook] = useState<book>({} as book)

  useEffect(() => {
    const getData = async () => {
      const pathname = location.pathname
      const book = await fetch(`http://localhost:8000${pathname}`).then(res => res.json())
      setBook(book)
    }

    getData()
  }, [])

  return (
    <Container>
      <Title>{book.title}</Title>
      <FlexContainer>
        <DivContainer width="40">
          <Image src={book.coverImage} alt="Capa do livro" />
          <InfoContainer>
            <span>{book.publishedDate && formatDate(book.publishedDate)}</span>
            <span>{book.author}</span>
            <span>Lorem, ipsum dolor.</span>
            <span>Lorem, ipsum dolor.</span>
          </InfoContainer>
        </DivContainer>
        <DivContainer width="60" justifyContent="space-between">
          <p>{book.description}</p>
          <ButtonsContainer>
            <Button>Editar</Button>
            <Button>Excluir</Button>
            <Button>Curtir</Button>
            <Button>Salvar</Button>
          </ButtonsContainer>
        </DivContainer>
      </FlexContainer>
    </Container>
  )
}

const Container = styled.section`
  max-width: 1200px;
  min-height: calc(100vh - 285px - 4rem);
  margin: 2rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;
`

const Title = styled.h2``

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
`

const DivContainer = styled.div<{ width?: string, justifyContent?: string }>`
  width: ${({ width }) => width ? `${width}%` : "100%"};
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : "flex-start"};
  align-items: flex-start;
  gap: 1rem;

  p {
    min-height: 700.8px;
  }
`

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`