export function scaleParts(parts: number[], target: number): number[] {
  const source = parts.reduce((sum, part) => sum + part, 0);
  if (target <= 0 || source <= 0) return parts.map(() => 0);
  const raw = parts.map((part) => (part / source) * target);
  const base = raw.map((value) => Math.floor(value));
  let leftover = target - base.reduce((sum, value) => sum + value, 0);
  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction || b.index - a.index);
  const result = [...base];
  let cursor = 0;
  while (leftover > 0 && order.length > 0) {
    const pick = order[cursor % order.length];
    if (!pick) break;
    result[pick.index] = (result[pick.index] ?? 0) + 1;
    leftover -= 1;
    cursor += 1;
  }
  return result;
}

export function scaleMoney(amount: number, targetUnits: number, sourceUnits = 500): number {
  return Math.round((amount * targetUnits) / sourceUnits);
}
