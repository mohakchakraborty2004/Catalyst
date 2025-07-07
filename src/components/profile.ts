import authOptions from "@/actions/authOptions";
import { userProfile } from "@/actions/fetchProfile";
import { getServerSession } from "next-auth";

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
    phone: string | null;
    profilePic : string | null
    country : string | null
} | undefined
}

export interface userData {
    email: string | undefined;
    username: string | undefined;
    xprofile: string | null | undefined;
    linkedIn: string | null | undefined;
    github: string | null | undefined;
    tags: string[] | undefined;
    phone: string | null | undefined;
    profilePic : string | undefined | null
    country : string | undefined | null
}

export async function useProfile(){
    const user : dataType = await userProfile();
    return {
        username : user.userData?.username,
        email : user.userData?.email,
        xprofile : user.userData?.xprofile,
        github : user.userData?.github,
        linkedIn : user.userData?.linkedin,
        phone : user.userData?.phone,
        tags : user.userData?.tags,
        profilePic : user.userData?.profilePic,
        country : user.userData?.country
    }
}