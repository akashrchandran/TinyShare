import { DialogUploader } from '@/components/DialogUploader';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export default function DashboardPage() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='h-screen grid place-items-center'>
      <DialogUploader /> 
    </div>
  );
}