import styled from "styled-components"
import SwiperItem from "src/components/atoms/SwiperItem"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"
import { useEffect, useState } from "react"
import { book } from "src/types/books"

type SwiperProps = {
  title?: string
}

export default function BooksSwiper({ title }: SwiperProps) {
  const [itemsList, setItemsList] = useState<book[]>([])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:8000/book/most-liked").then(res => res.json())

      setItemsList(res)
    }

    getData()
  }, [])

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
        {itemsList.map((item, index) => {
          return (
            <SwiperSlide key={index} >
              <SwiperItem item={item} />
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
  color: ${({ theme }) => theme.colors.font};
`
