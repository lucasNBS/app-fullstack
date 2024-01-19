import styled from "styled-components"
import { Link as ReactLink } from "react-router-dom"

type NavBarProps = {
  classNameContainer?: string
  classNameList?: string
}

export default function Navbar({ classNameContainer, classNameList }: NavBarProps) {
  return (
    <Container className={classNameContainer}>
      <NavbarList className={classNameList}>
        <ListItem>
          <Link to={"/"}>Home</Link>
        </ListItem>
        <ListItem>
          <Link to={"/new-book"}>New Book</Link>
        </ListItem>
        <ListItem>
          <Link to={"/my-books"}>My Books</Link>
        </ListItem>
      </NavbarList>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    &.disapear768 {
      display: none;
    }
  }
`

const NavbarList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  &.vertical {
    flex-direction: column;
    align-items: flex-start;
  }
`

const ListItem = styled.li``

const Link = styled(ReactLink)`
  text-decoration: none;
  color: white;
`