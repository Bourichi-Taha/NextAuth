import NextAuth, { type DefaultSession } from "next-auth"
import { db } from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas"
import { getUserByEmail, getUserById } from "./data/user"
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client"
import { JWT } from "next-auth/jwt"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

export type ExtendedUser = {
  role: UserRole;
  isTwoFactorEnabled: boolean;
} & DefaultSession["user"];

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
  }
}


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {

          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (isPasswordValid) {
            return user;
          }

          return null;
        }

        return null;
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async signIn({ user,account }) {
      //allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true
      }
      if (!user.id) {
        return false;
      }
      const dbUser = await getUserById(user.id);
      if (!dbUser || !dbUser.emailVerified) {
        return false;
      }
      
      if (dbUser.isTwoFactorEnabled) {
        const confirmation = await getTwoFactorConfirmationByUserId(dbUser.id);
        if (!confirmation) {
          return false
        }
        //Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({where:{id:confirmation.id}});
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const user = await getUserById(token.sub);
      if (!user) {
        return token;
      }
      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (session.user && token.isTwoFactorEnabled !== undefined ) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }
      return session;
    },
  },
  events: {
    async linkAccount({user}) {
            await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                emailVerified: new Date(),
                image:user.image,
              }
            })
    },
    
  } ,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  }
});