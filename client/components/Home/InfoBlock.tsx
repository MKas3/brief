import Image from 'next/image';
import MainRevealWrapper from '@/components/MainRevealWrapper';

type InfoBlockProps = {
  title: string;
  description: React.ReactNode;
  imagePath: string;
  className?: string;
};

export default function InfoBlock({
  title,
  description,
  imagePath,
  className,
}: InfoBlockProps) {
  return (
    <MainRevealWrapper>
      <div
        className={
          (className ? `${className} ` : '') +
          'relative flex h-screen overflow-visible px-48 text-black'
        }
      >
        <div className='flex max-w-[40vw] flex-col justify-center'>
          <h1 className='mb-7 text-6xl font-bold leading-tight'>{title}</h1>
          <div className='space-y-8 indent-4 text-xl leading-relaxed'>
            {description}
          </div>
        </div>
        <Image
          className='absolute bottom-0 right-0 top-0 self-center'
          src={imagePath}
          width={700}
          height={700}
          alt='Info Image'
        />
      </div>
    </MainRevealWrapper>
  );
}
