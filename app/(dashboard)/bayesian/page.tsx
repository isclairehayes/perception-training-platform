'use client';

import { useState } from 'react';
import { BayesianExercise } from '@/components/exercises/bayesian-exercise';
import { CalibrationChart } from '@/components/exercises/calibration-chart';
import { BiasLibrary } from '@/components/exercises/bias-library';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { calculateBrierScore, calculateCalibration } from '@/lib/metrics/brier-score';
import { 
  Brain, 
  Target, 
  BookOpen, 
  Trophy,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface ExerciseResult {
  correct: boolean;
  responseTime: number;
  userProbability: number;
  correctProbability: number;
  brierScore: number;
  scenarioId: string;
  updateStep?: number;
  biasDetected?: string[];
}

type TabType = 'practice' | 'stats' | 'biases';

export default function BayesianTrainingPage() {
  const [currentTab, setCurrentTab] = useState<TabType>('practice');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [allResults, setAllResults] = useState<ExerciseResult[]>([]);
  const [showExercise, setShowExercise] = useState(true);

  const handleExerciseComplete = (result: ExerciseResult) => {
    console.log('Exercise completed:', result);
    
    // Guardar resultado
    const newResults = [...allResults, result];
    setAllResults(newResults);
    setExercisesCompleted(exercisesCompleted + 1);

    // Calcular progreso
    const avgBrierScore = calculateBrierScore(
      newResults.map(r => ({
        predicted: r.userProbability,
        actual: r.correct
      }))
    );

    // Avanzar de nivel si el usuario es consistente
    if (exercisesCompleted > 0 && (exercisesCompleted + 1) % 5 === 0) {
      if (avgBrierScore < 0.15 && currentLevel < 5) {
        setTimeout(() => {
          alert(`¡Excelente! Has desbloqueado el nivel ${currentLevel + 1}`);
          setCurrentLevel(currentLevel + 1);
        }, 2000);
      }
    }

    // Reload exercise
    setTimeout(() => {
      setShowExercise(false);
      setTimeout(() => setShowExercise(true), 100);
    }, 3000);
  };

  // Calcular métricas
  const predictions = allResults.map(r => ({
    predicted: r.userProbability,
    actual: r.correct
  }));

  const brierScore = predictions.length > 0 
    ? calculateBrierScore(predictions) 
    : 1;
  
  const calibrationData = predictions.length > 0
    ? calculateCalibration(predictions)
    : [];

  const brierHistory = allResults.map((r, idx) => ({
    date: `Ej ${idx + 1}`,
    score: calculateBrierScore(
      predictions.slice(0, idx + 1)
    ),
    exerciseId: r.scenarioId,
  }));

  const getLevelProgress = () => {
    const exercisesInLevel = exercisesCompleted % 5;
    return (exercisesInLevel / 5) * 100;
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return 'Principiante';
      case 2: return 'Intermedio';
      case 3: return 'Avanzado';
      case 4: return 'Experto';
      case 5: return 'Superforecaster';
      default: return 'Nivel ' + level;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold">Razonamiento Bayesiano</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Entrena tu capacidad de actualizar probabilidades y detectar sesgos cognitivos
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Nivel</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {getLevelName(currentLevel)}
            </div>
            <Progress value={getLevelProgress()} className="h-1 mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Ejercicios</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {exercisesCompleted}
            </div>
            <p className="text-xs text-gray-500 mt-1">completados</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Brier Score</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {predictions.length > 0 ? brierScore.toFixed(3) : '--'}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {brierScore < 0.1 ? '¡Excelente!' : brierScore < 0.2 ? 'Bueno' : 'Sigue practicando'}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sesgos</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {allResults.reduce((sum, r) => sum + (r.biasDetected?.length || 0), 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">detectados</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCurrentTab('practice')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              currentTab === 'practice'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-purple-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Practicar
            </div>
          </button>
          <button
            onClick={() => setCurrentTab('stats')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              currentTab === 'stats'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-purple-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Estadísticas
            </div>
          </button>
          <button
            onClick={() => setCurrentTab('biases')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              currentTab === 'biases'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-purple-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Sesgos Cognitivos
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="mb-8">
          {currentTab === 'practice' && (
            <div>
              {/* Level selector */}
              <Card className="p-4 mb-6">
                <h3 className="font-semibold mb-3">Selecciona nivel de dificultad</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map(level => (
                    <Button
                      key={level}
                      variant={currentLevel === level ? 'primary' : 'outline'}
                      onClick={() => {
                        setCurrentLevel(level);
                        setShowExercise(false);
                        setTimeout(() => setShowExercise(true), 100);
                      }}
                      className="flex flex-col gap-1 h-auto py-3"
                    >
                      <span className="text-lg font-bold">Nivel {level}</span>
                      <span className="text-xs opacity-80">
                        {getLevelName(level)}
                      </span>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Exercise */}
              {showExercise && (
                <BayesianExercise
                  level={currentLevel}
                  onComplete={handleExerciseComplete}
                />
              )}

              {/* Quick tips */}
              <Card className="p-4 mt-6 bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  💡 Tips de Superforecasting
                </h4>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Empieza con la tasa base (clase de referencia)</li>
                  <li>• Actualiza gradualmente, no saltes de 50% a 95%</li>
                  <li>• Reserva 0-5% y 95-100% solo para certeza casi absoluta</li>
                  <li>• Si dices 70%, debería suceder ~70% del tiempo</li>
                  <li>• Busca evidencia que contradiga tu hipótesis</li>
                </ul>
              </Card>
            </div>
          )}

          {currentTab === 'stats' && (
            <div>
              {predictions.length > 0 ? (
                <CalibrationChart
                  calibrationData={calibrationData}
                  brierScore={brierScore}
                  brierHistory={brierHistory}
                />
              ) : (
                <Card className="p-12 text-center">
                  <Target className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No hay datos todavía</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Completa algunos ejercicios para ver tu calibración y progreso
                  </p>
                  <Button onClick={() => setCurrentTab('practice')}>
                    Empezar a practicar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              )}
            </div>
          )}

          {currentTab === 'biases' && (
            <BiasLibrary />
          )}
        </div>
      </div>
    </div>
  );
}
