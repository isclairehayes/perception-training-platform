/**
 * Calculate Brier Score for probability predictions
 * 
 * Brier Score = (1/N) * Σ(predicted_probability - actual_outcome)^2
 * 
 * Score ranges from 0 (perfect) to 1 (worst)
 * 
 * @param predictions Array of {predicted: number (0-1), actual: boolean}
 * @returns Brier Score
 */
export function calculateBrierScore(
  predictions: Array<{ predicted: number; actual: boolean }>
): number {
  if (predictions.length === 0) return 1;

  const sumSquaredErrors = predictions.reduce((sum, pred) => {
    const actualValue = pred.actual ? 1 : 0;
    const error = pred.predicted - actualValue;
    return sum + error * error;
  }, 0);

  return sumSquaredErrors / predictions.length;
}

/**
 * Calculate calibration score
 * 
 * Groups predictions by confidence bins (0-10%, 10-20%, ..., 90-100%)
 * For each bin, compares predicted confidence with actual accuracy
 * 
 * @param predictions Array of {predicted: number (0-1), actual: boolean}
 * @returns Calibration data per bin
 */
export function calculateCalibration(
  predictions: Array<{ predicted: number; actual: boolean }>
): Array<{ bin: string; predicted: number; actual: number; count: number }> {
  const bins = [
    { min: 0, max: 0.1, label: '0-10%' },
    { min: 0.1, max: 0.2, label: '10-20%' },
    { min: 0.2, max: 0.3, label: '20-30%' },
    { min: 0.3, max: 0.4, label: '30-40%' },
    { min: 0.4, max: 0.5, label: '40-50%' },
    { min: 0.5, max: 0.6, label: '50-60%' },
    { min: 0.6, max: 0.7, label: '60-70%' },
    { min: 0.7, max: 0.8, label: '70-80%' },
    { min: 0.8, max: 0.9, label: '80-90%' },
    { min: 0.9, max: 1.0, label: '90-100%' },
  ];

  return bins.map((bin) => {
    const inBin = predictions.filter(
      (p) => p.predicted >= bin.min && p.predicted < bin.max
    );

    if (inBin.length === 0) {
      return {
        bin: bin.label,
        predicted: (bin.min + bin.max) / 2,
        actual: 0,
        count: 0,
      };
    }

    const avgPredicted = inBin.reduce((sum, p) => sum + p.predicted, 0) / inBin.length;
    const actualCorrect = inBin.filter((p) => p.actual).length;
    const actualRate = actualCorrect / inBin.length;

    return {
      bin: bin.label,
      predicted: avgPredicted,
      actual: actualRate,
      count: inBin.length,
    };
  });
}
