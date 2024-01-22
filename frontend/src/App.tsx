import { ReactNode } from "react"
import GlobalStyle from "src/GlobalStyle"
import Router from "src/components/atoms/Router"
import Header from "src/components/organisms/Header"
import Footer from "src/components/organisms/Footer"
import UserContext from "./contexts/UserContext"
import { BrowserRouter } from "react-router-dom"
import styled from "styled-components"

type AppProps = {
  children: ReactNode
}

function App({ children }: AppProps) {
  return (
    <>
      <BrowserRouter>
        <UserContext>
          <Container>
            <Header />
            <GlobalStyle />
            <Router />
            {children}
            <Footer />
          </Container>
        </UserContext>
      </BrowserRouter>
    </>
  )
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`

export default App
