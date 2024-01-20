import { parseCookies } from "nookies";
import { useEffect } from "react";

export default function useUserFetch() {

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

    console.log(res)
  }

  useEffect(() => {
    getData()
  }, [])
}