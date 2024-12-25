import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LoginResponse } from '@/types/auth';

export interface UserInfo {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    emailId: string;
    lastLogin: string;
    mobile: string;
    isAdmin: boolean;
    role: string;
    defaultLanguage: string;
    state: string;
    district: string;
    isPremiumUser: boolean;
    totalPlot: number;
}

interface UserStore {
    loginUserInfo: UserInfo[] | null;
    setLoginUserInfo: (user: UserInfo[]) => void;
    clearLoginUserInfo: () => void;
}


export const useUserStore = create<UserStore>((set) => ({
    loginUserInfo: null,
    setLoginUserInfo: (user) => set({ loginUserInfo: user }),
    clearLoginUserInfo: () => set({ loginUserInfo: null }),
}));

export interface UserInfo {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    emailId: string;
    lastLogin: string;
    mobile: string;
    isAdmin: boolean;
    role: string;
    address: string;
    photoAttachment: string;
    state: string;
    district: string;
    isPremiumUser: boolean;
    totalPlot: number;
}

interface UserLoginStore {
    userLoginInfo: LoginResponse  | null;
    setuserLoginInfo: (user: LoginResponse ) => void;
    clearuserLoginInfo: () => void;
}

export const useUserLoginStore = create<UserLoginStore>((set) => ({
    userLoginInfo: null,
    setuserLoginInfo: (user) => set({ userLoginInfo: user }),
    clearuserLoginInfo: () => set({ userLoginInfo: null }),
}));

interface CartItem {
    id: number;
    name: string;
    sku: string;
    qty: number;
    regularPrice: number;
    salePrice: number;
    actualSalePrice: number;
    wogActualSalePrice: number;
    regularShippingAmount: number;
    actualShippingAmount: number;
    couponDiscount: number;
    igst: number;
    sgst: number;
    cgst: number;
    totalGst: number;
    totalAmount: number;
    appUserId: number;
    image: string;
    slug: string;
    minQty: number;
    totalShippingAmount: number;
  }


interface GlobalStore {
    watchListBind: boolean;
    watchListList: string[];
    cartListBind: boolean;
    cartListList: CartItem[];
    setWatchListBind: (bind: boolean) => void;
    setWatchListList: (list: string[]) => void;
    setCartListBind: (bind: boolean) => void;
    setCartListList: (list: CartItem[]) => void;
}


export const globalStore = create<GlobalStore>()(
    persist(
        (set) => ({
            watchListBind: false,
            watchListList: [],
            cartListBind: false,
            cartListList: [],
            setWatchListBind: (bind) => set({ watchListBind: bind }),
            setWatchListList: (list) => set({ watchListList: list }),
            setCartListBind: (bind) => set({ cartListBind: bind }),
            setCartListList: (list) => set({ cartListList: list }),
        }),
        {
            name: 'login-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);


