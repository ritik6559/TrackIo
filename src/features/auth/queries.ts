"use server"

import { createSessionClient } from "@/lib/appwrite";

export async function getCurrent() {
    try {
        const sessionClient = await createSessionClient();

        if (!sessionClient) {
            return null;
        }

        const { account } = sessionClient;
        return await account.get();
    } catch (e) {
        console.error("Error getting current user:", e);
        return null;
    }
}
