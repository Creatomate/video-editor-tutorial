export function deepClone<T>(value: T): T {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const target: any = Array.isArray(value) ? [] : {};

  for (const key in value) {
    target[key] = deepClone(value[key]);
  }

  return target;
}
