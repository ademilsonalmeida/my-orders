import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  /*socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },*/
  plugins: [
    customSession(async ({ user, session }) => {      
      await Promise.all([
        db.query.users.findFirst({
          where: eq(users.id, user.id),
        }),
      ]);
      return {
        user,
        session,
      };
    }),
  ],
  userProfiles: {
    modelName: "user_profiles",    
  },
  emailAndPassword: {
    enabled: true,
  },
});
