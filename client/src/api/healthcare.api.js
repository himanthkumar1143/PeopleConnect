import axiosInstance from './axiosInstance';

export const fetchHealthInfo = () => axiosInstance.get('/api/healthcare');
export const fetchHealthInfoById = (id) => axiosInstance.get(`/api/healthcare/${id}`);
export const createHealthInfo = (data) => axiosInstance.post('/api/healthcare', data);
export const updateHealthInfo = (id, data) => axiosInstance.put(`/api/healthcare/${id}`, data);
export const deleteHealthInfo = (id) => axiosInstance.delete(`/api/healthcare/${id}`);
