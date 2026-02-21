'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BayesianExercise } from '@/components/exercises/bayesian-exercise';
import { BiasLibrary } from '@/components/exercises/bias-library';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function BayesianPage() {
  const router = useRouter();
  const [showExercise, setShowExercise] = useState(false);
  const [showBiasLibrary, setShowBiasLibrary] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleComplete = (results: any) => {
    console.log('Bayesian session completed:', results);
    // TODO: Save results to Supabase
    setShowExercise(false);
  };

  if (showBiasLibrary) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Biblioteca de Sesgos Cognitivos</h1>
              <Button variant="outline" onClick={() => setShowBiasLibrary(false)}>
                ← Volver
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BiasLibrary />
        </main>
      </div>
    );
  }

  if (showExercise) {
    return (
      <BayesianExercise
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
              <h1 className="text-2xl font-bold">Razonamiento Bayesiano</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Razona con probabilidades y actualiza creencias ante nueva evidencia
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
              <CardTitle>📊 Pensamiento Probabilístico</CardTitle>
              <CardDescription>
                Teorema de Bayes y Superforecasting (Philip Tetlock)
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="prose dark:prose-invert max-w-none">
                <h4>El Teorema de Bayes:</h4>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  P(H|E) = P(E|H) × P(H) / P(E)
                </p>
                <p>
                  Donde:
                </p>
                <ul>
                  <li><strong>P(H|E)</strong> - Probabilidad de hipótesis dado la evidencia (posterior)</li>
                  <li><strong>P(E|H)</strong> - Probabilidad de evidencia si hipótesis es cierta (likelihood)</li>
                  <li><strong>P(H)</strong> - Probabilidad inicial de hipótesis (prior)</li>
                  <li><strong>P(E)</strong> - Probabilidad total de la evidencia</li>
                </ul>

                <h4>Superforecasting (Philip Tetlock):</h4>
                <p>
                  Tetlock's Good Judgment Project identificó "superforecasters" - personas que
                  consistentemente predicen mejor que expertos. Sus principios:
                </p>
                <ol>
                  <li><strong>Pensar probabilísticamente</strong> - No "sí/no", sino 65% vs 35%</li>
                  <li><strong>Actualizar creencias</strong> - Cambiar estimados ante nueva evidencia</li>
                  <li><strong>Evitar anclas</strong> - No quedarse con la primera impresión</li>
                  <li><strong>Buscar visión externa</strong> - Base rates antes que narrativas</li>
                  <li><strong>Calibración</strong> - Tus "70%" deben ocurrir ~70% del tiempo</li>
                </ol>

                <h4>Brier Score:</h4>
                <p>
                  Métrica de precisión para predicciones probabilísticas:
                </p>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  Brier Score = (1/N) × Σ(predicted - actual)²
                </p>
                <p>
                  Rango: 0 (perfecto) a 1 (peor). Un Brier Score &lt; 0.1 es excelente.
                </p>

                <h4>Sesgos Cognitivos:</h4>
                <p>
                  Explora nuestra biblioteca de 20 sesgos cognitivos que afectan el razonamiento
                  probabilístico: confirmación, disponibilidad, anclaje, y más.
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowBiasLibrary(true)}>
              <CardHeader>
                <CardTitle>📚 Biblioteca de Sesgos</CardTitle>
                <CardDescription>
                  Explora 20 sesgos cognitivos con ejemplos y estrategias
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Button variant="outline" className="w-full">
                  Ver Biblioteca →
                </Button>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎯 Entrenamiento</CardTitle>
                <CardDescription>
                  Practica actualización bayesiana y calibración
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <Button className="w-full">
                  Comenzar Ejercicios →
                </Button>
              </div>
            </Card>
          </div>

          {/* Level Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selecciona Nivel de Dificultad</CardTitle>
              <CardDescription>
                De probabilidades simples a calibración avanzada
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 grid gap-3 md:grid-cols-5">
              {[
                { level: 1, desc: 'Probabilidades simples' },
                { level: 2, desc: 'Una actualización bayesiana' },
                { level: 3, desc: 'Múltiples actualizaciones' },
                { level: 4, desc: 'Escenarios con sesgos' },
                { level: 5, desc: 'Calibración avanzada' },
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
              <CardDescription>Brier Score y calibración</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Brier Score promedio
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Calibración
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sesgos identificados
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-600 mt-4">
                Completa ejercicios para ver tu Brier Score y gráfico de calibración
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
