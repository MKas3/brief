export default function Loading() {
  return (
    <div className='flex h-screen max-h-full flex-col items-center justify-center space-y-4'>
      <div className='relative aspect-square w-[6.6%] overflow-hidden rounded-full'>
        <span className='animate-loading-x delay-300ms absolute -left-[50%] top-[40%] aspect-square w-[185%]'>
          <span className='animate-loading-rotate absolute inset-0 rounded-[35%] bg-[#CD0001]'></span>
        </span>
        <span className='animate-loading-x delay-150ms absolute -left-[55%] top-[60%] aspect-square w-[185%]'>
          <span className='animate-loading-rotate -delay-300ms absolute inset-0 rounded-[40%] bg-[#990117]'></span>
        </span>
        <span className='animate-loading-x absolute -left-[35%] top-[80%] aspect-square w-[185%]'>
          <span className='animate-loading-rotate -delay-900ms absolute inset-0 rounded-[45%] bg-[#6E0118]'></span>
        </span>
      </div>
    </div>
  );
}
