'use client';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import "primeflex/primeflex.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import prodil from '@/assets/images/prodil.jpg';
import { DataView } from 'primereact/dataview';
import { BiEditAlt } from "react-icons/bi";
import { LuEye } from "react-icons/lu";
import Link from 'next/link';


interface AppUser {
  id: string;
  name: string;
  emailId: string;
  state: string;
  photoAttachment?: string;
}

export default function AppUserList(props: any) {
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    if (props?.appUserData) {
      setAppUsers(props.appUserData);
    }
  }, [props.appUserData]);


  const itemTemplate = (user: any, index: number) => {
    return (
      <div key={user.id} className='block'>
        <Card key={user.id} className="w-full h-auto lg:h-[250px] flex flex-col justify-between">
          <Image
            src={prodil}
            alt={user.name || "Admin"}
            className="w-full h-32 object-cover rounded-t-lg"
            width={350}
            height={128}
          />
          <CardContent className="p-3 flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="space-x-2">
                <Link href={`/appuser/edit/${user.id}`}>
                  <Button className="text-blue-600 hover:text-gray-600 p-0">
                    <BiEditAlt size={23} />
                  </Button>
                </Link>
                <Link href={`/appuser/view/${user.id}`}>
                  <Button className="text-blue-600 hover:text-gray-600 p-0">
                    <LuEye size={23} />
                  </Button>
                </Link>
              </div>
              <span className="bg-gradient-to-r from-[#9333EA] to-[#609AF8] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {user.state}
              </span>
            </div>
            <CardTitle className="text-base font-semibold text-gray-800 mt-2">
              {user.name}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              {user.emailId}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const listTemplate = (items: any) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product: any, index: number) => {
      return itemTemplate(product, index);
    });

    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">{list}</div>;
  };

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-8 bg-white">
      <DataView
        value={appUsers}
        listTemplate={listTemplate}
        layout="list"
        paginator
        rows={8}
      />
    </div>


  );
}
