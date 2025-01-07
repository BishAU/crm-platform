export function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const camelCase = (str: string): string => {
  return str.replace(/([A-Z])/g, (g) => g[1].toUpperCase())
    .replace(/^./, (str) => str.toLowerCase());
};

export { camelCase };