import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client'
import { validatePassword } from '@/wp-utils/passwordHash';

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        account: {
          label: "Account",
          type: "text",
          placeholder: "Email or Username"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      async authorize(credentials) {
        if (credentials?.account === undefined || credentials?.password === undefined)
          return null
        const user = await prisma.wp_users.findFirst({
          where: {
            OR: [
              { user_email: credentials.account },
              { user_nicename: credentials.account },
            ],
          }
        })
        if (user && await validatePassword(credentials.password, user.user_pass)) {
          return {
            id: String(user.ID),
            name: user.display_name,
            email: user.user_email,
          };
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || ""
    })
  ],
  callbacks: {
    session: async ({ session }) => {
      const user = await prisma.wp_users.findFirst({
        where: { user_email: session.user.email || "" }
      })
      session.user.id = user?.ID.toString() || ""
      return session;
    },
  },
})

export { handler as GET, handler as POST }
