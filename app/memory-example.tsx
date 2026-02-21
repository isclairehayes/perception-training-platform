'use client';

/**
 * Ejemplo de integración del módulo de memoria
 * Este archivo muestra cómo usar MemoryExercise en una página
 */

import { useState } from 'react';
import { MemoryExercise, MemoryLevel, MemoryExerciseResult } from '@/components/exercises/memory-exercise';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemoryExamplePage() {
  const [currentLevel, setCurrentLevel] = useState<MemoryLevel>(1);
  const [isActive, setIsActive] = useState(false);
  const [lastResult, setLastResult] = useState<MemoryExerciseResult | null>(null);

  const handleComplete = async (results: MemoryExerciseResult) => {
    setLastResult(results);
    setIsActive(false);

    // Aquí guardarías los resultados a la base de datos
    console.log('Resultados del ejercicio:', results);

    // Ejemplo de guardado a Supabase (descomentar cuando esté listo)
    /*
    try {
      const { data, error } = await supabase
        .from('exercise_results')
        .insert({
          user_id: userId,
          skill: 'memory',
          level: results.level,
          accuracy: results.accuracy,
          study_time_ms: results.studyTime,
          recall_time_ms: results.recallTime,
          total_items: results.totalItems,
          correct_recalls: results.correctRecalls,
          retrieval_delay: results.retrievalDelay,
          used_memory_palace: results.usedMemoryPalace,
        });

      if (error) throw error;
      
      // Actualizar progreso del usuario
      await updateUserProgress('memory', results.level, results.accuracy);
      
    } catch (error) {
      console.error('Error guardando resultados:', error);
    }
    */
  };

  if (isActive) {
    return (
      <div className="container mx-auto py-8">
        <MemoryExercise 
          level={currentLevel} 
          onComplete={handleComplete} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Entrenamiento de Memoria</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Mejora tu memoria usando el Método de Loci (Palacio de la Memoria)
        </p>
      </div>

      {/* Selector de nivel */}
      <Card>
        <CardHeader>
          <CardTitle>Selecciona tu Nivel</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <Button
              key={level}
              variant={currentLevel === level ? 'primary' : 'outline'}
              onClick={() => setCurrentLevel(level as MemoryLevel)}
              className="h-auto flex-col gap-2 p-4"
            >
              <span className="text-2xl font-bold">Nivel {level}</span>
              <span className="text-xs text-center">
                {level === 1 && '10 objetos'}
                {level === 2 && '20 ítems mixtos'}
                {level === 3 && '40 rostros'}
                {level === 4 && '60 rostros + rasgos'}
                {level === 5 && '100 ítems complejos'}
              </span>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Último resultado */}
      {lastResult && (
        <Card className="bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle>Último Resultado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nivel</p>
                <p className="text-2xl font-bold">{lastResult.level}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                <p className="text-2xl font-bold text-green-600">
                  {lastResult.accuracy.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Correctos</p>
                <p className="text-2xl font-bold">
                  {lastResult.correctRecalls}/{lastResult.totalItems}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tiempo</p>
                <p className="text-2xl font-bold">
                  {Math.round(lastResult.recallTime / 1000)}s
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botón de inicio */}
      <div className="text-center">
        <Button
          onClick={() => setIsActive(true)}
          size="lg"
          className="text-lg px-8 py-6"
        >
          Comenzar Nivel {currentLevel}
        </Button>
      </div>

      {/* Información del método */}
      <Card>
        <CardHeader>
          <CardTitle>¿Qué es el Método de Loci?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            El <strong>Método de Loci</strong> (Palacio de la Memoria) es una técnica de 
            memorización ancestral que usa la memoria espacial para recordar información.
          </p>
          <p>
            Utilizada por campeones mundiales de memoria, esta técnica te permite memorizar 
            cientos de ítems con práctica consistente.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mt-4">
            <h4 className="font-semibold mb-2">Progresión de niveles:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Nivel 1:</strong> 10 objetos - Familiarización</li>
              <li><strong>Nivel 2:</strong> 20 ítems mixtos - Primeros pasos</li>
              <li><strong>Nivel 3:</strong> 40 rostros + nombres - Networking</li>
              <li><strong>Nivel 4:</strong> 60 rostros + rasgos - Profundidad</li>
              <li><strong>Nivel 5:</strong> 100 ítems complejos - Maestría</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
