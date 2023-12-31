import { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

export default function ToggleTheme() {
  const theme = useContext(ThemeContext)

  return theme && (
    <ThemeButton
      onClick={theme.toggle}
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