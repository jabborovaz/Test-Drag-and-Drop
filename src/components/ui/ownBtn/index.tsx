import styled from "styled-components";

interface ButtonProps {
  color?: string;
}

const Button = styled.button<ButtonProps>`
  display: block;
  width: 180px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background-color: ${({ color }) => color || "#6200ee"};
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ color }) =>
      color ? darkenColor(color, 0.1) : "#4b00b5"};
  }
`;

function darkenColor(hex: string, amount: number) {
  const col = hex.startsWith("#") ? hex.slice(1) : hex;
  const num = parseInt(col, 16);
  let r = Math.max(0, ((num >> 16) & 0xff) - 255 * amount);
  let g = Math.max(0, ((num >> 8) & 0xff) - 255 * amount);
  let b = Math.max(0, (num & 0xff) - 255 * amount);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export default Button;
