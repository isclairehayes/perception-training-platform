'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudyItem } from '@/components/exercises/memory-exercise';
import { MemoryLocation } from './memory-palace-setup';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Clock, Brain, TrendingDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface MemoryResultsProps {
  studyItems: StudyItem[];
  userRecalls: Map<string, string>;
  memoryPalace: MemoryLocation[];
  studyTime: number;
  recallTime: number;
  level: number;
  onRetry: () => void;
  onFinish: () => void;
}

export function MemoryResults({
  studyItems,
  userRecalls,
  memoryPalace,
  studyTime,
  recallTime,
  level,
  onRetry,
  onFinish,
}: MemoryResultsProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Calcular resultados
  const results = studyItems.map(item => {
    const userAnswer = userRecalls.get(item.id) || '';
    const correct = userAnswer.toLowerCase().trim() === item.name.toLowerCase().trim();
    const skipped = userAnswer === '';
    
    return {
      item,
      userAnswer,
      correct,
      skipped,
    };
  });

  const correct = results.filter(r => r.correct).length;
  const incorrect = results.filter(r => !r.correct && !r.skipped).length;
  const skipped = results.filter(r => r.skipped).length;
  const accuracy = (correct / studyItems.length) * 100;

  // Datos de curva de olvido (Ebbinghaus)
  const forgettingCurveData = [
    { time: '0 min', retention: 100, ideal: 100 },
    { time: '20 min', retention: accuracy > 80 ? 90 : 70, ideal: 58 },
    { time: '1 hora', retention: accuracy > 80 ? 85 : 60, ideal: 44 },
    { time: '9 horas', retention: accuracy > 80 ? 80 : 50, ideal: 36 },
    { time: '1 día', retention: accuracy > 80 ? 75 : 40, ideal: 33 },
    { time: '2 días', retention: accuracy > 80 ? 70 : 35, ideal: 28 },
    { time: '6 días', retention: accuracy > 80 ? 65 : 30, ideal: 25 },
    { time: '31 días', retention: accuracy > 80 ? 60 : 25, ideal: 21 },
  ];

  return (
    <div className="space-y-6">
      {/* Header con resultado principal */}
      <Card className={`${
        accuracy >= 80 ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950' :
        accuracy >= 60 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950' :
        'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950'
      }`}>
        <CardContent className="p-8 text-center">
          <Trophy className={`w-16 h-16 mx-auto mb-4 ${
            accuracy >= 80 ? 'text-green-600' :
            accuracy >= 60 ? 'text-yellow-600' :
            'text-orange-600'
          }`} />
          <h2 className="text-3xl font-bold mb-2">
            {accuracy >= 80 ? '¡Excelente!' :
             accuracy >= 60 ? '¡Bien hecho!' :
             '¡Sigue practicando!'}
          </h2>
          <p className="text-5xl font-bold mb-4">
            {accuracy.toFixed(1)}%
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {correct} de {studyItems.length} ítems recordados correctamente
          </p>
        </CardContent>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{correct}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Correctos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">{incorrect}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Incorrectos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-600">{skipped}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Saltados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(recallTime / 1000)}s
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tiempo</p>
          </CardContent>
        </Card>
      </div>

      {/* Curva de olvido */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Curva de Olvido Proyectada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Basado en la Curva de Olvido de Ebbinghaus. La línea azul muestra tu retención proyectada 
            según tu rendimiento actual ({accuracy.toFixed(0)}%). La línea gris es la curva promedio sin repaso.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forgettingCurveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis label={{ value: 'Retención (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="retention" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Tu retención proyectada"
              />
              <Line 
                type="monotone" 
                dataKey="ideal" 
                stroke="#9ca3af" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Curva promedio (sin repaso)"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Tip:</strong> Para maximizar la retención a largo plazo, repasa este ejercicio:
            </p>
            <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
              <li>En 24 horas (retención ~75%)</li>
              <li>En 1 semana (retención ~65%)</li>
              <li>En 1 mes (retención ~60%)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Detalles por ítem */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Detalles por Ítem
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Ocultar' : 'Mostrar'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showDetails && (
          <CardContent>
            <div className="space-y-2">
              {results.map((result, idx) => {
                const location = memoryPalace.find(loc => loc.id === result.item.locationId);
                return (
                  <div
                    key={result.item.id}
                    className={`p-3 rounded-lg ${
                      result.correct ? 'bg-green-50 dark:bg-green-950' :
                      result.skipped ? 'bg-gray-50 dark:bg-gray-900' :
                      'bg-red-50 dark:bg-red-950'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {result.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : result.skipped ? (
                          <AlertCircle className="w-5 h-5 text-gray-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-gray-500">
                            {location?.name || 'Sin ubicación'}
                          </span>
                        </div>
                        <p className="font-medium">
                          Correcto: <span className="text-green-700 dark:text-green-300">{result.item.name}</span>
                        </p>
                        {!result.correct && (
                          <p className="text-sm">
                            Tu respuesta: <span className={result.skipped ? 'text-gray-500' : 'text-red-600 dark:text-red-400'}>
                              {result.userAnswer || '(Saltado)'}
                            </span>
                          </p>
                        )}
                        {result.item.traits && result.item.traits.length > 0 && (
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Rasgos: {result.item.traits.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Acciones */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={onRetry}
          variant="outline"
          size="lg"
        >
          Reintentar
        </Button>
        <Button
          onClick={onFinish}
          size="lg"
        >
          Finalizar y Guardar
        </Button>
      </div>
    </div>
  );
}
