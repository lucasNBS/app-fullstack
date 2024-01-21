import { book } from "src/types/books"
import styled from "styled-components"
import { Link as ReactLink } from "react-router-dom"

type SwiperItemProps = {
  item: book
}

export default function SwiperItem({ item }: SwiperItemProps) {
  return (
    <Container to={`/book/${item.slug}`}>
      <img src={item.coverImage} alt="Book cover image" width="100%" height="100%" />
    </Container>
  )
}

const Container = styled(ReactLink)`
  min-width: 120px;
  aspect-ratio: 3 / 4;
`