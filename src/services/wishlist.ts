

const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

const getWishlistData = async (userId?: string, tokenData?: string) => {
    const token = tokenData;

    const payload = {
        "form": null,
        "condition": {
            "AppUserId": userId
        }
    }

    try {
        const response = await fetch(`${apiBaseUrl}/WishList/Get`,
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

export { getWishlistData }