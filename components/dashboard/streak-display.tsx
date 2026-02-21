import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  currentStreak: number;
  lastPracticeDate: string | null;
}

export function StreakDisplay({ currentStreak, lastPracticeDate }: StreakDisplayProps) {
  const today = new Date().toISOString().split('T')[0];
  const isActiveToday = lastPracticeDate === today;

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          Racha Diaria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
          {currentStreak} {currentStreak === 1 ? 'día' : 'días'}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {isActiveToday ? (
            '¡Racha activa hoy! 🔥'
          ) : currentStreak > 0 ? (
            `Última práctica: ${lastPracticeDate || 'nunca'}`
          ) : (
            'Comienza tu racha practicando hoy'
          )}
        </p>
      </CardContent>
    </Card>
  );
}
