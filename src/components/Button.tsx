import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'green' | 'blue' | 'gray'
  children: any
}

export default function Button({ children, className, color = 'gray', ...props }: ButtonProps) {
  return (
    <button className={`
      bg-gradient-to-r from-blue-400 to-purple-500 text-white
      px-4 py-2 rounded-md
      ${className}
    `} {...props}>
      {children}
    </button>
  )
}