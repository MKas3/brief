'use client';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

type StoreRootProps = {
  children?: React.ReactNode;
};

export const queryClient = new QueryClient();

export function StoreRoot({ children }: StoreRootProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );
}
