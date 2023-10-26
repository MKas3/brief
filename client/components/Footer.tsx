import Image from 'next/image';
import { BiLogoVisa } from 'react-icons/bi';

export default function Footer() {
  return (
    <footer
      id='contacts'
      className='relative z-30 w-full bg-neutral-900 px-44 py-4'
    >
      <div className='flex items-center justify-between text-xl font-semibold'>
        <span className='text-sm font-normal'>© BriefMe Company</span>
        <div className='flex items-center'>
          <Image src='/logo.svg' alt='Logo' width={90} height={50} />
          BriefMe
        </div>
        <div className='flex items-center gap-x-5'>
          <BiLogoVisa size={70} />
          <Image
            src='/master-card.svg'
            alt='Master Card'
            width={60}
            height={60}
          />
        </div>
      </div>
    </footer>
  );
}
