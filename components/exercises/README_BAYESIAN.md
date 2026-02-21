# Módulo de Razonamiento Bayesiano - Guía de Uso

## 🎯 Componentes Principales

### 1. BayesianExercise
**Ubicación**: `components/exercises/bayesian-exercise.tsx`

Componente principal del ejercicio interactivo.

```tsx
import { BayesianExercise } from '@/components/exercises/bayesian-exercise';

function TrainingPage() {
  const handleComplete = (result) => {
    console.log('Brier Score:', result.brierScore);
    console.log('Correcto:', result.correct);
    console.log('Sesgos detectados:', result.biasDetected);
    
    // Guardar resultado en base de datos
    saveToDB(result);
  };

  return (
    <BayesianExercise 
      level={3}              // 1-5
      onComplete={handleComplete} 
    />
  );
}
```

### 2. ProbabilitySlider
**Ubicación**: `components/exercises/probability-slider.tsx`

Control deslizante para asignar probabilidades (0-100%).

```tsx
import { 
  ProbabilitySlider,
  SimpleProbabilitySlider,
  CalibratedProbabilitySlider 
} from '@/components/exercises/probability-slider';

// Básico
<SimpleProbabilitySlider
  value={probability}
  onChange={setProbability}
  label="¿Cuál es la probabilidad?"
/>

// Avanzado con zonas de calibración
<CalibratedProbabilitySlider
  value={probability}
  onChange={setProbability}
  label="Asigna probabilidad (usa todo el rango)"
/>
```

### 3. CalibrationChart
**Ubicación**: `components/exercises/calibration-chart.tsx`

Visualización de calibración y Brier Score.

```tsx
import { CalibrationChart } from '@/components/exercises/calibration-chart';
import { calculateCalibration, calculateBrierScore } from '@/lib/metrics/brier-score';

function CalibrationDashboard() {
  // Obtener predicciones del usuario desde DB
  const predictions = [
    { predicted: 0.7, actual: true },
    { predicted: 0.3, actual: false },
    { predicted: 0.9, actual: true },
    // ...
  ];

  const calibrationData = calculateCalibration(predictions);
  const brierScore = calculateBrierScore(predictions);

  const brierHistory = [
    { date: '2026-02-15', score: 0.25, exerciseId: 'ex1' },
    { date: '2026-02-16', score: 0.18, exerciseId: 'ex2' },
    { date: '2026-02-17', score: 0.12, exerciseId: 'ex3' },
  ];

  return (
    <CalibrationChart
      calibrationData={calibrationData}
      brierScore={brierScore}
      brierHistory={brierHistory}
    />
  );
}
```

### 4. BiasLibrary
**Ubicación**: `components/exercises/bias-library.tsx`

Biblioteca interactiva de 20+ sesgos cognitivos.

```tsx
import { BiasLibrary } from '@/components/exercises/bias-library';

function BiasesPage() {
  return (
    <div>
      <h1>Sesgos Cognitivos</h1>
      <BiasLibrary />
    </div>
  );
}
```

## 📊 Dataset

**Ubicación**: `public/datasets/bayesian/scenarios.json`

55+ escenarios organizados por nivel (1-5) y tipo:
- `probability_update`: Actualización bayesiana
- `calibration`: Ejercicios de calibración
- `bias_detection`: Detección de sesgos

**Estructura**:
```json
{
  "id": "bay_001",
  "level": 1,
  "type": "probability_update",
  "scenario": "...",
  "initial_question": "...",
  "correct_probability": 0.161,
  "updates": [...],
  "explanation": "...",
  "bias_tags": ["base_rate_neglect"],
  "difficulty": "easy",
  "topic": "medical_testing"
}
```

## 🧮 Métricas

**Ubicación**: `lib/metrics/brier-score.ts`

### Brier Score
```typescript
import { calculateBrierScore } from '@/lib/metrics/brier-score';

const predictions = [
  { predicted: 0.7, actual: true },   // Buen forecaster
  { predicted: 0.3, actual: false },  // Bien calibrado
  { predicted: 0.9, actual: false },  // Overconfidence!
];

const score = calculateBrierScore(predictions);
// 0.0 = perfecto, 1.0 = peor
// < 0.05 = Superforecaster
// < 0.1 = Excelente
// < 0.2 = Bueno
```

### Calibración
```typescript
import { calculateCalibration } from '@/lib/metrics/brier-score';

const calibrationData = calculateCalibration(predictions);
// Retorna array con bins (0-10%, 10-20%, etc.)
// Compara probabilidad predicha vs tasa de aciertos real
```

