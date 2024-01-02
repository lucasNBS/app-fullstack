import styled from "styled-components"
import GalleryCard from "../atoms/GalleryCard"
import { useEffect, useState } from "react"
import { booksList } from "src/types/books"

export default function Gallery() {
  const [list, setList] = useState<booksList[]>([])

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
          <GalleryCard key={item.id} {...item} />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`