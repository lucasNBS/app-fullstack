import styled from "styled-components"
import SwiperItem from "src/components/atoms/SwiperItem"

type SwiperProps = {
  itemsList: any[]
  title?: string
}

export default function Swiper({ itemsList, title }: SwiperProps) {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <SwiperContent>
        {itemsList.map((item, index) => {
          return (
            <SwiperItem key={item} />
          )
        })}
      </SwiperContent>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h3`
  color: black;
`

const SwiperContent = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  // scroll-snap-type: x mandatory;
`