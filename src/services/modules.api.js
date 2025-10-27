const API_URL = import.meta.env.VITE_SERVER + "/modules"

export async function getDBModules() {
  const res = await fetch(API_URL);
  return await res.json();
}
