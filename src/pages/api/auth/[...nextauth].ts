import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook";

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

        const res = await fetch(`${BASE_URL}/customer/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })

        const data = await res.json();

        const { customer, token } = data;

        // If you omit this, the login will go no matter the password. However, the customer will be empty obj
        if (!customer) {
          return null
        }

        return {
          ...customer,
          token
        }

      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.customer = user;
      }
      return token;
    },

    async session({ session, token, customer }: any) {
      if (token.accessToken) {
        session.customer = token.customer;
        session.customer.token = token.accessToken;
        return session;
      }

      session.customer = token.customer
      // session.customer.token = token.accessToken;
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