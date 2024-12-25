
import { LoginPayload, LoginResponse } from '@/types/auth';

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
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



export { loginUser}