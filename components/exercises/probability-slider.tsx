'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProbabilitySliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  disabled?: boolean;
  label?: string;
  showPercentage?: boolean;
  showCalibrationZones?: boolean;
  className?: string;
}

export function ProbabilitySlider({
  value,
  onChange,
  disabled = false,
  label = 'Probabilidad',
  showPercentage = true,
  showCalibrationZones = false,
  className,
}: ProbabilitySliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  // Color basado en la probabilidad
  const getColor = (prob: number): string => {
    if (prob < 20) return 'bg-red-500';
    if (prob < 40) return 'bg-orange-500';
    if (prob < 60) return 'bg-yellow-500';
    if (prob < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  // Zonas de calibración para superforecasting
  const getCalibrationZone = (prob: number): string => {
    if (prob < 5 || prob > 95) return 'Extrema confianza';
    if (prob < 20 || prob > 80) return 'Alta confianza';
    if (prob < 40 || prob > 60) return 'Confianza moderada';
    return 'Alta incertidumbre';
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {showPercentage && (
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-2xl font-bold',
              localValue < 30 ? 'text-red-600 dark:text-red-400' :
              localValue < 70 ? 'text-yellow-600 dark:text-yellow-400' :
              'text-green-600 dark:text-green-400'
            )}>
              {localValue}%
            </span>
          </div>
        )}
      </div>

      {/* Slider */}
      <div className="relative pt-1">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'w-full h-3 rounded-lg appearance-none cursor-pointer',
            'bg-gray-200 dark:bg-gray-700',
            'slider-thumb',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          style={{
            background: `linear-gradient(to right, 
              #ef4444 0%, 
              #f97316 20%, 
              #eab308 40%, 
              #3b82f6 60%, 
              #22c55e 80%, 
              #22c55e 100%)`,
          }}
        />
        
        {/* Marcadores de referencia */}
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Zonas de calibración (para usuarios avanzados) */}
      {showCalibrationZones && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <div className={cn(
              'w-3 h-3 rounded-full',
              localValue < 5 || localValue > 95 ? 'bg-purple-500' :
              localValue < 20 || localValue > 80 ? 'bg-blue-500' :
              localValue < 40 || localValue > 60 ? 'bg-yellow-500' :
              'bg-gray-400'
            )} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Zona: {getCalibrationZone(localValue)}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            {localValue < 5 || localValue > 95 ? 
              'Reserva 0-5% y 95-100% solo para certeza casi absoluta.' :
            localValue < 20 || localValue > 80 ?
              'Alta confianza. Asegúrate de tener evidencia sólida.' :
            localValue < 40 || localValue > 60 ?
              'Moderada confianza. Situación típica con evidencia mixta.' :
              'Alta incertidumbre. Ideal cuando no tienes información clara.'}
          </p>
        </div>
      )}

      {/* Input numérico para ajuste fino */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 dark:text-gray-400">
          Ajuste fino:
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={localValue}
          onChange={(e) => {
            const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
            setLocalValue(val);
            onChange(val);
          }}
          disabled={disabled}
          className={cn(
            'w-20 px-2 py-1 text-sm border rounded',
            'bg-white dark:bg-gray-800',
            'border-gray-300 dark:border-gray-600',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        <span className="text-xs text-gray-500">%</span>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #3b82f6;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #3b82f6;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider-thumb:disabled::-webkit-slider-thumb {
          cursor: not-allowed;
          background: #e5e7eb;
        }

        .slider-thumb:disabled::-moz-range-thumb {
          cursor: not-allowed;
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}

// Variante simple sin zonas de calibración
export function SimpleProbabilitySlider({
  value,
  onChange,
  disabled = false,
  label,
}: Omit<ProbabilitySliderProps, 'showCalibrationZones' | 'showPercentage'>) {
  return (
    <ProbabilitySlider
      value={value}
      onChange={onChange}
      disabled={disabled}
      label={label}
      showPercentage={true}
      showCalibrationZones={false}
    />
  );
}

// Variante avanzada con calibración para superforecasters
export function CalibratedProbabilitySlider({
  value,
  onChange,
  disabled = false,
  label,
}: Omit<ProbabilitySliderProps, 'showCalibrationZones' | 'showPercentage'>) {
  return (
    <ProbabilitySlider
      value={value}
      onChange={onChange}
      disabled={disabled}
      label={label}
      showPercentage={true}
      showCalibrationZones={true}
    />
  );
}
