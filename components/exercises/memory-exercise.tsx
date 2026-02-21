'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MemoryPalaceSetup, MemoryLocation } from '@/components/memory/memory-palace-setup';
import { MemoryStudyPhase } from '@/components/memory/memory-study-phase';
import { MemoryRecallPhase } from '@/components/memory/memory-recall-phase';
import { MemoryResults } from '@/components/memory/memory-results';
import { getRandomFaces, getRandomItems, getMixedMemoryItems, FaceData, GeneralItem } from '@/lib/data/memory-dataset';
import { Clock, Brain, CheckCircle } from 'lucide-react';

export type MemoryLevel = 1 | 2 | 3 | 4 | 5;
export type RetrievalDelay = 'immediate' | '10min' | '24h';
export type ExercisePhase = 'setup' | 'study' | 'delay' | 'recall' | 'results';

interface MemoryExerciseProps {
  level: MemoryLevel;
  onComplete: (results: MemoryExerciseResult) => void;
}

export interface MemoryExerciseResult {
  level: MemoryLevel;
  totalItems: number;
  correctRecalls: number;
  incorrectRecalls: number;
  missedItems: number;
  accuracy: number;
  studyTime: number;
  recallTime: number;
  retrievalDelay: RetrievalDelay;
  usedMemoryPalace: boolean;
}

export interface StudyItem {
  id: string;
  type: 'face' | 'object' | 'number' | 'word';
  name: string;
  imageUrl?: string;
  traits?: string[];
  locationId?: string; // Si usa método de loci
}

/**
 * Configuración de niveles
 */
const LEVEL_CONFIG: Record<MemoryLevel, {
  itemCount: number;
  delay: RetrievalDelay;
  includeFaces: boolean;
  includeTraits: boolean;
  mixedItems: boolean;
  description: string;
}> = {
  1: {
    itemCount: 10,
    delay: 'immediate',
    includeFaces: false,
    includeTraits: false,
    mixedItems: false,
    description: '10 objetos simples, recuperación inmediata',
  },
  2: {
    itemCount: 20,
    delay: '10min',
    includeFaces: false,
    includeTraits: false,
    mixedItems: true,
    description: '20 ítems mixtos, recuperación tras 10 minutos (simulado)',
  },
  3: {
    itemCount: 40,
    delay: 'immediate',
    includeFaces: true,
    includeTraits: false,
    mixedItems: false,
    description: '40 rostros + nombres, recuperación inmediata',
  },
  4: {
    itemCount: 60,
    delay: '10min',
    includeFaces: true,
    includeTraits: true,
    mixedItems: false,
    description: '60 rostros + nombres + rasgos, recuperación tras 10 minutos',
  },
  5: {
    itemCount: 100,
    delay: '24h',
    includeFaces: true,
    includeTraits: true,
    mixedItems: true,
    description: '100 ítems complejos (rostros + objetos), recuperación 24h (simulado)',
  },
};

