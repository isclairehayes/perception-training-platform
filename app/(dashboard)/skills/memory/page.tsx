'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MemoryExercise } from '@/components/exercises/memory-exercise';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MemoryPage() {
  const router = useRouter();
  const [showExercise, setShowExercise] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5>(1);

  const handleComplete = (results: any) => {
    console.log('Memory session completed:', results);
    // TODO: Save results to Supabase
    setShowExercise(false);
  };

  if (showExercise) {
    return (
      <MemoryExercise
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
              <h1 className="text-2xl font-bold">Memoria - Método de Loci</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Memoriza rostros, nombres y datos usando técnicas milenarias
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
              <CardTitle>🧠 El Método de Loci</CardTitle>
              <CardDescription>
                La técnica de memoria más antigua y efectiva del mundo
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  El <strong>Método de Loci</strong> (también llamado "Palacio de Memoria")
                  es una técnica mnemotécnica utilizada desde la antigua Grecia. Consiste en
                  asociar información que quieres recordar con ubicaciones específicas en un
                  espacio familiar.
                </p>
                <h4>Cómo funciona:</h4>
                <ol>
                  <li><strong>Define tu palacio</strong> - Elige un lugar que conozcas bien (tu casa, un camino)</li>
                  <li><strong>Crea ubicaciones</strong> - Identifica puntos específicos en ese espacio</li>
                  <li><strong>Asocia información</strong> - Coloca mentalmente cada ítem en una ubicación</li>
                  <li><strong>Haz una caminata mental</strong> - Recorre tu palacio para recordar los ítems</li>
                </ol>
                <h4>Evidencia científica:</h4>
                <p>
                  Estudios de neuroimagen (Maguire et al.) muestran que los expertos en memoria
                  activan regiones cerebrales de navegación espacial al memorizar. La técnica
                  aprovecha la capacidad natural del cerebro para recordar lugares y rutas.
                </p>
              </div>
            </div>
          </Card>

          {/* Level Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selecciona Nivel de Dificultad</CardTitle>
              <CardDescription>
                La cantidad de ítems aumenta con cada nivel
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 grid gap-3 md:grid-cols-5">
              {[
                { level: 1 as const, items: 10, desc: '10 ítems, inmediato' },
                { level: 2 as const, items: 20, desc: '20 ítems, 5 min' },
                { level: 3 as const, items: 40, desc: '40 ítems, rostros+nombres' },
                { level: 4 as const, items: 60, desc: '60 ítems, con rasgos' },
                { level: 5 as const, items: 100, desc: '100 ítems, mezcla' },
              ].map(({ level, items, desc }) => (
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
                  <div className="text-lg font-semibold">{items} ítems</div>
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
              <CardDescription>Curva de retención y estadísticas</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tasa de recuerdo inmediato
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Retención a 24h
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tiempo medio de retrieval
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-600 mt-4">
                Completa tu primera sesión para ver tu curva de olvido
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
