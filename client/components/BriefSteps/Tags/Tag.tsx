import React from 'react';

type TagProps = {
  children?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Tag({ children, active, onClick, disabled }: TagProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={
        (active ? 'bg-neutral-950 text-white ' : 'bg-neutral-200 text-black ') +
        'w-fit rounded-full px-3 py-1 text-xs font-medium'
      }
    >
      {children}
    </button>
  );
}
