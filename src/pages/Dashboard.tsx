import React, { useEffect, useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import type { Goal } from '@/types/goal';
import { GoalCard } from '@/components/goals/GoalCard';
import { GoalEditor } from '@/components/goals/GoalEditor';
import { Button } from '@/components/ui/Button';

export function Dashboard() {
  const { goals, loading, error, fetchGoals } = useGoals();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const openNew = () => {
    setEditingGoal(null);
    setEditorOpen(true);
  };

  const openEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingGoal(null);
  };

  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Meine Ziele</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {goals.length === 0 ? 'Noch keine Ziele definiert' : `${goals.length} Ziel${goals.length !== 1 ? 'e' : ''}`}
          </p>
        </div>
        <Button onClick={openNew} size="md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Neues Ziel
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && goals.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 h-52 animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && goals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-sky-400/10 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">Noch keine Ziele</h3>
          <p className="text-slate-500 text-sm max-w-xs mb-6">
            Erstelle dein erstes Ziel und wähle eine Visualisierung, die deinen Fortschritt zeigt.
          </p>
          <Button onClick={openNew}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Erstes Ziel erstellen
          </Button>
        </div>
      )}

      {/* Goal grid */}
      {goals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onEdit={openEdit} />
          ))}
        </div>
      )}

      {/* Goal editor modal */}
      <GoalEditor open={editorOpen} onClose={closeEditor} editingGoal={editingGoal} />
    </>
  );
}
