# Módulo de Microexpresiones

**Estado:** ✅ Implementado (Fase 1 completa)  
**Última actualización:** 2026-02-21

## Descripción

Módulo de entrenamiento para detección de microexpresiones faciales basado en el sistema FACS (Facial Action Coding System) de Paul Ekman. Permite entrenar la habilidad de identificar las 7 emociones básicas a través de expresiones faciales, desde expresiones obvias hasta microexpresiones fugaces.

## Archivos del Módulo

### Componentes

- **`microexpression-exercise.tsx`** - Componente individual de ejercicio
  - Muestra imagen/video de expresión facial
  - Control de tiempo de exposición según nivel
  - Selector de 7 emociones
  - Feedback detallado con explicación FACS
  - Teoría FACS integrada (colapsable)

- **`microexpression-trainer.tsx`** - Contenedor de sesión de entrenamiento
  - Carga ejercicios del dataset JSON
  - Maneja progresión entre ejercicios
  - Calcula métricas de sesión
  - Pantalla de resultados finales
  - Sistema de reintentar/continuar

- **`exercise-wrapper.tsx`** - Wrapper compartido para todos los ejercicios
  - Layout consistente
  - Barra de progreso
  - Header con título y descripción

### Biblioteca y Datos

- **`lib/facs-library.ts`** - Biblioteca de conocimiento FACS
  - Definiciones de 20+ Action Units
  - Mapeo completo de emociones → AUs
  - Indicadores clave por emoción
  - Errores comunes a evitar
  - Descripciones de intensidad (sutil/moderado/fuerte)
  - Funciones helper para obtener explicaciones

- **`public/datasets/microexpressions/exercises.json`** - Dataset de 56 ejercicios
  - 7 emociones × 5 niveles
  - Distribución balanceada
  - Explicaciones FACS personalizadas
  - URLs de imágenes (placeholder/públicas)
  - Configuración de duración por ejercicio

### Tipos

- **`types/exercises.ts`** - Tipos TypeScript
  - `MicroexpressionExercise` - Interface de ejercicio
  - `Emotion` - Union type de 7 emociones
  - `EMOTIONS` - Array de emociones
  - `EMOTION_LABELS` - Labels en español

## Niveles de Dificultad

### Nivel 1: Fundamentos
- **Características:**
  - Expresiones exageradas y claras
  - Sin límite de tiempo
  - Contexto simple
- **Objetivo:** Familiarización con las 7 emociones básicas

### Nivel 2: Intermedio
- **Características:**
  - Expresiones claras pero naturales
  - 5 segundos de exposición
  - Mayor variedad de intensidades
- **Objetivo:** Reconocimiento bajo presión temporal leve

### Nivel 3: Avanzado
- **Características:**
  - Expresiones sutiles
  - 3 segundos de exposición
  - Menor intensidad de AUs
- **Objetivo:** Detección de emociones contenidas

### Nivel 4: Microexpresiones
- **Características:**
  - Expresiones fugaces (1-2 segundos)
  - Intensidad muy sutil
  - Requiere reacción rápida
- **Objetivo:** Detección de microexpresiones reales (<500ms)

### Nivel 5: Experto
- **Características:**
  - Mezclas emocionales
  - Expresiones contradictorias
  - Contexto complejo
  - 1-1.5 segundos de exposición
- **Objetivo:** Identificar emoción dominante en situaciones complejas

## Las 7 Emociones Básicas

### 1. Happiness (Felicidad)
- **AUs primarias:** AU6 + AU12
- **Indicador clave:** Patas de gallo (AU6) = felicidad genuina
- **Error común:** Sonrisa falsa (solo AU12, sin AU6)

### 2. Sadness (Tristeza)
- **AUs primarias:** AU1 + AU4 + AU15
- **Indicador clave:** Cejas oblicuas (internas levantadas)
- **Error común:** Confundir con ira (ira no tiene AU1)

### 3. Anger (Ira)
- **AUs primarias:** AU4 + AU5 + AU7 + AU23
- **Indicador clave:** Entrecejo en V invertida + ojos tensos
- **Error común:** Confundir concentración (solo AU4) con ira

### 4. Fear (Miedo)
- **AUs primarias:** AU1 + AU2 + AU5 + AU20 + AU25
- **Indicador clave:** Labios estirados HORIZONTALMENTE (AU20)
- **Error común:** Confundir con sorpresa (sorpresa no tiene AU20)

### 5. Surprise (Sorpresa)
- **AUs primarias:** AU1 + AU2 + AU5 + AU26
- **Indicador clave:** Labios RELAJADOS (vs miedo: tensos)
- **Error común:** Asumir que dura mucho (es MUY breve, <1s)

