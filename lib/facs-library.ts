/**
 * FACS (Facial Action Coding System) Library
 * 
 * Sistema de codificación de acciones faciales desarrollado por Paul Ekman
 * para describir objetivamente los movimientos faciales asociados a emociones.
 * 
 * Cada AU (Action Unit) representa un músculo o grupo muscular específico.
 */

import { Emotion } from '@/types/exercises';

export interface ActionUnit {
  code: string;
  name: string;
  muscle: string;
  description: string;
}

export const ACTION_UNITS: Record<string, ActionUnit> = {
  'AU1': {
    code: 'AU1',
    name: 'Inner Brow Raiser',
    muscle: 'Frontalis (parte interna)',
    description: 'Levanta la parte interna de las cejas',
  },
  'AU2': {
    code: 'AU2',
    name: 'Outer Brow Raiser',
    muscle: 'Frontalis (parte externa)',
    description: 'Levanta la parte externa de las cejas',
  },
  'AU4': {
    code: 'AU4',
    name: 'Brow Lowerer',
    muscle: 'Corrugator supercilii, Depressor supercilii',
    description: 'Baja y junta las cejas',
  },
  'AU5': {
    code: 'AU5',
    name: 'Upper Lid Raiser',
    muscle: 'Levator palpebrae superioris',
    description: 'Abre más los párpados superiores',
  },
  'AU6': {
    code: 'AU6',
    name: 'Cheek Raiser',
    muscle: 'Orbicularis oculi (parte orbital)',
    description: 'Levanta las mejillas, produce "patas de gallo"',
  },
  'AU7': {
    code: 'AU7',
    name: 'Lid Tightener',
    muscle: 'Orbicularis oculi (parte palpebral)',
    description: 'Estrecha los párpados',
  },
  'AU9': {
    code: 'AU9',
    name: 'Nose Wrinkler',
    muscle: 'Levator labii superioris alaeque nasi',
    description: 'Arruga la nariz',
  },
  'AU10': {
    code: 'AU10',
    name: 'Upper Lip Raiser',
    muscle: 'Levator labii superioris',
    description: 'Levanta el labio superior',
  },
  'AU12': {
    code: 'AU12',
    name: 'Lip Corner Puller',
    muscle: 'Zygomaticus major',
    description: 'Tira de las comisuras labiales hacia arriba',
  },
  'AU14': {
    code: 'AU14',
    name: 'Dimpler',
    muscle: 'Buccinator',
    description: 'Crea hoyuelos en las mejillas',
  },
  'AU15': {
    code: 'AU15',
    name: 'Lip Corner Depressor',
    muscle: 'Depressor anguli oris',
    description: 'Baja las comisuras labiales',
  },
  'AU17': {
    code: 'AU17',
    name: 'Chin Raiser',
    muscle: 'Mentalis',
    description: 'Levanta y arruga la barbilla',
  },
  'AU20': {
    code: 'AU20',
    name: 'Lip Stretcher',
    muscle: 'Risorius',
    description: 'Estira los labios horizontalmente',
  },
  'AU23': {
    code: 'AU23',
    name: 'Lip Tightener',
    muscle: 'Orbicularis oris',
    description: 'Aprieta y estrecha los labios',
  },
  'AU24': {
    code: 'AU24',
    name: 'Lip Pressor',
    muscle: 'Orbicularis oris',
    description: 'Presiona los labios uno contra otro',
  },
  'AU25': {
    code: 'AU25',
    name: 'Lips Part',
    muscle: 'Depressor labii inferioris, Relaxation of Mentalis/Orbicularis oris',
    description: 'Separa los labios',
  },
  'AU26': {
    code: 'AU26',
    name: 'Jaw Drop',
    muscle: 'Masseter, Temporal, Pterygoid',
    description: 'Deja caer la mandíbula, abre la boca',
  },
  'AU27': {
    code: 'AU27',
    name: 'Mouth Stretch',
    muscle: 'Pterygoids, Digastric',
    description: 'Estira la boca verticalmente',
  },
  'R12': {
    code: 'R12',
    name: 'Lip Corner Puller (unilateral)',
    muscle: 'Zygomaticus major (un lado)',
    description: 'Levanta una comisura labial (asimetría)',
  },
  'R14': {
    code: 'R14',
    name: 'Dimpler (unilateral)',
    muscle: 'Buccinator (un lado)',
    description: 'Crea hoyuelo asimétrico',
  },
};

export interface EmotionFACS {
  emotion: Emotion;
  primaryAUs: string[];
  secondaryAUs?: string[];
  description: string;
  keyIndicators: string[];
  commonMistakes: string[];
  intensity: {
    subtle: string;
    moderate: string;
    strong: string;
  };
}

