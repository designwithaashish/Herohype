
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-[#3F521F] border-0 text-white shadow-lg">
            <div className="grid gap-1">
              {title && <ToastTitle className="font-playfair text-xl">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-white/90">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-white/80 hover:text-white" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
