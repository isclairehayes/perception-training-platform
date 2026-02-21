/**
 * Body Language Module Types
 * Perception Training Platform - Phase 2
 */

export interface BodyLanguageExerciseData {
  id: string;
  skill: 'body_language';
  level: number; // 1-5
  type: 'video' | 'image' | 'image_sequence';
  media_url: string;
  title: string;
  description: string;
  
  // Baseline concept
  baseline_context?: string;
  baseline_duration_sec?: number;
  deviation_timestamp_sec?: number;
  
  // Categorization
  category: BodyLanguageCategory;
  difficulty: ExerciseDifficulty;
  
  // Questions
  questions: BodyLanguageQuestion[];
  
  // Learning metadata
  theory_tags: string[];
  references: string[];
}

export type BodyLanguageCategory = 
  | 'neutral'
  | 'estrés'
  | 'confianza'
  | 'mentira'
  | 'atracción'
  | 'incomodidad';

export type ExerciseDifficulty = 
  | 'easy'
  | 'medium'
  | 'hard'
  | 'very_hard'
  | 'expert';

export interface BodyLanguageQuestion {
  id: string;
  question: string;
  type: QuestionType;
  correct_answer: string;
  options?: string[]; // For multiple choice
  explanation: string;
}

export type QuestionType = 
  | 'emotional_state'
  | 'power_dynamic'
  | 'comfort_level'
  | 'incongruence';

export interface BodyLanguageExerciseResult {
  exerciseId: string;
  totalQuestions: number;
  correctAnswers: number;
  falsePositives: number; // Critical for body language
  responseTimeMs: number;
  accuracy: number; // Percentage
  responses: QuestionResponse[];
}

export interface QuestionResponse {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  responseTimeMs: number;
}

/**
 * Level System
 * 
 * Level 1: Individual Obvious Signals
 * - Crossed arms, avoiding eye contact, expansive postures
 * - Single, clear signals
 * - Minimal context required
 * 
 * Level 2: Signal Clusters
 * - Multiple simultaneous signals
 * - Mirroring, stress clusters
 * - Pattern recognition
 * 
 * Level 3: Context vs Behavior
 * - Appropriateness of emotion in context
 * - Cultural considerations
 * - Situational analysis
 * 
 * Level 4: Incongruence Detection
 * - Verbal vs non-verbal mismatches
 * - Microexpression leakage
 * - Timing anomalies
 * - Contradictory clusters
 * 
 * Level 5: Subtle Power Dynamics
 * - Who speaks first, interruption patterns
 * - Spatial control, territorial markers
 * - Microinteractions and status negotiations
 */
export interface LevelDescriptor {
  level: number;
  name: string;
  description: string;
  focus: string[];
  theoryBase: string[];
}

export const LEVEL_DESCRIPTORS: LevelDescriptor[] = [
  {
    level: 1,
    name: 'Señales Obvias Individuales',
    description: 'Identifica señales corporales básicas y obvias',
    focus: [
      'Brazos cruzados',
      'Mirada esquiva',
      'Posturas expansivas',
      'Tocarse el cuello',
      'Dirección de los pies'
    ],
    theoryBase: [
      'Defensive postures (Navarro)',
      'Barrier signals (Pease)',
      'Pacifying behaviors (Navarro)',
      'Feet as honest indicators (Navarro)'
    ]
  },
  {
    level: 2,
    name: 'Clusters de Señales',
    description: 'Detecta combinaciones de múltiples señales simultáneas',
    focus: [
      'Clusters de estrés (3+ señales)',
      'Mirroring y rapport',
      'Steepling y confianza',
      'Bloqueo con objetos',
      'Dilatación pupilar'
    ],
    theoryBase: [
      'Cluster rule (Navarro)',
      'Mirroring effect (Chartrand & Bargh)',
      'Confidence displays (Navarro)',
      'Autonomic responses (Pease)'
    ]
  },
  {
    level: 3,
    name: 'Contexto vs Comportamiento',
    description: 'Evalúa si el comportamiento es apropiado para el contexto',
    focus: [
      'Emociones apropiadas vs inapropiadas',
      'Comportamiento congruente con contexto',
      'Variaciones culturales',
      'Baseline deviations en contexto'
    ],
    theoryBase: [
      'Context dependency (Ekman)',
      'Cultural display rules (Ekman)',
      'Appropriate emotions (Ekman)',
      'Proxemics (Hall)'
    ]
  },
  {
    level: 4,
    name: 'Detección de Incongruencias',
    description: 'Identifica contradicciones entre canales de comunicación',
    focus: [
      'Verbal vs no-verbal mismatches',
      'Microexpresiones que contradicen palabras',
      'Timing entre gesto y palabra',
      'Clusters contradictorios (cara vs pies)',
      'Freeze, flight, fight responses'
    ],
    theoryBase: [
      'Mehrabian rule (Mehrabian)',
      'Leakage theory (Ekman)',
      'Temporal incongruence (Ekman)',
      'Limbic reactions (Navarro)',
      'Feet as truth (Navarro)'
    ]
  },
  {
    level: 5,
    name: 'Dinámicas de Poder Sutiles',
    description: 'Analiza microdinámicas de estatus y poder',
    focus: [
      'Quién habla primero tras silencio',
      'Patrones de interrupción',
      'Control de espacio (proxemics)',
      'Altura relativa',
      'Microexpresiones de desprecio',
      'Territorialidad (asientos, objetos)',
      'Timing de adaptadores (pre vs post)',
      'Mirroring auténtico vs falso'
    ],
    theoryBase: [
      'Power plays (Greene)',
      'Status signals (Cialdini)',
      'Conversational dominance (Tannen)',
      'Proxemics and power (Hall, Pease)',
      'Contempt as corrosion (Gottman)',
      'Territorial behavior (Goffman)',
      'Authentic mirroring (Chartrand & Bargh)'
    ]
  }
];

