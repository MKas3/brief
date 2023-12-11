import Image from 'next/image';
import { BiLogoVisa } from 'react-icons/bi';

export default function Footer() {
  return (
    <footer
      id='contacts'
      className='relative z-30 w-full bg-neutral-900 px-[10%] py-0.5'
    >
      <div className='flex items-center justify-between py-2 text-xl sm:text-sm font-semibold'>
        <span className='text-sm sm:text-[0.625rem] sm:leading-3 font-normal'>© BriefMe Company</span>
        <div className='flex items-center gap-x-2'>
          <Image className='flex' src='/logo.svg' alt='Logo' width={54} height={30} />
          BriefMe
        </div>
        <div className='flex items-center sm:scale-75 gap-x-5 sm:translate-x-[20%]'>
          <BiLogoVisa size={50} />
          <Image
            src='/master-card.svg'
            alt='Master Card'
            width={50}
            height={50}
          />
        </div>
      </div>
    </footer>
  );
}
