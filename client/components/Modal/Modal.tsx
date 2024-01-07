import { ModalBase, ModalBaseProps } from '@/components/Modal/ModalBase';
import React from 'react';

type ModalProps = ModalBaseProps & {
  className?: string;
  titleText?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
};

export const Modal = ({
  className,
  titleText,
  title,
  children,
  ...otherProps
}: ModalProps) => {
  return (
    <ModalBase {...otherProps}>
      <div className={(className ? `${className} ` : '') + 'flex flex-col sm:px-4 px-10 w-full'}>
        {title ? (
          title
        ) : titleText ? (
          <h1 className='mb-6 text-5xl font-bold md:text-3xl sm:text-2xl'>{titleText}</h1>
        ) : null}
        {children}
      </div>
    </ModalBase>
  );
};
