export const api = {
  get: async (endpoint) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  }
}