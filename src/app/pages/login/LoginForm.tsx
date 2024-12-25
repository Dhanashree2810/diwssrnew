'use client'
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginUser } from '@/services/login';
import { LoginFormSchema } from '@/lib/definitions';
import { useUserLoginStore } from '../../../../globalstate';
import { LoginFormProps } from '@/types/auth';

export default function LoginForm({ onCloseDialog }: LoginFormProps) {
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<Record<string, string | undefined>>({});
  const { setuserLoginInfo } = useUserLoginStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrors({});

    const result = LoginFormSchema.safeParse({ email: customerEmail, password: customerPassword });

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setLoginErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    const payload = {
      "emailId": customerEmail,
      "pin": customerPassword
    }

    const response = await loginUser(payload);
    setuserLoginInfo(response);

    console.log(response, 'info');
    alert("Login Successful");
    onCloseDialog();
  };

  return (
    <Card className="w-[420px] p-2">
      <CardHeader className="flex flex-col justify-center items-center text-center">
        <CardTitle className=' text-2xl font-semibold'>Login</CardTitle>
        <CardDescription className=' text-xs font-medium'>
          Get access to your Orders, Wishlist and Recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className=' py-4 space-y-5'>
        <form onSubmit={handleLogin}>
          <div className="space-y-2 pb-7">
            <Label htmlFor="customermail">Username or Email Address</Label>
            <Input
              type="email"
              name="customermail"
              id="customermail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            {loginErrors.email && <p className="text-red-600 text-xs py-2">{loginErrors.email}</p>}
          </div>

          <div className="space-y-1 pb-7">
            <Label htmlFor="customerpassword" className=' my-2'>Password</Label>
            <Input
              type="password"
              id="customerpassword"
              name="customerpassword"
              value={customerPassword}
              onChange={(e) => setCustomerPassword(e.target.value)}
            />
            {loginErrors.password && <p className="text-red-600 text-xs py-2">{loginErrors.password}</p>}
          </div>

          <div className="flex justify-between mt-4">
            <Button
              type="submit"
              className="text-sm px-4 py-4 rounded-md w-fit bg-blue-600 text-white hover:bg-blue-700"
            >
              Log In
            </Button>
            <Link href="/product">
              <Button
                className="text-gray-800 text-sm cursor-pointer bg-gray-200 px-4 py-4 rounded-md hover:bg-gray-300"
              >
                Cancel
              </Button>
            </Link>
          </div>

        </form>
      </CardContent>
      <VisuallyHidden.Root>
        <CardFooter>
        </CardFooter>
      </VisuallyHidden.Root>
    </Card>
  );
}

