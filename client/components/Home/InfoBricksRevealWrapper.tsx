'use client';

import { RevealWrapper } from 'next-reveal';

type InfoBricksRevealWrapper = {
  children: React.ReactNode;
};

export default function InfoBricksRevealWrapper({
  children,
}: InfoBricksRevealWrapper) {
  return (
    <RevealWrapper opacity={100} scale={0.95} distance='0'>
      {children}
    </RevealWrapper>
  );
}
