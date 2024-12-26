'use client'
import AppUserHomePage from '@/app/pages/appuser/AppUserHomePage';
import { getHomeCommonData, getHomeUserData, getHtmlData } from '@/services/appusers';
import { useUserLoginStore } from '../../../../globalstate';
import { useEffect, useState } from 'react';
import {HomeCommonData,HomeUserData,HtmlData} from '@/types/appuser'

export default function Page() {
  const { userLoginInfo } = useUserLoginStore();
  const [userToken, setUserToken] = useState<string>();
  const [listHomeCommonData, setListHomeCommonData] = useState<HomeCommonData>();
  const [htmlData, setHtmlData] = useState<HtmlData>();
  const [listHomeUserData, setListHomeUserData] = useState<HomeUserData>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = userLoginInfo?.token;
    setUserToken(token);
  }, [userLoginInfo]);

  useEffect(() => {
    if (userToken) {
      const fetchData = async () => {
        try {
          const homeCommonData = await getHomeCommonData(userToken);
          const html = await getHtmlData(userToken);
          const homeUserData = await getHomeUserData(userToken);
          setListHomeCommonData(homeCommonData);
          setHtmlData(html);
          setListHomeUserData(homeUserData);
        } catch {
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
      <div className=' bg-[#F6F6F6] mt-24 lg:mt-24'>
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
