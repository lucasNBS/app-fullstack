import { useState } from "react";
import Button from "../atoms/Button";
import LoginModal from "../organisms/LoginModal";

export default function LoginButton() {
  const [openModal, setOpenModal] = useState(false)

  return (
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