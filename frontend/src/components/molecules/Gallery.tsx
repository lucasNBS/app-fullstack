import styled from "styled-components"
import GalleryCard from "../atoms/GalleryCard"
import { useEffect, useState } from "react"
import { book } from "src/types/books"
import Pagination from "./Pagination"
import Search from "../atoms/Search"
import { useForm } from "react-hook-form"

export default function Gallery() {
  const [list, setList] = useState<book[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { register, handleSubmit, getValues } = useForm()

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

    const books = await fetch(`http://localhost:8000/book/all?page=${page + 1}&search=${getValues("search")}`).then(res => res.json())
    setList(pre => [...pre, ...books.results])
    setHasMore(books.next ? true : false)
  }

  async function handleSearch() {
    const books = await fetch(`http://localhost:8000/book/all?page=1&search=${getValues("search")}`)
      .then(res => res.json())
    setPage(1)
    setList(books.results)
    setHasMore(books.next ? true : false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <Search
        register={register}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
      />
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1.5rem;
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