import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { db } from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcryptjs";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials){

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {

          const {email,password} = validatedFields.data;
          
          const user = await getUserByEmail(email);

          if(!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password,user.password);

          if (isPasswordValid) {
            return user;
          }

          return null;
        }

        return null;
      }
    })
  ],
  adapter:PrismaAdapter(db),
  session: {strategy: "jwt"},
});