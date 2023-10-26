import ProfileBlock from '@/components/Profile/ProfileBlock';

export default function Profile() {
  return (
    <div className='relative min-h-screen bg-white text-black'>
      <div className='absolute inset-0 mt-12 '>
        <ProfileBlock />
      </div>
    </div>
  );
}
