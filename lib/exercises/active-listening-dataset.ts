import { Conversation, ImplicitInfo, Transcript } from './active-listening-types';

/**
 * Dataset de Conversaciones para Entrenamiento de Escucha Activa
 * 
 * 50+ conversaciones con información implícita etiquetada
 * Organizado por niveles de dificultad (1-5)
 */

// ==================== NIVEL 1: Información Implícita Obvia ====================

const LEVEL_1_CONVERSATIONS: Conversation[] = [
  {
    id: 'l1-001',
    title: 'Llegada Tarde',
    context: 'Conversación entre compañeros de trabajo',
    level: 1,
    tags: ['workplace', 'basic'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Ana',
        text: '¿Otra vez llegando tarde?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Carlos',
        text: 'Lo siento, el tráfico...',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: '¿Otra vez llegando tarde?',
        explanation: 'Presupone que Carlos ha llegado tarde anteriormente. "Otra vez" indica un patrón previo.',
        difficulty: 1
      },
      {
        id: 'i2',
        type: 'omission',
        text: 'Lo siento, el tráfico...',
        explanation: 'Carlos no niega llegar tarde, confirmando implícitamente la acusación.',
        difficulty: 1
      }
    ]
  },
  {
    id: 'l1-002',
    title: 'Cena de Familia',
    context: 'Conversación telefónica madre-hijo',
    level: 1,
    tags: ['family', 'basic'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Madre',
        text: '¿Vas a traer a tu novia a la cena del domingo?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Hijo',
        text: 'Mamá, ya te dije que estamos tomando un descanso.',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: '¿Vas a traer a tu novia a la cena del domingo?',
        explanation: 'Presupone dos cosas: (1) que tiene novia, (2) que hay una cena el domingo.',
        difficulty: 1
      },
      {
        id: 'i2',
        type: 'omission',
        text: 'tomando un descanso',
        explanation: 'Eufemismo que implica problemas en la relación sin decirlo explícitamente.',
        difficulty: 1
      }
    ]
  },
  {
    id: 'l1-003',
    title: 'Dieta Nueva',
    context: 'Conversación entre amigas',
    level: 1,
    tags: ['casual', 'health'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Laura',
        text: '¿Cuándo empezaste con la dieta?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Marta',
        text: 'Hace dos semanas. Ya he bajado 3 kilos.',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: '¿Cuándo empezaste con la dieta?',
        explanation: 'Presupone que Marta está haciendo dieta. Laura debe haber notado algún cambio.',
        difficulty: 1
      },
      {
        id: 'i2',
        type: 'explicit',
        text: 'Ya he bajado 3 kilos',
        explanation: 'Información explícita - contraste educativo para mostrar la diferencia.',
        difficulty: 1
      }
    ]
  },
  {
    id: 'l1-004',
    title: 'Examen Suspendido',
    context: 'Padre e hijo después de la escuela',
    level: 1,
    tags: ['family', 'education'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Padre',
        text: '¿Cómo te fue en el examen de matemáticas?',
        implicitInfoIds: []
      },
      {
        id: 't2',
        speaker: 'Hijo',
        text: 'Bueno... estaba muy difícil. Nadie aprobó.',
        implicitInfoIds: ['i1', 'i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'omission',
        text: 'estaba muy difícil',
        explanation: 'No responde directamente. La excusa implica que suspendió.',
        difficulty: 1
      },
      {
        id: 'i2',
        type: 'generalization',
        text: 'Nadie aprobó',
        explanation: 'Generalización probablemente exagerada para justificar su suspensión.',
        difficulty: 1
      }
    ]
  },
  {
    id: 'l1-005',
    title: 'Fin de Semana',
    context: 'Conversación de oficina el lunes',
    level: 1,
    tags: ['workplace', 'casual'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Jefe',
        text: '¿Descansaste bien el fin de semana?',
        implicitInfoIds: []
      },
      {
        id: 't2',
        speaker: 'Empleado',
        text: 'Apenas dormí. Tuve que terminar el informe.',
        implicitInfoIds: ['i1', 'i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'omission',
        text: 'Tuve que terminar el informe',
        explanation: 'Implica que trabajó el fin de semana (queja sutil al jefe).',
        difficulty: 1
      },
      {
        id: 'i2',
        type: 'presupposition',
        text: 'terminar el informe',
        explanation: 'Presupone que el informe no estaba terminado antes del fin de semana.',
        difficulty: 1
      }
    ]
  }
];

// ==================== NIVEL 2: Presuposiciones Simples ====================

