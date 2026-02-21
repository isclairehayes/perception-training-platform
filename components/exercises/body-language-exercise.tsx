'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

interface BodyLanguageExerciseProps {
  level: number;
  onComplete: (results: BodyLanguageExerciseResult) => void;
}

interface BodyLanguageExerciseResult {
  exerciseId: string;
  totalQuestions: number;
  correctAnswers: number;
  falsePositives: number;
  responseTimeMs: number;
  accuracy: number;
  responses: QuestionResponse[];
}

interface QuestionResponse {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
  responseTimeMs: number;
}

interface BodyLanguageQuestion {
  id: string;
  question: string;
  type: 'emotional_state' | 'power_dynamic' | 'comfort_level' | 'incongruence';
  correct_answer: string;
  options?: string[];
  explanation: string;
}

interface BodyLanguageExerciseData {
  id: string;
  skill: string;
  level: number;
  type: string;
  media_url: string;
  title: string;
  description: string;
  baseline_context?: string;
  baseline_duration_sec?: number;
  deviation_timestamp_sec?: number;
  category: string;
  difficulty: string;
  questions: BodyLanguageQuestion[];
  theory_tags: string[];
  references: string[];
}

export function BodyLanguageExercise({ level, onComplete }: BodyLanguageExerciseProps) {
  const [currentExercise, setCurrentExercise] = useState<BodyLanguageExerciseData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [exerciseStartTime] = useState(Date.now());
  const [showBaseline, setShowBaseline] = useState(true);
  const [baselineTimer, setBaselineTimer] = useState(0);

  // Load exercise data for the given level
  useEffect(() => {
    loadExerciseForLevel(level);
  }, [level]);

  // Baseline timer
  useEffect(() => {
    if (showBaseline && currentExercise?.baseline_context) {
      const duration = currentExercise.baseline_duration_sec || 5;
      const timer = setInterval(() => {
        setBaselineTimer(prev => {
          if (prev >= duration) {
            clearInterval(timer);
            setShowBaseline(false);
            return duration;
          }
          return prev + 0.1;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [showBaseline, currentExercise]);

  const loadExerciseForLevel = async (lvl: number) => {
    // TODO: Load from actual dataset
    // For now, using mock data
    const mockExercise: BodyLanguageExerciseData = {
      id: `bl_${lvl}_001`,
      skill: 'body_language',
      level: lvl,
      type: 'video',
      media_url: '/placeholders/bl_example.mp4',
      title: getLevelTitle(lvl),
      description: getLevelDescription(lvl),
      baseline_context: lvl >= 2 ? 'Persona con postura neutral, brazos relajados a los lados.' : undefined,
      baseline_duration_sec: lvl >= 2 ? 5 : undefined,
      deviation_timestamp_sec: lvl >= 2 ? 8 : undefined,
      category: getCategoryForLevel(lvl),
      difficulty: getDifficultyForLevel(lvl),
      questions: generateQuestionsForLevel(lvl),
      theory_tags: getTheoryTagsForLevel(lvl),
      references: ['Navarro, Joe - What Every Body is Saying', 'Pease, Allan - The Definitive Book of Body Language']
    };
    setCurrentExercise(mockExercise);
  };

  const getLevelTitle = (lvl: number): string => {
    const titles = [
      'Señales Básicas Obvias',
      'Clusters de Señales',
      'Contexto vs Comportamiento',
      'Detección de Incongruencias',
      'Dinámicas de Poder Sutiles'
    ];
    return titles[lvl - 1] || 'Ejercicio de Lenguaje Corporal';
  };

  const getLevelDescription = (lvl: number): string => {
    const descriptions = [
      'Identifica señales corporales individuales obvias',
      'Detecta combinaciones de múltiples señales',
      'Evalúa comportamiento en su contexto situacional',
      'Encuentra incongruencias entre canales de comunicación',
      'Analiza dinámicas de poder y microseñales sutiles'
    ];
    return descriptions[lvl - 1] || 'Analiza el lenguaje corporal';
  };

  const getCategoryForLevel = (lvl: number): string => {
    const categories = ['neutral', 'estrés', 'neutral', 'mentira', 'confianza'];
    return categories[lvl - 1] || 'neutral';
  };

  const getDifficultyForLevel = (lvl: number): string => {
    const difficulties = ['easy', 'medium', 'hard', 'very_hard', 'expert'];
    return difficulties[lvl - 1] || 'medium';
  };

  const getTheoryTagsForLevel = (lvl: number): string[] => {
    const tags = [
      ['defensive_posture', 'barrier_signals', 'baseline_deviation'],
      ['signal_clusters', 'multiple_indicators', 'stress_confirmation'],
      ['context_dependency', 'appropriate_emotions', 'interpretation_principles'],
      ['verbal_nonverbal_incongruence', 'deception_indicators', 'microexpressions'],
      ['power_dynamics', 'status_signals', 'territorial_behavior']
    ];
    return tags[lvl - 1] || [];
  };

  const generateQuestionsForLevel = (lvl: number): BodyLanguageQuestion[] => {
    // Level-specific questions
    const questionSets = [
      // Level 1: Basic signals
      [
        {
          id: 'q1',
          question: '¿Qué cambio principal observas en la postura?',
          type: 'emotional_state' as const,
          correct_answer: 'Brazos cruzados - postura defensiva',
          options: [
            'Brazos cruzados - postura defensiva',
            'Manos en los bolsillos - desinterés',
            'Inclinación hacia adelante - interés',
            'Ningún cambio notable'
          ],
          explanation: 'Los brazos cruzados son una barrera física que indica incomodidad o defensividad. Joe Navarro: "Los brazos cruzados son un intento de proteger el torso de amenazas percibidas."'
        }
      ],
      // Level 2: Clusters
      [
        {
          id: 'q1',
          question: '¿Cuántas señales de incomodidad simultáneas identificas?',
          type: 'emotional_state' as const,
          correct_answer: '3+ señales (cluster de estrés)',
          options: [
            'Ninguna señal clara',
            '1 señal aislada',
            '2 señales',
            '3+ señales (cluster de estrés)'
          ],
          explanation: 'La regla del cluster: múltiples señales simultáneas confirman un estado emocional. Una señal aislada puede ser casual.'
        },
        {
          id: 'q2',
          question: '¿Qué nivel de certeza tienes sobre el estado emocional?',
          type: 'emotional_state' as const,
          correct_answer: 'Alta - múltiples señales convergen',
          options: [
            'Baja - podría ser casual',
            'Media - solo una pista',
            'Alta - múltiples señales convergen',
            'Imposible determinar'
          ],
          explanation: 'Los clusters aumentan la fiabilidad. Una señal = hipótesis. Cluster = confirmación.'
        }
      ],
      // Level 3: Context
      [
        {
          id: 'q1',
          question: '¿Es apropiado este comportamiento en este contexto?',
          type: 'emotional_state' as const,
          correct_answer: 'Depende del contexto específico',
          options: [
            'Sí - siempre es apropiado',
            'No - nunca es apropiado',
            'Depende del contexto específico',
            'El contexto no importa'
          ],
          explanation: 'El mismo comportamiento puede significar cosas diferentes según el contexto. Nunca interpretes señales aisladas del contexto.'
        }
      ],
      // Level 4: Incongruence
      [
        {
          id: 'q1',
          question: '¿Qué canal de comunicación es más fiable aquí?',
          type: 'incongruence' as const,
          correct_answer: 'Lenguaje corporal - es más difícil de controlar',
          options: [
            'Palabras - son intencionales y claras',
            'Lenguaje corporal - es más difícil de controlar',
            'Ambos son igualmente fiables',
            'Ninguno es fiable'
          ],
          explanation: 'Cuando hay incongruencia, el lenguaje corporal es más fiable porque es más automático y difícil de falsificar.'
        }
      ],
      // Level 5: Power dynamics
      [
        {
          id: 'q1',
          question: '¿Qué dinámica de poder observas en esta interacción?',
          type: 'power_dynamic' as const,
          correct_answer: 'Persona A domina el espacio y la conversación',
          options: [
            'Dinámica igualitaria',
            'Persona A domina el espacio y la conversación',
            'Persona B tiene más poder',
            'Imposible determinar'
          ],
          explanation: 'Las dinámicas de poder se manifiestan en control de espacio, interrupciones, altura relativa y otros microcomportamientos.'
        }
      ]
    ];

    return questionSets[lvl - 1] || questionSets[0];
  };

  const currentQuestion = currentExercise?.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === (currentExercise?.questions.length || 0) - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion || !currentExercise) return;

    const responseTime = Date.now() - questionStartTime;
    const correct = selectedAnswer === currentQuestion.correct_answer;

    const response: QuestionResponse = {
      questionId: currentQuestion.id,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
      correct,
      responseTimeMs: responseTime
    };

    setResponses([...responses, response]);
    setShowFeedback(true);

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (isLastQuestion) {
        completeExercise([...responses, response]);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setQuestionStartTime(Date.now());
      }
    }, 4000);
  };

  const completeExercise = (allResponses: QuestionResponse[]) => {
    if (!currentExercise) return;

    const correctCount = allResponses.filter(r => r.correct).length;
    const totalTime = Date.now() - exerciseStartTime;
    const accuracy = (correctCount / allResponses.length) * 100;

    // Calculate false positives (context-dependent - simplified for now)
    const falsePositives = allResponses.filter(r => !r.correct && r.questionId.includes('incongruence')).length;

    const result: BodyLanguageExerciseResult = {
      exerciseId: currentExercise.id,
      totalQuestions: allResponses.length,
      correctAnswers: correctCount,
      falsePositives,
      responseTimeMs: totalTime,
      accuracy,
      responses: allResponses
    };

    onComplete(result);
  };

  if (!currentExercise) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-zinc-100 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando ejercicio...</p>
        </div>
      </div>
    );
  }

  // Baseline phase
  if (showBaseline && currentExercise.baseline_context) {
    const duration = currentExercise.baseline_duration_sec || 5;
    const progressPct = (baselineTimer / duration) * 100;

    return (
      <div className="space-y-6">
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">📊 Estableciendo Línea Base</CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Observa el comportamiento neutral de referencia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              {currentExercise.baseline_context}
            </p>
            <Progress value={progressPct} className="h-2" />
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 text-right">
              {baselineTimer.toFixed(1)}s / {duration}s
            </p>
          </CardContent>
        </Card>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">📹 Video: Comportamiento Baseline</p>
              <p className="text-xs text-gray-400">({currentExercise.media_url})</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Feedback phase
  if (showFeedback && currentQuestion) {
    const correct = selectedAnswer === currentQuestion.correct_answer;
    
    return (
      <div className="space-y-6">
        <div className="text-center py-6">
          <div className="text-6xl mb-4">
            {correct ? '✅' : '❌'}
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {correct ? '¡Correcto!' : 'Incorrecto'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Respuesta correcta: <strong>{currentQuestion.correct_answer}</strong>
          </p>
        </div>

        <Card className="bg-zinc-50 dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-lg">💡 Explicación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </CardContent>
        </Card>

        {!isLastQuestion && (
          <p className="text-center text-sm text-gray-500">
            Siguiente pregunta en breve...
          </p>
        )}
      </div>
    );
  }

  // Question phase
  return (
    <div className="space-y-6">
      {/* Exercise header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">{currentExercise.title}</h2>
          <span className="text-sm bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
            Nivel {currentExercise.level}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {currentExercise.description}
        </p>
        
        {/* Progress */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>Pregunta {currentQuestionIndex + 1} de {currentExercise.questions.length}</span>
        </div>
        <Progress 
          value={((currentQuestionIndex + 1) / currentExercise.questions.length) * 100} 
          className="h-2"
        />
      </div>

      {/* Media display */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">
              {currentExercise.type === 'video' ? '📹' : '🖼️'} 
              {' '}
              {currentExercise.type === 'video' ? 'Video' : 'Imagen'}
            </p>
            <p className="text-xs text-gray-400">({currentExercise.media_url})</p>
            {currentExercise.deviation_timestamp_sec && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                ⚠️ Cambio en t={currentExercise.deviation_timestamp_sec}s
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
            <CardDescription>
              Tipo: {getQuestionTypeLabel(currentQuestion.type)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.options ? (
              <div className="grid gap-3">
                {currentQuestion.options.map((option, idx) => (
                  <Button
                    key={idx}
                    variant={selectedAnswer === option ? 'primary' : 'outline'}
                    onClick={() => handleAnswerSelect(option)}
                    className="justify-start text-left h-auto py-3 px-4"
                  >
                    <span className="flex-1">{option}</span>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  💡 Pregunta abierta: En la versión completa, escribirías tu respuesta aquí.
                </p>
              </div>
            )}

            <Button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="w-full"
              size="lg"
            >
              Confirmar Respuesta
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Theory tags */}
      <div className="flex flex-wrap gap-2">
        {currentExercise.theory_tags.map(tag => (
          <span 
            key={tag}
            className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded"
          >
            {tag.replace(/_/g, ' ')}
          </span>
        ))}
      </div>

      {/* References */}
      <Card className="bg-zinc-50 dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-sm">📚 Referencias</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            {currentExercise.references.map((ref, idx) => (
              <li key={idx}>• {ref}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function getQuestionTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    emotional_state: 'Estado Emocional',
    power_dynamic: 'Dinámica de Poder',
    comfort_level: 'Nivel de Comodidad',
    incongruence: 'Detección de Incongruencia'
  };
  return labels[type] || type;
}
