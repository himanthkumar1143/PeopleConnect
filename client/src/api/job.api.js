import axiosInstance from './axiosInstance';

export const fetchJobs = (params) => axiosInstance.get('/api/jobs', { params });
export const fetchJobById = (id) => axiosInstance.get(`/api/jobs/${id}`);
export const createJob = (data) => axiosInstance.post('/api/jobs', data);
export const updateJob = (id, data) => axiosInstance.put(`/api/jobs/${id}`, data);
export const deleteJob = (id) => axiosInstance.delete(`/api/jobs/${id}`);
