/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItemData } from "@/types/auth";

const fetchCartData = async (userId?: number, token?: any) => {
    // console.log("api cart", userId, token);

    const payload = {
        "condition": {
            "AppUserId": userId
        }
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Cart/Get`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                cache: "no-cache"
            });
        if (!response.ok) {
            throw new Error(`HTTP error ! status",${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const cartItemRemove = async (payload: CartItemData, token?: any) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Cart/Remove`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                cache: "no-cache"
            });
        if (!response.ok) {
            throw new Error(`HTTP error ! status",${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch error:", error);
    }
};


const cartQuantityUpdate = async (payload: CartItemData, token?: any) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Cart/CartQuantityUpdate`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                cache: "no-cache"
            });
        if (!response.ok) {
            throw new Error(`HTTP error ! status",${response.status}`);
        }


        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch error:", error);
    }
};

export { fetchCartData, cartItemRemove, cartQuantityUpdate }