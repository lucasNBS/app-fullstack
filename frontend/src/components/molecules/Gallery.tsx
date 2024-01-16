import styled from "styled-components"
import GalleryCard from "../atoms/GalleryCard"
import { useEffect, useState } from "react"
import { book } from "src/types/books"
import Pagination from "./Pagination"

export default function Gallery() {
  const [list, setList] = useState<book[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const firstBookIndex = (page - 1) * 20
  const lastBookIndex = page * 20

  async function getData() {
    const books = await fetch("http://localhost:8000/book/all?page=1").then(res => res.json())
    setList(books.results)
    setHasMore(books.next ? true : false)
  }

  async function getMoreBooks() {
    setPage(pre => pre + 1)
    if (lastBookIndex < list.length) return

    const books = await fetch(`http://localhost:8000/book/all?page=${page + 1}`).then(res => res.json())
    setList(pre => [...pre, ...books.results])
    setHasMore(books.next ? true : false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <ContainerGrid>
        {list.slice(firstBookIndex, lastBookIndex).map((item) => {
          return (
            <GalleryCard key={item.slug} {...item} />
          )
        })}
      </ContainerGrid>
      <Pagination
        hasBack={page !== 1}
        hasForward={hasMore || lastBookIndex < list.length}
        onBackward={() => setPage(pre => pre == 1 ? 1 : pre - 1)}
        onForward={getMoreBooks}
      />
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1rem;
`

const ContainerGrid = styled.div`
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