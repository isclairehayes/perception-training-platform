# Guía de Integración - Módulo de Memoria

## 📋 Checklist de Integración

### 1. Verificar archivos creados

```bash
# Componentes
✅ components/exercises/memory-exercise.tsx
✅ components/memory/memory-palace-setup.tsx
✅ components/memory/memory-study-phase.tsx
✅ components/memory/memory-recall-phase.tsx
✅ components/memory/memory-results.tsx
✅ components/memory/index.ts
✅ components/memory/README.md

# Datos
✅ lib/data/memory-dataset.ts
✅ lib/data/index.ts

# Documentación
✅ docs/memory-method-of-loci.md
✅ docs/MEMORY-MODULE.md
✅ FASE-4-MEMORIA-COMPLETADO.md
✅ INTEGRATION-GUIDE-MEMORY.md

# Ejemplo
✅ app/memory-example.tsx
```

### 2. Verificar dependencias

Recharts ya está instalado en `package.json`:
```json
"recharts": "^3.7.0"
```

### 3. Crear ruta en la app

Opción A - Página independiente:
```bash
cp app/memory-example.tsx app/memory/page.tsx
```

Opción B - Integrar en dashboard existente:
```tsx
// app/dashboard/page.tsx o similar
import { MemoryExercise } from '@/components/exercises/memory-exercise';

// Dentro del componente:
<MemoryExercise 
  level={userLevel} 
  onComplete={handleComplete} 
/>
```

### 4. Conectar a Supabase (si aplica)

```typescript
// Tabla: exercise_results
const handleComplete = async (results: MemoryExerciseResult) => {
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
      incorrect_recalls: results.incorrectRecalls,
      missed_items: results.missedItems,
      retrieval_delay: results.retrievalDelay,
      used_memory_palace: results.usedMemoryPalace,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error saving results:', error);
    return;
  }

  // Actualizar progreso del skill
  await updateSkillProgress('memory', results.level, results.accuracy);
};
```

### 5. Añadir al menú de navegación

```tsx
// Donde tengas tu navegación
{
  name: 'Memoria',
  href: '/memory',
  icon: BrainIcon, // de lucide-react
  description: 'Método de Loci',
}
```

## 🎨 Personalización

### Colores del tema

Los componentes usan clases de Tailwind. Para personalizar:

```tsx
// Cambiar gradiente de setup
className="bg-gradient-to-r from-purple-50 to-blue-50"
// A tu color preferido:
className="bg-gradient-to-r from-green-50 to-teal-50"
```

### Niveles

Para ajustar la configuración de niveles:

```typescript
// components/exercises/memory-exercise.tsx
const LEVEL_CONFIG: Record<MemoryLevel, {...}> = {
  1: {
    itemCount: 10,  // Cambiar a 5 para nivel más fácil
    delay: 'immediate',
    // ...
  },
  // ...
};
```

### Dataset

Para reemplazar rostros placeholder con reales:

```typescript
// lib/data/memory-dataset.ts
export const FACES_DATASET: FaceData[] = [
  {
    id: 'f001',
    name: 'Carlos Mendoza',
    imageUrl: 'https://tu-api.com/face/001.jpg', // URL real
    category: 'faces',
    traits: ['barba', 'gafas', 'sonrisa'],
  },
  // ...
];
```

## 🚀 Testing

### Manual testing

```bash
# 1. Ejecutar desarrollo
npm run dev

# 2. Navegar a /memory o donde hayas integrado

# 3. Probar cada nivel:
✅ Nivel 1: 10 objetos
✅ Nivel 2: 20 ítems mixtos + delay
✅ Nivel 3: 40 rostros
✅ Nivel 4: 60 rostros + rasgos + delay
✅ Nivel 5: 100 ítems + delay largo

# 4. Verificar:
✅ Setup del palacio funciona
✅ Fase de estudio muestra todos los ítems
✅ Navegación adelante/atrás
✅ Delay simula correctamente
✅ Fase de recall agrupa por ubicación
✅ Resultados muestran accuracy correcto
✅ Curva de olvido renderiza (Recharts)
✅ Detalles expandibles funcionan
✅ Reintentar reinicia el ejercicio
✅ onComplete se llama con datos correctos
```

### Testing de integración

