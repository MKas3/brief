'use client';

import { RevealWrapper } from 'next-reveal';

type MainRevealWrapperProps = (typeof RevealWrapper)['defaultProps'] & {
  children: React.ReactNode;
};

export default function MainRevealWrapper({
  children,
  reset = true,
  duration = 1000,
  ...otherProps
}: MainRevealWrapperProps) {
  return (
    <RevealWrapper reset={reset} duration={duration} {...otherProps}>
      {children}
    </RevealWrapper>
  );
}
