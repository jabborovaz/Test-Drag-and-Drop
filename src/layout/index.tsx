import { useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@/components/box";
import { items } from "@/constants/items";
import DraggableRow from "@/components/dragAndDrop/draggableRow";
import Button from "@/components/ui/ownBtn";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
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

const ActionsContainer = styled.div`
  width: 90%;
  max-width: 1050px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 15px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    row-gap: 15px;
  }
`;

function Layout() {
  const [itemsState, setItemsState] = useState(items);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
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

  const handleRefreshClick = () => {
    setItemsState(items);
  };

  const handleSave = () => {
    localStorage.setItem("items", JSON.stringify(itemsState));
  };

  const handleClear = () => {
    localStorage.removeItem("items");
    setItemsState(items);
  };

  useEffect(() => {
    const localItems = localStorage.getItem("items");

    if (localItems) {
      setItemsState(JSON.parse(localItems));
    }
  }, []);
  return (
    <>
      <ActionsContainer>
        <Button color="#28a745" onClick={handleSave}>
          Сохранить
        </Button>
        <Button onClick={handleRefreshClick}>Восстановить</Button>
        <Button color="#ff6347" onClick={handleClear}>
          Очистить
        </Button>
      </ActionsContainer>

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
    </>
  );
}

export default Layout;
