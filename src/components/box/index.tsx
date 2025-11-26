import styled from "styled-components";
import type { ReactNode } from "react";

const Block = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: start;
`;

type BoxProps = {
  children: ReactNode;
};

function Box({ children }: BoxProps) {
  return <Block>{children}</Block>;
}

export default Box;
