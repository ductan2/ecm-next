import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "./db";
import { Session, SessionStrategy } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
// import type User from nextauth
import { User as UserType } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
   session: {
      strategy: "jwt" as SessionStrategy | undefined,
   },
   providers: [
      CredentialsProvider({
         type: "credentials",
         credentials: {},
         async authorize(credentials) {
            dbConnect();
            const { email, password } = credentials as { email: string; password: string };
            const user = await User.findOne({ email });
            if (!user) {
               throw new Error("Email is not valid");
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) throw new Error("Password is not valid");
            return user;
         }
      })
   ],
   callbacks: {
      async signIn({ user }: { user: UserType | AdapterUser }) {
         const { email, name, image } = user;
         dbConnect();
         let isUser = await User.findOne({ email });
         if (!isUser)
            isUser = await User.create({ email, name, image });
         return true;
      },
      jwt: async ({ token }: { token: JWT }) => {
         const userByEmail = await User.findOne({ email: token.email });
         userByEmail.password = undefined;
         userByEmail.resetCode = undefined;
         token.user = userByEmail
         return token;
      },
      session: async ({ session, token }: { session: any, token: JWT }) => {
         session.user = token.user;
         return session;
      }
   },
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: "/login"
   }
}
