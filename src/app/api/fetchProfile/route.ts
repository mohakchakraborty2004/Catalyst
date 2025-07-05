import { userProfile } from "@/actions/fetchProfile";
import { NextRequest, NextResponse } from "next/server";

type dataType = {
    status : number,
    msg? : string | undefined,
    userData? : {
    id: string;
    email: string;
    password: string;
    username: string;
    xprofile: string | null;
    linkedin: string | null;
    github: string | null;
    tags: string[];
    phone: number | null;
    profilePic : string | null
    country : string | null
} | undefined
}

export async function GET(req : NextRequest) {
  try {
    const user : dataType = await userProfile();
    if(user) {
        return Response.json({user : {
        username : user.userData?.username,
        email : user.userData?.email,
        xprofile : user.userData?.xprofile,
        github : user.userData?.github,
        linkedIn : user.userData?.linkedin,
        phone : user.userData?.phone,
        tags : user.userData?.tags,
        profilePic : user.userData?.profilePic,
        country : user.userData?.country
    }})
    }
  } catch (error) {
    console.log(error)
    return Response.json("internal server error")
  }
}