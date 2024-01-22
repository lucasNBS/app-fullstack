import Gallery from "src/components/molecules/Gallery"
import useUserFetch from "src/hooks/useUserFetch"
import styled from "styled-components"

export default function MyBooks() {
  useUserFetch()

  return (
    <Container>
      <Gallery myBooks />
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
  gap: 3rem;
`
