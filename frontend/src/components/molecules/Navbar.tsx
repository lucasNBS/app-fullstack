import styled from "styled-components"

export default function Navbar() {
  return (
    <Container>
      <NavbarList>
        <ListItem>
          <Link href="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link href="/new-book">New Book</Link>
        </ListItem>
        <ListItem>
          <Link href="/">My Books</Link>
        </ListItem>
      </NavbarList>
    </Container>
  )
}

const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavbarList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const ListItem = styled.li``

const Link = styled.a`
  text-decoration: none;
  color: white;
`