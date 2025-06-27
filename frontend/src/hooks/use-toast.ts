import * as React from "react"

import { type ToastActionElement } from "@/components/ui/toast"
import { useToast as useRadixToast } from "@/components/ui/use-toast"

type ToastProps = {
  title: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning" | "info"
  duration?: number
  action?: ToastActionElement
}

export function useToast() {
  const { toast } = useRadixToast()

  const showToast = React.useCallback(
    ({
      title,
      description,
      variant = "default",
      duration = 5000,
      action,
    }: ToastProps) => {
      toast({
        title,
        description,
        variant,
        duration,
        action,
      })
    },
    [toast]
  )

  return { showToast }
}

export function useSuccessToast() {
  const { showToast } = useToast()
  
  return React.useCallback(
    (title: string, description?: string) => 
      showToast({ title, description, variant: "success" }),
    [showToast]
  )
}

export function useErrorToast() {
  const { showToast } = useToast()
  
  return React.useCallback(
    (title: string, description?: string) => 
      showToast({ title, description, variant: "destructive" }),
    [showToast]
  )
}

export function useWarningToast() {
  const { showToast } = useToast()
  
  return React.useCallback(
    (title: string, description?: string) => 
      showToast({ title, description, variant: "warning" }),
    [showToast]
  )
}

export function useInfoToast() {
  const { showToast } = useToast()
  
  return React.useCallback(
    (title: string, description?: string) => 
      showToast({ title, description, variant: "info" }),
    [showToast]
  )
}
