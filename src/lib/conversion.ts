export function searchParamToInt(
  searchParam: string | string[] | undefined,
  defaultValue: number = 0,
) {
  if (Array.isArray(searchParam)) {
    return defaultValue;
  }

  if (searchParam === undefined) {
    return defaultValue;
  }

  const parsed = parseInt(searchParam);

  if (isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
}
