"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toast, ToastProvider as RadixToastProvider } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()
  const { theme } = useTheme()

  return (
    <RadixToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={`${theme === 'dark' ? 'dark' : ''} ${props.className || ''}`}
          >
            <div className="grid gap-1">
              {title && <div className="font-medium">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
          </Toast>
        )
      })}
    </RadixToastProvider>
  )
}
