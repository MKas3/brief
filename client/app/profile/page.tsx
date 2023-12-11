import ProfileMain from '@/components/Profile/ProfileMain';
import ProfileContext from '@/components/Profile/ProfileContext';
import AuthContext from '@/components/AuthContext';

export default function Profile() {
  return (
    <AuthContext redirectOnNotAuth>
      <ProfileContext>
        <div className='h-fit min-h-screen bg-white py-9 text-black'>
          <ProfileMain />
        </div>
      </ProfileContext>
    </AuthContext>
  );
}
