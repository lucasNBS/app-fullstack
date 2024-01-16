import styled from "styled-components"
import Logo from "../atoms/Logo"
import Navbar from "./Navbar"
import IconClose from "public/assets/icons/iconClose.svg"

type AsideMenuProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AsideMenu({ open, setOpen }: AsideMenuProps) {
  return (
    <>
      <Background open={open} onClick={() => setOpen(pre => !pre)} />
      <Container open={open}>
        <Close onClick={() => setOpen(pre => !pre)} />
        <Logo />
        <Navbar classNameList="vertical" />
      </Container>
    </>
  )
}

const Background = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 90;
  opacity: ${({ open }) => open ? "0.6" : "0"};
  transform: ${({ open }) => open ? "translate(0px)" : "translate(-100%)"};
  transition: opacity 250ms ease-in;
`

const Container = styled.aside<{ open: boolean }>`
  padding: 2rem 1rem;
  background-color: ${({ theme }) => theme.colors.blue800};
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: -2rem;
  z-index: 100;
  transform: ${({ open }) => open ? "translate(2rem)" : "translate(calc(-100% + 2rem))"};
  transition: transform 250ms cubic-bezier(.61,.39,.33,.91);
  gap: 1rem;
`

const Close = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(11%) sepia(78%) saturate(5174%) hue-rotate(3deg) brightness(131%) contrast(129%);
  background: no-repeat center url(${IconClose});
  background-size: 24px;
`