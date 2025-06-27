"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ToastProvider as RadixToastProvider } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"

export function ToastProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const { theme, systemTheme } = useTheme()
  const router = useRouter()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <RadixToastProvider>
        {children}
        <Toaster />
      </RadixToastProvider>
    )
  }

  return (
    <RadixToastProvider>
      {children}
      <Toaster />
    </RadixToastProvider>
  )
}
