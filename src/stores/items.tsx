import create from "zustand";

export type Item = {
  id: number;
  name: string;
};

export type _ItemStore = {
  items: Item[];
  addItem: (item: string) => void;
  removeItem: (id: number) => void;
  reorderItems?: (list: Item[], startIndex: number, endIndex: number) => void;
};

export const useItemsStore = create<_ItemStore>((set) => ({
  items: [{ id: 1, name: "Bear" }],
  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          id: (state.items.sort((a, b) => a.id - b.id).at(-1)?.id ?? 0) + 1,
          name: item,
        },
      ],
    })),
  removeItem: (item) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== item) })),
  reorderItems: (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    set(() => ({ items: result }));
  },
}));
