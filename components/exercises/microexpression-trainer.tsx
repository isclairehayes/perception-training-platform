'use client';

import { useState, useEffect } from 'react';
import { MicroexpressionExercise } from './microexpression-exercise';
import { ExerciseWrapper } from './exercise-wrapper';
import { MicroexpressionExercise as MicroExerciseType } from '@/types/exercises';
import { Button } from '@/components/ui/button';

interface MicroexpressionTrainerProps {
  level: number;
  exerciseCount?: number;
  onSessionComplete?: (results: SessionResults) => void;
}

interface ExerciseResult {
  correct: boolean;
  responseTime: number;
  emotion: string;
  correctEmotion: string;
}

interface SessionResults {
  level: number;
  totalExercises: number;
  correctAnswers: number;
  averageResponseTime: number;
  accuracy: number;
  results: ExerciseResult[];
}

export function MicroexpressionTrainer({
  level,
  exerciseCount = 10,
  onSessionComplete,
}: MicroexpressionTrainerProps) {
  const [exercises, setExercises] = useState<MicroExerciseType[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Cargar ejercicios del JSON
  useEffect(() => {
    async function loadExercises() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/datasets/microexpressions/exercises.json');
        
        if (!response.ok) {
          throw new Error('Error cargando ejercicios');
        }
        
        const allExercises: MicroExerciseType[] = await response.json();
        
        // Filtrar por nivel
        const levelExercises = allExercises.filter(ex => ex.level === level);
        
        if (levelExercises.length === 0) {
          throw new Error(`No hay ejercicios para nivel ${level}`);
        }
        
        // Mezclar y tomar N ejercicios
        const shuffled = [...levelExercises].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(exerciseCount, shuffled.length));
        
        setExercises(selected);
        setLoading(false);
      } catch (err) {
        console.error('Error loading exercises:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    }
    
    loadExercises();
  }, [level, exerciseCount]);

  const handleExerciseComplete = (result: ExerciseResult) => {
    const newResults = [...results, result];
    setResults(newResults);
    
    if (currentExerciseIndex < exercises.length - 1) {
      // Siguiente ejercicio
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Sesión completa
      const sessionResults: SessionResults = {
        level,
        totalExercises: exercises.length,
        correctAnswers: newResults.filter(r => r.correct).length,
        averageResponseTime: newResults.reduce((sum, r) => sum + r.responseTime, 0) / newResults.length,
        accuracy: (newResults.filter(r => r.correct).length / newResults.length) * 100,
        results: newResults,
      };
      
      setSessionComplete(true);
      onSessionComplete?.(sessionResults);
    }
  };

  const handleRestart = () => {
    setCurrentExerciseIndex(0);
    setResults([]);
    setSessionComplete(false);
    
    // Re-mezclar ejercicios
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    setExercises(shuffled);
  };

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando ejercicios...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="max-w-md bg-white dark:bg-zinc-900 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  // Pantalla de resultados finales
  if (sessionComplete) {
    const sessionResults: SessionResults = {
      level,
      totalExercises: exercises.length,
      correctAnswers: results.filter(r => r.correct).length,
      averageResponseTime: results.reduce((sum, r) => sum + r.responseTime, 0) / results.length,
      accuracy: (results.filter(r => r.correct).length / results.length) * 100,
      results,
    };

    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {sessionResults.accuracy >= 80 ? '🎉' : sessionResults.accuracy >= 60 ? '👍' : '📚'}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                ¡Sesión Completada!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Nivel {level} - Microexpresiones
              </p>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Precisión</p>
                <p className="text-3xl font-bold text-blue-600">
                  {sessionResults.accuracy.toFixed(0)}%
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Aciertos</p>
                <p className="text-3xl font-bold text-green-600">
                  {sessionResults.correctAnswers}/{sessionResults.totalExercises}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 text-center col-span-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tiempo medio</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(sessionResults.averageResponseTime / 1000).toFixed(1)}s
                </p>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">📊 Evaluación</h3>
              {sessionResults.accuracy >= 80 ? (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ¡Excelente trabajo! Estás listo para el siguiente nivel o aumentar la dificultad.
                </p>
              ) : sessionResults.accuracy >= 60 ? (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Buen progreso. Practica un poco más este nivel para consolidar antes de avanzar.
                </p>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Sigue practicando. Revisa la teoría FACS y presta atención a los indicadores clave de cada emoción.
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <Button onClick={handleRestart} className="flex-1">
                Practicar Otra Vez
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/dashboard'}
                className="flex-1"
              >
                Volver al Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ejercicio actual
  const currentExercise = exercises[currentExerciseIndex];

  return (
    <ExerciseWrapper
      title="Microexpresiones"
      description={`Nivel ${level} - Identifica emociones a través de expresiones faciales`}
      currentStep={currentExerciseIndex + 1}
      totalSteps={exercises.length}
      onComplete={() => {}}
    >
      <MicroexpressionExercise
        level={level}
        exercise={currentExercise}
        onComplete={handleExerciseComplete}
      />
    </ExerciseWrapper>
  );
}
