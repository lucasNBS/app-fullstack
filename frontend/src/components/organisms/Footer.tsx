import LogoIcon from "public/icons/Logo.svg"
import styled from "styled-components"

export default function Footer() {
  return (
    <Container>
      <LogoContent>
        <img src={LogoIcon} alt="Logo" width={40} height={40} />
        <FooterTitle>MyBrary</FooterTitle>
      </LogoContent>
      <FooterText>&copy; Copyright all rights reserverd</FooterText>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.blue800};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  gap: 0.5rem;

  img {
    filter: brightness(0) invert(1);
  }
`

const LogoContent = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;
  flex-direction: column;
`

const FooterTitle = styled.h2`
  font-size: 2rem;
  color: white;
`

const FooterText = styled.span`
  color: white;
`
