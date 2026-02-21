'use client';

import { Card } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ReferenceLine,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Target, TrendingUp, Award } from 'lucide-react';

interface CalibrationData {
  bin: string;
  predicted: number;
  actual: number;
  count: number;
}

interface BrierScoreHistory {
  date: string;
  score: number;
  exerciseId: string;
}

interface CalibrationChartProps {
  calibrationData: CalibrationData[];
  brierScore: number;
  brierHistory?: BrierScoreHistory[];
  className?: string;
}

export function CalibrationChart({ 
  calibrationData, 
  brierScore,
  brierHistory,
  className 
}: CalibrationChartProps) {
  
  // Preparar datos para el gráfico de calibración
  const chartData = calibrationData
    .filter(d => d.count > 0)
    .map(d => ({
      bin: d.bin,
      predicted: Math.round(d.predicted * 100),
      actual: Math.round(d.actual * 100),
      count: d.count,
    }));

  // Línea perfecta de calibración (y = x)
  const perfectLine = calibrationData.map(d => ({
    bin: d.bin,
    perfect: Math.round(((parseFloat(d.bin.split('-')[0]) + parseFloat(d.bin.split('-')[1].replace('%', ''))) / 2)),
  }));

  // Calcular nivel de calibración
  const getCalibrationLevel = (score: number): { level: string; color: string; message: string } => {
    if (score < 0.05) return { 
      level: 'Superforecaster', 
      color: 'text-purple-600',
      message: '¡Calibración excepcional! Estás en el top 1%.'
    };
    if (score < 0.1) return { 
      level: 'Excelente', 
      color: 'text-green-600',
      message: 'Muy buena calibración. Sigue así.'
    };
    if (score < 0.2) return { 
      level: 'Bueno', 
      color: 'text-blue-600',
      message: 'Buena calibración. Hay margen de mejora.'
    };
    if (score < 0.3) return { 
      level: 'Aceptable', 
      color: 'text-yellow-600',
      message: 'Calibración moderada. Sigue practicando.'
    };
    return { 
      level: 'Necesita mejorar', 
      color: 'text-orange-600',
      message: 'Tu calibración necesita trabajo. Revisa la teoría bayesiana.'
    };
  };

  const calibrationLevel = getCalibrationLevel(brierScore);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Brier Score actual */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Brier Score
            </span>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {brierScore.toFixed(3)}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            0 = perfecto, 1 = peor
          </p>
        </Card>

        {/* Nivel de calibración */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Nivel
            </span>
          </div>
          <div className={`text-2xl font-bold ${calibrationLevel.color}`}>
            {calibrationLevel.level}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {calibrationLevel.message}
          </p>
        </Card>

        {/* Tendencia */}
        {brierHistory && brierHistory.length > 1 && (
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Tendencia
              </span>
            </div>
            <div className="text-2xl font-bold">
              {(() => {
                const recent = brierHistory.slice(-5);
                const avg = recent.reduce((sum, h) => sum + h.score, 0) / recent.length;
                const older = brierHistory.slice(-10, -5);
                const oldAvg = older.length > 0 
                  ? older.reduce((sum, h) => sum + h.score, 0) / older.length 
                  : avg;
                const improvement = oldAvg - avg;
                return improvement > 0.01 ? (
                  <span className="text-green-600">📈 Mejorando</span>
                ) : improvement < -0.01 ? (
                  <span className="text-orange-600">📉 Empeorando</span>
                ) : (
                  <span className="text-gray-600">➡️ Estable</span>
                );
              })()}
            </div>
          </Card>
        )}
      </div>

      {/* Gráfico de calibración */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Gráfico de Calibración</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Si estás bien calibrado, tus puntos deberían estar cerca de la línea diagonal.
          Ejemplo: si predices 70% de confianza, deberías acertar ~70% de las veces.
        </p>
        
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="predicted" 
              name="Predicción" 
              unit="%"
              domain={[0, 100]}
              label={{ value: 'Probabilidad Predicha (%)', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="number" 
              dataKey="actual" 
              name="Real" 
              unit="%"
              domain={[0, 100]}
              label={{ value: 'Resultado Real (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-gray-800 p-3 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                      <p className="font-semibold">{data.bin}</p>
                      <p className="text-sm text-blue-600">Predicho: {data.predicted}%</p>
                      <p className="text-sm text-green-600">Real: {data.actual}%</p>
                      <p className="text-xs text-gray-500">Casos: {data.count}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Línea de calibración perfecta */}
            <ReferenceLine 
              segment={[{ x: 0, y: 0 }, { x: 100, y: 100 }]} 
              stroke="#22c55e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ value: 'Calibración perfecta', position: 'top' }}
            />
            
            {/* Puntos de datos */}
            <Scatter 
              name="Tu calibración" 
              data={chartData} 
              fill="#3b82f6"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={
                    Math.abs(entry.predicted - entry.actual) < 10 
                      ? '#22c55e' // Verde si bien calibrado
                      : Math.abs(entry.predicted - entry.actual) < 20
                      ? '#eab308' // Amarillo si moderado
                      : '#ef4444' // Rojo si mal calibrado
                  }
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Bien calibrado (&lt;10% error)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderado (10-20% error)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Necesita mejora (&gt;20% error)</span>
          </div>
        </div>
      </Card>

      {/* Historial de Brier Score */}
      {brierHistory && brierHistory.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Historial de Brier Score</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Tu progreso a lo largo del tiempo. Busca tendencia descendente (mejora).
          </p>
          
          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={brierHistory.slice(-20)} // Últimos 20 ejercicios
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 1]}
                label={{ value: 'Brier Score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                        <p className="text-sm font-semibold">{data.date}</p>
                        <p className="text-sm text-blue-600">Score: {data.score.toFixed(3)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
              
              {/* Línea de referencia para "bueno" */}
              <ReferenceLine 
                y={0.1} 
                stroke="#22c55e" 
                strokeDasharray="3 3"
                label={{ value: 'Excelente', position: 'right', fill: '#22c55e' }}
              />
              <ReferenceLine 
                y={0.2} 
                stroke="#eab308" 
                strokeDasharray="3 3"
                label={{ value: 'Bueno', position: 'right', fill: '#eab308' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Distribución de predicciones */}
      {chartData.length > 0 && (
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Distribución de tus Predicciones</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            ¿Usas todo el rango de probabilidades o te anclas en 50%?
          </p>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bin" />
              <YAxis label={{ value: 'Número de predicciones', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>

          <p className="text-xs text-gray-500 mt-3">
            💡 Tip: Buenos forecasters usan todo el rango. Si te anclas en 40-60%, estás evitando comprometerte con predicciones claras.
          </p>
        </Card>
      )}
    </div>
  );
}
