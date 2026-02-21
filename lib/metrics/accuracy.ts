/**
 * Calculate accuracy and false positive metrics
 */

export function calculateAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return (correct / total) * 100;
}

export function calculateFalsePositiveRate(
  falsePositives: number,
  total: number
): number {
  if (total === 0) return 0;
  return (falsePositives / total) * 100;
}

/**
 * Calculate per-emotion accuracy for microexpressions
 */
export interface EmotionAccuracy {
  emotion: string;
  accuracy: number;
  total_attempts: number;
  correct_attempts: number;
  avg_response_time_ms: number;
}

export function calculateEmotionMetrics(
  results: Array<{
    emotion: string;
    correct: boolean;
    response_time_ms: number;
  }>
): EmotionAccuracy[] {
  const emotions = ['happiness', 'sadness', 'anger', 'fear', 'surprise', 'disgust', 'contempt'];

  return emotions.map((emotion) => {
    const emotionResults = results.filter((r) => r.emotion === emotion);
    const correct = emotionResults.filter((r) => r.correct).length;
    const total = emotionResults.length;
    const avgTime =
      total > 0
        ? emotionResults.reduce((sum, r) => sum + r.response_time_ms, 0) / total
        : 0;

    return {
      emotion,
      accuracy: total > 0 ? (correct / total) * 100 : 0,
      total_attempts: total,
      correct_attempts: correct,
      avg_response_time_ms: Math.round(avgTime),
    };
  });
}
