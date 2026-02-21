# Módulo de Razonamiento Bayesiano

## Visión General

El módulo de razonamiento bayesiano entrena a los usuarios en:
- **Actualización bayesiana**: Cómo actualizar creencias con nueva evidencia
- **Calibración**: Alinear confianza subjetiva con precisión objetiva
- **Detección de sesgos**: Reconocer y evitar sesgos cognitivos comunes
- **Superforecasting**: Técnicas de Philip Tetlock para predicciones precisas

## Componentes

### 1. BayesianExercise (`components/exercises/bayesian-exercise.tsx`)

Componente principal del ejercicio que maneja:
- Carga de escenarios desde el dataset
- Progresión por niveles (1-5)
- Actualización bayesiana iterativa
- Feedback con explicaciones
- Detección automática de sesgos

**Props:**
```typescript
interface BayesianExerciseProps {
  level: number;        // 1-5
  onComplete: (result: ExerciseResult) => void;
}
```

**Resultado:**
```typescript
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
```

### 2. ProbabilitySlider (`components/exercises/probability-slider.tsx`)

Control deslizante de 0-100% para asignar probabilidades.

**Variantes:**
- `SimpleProbabilitySlider`: Versión básica para niveles 1-3
- `CalibratedProbabilitySlider`: Con zonas de calibración para niveles 4-5

**Props:**
```typescript
interface ProbabilitySliderProps {
  value: number;                    // 0-100
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
  showPercentage?: boolean;
  showCalibrationZones?: boolean;   // Muestra guías de calibración
  className?: string;
}
```

### 3. CalibrationChart (`components/exercises/calibration-chart.tsx`)

Visualización de calibración y Brier Score usando Recharts.

**Features:**
- Gráfico de dispersión de calibración (predicho vs real)
- Historial de Brier Score a lo largo del tiempo
- Distribución de predicciones
- Niveles de calibración (Superforecaster, Excelente, Bueno, etc.)

**Props:**
```typescript
interface CalibrationChartProps {
  calibrationData: CalibrationData[];
  brierScore: number;
  brierHistory?: BrierScoreHistory[];
  className?: string;
}
```

## Dataset

### Estructura del Dataset (`public/datasets/bayesian/scenarios.json`)

**55+ escenarios** organizados por:
- **Nivel**: 1 (básico) a 5 (superforecasting avanzado)
- **Tipo**: `probability_update`, `calibration`, `bias_detection`
- **Tópico**: medical, finance, politics, technology, etc.

**Ejemplo de escenario:**
```json
{
  "id": "bay_001",
  "level": 1,
  "type": "probability_update",
  "scenario": "Un test médico para una enfermedad rara...",
  "initial_question": "¿Cuál es la probabilidad de que realmente tengas la enfermedad?",
  "base_rate": 0.01,
  "true_positive_rate": 0.95,
  "false_positive_rate": 0.05,
  "correct_probability": 0.161,
  "explanation": "Usando el teorema de Bayes...",
  "bias_tags": ["base_rate_neglect"],
  "difficulty": "easy",
  "topic": "medical_testing"
}
```

### Tipos de Ejercicios

#### 1. Probability Update (Actualización Bayesiana)
Actualizar probabilidad con nueva evidencia, a veces en múltiples pasos.

**Campos clave:**
- `correct_initial`: Probabilidad inicial (tasa base)
- `updates`: Array de evidencias sucesivas
- `updates[].new_evidence`: Descripción de la nueva evidencia
- `updates[].correct_updated_probability`: Probabilidad correcta tras actualizar

#### 2. Calibration (Calibración)
Asignar probabilidad a eventos futuros y comparar con resultado real.

**Campos clave:**
- `correct_probability`: Probabilidad objetiva basada en tasas base
- `actual_outcome`: true/false (para cálculo de Brier Score)

#### 3. Bias Detection (Detección de Sesgos)
Identificar situaciones donde sesgos cognitivos distorsionan juicio.

**Campos clave:**
- `bias_name`: Nombre del sesgo (ej: "Falacia del Apostador")
- `bias_explanation`: Explicación del sesgo y cómo evitarlo
- `typical_biased_answer`: Respuesta típica sesgada
- `correct_probability`: Respuesta correcta

