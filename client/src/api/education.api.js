import axiosInstance from './axiosInstance';

export const fetchResources = () => axiosInstance.get('/api/education');
export const fetchResourceById = (id) => axiosInstance.get(`/api/education/${id}`);
export const createResource = (data) => axiosInstance.post('/api/education', data);
export const updateResource = (id, data) => axiosInstance.put(`/api/education/${id}`, data);
export const deleteResource = (id) => axiosInstance.delete(`/api/education/${id}`);