/**
 * Theory References
 */
export interface TheoryReference {
  id: string;
  author: string;
  title: string;
  keyContributions: string[];
  relevantLevels: number[];
}

export const BODY_LANGUAGE_THEORY: TheoryReference[] = [
  {
    id: 'navarro_what_every_body',
    author: 'Joe Navarro',
    title: 'What Every Body is Saying',
    keyContributions: [
      'Pacifying behaviors',
      'Limbic responses (freeze, flight, fight)',
      'Feet as most honest indicators',
      'Baseline and deviations',
      'Neck touching as stress indicator',
      'Cluster rule for reliability'
    ],
    relevantLevels: [1, 2, 3, 4, 5]
  },
  {
    id: 'pease_body_language',
    author: 'Allan Pease',
    title: 'The Definitive Book of Body Language',
    keyContributions: [
      'Territorial displays',
      'Power posing',
      'Pupil dilation',
      'Mirroring and rapport',
      'Cultural variations',
      'Proxemics and personal space'
    ],
    relevantLevels: [1, 2, 3, 5]
  },
  {
    id: 'ekman_emotions_revealed',
    author: 'Paul Ekman',
    title: 'Emotions Revealed',
    keyContributions: [
      'Universal facial expressions',
      'Microexpressions',
      'Display rules',
      'Context and appropriateness',
      'Leakage theory',
      'First response authenticity window'
    ],
    relevantLevels: [3, 4, 5]
  },
  {
    id: 'ekman_telling_lies',
    author: 'Paul Ekman',
    title: 'Telling Lies',
    keyContributions: [
      'Deception indicators',
      'Microexpression leakage',
      'Temporal incongruence',
      'Verbal-nonverbal mismatches',
      'Timing of gestures and words'
    ],
    relevantLevels: [4, 5]
  },
  {
    id: 'mehrabian_silent_messages',
    author: 'Albert Mehrabian',
    title: 'Silent Messages',
    keyContributions: [
      'Verbal vs non-verbal reliability',
      '7-38-55 rule (contested but influential)',
      'Incongruence detection'
    ],
    relevantLevels: [4]
  },
  {
    id: 'hall_hidden_dimension',
    author: 'Edward T. Hall',
    title: 'The Hidden Dimension',
    keyContributions: [
      'Proxemics theory',
      'Personal space zones',
      'Cultural differences in space',
      'Territorial behavior'
    ],
    relevantLevels: [3, 5]
  },
  {
    id: 'chartrand_chameleon',
    author: 'Chartrand & Bargh',
    title: 'The Chameleon Effect',
    keyContributions: [
      'Unconscious mirroring',
      'Rapport and synchrony',
      'Authentic vs manipulative mirroring'
    ],
    relevantLevels: [2, 5]
  },
  {
    id: 'vrij_detecting_lies',
    author: 'Aldert Vrij',
    title: 'Detecting Lies and Deceit',
    keyContributions: [
      'Anticipatory anxiety in deception',
      'Adapter timing (pre vs post response)',
      'Cognitive load in lying'
    ],
    relevantLevels: [4, 5]
  },
  {
    id: 'gottman_marriage',
    author: 'John Gottman',
    title: 'The Seven Principles for Making Marriage Work',
    keyContributions: [
      'Contempt as relationship poison',
      'Contempt vs anger distinction',
      'Microexpressions in relationships'
    ],
    relevantLevels: [5]
  },
  {
    id: 'greene_48_laws',
    author: 'Robert Greene',
    title: 'The 48 Laws of Power',
    keyContributions: [
      'Silence tolerance as power',
      'Who speaks first',
      'Power dynamics in interactions'
    ],
    relevantLevels: [5]
  }
];

/**
 * Metrics for tracking performance
 */
export interface BodyLanguageMetrics {
  userId: string;
  skill: 'body_language';
  
  // Overall stats
  totalExercisesCompleted: number;
  currentLevel: number;
  overallAccuracy: number;
  
  // Specific metrics
  accuracyByLevel: Record<number, number>;
  accuracyByQuestionType: Record<QuestionType, number>;
  falsePositiveRate: number; // Critical - overconfident interpretations
  averageResponseTime: number;
  
  // Learning progress
  theoryTagsMastered: string[];
  weakAreas: QuestionType[];
  strongAreas: QuestionType[];
  
  // Timestamps
  lastPracticed: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Dataset metadata
 */
export interface BodyLanguageDataset {
  metadata: {
    version: string;
    total_items: number;
    categories: BodyLanguageCategory[];
    sources: string;
    last_updated: string;
  };
  exercises: BodyLanguageExerciseData[];
}
