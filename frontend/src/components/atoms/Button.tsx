import { ReactNode } from "react"
import styled from "styled-components"

type ButtonProps = {
  width?: string
  height?: string
  background?: string
  color?: string
  padding?: string
  border?: string
  borderRadius?: string
  value?: string | ReactNode
  fontSize?: string
  onClick?: unknown
  className?: string
  display?: string
  zIndex?: string
}

export default function Button({
  width,
  height,
  background,
  color,
  padding,
  border,
  borderRadius,
  value,
  onClick,
  fontSize,
  className,
  display,
  zIndex,
}: ButtonProps) {
  return (
    <ButtonComponent
      width={width}
      height={height}
      background={background}
      color={color}
      padding={padding}
      border={border}
      borderRadius={borderRadius}
      onClick={onClick}
      fontSize={fontSize}
      className={className}
      display={display}
      zIndex={zIndex}
    >
      {value}
    </ButtonComponent>
  )
}

const ButtonComponent = styled.button<Omit<ButtonProps, "value">>`
  display: ${({ display }) => display ? display : "flex"};
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width ? width : "initial"};
  height: ${({ height }) => height ? height : "initial"};
  background: ${({ background }) => background ? background : "initial"};
  color: ${({ color }) => color ? color : "initial"};
  padding: ${({ padding }) => padding ? padding : "initial"};
  border: ${({ border }) => border ? border : "initial"};
  border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : "initial"};
  font-size: ${({ fontSize }) => fontSize ? fontSize : "1rem"};
  z-index: ${({ zIndex }) => zIndex ? zIndex : "1"};
  cursor: pointer;

  @media screen and (max-width: 768px) {
    &.appear768 {
      display: flex;
    }
  }

`