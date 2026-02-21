'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Home, ArrowRight } from 'lucide-react';

export interface MemoryLocation {
  id: string;
  name: string;
  description: string;
  order: number;
}

interface MemoryPalaceSetupProps {
  onComplete: (locations: MemoryLocation[]) => void;
  initialLocations?: MemoryLocation[];
}

export function MemoryPalaceSetup({ onComplete, initialLocations = [] }: MemoryPalaceSetupProps) {
  const [locations, setLocations] = useState<MemoryLocation[]>(
    initialLocations.length > 0 
      ? initialLocations 
      : [
          { id: '1', name: '', description: '', order: 1 },
          { id: '2', name: '', description: '', order: 2 },
          { id: '3', name: '', description: '', order: 3 },
        ]
  );

  const addLocation = () => {
    const newId = String(locations.length + 1);
    setLocations([
      ...locations,
      { id: newId, name: '', description: '', order: locations.length + 1 },
    ]);
  };

  const removeLocation = (id: string) => {
    if (locations.length <= 3) return; // Mínimo 3 ubicaciones
    setLocations(locations.filter(loc => loc.id !== id).map((loc, idx) => ({
      ...loc,
      order: idx + 1,
    })));
  };

  const updateLocation = (id: string, field: 'name' | 'description', value: string) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, [field]: value } : loc
    ));
  };

  const handleComplete = () => {
    const validLocations = locations.filter(loc => loc.name.trim() !== '');
    if (validLocations.length >= 3) {
      onComplete(validLocations);
    }
  };

  const isValid = locations.filter(loc => loc.name.trim() !== '').length >= 3;

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            ¿Qué es el Método de Loci?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            El <strong>Método de Loci</strong> (o Palacio de la Memoria) es una técnica de memorización 
            ancestral usada por oradores griegos y romanos.
          </p>
          <p>
            La idea es simple: <strong>asocias información a ubicaciones físicas</strong> que conoces bien 
            (tu casa, tu ruta al trabajo, etc.). Cuando necesitas recordar, simplemente "caminas" 
            mentalmente por esos lugares.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Cómo funciona:</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Define una ruta con ubicaciones específicas (ej: puerta → salón → cocina)</li>
              <li>Asocia cada ítem a memorizar con una ubicación usando imágenes vívidas</li>
              <li>Para recordar, "camina" mentalmente y "observa" qué hay en cada lugar</li>
            </ol>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 <strong>Tip:</strong> Cuanto más absurdas y exageradas sean las asociaciones, mejor las recordarás.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Define tu Palacio de Memoria</CardTitle>
          <CardDescription>
            Elige un lugar que conozcas bien (tu casa, oficina, barrio). Define al menos 3 ubicaciones 
            en orden (por ejemplo: puerta de entrada → salón → cocina → habitación).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {locations.map((location, idx) => (
            <div key={location.id} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  placeholder={`Ubicación ${idx + 1} (ej: Puerta de entrada)`}
                  value={location.name}
                  onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                  className="font-medium"
                />
                <Input
                  placeholder="Descripción opcional (ej: Puerta roja con espejo a la izquierda)"
                  value={location.description}
                  onChange={(e) => updateLocation(location.id, 'description', e.target.value)}
                  className="text-sm"
                />
              </div>
              {locations.length > 3 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeLocation(location.id)}
                  className="flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addLocation}
            className="w-full"
            disabled={locations.length >= 20}
          >
            <Plus className="w-4 h-4 mr-2" />
            Añadir Ubicación
          </Button>

          {!isValid && (
            <p className="text-sm text-red-500">
              Debes definir al menos 3 ubicaciones con nombre
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {locations.filter(loc => loc.name.trim() !== '').length} ubicaciones definidas
        </p>
        <Button
          onClick={handleComplete}
          disabled={!isValid}
          size="lg"
          className="gap-2"
        >
          Continuar al Ejercicio
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
