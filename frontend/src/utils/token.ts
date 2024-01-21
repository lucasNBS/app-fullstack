import { parseCookies } from "nookies"

export default async function Token() {
  const refreshToken = parseCookies()["RefreshToken"]

  const data = {
    refreshToken: refreshToken
  }

  await fetch("http://localhost:8000/user/token", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
}