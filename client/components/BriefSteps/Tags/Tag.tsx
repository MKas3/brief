import React from 'react';

type TagProps = {
  children?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Tag({ children, isActive, onClick }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={
        (isActive
          ? 'bg-neutral-950 text-white '
          : 'bg-neutral-200 text-black ') +
        'w-fit rounded-full px-3 py-1 text-xs font-medium'
      }
    >
      {children}
    </button>
  );
}
