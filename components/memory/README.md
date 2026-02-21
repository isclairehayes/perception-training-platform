# Componentes de Memoria

Componentes del módulo de entrenamiento de memoria basado en el Método de Loci.

## Componentes

### memory-palace-setup.tsx
- Setup inicial del palacio de memoria
- Permite al usuario definir 3-20 ubicaciones
- Incluye explicación del Método de Loci
- Valida mínimo 3 ubicaciones antes de continuar

### memory-study-phase.tsx
- Fase de estudio/memorización
- Muestra cada ítem con su ubicación asignada
- Navegación libre (anterior/siguiente)
- Sugerencias de asociación vívida
- Soporte para rasgos en niveles avanzados

### memory-recall-phase.tsx
- Fase de recuperación/"caminar" por el palacio
- Agrupa ítems por ubicación
- Permite saltar ítems que no se recuerdan
- Validación antes de pasar a siguiente ubicación

### memory-results.tsx
- Muestra accuracy y estadísticas
- Curva de olvido proyectada (Ebbinghaus) con Recharts
- Detalles expandibles por ítem
- Opciones reintentar/finalizar

## Uso

```tsx
import { MemoryExercise } from '@/components/exercises/memory-exercise';

<MemoryExercise 
  level={1} 
  onComplete={(results) => console.log(results)} 
/>
```

## Documentación

Ver `/docs/MEMORY-MODULE.md` para documentación técnica completa.
Ver `/docs/memory-method-of-loci.md` para teoría y ciencia del método.
