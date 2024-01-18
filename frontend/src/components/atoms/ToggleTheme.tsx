import { useContext } from "react"
import { UserPreferences } from "src/contexts/UserContext"
import styled, { ThemeContext } from "styled-components"
import { useContextSelector } from "use-context-selector"

export default function ToggleTheme() {
  const theme = useContext(ThemeContext)
  const { toggleTheme } = useContextSelector(UserPreferences, (ctx) => {
    return {
      toggleTheme: ctx.toggleTheme
    }
  })

  return theme && (
    <ThemeButton
      onClick={() => toggleTheme()}
    >
      {theme.title == "dark" ? "🌙" : "☀️"}
    </ThemeButton>
  )
}

const ThemeButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 24px;
  color: white;
`