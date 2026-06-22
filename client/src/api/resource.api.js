import axiosInstance from './axiosInstance';

export const fetchTips = () => axiosInstance.get('/api/resources');
export const fetchTipById = (id) => axiosInstance.get(`/api/resources/${id}`);
export const createTip = (data) => axiosInstance.post('/api/resources', data);
export const updateTip = (id, data) => axiosInstance.put(`/api/resources/${id}`, data);
export const deleteTip = (id) => axiosInstance.delete(`/api/resources/${id}`);
