import AuthContext from '@/components/AuthContext';

export default function BriefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext redirectOnNotAuth>
      <div className='min-h-screen overflow-hidden bg-white pt-16 text-black'>
        {children}
      </div>
    </AuthContext>
  );
}
