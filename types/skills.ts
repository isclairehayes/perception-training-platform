export type SkillType =
  | 'microexpressions'
  | 'body_language'
  | 'active_listening'
  | 'memory'
  | 'bayesian_reasoning';

export const SKILL_NAMES: Record<SkillType, string> = {
  microexpressions: 'Microexpresiones',
  body_language: 'Lenguaje Corporal',
  active_listening: 'Escucha Activa',
  memory: 'Memoria',
  bayesian_reasoning: 'Razonamiento Bayesiano',
};

export const SKILL_DESCRIPTIONS: Record<SkillType, string> = {
  microexpressions: 'Detecta emociones a través de expresiones faciales sutiles',
  body_language: 'Lee el estado emocional y dinámicas de poder a través del cuerpo',
  active_listening: 'Extrae información implícita de lo que dicen las personas',
  memory: 'Memoriza y recupera información usando el método de loci',
  bayesian_reasoning: 'Razona con probabilidades y actualiza creencias ante nueva evidencia',
};

export interface SkillProgress {
  id: string;
  user_id: string;
  skill: SkillType;
  current_level: number; // 1-5
  total_exercises_completed: number;
  last_practiced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SkillMetric {
  id: string;
  user_id: string;
  skill: SkillType;
  metric_name: string;
  metric_value: number;
  recorded_at: string;
  created_at: string;
}

export interface RadarData {
  skill: string;
  level: number;
  fullMark: number;
}
