'use client'
import { fetchAppUsers } from "@/services/appusers";
import TeamBanner from "@/app/pages/homes/TeamBanner";
import AppUserList from "@/app/pages/appuser/AppUserList";
import { useUserLoginStore } from "../../../globalstate";
import { useEffect, useState } from "react";

export default function Page() {
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
          const data = await fetchAppUsers(userToken);
          console.log("fetchAppUsers data",data);
          
          setAppUserData(data);
        } catch (err) {
          setError("Failed to fetch app user data. Please check your token.");
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
      <TeamBanner />
      {appUserData ? <AppUserList appUserData={appUserData} /> : <div>Loading...</div>}
    </div>
  );
}
