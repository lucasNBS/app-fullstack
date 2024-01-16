import styled from "styled-components"
import SwiperItem from "src/components/atoms/SwiperItem"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"

type SwiperProps = {
  itemsList: any[]
  title?: string
}

export default function BooksSwiper({ itemsList, title }: SwiperProps) {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <Swiper
        modules={[FreeMode]}
        freeMode={{
          enabled: true,
          momentum: true,
        }}
        spaceBetween={5}
        slidesPerView="auto"
      >
        {itemsList.map((_, index) => {
          return (
            <SwiperSlide key={index} >
              <SwiperItem />
            </SwiperSlide>
          )
        })}
      </Swiper>
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

  .swiper, .swiper-wrapper {
    width: 100%;
    height: 160px;
  }

  .swiper-wrapper {
    display: flex;
  }

  .swiper-slide {
    aspect-ratio: 3 / 4;
    width: 120px;
  }
`

const Title = styled.h3`
  color: black;
`
