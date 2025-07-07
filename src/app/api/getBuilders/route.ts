import { NextRequest } from "next/server";
import prisma from "@/db/db";

export async function GET(req: NextRequest) {
    try {
        const builders = await prisma.user.findMany({
            select : {
                id : true,
                username : true,
                tags : true,
                profilePic : true
            }
        })

        if(builders) {
            return Response.json({
                status : 200,
                builders
            })
        } else {
            return Response.json({
            status : 500,
            msg : "Some error occured"
        })
        }
    } catch (error) {
        console.log(error);
        return Response.json({
            status : 500,
            msg : "internal server Error"
        })
    }
}