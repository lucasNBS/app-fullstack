import { ReactNode, useState } from "react"
import { ThemeProvider } from "styled-components"

type ThemeType = {
  title: "light" | "dark"
  colors: {
    blue100: string
    blue300: string
    blue500: string
    blue800: string
  },
  toggle: () => void
}

type ThemeContextProps = {
  children: ReactNode
}

export default function ThemeContext({ children }: ThemeContextProps) {
  const lightTheme: ThemeType = {
    title: "light",
    colors: {
      blue100: "#D9F0FF",
      blue300: "#A3D5FF",
      blue500: "#83C9F4",
      blue800: "#6F73D2"
    },
    toggle: toggleTheme
  }

  const darkTheme: ThemeType = {
    title: "dark",
    colors: {
      blue100: "#70C6FF",
      blue300: "#33A3FF",
      blue500: "#1E9DEB",
      blue800: "#31349B"
    },
    toggle: toggleTheme
  }

  function toggleTheme() {
    setTheme(theme => theme.title == "light" ? darkTheme : lightTheme)
  }

  const [theme, setTheme] = useState(lightTheme)

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}