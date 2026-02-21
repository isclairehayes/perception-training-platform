import { SkillType } from './skills';

export interface BaseExercise {
  id: string;
  skill: SkillType;
  level: number; // 1-5
  type: string;
}

export interface MicroexpressionExercise extends BaseExercise {
  skill: 'microexpressions';
  type: 'image' | 'video';
  media_url: string;
  correct_answer: Emotion;
  facs_explanation: string;
  duration_ms?: number; // how long to show
}

export type Emotion =
  | 'happiness'
  | 'sadness'
  | 'anger'
  | 'fear'
  | 'surprise'
  | 'disgust'
  | 'contempt';

export const EMOTIONS: Emotion[] = [
  'happiness',
  'sadness',
  'anger',
  'fear',
  'surprise',
  'disgust',
  'contempt',
];

export const EMOTION_LABELS: Record<Emotion, string> = {
  happiness: 'Felicidad',
  sadness: 'Tristeza',
  anger: 'Ira',
  fear: 'Miedo',
  surprise: 'Sorpresa',
  disgust: 'Disgusto',
  contempt: 'Desprecio',
};

export interface BodyLanguageExercise extends BaseExercise {
  skill: 'body_language';
  type: 'video' | 'image_sequence';
  media_url: string;
  questions: BodyLanguageQuestion[];
  baseline_context?: string; // if exercise includes baseline
}

export interface BodyLanguageQuestion {
  id: string;
  question: string;
  type: 'emotional_state' | 'power_dynamic' | 'comfort_level' | 'incongruence';
  correct_answer: string;
  explanation: string;
}

export interface ActiveListeningExercise extends BaseExercise {
  skill: 'active_listening';
  type: 'transcription' | 'audio';
  content: string; // text or audio URL
  questions: ActiveListeningQuestion[];
}

export interface ActiveListeningQuestion {
  id: string;
  question: string;
  correct_implicit_info: string[];
  incorrect_inferences: string[]; // for false positive tracking
  explanation: string;
}

export interface MemoryExercise extends BaseExercise {
  skill: 'memory';
  type: 'loci_setup' | 'faces_names' | 'general_items';
  items: MemoryItem[];
  retrieval_delay: 'immediate' | '10min' | '24h';
}

export interface MemoryItem {
  id: string;
  type: 'face_name' | 'general';
  image_url?: string;
  name?: string;
  trait?: string;
  text?: string;
}

export interface BayesianExercise extends BaseExercise {
  skill: 'bayesian_reasoning';
  type: 'probability_update' | 'calibration' | 'bias_detection';
  scenario: string;
  initial_question: string;
  updates?: BayesianUpdate[];
  correct_probability?: number;
  bias_name?: string;
  bias_explanation?: string;
}

export interface BayesianUpdate {
  new_evidence: string;
  correct_updated_probability: number;
}

export interface ExerciseResult {
  id: string;
  session_id: string;
  user_id: string;
  skill: SkillType;
  level: number;
  exercise_type: string;
  correct: boolean;
  response_time_ms: number;
  user_answer: any;
  correct_answer: any;
  feedback_data: any;
  created_at: string;
}
