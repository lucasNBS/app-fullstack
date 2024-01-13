import LogoIcon from "/icons/Logo.svg"
import styled from "styled-components"

export default function Logo() {
  return (
    <Container>
      <Link href="/">
        <img src={LogoIcon} alt="Logo" width={50} height={50} />
      </Link>
      MyBrary
    </Container>
  )
}

const Container = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;

  img {
    filter: invert(1);
  }
`

const Link = styled.a`
  width: 50px;
  height: 50px;
`