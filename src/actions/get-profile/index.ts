"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers"

import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { auth } from "@/lib/auth"

export const getProfile = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    //await new Promise(resolve => setTimeout(resolve, 5000));

    const profile = await db.query.userProfiles.findFirst({
        where: eq(userProfiles.userId, session.user.id)
    });

    return {
        session: {
            name: session.user.name,
            email: session.user.email,
        },
        profile: profile || { whatsapp: "", userId: session.user.id }
    };
} 