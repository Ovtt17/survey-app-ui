const BASE_URL = `${import.meta.env.VITE_API_URL}/auth/authenticate`;

export const login = async (email: string, password: string) => {
  const data = { email, password };

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('token', result.token);
      return result;
    } else {
      throw new Error('Login failed: ' + response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};