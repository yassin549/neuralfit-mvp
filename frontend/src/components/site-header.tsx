"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">NeuralFit</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="/chat"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Chat
            </Link>
            <Link
              href="#features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
          </nav>
            {/* Mobile hamburger */}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[120] bg-background/90 backdrop-blur flex flex-col p-6 space-y-6 md:hidden">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Menu</span>
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 text-lg font-medium">
            <Link href="/chat" onClick={() => setMobileOpen(false)}>Chat</Link>
            <Link href="#features" onClick={() => setMobileOpen(false)}>Features</Link>
            <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link href="/register" className="font-semibold" onClick={() => setMobileOpen(false)}>Get Started</Link>
          </nav>
          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}
