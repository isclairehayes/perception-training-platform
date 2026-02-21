'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { StudyItem } from '@/components/exercises/memory-exercise';
import { MemoryLocation } from './memory-palace-setup';
import { MapPin, Brain, CheckCircle, SkipForward } from 'lucide-react';

interface MemoryRecallPhaseProps {
  items: StudyItem[];
  memoryPalace: MemoryLocation[];
  onComplete: (recalls: Map<string, string>) => void;
  includeTraits: boolean;
}

export function MemoryRecallPhase({ 
  items, 
  memoryPalace, 
  onComplete,
  includeTraits 
}: MemoryRecallPhaseProps) {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [recalls, setRecalls] = useState<Map<string, string>>(new Map());
  const [currentInput, setCurrentInput] = useState('');

  // Agrupar ítems por ubicación
  const itemsByLocation = memoryPalace.map(location => ({
    location,
    items: items.filter(item => item.locationId === location.id),
  }));

  const currentGroup = itemsByLocation[currentLocationIndex];
  const totalRecalled = recalls.size;
  const progress = (totalRecalled / items.length) * 100;

  const handleRecall = (itemId: string) => {
    if (currentInput.trim()) {
      const newRecalls = new Map(recalls);
      newRecalls.set(itemId, currentInput.trim());
      setRecalls(newRecalls);
      setCurrentInput('');
    }
  };

  const handleSkipItem = (itemId: string) => {
    const newRecalls = new Map(recalls);
    newRecalls.set(itemId, ''); // Marcar como saltado
    setRecalls(newRecalls);
  };

  const handleNextLocation = () => {
    if (currentLocationIndex < itemsByLocation.length - 1) {
      setCurrentLocationIndex(currentLocationIndex + 1);
      setCurrentInput('');
    } else {
      onComplete(recalls);
    }
  };

  const allCurrentItemsRecalled = currentGroup.items.every(item => recalls.has(item.id));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Fase de Recuperación
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Camina mentalmente por tu palacio y recuerda qué había en cada ubicación
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {totalRecalled} / {items.length} recordados
          </p>
          <Progress value={progress} className="w-32" />
        </div>
      </div>

      {/* Ubicación actual */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
              {currentGroup.location.order}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {currentGroup.location.name}
              </h3>
              {currentGroup.location.description && (
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  {currentGroup.location.description}
                </p>
              )}
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                ¿Qué había aquí? ({currentGroup.items.length} {currentGroup.items.length === 1 ? 'ítem' : 'ítems'})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ítems a recordar */}
      <div className="space-y-4">
        {currentGroup.items.map((item, idx) => {
          const isRecalled = recalls.has(item.id);
          const userAnswer = recalls.get(item.id);

          return (
            <Card 
              key={item.id}
              className={isRecalled ? 'border-green-300 bg-green-50 dark:bg-green-950' : 'border-purple-300'}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center font-bold text-purple-700 dark:text-purple-300">
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1">
                    {isRecalled ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-900 dark:text-green-100">
                          {userAnswer || '(Saltado)'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder={`¿Qué ${item.type === 'face' ? 'nombre' : 'ítem'} había aquí?`}
                          value={currentInput}
                          onChange={(e) => setCurrentInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleRecall(item.id);
                            }
                          }}
                          className="flex-1"
                          autoFocus={idx === 0}
                        />
                        <Button
                          onClick={() => handleRecall(item.id)}
                          disabled={!currentInput.trim()}
                        >
                          Confirmar
                        </Button>
                        <Button
                          onClick={() => handleSkipItem(item.id)}
                          variant="outline"
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navegación */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-gray-500">
          Ubicación {currentLocationIndex + 1} de {itemsByLocation.length}
        </p>

        <Button
          onClick={handleNextLocation}
          disabled={!allCurrentItemsRecalled}
          size="lg"
        >
          {currentLocationIndex < itemsByLocation.length - 1 ? (
            <>Siguiente Ubicación</>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Finalizar Recuperación
            </>
          )}
        </Button>
      </div>

      {!allCurrentItemsRecalled && (
        <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
          Completa todos los ítems de esta ubicación para continuar (puedes saltarlos si no recuerdas)
        </p>
      )}
    </div>
  );
}
