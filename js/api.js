const BASE_URL = "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com";

export async function getApiKey() {
    const res = await fetch(`${BASE_URL}/keys`, {
        method: "POST"
    });

    const data = await res.json();
    return data.key;
}

export async function createTenant(apiKey, name) {
    const res = await fetch(`${BASE_URL}/tenants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-zocom": apiKey
        },
        body: JSON.stringify({ name })
    });

    return await res.json();
}

export async function fetchMenu(apiKey) {
    const res = await fetch(`${BASE_URL}/menu`, {
        method: "GET",
        headers: {
            "x-zocom": apiKey
        }
    });

    return res.json(); 
}