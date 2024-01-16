import styled from "styled-components"
import addImage from "public/assets/icons/addImage.svg"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import Button from "../atoms/Button"
import { book } from "src/types/books"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const BookFormSchema = Yup.object().shape({
  title: Yup
    .string()
    .required("Preencha o campo")
    .min(3, "Título muito curto")
    .max(60, "Título muito longo"),
  description: Yup
    .string()
    .required("Preencha o campo")
    .min(3, "Descrição muito curta").max(200, "Descrição muito longa"),
  author: Yup
    .string()
    .required("Preencha o campo")
    .min(3, "Nome de autor muito curto")
    .max(50, "Nome de autor muito longo"),
  publishedDate: Yup
    .date()
    .typeError("Data inválida")
    .required("Preencha o campo")
    .max(new Date(), "Não é possível incluir uma data futura"),
  coverImage: Yup
    .mixed()
    .test("has file", "Selecione uma imagem para a capa", (val: any) => val.length > 0),
})

function handleChangeImage(image: File) {
  const reader = new FileReader()

  reader.onloadend = () => {
    const value = reader.result

    if (value) {
      document.getElementById("image-cover")?.setAttribute("src", value.toString())
    }
  }

  reader.readAsDataURL(image)
}

type BookFormProps = {
  submit: () => void
  editPage?: boolean
}

export default function BookForm({ submit, editPage }: BookFormProps) {
  const { slug } = useParams()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(BookFormSchema)
  })
  const [image, setImage] = useState("")

  useEffect(() => {
    if (editPage) {
      const getData = async () => {
        const book: book = await fetch(`http://localhost:8000/book/${slug}`).then(res => res.json())

        const values = getValues()

        let i: "title" | "description" | "author" | "publishedDate" | "coverImage"
        for (i in values) {
          if (i == "publishedDate") {
            setValue(i, book[i] as unknown as Date)
          } else {
            setValue(i, book[i])
          }
        }

        setImage(book.coverImage)
      }

      getData()
    }
  }, [])

  return (
    <FormContainer id="form" encType="multipart/form-data" method="post" onSubmit={handleSubmit(submit)}>
      <Container width="60">
        <FormGroup>
          <FormLabel>Título</FormLabel>
          <FormInput {...register("title")} type="text" />
          {errors.title?.message && <ErrorMessage>{errors.title?.message as string}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <FormLabel>Data de Publicação</FormLabel>
          <FormInput {...register("publishedDate")} type="date" />
          {errors.publishedDate?.message && <ErrorMessage>{errors.publishedDate?.message as string}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <FormLabel>Autor</FormLabel>
          <FormInput {...register("author")} type="text" />
          {errors.author?.message && <ErrorMessage>{errors.author?.message as string}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <FormLabel>Descrição</FormLabel>
          <FormTextarea {...register("description")} />
          {errors.description?.message && <ErrorMessage>{errors.description?.message as string}</ErrorMessage>}
        </FormGroup>
        <Button
          value="Send"
          background="green"
          color="#fff"
          padding="0.5rem 1rem"
        />
      </Container>
      <Container width="40">
        <FormGroup>
          <FormLabel>Capa</FormLabel>
          <ImageContainer>
            <FormInput
              {...register("coverImage")}
              type="file"
              className="file-input"
              onChange={(e) => e.target.files && handleChangeImage(e.target.files[0])}
            />
            <Image id="image-cover" src={image ? image : addImage} alt="Capa do livro" />
          </ImageContainer>
          {errors.coverImage?.message && <ErrorMessage>{errors.coverImage?.message as string}</ErrorMessage>}
        </FormGroup>
      </Container>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width ? `${width}%` : "100%"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
`

const FormLabel = styled.label`
  font-size: 1.25rem;
  text-style: uppercase;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  border: 1px solid #687075;

  &.file-input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    inset: 0;
    padding: 0;
    border: none;
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  border: 1px solid #687075;
  resize: none
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
`

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: #f00;
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
`