import { ImSpinner2 } from 'react-icons/im';

export default function Loading() {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center space-y-4'>
      <span className='text-2xl'>Загрузка...</span>
      <ImSpinner2 className='animate-spin' size={100} />
    </div>
  );
}
