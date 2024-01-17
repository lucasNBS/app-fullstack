import styled, { ThemeContext } from "styled-components"
import Button from "../atoms/Button"
import { useContext } from "react"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Preencha o campo").min(3, "E-mail muito curto").max(50, "E-mail muito longo"),
  password: Yup.string().trim().required("Preencha o campo").min(3, "Senha muito curta").max(20, "Senha muito longa"),
})

export default function FormLogin() {
  const theme = useContext(ThemeContext)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginSchema)
  })

  async function submit() {

  }

  return (
    <Container method="post" onSubmit={handleSubmit(submit)}>
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
      <Button
        background={theme?.colors.blue800}
        color="#fff"
        padding="0.5rem 1rem"
        value="Login"
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

const FormLabel = styled.label``

const FormInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 2px;
  border: 1px solid #687075;
`

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #f00;
`