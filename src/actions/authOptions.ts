// next auth 

import * as bcrypt from "bcrypt";
import prisma from "@/db/db";
import  CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"


const authOptions = {
providers : [
 CredentialsProvider({
    name : 'credentials', 
    credentials : {
        email: { label: "email", type: "text", placeholder: "peterparker@dailybugle.co.us", required: true },
        password: { label: "Password", type: "password", required: true },
        username : { label: "name", type: "text"},
        pfp : { label: "profile", type: ""}
    } ,
    async authorize(credentials: any): Promise<any> {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findFirst({
            where : {
                email : credentials.email
            }
        })

        if (existingUser) {
            const pwValidation = await bcrypt.compare(credentials.password, existingUser.password);
            if (pwValidation) {
                return {
                    id : existingUser.id ,
                    email : existingUser.email,
                    username : existingUser.username
                }
            }
            return null;
        }

        try {
            const user = await prisma.user.create({
                data : {
                    email : credentials.email,
                    password : hashedPassword,
                    username : credentials.username
                }
            })
            return {
                id : user.id ,
                email : user.email,
                username : user.username
            }
            
        } catch (error) {
            console.log(error);
        }

        return null; 
    }
 }),

  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),

], 
secret : "secret",

  pages: {
    signIn: '/auth', 
  },
  
callbacks : {

     async jwt({ token, user, account, profile }: any) {
    if (account && user) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email!,
            username: "",
            password: "", 
          },
        });
      }
    }

    return token;
  },


  async session({token, session}: any) {
        session.user.id = token.sub 

        return session
    }
}
}

export default authOptions;