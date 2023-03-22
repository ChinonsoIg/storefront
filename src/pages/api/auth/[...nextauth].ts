import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";
// import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        // const { email, password } = credentials as {
        //   email: string;
        //   password: string;
        // };

        const res = await fetch(`https://friendly-fish-cap.cyclic.app/api/v1/customer/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json();
        const { user, token } = data;

        // If you omit this, the login will go no matter the password. However, the user will be empty obj
        if (!user) {
          return null
        }

        return {
          ...user,
          token
        }

      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token, user }: any) {
      if (token.accessToken) {
        session.user = token.user;
        session.user.token = token.accessToken;
        return session;
      }

      session.user = token.user
      // session.user.token = token.accessToken;
      return session;
    },

  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },

}


// If you don't export this, server session will be null.
export { authOptions };

export default NextAuth(authOptions);