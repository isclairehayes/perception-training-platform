import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SKILL_NAMES, SKILL_DESCRIPTIONS, type SkillType } from '@/types/skills';

const SKILLS: SkillType[] = [
  'microexpressions',
  'body_language',
  'active_listening',
  'memory',
  'bayesian_reasoning',
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Habilidades</h1>
            <Link href="/dashboard">
              <Button variant="outline">← Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Entrena Tus Habilidades</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Selecciona una habilidad para comenzar a practicar
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => {
            const skillRoutes: Record<SkillType, string> = {
              microexpressions: '/skills/microexpressions',
              body_language: '/skills/body-language',
              active_listening: '/skills/active-listening',
              memory: '/skills/memory',
              bayesian_reasoning: '/skills/bayesian',
            };
            
            return (
              <Card key={skill} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{SKILL_NAMES[skill]}</CardTitle>
                  <CardDescription>{SKILL_DESCRIPTIONS[skill]}</CardDescription>
                </CardHeader>
                <div className="px-6 pb-6">
                  <Link href={skillRoutes[skill]}>
                    <Button className="w-full">
                      Entrenar
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
