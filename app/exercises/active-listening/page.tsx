'use client';

import { useState } from 'react';
import { ActiveListeningExercise } from '@/components/exercises/active-listening-exercise';
import { ExerciseWrapper } from '@/components/exercises/exercise-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { 
  DifficultyLevel,
  ActiveListeningExerciseResult 
} from '@/lib/exercises/active-listening-types';

export default function ActiveListeningPage() {
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(1);
  const [unlockedLevels, setUnlockedLevels] = useState<DifficultyLevel[]>([1]);
  const [showExercise, setShowExercise] = useState(false);

  const levelDescriptions: Record<DifficultyLevel, string> = {
    1: 'Información implícita obvia en conversaciones cotidianas',
    2: 'Presuposiciones simples en contextos profesionales',
    3: 'Afirmaciones Barnum vs información específica',
    4: 'Técnicas de Cold Reading combinadas',
    5: 'Análisis complejo: manipulación, gaslighting, evasión',
  };

  const handleComplete = (result: ActiveListeningExerciseResult) => {
    console.log('Exercise completed:', result);
    
    // Si pasó el nivel (>70% accuracy), desbloquear siguiente
    if (result.correct && currentLevel < 5) {
      const nextLevel = (currentLevel + 1) as DifficultyLevel;
      if (!unlockedLevels.includes(nextLevel)) {
        setUnlockedLevels([...unlockedLevels, nextLevel]);
      }
    }
    
    setShowExercise(false);
  };

  const handleStartLevel = (level: DifficultyLevel) => {
    setCurrentLevel(level);
    setShowExercise(true);
  };

  if (showExercise) {
    return (
      <ExerciseWrapper
        title={`Escucha Activa - Nivel ${currentLevel}`}
        description={levelDescriptions[currentLevel]}
        currentStep={0}
        totalSteps={1}
        onComplete={() => setShowExercise(false)}
      >
        <ActiveListeningExercise 
          level={currentLevel}
          onComplete={handleComplete}
        />
      </ExerciseWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <span className="text-5xl">🎯</span>
            Escucha Activa
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Entrena tu habilidad de detectar información implícita: presuposiciones, 
            omisiones, afirmaciones Barnum, y técnicas de cold reading.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">26</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Conversaciones</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl mb-2">❓</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">25</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Preguntas</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {unlockedLevels.length}/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Niveles Desbloqueados</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Levels */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Selecciona un Nivel</h2>
          
          {([1, 2, 3, 4, 5] as DifficultyLevel[]).map((level) => {
            const isUnlocked = unlockedLevels.includes(level);
            const isCurrent = currentLevel === level;
            
            return (
              <Card 
                key={level}
                className={`transition-all ${
                  isUnlocked 
                    ? 'hover:shadow-lg cursor-pointer border-2' 
                    : 'opacity-50 cursor-not-allowed'
                } ${
                  isCurrent ? 'border-blue-500' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${isUnlocked ? '' : 'grayscale'}`}>
                        {level === 1 ? '🌱' : level === 2 ? '🌿' : level === 3 ? '🌳' : level === 4 ? '🎭' : '🧠'}
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          Nivel {level}
                          {!isUnlocked && ' 🔒'}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {levelDescriptions[level]}
                        </p>
                      </div>
                    </div>
                    {isUnlocked && (
                      <Button 
                        onClick={() => handleStartLevel(level)}
                        variant={isCurrent ? 'primary' : 'outline'}
                      >
                        {isCurrent ? 'Continuar' : 'Comenzar'}
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Theory Reference */}
        <Card className="mt-8 bg-gradient-to-r from-purple-500/5 to-blue-500/5 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              Fundamentos Teóricos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold">🎭 Cold Reading:</span> Derren Brown
              </div>
              <div>
                <span className="font-semibold">⭐ Efecto Barnum:</span> Bertram Forer
              </div>
              <div>
                <span className="font-semibold">🧠 Meta-Modelo:</span> Bandler & Grinder (PNL)
              </div>
              <div>
                <span className="font-semibold">🔍 Presuposiciones:</span> Lingüística Cognitiva
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
