
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#3F521F] group-[.toaster]:text-white group-[.toaster]:border-0 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-white/90",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-[#3F521F]",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white",
          title: "group-[.toast]:text-2xl group-[.toast]:font-playfair",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
