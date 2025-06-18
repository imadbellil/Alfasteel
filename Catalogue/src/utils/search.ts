export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function searchProducts<T extends { name: string; description: string; details: string; specs: string[] }>(
  products: T[],
  searchTerm: string
): T[] {
  if (!searchTerm.trim()) return products;

  const searchWords = normalizeText(searchTerm)
    .split(/\s+/)
    .filter(Boolean);

  return products.filter(product => {
    const searchableText = normalizeText([
      product.name,
      product.description,
      product.details,
      product.specs.join(' ')
    ].join(' '));

    return searchWords.every(word => searchableText.includes(word));
  });
}