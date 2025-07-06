import mail from "@/actions/applier";
import authOptions from "@/actions/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if(!userId) {
       return Response.json({
            status : 404,
            msg : "Please Signup"
        }) 
    }

    try {
        const body = await req.json()
        const {position, message, title, author} = body;
        const url = `https://catalyst.vercel.app/Profile/${userId}`
        const subject = `Application for ${position} at ${title}`;
        const html = `
        <h3> Hello ${author}!</h3>
        <br>
        <br>
        <p>${message}</p>
        <br>
        <br>
        Take a look at the profile : ${url}
        <br>
        <br>
        Please do not reply to this email.
        <br>
        You can contact the applier directly from the profile page.
        `
        const sendMail = await mail('catalyst', author, subject, html);

        if(sendMail) {
          return Response.json ({
                status : 200,
                msg : "Application sent! keep an eye on your mail."
            })
        } else {
          return Response.json ({
                status : 400,
                msg : "Failed to send, please try later"
            })
        }

    } catch (error) {
       return Response.json({
            status : 500,
            msg : "internal server error"
        })
    }
}