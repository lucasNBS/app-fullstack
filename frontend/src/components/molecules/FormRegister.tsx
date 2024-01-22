import styled, { ThemeContext } from "styled-components"
import Button from "../atoms/Button"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Preencha o campo").min(3, "Nome muito curto").max(50, "Nome muito grande"),
  email: Yup.string().email().required("Preencha o campo").min(3, "E-mail muito curto").max(50, "E-mail muito longo"),
  password: Yup.string().trim().required("Preencha o campo").min(3, "Senha muito curta").max(20, "Senha muito longa"),
  confirmPassword: Yup.string().required("Preencha o campo").oneOf([Yup.ref('password')], "Senhas divergem")
})

export default function FormRegister() {
  const theme = useContext(ThemeContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(RegisterSchema)
  })

  async function submit() {
    const form = document.getElementById("form") as HTMLFormElement
    const data = new FormData(form)

    const res = await fetch("http://localhost:8000/user/register", {
      method: "POST",
      body: data,
    }).then(res => res.json())

  }

  return (
    <Container id="form" method="post" onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <FormLabel>Nome</FormLabel>
        <FormInput {...register("username")} type="text" />
        {errors.username?.message && <ErrorMessage>{errors.username.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <FormLabel>E-mail</FormLabel>
        <FormInput {...register("email")} type="email" />
        {errors.email?.message && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Senha</FormLabel>
        <FormInput {...register("password")} type="password" />
        {errors.password?.message && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <FormLabel>Confirmar Senha</FormLabel>
        <FormInput {...register("confirmPassword")} type="password" />
        {errors.confirmPassword?.message && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
      </FormGroup>
      <Button
        background={theme?.colors.blue800}
        color="#fff"
        padding="0.5rem 1rem"
        value="Register"
      />
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.25rem;
`

const FormLabel = styled.label`
  color: ${({ theme }) => theme.colors.font};
`

const FormInput = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.font};
  padding: 0.5rem 1rem;
  border-radius: 2px;
  border: 1px solid #687075;
`

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #f00;
`