import styled from "styled-components"

type ButtonProps = {
  width?: string
  height?: string
  background?: string
  color?: string
  padding?: string
  border?: string
  borderRadius?: number
  value?: string
  fontSize?: string
  onClick?: unknown
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
    >
      {value}
    </ButtonComponent>
  )
}

const ButtonComponent = styled.button<Omit<ButtonProps, "value">>`
  width: ${({ width }) => width ? width : "initial"};
  height: ${({ height }) => height ? height : "initial"};
  background: ${({ background }) => background ? background : "initial"};
  color: ${({ color }) => color ? color : "initial"};
  padding: ${({ padding }) => padding ? padding : "initial"};
  border: ${({ border }) => border ? border : "initial"};
  borderRadius: ${({ borderRadius }) => borderRadius ? borderRadius : "initial"};
  font-size: ${({ fontSize }) => fontSize ? fontSize : "1rem"};
  cursor: pointer;
`