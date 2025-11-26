import { useState } from "react";
import styled from "styled-components";
import Box from "@/components/box";
import { items } from "@/constants/items";
import DraggableRow from "@/components/dragAndDrop/draggableRow";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
  const [itemsState, setItemsState] = useState(items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 1 },
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Найдём блок, внутри которого происходит drag
    setItemsState((prev) =>
      prev.map((block) => {
        const ids = block.innerItems.map((i) => i.id);
        if (
          ids.includes(active.id as number) &&
          ids.includes(over.id as number)
        ) {
          const oldIndex = ids.indexOf(active.id as number);
          const newIndex = ids.indexOf(over.id as number);
          return {
            ...block,
            innerItems: arrayMove(block.innerItems, oldIndex, newIndex),
          };
        }
        return block;
      })
    );
  };
  return (
    <Container>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        {itemsState.map((block) => (
          <Box key={block.name}>
            <SortableContext
              items={block.innerItems.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {block.innerItems.map((item) => (
                <DraggableRow key={item.id} id={item.id} label={item.name} />
              ))}
            </SortableContext>
          </Box>
        ))}
      </DndContext>
    </Container>
  );
}

export default Layout;
