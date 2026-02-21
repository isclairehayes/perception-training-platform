import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <main className="w-full max-w-4xl space-y-8 py-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
            Perception Training
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Entrena tu capacidad de observación, memoria y razonamiento con ejercicios basados en ciencia real
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎭 Microexpresiones</CardTitle>
              <CardDescription>
                Detecta emociones a través de expresiones faciales sutiles usando FACS
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧍 Lenguaje Corporal</CardTitle>
              <CardDescription>
                Lee el estado emocional y dinámicas de poder a través del cuerpo
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🎧 Escucha Activa</CardTitle>
              <CardDescription>
                Extrae información implícita de conversaciones y detecta cold reading
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🧠 Memoria</CardTitle>
              <CardDescription>
                Memoriza rostros, nombres y datos usando el método de loci
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📊 Razonamiento Bayesiano</CardTitle>
              <CardDescription>
                Razona con probabilidades y actualiza creencias ante nueva evidencia
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="flex items-center justify-center">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">📈 Dashboard</CardTitle>
              <CardDescription>
                Visualiza tu progreso con métricas reales
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto">
              Comenzar Entrenamiento
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Iniciar Sesión
            </Button>
          </Link>
        </div>

        <div className="mt-16 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">¿Por qué Perception Training?</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✓ <strong>Basado en ciencia:</strong> FACS (Ekman), método de loci, superforecasting (Tetlock)</li>
            <li>✓ <strong>Métricas reales:</strong> No puntos fake - tracking de precisión, velocidad, retención</li>
            <li>✓ <strong>Progresión adaptativa:</strong> 5 niveles de dificultad por skill</li>
            <li>✓ <strong>Evaluación inicial:</strong> Diagnóstico personalizado al registrarte</li>
            <li>✓ <strong>Práctica diaria:</strong> Sesiones generadas según tus debilidades</li>
          </ul>
        </div>
      </main>

      <footer className="mt-16 pb-8 text-center text-sm text-gray-500 dark:text-gray-600">
        <p>Perception Training Platform • 2026</p>
      </footer>
    </div>
  );
}
