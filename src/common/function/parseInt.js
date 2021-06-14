export function roughScale(x, base) {
  const parsed = parseFloat(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed * 100;
}
