import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RowCell from "@/components/rowCell";

interface RowProps {
  id: number;
  label: string;
}

const DraggableRow: React.FC<RowProps> = ({ id, label }) => {
  const [isPressed, setIsPressed] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "grab",
    width: "100%",
    touchAction: "none",
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <RowCell label={label} isDragging={isDragging || isPressed} />
    </div>
  );
};

export default DraggableRow;
