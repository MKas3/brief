import React from 'react';

export type ModalLabelProps = {
  labelDigit?: string;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  mainClassName?: string;
  children?: React.ReactNode;
};

export const ModalLabel = ({
  labelDigit,
  title,
  description,
  className,
  titleClassName,
  mainClassName,
  children,
}: ModalLabelProps) => {
  return (
    <div
      className={
        (className ? `${className} ` : '') +
        'flex w-fit gap-x-5 sm:gap-x-3 text-3xl md:text-lg font-medium md:font-semibold'
      }
    >
      <span className='flex h-12 w-12 md:h-10 md:w-10 sm:w-8 sm:h-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-black'>
        {labelDigit}
      </span>
      <div
        className={
          (mainClassName ? `${mainClassName} ` : '') +
          'mt-1.5 flex w-full flex-col gap-y-4 sm:mt-0.5'
        }
      >
        {title && <span className={titleClassName}>{title}</span>}
        {description && (
          <span className='text-lg font-medium md:text-base'>{description}</span>
        )}
        {children}
      </div>
    </div>
  );
};
