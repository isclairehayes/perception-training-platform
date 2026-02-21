import { TheorySection } from './active-listening-types';

/**
 * Teoría de Escucha Activa e Información Implícita
 * 
 * Basado en:
 * - Derren Brown: Cold Reading techniques
 * - PNL: Meta-modelo del lenguaje
 * - Psicología Cognitiva: Presuposiciones y heurísticas
 * - Efecto Barnum (Forer Effect)
 */

export const ACTIVE_LISTENING_THEORY: TheorySection[] = [
  {
    id: 'intro-implicit-info',
    title: 'Introducción: Información Explícita vs Implícita',
    difficulty: 1,
    content: `La información implícita es aquella que NO se dice directamente pero que está presente en la comunicación. Es lo que se asume, se omite, o se insinúa.

**Información Explícita:**
"Tengo 30 años y vivo en Barcelona."

**Información Implícita:**
En "¿Cuándo dejaste de fumar?" está implícito que:
- La persona fumaba antes
- Ya no fuma (presuposición)

La mayoría de personas procesa información implícita inconscientemente. Entrenar la escucha activa te permite detectar conscientemente lo que realmente se está comunicando.`,
    examples: [
      'Explícito: "Estoy cansado" → Implícito: Probablemente no quiere hacer algo',
      'Pregunta: "¿Tu pareja también viene?" → Implícito: Asume que tienes pareja',
      '"Otra vez llegando tarde" → Implícito: Hay un patrón previo de retrasos'
    ]
  },
  {
    id: 'presuppositions',
    title: 'Presuposiciones: Lo que se asume sin decir',
    difficulty: 2,
    content: `Las presuposiciones son asunciones que deben ser verdad para que una frase tenga sentido. Se introducen sutilmente en preguntas y afirmaciones.

**Ejemplos:**
- "¿Cuándo vas a encontrar trabajo?" → Presupone que no tienes trabajo
- "¿Por qué siempre me interrumpes?" → Presupone que hay un patrón de interrupciones
- "¿Cómo lo descubriste?" → Presupone que hubo un descubrimiento

**En ventas y manipulación:**
- "¿Prefieres el modelo rojo o azul?" → Presupone que ya compraste
- "¿Cuándo podemos empezar?" → Presupone que ya acordaste empezar

**Detección:**
Pregúntate: "¿Qué debe ser cierto para que esta frase tenga sentido?"`,
    examples: [
      '"¿Otra vez pizza?" → Presupone que es frecuente',
      '"¿Ya terminaste?" → Presupone que deberías haber terminado',
      '"¿Sigues enfadado?" → Presupone que estuviste enfadado antes'
    ]
  },
  {
    id: 'barnum-effect',
    title: 'Efecto Barnum: Generalizaciones que parecen específicas',
    difficulty: 3,
    content: `El Efecto Barnum (o Forer Effect) es la tendencia a aceptar descripciones vagas y generales como específicas y personales.

Descubierto por Bertram Forer en 1948: dio a estudiantes un test de personalidad y luego les dio el MISMO perfil genérico a todos. 4.26/5 de precisión promedio.

**Características de una Barnum Statement:**
1. Suficientemente vaga para aplicar a casi todos
2. Usa lenguaje positivo (halagos sutiles)
3. Incluye contradicciones ("A veces X, pero también Y")
4. Habla de deseos/miedos universales

**Ejemplos clásicos:**
- "Tienes una gran necesidad de que otros te aprecien, pero a veces eres crítico contigo mismo"
- "Tienes mucho potencial sin usar"
- "A veces eres extrovertido y sociable, otras veces reservado y cauteloso"
- "Prefieres cierta cantidad de cambio y variedad, te sientes insatisfecho con restricciones"

**Uso en:**
- Horóscopos
- Lecturas psíquicas
- Tests de personalidad online
- Cold reading
- Marketing personalizado (falso)`,
    examples: [
      '"Eres más inteligente de lo que los demás creen" → 90% se identifica',
      '"Te preocupa el futuro pero intentas mantenerte positivo" → Universal',
      '"Has tenido decepciones en el pasado" → Literalmente todo el mundo'
    ]
  },
  {
    id: 'cold-reading',
    title: 'Cold Reading: El Arte de Parecer Psíquico (Derren Brown)',
    difficulty: 4,
    content: `El Cold Reading es un conjunto de técnicas para obtener información de alguien sin que lo noten, y hacer parecer que tienes conocimiento especial.

**Técnicas principales:**

**1. Rainbow Ruse**
Afirmar algo y su opuesto: "Eres confiado, pero también tienes momentos de duda"
Funciona porque TODOS experimentamos contradicciones.

**2. Jacques Statement**
Hacer afirmaciones sobre preocupaciones comunes: "Te preocupa no estar cumpliendo tu potencial"
Nombrado por Jacques Bergier. Funciona porque son miedos universales.

**3. Fishing**
Hacer afirmaciones vagas y ajustar según reacciones:
"Veo... una figura mayor... ¿padre o abuelo?" → Observar lenguaje corporal
"Empezó con M... ¿o tal vez N?" → Dejar que ellos rellenen

**4. Shotgunning**
Lanzar MUCHAS afirmaciones genéricas rápido:
"Veo problemas de espalda, rodillas, alguien con nombre J, un viaje reciente, preocupaciones de dinero..."
Funciona por probabilidad: algo va a acertar.

**5. Fine Flattery**
Halagos sutiles que todos aceptan:
"Eres más perceptivo que la mayoría"
"No te dejas engañar fácilmente"

**6. Pushing**
Afirmar algo confidentemente y esperar corrección:
"Veo que tu padre..." 
"No, mi abuelo"
"Sí, una figura paterna, un abuelo"
(Robar la corrección como si fuera tu info)

**Derren Brown:**
Derren Brown demostró estas técnicas en shows como "Messiah" (2005), donde engañó a profesionales haciéndose pasar por psíquico, curandero, espiritista, usando SOLO cold reading.

Su mensaje: "No hay magia. Todo es observación, probabilidad y psicología."`,
    examples: [
      'Rainbow: "Eres generoso pero también sabes poner límites" → Siempre cierto',
      'Jacques: "Hay algo que dejaste sin terminar" → 95% de personas',
      'Fishing: "Veo una J... ¿Juan, José, Jessica?" → Observar reacción',
      'Shotgun: "Dolor cabeza, espalda, estrés, problemas pareja, dinero ajustado" → Algo pega'
    ]
  },
  {
    id: 'meta-model',
    title: 'Meta-Modelo PNL: Omisiones, Generalizaciones, Distorsiones',
    difficulty: 4,
    content: `El Meta-Modelo de la PNL (Bandler & Grinder) identifica patrones lingüísticos que ocultan o distorsionan información.

**1. OMISIONES**
Falta información específica:
- "Me siento mal" → ¿Sobre qué? ¿Desde cuándo?
- "La gente no entiende" → ¿Qué gente? ¿Qué no entienden?
- "Es difícil" → ¿Qué específicamente?

**2. GENERALIZACIONES**
Reglas absolutas sin excepciones:
- "Nadie me escucha" → ¿Nadie? ¿Nunca?
- "Siempre lo arruino todo" → ¿Siempre? ¿Todo?
- Cuantificadores universales: todos, nadie, siempre, nunca

**3. DISTORSIONES**
Interpretaciones subjetivas como hechos:
- Nominalización: "Nuestra relación está rota" (¿Qué comportamientos específicos?)
- Lectura de mente: "Sé que piensa que soy tonto"
- Causa-efecto falso: "Me haces sentir mal" (tú no controlas mis sentimientos)

**Recuperar información:**
- Omisión → "¿Específicamente?"
- Generalización → "¿Siempre? ¿Todos? ¿Nunca hubo excepción?"
- Distorsión → "¿Cómo sabes? ¿Qué evidencia tienes?"`,
    examples: [
      'Omisión: "Estoy harto" → ¿De qué? ¿Desde cuándo?',
      'Generalización: "Todos me odian" → ¿Todos? ¿Tu madre también?',
      'Distorsión: "Me ignoran" → ¿Qué comportamiento específico interpretas como ignorar?'
    ]
  },
  {
    id: 'practical-applications',
    title: 'Aplicaciones Prácticas',
    difficulty: 5,
    content: `**Escucha activa avanzada te permite:**

**1. Detectar Manipulación**
- Vendedores usando presuposiciones
- Líderes usando generalizaciones emocionales
- "Psíquicos" usando cold reading

**2. Terapia y Coaching**
- Identificar creencias limitantes (generalizaciones)
- Recuperar información omitida
- Desafiar distorsiones cognitivas

**3. Negociación**
- Detectar asunciones ocultas
- Identificar información estratégicamente omitida
- Reconocer tácticas de presión

**4. Comunicación Clara**
- Hacer preguntas específicas
- Evitar asunciones
- Expresar información explícitamente

**5. Análisis Crítico**
- Medios: detectar sesgos y omisiones
- Política: identificar afirmaciones Barnum
- Marketing: reconocer personalización falsa

**Práctica diaria:**
- En conversaciones, pregúntate: "¿Qué información NO se está diciendo?"
- En preguntas: "¿Qué presupone esta pregunta?"
- En afirmaciones generales: "¿Es esto Barnum o específico?"
- En predicciones: "¿Es esto cold reading probabilístico?"

**Ética:**
Usa estas habilidades para:
✅ Protegerte de manipulación
✅ Comunicarte más claramente
✅ Ayudar a otros a expresarse
❌ NO para manipular o engañar`,
    examples: [
      'Vendedor: "¿Cuándo quieres que te lo entreguemos?" → Presupone compra',
      'Noticia: "La gente está preocupada" → ¿Qué gente? ¿Cuánta?',
      'Horóscopo: "Cambios importantes se acercan" → Barnum + vago temporal',
      'Coach: "Nadie me respeta" → Generalización que puedes desafiar'
    ]
  }
];

export function getTheoryByLevel(level: number): TheorySection[] {
  return ACTIVE_LISTENING_THEORY.filter(section => section.difficulty <= level);
}

export function getTheoryById(id: string): TheorySection | undefined {
  return ACTIVE_LISTENING_THEORY.find(section => section.id === id);
}
