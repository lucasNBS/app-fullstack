import { book } from "src/types/books"
import styled from "styled-components"
import Button from "./Button"
import { useContextSelector } from "use-context-selector"
import { UserPreferences } from "src/contexts/UserContext"
import { parseCookies } from "nookies"
import { Link as ReactLink } from "react-router-dom"

type GalleryCardProps = Omit<book, "id" | "author" | "likedBy" | "publishedDate">

export default function GalleryCard({
  title,
  coverImage,
  description,
  slug
}: GalleryCardProps) {
  const { user } = useContextSelector(UserPreferences, (ctx) => {
    return {
      user: ctx.user
    }
  })

  async function handleLike() {
    if (!user) return

    const token = parseCookies()["AccessToken"]

    await fetch(`http://localhost:8000/book/like/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
  }

  return (
    <Container to={`/book/${slug}`}>
      <img src={coverImage} alt="Book cover image" width="100%" height="100%" />
      <Content>
        <ContentContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </ContentContainer>
        <ContentContainer>
          <Button
            zIndex="20"
            background="#f00"
            borderRadius="100%"
            width="20px"
            height="20px"
            padding="1rem"
            color="#fff"
            value="&#10084;"
            onClick={(e: Event) => {
              e.preventDefault()

              handleLike()
            }}
          />
        </ContentContainer>
      </Content>
    </Container>
  )
}

const Container = styled(ReactLink)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: red;
  aspect-ratio: 3 / 4;
  overflow: hidden;

  &:hover {
    transition: transform 200ms ease-in;
    transform: scale(1.03);
  }
`

const Content = styled.div`
  position: absolute;
  inset: 0;
  background-color: white;
  opacity: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;

  &:hover {
    transition: opacity 200ms ease-in;
    opacity: 0.8;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.span``

const Description = styled.p``