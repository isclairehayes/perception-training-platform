/**
 * Calculate memory retention curve
 * 
 * Compares immediate recall vs delayed recall
 */

export interface RetentionData {
  timestamp: string;
  immediate_recall: number; // percentage
  recall_10min: number;
  recall_24h: number;
}

export function calculateRetentionRate(
  itemsShown: number,
  itemsRecalled: number
): number {
  if (itemsShown === 0) return 0;
  return (itemsRecalled / itemsShown) * 100;
}

export function calculateForgetCurve(
  retentionData: RetentionData[]
): { time: string; retention: number }[] {
  // Simplified Ebbinghaus forgetting curve visualization
  return retentionData.flatMap((data) => [
    { time: 'Inmediato', retention: data.immediate_recall },
    { time: '10 min', retention: data.recall_10min },
    { time: '24 hrs', retention: data.recall_24h },
  ]);
}
