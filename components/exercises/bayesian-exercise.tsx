'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProbabilitySlider, CalibratedProbabilitySlider } from './probability-slider';
import { calculateBrierScore } from '@/lib/metrics/brier-score';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  TrendingUp,
  Info,
  Lightbulb,
  Target
} from 'lucide-react';

interface BayesianExerciseProps {
  level: number; // 1-5
  onComplete: (result: ExerciseResult) => void;
}

interface ExerciseResult {
  correct: boolean;
  responseTime: number;
  userProbability: number;
  correctProbability: number;
  brierScore: number;
  scenarioId: string;
  updateStep?: number; // Para ejercicios de actualización múltiple
  biasDetected?: string[];
}

interface Scenario {
  id: string;
  level: number;
  type: 'probability_update' | 'calibration' | 'bias_detection';
  scenario: string;
  initial_question: string;
  correct_probability?: number;
  correct_initial?: number;
  updates?: Array<{
    new_evidence: string;
    correct_updated_probability: number;
    likelihood_if_guilty?: number;
    likelihood_if_innocent?: number;
  }>;
  explanation: string;
  bias_name?: string;
  bias_explanation?: string;
  bias_tags?: string[];
  difficulty: string;
  topic: string;
}

export function BayesianExercise({ level, onComplete }: BayesianExerciseProps) {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentUpdateStep, setCurrentUpdateStep] = useState(0);
  const [userProbability, setUserProbability] = useState(50);
  const [startTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [userHistory, setUserHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar escenario basado en nivel
  useEffect(() => {
    loadScenario();
  }, [level]);

  const loadScenario = async () => {
    try {
      const response = await fetch('/datasets/bayesian/scenarios.json');
      const data = await response.json();
      
      // Filtrar por nivel
      const levelScenarios = data.scenarios.filter(
        (s: Scenario) => s.level === level
      );
      
      if (levelScenarios.length === 0) {
        console.error('No scenarios found for level', level);
        return;
      }

      // Seleccionar escenario aleatorio del nivel
      const randomScenario = levelScenarios[
        Math.floor(Math.random() * levelScenarios.length)
      ];
      
      setScenario(randomScenario);
      setLoading(false);
      
      // Para ejercicios de actualización, empezar con probabilidad inicial si está definida
      if (randomScenario.type === 'probability_update' && randomScenario.correct_initial) {
        setUserProbability(Math.round(randomScenario.correct_initial * 100));
      }
    } catch (error) {
      console.error('Error loading scenario:', error);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!scenario) return;

    const responseTime = Date.now() - startTime;
    const userProb = userProbability / 100;

    // Determinar probabilidad correcta según el tipo y paso actual
    let correctProb = 0;
    
    if (scenario.type === 'probability_update' && scenario.updates && scenario.updates.length > 0) {
      if (currentUpdateStep === 0 && scenario.correct_initial) {
        correctProb = scenario.correct_initial;
      } else if (currentUpdateStep > 0 && currentUpdateStep <= scenario.updates.length) {
        correctProb = scenario.updates[currentUpdateStep - 1].correct_updated_probability;
      }
    } else {
      correctProb = scenario.correct_probability || 0.5;
    }

    // Calcular Brier Score
    const brierScore = calculateBrierScore([
      { predicted: userProb, actual: correctProb >= 0.5 }
    ]);

    // Detectar sesgos comunes
    const biasesDetected: string[] = [];
    
    // Sesgo de extremos (overconfidence)
    if (userProb > 0.9 || userProb < 0.1) {
      if (Math.abs(userProb - correctProb) > 0.2) {
        biasesDetected.push('overconfidence');
      }
    }

    // Anclaje en 50%
    if (userProb === 0.5 && Math.abs(correctProb - 0.5) > 0.2) {
      biasesDetected.push('anchoring_50');
    }

    // Base rate neglect
    if (scenario.bias_tags?.includes('base_rate_neglect')) {
      if (Math.abs(userProb - correctProb) > 0.3) {
        biasesDetected.push('base_rate_neglect');
      }
    }

    // Guardar en historial
    setUserHistory([...userHistory, userProbability]);

    // Verificar si hay más actualizaciones
    const hasMoreUpdates = scenario.updates && currentUpdateStep < scenario.updates.length;

    if (hasMoreUpdates && !showFeedback) {
      // Mostrar feedback parcial y continuar al siguiente update
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
        setCurrentUpdateStep(currentUpdateStep + 1);
      }, 3000);
    } else {
      // Ejercicio completado
      setShowFeedback(true);

      const isCorrect = Math.abs(userProb - correctProb) < 0.15; // Margen de ±15%

      setTimeout(() => {
        onComplete({
          correct: isCorrect,
          responseTime,
          userProbability: userProb,
          correctProbability: correctProb,
          brierScore,
          scenarioId: scenario.id,
          updateStep: currentUpdateStep,
          biasDetected: biasesDetected,
        });
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Error al cargar el ejercicio</p>
      </div>
    );
  }

  // Renderizar feedback
  if (showFeedback) {
    const userProb = userProbability / 100;
    const correctProb = scenario.updates && currentUpdateStep > 0
      ? scenario.updates[currentUpdateStep - 1].correct_updated_probability
      : scenario.correct_probability || scenario.correct_initial || 0.5;

    const error = Math.abs(userProb - correctProb);
    const isAccurate = error < 0.15;

    return (
      <Card className="p-6 space-y-6">
        <div className="text-center">
          {isAccurate ? (
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-orange-500 mb-4" />
          )}
          
          <h3 className="text-2xl font-bold mb-2">
            {isAccurate ? '¡Excelente calibración!' : 'Buena aproximación'}
          </h3>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Tu estimación</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {userProbability}%
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Probabilidad correcta</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {Math.round(correctProb * 100)}%
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span className="font-semibold">Error absoluto:</span>
              <span className={`font-bold ${error < 0.1 ? 'text-green-600' : error < 0.2 ? 'text-yellow-600' : 'text-orange-600'}`}>
                {(error * 100).toFixed(1)}%
              </span>
            </div>
            <Progress value={Math.max(0, 100 - error * 100)} className="h-2" />
          </div>
        </div>

        {/* Explicación */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                Explicación
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {scenario.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Detección de sesgos */}
        {scenario.bias_name && (
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2 text-orange-900 dark:text-orange-100">
                  Sesgo Cognitivo: {scenario.bias_name}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {scenario.bias_explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mostrar historial de actualizaciones si aplica */}
        {userHistory.length > 1 && (
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tu proceso de actualización bayesiana
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {userHistory.map((prob, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="bg-white dark:bg-gray-700 px-3 py-1 rounded border border-gray-300 dark:border-gray-600">
                    <span className="text-sm font-mono">{prob}%</span>
                  </div>
                  {idx < userHistory.length - 1 && (
                    <span className="mx-2 text-gray-400">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    );
  }

  // Renderizar ejercicio activo
  const currentQuestion = currentUpdateStep === 0
    ? scenario.initial_question
    : scenario.updates?.[currentUpdateStep - 1]?.new_evidence || '';

  return (
    <div className="space-y-6">
      {/* Header con info del ejercicio */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Nivel {level} • {scenario.type === 'probability_update' ? 'Actualización Bayesiana' : 
                           scenario.type === 'calibration' ? 'Calibración' : 
                           'Detección de Sesgos'}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTheory(!showTheory)}
        >
          <Info className="h-4 w-4 mr-2" />
          {showTheory ? 'Ocultar' : 'Teoría'}
        </Button>
      </div>

      {/* Panel de teoría */}
      {showTheory && (
        <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
            💡 Razonamiento Bayesiano
          </h4>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p>
              <strong>Teorema de Bayes:</strong> P(H|E) = P(E|H) × P(H) / P(E)
            </p>
            <p>
              • <strong>Prior (P(H)):</strong> Probabilidad inicial (tasa base)
            </p>
            <p>
              • <strong>Likelihood (P(E|H)):</strong> Probabilidad de ver la evidencia si la hipótesis es cierta
            </p>
            <p>
              • <strong>Posterior (P(H|E)):</strong> Probabilidad actualizada después de ver la evidencia
            </p>
            {level >= 4 && (
              <>
                <p className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
                  <strong>Superforecasting (Tetlock):</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Usa tasas base (clase de referencia)</li>
                  <li>Actualiza incrementalmente con nueva evidencia</li>
                  <li>Evita extremos (0-5%, 95-100%) sin evidencia abrumadora</li>
                  <li>Calibra: si dices 70%, debe suceder ~70% del tiempo</li>
                  <li>Evita narrativas; busca señales objetivas</li>
                </ul>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Escenario */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full mb-3">
              {scenario.topic.replace('_', ' ').toUpperCase()}
            </span>
            <h3 className="text-lg font-semibold mb-3">Escenario</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {scenario.scenario}
            </p>
          </div>

          {/* Mostrar evidencia de actualizaciones previas */}
          {currentUpdateStep > 0 && scenario.updates && (
            <div className="space-y-2">
              {scenario.updates.slice(0, currentUpdateStep).map((update, idx) => (
                <div key={idx} className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border-l-4 border-yellow-400">
                  <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                    📊 Evidencia #{idx + 1}:
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {update.new_evidence}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Tu estimación anterior: {userHistory[idx]}%
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Nueva evidencia (si hay) */}
          {currentUpdateStep > 0 && scenario.updates && scenario.updates[currentUpdateStep - 1] && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border-l-4 border-green-500">
              <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                🆕 Nueva evidencia:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {scenario.updates[currentUpdateStep - 1].new_evidence}
              </p>
            </div>
          )}

          {/* Pregunta */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {currentUpdateStep === 0 ? scenario.initial_question : 
                '¿Cuál es tu nueva probabilidad actualizada?'}
            </p>
          </div>
        </div>
      </Card>

      {/* Slider de probabilidad */}
      <Card className="p-6">
        {level >= 4 ? (
          <CalibratedProbabilitySlider
            value={userProbability}
            onChange={setUserProbability}
            label="Tu estimación de probabilidad"
          />
        ) : (
          <ProbabilitySlider
            value={userProbability}
            onChange={setUserProbability}
            label="Tu estimación de probabilidad"
            showPercentage={true}
          />
        )}
      </Card>

      {/* Botón de envío */}
      <Button
        onClick={handleSubmit}
        className="w-full"
        size="lg"
      >
        {scenario.updates && currentUpdateStep < scenario.updates.length 
          ? 'Actualizar y Continuar' 
          : 'Confirmar Respuesta'}
      </Button>

      {/* Indicador de progreso para ejercicios con múltiples updates */}
      {scenario.updates && scenario.updates.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: scenario.updates.length + 1 }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-8 rounded-full transition-colors ${
                idx <= currentUpdateStep 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
