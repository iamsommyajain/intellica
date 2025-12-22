import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition",
        variant === "primary" && "bg-orange-500 text-white hover:bg-maroon",
        variant === "secondary" && "bg-orange-500 text-white hover:bg-maroon",
        variant === "outline" &&
          "border border-maroon text-maroon bg-transparent hover:bg-maroon hover:text-white",
        className
      )}
      {...props}
    />
  );
}
