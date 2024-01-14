import { useEffect, useState } from "react"
import Button from "src/components/atoms/Button"
import { book } from "src/types/books"
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"

function formatDate(date: string) {
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
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const book = await fetch(`http://localhost:8000/book/${slug}`).then(res => res.json())
      setBook(book)
    }

    getData()
  }, [])

  function handleDelete(slug: string) {

    const answer = confirm("Você deseja excluir o livro?")

    if (answer) {
      fetch(`http://localhost:8000/book/delete/${slug}`, {
        method: "DELETE",
      })
      navigate("/")
    }
  }

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
            <Button
              value="Editar"
              padding="0.5rem 1rem"
              background="blue"
              color="white"
              onClick={() => navigate(`/edit/${book.slug}`)}
            />
            <Button
              value="Deletar"
              padding="0.5rem 1rem"
              background="red"
              color="white"
              onClick={() => handleDelete(book.slug)}
            />
            <Button
              value="Curtir"
              padding="0.5rem 1rem"
              background="pink"
              color="white"
            />
            <Button
              value="Salvar"
              padding="0.5rem 1rem"
              background="lightpink"
              color="white"
            />
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