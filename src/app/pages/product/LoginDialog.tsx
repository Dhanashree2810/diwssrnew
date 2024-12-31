import { useState } from 'react';
import Image from 'next/image';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import cartimg from '@/assets/images/cartimg.png';

interface LoginDialogProps {
  showLoginPopup: boolean;
  setShowLoginPopup: (show: boolean) => void;
}

const LoginDialog = ({ showLoginPopup, setShowLoginPopup }: LoginDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setShowLoginPopup(false);
    setIsDialogOpen(true);
  };


  return (
    <>
      <Dialog open={showLoginPopup} onOpenChange={setShowLoginPopup}>
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>
        <DialogContent className="sm:max-w-[350px]">
          <div className="text-center">
            <Image src={cartimg} height={162} width={500} alt='Cart Image' />
            <h1 className='text-lg font-semibold'>Missing Cart items?</h1>
            <p className="text-gray-800 text-xs py-2">Login to see the items you added previously.</p>
            <Button onClick={handleOpenDialog} className="mt-4 bg-black text-white">
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <VisuallyHidden.Root>
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
          </VisuallyHidden.Root>
          <div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginDialog;