## Sesgos Cognitivos Implementados (20+)

1. **Base Rate Neglect** (Descuido de Tasa Base)
   - Ignorar tasa base al evaluar probabilidades
   - Ej: test médico con alta precisión pero enfermedad rara

2. **Overconfidence Bias** (Exceso de Confianza)
   - Sobreestimar precisión de predicciones
   - Ej: dar 90% de confianza cuando debería ser 60%

3. **Confirmation Bias** (Sesgo de Confirmación)
   - Buscar evidencia que confirma creencias, ignorar evidencia contraria
   - Ej: invertir en acción y solo leer noticias positivas

4. **Availability Heuristic** (Sesgo de Disponibilidad)
   - Sobreestimar eventos recientes o memorables
   - Ej: sobrestimar riesgo de accidentes aéreos tras noticia

5. **Anchoring Bias** (Anclaje)
   - Anclarse en información inicial irrelevante
   - Ej: precio de compra de acción afecta decisión de vender

6. **Gambler's Fallacy** (Falacia del Apostador)
   - Creer que eventos pasados afectan probabilidad de eventos independientes
   - Ej: "salió cara 5 veces, ahora DEBE salir cruz"

7. **Hot Hand Fallacy** (Falacia de Racha Caliente)
   - Creer en rachas en eventos aleatorios
   - Ej: "mi equipo ganó 5 veces, seguirá ganando"

8. **Sunk Cost Fallacy** (Falacia del Costo Hundido)
   - Dejar que inversiones pasadas influyan en decisiones futuras
   - Ej: "ya perdí $500, debo recuperarlo"

9. **Loss Aversion** (Aversión a la Pérdida)
   - Sobrevalorar pérdidas vs ganancias equivalentes
   - Ej: mantener inversión perdedora para "no perder"

10. **Optimism Bias** (Sesgo de Optimismo)
    - Sobrestimar probabilidad de eventos positivos
    - Ej: "mi startup SEGURO tendrá éxito"

11. **Representativeness Heuristic** (Heurística de Representatividad)
    - Juzgar probabilidad por cuán "típico" parece
    - Ej: Steve "parece" bibliotecario pero hay más granjeros

12. **Conjunction Fallacy** (Falacia de Conjunción)
    - Creer que A∩B es más probable que A solo
    - Ej: famoso problema de Linda (Kahneman & Tversky)

13. **Regression to the Mean**
    - No anticipar regresión a la media tras eventos extremos
    - Ej: rendimiento excepcional seguido de rendimiento promedio

14. **Recency Bias** (Sesgo de Recencia)
    - Sobreponderar información reciente
    - Ej: 5 startups exitosas recientes → todas tendrán éxito

15. **Normalcy Bias** (Sesgo de Normalidad)
    - Subestimar riesgo de eventos extremos
    - Ej: "nunca pasará una pandemia"

16. **Planning Fallacy** (Falacia de Planificación)
    - Subestimar tiempo/recursos necesarios
    - Ej: "proyecto terminará a tiempo" (casi nunca)

17. **Narrative Fallacy** (Falacia de Narrativa)
    - Construir narrativas coherentes ignorando incertidumbre
    - Ej: explicar mercado retrospectivamente

18. **Scope Insensitivity** (Insensibilidad a Escala)
    - No ajustar estimaciones según magnitud
    - Ej: donar igual para salvar 100 o 10,000 aves

19. **Binary Thinking** (Pensamiento Binario)
    - Ver eventos como 0% o 100% sin matices
    - Ej: "ganará seguro" o "perderá seguro"

20. **Conservatism Bias** (Sesgo de Conservadurismo)
    - Actualizar creencias demasiado lentamente
    - Ej: Problema de Monty Hall - no actualizar suficiente

## Niveles de Dificultad

### Nivel 1: Introducción (Probabilidades Simples)
- **Objetivos**: 
  - Entender concepto de probabilidad
  - Reconocer sesgos básicos (Falacia del Apostador, Disponibilidad)
  - Aplicar tasa base simple
