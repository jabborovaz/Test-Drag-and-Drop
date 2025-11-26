import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import RowCell from "@/components/rowCell";

interface RowProps {
  id: number;
  label: string;
}

const DraggableRow: React.FC<RowProps> = ({ id, label }) => {
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
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <RowCell label={label} />
    </div>
  );
};

export default DraggableRow;
