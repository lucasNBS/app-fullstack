import styled from "styled-components"
import GalleryCard from "../atoms/GalleryCard"
import { useEffect, useState } from "react"
import { book } from "src/types/books"

export default function Gallery() {
  const [list, setList] = useState<book[]>([])

  useEffect(() => {
    const getData = async () => {
      const books = await fetch("http://localhost:8000/book/all").then(res => res.json())
      setList(books)
    }

    getData()
  }, [])

  return (
    <Container>
      {list.map((item) => {
        return (
          <GalleryCard key={item.slug} {...item} />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat(5, 1fr);

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
  }
`