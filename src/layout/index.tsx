import styled from "styled-components";
import Box from "@/components/box";
import RowCell from "@/components/rowCell";
import { items } from "@/constants/items";
import type { InnerItem, BlockItem } from "@/constants/items";

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
  background: oklch(92.2% 0 0);
`;

function Layout() {
  return (
    <Container>
      {items?.map(({ name, innerItems }: BlockItem) => {
        return (
          <Box key={name}>
            {innerItems?.map(({ id, name }: InnerItem) => {
              return <RowCell key={id} label={name} />;
            })}
          </Box>
        );
      })}
    </Container>
  );
}

export default Layout;
