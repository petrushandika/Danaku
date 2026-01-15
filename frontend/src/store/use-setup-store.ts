import { create } from "zustand";
import {
  SetupConfig,
  getSetup,
  updateSetup as apiUpdateSetup,
  addItem as apiAddItem,
  deleteItem as apiDeleteItem,
  updateItem as apiUpdateItem,
} from "@/lib/api/setup";
import { toast } from "sonner";

interface SetupStore {
  setup: SetupConfig | null;
  isLoading: boolean;
  error: string | null;

  fetchSetup: () => Promise<void>;
  updateSetup: (data: Partial<SetupConfig>) => Promise<void>;
  addItem: (category: string, itemName: string) => Promise<void>;
  removeItem: (category: string, itemName: string) => Promise<void>;
  updateItem: (
    category: string,
    oldName: string,
    newName: string
  ) => Promise<void>;
}

export const useSetupStore = create<SetupStore>((set, get) => ({
  setup: null,
  isLoading: false,
  error: null,

  fetchSetup: async () => {
    const { setup } = get();
    // Only show loading if we haven't loaded setup yet
    if (!setup) {
      set({ isLoading: true, error: null });
    }
    try {
      const data = await getSetup();
      set({ setup: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateSetup: async (data) => {
    const { setup } = get();
    if (!setup) return;

    // Optimistic update
    const previousSetup = setup;
    set({ setup: { ...setup, ...data } });

    try {
      const updated = await apiUpdateSetup(data);
      set({ setup: updated });
    } catch (error: any) {
      set({ setup: previousSetup });
      throw error;
    }
  },

  addItem: async (category, itemName) => {
    const { setup } = get();
    if (!setup) return;

    const previousSetup = setup;

    // Optimistic update
    const currentItems =
      (setup[category as keyof SetupConfig] as string[]) || [];
    set({
      setup: {
        ...setup,
        [category]: [...currentItems, itemName],
      },
    });

    try {
      const result = await apiAddItem(category, itemName);
      set((state) => ({
        setup: state.setup
          ? { ...state.setup, [category]: result.items }
          : null,
      }));
    } catch (error: any) {
      set({ setup: previousSetup });
      throw error;
    }
  },

  removeItem: async (category, itemName) => {
    const { setup } = get();
    if (!setup) return;

    const previousSetup = setup;

    // Optimistic update
    const currentItems =
      (setup[category as keyof SetupConfig] as string[]) || [];
    set({
      setup: {
        ...setup,
        [category]: currentItems.filter((i) => i !== itemName),
      },
    });

    try {
      const result = await apiDeleteItem(category, itemName);
      set((state) => ({
        setup: state.setup
          ? { ...state.setup, [category]: result.items }
          : null,
      }));
    } catch (error: any) {
      set({ setup: previousSetup });
      throw error;
    }
  },

  updateItem: async (category, oldName, newName) => {
    const { setup } = get();
    if (!setup) return;

    const previousSetup = setup;

    // Optimistic update
    const currentItems =
      (setup[category as keyof SetupConfig] as string[]) || [];
    set({
      setup: {
        ...setup,
        [category]: currentItems.map((i) => (i === oldName ? newName : i)),
      },
    });

    try {
      const result = await apiUpdateItem(category, oldName, newName);
      set((state) => ({
        setup: state.setup
          ? { ...state.setup, [category]: result.items }
          : null,
      }));
    } catch (error: any) {
      set({ setup: previousSetup });
      throw error;
    }
  },
}));
