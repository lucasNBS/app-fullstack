import { useState } from "react";
import Button from "../atoms/Button";
import LoginModal from "../organisms/LoginModal";
import { useContextSelector } from "use-context-selector";
import { UserPreferences } from "src/contexts/UserContext";
import styled from "styled-components";

export default function LoginButton() {
  const [openModal, setOpenModal] = useState(false)
  const { user, setUser } = useContextSelector(UserPreferences, (ctx) => {
    return {
      user: ctx.user,
      setUser: ctx.setUser,
    }
  })

  async function logout(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    await fetch("http://localhost:8000/user/logout", {
      method: "DELETE",
      credentials: "include",
    })
    setUser(null)
    setOpenModal(false)
  }

  return user?.username ? (
    <UserName onClick={(e) => logout(e)}>{user.username}</UserName>
  ) : (
    <>
      <Button
        background="#f00"
        color="#fff"
        padding="0.5rem 2rem"
        value="Login"
        borderRadius="16px"
        onClick={() => setOpenModal(pre => !pre)}
      />
      {openModal && (
        <LoginModal
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </>
  )
}

const UserName = styled.span`
  cursor: pointer;
  color: #fff;
`