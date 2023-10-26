import Link from 'next/link';
import React from 'react';

type HeaderLinkProps = {
  children?: React.ReactNode;
  href: string;
  className?: string;
  isSectionLink?: boolean;
};

export function HeaderLink({
  children,
  href,
  className,
  isSectionLink,
}: HeaderLinkProps) {
  const handleSectionHref = (href: string) => {
    document.getElementById(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {isSectionLink ? (
        <button
          className={
            className
              ? `${className}`
              : '' + 'text-sm text-white transition hover:text-zinc-300'
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
              : '' + 'text-sm text-white transition hover:text-zinc-300'
          }
          href={href}
        >
          {children}
        </Link>
      )}
    </>
  );
}
