/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginPayload, LoginResponse } from '@/types/auth';

const loginUser = async (payload: LoginPayload): Promise<LoginResponse | null> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Login/LoginPin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(`HTTP error ! status",${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

const getUserInfo = async (email?: string, password?: string): Promise<any> => {
    const payload = {
        emailId: email,
        pin: password
    };

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Login/LoginPin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: "no-cache"
        });

        const data = await response.json();
        return data.userInfo;
    } catch (error) {
        console.error("Fetch error:", error);
    }
};



export { loginUser,getUserInfo}