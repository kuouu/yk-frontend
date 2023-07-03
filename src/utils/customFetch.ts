export const customFetch = async (
  url: string,
  options: RequestInit = { headers: { 'Content-Type': 'application/json' } }
) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Failed to fetch!');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}