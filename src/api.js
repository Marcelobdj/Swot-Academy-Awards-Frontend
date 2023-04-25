import axios from 'axios';

const api = axios.create({
    baseURL: 'http://206.189.200.26:7000/api',
});

// Categories API functions
export const fetchCategories = () => api.get('/categories', { params: { includeCharacters: true } });
export const createCategory = (category) => api.post('/categories', category);
export const updateCategory = (id, updatedCategory) => api.put(`/categories/${id}`, updatedCategory);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
export const setCurrentVotingCategory = (id) => api.put(`/categories/setCurrent/${id}`);
export const fetchVotingResults = (id) => api.get(`/categories/${id}/results`);
export const fetchUsers = () => api.get('/users');

export default api;