- **Ejercicios típicos**:
  - Test médico con tasa base
  - Problema de Monty Hall
  - Lanzamiento de monedas
- **Sin actualizaciones múltiples**
- **Margen de error aceptado**: ±20%

### Nivel 2: Actualización Básica
- **Objetivos**:
  - Una actualización bayesiana simple
  - Calibración básica
  - Sesgos intermedios (Anclaje, Confirmación)
- **Ejercicios típicos**:
  - Investigación con una evidencia
  - Predicciones simples de negocios
  - Calibración con eventos conocidos
- **1 actualización bayesiana**
- **Margen de error aceptado**: ±15%

### Nivel 3: Actualización Múltiple
- **Objetivos**:
  - Múltiples actualizaciones bayesianas
  - Evidencia acumulativa
  - Sesgos complejos (Costo Hundido, Regresión a la Media)
- **Ejercicios típicos**:
  - Startup con múltiples señales
  - Investigación criminal con evidencia contradictoria
  - Predicción electoral con encuestas cambiantes
- **2-3 actualizaciones bayesianas**
- **Margen de error aceptado**: ±12%

### Nivel 4: Escenarios Complejos
- **Objetivos**:
  - Forecasting en dominios complejos
  - Sesgos sutiles
  - Calibración avanzada con zonas
- **Ejercicios típicos**:
  - Predicción geopolítica
  - Riesgos de cola
  - Análisis M&A
- **3+ actualizaciones o escenarios muy complejos**
- **Margen de error aceptado**: ±10%
- **Slider muestra zonas de calibración**

### Nivel 5: Superforecasting
- **Objetivos**:
  - Técnicas de Tetlock: clase de referencia, actualización incremental
  - Evitar extremos (0-5%, 95-100%) sin evidencia abrumadora
  - Calibración precisa (<0.05 Brier Score)
  - Forecasting de riesgos globales
- **Ejercicios típicos**:
  - Predicción de AGI
  - Riesgos existenciales
  - Pandemias globales
  - Forecasting electoral avanzado
- **Escenarios de máxima complejidad**
- **Margen de error aceptado**: ±8%
- **Guías de Superforecasting integradas**

## Brier Score

### Cálculo
```typescript
Brier Score = (1/N) * Σ(predicted - actual)²
```

- **0.0**: Perfecto
- **< 0.05**: Superforecaster
- **< 0.1**: Excelente
- **< 0.2**: Bueno
- **< 0.3**: Aceptable
- **≥ 0.3**: Necesita mejorar

### Interpretación
El Brier Score penaliza:
- Estar muy seguro y equivocarse (ej: 90% y falla)
- Estar poco seguro cuando deberías estarlo (ej: 50% y es obvio)

**Mejor que Brier Score**: Calibración precisa en todo el rango.

### Cálculo de Calibración
Ver `lib/metrics/brier-score.ts`:
- Divide predicciones en bins (0-10%, 10-20%, etc.)
- Compara confianza promedio vs tasa de aciertos
- Si dices 70% en 10 casos, deberías acertar ~7

## Teoría Bayesiana

### Teorema de Bayes
```
P(H|E) = P(E|H) × P(H) / P(E)
```

Donde:
- **P(H)**: Prior (probabilidad inicial, tasa base)
- **P(E|H)**: Likelihood (probabilidad de evidencia si hipótesis es cierta)
- **P(H|E)**: Posterior (probabilidad actualizada)
- **P(E)**: Evidencia total = P(E|H)×P(H) + P(E|¬H)×P(¬H)

### Ejemplo Práctico
**Escenario**: Test médico 95% preciso, enfermedad afecta 1%

```
Prior: P(Enfermo) = 0.01
Likelihood: P(Positivo|Enfermo) = 0.95
False Positive: P(Positivo|Sano) = 0.05

P(Enfermo|Positivo) = (0.95 × 0.01) / [(0.95 × 0.01) + (0.05 × 0.99)]
                    = 0.0095 / (0.0095 + 0.0495)
                    = 0.0095 / 0.059
                    ≈ 0.161 (16.1%)
```

