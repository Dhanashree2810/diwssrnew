'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { globalStore, LoginStore } from '../../globalstate';
import { getUserInfo } from '@/services/login';

export default function Home() {
  const { email, password } = LoginStore();
  const {setUserId} = globalStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(email, password);
        let appuserId;
        if (Array.isArray(data) && data.length > 0) {
          appuserId = data[0]?.id;
          setUserId(appuserId);
        } else {
          console.log("No user data found.");
        }

      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, [email, password,setUserId]);

  return (
    <>
      {
        redirect('/product')
      }
    </>
  )
}