### 6. Disgust (Disgusto)
- **AUs primarias:** AU9 + AU10 + AU17
- **Indicador clave:** Nariz arrugada (AU9)
- **Error común:** Confundir con ira (ira no tiene AU9)

### 7. Contempt (Desprecio)
- **AUs primarias:** R12 (unilateral)
- **Indicador clave:** ÚNICA emoción ASIMÉTRICA
- **Error común:** Confundir con sonrisa asimétrica (sonrisa tiene AU6 bilateral)

## Sistema FACS

### ¿Qué es FACS?

FACS (Facial Action Coding System) es un sistema desarrollado por Paul Ekman para describir objetivamente todos los movimientos faciales visibles. Cada movimiento está codificado como una **Action Unit (AU)** que representa un músculo o grupo muscular específico.

### Action Units Principales

- **AU1** - Inner Brow Raiser (Frontalis interno)
- **AU2** - Outer Brow Raiser (Frontalis externo)
- **AU4** - Brow Lowerer (Corrugator supercilii)
- **AU5** - Upper Lid Raiser (Levator palpebrae)
- **AU6** - Cheek Raiser (Orbicularis oculi) - "Patas de gallo"
- **AU7** - Lid Tightener (Orbicularis oculi palpebral)
- **AU9** - Nose Wrinkler (Levator labii alaeque nasi)
- **AU10** - Upper Lip Raiser (Levator labii superioris)
- **AU12** - Lip Corner Puller (Zygomaticus major) - "Sonrisa"
- **AU15** - Lip Corner Depressor (Depressor anguli oris)
- **AU17** - Chin Raiser (Mentalis)
- **AU20** - Lip Stretcher (Risorius)
- **AU23** - Lip Tightener (Orbicularis oris)
- **AU24** - Lip Pressor (Orbicularis oris)
- **AU25** - Lips Part
- **AU26** - Jaw Drop
- **R12** - Unilateral Lip Corner Puller (asimétrico)

Ver `lib/facs-library.ts` para la lista completa con descripciones detalladas.

## Uso

### Básico (Componente Individual)

```tsx
import { MicroexpressionExercise } from '@/components/exercises/microexpression-exercise';

function MyComponent() {
  const exercise = {
    id: 'micro_001',
    skill: 'microexpressions' as const,
    level: 1,
    type: 'image' as const,
    media_url: '/path/to/image.jpg',
    correct_answer: 'happiness' as const,
    facs_explanation: 'AU6 + AU12 - Sonrisa Duchenne',
    duration_ms: null,
  };

  const handleComplete = (result) => {
    console.log('Resultado:', result);
  };

  return (
    <MicroexpressionExercise
      level={1}
      exercise={exercise}
      onComplete={handleComplete}
    />
  );
}
```

### Sesión Completa (Recomendado)

```tsx
import { MicroexpressionTrainer } from '@/components/exercises/microexpression-trainer';

function TrainingPage() {
  const handleSessionComplete = (results) => {
    console.log('Sesión completada:', results);
    // Guardar en DB, actualizar progreso, etc.
  };

  return (
    <MicroexpressionTrainer
      level={1}
      exerciseCount={10}
      onSessionComplete={handleSessionComplete}
    />
  );
}
```

## Datos del Dataset

### Estructura del JSON

```json
{
  "id": "micro_happiness_L1_01",
  "skill": "microexpressions",
  "level": 1,
  "type": "image",
  "media_url": "https://...",
  "correct_answer": "happiness",
  "facs_explanation": "AU6 + AU12 - Descripción detallada...",
  "duration_ms": null
}
```

### Campos

- **`id`** - Identificador único (formato: `micro_{emotion}_L{level}_{número}`)
- **`skill`** - Siempre `"microexpressions"`
- **`level`** - Nivel de dificultad (1-5)
- **`type`** - `"image"` o `"video"` (actualmente solo imagen)
- **`media_url`** - URL de la imagen (puede ser externa o local)
- **`correct_answer`** - Emoción correcta (una de las 7 emociones)
- **`facs_explanation`** - Explicación FACS detallada para feedback
- **`duration_ms`** - Tiempo de exposición en milisegundos (`null` = sin límite)

### Distribución Actual

- **Total:** 56 ejercicios
- **Por emoción:** ~8 ejercicios cada una
- **Por nivel:**
  - Nivel 1: 14 ejercicios (2 por emoción)
  - Nivel 2: 14 ejercicios (2 por emoción)
  - Nivel 3: 14 ejercicios (2 por emoción)
  - Nivel 4: 11 ejercicios
  - Nivel 5: 7 ejercicios (mezclas emocionales)

## Métricas

### Individuales (por ejercicio)

- **`correct`** - Booleano
- **`responseTime`** - Milisegundos desde que se muestra hasta que responde
- **`emotion`** - Emoción seleccionada por el usuario
- **`correctEmotion`** - Emoción correcta

