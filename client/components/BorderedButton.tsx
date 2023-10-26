import React from 'react';

type BorderedButtonProps = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  hasBorder?: boolean;
  hasBlur?: boolean;
  isRounded?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function BorderedButton({
  children,
  type,
  className,
  hasBorder = true,
  hasBlur = true,
  isRounded,
  onClick,
}: BorderedButtonProps) {
  return (
    <div
      className={
        (className ? `${className} ` : '') +
        (hasBorder
          ? 'animate-move-bg bg-gradient-to-r from-rose-600 via-fuchsia-700 to-indigo-700 bg-200% hover:from-rose-500 hover:via-fuchsia-600 hover:to-indigo-600 '
          : '') +
        (isRounded ? 'rounded-lg before:rounded-lg ' : '') +
        (hasBlur ? 'before:blur-[7.5px] before:filter ' : '') +
        'relative flex items-center before:absolute before:inset-0 before:animate-move-bg before:bg-gradient-to-r before:from-rose-600 before:via-fuchsia-700 before:to-indigo-700 before:bg-200% before:hover:from-rose-500 before:hover:via-fuchsia-600 before:hover:to-indigo-600'
      }
    >
      <button
        type={type}
        className='z-10 h-full w-full p-0.5'
        onClick={onClick}
      >
        <div
          className={
            (isRounded ? 'rounded ' : '') +
            'bg-zinc-950 px-4 py-1 text-lg text-white'
          }
        >
          {children}
        </div>
      </button>
    </div>
  );
}
