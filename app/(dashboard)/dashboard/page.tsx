'use client';

import { useEffect, useState } from 'react';
import { SkillRadarChart } from '@/components/dashboard/radar-chart';
import { StatsCard } from '@/components/dashboard/stats-card';
import { StreakDisplay } from '@/components/dashboard/streak-display';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Calendar, Award } from 'lucide-react';
import { mockAuth } from '@/lib/auth-mock';
import { useRouter } from 'next/navigation';
import type { RadarData } from '@/types/skills';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real data from Supabase
  const radarData: RadarData[] = [
    { skill: 'Microexpresiones', level: 2, fullMark: 5 },
    { skill: 'Lenguaje Corporal', level: 1, fullMark: 5 },
    { skill: 'Escucha Activa', level: 3, fullMark: 5 },
    { skill: 'Memoria', level: 2, fullMark: 5 },
    { skill: 'Razonamiento', level: 1, fullMark: 5 },
  ];

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await mockAuth.getUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await mockAuth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Perception Training</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Ejercicios Completados"
              value={42}
              description="+12 esta semana"
              icon={Brain}
            />
            <StatsCard
              title="Precisión Promedio"
              value="78%"
              description="+5% vs mes pasado"
              icon={TrendingUp}
            />
            <StatsCard
              title="Días Practicados"
              value={14}
              description="Este mes"
              icon={Calendar}
            />
            <StatsCard
              title="Nivel Promedio"
              value="1.8"
              description="De 5.0 posibles"
              icon={Award}
            />
          </div>

          {/* Streak + Radar Chart */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <StreakDisplay currentStreak={3} lastPracticeDate="2026-02-21" />
            </div>
            <div className="lg:col-span-2">
              <SkillRadarChart data={radarData} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid gap-4 md:grid-cols-2">
            <Button size="lg" className="h-16">
              Sesión Diaria Rápida (15 min)
            </Button>
            <Button variant="outline" size="lg" className="h-16">
              Sesión Profunda (45 min)
            </Button>
          </div>

          {/* Skills Overview */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4">Tus Habilidades</h2>
            <div className="space-y-3">
              {radarData.map((skill) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <span className="font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-black dark:bg-white h-2 rounded-full"
                        style={{ width: `${(skill.level / skill.fullMark) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                      Nivel {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TODO: Add recent activity, recommendations, etc. */}
        </div>
      </main>
    </div>
  );
}
