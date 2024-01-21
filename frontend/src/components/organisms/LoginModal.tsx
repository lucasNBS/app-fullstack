import { Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"
import LogoIcon from "public/assets/icons/Logo.svg"
import FormRegister from "../molecules/FormRegister"
import FormLogin from "../molecules/FormLogin"
import iconClose from "public/assets/icons/iconClose.svg"

type LoginModalProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

type FormType = "register" | "login"

export default function LoginModal({ setOpen }: LoginModalProps) {
  const [formSelected, setFormSelected] = useState<FormType>("register")

  return (
    <Background onClick={() => setOpen(pre => !pre)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseModal onClick={() => setOpen(false)} />
        <Image src={LogoIcon} />
        <FormSelectorContainer selected={formSelected}>
          <ButtonFormOption
            className="left"
            selected={formSelected === "register"}
            onClick={() => setFormSelected("register")}
          >
            <span>Register</span>
          </ButtonFormOption>
          <ButtonFormOption
            className="right"
            selected={formSelected === "login"}
            onClick={() => setFormSelected("login")}
          >
            <span>Login</span>
          </ButtonFormOption>
        </FormSelectorContainer>
        {formSelected === "register" ? <FormRegister /> : <FormLogin />}
      </Container>
    </Background>
  )
}

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 90;
`

const Container = styled.div`
  position: relative;
  background-color: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 16px;
  z-index: 100;
`

const CloseModal = styled.span`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  background: url(${iconClose}) no-repeat center;
`

const Image = styled.img`
  width: 100px;
  height: 100px;
`

const FormSelectorContainer = styled.div<{ selected: FormType }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.blue800};
    width: ${({ selected }) => selected === "register" ? "126px" : "100px"};
    height: 48px;
    border-radius: 32px;
    transform: ${({ selected }) => selected === "register" ? "translate(0)" : "translate(126px)"};
    transition: all 300ms;
  }
`

const ButtonFormOption = styled.button<{ selected: boolean }>`
  padding: 0.75rem 1.5rem;

  span {
    position: relative;
    font-size: 1.25rem;
    color: ${({ selected }) => selected && "#fff"};
    z-index: 10;
  }

  &.left {
    border-radius: 32px 0 0 32px;
  }

  &.right {
    border-radius: 0 32px 32px 0;
  }
`