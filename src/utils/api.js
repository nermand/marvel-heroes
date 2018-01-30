const apiUrl = 'https://gateway.marvel.com';
const id = '7f8d60cb47d5550dceace155296625e4';
const params = "?apikey=" + id;

export function createSearchUrl(search, offset = 0) {
  const searchParams = search ? `&nameStartsWith=${search}` : '';
  return `${apiUrl}/v1/public/characters${params}&offset=${offset}${searchParams}`;
}
