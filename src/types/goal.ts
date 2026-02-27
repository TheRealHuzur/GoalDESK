export type ChartType = 'bar' | 'pie' | 'donut' | 'milestone' | 'hero';

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  metric_label: string;
  target_value: number;
  current_value: number;
  chart_type: ChartType;
  created_at: string;
  updated_at: string;
}

export type GoalInsert = Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
export type GoalUpdate = Partial<GoalInsert>;
