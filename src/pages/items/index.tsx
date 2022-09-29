import type { Item } from "@/stores/items";
import { useItemsStore } from "@/stores/items";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
} from "@hello-pangea/dnd";
import { FC, useCallback, useState } from "react";
import { Card } from "./components/card";

export default function Items(): ReturnType<FC> {
  const { items, addItem, removeItem, reorderItems } = useItemsStore();
  const [item, setItem] = useState<string>("");

  function onDragEnd(result: any) {
    if (!result.destination) return;
    reorderItems!(items, result.source.index, result.destination.index);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(item);
    setItem("");
  };

  const renderCard = useCallback(
    (
      card: Item,
      index: number,
      provided: DraggableProvided,
      isDragging?: boolean
    ) => {
      return (
        <Card
          refProvided={provided.innerRef}
          key={card.id}
          index={index}
          id={card.id}
          name={card.name}
          isDragging={isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onRemove={removeItem}
        />
      );
    },
    []
  );

  return (
    <div className="flex min-h-screen w-full flex-col justify-center">
      <header>
        <h1 className="font-bold">Items</h1>
        <p>Items page</p>
      </header>
      <main className="mt-8 flex flex-col items-center justify-center ">
        <div className="flex w-full flex-col space-y-2">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div ref={provided.innerRef} className="space-y-2">
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) =>
                        renderCard(
                          item,
                          index + 1,
                          provided,
                          snapshot.isDragging
                        )
                      }
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <form
          className="mt-4 flex w-full flex-col items-center space-y-2 md:w-1/2 md:flex-row md:space-x-2 md:space-y-0"
          onSubmit={handleSubmit}
        >
          <input
            className="input w-full"
            type="text"
            name="item"
            id="item"
            value={item}
            required
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full md:w-1/4">
            Add item
          </button>
        </form>
      </main>
    </div>
  );
}
