const API_URL = 'http://localhost:3000/books';

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
