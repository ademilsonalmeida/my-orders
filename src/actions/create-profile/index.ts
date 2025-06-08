"use server";

import { headers } from "next/headers"
import { redirect } from "next/navigation";

import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { auth } from "@/lib/auth"

export const createProfile = async (whatsapp: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    await db.insert(userProfiles).values({
        userId: session.user.id,
        whatsapp: whatsapp
    }).returning();

    redirect("/dashboard");
}