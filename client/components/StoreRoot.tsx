'use client';

import { RecoilRoot } from 'recoil';

type StoreRootProps = {
  children?: React.ReactNode;
};

export function StoreRoot({ children }: StoreRootProps) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
