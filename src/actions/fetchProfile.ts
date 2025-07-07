"use server";

import { getServerSession } from "next-auth";
import authOptions from "./authOptions";
import prisma from "@/db/db";


export async function completeProfile(Xprofile : string, linkedinProfile: string, githubUsername: string, Tags: string[], phoneNumber : string, country: string) {
    const session =  await getServerSession(authOptions);

    const userId = session?.user?.id;

    if(!userId){
        console.log("no user found");
        return false;
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
                phone : phoneNumber,
                country : country
            }
        })

        if (updateUserProfile) {
            return true;
        }
    } else {
        console.log("some error occured");
       return false
    }
    } catch (error) {
        console.log(error);
        return false;
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

export async function userProfile() {
     const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
   
    if(!userId){
        return {
            status : 400,
            msg : "Unauthorized access"
        }
    }

    const userData = await prisma.user.findUnique({
        where : {
            id : userId
        }
    })

    if(userData){
        return {
            status : 200,
            userData 
        }
    } else {
        return {
            status : 400,
            msg : "No Such User"
        }
    }
}

export async function userProfileById(userId : string) {
  
    if(!userId){
        return {
            status : 400,
            msg : "Unauthorized access"
        }
    }

    const userData = await prisma.user.findUnique({
        where : {
            id : userId
        }
    })

    if(userData){
        return {
            status : 200,
            userData 
        }
    } else {
        return {
            status : 400,
            msg : "No Such User"
        }
    }
}