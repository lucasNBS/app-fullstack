import LogoIcon from "public/assets/icons/Logo.svg"
import styled from "styled-components"

type LogoProps = {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Container className={className}>
      <Link href="/">
        <img src={LogoIcon} alt="Logo" width={50} height={50} />
      </Link>
      <span>MyBrary</span>
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

  @media screen and (max-width: 550px) {
    &.disapear-text {
      span {
        display: none;
      }
    }
  }
`

const Link = styled.a`
  width: 50px;
  height: 50px;
`