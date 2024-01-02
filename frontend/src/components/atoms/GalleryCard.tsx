import { booksList } from "src/types/books"
import styled from "styled-components"

type GalleryCardProps = Omit<booksList, "id" | "likedBy" | "publishedDate">

export default function GalleryCard({
  title,
  author,
  coverImage,
  description,
  slug
}: GalleryCardProps) {

  return (
    <Container href={`/book/${slug}`}>
      <img src="/" alt="Book cover image" width="100%" height="100%" />
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </Container>
  )
}

const Container = styled.a`
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;

  &:hover {
    transition: opacity 200ms ease-in;
    opacity: 0.8;
  }
`

const Title = styled.span``

const Description = styled.p``