import styled from "styled-components";
import Box from "@/components/box";
import RowCell from "@/components/rowCell";

const Container = styled.div`
  width: 90%;
  max-width: 1050px;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  column-gap: 15px;
  margin: 20px auto;
  padding: 10px 15px;
  background: oklch(87.1% 0.006 286.286);
`;

function Layout() {
  return (
    <Container>
      <Box>
        <RowCell label="Свойство 3" />
      </Box>
    </Container>
  );
}

export default Layout;
