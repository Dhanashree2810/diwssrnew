'use client';
import { useEffect, useState } from 'react';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import LoginForm from "../login/LoginForm";
import { useUserLoginStore } from '../../../../globalstate';
import cartimg from '@/assets/images/cartimg.png'
import { CartItem } from '@/types/auth';

interface CartProps {
    items: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (item: CartItem) => Promise<void>;
}

export default function Cart({ items, onUpdateQuantity, onRemoveItem }: CartProps) {
    const [userData, setUserData] = useState<number | undefined>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { userLoginInfo } = useUserLoginStore();

    useEffect(() => {
        const userId = userLoginInfo?.userInfo?.[0]?.id;
        setUserData(userId);       
    }, [userLoginInfo]);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => setIsDialogOpen(false);


    const calculateTotal = () =>
        items.reduce((sum, item) => sum + item.actualSalePrice * item.qty, 0);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-2 rounded-lg shadow-lg w-full text-center">
                {/* <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1> */}
                {!userData ? (
                    <div className="bg-white p-2 rounded-lg shadow-lg max-w-md w-full text-center">
                        <Image
                            src={cartimg}
                            height={162}
                            width={500}
                            alt="Cart Image"
                            className="mx-auto"
                        />
                        <h1 className="text-lg font-semibold mt-4">Missing Cart Items?</h1>
                        <p className="text-gray-800 text-sm py-2">
                            Login to see the items you added previously.
                        </p>
                        <Button onClick={handleOpenDialog} className="mt-4 bg-black text-white">
                            Login
                        </Button>
                    </div>
                ) : (
                    // items.length > 0 && (
                        <div className="max-w-full mx-auto p-6">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <Table className="w-full">
                                    <TableHeader className=' bg-gray-50'>
                                        <TableRow>
                                            <TableHead className='text-lg'>Product</TableHead>
                                            <TableHead className='text-lg'>Quantity</TableHead>
                                            <TableHead className="text-right text-lg">Price</TableHead>
                                            <TableHead className="text-right text-lg">Total</TableHead>
                                            <TableHead className="text-right text-lg">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                            className="rounded mr-2"
                                                        />
                                                        <div>
                                                            <div className="font-semibold text-[16px]">{item.name}</div>
                                                            <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                onUpdateQuantity(item.id, item.qty - 1)
                                                            }
                                                        >
                                                            -
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            value={item.qty}
                                                            onChange={(e) =>
                                                                onUpdateQuantity(
                                                                    item.id,
                                                                    parseInt(e.target.value) || item.minQty
                                                                )
                                                            }
                                                            className="w-20 text-center text-[16px] font-semibold"
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                onUpdateQuantity(item.id, item.qty + 1)
                                                            }
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right text-[16px] font-semibold">
                                                    ₹{item.actualSalePrice.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right text-[16px] font-semibold">
                                                    ₹{(item.actualSalePrice * item.qty).toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() => onRemoveItem(item)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-6 flex justify-between">
                                <span>Total Items: {items.length}</span>
                                <span className="text-xl font-bold">
                                    Total: ₹{calculateTotal().toFixed(2)}
                                </span>
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <Button variant="outline" onClick={() => (window.location.href = '/product')}>
                                    Continue Shopping
                                </Button>
                                <Button className='bg-black text-white' onClick={() => (window.location.href = '/checkout')}>
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    // )
                )}

                < Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <VisuallyHidden.Root>
                            <DialogHeader>
                                <DialogTitle>Login</DialogTitle>
                                <DialogDescription />
                            </DialogHeader>
                        </VisuallyHidden.Root>
                        <div>
                            <LoginForm onCloseDialog={handleCloseDialog} />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