const LEVEL_2_CONVERSATIONS: Conversation[] = [
  {
    id: 'l2-001',
    title: 'Entrevista de Trabajo',
    context: 'Entrevistador y candidato',
    level: 2,
    tags: ['professional', 'interview'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Entrevistador',
        text: '¿Por qué dejaste tu último trabajo?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Candidato',
        text: 'Buscaba nuevos desafíos y crecimiento profesional.',
        implicitInfoIds: ['i2']
      },
      {
        id: 't3',
        speaker: 'Entrevistador',
        text: '¿Y cuánto tiempo estuviste sin encontrar empleo?',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: '¿Por qué dejaste tu último trabajo?',
        explanation: 'Presupone que (1) tuvo un trabajo previo, (2) que lo dejó (vs. lo despidieron).',
        difficulty: 2
      },
      {
        id: 'i2',
        type: 'omission',
        text: 'Buscaba nuevos desafíos',
        explanation: 'Respuesta diplomática que omite el verdadero motivo. Podría haber problemas no mencionados.',
        difficulty: 2
      },
      {
        id: 'i3',
        type: 'presupposition',
        text: '¿cuánto tiempo estuviste sin encontrar empleo?',
        explanation: 'Presupone que hubo un periodo de desempleo. Pregunta trampa.',
        difficulty: 2
      }
    ]
  },
  {
    id: 'l2-002',
    title: 'Pareja Discutiendo',
    context: 'Conversación tensa entre pareja',
    level: 2,
    tags: ['relationship', 'conflict'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Él',
        text: '¿Por qué siempre tienes que sacar el pasado?',
        implicitInfoIds: ['i1', 'i2']
      },
      {
        id: 't2',
        speaker: 'Ella',
        text: 'Porque nunca has cambiado. Sigues haciendo lo mismo.',
        implicitInfoIds: ['i3', 'i4']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'generalization',
        text: 'siempre tienes que sacar el pasado',
        explanation: 'Generalización "siempre" - probablemente exagerada pero indica un patrón percibido.',
        difficulty: 2
      },
      {
        id: 'i2',
        type: 'presupposition',
        text: 'sacar el pasado',
        explanation: 'Presupone que ella menciona eventos previos frecuentemente (y que él lo ve negativo).',
        difficulty: 2
      },
      {
        id: 'i3',
        type: 'generalization',
        text: 'nunca has cambiado',
        explanation: 'Generalización absoluta "nunca" - indica frustración acumulada.',
        difficulty: 2
      },
      {
        id: 'i4',
        type: 'distortion',
        text: 'Sigues haciendo lo mismo',
        explanation: 'Afirmación vaga sin especificar QUÉ hace. Lectura de mente implícita.',
        difficulty: 2
      }
    ]
  },
  {
    id: 'l2-003',
    title: 'Venta de Coche',
    context: 'Vendedor de autos y cliente',
    level: 2,
    tags: ['sales', 'manipulation'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Vendedor',
        text: '¿Prefieres el modelo rojo o el azul?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Cliente',
        text: 'Todavía no he decidido si comprarlo.',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Vendedor',
        text: 'Claro, claro. ¿Y cuándo podrías recogerlo? ¿Esta semana o la siguiente?',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: '¿Prefieres el modelo rojo o el azul?',
        explanation: 'Presupone que YA decidió comprar, solo falta elegir color. Técnica de venta clásica.',
        difficulty: 2
      },
      {
        id: 'i2',
        type: 'presupposition',
        text: '¿cuándo podrías recogerlo?',
        explanation: 'Ignora la objeción y presupone de nuevo la compra. Venta presuntiva.',
        difficulty: 2
      }
    ]
  },
  {
    id: 'l2-004',
    title: 'Terapia',
    context: 'Terapeuta y paciente',
    level: 2,
    tags: ['therapy', 'professional'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Terapeuta',
        text: '¿Qué te hace sentir más ansioso?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Paciente',
        text: 'Todo. Siento que nada de lo que hago está bien.',
        implicitInfoIds: ['i2', 'i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: '¿Qué te hace sentir más ansioso?',
        explanation: 'Presupone que el paciente SIENTE ansiedad. Pregunta terapéutica apropiada.',
        difficulty: 2
      },
      {
        id: 'i2',
        type: 'generalization',
        text: 'Todo... nada de lo que hago está bien',
        explanation: 'Generalizaciones extremas típicas de depresión/ansiedad. "Todo" y "Nada" son señales.',
        difficulty: 2
      },
      {
        id: 'i3',
        type: 'distortion',
        text: 'nada de lo que hago está bien',
        explanation: 'Distorsión cognitiva: presenta juicio subjetivo como hecho objetivo.',
        difficulty: 2
      }
    ]
  },
  {
    id: 'l2-005',
    title: 'Reunión de Equipo',
    context: 'Manager y equipo en reunión',
    level: 2,
    tags: ['workplace', 'leadership'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Manager',
        text: 'Sé que todos están trabajando duro, pero necesitamos mejorar los números.',
        implicitInfoIds: ['i1', 'i2']
      },
      {
        id: 't2',
        speaker: 'Empleado',
        text: 'Es difícil cuando tenemos menos recursos que antes.',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: 'todos están trabajando duro, pero...',
        explanation: 'El "pero" niega lo anterior. Realmente está diciendo que NO trabajan suficiente.',
        difficulty: 2
      },
      {
        id: 'i2',
        type: 'omission',
        text: 'necesitamos mejorar los números',
        explanation: 'Omite qué pasará si no mejoran. Amenaza implícita.',
        difficulty: 2
      },
      {
        id: 'i3',
        type: 'presupposition',
        text: 'menos recursos que antes',
        explanation: 'Presupone que hubo recortes de recursos (queja sobre gestión).',
        difficulty: 2
      }
    ]
  }
];

