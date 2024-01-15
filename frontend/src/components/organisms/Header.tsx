import styled from "styled-components"
import Logo from "src/components/atoms/Logo"
import Navbar from "src/components/molecules/Navbar"
import ToggleTheme from "src/components/atoms/ToggleTheme"
import Button from "../atoms/Button"
import HamburguerButtonIcon from "public/icons/hamburguerButtonIcon.svg"
import AsideMenu from "../molecules/AsideMenu"
import { useState } from "react"

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <Container>
      <AsideMenu open={openMenu} setOpen={setOpenMenu} />
      <ContainerSide className="left">
        <Button
          display="none"
          className="appear768"
          value={<Image src={HamburguerButtonIcon} alt="Ícone do menu" />}
          onClick={() => setOpenMenu(pre => !pre)}
          border="2px solid #fff"
          borderRadius="100%"
          width="40px"
          height="40px"
        />
        <Logo className="disapear-text" />
        <Navbar classNameContainer="disapear768" />
      </ContainerSide>
      <ContainerSide>
        <ToggleTheme />
        <LoginButton />
      </ContainerSide>
    </Container>
  )
}

const Container = styled.header`
  position: relative;
  background-color: ${({ theme }) => theme.colors.blue800};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;

  @media screen and (max-width: 550px) {
    padding: 1rem 2rem;
  }
`

const ContainerSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  @media screen and (max-width: 550px) {
    &.left {
      gap: 1rem;
    }
  }
`

const LoginButton = styled.div`
  background-color: red;
  width: 60px;
  height: 20px;
`

const Image = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
`
