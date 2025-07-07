"use client";

import AuthPage from "@/components/auth-page"
import {  useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Auth() {
    const router = useRouter()
   const { data: session, status } = useSession()

    useEffect(() => {
        if (status === "loading") return // Still loading
        
        if (session) {
            alert("active session");
            router.push('/Profile')
        } 
        // If no session, stay on auth page
    }, [session, status, router])
    return <div>
        <AuthPage></AuthPage>
    </div>
}