// ==================== NIVEL 3: Barnum vs Específico ====================

const LEVEL_3_CONVERSATIONS: Conversation[] = [
  {
    id: 'l3-001',
    title: 'Lectura de Tarot',
    context: 'Tarotista y cliente',
    level: 3,
    tags: ['psychic', 'barnum', 'cold-reading'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Tarotista',
        text: 'Veo que eres una persona inteligente, más de lo que los demás reconocen.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Cliente',
        text: '¡Sí! Nadie en mi trabajo valora mis ideas.',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Tarotista',
        text: 'Exacto. Y siento que hay algo importante que dejaste sin terminar... un proyecto o un sueño.',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: 'eres una persona inteligente, más de lo que los demás reconocen',
        explanation: 'Afirmación Barnum clásica. 90%+ de personas piensan que son más inteligentes que el promedio y que no son valorados.',
        coldReadingTechnique: 'fine-flattery',
        difficulty: 3
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'algo importante que dejaste sin terminar',
        explanation: 'Barnum universal. TODOS tienen proyectos o sueños sin cumplir. Extremadamente vago.',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 3
      }
    ]
  },
  {
    id: 'l3-002',
    title: 'Horóscopo Personalizado',
    context: 'Astrólogo y consultante',
    level: 3,
    tags: ['psychic', 'barnum'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Astrólogo',
        text: 'Tu carta natal muestra que eres extrovertido y sociable, pero también valoras tu tiempo a solas.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Consultante',
        text: '¡Exacto! Mis amigos no entienden que a veces necesite estar solo.',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Astrólogo',
        text: 'Claro. Y veo tensión en relaciones... alguien cercano te ha decepcionado recientemente.',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: 'extrovertido y sociable, pero también valoras tu tiempo a solas',
        explanation: 'Rainbow Ruse clásico: afirma algo y su opuesto. TODOS tienen ambos aspectos.',
        coldReadingTechnique: 'rainbow-ruse',
        difficulty: 3
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'alguien cercano te ha decepcionado recientemente',
        explanation: 'Estadísticamente casi seguro para cualquier persona. "Recientemente" es vago (¿1 mes? ¿1 año?).',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 3
      }
    ]
  },
  {
    id: 'l3-003',
    title: 'Coach de Vida',
    context: 'Life coach y cliente en primera sesión',
    level: 3,
    tags: ['coaching', 'barnum'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Coach',
        text: 'Puedo ver que tienes un potencial enorme que aún no has utilizado completamente.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Cliente',
        text: 'Sí, siento que podría lograr mucho más...',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Coach',
        text: 'Exacto. A veces eres muy duro contigo mismo, pero otras veces tal vez demasiado permisivo. Necesitas balance.',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: 'potencial enorme que aún no has utilizado completamente',
        explanation: 'Barnum del test de Forer original. Casi todos sienten que tienen potencial sin usar.',
        coldReadingTechnique: 'fine-flattery',
        difficulty: 3
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'duro contigo mismo, pero otras veces demasiado permisivo',
        explanation: 'Rainbow Ruse: cubre ambos extremos. Imposible estar equivocado.',
        coldReadingTechnique: 'rainbow-ruse',
        difficulty: 3
      }
    ]
  },
  {
    id: 'l3-004',
    title: 'Médium en Show',
    context: 'Médium haciendo lectura en vivo',
    level: 3,
    tags: ['psychic', 'cold-reading', 'barnum'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Médium',
        text: 'Estoy recibiendo... una M... o tal vez una N... ¿alguien con nombre que empiece así?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Audiencia',
        text: '¡Mi abuela María!',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Médium',
        text: 'Sí, María. Ella quiere que sepas que está orgullosa de ti y que siempre te cuida.',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'cold-reading',
        text: 'una M... o tal vez una N',
        explanation: 'Fishing: letras comunes, dejar que la audiencia rellene. En español M/N son muy comunes (María, Manuel, Natalia...).',
        coldReadingTechnique: 'fishing',
        difficulty: 3
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'está orgullosa de ti y que siempre te cuida',
        explanation: 'Mensaje universal que cualquier persona querría escuchar de un fallecido. Funciona siempre.',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 3
      }
    ]
  },
  {
    id: 'l3-005',
    title: 'Test de Personalidad Online',
    context: 'Resultado de test de personalidad',
    level: 3,
    tags: ['barnum', 'personality'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Test',
        text: 'Tu personalidad: Eres creativo e imaginativo, pero también práctico cuando la situación lo requiere.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Test',
        text: 'Prefieres la estabilidad, pero también te emociona la posibilidad de cambio y nuevas aventuras.',
        implicitInfoIds: ['i2']
      },
      {
        id: 't3',
        speaker: 'Test',
        text: 'A veces te sientes inseguro sobre tus decisiones, aunque proyectas confianza hacia los demás.',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: 'creativo e imaginativo, pero también práctico',
        explanation: 'Rainbow Ruse: cubre ambos lados. Todos tienen momentos creativos y prácticos.',
        coldReadingTechnique: 'rainbow-ruse',
        difficulty: 3
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'Prefieres la estabilidad, pero también te emociona... cambio',
        explanation: 'Otra contradicción que aplica a todos. Nadie es 100% un extremo.',
        coldReadingTechnique: 'rainbow-ruse',
        difficulty: 3
      },
      {
        id: 'i3',
        type: 'barnum',
        text: 'inseguro sobre decisiones, aunque proyectas confianza',
        explanation: 'Barnum clásico: la mayoría siente inseguridad interna pero intenta aparentar seguridad.',
        coldReadingTechnique: 'fine-flattery',
        difficulty: 3
      }
    ]
  }
];

