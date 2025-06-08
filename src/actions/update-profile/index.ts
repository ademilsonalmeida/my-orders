"use server";

import { headers } from "next/headers"
import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm";

export const updateProfile = async (whatsapp: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await db.update(userProfiles)
        .set({ whatsapp })
        .where(eq(userProfiles.userId, session.user.id))
        .returning();

    return { success: true };
} 