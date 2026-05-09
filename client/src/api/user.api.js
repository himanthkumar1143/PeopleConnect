import axiosInstance from './axiosInstance';

export const getAllUsers = () => axiosInstance.get('/api/users');
