"use server";

import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
import prisma from "@/db/db";


export async function completeProfile(Xprofile : string, linkedinProfile: string, githubUsername: string, Tags: string[], phoneNumber : number) {
    const session =  await getServerSession(authOptions);

    const userId = session?.user?.id;

    if(!userId){
        return {
            status : 400,
            msg : "Unauthorized access"
        }
    }


    try {
        
    if(
        await prisma.user.findUnique({
            where : {
                id : userId
            }
        })
    ){
        const updateUserProfile = await prisma.user.update({
            where : {
                id : userId
            }, 
            data : {
                xprofile : Xprofile,
                linkedin : linkedinProfile,
                github : githubUsername,
                tags : Tags,
                phone : phoneNumber
            }
        })

        if (updateUserProfile) {
            return {
                status : 200,
                msg : "Profile Updated, refresh to see changes"
            }
        }
    } else {
       return {
            status : 400,
            msg : "No Such User"
        }
    }
    } catch (error) {
        console.log(error);
        return {
            status : 500,
            msg : "internal server error"
        }
    }

}

export async function makeUser(email : string) {
    try {
        if(
        await prisma.user.findUnique({
            where : {
                email : email
            }
        })
    ){
        return {
            status : 200,
            msg : "user already exists"
        }
    }  

    const createUser = await prisma.user.create({
        data : {
            username : "",
            password : "",
            email : email
        }
    })

    if (createUser) {
        return {
            status : 200,
            msg : "Account Created"
        }
    }
    } catch (error) {
        console.log(error);
        return {
            status : 500,
            msg : "internal server error"
        }
    }
  
}