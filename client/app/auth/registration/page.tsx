import AuthBlock from '@/components/AuthBlock';

export default function Register() {
  return (
    <div className='w-full flex justify-center'>
      <AuthBlock isLogin={false} />
    </div>
  );
}
