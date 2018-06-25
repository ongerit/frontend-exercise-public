export default function requestApi(url, query, numOfResults) {
  if (!query) {
    return [];
  }

  const apiUrl = `${url}?q=${query}&per_page=${numOfResults}`;
  return fetch(apiUrl)
    .then(data => data.json())
    .then(json => json)
    .catch(err => console.error('API Request error:', err));
}
