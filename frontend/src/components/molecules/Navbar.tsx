import styled from "styled-components"
import { Link as ReactLink } from "react-router-dom"
import { useState } from "react"
import LoginModal from "../organisms/LoginModal"
import { useContextSelector } from "use-context-selector"
import { UserPreferences } from "src/contexts/UserContext"

type NavBarProps = {
  classNameContainer?: string
  classNameList?: string
}

export default function Navbar({ classNameContainer, classNameList }: NavBarProps) {
  const [open, setOpen] = useState(false)
  const { user } = useContextSelector(UserPreferences, (ctx) => {
    return {
      user: ctx.user,
    }
  })

  function handleLink(link: string, name: string) {
    return user ?
      <Link to={link}>{name}</Link> :
      <EmptyLink onClick={() => setOpen(true)}>{name}</EmptyLink>
  }

  return (
    <Container className={classNameContainer}>
      <NavbarList className={classNameList}>
        <ListItem>
          <Link to={"/"}>Home</Link>
        </ListItem>
        <ListItem>
          {handleLink("/new-book", "New Book")}
        </ListItem>
        <ListItem>
          {handleLink("/my-books", "My Books")}
        </ListItem>
      </NavbarList>
      {open && <LoginModal setOpen={setOpen} />}
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
const EmptyLink = styled.span`
  cursor: pointer;
  text-decoration: none;
  color: white;
`