export const BASE_URL = 'http://127.0.0.1:8000/api';

export const config = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
}
