import { useState, useEffect } from 'react';
import type { Goal, ChartType, GoalInsert } from '@/types/goal';
import { useGoals } from '@/hooks/useGoals';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { BarChart } from './charts/BarChart';
import { PieChart } from './charts/PieChart';
import { DonutChart } from './charts/DonutChart';
import { MilestoneBar } from './charts/MilestoneBar';
import { HeroNumber } from './charts/HeroNumber';

interface GoalEditorProps {
  open: boolean;
  onClose: () => void;
  editingGoal?: Goal | null;
}

const CHART_TYPES: { type: ChartType; label: string; description: string }[] = [
  { type: 'bar', label: 'Balken', description: 'Horizontaler Fortschrittsbalken' },
  { type: 'pie', label: 'Torte', description: 'Klassisches Tortendiagramm' },
  { type: 'donut', label: 'Donut', description: 'Ringdiagramm mit Prozentzahl' },
  { type: 'milestone', label: 'Meilensteine', description: 'Balken mit 25/50/75/100%-Markierungen' },
  { type: 'hero', label: 'Hero-Zahl', description: 'Große Zahl mit Fortschrittsring' },
];

interface FormState {
  title: string;
  description: string;
  metric_label: string;
  start_value: string;
  target_value: string;
  current_value: string;
  chart_type: ChartType;
}

const EMPTY_FORM: FormState = {
  title: '',
  description: '',
  metric_label: '',
  start_value: '0',
  target_value: '',
  current_value: '0',
  chart_type: 'bar',
};

function PreviewChart({ type, start, value, target, label }: { type: ChartType; start: number; value: number; target: number; label: string }) {
  const props = { start, value, target, label, compact: true };
  switch (type) {
    case 'bar': return <BarChart {...props} />;
    case 'pie': return <PieChart {...props} />;
    case 'donut': return <DonutChart {...props} />;
    case 'milestone': return <MilestoneBar {...props} />;
    case 'hero': return <HeroNumber {...props} />;
  }
}

export function GoalEditor({ open, onClose, editingGoal }: GoalEditorProps) {
  const { createGoal, updateGoal, deleteGoal } = useGoals();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const isEditing = !!editingGoal;

  useEffect(() => {
    if (editingGoal) {
      setForm({
        title: editingGoal.title,
        description: editingGoal.description ?? '',
        metric_label: editingGoal.metric_label,
        start_value: String(editingGoal.start_value ?? 0),
        target_value: String(editingGoal.target_value),
        current_value: String(editingGoal.current_value),
        chart_type: editingGoal.chart_type,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
    setConfirmDelete(false);
  }, [editingGoal, open]);

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) newErrors.title = 'Titel erforderlich';
    if (!form.metric_label.trim()) newErrors.metric_label = 'Kennzahl-Label erforderlich';
    const sv = parseFloat(form.start_value);
    if (form.start_value === '' || isNaN(sv)) newErrors.start_value = 'Wert erforderlich';
    const tv = parseFloat(form.target_value);
    if (form.target_value === '' || isNaN(tv)) newErrors.target_value = 'Wert erforderlich';
    if (!isNaN(sv) && !isNaN(tv) && sv === tv) newErrors.target_value = 'Start und Ziel müssen sich unterscheiden';
    const cv = parseFloat(form.current_value);
    if (form.current_value === '' || isNaN(cv)) newErrors.current_value = 'Wert erforderlich';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const payload: GoalInsert = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        metric_label: form.metric_label.trim(),
        start_value: parseFloat(form.start_value),
        target_value: parseFloat(form.target_value),
        current_value: parseFloat(form.current_value),
        chart_type: form.chart_type,
      };
      if (isEditing && editingGoal) {
        await updateGoal(editingGoal.id, payload);
      } else {
        await createGoal(payload);
      }
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (!editingGoal) return;
    setDeleting(true);
    try {
      await deleteGoal(editingGoal.id);
      onClose();
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const previewStart = parseFloat(form.start_value) || 0;
  const previewValue = parseFloat(form.current_value) || 0;
  const previewTarget = form.target_value === '' ? 100 : parseFloat(form.target_value) || 100;
  const previewLabel = form.metric_label || 'Einheiten';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Ziel bearbeiten' : 'Neues Ziel'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Basic fields */}
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Titel"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="z.B. 1000 km laufen"
            error={errors.title}
          />
          <Textarea
            label="Beschreibung (optional)"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Kurze Beschreibung des Ziels…"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Kennzahl-Label"
            value={form.metric_label}
            onChange={(e) => set('metric_label', e.target.value)}
            placeholder="z.B. km, kg"
            error={errors.metric_label}
          />
          <Input
            label="Startwert"
            type="number"
            step="any"
            value={form.start_value}
            onChange={(e) => set('start_value', e.target.value)}
            placeholder="0"
            error={errors.start_value}
          />
          <Input
            label="Aktueller Wert"
            type="number"
            step="any"
            value={form.current_value}
            onChange={(e) => set('current_value', e.target.value)}
            placeholder="75"
            error={errors.current_value}
          />
          <Input
            label="Zielwert"
            type="number"
            step="any"
            value={form.target_value}
            onChange={(e) => set('target_value', e.target.value)}
            placeholder="1000"
            error={errors.target_value}
          />
        </div>

        {/* Chart type selector */}
        <div>
          <p className="text-sm font-medium text-slate-300 mb-2">Visualisierung</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {CHART_TYPES.map(({ type, label, description }) => {
              const selected = form.chart_type === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => set('chart_type', type)}
                  className={[
                    'flex flex-col items-center gap-2 p-3 rounded-xl border text-left transition-all',
                    selected
                      ? 'border-sky-400 bg-sky-400/10'
                      : 'border-slate-700 bg-slate-900 hover:border-slate-600',
                  ].join(' ')}
                >
                  <div className="w-full flex items-center justify-center h-12 pointer-events-none">
                    <PreviewChart
                      type={type}
                      start={previewStart}
                      value={previewValue}
                      target={previewTarget}
                      label={previewLabel}
                    />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${selected ? 'text-sky-400' : 'text-slate-300'}`}>
                      {label}
                    </p>
                    <p className="text-xs text-slate-500 leading-tight">{description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-700">
          {/* Delete — only when editing */}
          {isEditing ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              loading={deleting}
              onClick={handleDelete}
              onBlur={() => setConfirmDelete(false)}
            >
              {confirmDelete ? 'Wirklich löschen?' : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                  Löschen
                </>
              )}
            </Button>
          ) : (
            <span /> /* spacer so Save/Cancel stay right-aligned */
          )}

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" loading={saving}>
              {isEditing ? 'Speichern' : 'Ziel erstellen'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
