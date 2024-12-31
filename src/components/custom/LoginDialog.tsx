'use client'

import { LoginForm } from "@/app/components/login-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export default function LoginDialog() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div>
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

