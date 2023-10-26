'use client';

import { useRecoilState } from 'recoil';
import { userState } from '@/store/user.recoil';
import React, { useEffect, useState } from 'react';
import AuthService from '@/services/auth.service';
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';
import { LOGIN_ROUTE } from '@/utils/consts';

type AuthCheckerProps = {
  children?: React.ReactNode;
  redirectOnNotAuth?: boolean;
};

export default function AuthContext({
  children,
  redirectOnNotAuth,
}: AuthCheckerProps) {
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const setUserData = async () => {
      const userData = await AuthService.auth();
      if (userData) setUser(userData);
      else if (redirectOnNotAuth) router.push(LOGIN_ROUTE);
    };
    setUserData()
      .catch((e) => redirectOnNotAuth && router.push(LOGIN_ROUTE))
      .finally(() => setIsLoading(false));
  }, [redirectOnNotAuth, router, setUser, setIsLoading]);

  if (isLoading) return <Loading />;

  return <>{children}</>;
}
