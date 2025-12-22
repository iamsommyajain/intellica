import { LabelHTMLAttributes } from "react"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label className={`block text-gray-700 font-medium mb-1 ${className}`} {...props} />
  )
}
