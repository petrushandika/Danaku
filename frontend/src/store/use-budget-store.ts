import { create } from "zustand";
import {
  Budget,
  getBudget,
  createBudget,
  updateBudget,
} from "@/lib/api/budgets";

interface BudgetStore {
  budget: Budget | null;
  isLoading: boolean;
  error: string | null;

  fetchBudget: (yearMonth: string) => Promise<void>;
  createBudget: (
    yearMonth: string,
    income: Record<string, number>
  ) => Promise<void>;
  updateBudgetIncome: (source: string, amount: number) => Promise<void>;
  updateBudgetAllocation: (
    category: string,
    item: string,
    amount: number
  ) => Promise<void>;
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  budget: null,
  isLoading: false,
  error: null,

  fetchBudget: async (yearMonth) => {
    const { budget } = get();
    // Only show loading if we don't have the requested budget
    if (budget?.yearMonth !== yearMonth) {
      set({ isLoading: true, error: null });
    }
    try {
      const data = await getBudget(yearMonth);
      set({ budget: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createBudget: async (yearMonth, income) => {
    set({ isLoading: true, error: null });
    try {
      const newBudget = await createBudget({ yearMonth, income });
      set({ budget: newBudget, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateBudgetIncome: async (source, amount) => {
    const { budget } = get();
    if (!budget) return;

    const previousBudget = budget;

    // Optimistic Update
    const updatedIncome = { ...budget.income, [source]: amount };
    const optimisticBudget = {
      ...budget,
      income: updatedIncome,
    };
    // Recalculate summary locally
    optimisticBudget.summary = calculateSummary(optimisticBudget);

    set({ budget: optimisticBudget });

    try {
      const updated = await updateBudget(budget.yearMonth, {
        income: updatedIncome,
      });
      set({ budget: updated });
    } catch (error: any) {
      set({ budget: previousBudget });
      throw error;
    }
  },

  updateBudgetAllocation: async (category, item, amount) => {
    const { budget } = get();
    if (!budget) return;

    const previousBudget = budget;
    const isSaving = category === "Savings";

    // Optimistic Update
    const optimisticBudget = { ...budget };
    let updateData: any = {};

    if (isSaving) {
      const newSavings = { ...budget.savingsAllocation, [item]: amount };
      optimisticBudget.savingsAllocation = newSavings;
      updateData.savingsAllocation = newSavings;
    } else {
      const newExpenses = { ...budget.expenses, [item]: amount };
      optimisticBudget.expenses = newExpenses;
      updateData.expenses = newExpenses;
    }

    // Recalculate summary locally
    optimisticBudget.summary = calculateSummary(optimisticBudget);
    set({ budget: optimisticBudget });

    try {
      const updated = await updateBudget(budget.yearMonth, updateData);
      set({ budget: updated });
    } catch (error: any) {
      set({ budget: previousBudget });
      throw error;
    }
  },
}));

// Helper to recalculate summary on the fly
const calculateSummary = (budget: Budget) => {
  const totalIncome = Object.values(budget.income || {}).reduce(
    (a, b) => a + b,
    0
  );
  const totalExpenses = Object.values(budget.expenses || {}).reduce(
    (a, b) => a + b,
    0
  );
  const totalSavings = Object.values(budget.savingsAllocation || {}).reduce(
    (a, b) => a + b,
    0
  );

  const nonAllocated = totalIncome - totalExpenses - totalSavings;
  const allocatedPercentage =
    totalIncome > 0 ? ((totalExpenses + totalSavings) / totalIncome) * 100 : 0;

  return {
    totalIncome,
    totalExpenses,
    totalSavings,
    nonAllocated,
    allocatedPercentage,
  };
};
