function toKebabCase(str) {
  // Handle plural nouns by preserving the 's' at the end
  const isPlural = str.endsWith('s') || str.endsWith('S');
  const baseStr = isPlural ? str.slice(0, -1) : str;
  const kebab = baseStr.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  return isPlural ? `${kebab}s` : kebab;
}

const entities = [
  'people',
  'outfalls',
  'waterAuthorities',
  'indigenousCommunities',
  'politicians',
  'supportTickets',
  'observations',
  'customers',
  'facilities',
  'outfallTypes'
];

console.log('Testing URL generation for all entities:');
entities.forEach(entity => {
  const exampleId = '123e4567-e89b-12d3-a456-426614174000';
  const url = `/${toKebabCase(entity)}/${exampleId}`;
  console.log(`${entity.padEnd(20)} => ${url}`);
});
