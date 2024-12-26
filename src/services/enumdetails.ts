

const fetchEnumDetailsData = async (token?: string) => {
    const payload = {
        "form": null,
        "condition": null
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/EnumDetail/Get`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                cache: "no-store"
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

export {
    fetchEnumDetailsData
}