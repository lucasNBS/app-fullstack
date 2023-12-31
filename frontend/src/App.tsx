import GlobalStyle from "src/GlobalStyle"
import Router from "src/components/atoms/Router"
import ThemeContext from "src/contexts/ThemeContext"

function App() {
  return (
    <>
      <ThemeContext>
        <GlobalStyle />
        <Router />
      </ThemeContext>
    </>
  )
}

export default App
