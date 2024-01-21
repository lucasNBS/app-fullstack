import styled from "styled-components"
import Button from "./Button"
import { FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

type SearchProps = {
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
  handleSearch: () => Promise<void>
}

export default function Search({ register, handleSubmit, handleSearch }: SearchProps) {
  return (
    <Container onSubmit={handleSubmit(handleSearch)}>
      <SearchBar type="text" {...register("search")} />
      <Button
        onClick={handleSearch}
        background="#00f"
        width="70px"
        height="32px"
        padding="0.5rem 1rem"
        color="#fff"
        borderRadius="4px"
        value="Search"
      />
    </Container>
  )
}

const Container = styled.form`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`

const SearchBar = styled.input`
  width: 300px;
  height: 32px;
  padding: 0.5rem 1rem;
  border: 1px solid #687075;
  border-radius: 16px;
`