// next auth 

import bcrypt from 'bcryptjs'
import prisma from "@/db/db";
import  CredentialsProvider  from "next-auth/providers/credentials"
import dotenv from "dotenv";

dotenv.config();

const authOptions = {
providers : [
 CredentialsProvider({
    name : 'credentials', 
    credentials : {
        email: { label: "email", type: "text", placeholder: "peterparker@dailybugle.co.us", required: true },
        password: { label: "Password", type: "password", required: true },
        username : { label: "name", type: "text"},
        profilePic : {label: "profile", type : "text"}
    } ,
    async authorize(credentials: any): Promise<any> {

        try {     
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findUnique({
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
                    username : credentials.username,
                    profilePic : credentials.profilePic
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
        } catch (error) {
            console.log(error)
        }

    }
 })

], 
pages : {
    signIn : '/auth'
},
secret : process.env.JWT_SECRET as string,
callbacks : {
    async session({token, session}: any) {
        session.user.id = token.sub 

        return session
    }
}
}

export default authOptions;