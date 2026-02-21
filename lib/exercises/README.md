# Exercises Library

Esta carpeta contiene todos los módulos de ejercicios para la Perception Training Platform.

## Módulos Disponibles

### ✅ Active Listening (Escucha Activa)
**Estado**: Completo  
**Archivos**:
- `active-listening-types.ts` - Tipos TypeScript
- `active-listening-theory.ts` - Teoría educativa (6 secciones)
- `active-listening-dataset.ts` - Dataset (26 conversaciones, 100+ info implícita)
- `active-listening-exercises.ts` - Preguntas (25 ejercicios)

**Componente**: `components/exercises/active-listening-exercise.tsx`

**Características**:
- 5 niveles de dificultad progresiva
- Teoría basada en Derren Brown (cold reading) y PNL (meta-modelo)
- Detección de presuposiciones, omisiones, generalizaciones, distorsiones
- Identificación de afirmaciones Barnum y técnicas de cold reading
- Sistema de métricas: precisión, falsos positivos, tiempo de respuesta

**Uso**:
```tsx
import { ActiveListeningExercise } from '@/components/exercises/active-listening-exercise';

<ActiveListeningExercise 
  level={1} 
  onComplete={(result) => handleComplete(result)}
/>
```

### 🚧 Microexpressions (Microexpresiones)
**Estado**: En desarrollo  
**Componente**: `components/exercises/microexpression-exercise.tsx`

## Estructura de un Módulo Completo

Cada módulo de ejercicio debe incluir:

### 1. Types (`{module}-types.ts`)
```typescript
export interface ExerciseResult {
  correct: boolean;
  responseTime: number;
  // ... métricas específicas del módulo
}

export interface ExerciseData {
  id: string;
  level: DifficultyLevel;
  // ... datos del ejercicio
}
```

### 2. Theory (`{module}-theory.ts`)
```typescript
export interface TheorySection {
  id: string;
  title: string;
  content: string;
  examples: string[];
  difficulty: DifficultyLevel;
}

export const THEORY: TheorySection[] = [...];
```

### 3. Dataset (`{module}-dataset.ts`)
```typescript
export const DATASET: ExerciseData[] = [...];

// Helper functions
export function getDataByLevel(level: number): ExerciseData[] { ... }
export function getDataById(id: string): ExerciseData | undefined { ... }
```

### 4. Exercises (`{module}-exercises.ts`)
```typescript
export interface Question {
  id: string;
  dataId: string;
  type: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: DifficultyLevel;
}

export const QUESTIONS: Question[] = [...];
```

### 5. Component (`components/exercises/{module}-exercise.tsx`)
```tsx
'use client';

import { useState } from 'react';
import type { ExerciseResult } from '@/lib/exercises/{module}-types';

interface Props {
  level: DifficultyLevel;
  onComplete: (result: ExerciseResult) => void;
}

export function Exercise({ level, onComplete }: Props) {
  // Implementation
}
```

## Directrices de Diseño

### Dataset
- **Tamaño mínimo**: 50+ ejemplos totales
- **Distribución por nivel**: Al menos 5-10 ejemplos por nivel
- **Calidad > Cantidad**: Ejemplos educativos claros y bien etiquetados
- **Diversidad**: Variedad de contextos, dificultades, tipos

### Ejercicios
- **Progresión clara**: Nivel 1 muy obvio → Nivel 5 muy sutil
- **Feedback educativo**: Explicaciones detalladas de respuestas
- **Tipos variados**: Múltiples formatos de pregunta
- **Umbral de avance**: 70-80% precisión para desbloquear siguiente nivel

### Teoría
- **Fundamentación**: Basada en investigación científica o expertos reconocidos
- **Ejemplos concretos**: Al menos 2-3 ejemplos por concepto
- **Progresiva**: Teoría nueva en cada nivel
- **Aplicable**: Conexión clara con ejercicios prácticos

### Métricas
- **Precisión (Accuracy)**: % respuestas correctas
- **Tiempo de respuesta**: Milisegundos desde presentación
- **Métricas específicas**: Según módulo (ej: falsos positivos/negativos)

## Integración con Sistema Principal

### Progress Tracking
```typescript
interface ModuleProgress {
  moduleId: string;
  currentLevel: DifficultyLevel;
  unlockedLevels: DifficultyLevel[];
  overallAccuracy: number;
  totalTimeSpent: number;
  lastAccessed: Date;
}
```

### Results Storage
```typescript
interface ExerciseSession {
  sessionId: string;
  moduleId: string;
  level: DifficultyLevel;
  results: ExerciseResult[];
  startedAt: Date;
  completedAt: Date;
}
```

## Testing

### Unit Tests
```bash
npm run test lib/exercises/{module}*.ts
```

### Type Checking
```bash
npm run type-check
```

### Integration Tests
```bash
npm run test:integration exercises/{module}
```

## Futuras Extensiones

### Próximos Módulos
- [ ] **Microexpresiones FACS**: Identificación de unidades de acción facial
- [ ] **Body Language**: Lenguaje corporal y posturas
- [ ] **Vocal Analysis**: Tono, ritmo, pausas en voz
- [ ] **Baseline Reading**: Establecer línea base de comportamiento
- [ ] **Lie Detection**: Detección de incongruencias
- [ ] **Elicitation**: Técnicas de extracción de información

### Mejoras Técnicas
- [ ] Sistema de recomendación de práctica personalizada
- [ ] Analytics avanzados (patrones de error, tiempos)
- [ ] Modo multijugador / competitivo
- [ ] Integración de audio/video real
- [ ] Sistema de achievements/badges
- [ ] Exportar progreso (PDF reports)

## Convenciones de Código

### Naming
- Types: PascalCase (`ImplicitInfoType`, `ExerciseResult`)
- Constants: UPPER_SNAKE_CASE (`ALL_CONVERSATIONS`, `DATASET_STATS`)
- Functions: camelCase (`getDataByLevel`, `handleSubmit`)
- Files: kebab-case (`active-listening-types.ts`)

### Estructura de Archivos
```
lib/exercises/
├── {module}-types.ts       # Types primero
├── {module}-theory.ts      # Después teoría
├── {module}-dataset.ts     # Luego dataset
└── {module}-exercises.ts   # Finalmente ejercicios

components/exercises/
└── {module}-exercise.tsx   # Componente React
```

### TypeScript
- **Strict mode**: Habilitado
- **No `any`**: Usar tipos específicos o `unknown`
- **Exports**: Named exports (no default)
- **Interfaces vs Types**: Interfaces para objetos extensibles, Types para unions

### React
- **'use client'**: Siempre en componentes con hooks
- **Props interface**: Definida y exportada
- **Estado mínimo**: Solo estado necesario en componente
- **Memoización**: Solo si performance es problema real

## Mantenimiento

### Añadir Nuevo Nivel
1. Añadir datos en dataset (5-10 ejemplos)
2. Añadir teoría en theory file
3. Añadir 3-5 preguntas en exercises
4. Actualizar constantes de estadísticas
5. Testear flujo completo

### Añadir Nueva Pregunta
1. Crear entry en exercises file
2. Enlazar con conversación existente (conversationId)
3. Escribir explicación educativa
4. Actualizar EXERCISE_STATS

### Corregir Bug
1. Añadir test que reproduzca bug
2. Fix en código
3. Verificar test pasa
4. Verificar regresión (otros tests siguen pasando)

---

**Última actualización**: Febrero 2026  
**Mantenedor**: Perception Training Platform Team
