'use client';

import { useEffect, useState } from 'react';
import { globalStore, useUserLoginStore } from '../../../globalstate';
import Cart from '../pages/carts/Cart';
import { cartItemRemove } from '@/services/cart';
import { CartItem } from '@/types/auth';

export default function Page() {
  const { cartListList, setCartListList } = globalStore();
  const { userLoginInfo } = useUserLoginStore();

  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [userToken, setUserToken] = useState<string>();

  useEffect(() => {
    const convertedCartList = cartListList;  
    console.log("cartListList",cartListList);
      
    setCartData(convertedCartList);
  }, [cartListList]);

  useEffect(() => {
    const token = userLoginInfo?.token;
    setUserToken(token);
  }, [userLoginInfo]);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.minQty, quantity) } : item
      )
    );
  };

  const handleRemoveItem = async (item: CartItem) => {
    try {
      const salesprice =  item.salePrice ?? 0;
      const totalAmount = (item.salePrice ?? 0) * (item.minQty || 1);

      const updatedCart = await cartItemRemove(
        {
          ...item,
          regularPrice: item.regularPrice ?? 0,
          salePrice: salesprice, 
          totalAmount: totalAmount,
          wogActualSalePrice: item.wogActualSalePrice ?? 0, 
          totalShippingAmount: 0,
          couponDiscount: 0,
          appUserId: userLoginInfo?.userInfo?.[0]?.id || 0,
        },
        userToken
      );

      setCartData(updatedCart);
      setCartListList(updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <Cart
        items={cartData}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
