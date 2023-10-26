import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  children?: React.ReactNode;
  title?: string;
  type?: string;
  className?: string;
  titleClassName?: string;
  blockClassName?: string;
  inputClassName?: string;
};

export const Input = forwardRef(function Input(
  {
    children,
    title,
    type = 'text',
    className,
    titleClassName,
    blockClassName,
    inputClassName,
    ...otherProps
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className={className}>
      {title && (
        <p
          className={
            titleClassName
              ? `${titleClassName} `
              : 'text-center text-xl font-medium'
          }
        >
          {title}
        </p>
      )}
      <div className={blockClassName ? `${blockClassName} ` : 'mt-6'}>
        <input
          ref={ref}
          type={type}
          className={
            (inputClassName ? `${inputClassName} ` : '') +
            'w-full rounded-xl border-2 border-zinc-300 px-2 py-3 text-black outline-none transition placeholder:text-zinc-600 focus:outline-zinc-800'
          }
          {...otherProps}
        />
        {children}
      </div>
    </div>
  );
});
