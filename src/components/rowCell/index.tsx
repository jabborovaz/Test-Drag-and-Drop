import styled from "styled-components";

const Cell = styled.div`
  width: 100%;
  padding: 0 12px;
  border-radius: 15px;
  height: 48px;
  display: flex;
  align-items: center;
  background: oklch(76.5% 0.177 163.223);
  box-shadow: var(--shadow-lg);
`;

interface PropsI {
  label: string;
}

function RowCell({ label }: PropsI) {
  return <Cell>{label}</Cell>;
}

export default RowCell;
