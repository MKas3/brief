import Link from 'next/link';
import React from 'react';

type HeaderLinkProps = {
  children?: React.ReactNode;
  href: string;
  className?: string;
  isSectionLink?: boolean;
  onClick?: () => void;
};

export function HeaderLink({
  children,
  href,
  className,
  isSectionLink,
  onClick,
}: HeaderLinkProps) {
  const handleSectionHref = (href: string) => {
    if (onClick) onClick();
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {isSectionLink ? (
        <button
          className={
            className
              ? `${className}`
              : '' +
                'whitespace-nowrap text-sm text-white transition hover:text-zinc-300'
          }
          onClick={() => handleSectionHref(href)}
        >
          {children}
        </button>
      ) : (
        <Link
          className={
            className
              ? `${className}`
              : '' +
                'whitespace-nowrap text-sm text-white transition hover:text-zinc-300'
          }
          href={href}
          onClick={onClick}
        >
          {children}
        </Link>
      )}
    </>
  );
}
