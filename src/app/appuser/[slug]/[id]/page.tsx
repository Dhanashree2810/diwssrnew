'use client';
import { fetchAppUsersById } from '@/services/appusers';
import AppUserMainForm from '@/app/pages/appuser/AppUserMainForm';
import { useUserLoginStore } from '../../../../../globalstate';
import { useEffect, useState } from 'react';
import { User } from '@/types/appuser';
import { use } from 'react';

const EditAppUserPage = ({ params }: { params: Promise<{ id: string }> }) => {
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
    const fetchData = async () => {
      if (userToken && id) {
        try {
          const data = await fetchAppUsersById(id, userToken);
          setAppUserData(data);
        } catch {
          setError('Failed to fetch user data. Please check your token.');
        }
      }
    };

    fetchData();
  }, [userToken, id]);

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
