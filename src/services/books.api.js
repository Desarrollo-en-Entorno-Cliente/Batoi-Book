const API_URL = import.meta.env.VITE_SERVER + "/books"

export async function getDBBooks() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function getDBBook(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

export async function addDBBook(book) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  return await res.json();
}

export async function removeDBBook(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return res.ok;
}

export async function changeDBBook(book) {
  const res = await fetch(`${API_URL}/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  return await res.json();
}

export async function existsDBBook(userId, moduleCode) {
  const res = await fetch(`${API_URL}?userId=${userId}&moduleCode=${moduleCode}`);
  const data = await res.json();
  return Array.isArray(data) && data.length > 0;
}
