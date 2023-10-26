export default function AnimatedStripes() {
  return (
    <div className='h-full'>
      <ul className='stripes absolute bottom-0 left-0 top-0 h-full w-full overflow-hidden'>
        {Array.from({ length: 5 }, (_, index) => index).map((el) => (
          <li
            key={el}
            className={
              'absolute block h-[1000px] rotate-45 rounded-full bg-gradient-to-b from-neutral-800 to-black shadow-[0_15px_20px_20px_rgba(0,0,0,1)] ' +
              `animate-animate${el + 1}`
            }
          ></li>
        ))}
        <li className='absolute right-[13%] top-[-30%] block h-[1000px] w-[300px] rotate-45 rounded-full border-[1px] border-neutral-500'></li>
        <li className='absolute right-[49%] top-[40%] block h-[750px] w-[100px] rotate-45 rounded-full border-[1px] border-neutral-500'></li>
      </ul>
    </div>
  );
}