// ==================== NIVEL 4: Cold Reading Múltiple ====================

const LEVEL_4_CONVERSATIONS: Conversation[] = [
  {
    id: 'l4-001',
    title: 'Derren Brown: Lectura en Frío Completa',
    context: 'Demostración de cold reading (basado en técnicas reales de Derren Brown)',
    level: 4,
    tags: ['cold-reading', 'advanced', 'derren-brown'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Derren',
        text: 'Veo que guardas algo en tu bolsillo o cartera... una foto vieja o un objeto sentimental.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Sujeto',
        text: '¡Sí! Tengo una foto de mi padre.',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Derren',
        text: 'Tu padre... hay algo sin resolver ahí. Una conversación que nunca tuviste.',
        implicitInfoIds: ['i2']
      },
      {
        id: 't4',
        speaker: 'Sujeto',
        text: 'Murió antes de que pudiéramos... sí.',
        implicitInfoIds: []
      },
      {
        id: 't5',
        speaker: 'Derren',
        text: 'Y siento dolor en el pecho, ¿él tuvo problemas cardíacos? ¿O tal vez tú?',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'cold-reading',
        text: 'guardas algo... foto vieja o un objeto sentimental',
        explanation: 'Probabilidad alta: mucha gente lleva fotos/objetos sentimentales. Si falla, ajusta a "solías tener".',
        coldReadingTechnique: 'shotgunning',
        difficulty: 4
      },
      {
        id: 'i2',
        type: 'cold-reading',
        text: 'algo sin resolver... conversación que nunca tuviste',
        explanation: 'Jacques statement: casi todos tienen asuntos pendientes con padres. Universal.',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 4
      },
      {
        id: 'i3',
        type: 'cold-reading',
        text: 'dolor en el pecho... problemas cardíacos... ¿O tal vez tú?',
        explanation: 'Fishing + Pushing: afirma algo vago, observa reacción. Causa de muerte común. "O tal vez tú" cubre si falla.',
        coldReadingTechnique: 'fishing',
        difficulty: 4
      }
    ]
  },
  {
    id: 'l4-002',
    title: 'Médium TV: Shotgunning',
    context: 'Médium en programa de televisión con audiencia',
    level: 4,
    tags: ['cold-reading', 'shotgunning'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Médium',
        text: 'Estoy recibiendo muchas cosas a la vez... alguien con problemas de rodilla o espalda... una J... dolor de cabeza crónico... problemas de corazón... alguien que fumaba...',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Persona1',
        text: '¡Mi abuela tenía artritis de rodilla!',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Médium',
        text: 'Sí, siento las rodillas. Y ella... ¿era fuerte pero también tenía un lado vulnerable?',
        implicitInfoIds: ['i2']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'cold-reading',
        text: 'problemas de rodilla o espalda... J... dolor de cabeza... corazón... fumaba',
        explanation: 'Shotgunning clásico: lanzar muchas afirmaciones comunes rápidamente. Algo acertará estadísticamente.',
        coldReadingTechnique: 'shotgunning',
        difficulty: 4
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'fuerte pero también tenía un lado vulnerable',
        explanation: 'Rainbow Ruse: todo el mundo es fuerte Y vulnerable. Después de acierto, vuelve a Barnum.',
        coldReadingTechnique: 'rainbow-ruse',
        difficulty: 4
      }
    ]
  },
  {
    id: 'l4-003',
    title: 'Vendedor Manipulador Experto',
    context: 'Vendedor usando presuposiciones y presión',
    level: 4,
    tags: ['sales', 'manipulation', 'presupposition'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Vendedor',
        text: 'Usted es una persona inteligente que sabe reconocer una buena oportunidad.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Cliente',
        text: 'Bueno, necesito pensarlo...',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Vendedor',
        text: '¿Qué es exactamente lo que necesita pensar? ¿La forma de pago o la fecha de entrega?',
        implicitInfoIds: ['i2']
      },
      {
        id: 't4',
        speaker: 'Cliente',
        text: 'No, es que es mucho dinero.',
        implicitInfoIds: []
      },
      {
        id: 't5',
        speaker: 'Vendedor',
        text: '¿Comparado con qué? ¿Con seguir perdiendo dinero sin esta solución?',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: 'persona inteligente que sabe reconocer una buena oportunidad',
        explanation: 'Fine flattery: halago + presión. Si te niegas, implícitamente eres "no inteligente".',
        coldReadingTechnique: 'fine-flattery',
        difficulty: 4
      },
      {
        id: 'i2',
        type: 'presupposition',
        text: '¿forma de pago o fecha de entrega?',
        explanation: 'Presupone que YA compró. Solo falta decidir detalles. Ignora la objeción.',
        difficulty: 4
      },
      {
        id: 'i3',
        type: 'presupposition',
        text: '¿seguir perdiendo dinero sin esta solución?',
        explanation: 'Presupone que (1) está perdiendo dinero, (2) que esto es una solución. Reframing agresivo.',
        difficulty: 4
      }
    ]
  },
  {
    id: 'l4-004',
    title: 'Grafología (Análisis de Firma)',
    context: 'Grafólogo analizando firma',
    level: 4,
    tags: ['pseudoscience', 'cold-reading'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Grafólogo',
        text: 'Tu firma muestra que eres una persona determinada pero con inseguridades ocultas.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Cliente',
        text: 'Wow, ¿cómo puedes saber eso?',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Grafólogo',
        text: 'Los trazos ascendentes indican ambición. Pero la presión variable sugiere que dudas de ti mismo a veces.',
        implicitInfoIds: ['i2']
      },
      {
        id: 't4',
        speaker: 'Grafólogo',
        text: 'También veo que has pasado por una decepción reciente... algo que te hizo cuestionar tus decisiones.',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: 'determinada pero con inseguridades ocultas',
        explanation: 'Rainbow Ruse: todo el mundo tiene determinación E inseguridades. "Ocultas" hace difícil refutar.',
        coldReadingTechnique: 'rainbow-ruse',
        difficulty: 4
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'ambición... pero dudas de ti mismo a veces',
        explanation: 'Repite la contradicción con jerga pseudo-técnica ("trazos ascendentes"). Suena científico pero es Barnum.',
        coldReadingTechnique: 'rainbow-ruse',
        difficulty: 4
      },
      {
        id: 'i3',
        type: 'cold-reading',
        text: 'decepción reciente... cuestionar tus decisiones',
        explanation: 'Jacques statement: probabilísticamente cierto para casi todos. "Reciente" es vago (¿meses? ¿años?).',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 4
      }
    ]
  },
  {
    id: 'l4-005',
    title: 'Líder Carismático (Manipulación Grupal)',
    context: 'Líder en conferencia motivacional',
    level: 4,
    tags: ['manipulation', 'leadership', 'barnum'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Líder',
        text: 'Sé que muchos de ustedes sienten que no están alcanzando su verdadero potencial.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Audiencia',
        text: '*Aplaude*',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Líder',
        text: 'Han intentado cambiar antes, pero algo siempre los detiene. ¿Verdad?',
        implicitInfoIds: ['i2']
      },
      {
        id: 't4',
        speaker: 'Audiencia',
        text: '¡Sí!',
        implicitInfoIds: []
      },
      {
        id: 't5',
        speaker: 'Líder',
        text: 'No es su culpa. El sistema está diseñado para mantenerlos abajo. Pero YO tengo la solución.',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: 'no están alcanzando su verdadero potencial',
        explanation: 'Barnum universal: casi todos sienten esto. Crea identificación grupal.',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 4
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'Han intentado cambiar antes, pero algo siempre los detiene',
        explanation: 'Probabilísticamente cierto. La mayoría ha intentado cambios que no funcionaron.',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 4
      },
      {
        id: 'i3',
        type: 'distortion',
        text: 'No es su culpa... YO tengo la solución',
        explanation: 'Victimización + salvador. Clásico de cultos/MLM. Externaliza culpa y se posiciona como única solución.',
        difficulty: 4
      }
    ]
  }
];

