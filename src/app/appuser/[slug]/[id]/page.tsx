'use client'

import { fetchAppUsersById } from '@/services/appusers';
import AppUserMainForm from '@/app/pages/appuser/AppUserMainForm';
import { useUserLoginStore } from '../../../../../globalstate';
import { useEffect, useState } from 'react';

const EditAppUserPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  const { userLoginInfo } = useUserLoginStore();
  const [userToken, setUserToken] = useState<string>();
  const [appUserData, setAppUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Set the user token once it is available
  useEffect(() => {
    const token = userLoginInfo?.token;
    setUserToken(token);
  }, [userLoginInfo]);

  // Fetch data after userToken is set
  useEffect(() => {
    const fetchData = async () => {
      if (userToken && id) {
        try {
          const data = await fetchAppUsersById(id, userToken);
          setAppUserData(data);
        } catch (err) {
          setError("Failed to fetch user data. Please check your token.");
        }
      }
    };

    fetchData();
  }, [userToken, id]); // Trigger fetching when either userToken or id changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!appUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#F6F6F6]">
      <AppUserMainForm appUserData={appUserData} />
    </div>
  );
};

export default EditAppUserPage;
