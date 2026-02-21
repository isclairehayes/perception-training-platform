'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { MicroexpressionExercise as MicroExerciseType, Emotion, EMOTION_LABELS } from '@/types/exercises';
import { getFACSExplanation, getCommonMistakes, EMOTION_FACS } from '@/lib/facs-library';

interface MicroexpressionExerciseProps {
  level: number;
  onComplete: (results: ExerciseResult) => void;
  exercise: MicroExerciseType;
}

interface ExerciseResult {
  correct: boolean;
  responseTime: number;
  emotion: string;
  correctEmotion: string;
}

const EMOTIONS: Array<{ id: Emotion; label: string; emoji: string }> = [
  { id: 'happiness', label: 'Felicidad', emoji: '😊' },
  { id: 'sadness', label: 'Tristeza', emoji: '😢' },
  { id: 'anger', label: 'Ira', emoji: '😠' },
  { id: 'fear', label: 'Miedo', emoji: '😨' },
  { id: 'disgust', label: 'Disgusto', emoji: '🤢' },
  { id: 'surprise', label: 'Sorpresa', emoji: '😲' },
  { id: 'contempt', label: 'Desprecio', emoji: '😒' },
];

export function MicroexpressionExercise({ level, onComplete, exercise }: MicroexpressionExerciseProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [startTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);
  const [showTheory, setShowTheory] = useState(false);

  // Determinar duración de exposición según nivel y ejercicio
  const getExposureDuration = useCallback(() => {
    if (exercise.duration_ms) return exercise.duration_ms;
    
    // Fallback según nivel si no hay duration_ms
    switch (level) {
      case 1: return null; // Sin límite
      case 2: return 5000;
      case 3: return 3000;
      case 4: return 2000;
      case 5: return 1500;
      default: return null;
    }
  }, [level, exercise.duration_ms]);

  const exposureDuration = getExposureDuration();

  // Iniciar ejercicio
  useEffect(() => {
    // Pequeño delay antes de mostrar la imagen
    const showTimer = setTimeout(() => {
      setShowImage(true);
      
      // Si hay límite de tiempo, ocultar imagen después
      if (exposureDuration) {
        const hideTimer = setTimeout(() => {
          setImageVisible(false);
        }, exposureDuration);
        
        return () => clearTimeout(hideTimer);
      }
    }, 500);
    
    return () => clearTimeout(showTimer);
  }, [exposureDuration]);

  const handleSubmit = () => {
    if (!selectedEmotion) return;

    const responseTime = Date.now() - startTime;
    const correct = selectedEmotion === exercise.correct_answer;

    setShowFeedback(true);

    setTimeout(() => {
      onComplete({
        correct,
        responseTime,
        emotion: selectedEmotion,
        correctEmotion: exercise.correct_answer,
      });
    }, 4000);
  };

  // Renderizar feedback
  if (showFeedback) {
    const correct = selectedEmotion === exercise.correct_answer;
    const correctEmotionData = EMOTIONS.find(e => e.id === exercise.correct_answer);
    const commonMistakes = getCommonMistakes(exercise.correct_answer);
    const facsData = EMOTION_FACS[exercise.correct_answer];

    return (
      <div className="space-y-6 py-4">
        {/* Resultado */}
        <div className="text-center">
          <div className="text-6xl mb-4">
            {correct ? '✅' : '❌'}
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {correct ? '¡Correcto!' : 'Incorrecto'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            La emoción correcta era: <strong>{correctEmotionData?.label}</strong>
          </p>
          {!correct && (
            <p className="text-sm text-gray-500">
              Tu respuesta: {EMOTIONS.find(e => e.id === selectedEmotion)?.label}
            </p>
          )}
        </div>

        {/* Imagen de referencia */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <Image
              src={exercise.media_url}
              alt="Expresión facial"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Explicación FACS */}
        <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>📚</span>
            Explicación FACS
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {exercise.facs_explanation}
          </p>
          
          {/* Indicadores clave */}
          <div className="mt-3">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              Indicadores clave:
            </p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {facsData.keyIndicators.slice(0, 3).map((indicator, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-blue-600">•</span>
                  <span>{indicator}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Errores comunes (solo si falló) */}
        {!correct && commonMistakes.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span>⚠️</span>
              Errores comunes
            </h4>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600">→</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Renderizar ejercicio
  return (
    <div className="space-y-6">
      {/* Instrucciones nivel */}
      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3 text-sm">
        <p className="font-semibold mb-1">Nivel {level}</p>
        {exposureDuration ? (
          <p className="text-gray-600 dark:text-gray-400">
            La imagen se mostrará por {exposureDuration / 1000} segundos
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Tiempo ilimitado para observar
          </p>
        )}
      </div>

      {/* Teoría FACS (colapsable) */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => setShowTheory(!showTheory)}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
        >
          <span className="font-semibold text-sm">📖 Teoría FACS - {EMOTION_LABELS[exercise.correct_answer]}</span>
          <span className="text-gray-500">{showTheory ? '▼' : '▶'}</span>
        </button>
        {showTheory && (
          <div className="p-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {EMOTION_FACS[exercise.correct_answer].description}
            </p>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p className="font-semibold mb-1">Unidades de acción principales:</p>
              <p>{EMOTION_FACS[exercise.correct_answer].primaryAUs.join(', ')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Imagen/Video */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        {showImage ? (
          imageVisible ? (
            <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <Image
                src={exercise.media_url}
                alt="Expresión facial - identifica la emoción"
                fill
                className="object-contain"
                unoptimized
              />
              {exposureDuration && (
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {Math.ceil(exposureDuration / 1000)}s
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">
                  Imagen oculta
                </p>
                <p className="text-sm text-gray-500">
                  Selecciona la emoción que detectaste
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Preparando ejercicio...</p>
          </div>
        )}
      </div>

      {/* Selector de emociones */}
      <div>
        <h3 className="font-semibold mb-3">¿Qué emoción detectas?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {EMOTIONS.map((emotion) => (
            <Button
              key={emotion.id}
              variant={selectedEmotion === emotion.id ? 'primary' : 'outline'}
              onClick={() => setSelectedEmotion(emotion.id)}
              className="h-auto flex-col gap-2 p-4"
            >
              <span className="text-3xl">{emotion.emoji}</span>
              <span className="text-sm">{emotion.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Botón confirmar */}
      <Button
        onClick={handleSubmit}
        disabled={!selectedEmotion || !showImage}
        className="w-full"
        size="lg"
      >
        Confirmar Respuesta
      </Button>

      {/* Nota para niveles avanzados */}
      {level >= 4 && (
        <p className="text-xs text-center text-gray-500">
          💡 Microexpresiones duran &lt;500ms. Confía en tu primera impresión.
        </p>
      )}
    </div>
  );
}