**Intuición**: Aunque el test es 95% preciso, la baja tasa base (1%) hace que la mayoría de positivos sean falsos positivos.

## Superforecasting (Philip Tetlock)

### Principios Clave

1. **Usa Clase de Referencia**
   - Empieza con tasa base de casos similares
   - "¿Cuántas veces ha pasado esto antes?"

2. **Actualiza Incrementalmente**
   - No saltes de 50% a 90% con una sola noticia
   - Actualiza gradualmente: 50% → 55% → 62% → 68%

3. **Evita Extremos**
   - Reserva 0-5% y 95-100% para certeza casi absoluta
   - Usa rango 20-80% para la mayoría de casos

4. **Calibración Continua**
   - Revisa tus predicciones pasadas
   - Si dices 70%, debe suceder ~70% del tiempo

5. **Evita Narrativas**
   - No construyas historias coherentes
   - Busca señales objetivas y cuantificables

6. **Descompón la Pregunta**
   - Break down en subpreguntas
   - Fermi estimation cuando sea útil

7. **Considera Visión Contraria**
   - ¿Por qué podría estar equivocado?
   - Red team tu propia predicción

8. **Actualiza con Evidencia, No con Ruido**
   - Distingue señal de ruido
   - No actualices por cada tweet

## Uso del Módulo

### Integración Básica
```tsx
import { BayesianExercise } from '@/components/exercises/bayesian-exercise';

function MyPage() {
  const handleComplete = (result: ExerciseResult) => {
    console.log('Brier Score:', result.brierScore);
    console.log('Sesgos detectados:', result.biasDetected);
    // Guardar en base de datos, actualizar progreso, etc.
  };

  return (
    <BayesianExercise 
      level={3} 
      onComplete={handleComplete} 
    />
  );
}
```

### Visualización de Calibración
```tsx
import { CalibrationChart } from '@/components/exercises/calibration-chart';
import { calculateCalibration } from '@/lib/metrics/brier-score';

function CalibrationDashboard({ userPredictions }) {
  const calibrationData = calculateCalibration(userPredictions);
  const brierScore = calculateBrierScore(userPredictions);

  return (
    <CalibrationChart
      calibrationData={calibrationData}
      brierScore={brierScore}
      brierHistory={historyFromDB}
    />
  );
}
```

## Próximos Pasos

### Futuras Mejoras
1. **Dataset expandido**:
   - 100+ escenarios
   - Más dominios (clima, deportes, cultura pop)
   - Escenarios en tiempo real (predicciones verificables)

2. **Gamificación**:
   - Sistema de puntos basado en Brier Score
   - Leaderboards de calibración
   - Badges por niveles (Forecaster, Superforecaster, etc.)

3. **Competencias**:
   - Predicciones grupales
   - Comparación con otros usuarios
   - Forecasting tournaments

4. **Integración con datos reales**:
   - APIs de noticias para contexto
   - Verificación automática de predicciones pasadas
   - Mercados de predicción (Manifold, Metaculus)

5. **IA como tutor**:
   - Feedback personalizado con LLM
   - Identificación de patrones de sesgos
   - Recomendaciones de ejercicios

## Referencias

### Libros
- **"Superforecasting"** - Philip Tetlock & Dan Gardner
- **"Thinking, Fast and Slow"** - Daniel Kahneman
- **"The Signal and the Noise"** - Nate Silver
- **"How to Measure Anything"** - Douglas Hubbard

### Papers
- Tetlock, P. E. (2005). "Expert Political Judgment"
- Tversky, A., & Kahneman, D. (1974). "Judgment under Uncertainty: Heuristics and Biases"
- Brier, G. W. (1950). "Verification of Forecasts Expressed in Terms of Probability"

### Recursos Online
- [Good Judgment Project](https://goodjudgment.com/)
- [Metaculus](https://www.metaculus.com/)
- [LessWrong - Calibration](https://www.lesswrong.com/tag/calibration)
- [80,000 Hours - Forecasting](https://80000hours.org/articles/forecasting/)

---

**Versión**: 1.0  
**Última actualización**: 2026-02-21  
**Autor**: OpenClaw Agent  
**Licencia**: MIT
