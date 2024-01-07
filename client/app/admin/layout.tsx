'use client';

import { useRecoilState } from 'recoil';
import { userState } from '@/store/user.recoil';
import { Role } from "@/types/role.types";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useRecoilState(userState);

  if (user?.role !== Role.ADMIN) throw new Error();

  return <>{children}</>;
}
