import React, { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  className?: string;
  isAlt?: boolean;
};

export const Button = forwardRef(function Button(
  { children, className, isAlt, ...otherProps }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className={
        (className ? `${className} ` : '') +
        (isAlt
          ? 'flex w-fit flex-row items-center gap-x-2 rounded-xl bg-neutral-900 px-6 hover:bg-neutral-950 disabled:bg-neutral-700 disabled:hover:bg-neutral-700 '
          : 'rounded-full bg-gradient-to-b from-red-600 to-rose-500 px-8 text-xl font-semibold shadow-lg shadow-red-600/50 hover:from-red-700 hover:to-rose-600 ') +
        'py-4 text-white transition sm:rounded-3xl sm:py-3'
      }
      {...otherProps}
    >
      {children}
    </button>
  );
});
