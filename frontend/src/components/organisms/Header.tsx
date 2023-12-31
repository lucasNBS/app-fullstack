import styled from "styled-components"
import Logo from "src/components/atoms/Logo"
import Navbar from "../molecules/Navbar"
import ToggleTheme from "../atoms/ToggleTheme"

export default function Header() {
  return (
    <Container>
      <ContainerSide>
        <Logo />
        <Navbar />
      </ContainerSide>
      <ContainerSide>
        <ToggleTheme />
        <LoginButton />
      </ContainerSide>
    </Container>
  )
}

const Container = styled.header`
  background-color: ${({ theme }) => theme.colors.blue800};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
`

const ContainerSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`

const LoginButton = styled.div`
  background-color: red;
  width: 60px;
  height: 20px;
`