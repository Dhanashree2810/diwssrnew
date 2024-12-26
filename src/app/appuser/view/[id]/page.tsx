'use client'
import AppUsersViewPage from '@/app/pages/appuser/AppUsersViewPage'
import { fetchAppUsersById } from '@/services/appusers';
import { useUserLoginStore } from '../../../../../globalstate';
import { use, useEffect, useState } from 'react';
import { User } from '@/types/appuser';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
   const { id } = use(params);
  const { userLoginInfo } = useUserLoginStore();
  const [userToken, setUserToken] = useState<string>();
  const [appUserData, setAppUserData] = useState<User>();
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
        } catch {
          setError("Failed to fetch home data. Please check your token.");
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
