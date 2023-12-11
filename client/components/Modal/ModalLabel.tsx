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
        'flex w-fit gap-x-5 text-3xl font-medium'
      }
    >
      <span className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-black'>
        {labelDigit}
      </span>
      <div
        className={
          (mainClassName ? `${mainClassName} ` : '') +
          'mt-1.5 flex w-full flex-col gap-y-4'
        }
      >
        {title && <span className={titleClassName}>{title}</span>}
        {description && (
          <span className='text-lg font-medium'>{description}</span>
        )}
        {children}
      </div>
    </div>
  );
};