export function MemoryExercise({ level, onComplete }: MemoryExerciseProps) {
  const [phase, setPhase] = useState<ExercisePhase>('setup');
  const [memoryPalace, setMemoryPalace] = useState<MemoryLocation[]>([]);
  const [studyItems, setStudyItems] = useState<StudyItem[]>([]);
  const [studyStartTime, setStudyStartTime] = useState<number>(0);
  const [studyEndTime, setStudyEndTime] = useState<number>(0);
  const [recallStartTime, setRecallStartTime] = useState<number>(0);
  const [recallEndTime, setRecallEndTime] = useState<number>(0);
  const [userRecalls, setUserRecalls] = useState<Map<string, string>>(new Map());
  const [delayEndTime, setDelayEndTime] = useState<number>(0);

  const config = LEVEL_CONFIG[level];

  // Generar ítems de estudio basados en el nivel
  const generateStudyItems = (locations: MemoryLocation[]): StudyItem[] => {
    const items: StudyItem[] = [];
    
    if (config.includeFaces) {
      const faceCount = config.mixedItems 
        ? Math.floor(config.itemCount * 0.7) 
        : config.itemCount;
      
      const faces = getRandomFaces(faceCount);
      faces.forEach((face, idx) => {
        items.push({
          id: face.id,
          type: 'face',
          name: face.name,
          imageUrl: face.imageUrl,
          traits: config.includeTraits ? face.traits : undefined,
          locationId: locations[idx % locations.length]?.id,
        });
      });
    }
    
    if (config.mixedItems || !config.includeFaces) {
      const itemCount = config.mixedItems 
        ? config.itemCount - items.length 
        : config.itemCount;
      
      const generalItems = getRandomItems(itemCount);
      generalItems.forEach((item, idx) => {
        items.push({
          id: item.id,
          type: item.category === 'objects' ? 'object' : 
                item.category === 'numbers' ? 'number' : 'word',
          name: item.text,
          imageUrl: item.imageUrl,
          locationId: locations[(items.length + idx) % locations.length]?.id,
        });
      });
    }
    
    return items;
  };

  const handleSetupComplete = (locations: MemoryLocation[]) => {
    setMemoryPalace(locations);
    const items = generateStudyItems(locations);
    setStudyItems(items);
    setStudyStartTime(Date.now());
    setPhase('study');
  };

  const handleStudyComplete = () => {
    setStudyEndTime(Date.now());
    
    // Simular delay
    if (config.delay === 'immediate') {
      setPhase('recall');
      setRecallStartTime(Date.now());
    } else {
      setPhase('delay');
      // Simular espera (en producción real, guardar estado y volver después)
      const delayMs = config.delay === '10min' ? 10000 : 5000; // 10s para demo
      setDelayEndTime(Date.now() + delayMs);
    }
  };

  const handleRecallComplete = (recalls: Map<string, string>) => {
    setUserRecalls(recalls);
    setRecallEndTime(Date.now());
    setPhase('results');
  };

  const handleRetry = () => {
    setPhase('setup');
    setMemoryPalace([]);
    setStudyItems([]);
    setUserRecalls(new Map());
  };

  const handleFinish = () => {
    // Calcular resultados
    let correct = 0;
    let incorrect = 0;
    let missed = 0;
    
    studyItems.forEach(item => {
      const userAnswer = userRecalls.get(item.id);
      if (!userAnswer) {
        missed++;
      } else if (userAnswer.toLowerCase().trim() === item.name.toLowerCase().trim()) {
        correct++;
      } else {
        incorrect++;
      }
    });
    
    const results: MemoryExerciseResult = {
      level,
      totalItems: studyItems.length,
      correctRecalls: correct,
      incorrectRecalls: incorrect,
      missedItems: missed,
      accuracy: (correct / studyItems.length) * 100,
      studyTime: studyEndTime - studyStartTime,
      recallTime: recallEndTime - recallStartTime,
      retrievalDelay: config.delay,
      usedMemoryPalace: memoryPalace.length > 0,
    };
    
    onComplete(results);
  };

  // Renderizar fase actual
  if (phase === 'setup') {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Ejercicio de Memoria - Nivel {level}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{config.description}</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-purple-600">{config.itemCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ítems</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-blue-600">
                  {config.delay === 'immediate' ? '0' : config.delay === '10min' ? '10' : '24'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {config.delay === 'immediate' ? 'Inmediato' : 'Minutos delay'}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="text-2xl font-bold text-green-600">
                  {config.includeFaces ? '👤' : '📦'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {config.includeFaces ? 'Rostros' : 'Objetos'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <MemoryPalaceSetup onComplete={handleSetupComplete} />
      </div>
    );
  }

  if (phase === 'study') {
    return (
      <MemoryStudyPhase
        items={studyItems}
        memoryPalace={memoryPalace}
        onComplete={handleStudyComplete}
        includeTraits={config.includeTraits}
      />
    );
  }

  if (phase === 'delay') {
    return (
      <DelayPhase
        delayType={config.delay}
        endTime={delayEndTime}
        onComplete={() => {
          setRecallStartTime(Date.now());
          setPhase('recall');
        }}
      />
    );
  }

  if (phase === 'recall') {
    return (
      <MemoryRecallPhase
        items={studyItems}
        memoryPalace={memoryPalace}
        onComplete={handleRecallComplete}
        includeTraits={config.includeTraits}
      />
    );
  }

  if (phase === 'results') {
    const correct = Array.from(userRecalls.entries()).filter(([id, answer]) => {
      const item = studyItems.find(i => i.id === id);
      return item && answer.toLowerCase().trim() === item.name.toLowerCase().trim();
    }).length;

    return (
      <MemoryResults
        studyItems={studyItems}
        userRecalls={userRecalls}
        memoryPalace={memoryPalace}
        studyTime={studyEndTime - studyStartTime}
        recallTime={recallEndTime - recallStartTime}
        level={level}
        onRetry={handleRetry}
        onFinish={handleFinish}
      />
    );
  }

  return null;
}

/**
 * Fase de espera simulada
 */
function DelayPhase({ 
  delayType, 
  endTime, 
  onComplete 
}: { 
  delayType: RetrievalDelay; 
  endTime: number; 
  onComplete: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(endTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const left = endTime - Date.now();
      setTimeLeft(left);
      
      if (left <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  const progress = Math.max(0, (timeLeft / (delayType === '10min' ? 10000 : 5000)) * 100);

  return (
    <Card className="text-center py-12">
      <CardContent className="space-y-6">
        <Clock className="w-16 h-16 mx-auto text-blue-500 animate-pulse" />
        <div>
          <h3 className="text-2xl font-bold mb-2">Intervalo de Recuperación</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Simulando delay de {delayType === '10min' ? '10 minutos' : '24 horas'}...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Acelerado para demo: {Math.ceil(timeLeft / 1000)}s restantes)
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Progress value={100 - progress} max={100} />
        </div>
        <p className="text-xs text-gray-500">
          En una implementación real, volverías después del tiempo indicado
        </p>
      </CardContent>
    </Card>
  );
}
