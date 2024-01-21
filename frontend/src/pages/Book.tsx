import { useEffect, useState } from "react"
import Button from "src/components/atoms/Button"
import { book } from "src/types/books"
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { parseCookies } from "nookies"
import { useContextSelector } from "use-context-selector"
import { UserPreferences } from "src/contexts/UserContext"
import LoginModal from "src/components/organisms/LoginModal"
import Token from "src/utils/token"
import useUserFetch from "src/hooks/useUserFetch"

function formatDate(date: string) {
  const newDateFormart = date.split("-")

  let newDate = ""
  newDateFormart.reverse().forEach((date) => {
    newDate += `${date}/`
  })

  return newDate.slice(0, newDate.length - 1)
}

export default function Book() {
  useUserFetch()
  const [book, setBook] = useState<book>({} as book)
  const [open, setOpen] = useState(false)
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useContextSelector(UserPreferences, (ctx) => {
    return {
      user: ctx.user
    }
  })

  useEffect(() => {
    const getData = async () => {
      const book = await fetch(`http://localhost:8000/book/${slug}`).then(res => res.json())
      setBook(book)
    }

    getData()
  }, [])

  async function handleDelete(slug: string) {
    const answer = confirm("Você deseja excluir o livro?")
    const form = new FormData()
    form.append("email", user ? JSON.stringify(user.email) : "")

    if (answer) {
      await Token()

      const token = parseCookies()["AccessToken"]

      const res = await fetch(`http://localhost:8000/book/delete/${slug}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: form
      })
      if (res.status === 200 || res.status === 204) {
        navigate("/")
      }
    }
  }

  async function handleLike(slug: string) {
    await Token()

    const token = parseCookies()["AccessToken"]

    const res = await fetch(`http://localhost:8000/book/like/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(user)
    })

    if (res.status === 200) {
      const book = await fetch(`http://localhost:8000/book/${slug}`).then(res => res.json())
      setBook(book)
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
            <span><strong>Autor:</strong> {book.author}</span>
            <span><strong>Postado por:</strong> {book.postedBy?.username}</span>
            <span><strong>Likes:</strong> {book.likedBy?.length}</span>
          </InfoContainer>
        </DivContainer>
        <DivContainer width="60" justifycontent="space-between">
          <p>{book.description}</p>
          <ButtonsContainer>
            {user && (
              <>
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
              </>
            )}
            <Button
              value="&#10084;"
              borderRadius="100%"
              width="40px"
              height="40px"
              padding="1rem 1rem"
              background="red"
              color="white"
              onClick={() => {
                if (!user) setOpen(true)

                handleLike(book.slug)
              }}
            />
          </ButtonsContainer>
          {open && <LoginModal setOpen={setOpen} />}
        </DivContainer>
      </FlexContainer>
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const DivContainer = styled.div<{ width?: string, justifycontent?: string }>`
  width: ${({ width }) => width ? `${width}%` : "100%"};
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifycontent }) => justifycontent ? justifycontent : "flex-start"};
  align-items: flex-start;
  gap: 1rem;

  p {
    min-height: 700.8px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    p {
      min-height: initial;
    }
  }
`

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 550px) {
    flex-direction: column;
    align-items: stretch;
  }
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