## 🎮 Sistema de Niveles

### Nivel 1: Introducción
- Probabilidades simples sin actualización
- Conceptos básicos de tasa base
- Sesgos comunes (Falacia del Apostador)
- Margen de error: ±20%

### Nivel 2: Actualización Básica
- Una actualización bayesiana
- Calibración básica
- Sesgos intermedios (Anclaje, Confirmación)
- Margen de error: ±15%

### Nivel 3: Actualización Múltiple
- 2-3 actualizaciones bayesianas
- Evidencia acumulativa
- Sesgos complejos (Costo Hundido)
- Margen de error: ±12%

### Nivel 4: Escenarios Complejos
- 3+ actualizaciones o escenarios muy complejos
- Calibración con zonas
- Forecasting avanzado
- Margen de error: ±10%

### Nivel 5: Superforecasting
- Técnicas de Philip Tetlock
- Clase de referencia
- Evitar extremos (0-5%, 95-100%)
- Calibración precisa (Brier < 0.05)
- Margen de error: ±8%

## 🧪 Testing

```bash
# Verificar que los componentes se importan correctamente
npm run build

# Si hay errores de TypeScript, ejecutar:
npm run type-check
```

## 📚 Recursos Adicionales

### Documentación Completa
- **Módulo Bayesiano**: `docs/BAYESIAN_MODULE.md`
- **Arquitectura**: `ARCHITECTURE.md` (si existe)
- **Tipos**: `types/exercises.ts`

### Teoría
- Teorema de Bayes explicado en el componente
- Panel de teoría colapsable en ejercicios
- Explicaciones detalladas en cada feedback

### Sesgos
20+ sesgos cognitivos documentados con:
- Descripción clara
- Ejemplos concretos
- Cómo evitarlos
- Sesgos relacionados

## 🚀 Próximos Pasos

### Integración con Backend
```typescript
// Guardar resultado en Supabase
async function saveExerciseResult(result: ExerciseResult) {
  const { data, error } = await supabase
    .from('bayesian_results')
    .insert({
      user_id: userId,
      scenario_id: result.scenarioId,
      user_probability: result.userProbability,
      correct_probability: result.correctProbability,
      brier_score: result.brierScore,
      biases_detected: result.biasDetected,
      level: level,
      response_time_ms: result.responseTime,
      correct: result.correct,
      created_at: new Date().toISOString(),
    });

  return { data, error };
}
```

### Dashboard de Usuario
```typescript
// Obtener historial y mostrar progreso
async function getUserBayesianStats(userId: string) {
  const { data } = await supabase
    .from('bayesian_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  const predictions = data.map(d => ({
    predicted: d.user_probability,
    actual: d.correct,
  }));

  const brierScore = calculateBrierScore(predictions);
  const calibrationData = calculateCalibration(predictions);

  return {
    totalExercises: data.length,
    avgBrierScore: brierScore,
    calibrationData,
    recentResults: data.slice(0, 10),
  };
}
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'recharts'"
```bash
npm install recharts
```

### Error: "Module not found: Can't resolve '@/components/ui/...' "
Asegúrate de que los componentes UI (shadcn/ui) estén instalados:
```bash
npx shadcn-ui@latest add button card input progress
```

### Error: TypeScript en tipos de ejercicios
Verifica que `types/exercises.ts` incluya:
```typescript
export interface BayesianExercise extends BaseExercise {
  skill: 'bayesian_reasoning';
  type: 'probability_update' | 'calibration' | 'bias_detection';
  scenario: string;
  initial_question: string;
  updates?: BayesianUpdate[];
  correct_probability?: number;
  bias_name?: string;
  bias_explanation?: string;
}

export interface BayesianUpdate {
  new_evidence: string;
  correct_updated_probability: number;
}
```

## 📊 Métricas de Éxito

Un buen módulo bayesiano debe lograr:
- **Engagement**: >80% de usuarios completan al menos 5 ejercicios
- **Mejora**: Brier Score baja >20% después de 20 ejercicios
- **Calibración**: >50% de usuarios alcanzan Brier < 0.15 en nivel 3+
- **Retención**: Usuarios vuelven a practicar 3+ días por semana

## 🎉 Créditos

Basado en:
- **Superforecasting** - Philip Tetlock & Dan Gardner
- **Thinking, Fast and Slow** - Daniel Kahneman
- **The Signal and the Noise** - Nate Silver

---

**Versión**: 1.0  
**Última actualización**: 2026-02-21  
**Mantenedor**: OpenClaw Agent
