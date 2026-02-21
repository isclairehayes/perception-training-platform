'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BodyLanguageExercise } from '@/components/exercises/body-language-exercise';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function BodyLanguagePage() {
  const router = useRouter();
  const [showExercise, setShowExercise] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleComplete = (results: any) => {
    console.log('Body language session completed:', results);
    // TODO: Save results to Supabase
    setShowExercise(false);
  };

  if (showExercise) {
    return (
      <BodyLanguageExercise
        level={selectedLevel}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Lenguaje Corporal</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lee el estado emocional y dinámicas de poder a través del cuerpo
              </p>
            </div>
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              ← Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Theory Section */}
          <Card>
            <CardHeader>
              <CardTitle>🧍 Fundamentos del Lenguaje No Verbal</CardTitle>
              <CardDescription>
                Basado en las investigaciones de Joe Navarro (FBI) y Allan Pease
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  El lenguaje corporal representa más del 60% de la comunicación humana.
                  A diferencia de las palabras, es extremadamente difícil de falsificar de
                  manera consciente y consistente.
                </p>
                <h4>El Concepto de Baseline:</h4>
                <p>
                  <strong>Baseline</strong> es el comportamiento normal de una persona en estado
                  neutral. Lo importante no es el comportamiento en sí, sino <strong>la desviación
                  del baseline</strong>. Los mismos gestos pueden significar cosas diferentes
                  dependiendo del contexto y la persona.
                </p>
                <h4>Clusters de Señales:</h4>
                <p>
                  Nunca interpretes una señal aislada. Busca <strong>clusters</strong> de al menos
                  3 señales que apunten en la misma dirección:
                </p>
                <ul>
                  <li><strong>Señales de cierre</strong> - Brazos cruzados, piernas cruzadas, torso alejándose</li>
                  <li><strong>Señales de apertura</strong> - Palmas visibles, postura frontal, inclinación hacia adelante</li>
                  <li><strong>Señales de estrés</strong> - Tocarse el cuello, autocalma, micro-ajustes</li>
                  <li><strong>Señales de poder</strong> - Ocupar espacio, steepling, postura expansiva</li>
                </ul>
                <h4>Expertos de referencia:</h4>
                <ul>
                  <li><strong>Joe Navarro</strong> - Ex-FBI, "What Every Body is Saying"</li>
                  <li><strong>Allan Pease</strong> - "The Definitive Book of Body Language"</li>
                  <li><strong>Paul Ekman</strong> - Expresiones faciales y emociones</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Level Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selecciona Nivel de Dificultad</CardTitle>
              <CardDescription>
                Progresión desde señales obvias hasta dinámicas sutiles
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 grid gap-3 md:grid-cols-5">
              {[
                { level: 1, desc: 'Señales obvias individuales' },
                { level: 2, desc: 'Clusters de 3+ señales' },
                { level: 3, desc: 'Contexto vs comportamiento' },
                { level: 4, desc: 'Incongruencias verbal/no verbal' },
                { level: 5, desc: 'Dinámicas de poder sutiles' },
              ].map(({ level, desc }) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedLevel === level
                      ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div className="text-2xl font-bold">Nivel {level}</div>
                  <div className="text-xs mt-1">{desc}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Start Button */}
          <Button
            size="lg"
            className="w-full h-16 text-lg"
            onClick={() => setShowExercise(true)}
          >
            Comenzar Entrenamiento - Nivel {selectedLevel}
          </Button>

          {/* Stats Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Tu Progreso</CardTitle>
              <CardDescription>Precisión y detección de falsos positivos</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Precisión general
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tasa de falsos positivos
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Clusters detectados
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-600 mt-4">
                Completa sesiones para ver tu tasa de falsos positivos (clave en body language)
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
