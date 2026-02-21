'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StudyItem } from '@/components/exercises/memory-exercise';
import { MemoryLocation } from './memory-palace-setup';
import { ChevronLeft, ChevronRight, MapPin, Eye, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface MemoryStudyPhaseProps {
  items: StudyItem[];
  memoryPalace: MemoryLocation[];
  onComplete: () => void;
  includeTraits: boolean;
}

export function MemoryStudyPhase({ 
  items, 
  memoryPalace, 
  onComplete,
  includeTraits 
}: MemoryStudyPhaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedAll, setViewedAll] = useState(false);
  
  const currentItem = items[currentIndex];
  const currentLocation = memoryPalace.find(loc => loc.id === currentItem.locationId);
  const progress = ((currentIndex + 1) / items.length) * 100;

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setViewedAll(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinishStudy = () => {
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Fase de Estudio
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Memoriza cada ítem y su ubicación en tu palacio de memoria
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {currentIndex + 1} / {items.length}
          </p>
          <Progress value={progress} className="w-32" />
        </div>
      </div>

      {/* Ubicación en el palacio */}
      {currentLocation && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100">
                  Ubicación {currentLocation.order}: {currentLocation.name}
                </p>
                {currentLocation.description && (
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {currentLocation.description}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tarjeta de estudio */}
      <Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="text-center bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
          <CardTitle className="text-3xl">
            {currentItem.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Imagen */}
            {currentItem.imageUrl && (
              <div className="w-64 h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                {currentItem.imageUrl.startsWith('http') ? (
                  <img 
                    src={currentItem.imageUrl} 
                    alt={currentItem.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-8xl">{currentItem.imageUrl}</span>
                )}
              </div>
            )}

            {/* Rasgos (solo para rostros en niveles avanzados) */}
            {includeTraits && currentItem.traits && currentItem.traits.length > 0 && (
              <div className="bg-purple-50 dark:bg-purple-950 rounded-lg p-4 w-full max-w-md">
                <h4 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                  Rasgos distintivos:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 dark:text-purple-200">
                  {currentItem.traits.map((trait, idx) => (
                    <li key={idx}>{trait}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sugerencia de asociación */}
            <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4 w-full max-w-md">
              <p className="text-sm text-yellow-900 dark:text-yellow-100">
                💡 <strong>Sugerencia:</strong> Imagina a <strong>{currentItem.name}</strong> en{' '}
                <strong>{currentLocation?.name || 'esta ubicación'}</strong> de forma exagerada 
                y memorable. Cuanto más absurda la imagen mental, mejor la recordarás.
              </p>
            </div>

            {/* Tipo de ítem */}
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                {currentItem.type === 'face' ? '👤 Rostro' : 
                 currentItem.type === 'object' ? '📦 Objeto' :
                 currentItem.type === 'number' ? '🔢 Número' : '📝 Palabra'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles de navegación */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          variant="outline"
          size="lg"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Anterior
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Tómate tu tiempo para memorizar cada ítem
          </p>
        </div>

        {currentIndex < items.length - 1 ? (
          <Button
            onClick={handleNext}
            size="lg"
          >
            Siguiente
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleFinishStudy}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Finalizar Estudio
          </Button>
        )}
      </div>

      {/* Indicador de finalización */}
      {viewedAll && (
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-900 dark:text-green-100">
              ¡Has visto todos los ítems! Haz clic en "Finalizar Estudio" cuando estés listo.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
