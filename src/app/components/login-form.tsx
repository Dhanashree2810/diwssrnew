/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from '../actions/auth';
import { Mail, Lock } from "lucide-react";
import { useFormStatus } from 'react-dom';
import { LoginStore } from '../../../globalstate';

export function LoginForm() {
  const [state, action] = React.useActionState(login, undefined);
  const { setEmail, setPassword } = LoginStore();

  const handleEmailChange = (e:any) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordChange = (e:any) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <Card className="w-[420px] p-2">
      <CardHeader className="flex flex-col justify-center items-center text-center">
        <CardTitle className="text-center font-bold text-3xl">Login</CardTitle>
        <CardDescription className="text-xs font-medium">
          Get access to your Orders, Wishlist, and Recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4 space-y-5">
        <form action={action} noValidate className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-bold">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                className="pl-10 mt-3"
                onChange={handleEmailChange} // Handle email change
              />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-bold">Password *</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                className="pl-10 mt-3"
                onChange={handlePasswordChange} // Handle password change
              />
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}
          </div>

          <div className="btnContainer">
            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full bg-green-700 text-white py-2 rounded-lg font-bold">
      {'Login'}
    </Button>
  );
}
