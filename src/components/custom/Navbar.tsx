'use client';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import React, { useState } from 'react';
import Link from 'next/link';
import { IoPerson } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { LogInIcon, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/app/pages/login/LoginForm'), { ssr: false });


export default function NavbarPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLoginForm = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={`fixed left-0 right-0 z-50 bg-white shadow transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}>
      <nav className="p-2">
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-lg lg:text-xl font-bold text-purple-600 leading-tight">
              Brand<span className="text-blue-400">Name</span>
            </h1>
            <i className="ri-gem-line text-blue-400 text-2xl" />
          </div>

          <div className="flex items-center justify-end gap-5">
            <Link href="/appuser/homes" className="font-semibold text-[16px] hover:bg-black hover:text-white p-2">Dashboard</Link>
            <Link href="/appuser" className="font-semibold text-[16px] hover:bg-black hover:text-white p-2 ">List</Link>
            <Link href="/product" className="font-semibold text-[16px] hover:bg-black hover:text-white p-2">Product</Link>
            <Link href="/carts" className="font-semibold text-[16px] hover:bg-black hover:text-white p-2"> Cart</Link>
            {/* <div onClick={handleLoginForm} className=" cursor-pointer font-semibold text-[16px] hover:bg-black hover:text-white p-2">
              <span>Login</span>
            </div> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IoPerson className="rounded-full p-1.5 sm:p-2 text-black bg-white cursor-pointer" size={35} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 text-black bg-white">
                <DropdownMenuGroup>
                  <div onClick={handleLoginForm}>
                    <DropdownMenuItem className="cursor-pointer hover:bg-black hover:text-white">
                      <LogInIcon className="mr-2 h-3 w-3" />
                      <span>Login</span>
                    </DropdownMenuItem>
                  </div>
                  <Link href="/">
                    <DropdownMenuItem className="cursor-pointer hover:bg-black hover:text-white">
                      <LogOut className="mr-2 h-3 w-3" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <VisuallyHidden.Root>
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>
              </DialogDescription>
            </DialogHeader>
          </VisuallyHidden.Root>
          <div>
            <LoginForm onCloseDialog={handleCloseDialog} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
