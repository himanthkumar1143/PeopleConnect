import axiosInstance from './axiosInstance';

export const submitGrievance = (data) => axiosInstance.post('/api/grievances', data);
export const fetchMyGrievances = () => axiosInstance.get('/api/grievances/my');
export const fetchAllGrievances = () => axiosInstance.get('/api/grievances/all');
export const updateGrievanceStatus = (id, status) =>
  axiosInstance.put(`/api/grievances/${id}/status`, { status });
