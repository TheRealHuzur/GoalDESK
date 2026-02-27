import { useCallback } from 'react';
import { supabase, isDemoMode } from '@/lib/supabase';
import { loadDemoGoals, saveDemoGoals } from '@/lib/demoData';
import { useGoalsStore } from '@/store/goalsStore';
import type { Goal, GoalInsert, GoalUpdate } from '@/types/goal';

export function useGoals() {
  const { goals, loading, error, setGoals, addGoal, updateGoalInStore, removeGoal, setLoading, setError } =
    useGoalsStore();

  // ─── Demo mode: localStorage ────────────────────────────────────────────────

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (isDemoMode) {
        setGoals(loadDemoGoals());
        return;
      }
      const { data, error: sbError } = await supabase
        .from('goaldesk_goals')
        .select('*')
        .order('created_at', { ascending: false });
      if (sbError) throw sbError;
      setGoals((data as Goal[]) ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden der Ziele.');
    } finally {
      setLoading(false);
    }
  }, [setGoals, setLoading, setError]);

  const createGoal = useCallback(
    async (data: GoalInsert) => {
      setError(null);
      try {
        if (isDemoMode) {
          const newGoal: Goal = {
            ...data,
            id: `demo-${Date.now()}`,
            user_id: 'demo',
            description: data.description,
            current_value: data.current_value ?? 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          const updated = [newGoal, ...loadDemoGoals()];
          saveDemoGoals(updated);
          addGoal(newGoal);
          return newGoal;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Nicht eingeloggt.');
        const { data: newGoal, error: sbError } = await supabase
          .from('goaldesk_goals')
          .insert({ ...data, user_id: user.id })
          .select()
          .single();
        if (sbError) throw sbError;
        addGoal(newGoal as Goal);
        return newGoal as Goal;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Fehler beim Erstellen des Ziels.';
        setError(msg);
        throw err;
      }
    },
    [addGoal, setError]
  );

  const updateGoal = useCallback(
    async (id: string, data: GoalUpdate) => {
      setError(null);
      try {
        if (isDemoMode) {
          const patch: Partial<Goal> = { ...data, updated_at: new Date().toISOString() };
          const updated = loadDemoGoals().map((g) => (g.id === id ? { ...g, ...patch } : g));
          saveDemoGoals(updated);
          updateGoalInStore(id, patch);
          return updated.find((g) => g.id === id) as Goal;
        }

        const { data: updated, error: sbError } = await supabase
          .from('goaldesk_goals')
          .update({ ...data, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
        if (sbError) throw sbError;
        updateGoalInStore(id, updated as Partial<Goal>);
        return updated as Goal;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Fehler beim Aktualisieren des Ziels.';
        setError(msg);
        throw err;
      }
    },
    [updateGoalInStore, setError]
  );

  const deleteGoal = useCallback(
    async (id: string) => {
      setError(null);
      try {
        if (isDemoMode) {
          const updated = loadDemoGoals().filter((g) => g.id !== id);
          saveDemoGoals(updated);
          removeGoal(id);
          return;
        }

        const { error: sbError } = await supabase
          .from('goaldesk_goals')
          .delete()
          .eq('id', id);
        if (sbError) throw sbError;
        removeGoal(id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Fehler beim Löschen des Ziels.';
        setError(msg);
        throw err;
      }
    },
    [removeGoal, setError]
  );

  return { goals, loading, error, fetchGoals, createGoal, updateGoal, deleteGoal };
}
