class DataError extends Error {}

export async function get(url) {
  const response = await fetch(url, {
    credentials: "include"
  });
  if(!response.ok) {
    throw new DataError("Failed to fetch");
  }
  const data = await response.json();

  return data;
}

export async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {'content-Type': 'application/json'},
    body: JSON.stringify(data),
    credentials: "include"
  });
  if(!response.ok) {
    const data = await response.json();
    console.log('error', data);
    throw new DataError(data.message);
  }
  return response.json();
}