import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from '@prisma/client'
import { validatePassword } from '@/wp-utils/passwordHash';

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credential",
      credentials: {
        account: {
          label: "Account",
          type: "text",
          placeholder: "輸入信箱或使用者名稱"
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "輸入密碼"
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
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // check if user exist in the database
        const dbUser = await prisma.wp_users.findFirst({ 
          where: { user_email: user.email || "" } 
        });
        
        // If not exist, create user
        if (!dbUser) {
          const username = user.email?.split('@')[0] || "";
          const newUser = await prisma.wp_users.create({
            data: {
              user_login: username,
              user_nicename: username,
              user_email: user.email || "",
              user_registered: new Date(),
              display_name: user.name || "",
            },
          });
          
          // Assuming the user successfully created, add this user to wp_social_users
          await prisma.wp_social_users.create({
            data: {
              ID: Number(newUser.ID),
              type: 'google',
              identifier: account.providerAccountId,
              register_date: new Date(),
              link_date: new Date(),
            }
          });
        } else {
          // If user exists, check if the user has logged in using Next Social Login
          const socialUser = await prisma.wp_social_users.findFirst({
            where: { ID: Number(dbUser.ID), type: 'google' }
          });

          // If the user hasn't logged in with Next Social Login, add the record
          if (!socialUser) {
            await prisma.wp_social_users.create({
              data: {
                ID: Number(dbUser.ID),
                type: 'google',
                identifier: account.providerAccountId,
                register_date: new Date(),
                link_date: new Date(),
              }
            });
          }
        }
      }

      return true;
    },
    session: async ({ session }) => {
      const user = await prisma.wp_users.findFirst({
        where: { user_email: session.user.email || "" }
      })
      session.user.id = user?.ID.toString() || ""
      session.user.name = user?.display_name || ""
      return session;
    },
  },
})

export { handler as GET, handler as POST }
