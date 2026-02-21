/**
 * Active Listening Exercise Types
 * 
 * Este módulo define los tipos para el entrenamiento de escucha activa,
 * enfocado en identificar información implícita, presuposiciones,
 * cold reading y afirmaciones Barnum.
 */

export type ImplicitInfoType = 
  | 'presupposition'      // Presuposición: asunciones implícitas en preguntas/afirmaciones
  | 'omission'            // Omisión: información ausente pero relevante
  | 'generalization'      // Generalización: "siempre", "nunca", "todos"
  | 'distortion'          // Distorsión: interpretaciones subjetivas presentadas como hechos
  | 'barnum'              // Afirmación Barnum: generalización que parece específica
  | 'cold-reading'        // Técnica de cold reading
  | 'explicit';           // Información explícita (para contraste)

export type ColdReadingTechnique =
  | 'fishing'             // Hacer preguntas vagas y observar reacciones
  | 'rainbow-ruse'        // "A veces X, pero también Y" (contradicción que siempre aplica)
  | 'barnum-statement'    // Afirmaciones universales que parecen personales
  | 'shotgunning'         // Lanzar muchas afirmaciones genéricas rápidamente
  | 'fine-flattery'       // Halagos sutiles que todos aceptan
  | 'pushing'             // Hacer afirmaciones y observar correcciones
  | 'statistics'          // Usar probabilidades altas disfrazadas de insight
  | 'feedback'            // Leer lenguaje corporal y ajustar
  | 'jacques-statement'   // "Te preocupa [problema común]"
  | 'fuzzy-fact';         // Hechos vagos que se pueden ajustar después

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface ImplicitInfo {
  id: string;
  type: ImplicitInfoType;
  text: string;                    // El texto exacto que contiene la información implícita
  explanation: string;              // Por qué es implícito y qué revela
  coldReadingTechnique?: ColdReadingTechnique; // Si aplica
  difficulty: DifficultyLevel;
}

export interface Transcript {
  id: string;
  speaker: string;
  text: string;
  implicitInfoIds: string[];       // IDs de información implícita en este fragmento
}

export interface Conversation {
  id: string;
  title: string;
  context: string;                  // Contexto de la conversación
  level: DifficultyLevel;
  transcripts: Transcript[];
  implicitInfo: ImplicitInfo[];
  tags: string[];                   // e.g., "therapy", "sales", "interview", "psychic"
}

export interface ExerciseQuestion {
  id: string;
  conversationId: string;
  type: 'identify-implicit' | 'classify-type' | 'detect-barnum' | 'extract-presupposition' | 'spot-cold-reading';
  question: string;
  options: string[];                // Opciones de respuesta
  correctAnswer: number;            // Índice de la respuesta correcta
  correctAnswerIds?: string[];      // IDs de ImplicitInfo correctos (para multi-select)
  explanation: string;              // Explicación de la respuesta correcta
  difficulty: DifficultyLevel;
}

export interface ActiveListeningExerciseResult {
  correct: boolean;
  responseTime: number;
  questionId: string;
  selectedAnswer: number;
  correctAnswer: number;
  falsePositives?: number;          // Cuántas cosas marcó que no eran implícitas
  falseNegatives?: number;          // Cuántas cosas implícitas se perdió
}

export interface ActiveListeningProgress {
  level: DifficultyLevel;
  questionsCompleted: number;
  totalQuestions: number;
  accuracy: number;                 // % de respuestas correctas
  falsePositiveRate: number;        // % de falsos positivos
  averageResponseTime: number;
  unlockedLevels: DifficultyLevel[];
}

export interface TheorySection {
  id: string;
  title: string;
  content: string;
  examples: string[];
  difficulty: DifficultyLevel;
}
