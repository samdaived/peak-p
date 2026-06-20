import { Navigate } from 'react-router-dom';
import { getCurrentBuyer } from '@/lib/buyerAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentBuyer();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
