import AppRouter from './routes/AppRouter';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ui/ToastContainer';

const App = () => (
  <ToastProvider>
    <AppRouter />
    <ToastContainer />
  </ToastProvider>
);

export default App;
