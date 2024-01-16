import styled from "styled-components";
import Button from "../atoms/Button";

type PaginationProps = {
  onBackward: () => void
  onForward: () => void
  hasBack: boolean
  hasForward: boolean
}

export default function Pagination({ hasBack, hasForward, onBackward, onForward }: PaginationProps) {
  return (
    <Container>
      {hasBack && <Button
        onClick={() => onBackward()}
        background="darkblue"
        color="#fff"
        padding="0.5rem 1rem"
        value="Previous"
      />}
      {hasForward && <Button
        onClick={() => onForward()}
        background="darkblue"
        color="#fff"
        padding="0.5rem 1rem"
        value="Next"
      />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`