"use client";

import AuthPage from "@/components/auth-page"
import {  useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Auth() {
    const router = useRouter()
   const { data: session, status } = useSession()

    useEffect(() => {
        console.log('[Auth] Session status changed', { status, authenticated: Boolean(session) })
        if (status === "loading") return // Still loading
        
        if (session) {
            console.log('[Auth] Authenticated user detected; redirecting to profile')
            router.push('/Profile')
        } 
        // If no session, stay on auth page
    }, [session, status, router])
    return <div>
        <AuthPage></AuthPage>
    </div>
}
