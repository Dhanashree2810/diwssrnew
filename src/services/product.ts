

const getProductLiveData = async () => {
    const payload = {
        "form": null,
        "condition": null
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ProductLive/Get`,
            {
                method: 'POST',
                headers: {
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

const getProductLiveByIdData = async (productId: string) => {
    const payload = {
        "id": productId,
        "slug":""       
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ProductLive/GetById`,
            {
                method: 'POST',
                headers: {
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


export { getProductLiveData, getProductLiveByIdData}