export const EMOTION_FACS: Record<Emotion, EmotionFACS> = {
  happiness: {
    emotion: 'happiness',
    primaryAUs: ['AU6', 'AU12'],
    secondaryAUs: ['AU25', 'AU26'],
    description: 'Sonrisa genuina (Duchenne): Combina la acción del músculo cigomático mayor (levanta comisuras) con el orbicular del ojo (arrugas "patas de gallo"). La sonrisa falsa solo activa AU12.',
    keyIndicators: [
      'Arrugas "patas de gallo" en los ojos (AU6) - CRÍTICO para felicidad genuina',
      'Comisuras labiales elevadas simétricamente (AU12)',
      'Mejillas elevadas que empujan hacia arriba los párpados inferiores',
      'Puede incluir apertura leve de boca (AU25/26) en risas',
    ],
    commonMistakes: [
      'Confundir sonrisa social (solo AU12) con felicidad genuina',
      'No detectar AU6 ausente = sonrisa falsa/social',
      'Confundir con desprecio si hay asimetría',
    ],
    intensity: {
      subtle: 'AU12 leve, AU6 apenas visible (leve elevación mejillas)',
      moderate: 'AU12 + AU6 claros, patas de gallo visibles',
      strong: 'AU12 + AU6 intensos + AU25/26, boca abierta, ojos casi cerrados',
    },
  },
  sadness: {
    emotion: 'sadness',
    primaryAUs: ['AU1', 'AU4', 'AU15'],
    secondaryAUs: ['AU17', 'AU6'],
    description: 'Tristeza: Las cejas se levantan en su parte interna (AU1) y se juntan/bajan (AU4), creando forma oblicua. Las comisuras labiales bajan (AU15). La barbilla puede arrugarse (AU17).',
    keyIndicators: [
      'Cejas en forma oblicua: internas levantadas (AU1) y juntas (AU4)',
      'Comisuras labiales hacia abajo (AU15)',
      'Mirada caída, párpados levemente caídos',
      'Barbilla arrugada (AU17) en tristeza intensa',
    ],
    commonMistakes: [
      'Confundir AU1+AU4 (tristeza) con solo AU4 (ira/concentración)',
      'No detectar la forma oblicua característica de las cejas',
      'Confundir con desprecio si hay asimetría en AU15',
    ],
    intensity: {
      subtle: 'AU1+AU4 leves, AU15 apenas visible',
      moderate: 'AU1+AU4 claros (cejas oblicuas), AU15 marcado',
      strong: 'AU1+AU4+AU15+AU17, párpados caídos, puede incluir AU6 (ojos brillantes por lágrimas)',
    },
  },
  anger: {
    emotion: 'anger',
    primaryAUs: ['AU4', 'AU5', 'AU7', 'AU23'],
    secondaryAUs: ['AU24', 'AU10'],
    description: 'Ira: Cejas bajadas y juntas (AU4), párpados superiores elevados (AU5) y apretados (AU7), labios apretados (AU23) o boca abierta tensionada. Mirada penetrante y directa.',
    keyIndicators: [
      'Cejas bajadas y fuertemente juntas (AU4) - forma de "V" invertida',
      'Ojos muy abiertos (AU5) con mirada fija e intensa',
      'Párpados tensos (AU7)',
      'Labios apretados (AU23/AU24) o boca abierta tensa (AU25+AU26)',
    ],
    commonMistakes: [
      'Confundir AU4 aislado (concentración) con ira (necesita AU5+AU7)',
      'No detectar la tensión en la zona ocular (AU7)',
      'Confundir con disgusto (que tiene AU9+AU10 en nariz/labio superior)',
    ],
    intensity: {
      subtle: 'AU4 leve, AU7 apenas visible, AU23 sutil',
      moderate: 'AU4+AU5+AU7 claros, AU23 o AU24 marcados',
      strong: 'AU4+AU5+AU7+AU23/AU24 muy intensos, puede incluir AU10 (labio superior levantado), enrojecimiento facial',
    },
  },
  fear: {
    emotion: 'fear',
    primaryAUs: ['AU1', 'AU2', 'AU5', 'AU20', 'AU25'],
    secondaryAUs: ['AU26', 'AU27'],
    description: 'Miedo: Cejas levantadas y juntas (AU1+AU2), párpados superiores muy abiertos (AU5), labios estirados horizontalmente (AU20) y boca abierta (AU25/26). Expresión de "congelación".',
    keyIndicators: [
      'Cejas completamente elevadas (AU1+AU2) con cejas internas juntas',
      'Ojos muy abiertos mostrando blanco superior (AU5)',
      'Labios estirados horizontalmente (AU20)',
      'Boca puede estar abierta (AU25/26/27)',
    ],
    commonMistakes: [
      'Confundir con sorpresa (sorpresa NO tiene AU20, labios relajados)',
      'No detectar el estiramiento horizontal de labios (AU20) - CLAVE',
      'Confundir AU1+AU2 del miedo con AU1+AU4 de tristeza',
    ],
    intensity: {
      subtle: 'AU1+AU2+AU5 leves, AU20 apenas visible',
      moderate: 'AU1+AU2+AU5 claros, AU20+AU25 evidentes',
      strong: 'AU1+AU2+AU5+AU20+AU25/26/27 intensos, blancos de ojos muy visibles, boca muy abierta',
    },
  },
  surprise: {
    emotion: 'surprise',
    primaryAUs: ['AU1', 'AU2', 'AU5', 'AU26'],
    secondaryAUs: ['AU27'],
    description: 'Sorpresa: Cejas muy elevadas y arqueadas (AU1+AU2), ojos muy abiertos (AU5), mandíbula caída (AU26). Es la emoción MÁS BREVE (0.5-1 seg). Labios relajados (vs miedo).',
    keyIndicators: [
      'Cejas muy elevadas creando arrugas horizontales en frente (AU1+AU2)',
      'Ojos muy abiertos, párpados elevados (AU5)',
      'Mandíbula caída, boca abierta (AU26) de forma relajada',
      'LABIOS RELAJADOS - NO estirados (vs. miedo)',
    ],
    commonMistakes: [
      'Confundir con miedo (miedo tiene AU20 - labios estirados)',
      'Asumir que dura mucho (sorpresa es MUY breve, luego pasa a otra emoción)',
      'No distinguir la relajación de boca (sorpresa) vs tensión (miedo)',
    ],
    intensity: {
      subtle: 'AU1+AU2+AU5 leves, AU26 mínimo',
      moderate: 'AU1+AU2+AU5+AU26 claros, arrugas horizontales frente visibles',
      strong: 'AU1+AU2+AU5+AU26/27 máximos, ojos completamente redondos, boca muy abierta',
    },
  },
  disgust: {
    emotion: 'disgust',
    primaryAUs: ['AU9', 'AU10', 'AU17'],
    secondaryAUs: ['AU4', 'AU7'],
    description: 'Asco/Disgusto: Nariz arrugada (AU9), labio superior levantado (AU10), barbilla levantada (AU17). Puede incluir cejas bajadas (AU4). Reacción a algo desagradable.',
    keyIndicators: [
      'Nariz arrugada con arrugas en puente nasal (AU9)',
      'Labio superior levantado (AU10) - puede ser asimétrico',
      'Barbilla levantada y arrugada (AU17)',
      'Puede incluir entrecejo (AU4)',
    ],
    commonMistakes: [
      'Confundir con ira (ira no tiene AU9+AU10 nasal/labial)',
      'No detectar el arrugamiento nasal (AU9) - CRÍTICO',
      'Confundir con desprecio (desprecio es asimétrico y solo un lado)',
    ],
    intensity: {
      subtle: 'AU9 leve, AU10 apenas visible',
      moderate: 'AU9+AU10 claros, AU17 visible',
      strong: 'AU9+AU10+AU17 intensos, puede incluir AU4+AU7, boca puede abrirse (arcada)',
    },
  },
  contempt: {
    emotion: 'contempt',
    primaryAUs: ['R12', 'R14'],
    secondaryAUs: ['AU4'],
    description: 'Desprecio: ÚNICA emoción ASIMÉTRICA. Una comisura labial se eleva o se tensa hacia un lado (R12 o R14). Puede incluir leve ceño (AU4). Señal de superioridad moral.',
    keyIndicators: [
      'ASIMETRÍA - un solo lado de la boca activo',
      'Una comisura labial elevada o tensionada (R12)',
      'Puede incluir hoyuelo asimétrico (R14)',
      'Mirada de lado o leve inclinación de cabeza',
    ],
    commonMistakes: [
      'Confundir con sonrisa asimétrica (sonrisa tiene AU6 bilateral)',
      'No detectar la asimetría (CLAVE para desprecio)',
      'Confundir con disgusto (disgusto es simétrico)',
      'Confundir con tristeza asimétrica',
    ],
    intensity: {
      subtle: 'R12 muy leve, apenas perceptible',
      moderate: 'R12 claro, asimetría evidente',
      strong: 'R12+R14 marcados, puede incluir AU4, cabeza ladeada',
    },
  },
};