// ==================== NIVEL 5: Análisis Complejo ====================

const LEVEL_5_CONVERSATIONS: Conversation[] = [
  {
    id: 'l5-001',
    title: 'Interrogatorio Policial',
    context: 'Detective interrogando sospechoso',
    level: 5,
    tags: ['interrogation', 'advanced', 'presupposition'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Detective',
        text: '¿Dónde estabas el martes entre las 8 y las 10 PM?',
        implicitInfoIds: []
      },
      {
        id: 't2',
        speaker: 'Sospechoso',
        text: 'En casa, viendo TV.',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Detective',
        text: '¿Solo? ¿O alguien puede confirmarlo?',
        implicitInfoIds: ['i1']
      },
      {
        id: 't4',
        speaker: 'Sospechoso',
        text: 'Solo. Mi esposa estaba de viaje.',
        implicitInfoIds: ['i2']
      },
      {
        id: 't5',
        speaker: 'Detective',
        text: '¿Por qué no mencionaste eso primero? ¿Qué más no me estás diciendo?',
        implicitInfoIds: ['i3']
      },
      {
        id: 't6',
        speaker: 'Sospechoso',
        text: '¡Nada! Solo respondí tu pregunta.',
        implicitInfoIds: []
      },
      {
        id: 't7',
        speaker: 'Detective',
        text: '¿Cuándo planeaste hacerlo? ¿Fue impulsivo o llevabas tiempo pensándolo?',
        implicitInfoIds: ['i4']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'presupposition',
        text: '¿Solo? ¿O alguien puede confirmarlo?',
        explanation: 'Implica que necesita coartada - sutil presión de sospecha.',
        difficulty: 5
      },
      {
        id: 'i2',
        type: 'omission',
        text: 'Mi esposa estaba de viaje',
        explanation: 'Información voluntaria no solicitada - podría indicar nerviosismo o necesidad de justificar.',
        difficulty: 5
      },
      {
        id: 'i3',
        type: 'presupposition',
        text: '¿Qué más no me estás diciendo?',
        explanation: 'Presupone que está ocultando información. Técnica de presión psicológica.',
        difficulty: 5
      },
      {
        id: 'i4',
        type: 'presupposition',
        text: '¿Cuándo planeaste hacerlo? ¿Fue impulsivo o llevabas tiempo pensándolo?',
        explanation: 'Doble presupuesto: (1) que LO HIZO, (2) que solo falta saber si fue planeado. Trampa clásica de interrogación.',
        difficulty: 5
      }
    ]
  },
  {
    id: 'l5-002',
    title: 'Negociación Corporativa Compleja',
    context: 'Negociadores en fusión empresarial',
    level: 5,
    tags: ['negotiation', 'business', 'advanced'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Ejecutivo A',
        text: 'Hemos revisado su propuesta y, francamente, los números no tienen sentido.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Ejecutivo B',
        text: '¿Qué parte específicamente?',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Ejecutivo A',
        text: 'Toda. Pero podríamos considerar 40% menos si aceptan nuestras condiciones de gerencia.',
        implicitInfoIds: ['i2']
      },
      {
        id: 't4',
        speaker: 'Ejecutivo B',
        text: 'Interesante. ¿Y qué pasará con el personal actual?',
        implicitInfoIds: ['i3']
      },
      {
        id: 't5',
        speaker: 'Ejecutivo A',
        text: 'Haremos una evaluación completa. Los que aporten valor se quedan.',
        implicitInfoIds: ['i4']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'distortion',
        text: 'los números no tienen sentido',
        explanation: 'Ataque vago sin especificidad - táctica de negociación para presionar. Si fuera cierto, daría detalles.',
        difficulty: 5
      },
      {
        id: 'i2',
        type: 'presupposition',
        text: 'podríamos considerar 40% menos si aceptan nuestras condiciones',
        explanation: 'Presupone que la propuesta original es negociable desde arriba, establece ancla para negociar.',
        difficulty: 5
      },
      {
        id: 'i3',
        type: 'presupposition',
        text: '¿Y qué pasará con el personal actual?',
        explanation: 'Pregunta que presupone que ALGO pasará (probablemente despidos). No pregunta SI sino QUÉ.',
        difficulty: 5
      },
      {
        id: 'i4',
        type: 'omission',
        text: 'Los que aporten valor se quedan',
        explanation: 'Omite: quién define "valor", cuántos se irán, criterios específicos. Eufemismo para despidos masivos.',
        difficulty: 5
      }
    ]
  },
  {
    id: 'l5-003',
    title: 'Terapia: Confrontación de Creencias',
    context: 'Terapeuta desafiando distorsiones cognitivas',
    level: 5,
    tags: ['therapy', 'meta-model', 'advanced'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Paciente',
        text: 'Siempre arruino las cosas. Nadie quiere estar cerca de mí.',
        implicitInfoIds: ['i1', 'i2']
      },
      {
        id: 't2',
        speaker: 'Terapeuta',
        text: '¿Siempre? ¿Puedes pensar en alguna excepción?',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Paciente',
        text: 'Bueno... no literalmente siempre. Pero casi siempre.',
        implicitInfoIds: ['i3']
      },
      {
        id: 't4',
        speaker: 'Terapeuta',
        text: '¿Y cómo sabes que "nadie" quiere estar cerca? ¿Leíste sus mentes?',
        implicitInfoIds: []
      },
      {
        id: 't5',
        speaker: 'Paciente',
        text: 'Se nota. No me llaman, no me invitan a cosas...',
        implicitInfoIds: ['i4']
      },
      {
        id: 't6',
        speaker: 'Terapeuta',
        text: '¿Y tú los llamas a ellos? ¿Los invitas?',
        implicitInfoIds: ['i5']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'generalization',
        text: 'Siempre arruino las cosas',
        explanation: 'Generalización absoluta "siempre". Distorsión cognitiva típica de depresión.',
        difficulty: 5
      },
      {
        id: 'i2',
        type: 'generalization',
        text: 'Nadie quiere estar cerca de mí',
        explanation: 'Generalización absoluta "nadie". Lectura de mente sin evidencia.',
        difficulty: 5
      },
      {
        id: 'i3',
        type: 'generalization',
        text: 'casi siempre',
        explanation: 'Retrocede parcialmente pero mantiene generalización. Sesgo de confirmación: recuerda fracasos, olvida éxitos.',
        difficulty: 5
      },
      {
        id: 'i4',
        type: 'distortion',
        text: 'Se nota. No me llaman, no me invitan',
        explanation: 'Presenta interpretación subjetiva como evidencia objetiva. Omite su rol activo en relaciones.',
        difficulty: 5
      },
      {
        id: 'i5',
        type: 'presupposition',
        text: '¿Y tú los llamas a ellos? ¿Los invitas?',
        explanation: 'Pregunta que desafía omisión: el paciente omitió su responsabilidad en la dinámica social.',
        difficulty: 5
      }
    ]
  },
  {
    id: 'l5-004',
    title: 'Político en Entrevista',
    context: 'Periodista y político en debate',
    level: 5,
    tags: ['politics', 'media', 'evasion'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Periodista',
        text: '¿Va a subir los impuestos? Sí o no.',
        implicitInfoIds: []
      },
      {
        id: 't2',
        speaker: 'Político',
        text: 'Mire, lo que la gente quiere es un sistema justo donde todos contribuyamos según nuestra capacidad.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't3',
        speaker: 'Periodista',
        text: 'No respondió la pregunta. ¿Sí o no?',
        implicitInfoIds: []
      },
      {
        id: 't4',
        speaker: 'Político',
        text: 'La pregunta está mal planteada. No es "subir impuestos", es "hacer un sistema más eficiente".',
        implicitInfoIds: ['i2']
      },
      {
        id: 't5',
        speaker: 'Periodista',
        text: '¿Eso significa que sí?',
        implicitInfoIds: []
      },
      {
        id: 't6',
        speaker: 'Político',
        text: 'Significa que haremos lo necesario para proteger a las familias trabajadoras.',
        implicitInfoIds: ['i3']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'omission',
        text: 'sistema justo donde todos contribuyamos según nuestra capacidad',
        explanation: 'Evasión clásica: responde con generalidad inspiradora sin responder sí/no. Omite su posición real.',
        difficulty: 5
      },
      {
        id: 'i2',
        type: 'distortion',
        text: 'No es "subir impuestos", es "hacer un sistema más eficiente"',
        explanation: 'Reframing: cambia el marco de la pregunta para evitar responder. Distorsión semántica.',
        difficulty: 5
      },
      {
        id: 'i3',
        type: 'barnum',
        text: 'proteger a las familias trabajadoras',
        explanation: 'Lenguaje políticamente seguro sin contenido específico. Todos apoyan "proteger familias". Evita comprometerse.',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 5
      }
    ]
  },
  {
    id: 'l5-005',
    title: 'Gaslighting en Relación Tóxica',
    context: 'Pareja donde uno manipula la percepción del otro',
    level: 5,
    tags: ['manipulation', 'gaslighting', 'toxic'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Ella',
        text: 'Dijiste que volverías a las 8. Son las 11.',
        implicitInfoIds: []
      },
      {
        id: 't2',
        speaker: 'Él',
        text: 'Nunca dije las 8. Siempre pasa lo mismo contigo - recuerdas mal.',
        implicitInfoIds: ['i1', 'i2']
      },
      {
        id: 't3',
        speaker: 'Ella',
        text: 'Estoy segura que dijiste las 8.',
        implicitInfoIds: []
      },
      {
        id: 't4',
        speaker: 'Él',
        text: '¿Yes? Por eso nadie te toma en serio. Eres demasiado sensible y te inventas cosas.',
        implicitInfoIds: ['i3', 'i4']
      },
      {
        id: 't5',
        speaker: 'Ella',
        text: 'Solo estoy diciendo que...',
        implicitInfoIds: []
      },
      {
        id: 't6',
        speaker: 'Él',
        text: 'Después de todo lo que hago por ti, así me agradeces. Siempre me atacas.',
        implicitInfoIds: ['i5']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'distortion',
        text: 'Nunca dije las 8',
        explanation: 'Negación directa que hace dudar su memoria. Técnica de gaslighting.',
        difficulty: 5
      },
      {
        id: 'i2',
        type: 'generalization',
        text: 'Siempre pasa lo mismo contigo - recuerdas mal',
        explanation: 'Generalización que ataca su credibilidad. Patrón de gaslighting: hacer que dude de sí misma.',
        difficulty: 5
      },
      {
        id: 'i3',
        type: 'generalization',
        text: 'nadie te toma en serio',
        explanation: 'Generalización sin evidencia. Aislamiento social implícito - técnica de abuso.',
        difficulty: 5
      },
      {
        id: 'i4',
        type: 'distortion',
        text: 'Eres demasiado sensible y te inventas cosas',
        explanation: 'Ataque personal + invalidación emocional. Presenta su percepción como defecto de ella.',
        difficulty: 5
      },
      {
        id: 'i5',
        type: 'distortion',
        text: 'Después de todo lo que hago... siempre me atacas',
        explanation: 'DARVO (Deny, Attack, Reverse Victim and Offender): él es el atacado ahora. Inversión de roles.',
        difficulty: 5
      }
    ]
  },
  {
    id: 'l5-006',
    title: 'Culto: Reclutamiento',
    context: 'Reclutador de secta con nuevo prospecto',
    level: 5,
    tags: ['cult', 'manipulation', 'advanced'],
    transcripts: [
      {
        id: 't1',
        speaker: 'Reclutador',
        text: '¿Te sientes vacío a veces? Como si hubiera algo más pero no sabes qué.',
        implicitInfoIds: ['i1']
      },
      {
        id: 't2',
        speaker: 'Prospecto',
        text: 'Sí... exactamente eso.',
        implicitInfoIds: []
      },
      {
        id: 't3',
        speaker: 'Reclutador',
        text: 'La mayoría de personas viven dormidas. Pero tú eres diferente - lo puedo ver. Estás listo para despertar.',
        implicitInfoIds: ['i2', 'i3']
      },
      {
        id: 't4',
        speaker: 'Prospecto',
        text: '¿Despertar a qué?',
        implicitInfoIds: []
      },
      {
        id: 't5',
        speaker: 'Reclutador',
        text: 'No puedo explicarlo con palabras. Tienes que experimentarlo. Pero te advierto: una vez que veas la verdad, no podrás volver a ser quien eras.',
        implicitInfoIds: ['i4']
      },
      {
        id: 't6',
        speaker: 'Reclutador',
        text: 'Tu familia y amigos no lo entenderán. Pueden intentar detenerte. Pero eso es porque tienen miedo de su propia transformación.',
        implicitInfoIds: ['i5']
      }
    ],
    implicitInfo: [
      {
        id: 'i1',
        type: 'barnum',
        text: '¿Te sientes vacío a veces? Como si hubiera algo más',
        explanation: 'Jacques statement universal: existencialismo básico que casi todos sienten. Establece conexión.',
        coldReadingTechnique: 'jacques-statement',
        difficulty: 5
      },
      {
        id: 'i2',
        type: 'barnum',
        text: 'La mayoría viven dormidas. Pero tú eres diferente',
        explanation: 'Técnica de "special snowflake": te hace sentir elegido/superior. Halago que crea lealtad.',
        coldReadingTechnique: 'fine-flattery',
        difficulty: 5
      },
      {
        id: 'i3',
        type: 'presupposition',
        text: 'Estás listo para despertar',
        explanation: 'Presupone que HAY algo de lo que despertar y que él está preparado. Crea curiosidad y compromiso.',
        difficulty: 5
      },
      {
        id: 'i4',
        type: 'omission',
        text: 'No puedo explicarlo con palabras... una vez que veas la verdad',
        explanation: 'Omisión deliberada + presión: "verdad inefable" + advertencia que crea intriga. Técnica de culto clásica.',
        difficulty: 5
      },
      {
        id: 'i5',
        type: 'presupposition',
        text: 'Tu familia... pueden intentar detenerte',
        explanation: 'Aislamiento preventivo: presupone que habrá conflicto Y que la familia está equivocada. Separa de red de apoyo.',
        difficulty: 5
      }
    ]
  }
];

