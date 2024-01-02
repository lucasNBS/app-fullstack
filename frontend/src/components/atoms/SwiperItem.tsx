import styled from "styled-components"

export default function SwiperItem() {
  return (
    <Container />
  )
}

const Container = styled.div`
  background-color: red;
  min-width: 120px;
  aspect-ratio: 3 / 4;
  // scroll-snap-align: center;
`