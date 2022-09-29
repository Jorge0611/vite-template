import { RefObject, Ref } from "react";
export const ItemTypes = {
  CARD: "card",
};

export interface CardProps {
  index?: number;
  id: number;
  name: string;
  onRemove: (id: number) => void;
  refProvided?: Ref<HTMLDivElement>;
  isDraggingOver?: boolean;
  isDragging?: boolean;
}

export function Card({
  index = 0,
  id,
  name,
  onRemove,
  refProvided,
  isDragging,
  ...props
}: CardProps) {
  return (
    <div
      ref={refProvided}
      {...props}
      className={`flex w-full items-center justify-between  p-3 ${
        isDragging
          ? "bg-sky-700 text-white shadow-2xl "
          : "border-2 border-sky-700"
      } `}
    >
      <span className="mr-12 font-semibold uppercase">
        {index + " - " + name}
      </span>
      <button className="btn hover:text-red-600" onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  );
}
