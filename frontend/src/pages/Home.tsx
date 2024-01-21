import styled from "styled-components"
import BooksSwiper from "src/components/molecules/BooksSwiper"
import Gallery from "src/components/molecules/Gallery"
import useUserFetch from "src/hooks/useUserFetch"

export default function Home() {
  useUserFetch()

  return (
    <Container>
      <BooksSwiper title="Most Liked Books" />
      <SearchBar />
      <Gallery />
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
  align-items: flex-end;
  flex-direction: column;
  gap: 2rem;
`

const SearchBar = styled.div`
  background-color: red;
  width: 300px;
  height: 32px;
  border-radius: 32px;
`