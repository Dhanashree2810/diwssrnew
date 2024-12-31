'use server'
import { cartItemRemove, cartQuantityUpdate, fetchCartData } from "@/services/cart";
import { verifySession } from "../lib/session"
import { CartItemData } from "@/types/auth";

export async function fetchFunCartData(userId:number){
    const token = await verifySession();
    const res = await fetchCartData(userId,token);
    return res;
}

export async function cartFunItemRemove(cartItems:CartItemData){
    const token = await verifySession();
    const res = await cartItemRemove(cartItems,token);
    return res;
}

export async function cartFunQuantityUpdate(cartItems:CartItemData){
    const token = await verifySession();
    const res = await cartQuantityUpdate(cartItems,token);
    return res;
}