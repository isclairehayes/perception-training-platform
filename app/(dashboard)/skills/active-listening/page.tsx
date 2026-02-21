'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActiveListeningExercise } from '@/components/exercises/active-listening-exercise';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ActiveListeningPage() {
  const router = useRouter();
  const [showExercise, setShowExercise] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3 | 4 | 5>(1);

  const handleComplete = (results: any) => {
    console.log('Active listening session completed:', results);
    // TODO: Save results to Supabase
    setShowExercise(false);
  };

  if (showExercise) {
    return (
      <ActiveListeningExercise
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
              <h1 className="text-2xl font-bold">Escucha Activa</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Extrae información implícita y detecta cold reading
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
              <CardTitle>🎧 Información Explícita vs Implícita</CardTitle>
              <CardDescription>
                Cold Reading, Efecto Barnum y Meta-Modelo PNL
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Cuando alguien habla, transmite dos niveles de información:
                </p>
                <ul>
                  <li><strong>Explícita</strong> - Lo que literalmente dice</li>
                  <li><strong>Implícita</strong> - Lo que presupone, omite, generaliza o distorsiona</li>
                </ul>
                
                <h4>Técnicas de Cold Reading (Derren Brown):</h4>
                <p>
                  El <strong>cold reading</strong> es el arte de hacer creer que sabes información
                  sobre alguien sin haberla obtenido previamente. Usado por psíquicos, mentalistas,
                  y desafortunadamente, estafadores.
                </p>
                <ul>
                  <li><strong>Rainbow Ruse</strong> - "Eres X pero también lo opuesto de X"</li>
                  <li><strong>Jacques Statement</strong> - Preocupaciones universales presentadas como únicas</li>
                  <li><strong>Shotgunning</strong> - Lanzar muchas afirmaciones rápidas y centrarse en los hits</li>
                  <li><strong>Fishing</strong> - Afirmación vaga + observar reacción + refinar</li>
                </ul>

                <h4>El Efecto Barnum:</h4>
                <p>
                  Estudiado por Bertram Forer (1948), demuestra que las personas tienden a aceptar
                  descripciones vagas y generales como altamente precisas sobre ellas mismas.
                  Ejemplo: "A veces eres extrovertido y sociable, pero otras veces eres introvertido
                  y reservado".
                </p>

                <h4>Meta-Modelo PNL:</h4>
                <p>
                  Desarrollado por Bandler y Grinder, identifica patrones lingüísticos que
                  omiten, distorsionan o generalizan información:
                </p>
                <ul>
                  <li><strong>Omisiones</strong> - "Estoy frustrado" (¿con qué/quién?)</li>
                  <li><strong>Generalizaciones</strong> - "Nadie me entiende" (¿literalmente nadie?)</li>
                  <li><strong>Distorsiones</strong> - "Me haces enojar" (¿cómo exactamente?)</li>
                  <li><strong>Presuposiciones</strong> - "¿Cuándo dejarás de ser tan terco?" (presupone que eres terco)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Level Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selecciona Nivel de Dificultad</CardTitle>
              <CardDescription>
                De información implícita obvia a análisis complejo de manipulación
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6 grid gap-3 md:grid-cols-5">
              {[
                { level: 1 as const, desc: 'Información implícita obvia' },
                { level: 2 as const, desc: 'Presuposiciones simples' },
                { level: 3 as const, desc: 'Barnum vs específico' },
                { level: 4 as const, desc: 'Cold reading múltiple' },
                { level: 5 as const, desc: 'Gaslighting, cultos, política' },
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
              <CardDescription>Precisión en detección de información implícita</CardDescription>
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
                    Falsos positivos
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cold readings detectados
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-600 mt-4">
                Completa sesiones para ver tu habilidad de detección de Barnum y cold reading
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
