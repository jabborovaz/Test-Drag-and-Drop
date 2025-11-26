import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import RowCell from "@/components/rowCell";

interface RowProps {
  id: number;
  label: string;
  isActive: boolean;
}

const DraggableRow: React.FC<RowProps> = ({ id, label, isActive }) => {
  const [isPressed, setIsPressed] = useState(false);
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

  const style: React.CSSProperties = {
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
      <RowCell label={label} isDragging={isDragging || isPressed || isActive} />
    </div>
  );
};

export default DraggableRow;
