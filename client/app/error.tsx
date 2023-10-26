'use client';

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center space-y-4'>
      <p>Something went wrong.</p>
      <p className='text-lg text-red-500'>Error: {error.message}</p>
    </div>
  );
}
