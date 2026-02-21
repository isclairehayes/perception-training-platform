'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { RadarData } from '@/types/skills';

interface SkillRadarChartProps {
  data: RadarData[];
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil de Habilidades</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data}>
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 5]} 
              tick={{ fill: '#6b7280' }}
            />
            <Radar
              name="Nivel"
              dataKey="level"
              stroke="#000000"
              fill="#000000"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
