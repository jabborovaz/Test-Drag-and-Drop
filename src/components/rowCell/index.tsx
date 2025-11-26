import styled from "styled-components";

const Cell = styled.div<{ isDragging?: boolean }>`
  width: 100%;
  padding: 0 12px;
  border-radius: 15px;
  height: 48px;
  display: flex;
  align-items: center;
  background: oklch(87.1% 0.15 154.449);
  box-shadow: var(--shadow-lg);
  border: ${({ isDragging }) =>
    isDragging
      ? "2px solid oklch(52.7% 0.154 150.069)"
      : "2px solid transparent"};
  transition: border 0.2s ease, background 0.2s ease;
`;

interface PropsI {
  label: string;
  isDragging?: boolean;
}

function RowCell({ label, isDragging }: PropsI) {
  return <Cell isDragging={isDragging}>{label}</Cell>;
}

export default RowCell;
