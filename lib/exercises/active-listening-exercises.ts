import { ExerciseQuestion } from './active-listening-types';
import { ALL_CONVERSATIONS } from './active-listening-dataset';

/**
 * Generador de preguntas de ejercicio para Active Listening
 * 
 * Tipos de preguntas:
 * - identify-implicit: Identificar qué fragmentos contienen información implícita
 * - classify-type: Clasificar el tipo de información implícita
 * - detect-barnum: Detectar afirmaciones Barnum vs específicas
 * - extract-presupposition: Extraer presuposiciones de preguntas
 * - spot-cold-reading: Identificar técnicas de cold reading
 */

export const EXERCISE_QUESTIONS: ExerciseQuestion[] = [
  // ========== NIVEL 1 ==========
  {
    id: 'q1-001',
    conversationId: 'l1-001',
    type: 'identify-implicit',
    question: '¿Qué información está implícita en la pregunta "¿Otra vez llegando tarde?"?',
    options: [
      'Ana pregunta la hora exacta',
      'Carlos ha llegado tarde antes',
      'Ana está enojada',
      'Es la primera vez que Carlos llega tarde'
    ],
    correctAnswer: 1,
    explanation: 'La palabra "otra vez" presupone que ha sucedido anteriormente. Es información implícita porque no se dice directamente "has llegado tarde antes".',
    difficulty: 1
  },
  {
    id: 'q1-002',
    conversationId: 'l1-002',
    type: 'identify-implicit',
    question: '¿Qué presupone la pregunta "¿Vas a traer a tu novia a la cena del domingo?"?',
    options: [
      'Que no tiene novia',
      'Que tiene novia',
      'Que la cena es el sábado',
      'Nada, es solo una pregunta'
    ],
    correctAnswer: 1,
    explanation: 'La pregunta presupone que tiene novia. Si no la tuviera, la pregunta no tendría sentido.',
    difficulty: 1
  },
  {
    id: 'q1-003',
    conversationId: 'l1-004',
    type: 'classify-type',
    question: '¿Qué tipo de información implícita usa el hijo al decir "Nadie aprobó"?',
    options: [
      'Omisión',
      'Generalización',
      'Presuposición',
      'Información explícita'
    ],
    correctAnswer: 1,
    explanation: 'Es una generalización (probablemente exagerada) para justificar su suspensión. "Nadie" es un cuantificador universal.',
    difficulty: 1
  },
  {
    id: 'q1-004',
    conversationId: 'l1-003',
    type: 'identify-implicit',
    question: '¿Por qué Laura pregunta "¿Cuándo empezaste con la dieta?"?',
    options: [
      'Porque quiere empezar una dieta',
      'Porque notó algún cambio en Marta',
      'Porque Marta se lo dijo antes',
      'Por curiosidad general'
    ],
    correctAnswer: 1,
    explanation: 'La pregunta presupone que Marta está en dieta. Laura debe haber notado cambios físicos o comentarios previos.',
    difficulty: 1
  },

  // ========== NIVEL 2 ==========
  {
    id: 'q2-001',
    conversationId: 'l2-001',
    type: 'extract-presupposition',
    question: 'En "¿Por qué dejaste tu último trabajo?", ¿qué NO está presupuesto?',
    options: [
      'Que tuvo un trabajo previo',
      'Que él decidió dejarlo (vs. lo despidieron)',
      'Que el trabajo era malo',
      'Todas están presupuestas'
    ],
    correctAnswer: 2,
    explanation: 'La pregunta presupone (1) trabajo previo y (2) que ÉL dejó (activo). No presupone que fuera malo.',
    difficulty: 2
  },
  {
    id: 'q2-002',
    conversationId: 'l2-002',
    type: 'classify-type',
    question: '¿Qué técnica usa él al decir "¿Por qué siempre tienes que sacar el pasado?"?',
    options: [
      'Información explícita',
      'Generalización + Presuposición',
      'Afirmación Barnum',
      'Cold reading'
    ],
    correctAnswer: 1,
    explanation: '"Siempre" es generalización y "sacar el pasado" presupone que ella lo hace frecuentemente.',
    difficulty: 2
  },
  {
    id: 'q2-003',
    conversationId: 'l2-003',
    type: 'identify-implicit',
    question: 'El vendedor pregunta "¿Prefieres el modelo rojo o el azul?". ¿Qué está intentando?',
    options: [
      'Saber su color favorito',
      'Presuponer que ya decidió comprar',
      'Darle opciones',
      'Conocer sus gustos'
    ],
    correctAnswer: 1,
    explanation: 'Técnica de venta presuntiva: presupone la compra, solo falta elegir color. Evita la pregunta "¿lo compras?"',
    difficulty: 2
  },
  {
    id: 'q2-004',
    conversationId: 'l2-004',
    type: 'classify-type',
    question: 'El paciente dice "Todo... nada de lo que hago está bien". ¿Qué patrón tiene?',
    options: [
      'Generalizaciones extremas',
      'Omisiones',
      'Barnum statements',
      'Cold reading'
    ],
    correctAnswer: 0,
    explanation: '"Todo" y "Nada" son generalizaciones extremas típicas de distorsiones cognitivas en depresión.',
    difficulty: 2
  },
  {
    id: 'q2-005',
    conversationId: 'l2-005',
    type: 'identify-implicit',
    question: 'El manager dice "necesitamos mejorar los números". ¿Qué omite?',
    options: [
      'Nada, es claro',
      'Qué números específicamente',
      'Qué pasará si no mejoran',
      'Ambas B y C'
    ],
    correctAnswer: 3,
    explanation: 'Omite especificidad (qué números) y consecuencias (amenaza implícita). Típico de gestión pasivo-agresiva.',
    difficulty: 2
  },

  // ========== NIVEL 3: Barnum ==========
  {
    id: 'q3-001',
    conversationId: 'l3-001',
    type: 'detect-barnum',
    question: '"Eres inteligente, más de lo que los demás reconocen". ¿Es esto Barnum?',
    options: [
      'No, es específico de la persona',
      'Sí, casi todos piensan que son inteligentes y no valorados',
      'No, el tarotista tiene información especial',
      'Sí, pero solo funciona con gente insegura'
    ],
    correctAnswer: 1,
    explanation: 'Barnum clásico + Fine Flattery. 90%+ piensan que son más inteligentes que el promedio (sesgo de superioridad ilusoria).',
    difficulty: 3
  },
  {
    id: 'q3-002',
    conversationId: 'l3-002',
    type: 'spot-cold-reading',
    question: '"Extrovertido y sociable, pero también valoras tu tiempo a solas". ¿Qué técnica es?',
    options: [
      'Información específica',
      'Rainbow Ruse',
      'Shotgunning',
      'Fishing'
    ],
    correctAnswer: 1,
    explanation: 'Rainbow Ruse: afirmar algo y su opuesto. TODO el mundo tiene momentos sociales y momentos solitarios.',
    difficulty: 3
  },
  {
    id: 'q3-003',
    conversationId: 'l3-003',
    type: 'detect-barnum',
    question: '¿Cuál de estas afirmaciones NO es Barnum?',
    options: [
      'Tienes potencial enorme sin usar',
      'Eres duro contigo mismo pero a veces permisivo',
      'Naciste el 15 de marzo de 1987',
      'Prefieres estabilidad pero te emociona el cambio'
    ],
    correctAnswer: 2,
    explanation: 'Solo la fecha es información específica. Las demás son Barnum que aplican a casi todos.',
    difficulty: 3
  },
  {
    id: 'q3-004',
    conversationId: 'l3-004',
    type: 'spot-cold-reading',
    question: 'El médium dice "una M... o tal vez una N". ¿Qué técnica usa?',
    options: [
      'Comunicación con espíritus',
      'Fishing (letras comunes)',
      'Rainbow Ruse',
      'Jacques Statement'
    ],
    correctAnswer: 1,
    explanation: 'Fishing: lanzar letras comunes y dejar que la audiencia rellene. M/N son muy comunes en español.',
    difficulty: 3
  },
  {
    id: 'q3-005',
    conversationId: 'l3-005',
    type: 'detect-barnum',
    question: '¿Por qué funcionan tan bien los tests de personalidad genéricos?',
    options: [
      'Porque son científicos',
      'Porque usan Barnum: afirmaciones vagas que todos aceptan',
      'Porque predicen el futuro',
      'Porque están personalizados'
    ],
    correctAnswer: 1,
    explanation: 'Efecto Barnum/Forer: aceptamos descripciones vagas como específicas cuando queremos creer.',
    difficulty: 3
  },

  // ========== NIVEL 4: Cold Reading Múltiple ==========
  {
    id: 'q4-001',
    conversationId: 'l4-001',
    type: 'spot-cold-reading',
    question: 'Derren dice "dolor en el pecho... ¿él o tal vez tú?". ¿Qué técnica combina?',
    options: [
      'Solo Fishing',
      'Fishing + Pushing + cobertura ("o tal vez tú")',
      'Rainbow Ruse',
      'Barnum Statement'
    ],
    correctAnswer: 1,
    explanation: 'Combina Fishing (afirmación vaga), Pushing (observar reacción) y cobertura (si falla, pivota a "o tú").',
    difficulty: 4
  },
  {
    id: 'q4-002',
    conversationId: 'l4-002',
    type: 'spot-cold-reading',
    question: '¿Qué es "Shotgunning" y por qué funciona?',
    options: [
      'Hacer una afirmación específica',
      'Lanzar muchas afirmaciones genéricas rápido - algo acertará',
      'Preguntar directamente',
      'Usar lenguaje técnico'
    ],
    correctAnswer: 1,
    explanation: 'Shotgunning: lanzar muchas afirmaciones comunes rápidamente. Por probabilidad, algo acertará y se recuerda solo eso.',
    difficulty: 4
  },
  {
    id: 'q4-003',
    conversationId: 'l4-003',
    type: 'extract-presupposition',
    question: 'El vendedor pregunta "¿Forma de pago o fecha de entrega?". ¿Qué presupone?',
    options: [
      'Que tiene dinero',
      'Que ya decidió comprar',
      'Que le gusta el producto',
      'Nada especial'
    ],
    correctAnswer: 1,
    explanation: 'Presupone que YA compró. Ignora objeción y pregunta solo sobre detalles. Venta presuntiva agresiva.',
    difficulty: 4
  },
  {
    id: 'q4-004',
    conversationId: 'l4-004',
    type: 'detect-barnum',
    question: 'El grafólogo dice "determinada pero con inseguridades ocultas". ¿Por qué funciona?',
    options: [
      'Porque lee la firma científicamente',
      'Porque es un Rainbow Ruse que aplica a todos',
      'Porque es específico de la persona',
      'Porque solo funciona con inseguros'
    ],
    correctAnswer: 1,
    explanation: 'Rainbow Ruse disfrazado de ciencia. TODO el mundo tiene determinación E inseguridades.',
    difficulty: 4
  },
  {
    id: 'q4-005',
    conversationId: 'l4-005',
    type: 'identify-implicit',
    question: 'El líder dice "No es su culpa... YO tengo la solución". ¿Qué hace?',
    options: [
      'Ofrece ayuda genuina',
      'Victimiza al grupo y se posiciona como salvador único',
      'Analiza problemas',
      'Da información específica'
    ],
    correctAnswer: 1,
    explanation: 'Técnica de cultos/MLM: externaliza culpa ("no es tu culpa") y se presenta como única solución (dependencia).',
    difficulty: 4
  },

  // ========== NIVEL 5: Análisis Complejo ==========
  {
    id: 'q5-001',
    conversationId: 'l5-001',
    type: 'extract-presupposition',
    question: 'El detective pregunta "¿Cuándo planeaste hacerlo?". ¿Qué presupone?',
    options: [
      'Que es culpable (lo hizo)',
      'Solo pregunta por curiosidad',
      'Que piensa mucho',
      'Nada, es pregunta neutral'
    ],
    correctAnswer: 0,
    explanation: 'Presupone que LO HIZO. Solo falta saber si fue planeado o impulsivo. Trampa clásica de interrogación.',
    difficulty: 5
  },
  {
    id: 'q5-002',
    conversationId: 'l5-002',
    type: 'identify-implicit',
    question: '"Los que aporten valor se quedan". ¿Qué omite el ejecutivo?',
    options: [
      'Nada, es claro',
      'Quién define valor, criterios, cuántos se van',
      'La fecha',
      'El salario'
    ],
    correctAnswer: 1,
    explanation: 'Omite toda especificidad: criterios, quién decide, cuántos. Eufemismo corporativo para despidos masivos.',
    difficulty: 5
  },
  {
    id: 'q5-003',
    conversationId: 'l5-003',
    type: 'classify-type',
    question: 'El paciente dice "Siempre arruino... Nadie quiere...". ¿Qué distorsión cognitiva es?',
    options: [
      'Información objetiva',
      'Generalización absoluta + Lectura de mente',
      'Barnum statement',
      'Cold reading'
    ],
    correctAnswer: 1,
    explanation: 'Combina generalizaciones ("siempre", "nadie") con lectura de mente (asume lo que otros piensan sin evidencia).',
    difficulty: 5
  },
  {
    id: 'q5-004',
    conversationId: 'l5-004',
    type: 'identify-implicit',
    question: 'El político evade la pregunta sobre impuestos. ¿Qué técnica usa?',
    options: [
      'Responde directamente',
      'Reframing + omisión + lenguaje Barnum políticamente seguro',
      'Miente explícitamente',
      'Dice la verdad'
    ],
    correctAnswer: 1,
    explanation: 'Combina: reframing (cambia marco), omisión (no responde sí/no), Barnum ("proteger familias" - vago pero seguro).',
    difficulty: 5
  },
  {
    id: 'q5-005',
    conversationId: 'l5-005',
    type: 'identify-implicit',
    question: 'En gaslighting, él dice "Nunca dije las 8... siempre recuerdas mal". ¿Qué hace?',
    options: [
      'Corrige un error',
      'Hace que ella dude de su memoria y credibilidad (gaslighting)',
      'Dice la verdad',
      'Se disculpa'
    ],
    correctAnswer: 1,
    explanation: 'Gaslighting: niega realidad + ataca credibilidad con generalización ("siempre recuerdas mal"). Manipulación psicológica.',
    difficulty: 5
  },
  {
    id: 'q5-006',
    conversationId: 'l5-006',
    type: 'identify-implicit',
    question: 'El reclutador dice "Tu familia... pueden intentar detenerte". ¿Qué hace?',
    options: [
      'Advierte genuinamente',
      'Aislamiento preventivo: presupone conflicto y deslegitima red de apoyo',
      'Da consejo familiar',
      'Predice el futuro'
    ],
    correctAnswer: 1,
    explanation: 'Técnica de culto: aislamiento preventivo. Presupone conflicto familiar Y que la familia está equivocada. Separa de apoyo.',
    difficulty: 5
  },
];

