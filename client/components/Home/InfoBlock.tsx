import Image from 'next/image';
import MainRevealWrapper from '@/components/MainRevealWrapper';

type InfoBlockProps = {
  title: string;
  description: React.ReactNode;
  imagePath: string;
  className?: string;
  last?: boolean;
};

export default function InfoBlock({
  title,
  description,
  imagePath,
  className,
  last
}: InfoBlockProps) {
  return (
    <MainRevealWrapper>
      <div
        className={
          (className ? `${className} ` : '') +
          'relative flex h-full py-32 overflow-visible sm:mt-[-7.5rem] px-[10vw] text-black'
        }
      >
        <div className='flex max-w-[40vw] flex-col justify-center'>
          <h1 className='mb-7 text-6xl font-bold leading-tight sm:text-3xl'>{title}</h1>
          <div className='space-y-8 indent-4 text-xl leading-relaxed sm:text-sm md:text-lg'>
            {description}
          </div>
        </div>
        <Image
          className={'absolute bottom-0 right-0 top-0 self-center my-auto lg:-right-[30%]' + (last ? ' sm:translate-x-[20%] sm:-scale-x-100 sm:-rotate-12'  : '')}
          src={imagePath}
          width={700}
          height={700}
          alt='Info Image'
        />
      </div>
    </MainRevealWrapper>
  );
}
