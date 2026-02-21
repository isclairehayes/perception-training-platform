'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  AlertTriangle, 
  Brain,
  TrendingDown,
  Shield,
  Lightbulb,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CognitiveBias {
  id: string;
  name: string;
  category: string;
  description: string;
  example: string;
  howToAvoid: string;
  relatedBiases: string[];
  severity: 'low' | 'medium' | 'high';
  commonIn: string[];
}

const COGNITIVE_BIASES: CognitiveBias[] = [
  {
    id: 'base_rate_neglect',
    name: 'Descuido de Tasa Base',
    category: 'Probabilidad',
    description: 'Ignorar la tasa base (frecuencia general) al evaluar probabilidades, enfocándose solo en información específica.',
    example: 'Un test médico es 95% preciso y sale positivo. Mucha gente concluye "95% de que esté enfermo", ignorando que la enfermedad afecta solo al 1% de la población.',
    howToAvoid: 'Siempre pregunta: "¿Cuál es la tasa base?" antes de evaluar evidencia específica. Usa el teorema de Bayes.',
    relatedBiases: ['representativeness_heuristic'],
    severity: 'high',
    commonIn: ['medical', 'legal', 'security'],
  },
  {
    id: 'overconfidence',
    name: 'Exceso de Confianza',
    category: 'Calibración',
    description: 'Sobreestimar la precisión de nuestros juicios y predicciones.',
    example: 'Decir que estás "90% seguro" de algo, pero en realidad solo aciertas 60% de las veces.',
    howToAvoid: 'Trackea tu calibración histórica. Si dices 70%, debería suceder ~70% del tiempo. Usa rangos amplios cuando hay incertidumbre.',
    relatedBiases: ['optimism_bias', 'planning_fallacy'],
    severity: 'high',
    commonIn: ['forecasting', 'investing', 'project_management'],
  },
  {
    id: 'confirmation_bias',
    name: 'Sesgo de Confirmación',
    category: 'Búsqueda de Información',
    description: 'Buscar, interpretar y recordar información que confirma nuestras creencias existentes, ignorando evidencia contraria.',
    example: 'Invertiste en Tesla. Solo lees noticias positivas sobre la empresa e ignoras análisis negativos.',
    howToAvoid: 'Busca activamente evidencia que contradiga tu hipótesis. Red team tus propias creencias. Considera la visión contraria.',
    relatedBiases: ['anchoring', 'wishful_thinking'],
    severity: 'high',
    commonIn: ['investing', 'science', 'politics', 'daily_life'],
  },
  {
    id: 'availability_heuristic',
    name: 'Sesgo de Disponibilidad',
    category: 'Memoria',
    description: 'Sobreestimar la probabilidad de eventos que son fáciles de recordar (recientes, dramáticos, emocionales).',
    example: 'Después de ver noticias de un accidente aéreo, sobrestimas la probabilidad de morir en un avión (real: ~1 en 11 millones).',
    howToAvoid: 'Pregunta: "¿Esto es memorable porque es común o porque es dramático?" Busca estadísticas objetivas, no ejemplos memorables.',
    relatedBiases: ['recency_bias'],
    severity: 'high',
    commonIn: ['risk_assessment', 'insurance', 'medical'],
  },
  {
    id: 'anchoring',
    name: 'Anclaje',
    category: 'Heurística',
    description: 'Depender demasiado de la primera información recibida (el "ancla") al tomar decisiones.',
    example: 'Compraste acciones a $100. Ahora valen $80. Rechazas vender porque "esperas que vuelvan a $100", aunque los fundamentals hayan cambiado.',
    howToAvoid: 'Ignora información irrelevante. Evalúa la situación actual independientemente de puntos de referencia pasados.',
    relatedBiases: ['sunk_cost_fallacy', 'status_quo_bias'],
    severity: 'medium',
    commonIn: ['negotiation', 'investing', 'pricing'],
  },
  {
    id: 'gamblers_fallacy',
    name: 'Falacia del Apostador',
    category: 'Probabilidad',
    description: 'Creer que eventos pasados afectan la probabilidad de eventos futuros independientes.',
    example: 'Una moneda justa sale cara 5 veces seguidas. Piensas "ahora DEBE salir cruz". Probabilidad real: 50%.',
    howToAvoid: 'Recuerda: eventos independientes no tienen memoria. La moneda no "debe" nada.',
    relatedBiases: ['hot_hand_fallacy'],
    severity: 'medium',
    commonIn: ['gambling', 'lottery', 'sports'],
  },
  {
    id: 'hot_hand_fallacy',
    name: 'Falacia de Racha Caliente',
    category: 'Probabilidad',
    description: 'Creer que rachas en eventos aleatorios continuarán.',
    example: 'Tu equipo ganó 5 partidos seguidos. Apuestas todo porque "está en racha". Realidad: puede ser aleatoriedad.',
    howToAvoid: 'Pregunta: "¿Esta racha es habilidad o suerte?" Regresión a la media existe. Rachas extremas suelen revertir.',
    relatedBiases: ['gamblers_fallacy', 'regression_to_mean'],
    severity: 'medium',
    commonIn: ['sports', 'investing', 'hiring'],
  },
  {
    id: 'sunk_cost_fallacy',
    name: 'Falacia del Costo Hundido',
    category: 'Decisión',
    description: 'Dejar que inversiones pasadas (tiempo, dinero, esfuerzo) irrecuperables influyan en decisiones futuras.',
    example: 'Invertiste $10,000 en cripto y perdiste $8,000. Piensas "ya perdí tanto, debo mantener para recuperar". Los $8,000 ya se fueron.',
    howToAvoid: 'Pregunta: "Si empezara de cero HOY, ¿tomaría esta decisión?" Ignora lo que ya gastaste.',
    relatedBiases: ['loss_aversion', 'status_quo_bias'],
    severity: 'high',
    commonIn: ['investing', 'relationships', 'projects'],
  },
  {
    id: 'loss_aversion',
    name: 'Aversión a la Pérdida',
    category: 'Emoción',
    description: 'Las pérdidas duelen ~2x más que las ganancias equivalentes nos satisfacen.',
    example: 'Prefieres no arriesgar $100 con 50% de ganar $250, porque la pérdida potencial pesa más que la ganancia.',
    howToAvoid: 'Evalúa decisiones por valor esperado, no por aversión emocional a perder. Acepta pérdidas cuando la EV es positiva.',
    relatedBiases: ['sunk_cost_fallacy', 'status_quo_bias'],
    severity: 'high',
    commonIn: ['investing', 'entrepreneurship', 'risk_taking'],
  },
  {
    id: 'optimism_bias',
    name: 'Sesgo de Optimismo',
    category: 'Predicción',
    description: 'Sobrestimar la probabilidad de eventos positivos y subestimar eventos negativos.',
    example: 'Founders creen que su startup tiene 90% de éxito. Tasa base real: ~10%.',
    howToAvoid: 'Usa tasas base de eventos similares. Aplica "premortem": imagina que fallaste, ¿qué salió mal?',
    relatedBiases: ['overconfidence', 'planning_fallacy'],
    severity: 'high',
    commonIn: ['entrepreneurship', 'projects', 'relationships'],
  },
  {
    id: 'representativeness_heuristic',
    name: 'Heurística de Representatividad',
    category: 'Heurística',
    description: 'Juzgar probabilidad por cuán "típico" o "representativo" parece algo, ignorando tasa base.',
    example: 'Steve es tímido y ordenado. Parece "típico bibliotecario", pero hay 20x más granjeros que bibliotecarios.',
    howToAvoid: 'Pregunta: "¿Cuántos X hay vs Y?" antes de juzgar por descripción. Usa tasa base.',
    relatedBiases: ['base_rate_neglect'],
    severity: 'medium',
    commonIn: ['profiling', 'hiring', 'stereotyping'],
  },
  {
    id: 'conjunction_fallacy',
    name: 'Falacia de Conjunción',
    category: 'Lógica',
    description: 'Creer que dos eventos juntos (A∩B) son más probables que uno solo (A). Imposible matemáticamente.',
    example: 'Linda es activista social. ¿Qué es más probable? (A) Es cajera de banco, (B) Es cajera Y feminista. Respuesta: A siempre.',
    howToAvoid: 'Recuerda: P(A∩B) ≤ P(A) siempre. Añadir condiciones NUNCA aumenta probabilidad.',
    relatedBiases: ['representativeness_heuristic'],
    severity: 'medium',
    commonIn: ['logic_puzzles', 'legal', 'forecasting'],
  },
  {
    id: 'regression_to_mean',
    name: 'No Anticipar Regresión a la Media',
    category: 'Estadística',
    description: 'No reconocer que eventos extremos tienden a revertir al promedio.',
    example: 'Tu hijo saca 100 en un examen. Esperas que siempre saque 100. Próximo examen: 85. No es que empeoró, es regresión.',
    howToAvoid: 'Pregunta: "¿Esto fue habilidad o suerte?" Eventos extremos incluyen componente aleatorio que desaparece.',
    relatedBiases: ['hot_hand_fallacy'],
    severity: 'medium',
    commonIn: ['sports', 'education', 'business'],
  },
  {
    id: 'recency_bias',
    name: 'Sesgo de Recencia',
    category: 'Memoria',
    description: 'Sobreponderar información reciente sobre datos históricos.',
    example: '5 startups de IA tuvieron éxito este mes. Concluyes "todas las startups de IA tienen éxito". Tasa base histórica: ~10%.',
    howToAvoid: 'Amplía la ventana temporal. Pregunta: "¿Qué muestran los últimos 5 años, no solo 5 semanas?"',
    relatedBiases: ['availability_heuristic'],
    severity: 'medium',
    commonIn: ['investing', 'forecasting', 'trends'],
  },
  {
    id: 'normalcy_bias',
    name: 'Sesgo de Normalidad',
    category: 'Riesgo',
    description: 'Subestimar riesgo de desastres/eventos extremos porque "nunca ha pasado antes".',
    example: '"Nunca habrá una pandemia global en mi vida". COVID-19: hold my beer.',
    howToAvoid: 'Pregunta: "¿Cuál es la probabilidad en un siglo, no solo en mi vida?" Eventos raros eventualmente pasan.',
    relatedBiases: ['optimism_bias'],
    severity: 'high',
    commonIn: ['disaster_prep', 'insurance', 'global_risks'],
  },
  {
    id: 'planning_fallacy',
    name: 'Falacia de Planificación',
    category: 'Predicción',
    description: 'Subestimar tiempo, costos y riesgos de proyectos futuros.',
    example: '"Terminaré este proyecto en 2 semanas". Realidad: 6 semanas. (Ley de Hofstadter: todo toma más de lo esperado).',
    howToAvoid: 'Usa "vista externa": ¿Cuánto tomaron proyectos similares? Multiplica tu estimación inicial por 2-3x.',
    relatedBiases: ['optimism_bias', 'overconfidence'],
    severity: 'high',
    commonIn: ['project_management', 'construction', 'software'],
  },
  {
    id: 'narrative_fallacy',
    name: 'Falacia de Narrativa',
    category: 'Explicación',
    description: 'Construir narrativas coherentes que expliquen eventos pasados, ignorando rol del azar.',
    example: '"El mercado cayó porque el CEO renunció". Realidad: múltiples factores aleatorios. La narrativa es retrospectiva.',
    howToAvoid: 'Desconfía de explicaciones simples y coherentes. Pregunta: "¿Hay evidencia o solo narrativa?"',
    relatedBiases: ['hindsight_bias'],
    severity: 'medium',
    commonIn: ['news', 'history', 'markets'],
  },
  {
    id: 'scope_insensitivity',
    name: 'Insensibilidad a Escala',
    category: 'Magnitud',
    description: 'No ajustar valoración según la magnitud del problema.',
    example: 'Donarías $50 para salvar 100 aves. También donarías $50 para salvar 10,000 aves. La escala debería importar.',
    howToAvoid: 'Pregunta: "¿Cuántas X hay?" y ajusta tu respuesta proporcionalmente.',
    relatedBiases: ['affect_heuristic'],
    severity: 'medium',
    commonIn: ['charity', 'policy', 'budgeting'],
  },
  {
    id: 'binary_thinking',
    name: 'Pensamiento Binario',
    category: 'Calibración',
    description: 'Ver eventos como 0% o 100% sin matices probabilísticos.',
    example: '"Ganará seguro" (100%) o "Perderá seguro" (0%). Realidad: muchas cosas son 30%, 60%, 75%.',
    howToAvoid: 'Practica asignar probabilidades intermedias. La mayoría de eventos no son certezas.',
    relatedBiases: ['overconfidence'],
    severity: 'medium',
    commonIn: ['politics', 'sports', 'daily_predictions'],
  },
  {
    id: 'conservatism_bias',
    name: 'Sesgo de Conservadurismo',
    category: 'Actualización',
    description: 'Actualizar creencias demasiado lentamente ante nueva evidencia.',
    example: 'Problema de Monty Hall: la mayoría no actualiza suficientemente su probabilidad al cambiar de puerta.',
    howToAvoid: 'Cuando hay evidencia fuerte, actualiza significativamente. No te ancles en tu prior inicial.',
    relatedBiases: ['anchoring'],
    severity: 'medium',
    commonIn: ['bayesian_updating', 'science', 'learning'],
  },
];

