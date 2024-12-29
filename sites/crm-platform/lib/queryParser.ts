export function parseQueryString(queryString: string) {
  const params = new URLSearchParams(queryString);
  const result: { [key: string]: string | string[] } = {};

  for (const [key, value] of params.entries()) {
    if (key.endsWith('[]')) {
      const arrayKey = key.slice(0, -2);
      if (!result[arrayKey]) {
        result[arrayKey] = [];
      }
      (result[arrayKey] as string[]).push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function buildQueryString(params: { [key: string]: string | string[] }) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(`${key}[]`, v));
    } else {
      searchParams.append(key, value);
    }
  }

  return searchParams.toString();
}
