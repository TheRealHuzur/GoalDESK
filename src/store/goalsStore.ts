import { create } from 'zustand';
import type { Goal } from '@/types/goal';

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  setGoals: (goals: Goal[]) => void;
  addGoal: (goal: Goal) => void;
  updateGoalInStore: (id: string, data: Partial<Goal>) => void;
  removeGoal: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGoalsStore = create<GoalsState>((set) => ({
  goals: [],
  loading: false,
  error: null,

  setGoals: (goals) => set({ goals }),

  addGoal: (goal) =>
    set((state) => ({ goals: [goal, ...state.goals] })),

  updateGoalInStore: (id, data) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? { ...g, ...data } : g)),
    })),

  removeGoal: (id) =>
    set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));
