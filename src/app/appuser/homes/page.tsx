'use client'

import AppUserHomePage from '@/app/pages/appuser/AppUserHomePage';
import { getHomeCommonData, getHomeUserData, getHtmlData } from '@/services/appusers';
import { useUserLoginStore } from '../../../../globalstate';
import { useEffect, useState } from 'react';

export default function Page() {
  const { userLoginInfo } = useUserLoginStore();
  const [userToken, setUserToken] = useState<string>();
  const [listHomeCommonData, setListHomeCommonData] = useState<any>(null);
  const [htmlData, setHtmlData] = useState<any>(null);
  const [listHomeUserData, setListHomeUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = userLoginInfo?.token;
    console.log("token",token);
    
    setUserToken(token);
  }, [userLoginInfo]);

  useEffect(() => {
    if (userToken) {
      const fetchData = async () => {
        try {
          const homeCommonData = await getHomeCommonData(userToken);
          console.log("homeCommonData",homeCommonData);
          
          const html = await getHtmlData(userToken);
          const homeUserData = await getHomeUserData(userToken);

          setListHomeCommonData(homeCommonData);
          setHtmlData(html);
          setListHomeUserData(homeUserData);
        } catch (err) {
          setError("Failed to fetch home data. Please check your token.");
        }
      };

      fetchData();
    }
  }, [userToken]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className=' bg-[#F6F6F6] mt-24 lg:mt-28'>
        {listHomeCommonData && htmlData && listHomeUserData ? (
          <AppUserHomePage
            listHomeCommonData={listHomeCommonData}
            htmlData={htmlData}
            listHomeUserData={listHomeUserData}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
