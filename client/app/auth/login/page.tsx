import AuthBlock from '@/components/AuthBlock';

export default function Login() {
  return (
    <div className='w-full flex justify-center'>
      <AuthBlock isLogin={true} />
    </div>
  );
}