// Helper functions
export function getQuestionsByLevel(level: number): ExerciseQuestion[] {
  return EXERCISE_QUESTIONS.filter(q => q.difficulty === level);
}

export function getQuestionsByConversation(conversationId: string): ExerciseQuestion[] {
  return EXERCISE_QUESTIONS.filter(q => q.conversationId === conversationId);
}

export function getQuestionById(id: string): ExerciseQuestion | undefined {
  return EXERCISE_QUESTIONS.find(q => q.id === id);
}

export function getQuestionsByType(type: ExerciseQuestion['type']): ExerciseQuestion[] {
  return EXERCISE_QUESTIONS.filter(q => q.type === type);
}

export const EXERCISE_STATS = {
  totalQuestions: EXERCISE_QUESTIONS.length,
  byLevel: {
    1: getQuestionsByLevel(1).length,
    2: getQuestionsByLevel(2).length,
    3: getQuestionsByLevel(3).length,
    4: getQuestionsByLevel(4).length,
    5: getQuestionsByLevel(5).length,
  },
  byType: {
    'identify-implicit': getQuestionsByType('identify-implicit').length,
    'classify-type': getQuestionsByType('classify-type').length,
    'detect-barnum': getQuestionsByType('detect-barnum').length,
    'extract-presupposition': getQuestionsByType('extract-presupposition').length,
    'spot-cold-reading': getQuestionsByType('spot-cold-reading').length,
  },
};