```typescript
// __tests__/memory-exercise.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryExercise } from '@/components/exercises/memory-exercise';

test('completa ejercicio nivel 1', async () => {
  const mockComplete = jest.fn();
  render(<MemoryExercise level={1} onComplete={mockComplete} />);
  
  // Setup
  const location1 = screen.getByPlaceholderText(/Ubicación 1/);
  fireEvent.change(location1, { target: { value: 'Puerta' } });
  // ... más setup
  
  const continueBtn = screen.getByText(/Continuar/);
  fireEvent.click(continueBtn);
  
  // Study
  const nextBtn = screen.getByText(/Siguiente/);
  // Click 10 veces...
  
  // Recall
  // Llenar respuestas...
  
  // Verificar que onComplete fue llamado
  expect(mockComplete).toHaveBeenCalledWith(
    expect.objectContaining({
      level: 1,
      totalItems: 10,
    })
  );
});
```

## 📊 Analytics (opcional)

Si quieres trackear uso:

```typescript
// handleComplete
const handleComplete = (results: MemoryExerciseResult) => {
  // Analytics
  analytics.track('Memory Exercise Completed', {
    level: results.level,
    accuracy: results.accuracy,
    study_time: results.studyTime,
    recall_time: results.recallTime,
    used_palace: results.usedMemoryPalace,
  });
  
  // Si accuracy alta, mostrar celebración
  if (results.accuracy >= 90) {
    confetti(); // librería de confetti
    toast.success('¡Excelente memoria!');
  }
};
```

## 🔧 Troubleshooting

### Error: Cannot find module '@/components/memory/...'

Verifica que `tsconfig.json` tiene el alias configurado:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Recharts no renderiza

```bash
npm install recharts
# O
npm install recharts@^3.7.0
```

### Imágenes de Dicebear no cargan

Añadir dominio a Next.js config:
```javascript
// next.config.ts
module.exports = {
  images: {
    domains: ['api.dicebear.com'],
  },
};
```

### TypeScript errors en Button variant

El componente Button acepta:
- 'primary'
- 'secondary'
- 'outline'
- 'ghost'

No uses 'default' - usa 'primary' o quita el prop.

## 🎯 Próximos pasos opcionales

### V2 - Delays reales
1. Guardar estado en localStorage al finalizar study
2. Mostrar countdown real
3. Enviar notificación cuando termine delay
4. Continuar desde recall cuando vuelva

```typescript
// Guardar estado
localStorage.setItem('memory-exercise-state', JSON.stringify({
  level,
  studyItems,
  memoryPalace,
  studyEndTime,
  recallStartTime: Date.now() + (10 * 60 * 1000), // 10 min
}));

// Recuperar estado
const savedState = localStorage.getItem('memory-exercise-state');
if (savedState) {
  const state = JSON.parse(savedState);
  if (Date.now() >= state.recallStartTime) {
    // Continuar con recall
  }
}
```

### V3 - Rostros fotorrealistas

```typescript
// Opción 1: This Person Does Not Exist
imageUrl: 'https://thispersondoesnotexist.com/'

// Opción 2: Generated.photos API
const apiKey = process.env.GENERATED_PHOTOS_KEY;
const response = await fetch(
  `https://api.generated.photos/api/v1/faces?api_key=${apiKey}&age=20-40`
);

// Opción 3: Stable Diffusion local
// Generar con prompt: "professional headshot, neutral expression, {ethnicity}, {age}"
```

### V4 - Gamificación

```typescript
// Logros
const ACHIEVEMENTS = {
  first_palace: { name: 'Arquitecto Novato', desc: 'Creaste tu primer palacio' },
  perfect_level_1: { name: 'Memoria Perfecta', desc: '100% accuracy en Nivel 1' },
  speed_demon: { name: 'Relámpago Mental', desc: 'Recall en menos de 30s' },
  // ...
};

// Verificar logro
if (results.accuracy === 100 && results.level === 1) {
  unlockAchievement('perfect_level_1');
}
```

## 📚 Recursos adicionales

- **Documentación completa**: `/docs/MEMORY-MODULE.md`
- **Teoría del método**: `/docs/memory-method-of-loci.md`
- **Ejemplo de uso**: `/app/memory-example.tsx`
- **Tipos**: `types/exercises.ts` + componentes

## ✅ Listo para producción

El módulo está completo y funcional. Solo necesitas:

1. ✅ Verificar archivos
2. ✅ Crear ruta en app
3. ✅ Conectar onComplete a tu backend
4. ✅ Añadir al menú
5. ✅ Testing manual
6. 🚀 Deploy

---

**¿Dudas?** Lee la documentación completa en `/docs/MEMORY-MODULE.md`
