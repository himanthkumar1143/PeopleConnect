import axiosInstance from './axiosInstance';

export const fetchTips = () => axiosInstance.get('/api/agriculture');
export const fetchTipById = (id) => axiosInstance.get(`/api/agriculture/${id}`);
export const createTip = (data) => axiosInstance.post('/api/agriculture', data);
export const updateTip = (id, data) => axiosInstance.put(`/api/agriculture/${id}`, data);
export const deleteTip = (id) => axiosInstance.delete(`/api/agriculture/${id}`);
