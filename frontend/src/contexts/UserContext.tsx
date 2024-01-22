import { parseCookies, setCookie } from "nookies"
import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { User } from "src/types/user"
import { ThemeProvider } from "styled-components"
import { createContext } from "use-context-selector"

type ThemeType = {
  title: "light" | "dark"
  colors: {
    blue100: string
    blue300: string
    blue500: string
    blue800: string
    background: string
    font: string
  }
}

const lightTheme: ThemeType = {
  title: "light",
  colors: {
    blue100: "#D9F0FF",
    blue300: "#A3D5FF",
    blue500: "#83C9F4",
    blue800: "#6F73D2",
    background: "#fff",
    font: "#353a3d",
  }
}

const darkTheme: ThemeType = {
  title: "dark",
  colors: {
    blue100: "#70C6FF",
    blue300: "#33A3FF",
    blue500: "#1E9DEB",
    blue800: "#31349B",
    background: "#333",
    font: "#fff",
  }
}

type UserPreferencesType = {
  user: User | null
  setUser: Dispatch<React.SetStateAction<User | null>>
  toggleTheme: () => void
}

export const UserPreferences = createContext<UserPreferencesType>({
  user: {} as User,
  setUser: (pre: SetStateAction<User | null>) => { },
  toggleTheme: () => { }
})

type UserContextProps = {
  children: ReactNode
}

export default function UserContext({ children }: UserContextProps) {
  const cookieTheme: ThemeType | null = JSON.parse(parseCookies()["Theme"])

  const [theme, setTheme] = useState(cookieTheme ? cookieTheme : lightTheme)
  const [user, setUser] = useState<User | null>(null)

  function toggleTheme() {
    setTheme(theme => theme.title == "light" ? darkTheme : lightTheme)
    setCookie(null, "Theme", theme.title == "light" ? JSON.stringify(darkTheme) : JSON.stringify(lightTheme))
  }

  return (
    <ThemeProvider theme={theme}>
      <UserPreferences.Provider value={{ toggleTheme, user, setUser }}>
        {children}
      </UserPreferences.Provider>
    </ThemeProvider>
  )
}