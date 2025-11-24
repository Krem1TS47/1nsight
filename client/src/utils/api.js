const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Authenticated fetch wrapper
export const authenticatedFetch = async (url, options = {}) => {
    const headers = getAuthHeaders();
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });

    if (response.status === 401 || response.status === 403) {
        // Token expired or invalid, clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }

    return response;
};

export default {
    API_BASE_URL,
    getAuthHeaders,
    authenticatedFetch
};


