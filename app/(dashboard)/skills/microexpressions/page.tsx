'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MicroexpressionTrainer } from '@/components/exercises/microexpression-trainer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MicroexpressionsPage() {
  const router = useRouter();
  const [showTrainer, setShowTrainer] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleSessionComplete = (results: any) => {
    console.log('Session completed:', results);
    // TODO: Save results to Supabase
    setShowTrainer(false);
  };

  if (showTrainer) {
    return (
      <MicroexpressionTrainer
        level={selectedLevel}
        onSessionComplete={handleSessionComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Microexpresiones</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detecta emociones a través de expresiones faciales usando FACS
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
              <CardTitle>🎭 Sobre las Microexpresiones</CardTitle>
              <CardDescription>
                Fundamentos del Sistema de Codificación de Acciones Faciales (FACS)
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Las microexpresiones son expresiones faciales involuntarias que revelan
                  emociones verdaderas. Duran apenas fracciones de segundo (1/25 a 1/5 de segundo)
                  y son prácticamente imposibles de falsificar.
                </p>
                <p>
                  El <strong>FACS (Facial Action Coding System)</strong> desarrollado por Paul Ekman
                  y Wallace Friesen identifica 44 unidades de acción (AUs) que corresponden a
                  movimientos musculares específicos del rostro.
                </p>
                <h4>Las 7 Emociones Universales:</h4>
                <ul>
                  <li><strong>Felicidad</strong> - AU 6 + AU 12 (Sonrisa de Duchenne)</li>
                  <li><strong>Tristeza</strong> - AU 1 + AU 4 + AU 15</li>
                  <li><strong>Ira</strong> - AU 4 + AU 5 + AU 7 + AU 23</li>
                  <li><strong>Miedo</strong> - AU 1 + AU 2 + AU 4 + AU 5 + AU 20 + AU 25/26/27</li>
                  <li><strong>Asco</strong> - AU 9 + AU 15/16</li>
                  <li><strong>Sorpresa</strong> - AU 1 + AU 2 + AU 5 + AU 26</li>
                  <li><strong>Desprecio</strong> - AU 12 + AU 14 (asimétrico)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Level Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selecciona Nivel de Dificultad</CardTitle>
              <CardDescription>
                Cada nivel aumenta la dificultad y reduce el tiempo de exposición
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 grid gap-3 md:grid-cols-5">
              {[1, 2, 3, 4, 5].map((level) => (
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
                  <div className="text-xs mt-1">
                    {level === 1 && 'Expresiones exageradas'}
                    {level === 2 && 'Expresiones claras, 5s'}
                    {level === 3 && 'Expresiones sutiles, 3s'}
                    {level === 4 && 'Microexpresiones, 1-2s'}
                    {level === 5 && 'Mezclas emocionales'}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Start Button */}
          <Button
            size="lg"
            className="w-full h-16 text-lg"
            onClick={() => setShowTrainer(true)}
          >
            Comenzar Entrenamiento - Nivel {selectedLevel}
          </Button>

          {/* Stats Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Tu Progreso</CardTitle>
              <CardDescription>Estadísticas de tus últimas sesiones</CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sesiones completadas
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Precisión promedio
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tiempo medio de respuesta
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-600 mt-4">
                Completa tu primera sesión para ver estadísticas
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
