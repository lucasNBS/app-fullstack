import { ReactNode } from "react"
import GlobalStyle from "src/GlobalStyle"
import Router from "src/components/atoms/Router"
import ThemeContext from "src/contexts/ThemeContext"
import Header from "src/components/organisms/Header"
import Footer from "src/components/organisms/Footer"

type AppProps = {
  children: ReactNode
}

function App({ children }: AppProps) {
  return (
    <>
      <ThemeContext>
        <Header />
        <GlobalStyle />
        <Router />
        {children}
        <Footer />
      </ThemeContext>
    </>
  )
}

export default App
