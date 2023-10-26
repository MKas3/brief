import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';

type PaginateButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive: boolean;
  children?: React.ReactNode;
  className?: string;
  inactiveClassName?: string;
  activeClassName?: string;
};

export const PaginateButton = forwardRef(function PaginateButton(
  {
    isActive,
    children,
    className,
    inactiveClassName,
    activeClassName,
    ...otherProps
  }: PaginateButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      className={
        (className ? `${className} ` : '') +
        (isActive
          ? activeClassName
            ? `${activeClassName} `
            : ''
          : inactiveClassName
          ? `${inactiveClassName} `
          : '') +
        'flex max-h-[2.25rem] min-h-[2.25rem] min-w-[2.25rem] max-w-[2.25rem] select-none items-center justify-center rounded-full text-lg font-bold'
      }
      {...otherProps}
    >
      {children}
    </button>
  );
});
