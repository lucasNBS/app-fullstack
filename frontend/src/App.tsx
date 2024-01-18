import { ReactNode } from "react"
import GlobalStyle from "src/GlobalStyle"
import Router from "src/components/atoms/Router"
import Header from "src/components/organisms/Header"
import Footer from "src/components/organisms/Footer"
import UserContext from "./contexts/UserContext"

type AppProps = {
  children: ReactNode
}

function App({ children }: AppProps) {
  return (
    <>
      <UserContext>
        <Header />
        <GlobalStyle />
        <Router />
        {children}
        <Footer />
      </UserContext>
    </>
  )
}

export default App
