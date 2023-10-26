import { HTMLAttributes } from 'react';

type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
  blockClassName?: string;
};

export default function Separator({
  children,
  className,
  blockClassName,
  ...otherProps
}: SeparatorProps) {
  return (
    <div
      className={(className ? `${className} ` : '') + 'flex h-fit w-full'}
      {...otherProps}
    >
      <span className='relative w-full'>
        <span className='absolute top-1/2 w-full border-b border-white' />
      </span>
      <div
        className={
          (blockClassName ? `${blockClassName} ` : '') +
          'mx-6 w-fit whitespace-nowrap text-center'
        }
      >
        {children}
      </div>
      <span className='relative w-full'>
        <span className='absolute top-1/2 w-full border-b border-white' />
      </span>
    </div>
  );
}
