'use client'

import AppUsersViewPage from '@/app/pages/appuser/AppUsersViewPage'
import { fetchAppUsersById } from '@/services/appusers';
import { useUserLoginStore } from '../../../../../globalstate';
import { useEffect, useState } from 'react';
import Layout from '@/app/layout';

export default function Page({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params;
  const { userLoginInfo } = useUserLoginStore();
  const [userToken, setUserToken] = useState<string>();
  const [appUserData, setAppUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = userLoginInfo?.token;
    setUserToken(token);
  }, [userLoginInfo]);

  useEffect(() => {
    if (userToken) {
      const fetchData = async () => {
        try {
          const data = await fetchAppUsersById(id, userToken);
          setAppUserData(data);
        } catch (err) {
          setError("Failed to fetch user data. Please check your token.");
        }
      };

      fetchData();
    }
  }, [userToken, id]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {appUserData ? (
        <AppUsersViewPage appUserData={appUserData} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
