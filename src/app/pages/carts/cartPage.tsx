'use client';
import { useEffect, useState } from 'react';
import { globalStore, LoginStore } from '../../../../globalstate';
import Cart from './Cart';
import { CartItem } from '@/types/auth';
import { cartFunItemRemove, fetchFunCartData } from '../../actions/cart';
import { getUserInfo } from '@/services/login';

export default function CartPage() {
  const { setCartListList } = globalStore();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { email, password } = LoginStore();
  const [appUserId, setAppUserId] = useState<number>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(email, password);
        if (Array.isArray(data) && data.length > 0) {
          setAppUserId(data[0]?.id);
        } else {
          console.log("No user data found.");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, [email, password]);

  useEffect(() => {
    const getCartData = async () => {
      if (appUserId !== undefined) {
        try {
          const cartData1 = await fetchFunCartData(appUserId);
          setCartData(cartData1);
          setCartListList(cartData1);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };
    getCartData();
  }, [appUserId, setCartListList]);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, qty: Math.max(item.minQty, quantity) } : item
      )
    );
  };

  const handleRemoveItem = async (item: CartItem) => {
    if (appUserId !== undefined) {
      try {
        const salesprice = item.salePrice ?? 0;
        const totalAmount = (item.salePrice ?? 0) * (item.minQty || 1);

        await cartFunItemRemove({
          ...item,
          regularPrice: item.regularPrice ?? 0,
          salePrice: salesprice,
          totalAmount: totalAmount,
          wogActualSalePrice: item.wogActualSalePrice ?? 0,
          totalShippingAmount: 0,
          couponDiscount: 0,
          appUserId: appUserId,
        });

        const cartData1 = await fetchFunCartData(appUserId);
        setCartData(cartData1);
        setCartListList(cartData1);
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
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
