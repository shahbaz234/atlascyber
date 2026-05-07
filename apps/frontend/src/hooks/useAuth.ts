import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  return {
    isAuthenticated: !!auth.accessToken,
    user: auth.user,
    role: auth.user?.role,
    tenant: auth.tenant,
  };
};
