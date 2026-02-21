# Perception Training Platform

Plataforma de entrenamiento basada en ciencia para mejorar habilidades de percepción, memoria y razonamiento.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Auth)
- **Charts:** Recharts
- **Hosting:** Vercel

## Skills Entrenados

1. **Microexpresiones** - FACS (Ekman), detección de emociones
2. **Lenguaje Corporal** - Señales no verbales, dinámicas de poder
3. **Escucha Activa** - Información implícita, cold reading
4. **Memoria** - Método de loci, retención a largo plazo
5. **Razonamiento Bayesiano** - Probabilidades, calibración, Brier score

## Setup Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crear proyecto en [Supabase](https://app.supabase.com)
2. Copiar `.env.local.example` a `.env.local`
3. Rellenar las variables de entorno con tus keys de Supabase
4. Aplicar el schema:

```bash
# Opción 1: Usar Supabase CLI
npx supabase db push

# Opción 2: Copiar y ejecutar manualmente el SQL
# Ir a SQL Editor en Supabase y ejecutar el contenido de ../supabase-schema.sql
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 4. Build de producción

```bash
npm run build
npm run start
```

## Estructura del Proyecto

```
perception-platform/
├── app/
│   ├── (auth)/         # Login, signup
│   ├── (dashboard)/    # Dashboard, skills
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/             # Button, Card, Input, Progress
│   ├── exercises/      # Componentes de ejercicios (TODO)
│   ├── dashboard/      # Radar chart, stats (TODO)
│   └── shared/         # Componentes compartidos
├── lib/
│   ├── supabase/       # Cliente Supabase
│   ├── metrics/        # Cálculo de métricas
│   └── utils.ts
├── types/
│   ├── skills.ts       # Tipos de skills
│   └── exercises.ts    # Tipos de ejercicios
└── public/
    └── datasets/       # JSON de ejercicios (TODO)
```

## Database Schema

Ver `../supabase-schema.sql` para el schema completo.

**Tablas principales:**
- `user_profiles` - Perfiles de usuario
- `skill_progress` - Progreso por skill (nivel 1-5)
- `skill_metrics` - Time-series de métricas
- `sessions` - Sesiones de práctica
- `exercise_results` - Resultados individuales

**Tablas de métricas específicas:**
- `microexpression_metrics` - Por emoción
- `body_language_metrics`
- `active_listening_metrics`
- `memory_metrics` - Curva de retención
- `bayesian_metrics` - Brier score

## Arquitectura

Ver `../ARCHITECTURE.md` para detalles técnicos completos.

## Roadmap

Ver `../ROADMAP.md` y `../EXECUTION-PLAN.md` para el plan de desarrollo.

## Estado del Proyecto

**FASE 0 (Setup):** ⏳ En progreso (~50%)

- ✅ Proyecto Next.js + TypeScript
- ✅ Tailwind CSS configurado
- ✅ Componentes UI base
- ✅ Auth pages (estructura)
- ✅ Landing page
- ✅ Types definidos
- ⏳ Supabase setup (pendiente)
- ⏳ Auth funcional (pendiente)
- ⏳ Dashboard (pendiente)

**Próximos pasos:**
1. Configurar Supabase project + aplicar schema
2. Implementar auth flow completo
3. Crear componentes de ejercicios
4. Implementar dashboard con radar chart

## Deploy

### Vercel

1. Conectar repo a Vercel
2. Configurar environment variables (Supabase keys)
3. Deploy automático en cada push

### Supabase

1. Proyecto ya creado en setup
2. Configurar RLS policies (ya incluidas en schema)
3. Configurar Storage buckets:
   - `exercise-media` (public read)
   - `user-uploads` (private)

## Desarrollo

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Contribución

Este es un proyecto personal/educativo. Para sugerencias o bugs, crear un issue.

## Licencia

MIT

---

**Estado:** En desarrollo activo (FASE 0)
**Última actualización:** 2026-02-21
