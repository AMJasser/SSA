import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },
    adapter: PrismaAdapter(prisma) as Adapter | undefined,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const userDB = await prisma.user.findUnique({
                    where: {
                        email: user.email as string
                    }
                });

                if (userDB) {
                    token.id = userDB.id;
                    token.isAdmin = userDB.isAdmin;
                    token.verified = userDB.verified;
                }
            }

            return token;
        },
        async session({ session, token, user }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.isAdmin = token.isAdmin as boolean;
                session.user.verified = token.verified as boolean;
            }

            return session;
        }
    }
};
