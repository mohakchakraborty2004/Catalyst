"use client";

import AuthPage from "@/components/auth-page"
import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Auth() {
    useEffect(() => {
        async function check() {
            const check = await getSession()
            if(check) {
                redirect('/Profile');
            }
        }
    }, [])
    return <div>
        <AuthPage></AuthPage>
    </div>
}