### Sesión

- **`level`** - Nivel de la sesión
- **`totalExercises`** - Número de ejercicios completados
- **`correctAnswers`** - Número de aciertos
- **`averageResponseTime`** - Tiempo medio de respuesta
- **`accuracy`** - Porcentaje de aciertos (0-100)
- **`results`** - Array de resultados individuales

## Integración con Base de Datos

### Guardar Resultados

```typescript
// En el handler de onSessionComplete
async function saveResults(results: SessionResults) {
  // 1. Crear sesión
  const session = await supabase
    .from('sessions')
    .insert({
      user_id: userId,
      skill: 'microexpressions',
      level: results.level,
      started_at: sessionStartTime,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  // 2. Guardar resultados individuales
  const exerciseResults = results.results.map(r => ({
    session_id: session.id,
    user_id: userId,
    skill: 'microexpressions',
    level: results.level,
    exercise_type: 'image',
    correct: r.correct,
    response_time_ms: r.responseTime,
    user_answer: r.emotion,
    correct_answer: r.correctEmotion,
  }));

  await supabase
    .from('exercise_results')
    .insert(exerciseResults);

  // 3. Actualizar progreso del skill
  await supabase
    .from('skill_progress')
    .upsert({
      user_id: userId,
      skill: 'microexpressions',
      current_level: results.level,
      total_exercises_completed: currentTotal + results.totalExercises,
      last_practiced_at: new Date().toISOString(),
    });

  // 4. Guardar métricas específicas de microexpresiones
  const emotionMetrics = calculateEmotionMetrics(results.results);
  
  for (const [emotion, accuracy] of Object.entries(emotionMetrics)) {
    await supabase
      .from('microexpression_metrics')
      .insert({
        user_id: userId,
        emotion,
        accuracy_rate: accuracy,
        sample_size: emotionCounts[emotion],
      });
  }
}
```

## Próximos Pasos / TODOs

### Corto Plazo

- [ ] Reemplazar URLs placeholder con imágenes reales de datasets públicos
  - Opción 1: CK+ Extended Dataset
  - Opción 2: RAF-DB (Real-world Affective Faces Database)
  - Opción 3: Generar con AI (Stable Diffusion + ControlNet)
- [ ] Implementar integración con Supabase para persistir resultados
- [ ] Crear página de entrenamiento (`/train/microexpressions/[level]`)
- [ ] Añadir estadísticas por emoción en dashboard

### Medio Plazo

- [ ] Soporte para videos (clips de 0.5-2 segundos)
- [ ] Sistema de badges/logros ("Detector de Felicidad", etc.)
- [ ] Modo "práctica" vs "evaluación"
- [ ] Historial de progreso con gráficos
- [ ] Calibración personalizada (detectar bias del usuario hacia ciertas emociones)

### Largo Plazo

- [ ] Modo multijugador/competitivo
- [ ] Generación dinámica de ejercicios con AI
- [ ] Análisis de patrones de error personalizados
- [ ] Entrenamiento adaptativo (ajustar dificultad automáticamente)
- [ ] Certificaciones por nivel (requiere X% precisión consistente)

## Referencias

### FACS

- **Libro:** Ekman, P., & Friesen, W. V. (1978). *Facial Action Coding System: A Technique for the Measurement of Facial Movement*. Consulting Psychologists Press.
- **Manual:** [FACS Manual](https://www.paulekman.com/facial-action-coding-system/)

### Datasets Públicos

- **CK+ Extended:** [Kaggle - CK+48](https://www.kaggle.com/datasets/shawon10/ckplus)
- **RAF-DB:** [Real-world Affective Faces](http://www.whdeng.cn/RAF/model1.html)
- **FER-2013:** [Kaggle - Facial Expression Recognition](https://www.kaggle.com/datasets/msambare/fer2013)
- **AffectNet:** [AffectNet Database](http://mohammadmahoor.com/affectnet/)

### Herramientas

- **OpenFace:** Análisis automático de AUs
- **EMFACS:** Emotional FACS (subset para emociones)

## Notas Técnicas

### Performance

- Las imágenes usan `next/image` con `unoptimized` para URLs externas
- El dataset JSON (~22KB) se carga una vez por sesión
- Los ejercicios se mezclan aleatoriamente cada sesión

### Accesibilidad

- Botones con labels claros
- Soporte de teclado (1-7 para seleccionar emociones)
- Alto contraste en modo oscuro
- Text alternativo en imágenes

### Responsive

- Grid de 2 columnas en móvil, 4 en desktop
- Imágenes con `object-contain` para mantener aspecto
- Layout adaptativo con Tailwind

---

**Autor:** Subagent Microexpressions  
**Fecha:** 2026-02-21  
**Versión:** 1.0.0