/**
 * Obtiene la explicación FACS para una emoción
 */
export function getFACSExplanation(emotion: Emotion, includeDetails = false): string {
  const facs = EMOTION_FACS[emotion];
  
  let explanation = `${facs.primaryAUs.join(' + ')}`;
  
  if (facs.secondaryAUs && facs.secondaryAUs.length > 0) {
    explanation += ` (+ ${facs.secondaryAUs.join(', ')} opcionales)`;
  }
  
  explanation += ' - ' + facs.description;
  
  if (includeDetails) {
    explanation += '\n\nIndicadores clave:\n';
    explanation += facs.keyIndicators.map(i => `• ${i}`).join('\n');
  }
  
  return explanation;
}

/**
 * Obtiene errores comunes para una emoción
 */
export function getCommonMistakes(emotion: Emotion): string[] {
  return EMOTION_FACS[emotion].commonMistakes;
}

/**
 * Obtiene descripción de intensidad
 */
export function getIntensityDescription(emotion: Emotion, level: 'subtle' | 'moderate' | 'strong'): string {
  return EMOTION_FACS[emotion].intensity[level];
}

/**
 * Obtiene información de un Action Unit específico
 */
export function getActionUnitInfo(auCode: string): ActionUnit | undefined {
  return ACTION_UNITS[auCode];
}
