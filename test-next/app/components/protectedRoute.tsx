'use client'

import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext"
import { useEffect } from "react";

export default function ProtectedRoute({children}: {children: React.ReactNode}){
  const {user} = useUser();
  const router = useRouter();

  useEffect(() => {
    if(!user){
      router.push('/');
    }
  }, [user, router])

  if(!user) return null;

  return <>{children}</>
}