// ==================== CONSOLIDACIÓN DATASET ====================

export const ALL_CONVERSATIONS: Conversation[] = [
  ...LEVEL_1_CONVERSATIONS,
  ...LEVEL_2_CONVERSATIONS,
  ...LEVEL_3_CONVERSATIONS,
  ...LEVEL_4_CONVERSATIONS,
  ...LEVEL_5_CONVERSATIONS,
];

// Helper functions
export function getConversationsByLevel(level: number): Conversation[] {
  return ALL_CONVERSATIONS.filter(conv => conv.level === level);
}

export function getConversationById(id: string): Conversation | undefined {
  return ALL_CONVERSATIONS.find(conv => conv.id === id);
}

export function getConversationsByTag(tag: string): Conversation[] {
  return ALL_CONVERSATIONS.filter(conv => conv.tags.includes(tag));
}

export function getTotalConversations(): number {
  return ALL_CONVERSATIONS.length;
}

// Stats
export const DATASET_STATS = {
  totalConversations: ALL_CONVERSATIONS.length,
  byLevel: {
    1: LEVEL_1_CONVERSATIONS.length,
    2: LEVEL_2_CONVERSATIONS.length,
    3: LEVEL_3_CONVERSATIONS.length,
    4: LEVEL_4_CONVERSATIONS.length,
    5: LEVEL_5_CONVERSATIONS.length,
  },
  totalImplicitInfo: ALL_CONVERSATIONS.reduce(
    (sum, conv) => sum + conv.implicitInfo.length,
    0
  ),
};
