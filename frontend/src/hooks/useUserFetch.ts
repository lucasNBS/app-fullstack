import { parseCookies } from "nookies";
import { useEffect } from "react";
import { UserPreferences } from "src/contexts/UserContext";
import { useContextSelector } from "use-context-selector";

export default function useUserFetch() {
  const { setUser } = useContextSelector(UserPreferences, (ctx) => {
    return {
      setUser: ctx.setUser
    }
  })

  async function getData() {
    const refreshToken = parseCookies()["RefreshToken"]

    const data = {
      refreshToken: refreshToken
    }

    const res = await fetch("http://localhost:8000/user/token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    }).then(res => res.json())

    setUser(res)
  }

  useEffect(() => {
    getData()
  }, [])
}