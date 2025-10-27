const API_URL = import.meta.env.VITE_SERVER + "/users"

export async function getDBUsers() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function getDBUser(id) {
  const res = await fetch(`${API_URL}?=${id}`);
  return await res.json();
}

export async function addDBUser(user) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return await res.json();
}

export async function removeDBUser(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return res.ok;
}

export async function changeDBUser(user) {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return await res.json();
}

export async function changeDBUserPassword(id, newPassword) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: newPassword })
  });
  return await res.json();
}
