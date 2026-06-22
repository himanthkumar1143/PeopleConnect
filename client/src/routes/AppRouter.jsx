import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

// Public pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import NotFoundPage from '../pages/NotFoundPage';

// Member pages
import DashboardPage from '../pages/member/DashboardPage';
import JobsPage from '../pages/member/JobsPage';
import JobDetailPage from '../pages/member/JobDetailPage';
import ResourcePage from '../pages/member/ResourcePage';
import ResourceDetailPage from '../pages/member/ResourceDetailPage';
import HealthcarePage from '../pages/member/HealthcarePage';
import HealthcareDetailPage from '../pages/member/HealthcareDetailPage';
import EducationPage from '../pages/member/EducationPage';
import EducationDetailPage from '../pages/member/EducationDetailPage';
import GrievancePage from '../pages/member/GrievancePage';
import ProfilePage from '../pages/member/ProfilePage';

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import UsersPage from '../pages/admin/UsersPage';
import GrievanceManagement from '../pages/admin/GrievanceManagement';
import ModuleManagerPage from '../pages/admin/ModuleManagerPage';

// Redirect logged-in users away from auth pages
const PublicOnlyRoute = ({ children }) => {
  const { token, isLoading } = useAuth();
  if (isLoading) return null;
  return token ? <Navigate to="/dashboard" replace /> : children;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
      <Route path="/admin-login" element={<PublicOnlyRoute><AdminLoginPage /></PublicOnlyRoute>} />

      {/* Protected — Member */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
      <Route path="/jobs/:id" element={<ProtectedRoute><JobDetailPage /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><ResourcePage /></ProtectedRoute>} />
      <Route path="/resources/:id" element={<ProtectedRoute><ResourceDetailPage /></ProtectedRoute>} />
      <Route path="/healthcare" element={<ProtectedRoute><HealthcarePage /></ProtectedRoute>} />
      <Route path="/healthcare/:id" element={<ProtectedRoute><HealthcareDetailPage /></ProtectedRoute>} />
      <Route path="/education" element={<ProtectedRoute><EducationPage /></ProtectedRoute>} />
      <Route path="/education/:id" element={<ProtectedRoute><EducationDetailPage /></ProtectedRoute>} />
      <Route path="/grievance" element={<ProtectedRoute><GrievancePage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* Protected — Admin only */}
      <Route path="/admin" element={
        <ProtectedRoute><RoleRoute role="admin"><AdminDashboard /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute><RoleRoute role="admin"><UsersPage /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/grievances" element={
        <ProtectedRoute><RoleRoute role="admin"><GrievanceManagement /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/jobs" element={
        <ProtectedRoute><RoleRoute role="admin"><ModuleManagerPage /></RoleRoute></ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
