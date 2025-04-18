export function searchParamToInt(
  searchParam: string | string[] | undefined,
  defaultValue?: number,
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

export function searchParamToString(
  searchParam: string | string[] | undefined,
  defaultValue?: string,
) {
  if (Array.isArray(searchParam)) {
    return defaultValue;
  }

  if (searchParam === undefined) {
    return defaultValue;
  }

  return searchParam;
}
