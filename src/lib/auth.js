import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.DB_NAME || "booknook");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, { client }),
  trustedOrigins: [
    "http://localhost:3000",
    "https://book-nook-client-chi.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    jwt({
      jwt: {
        issuer: "booknook",
        audience: "booknook-api",
        expirationTime: "1h",
      },
    }),
    nextCookies(),
  ],
});
