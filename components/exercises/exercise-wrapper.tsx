'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ExerciseWrapperProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  onComplete: () => void;
  children: React.ReactNode;
}

export function ExerciseWrapper({
  title,
  description,
  currentStep,
  totalSteps,
  onComplete,
  children,
}: ExerciseWrapperProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Progreso: {currentStep} de {totalSteps}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={currentStep} max={totalSteps} />
        </div>

        <Card>
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