export function BiasLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedBias, setExpandedBias] = useState<string | null>(null);

  const categories = Array.from(new Set(COGNITIVE_BIASES.map(b => b.category)));

  const filteredBiases = COGNITIVE_BIASES.filter(bias => {
    const matchesSearch = 
      bias.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bias.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || bias.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Brain className="h-7 w-7 text-purple-600" />
          Biblioteca de Sesgos Cognitivos
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {COGNITIVE_BIASES.length} sesgos cognitivos documentados. Conocerlos es el primer paso para evitarlos.
        </p>
      </div>

      {/* Búsqueda */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar sesgos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtro por categoría */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !selectedCategory
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de sesgos */}
      <div className="space-y-3">
        {filteredBiases.map((bias) => {
          const isExpanded = expandedBias === bias.id;

          return (
            <Card key={bias.id} className="overflow-hidden">
              <button
                onClick={() => setExpandedBias(isExpanded ? null : bias.id)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{bias.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(bias.severity)}`}>
                        {bias.severity === 'high' ? 'Alto impacto' : 
                         bias.severity === 'medium' ? 'Impacto medio' : 
                         'Bajo impacto'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {bias.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded">
                        {bias.category}
                      </span>
                      {bias.commonIn.slice(0, 2).map(domain => (
                        <span key={domain} className="text-xs text-gray-500">
                          #{domain.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  {/* Ejemplo */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                          Ejemplo
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {bias.example}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cómo evitarlo */}
                  <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                          Cómo evitarlo
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {bias.howToAvoid}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sesgos relacionados */}
                  {bias.relatedBiases.length > 0 && (
                    <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                            Sesgos relacionados
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {bias.relatedBiases.map(relatedId => {
                              const relatedBias = COGNITIVE_BIASES.find(b => b.id === relatedId);
                              return relatedBias ? (
                                <button
                                  key={relatedId}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedBias(relatedId);
                                    // Scroll suave al sesgo relacionado
                                    setTimeout(() => {
                                      document.getElementById(relatedId)?.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'center'
                                      });
                                    }, 100);
                                  }}
                                  className="text-xs px-3 py-1 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-700 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors"
                                >
                                  {relatedBias.name}
                                </button>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dominios comunes */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <TrendingDown className="h-4 w-4" />
                    <span>Común en:</span>
                    <div className="flex gap-2 flex-wrap">
                      {bias.commonIn.map(domain => (
                        <span key={domain} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                          {domain.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filteredBiases.length === 0 && (
        <div className="text-center py-12">
          <Brain className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron sesgos que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </div>
  );
}
