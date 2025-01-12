"use server"

export const getTodos = async (token: string) => {
  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await fetch('http://localhost:3003/todo', {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Disable caching
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch todos: ${response.status}`);
    }

    const data = await response.json();
    console.log('Todos fetched successfully:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error in getTodos:', error);
    throw error;
  }
};