import styled from "styled-components"
import Swiper from "src/components/molecules/Swiper"
import Gallery from "src/components/molecules/Gallery"

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export default function Home() {
  return (
    <Container>
      <Swiper itemsList={list} title="Most Liked Books" />
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