const API_URL = 'http://localhost:3000/modules';

export async function getDBModules() {
  const res = await fetch(API_URL);
  return await res.json();
}
