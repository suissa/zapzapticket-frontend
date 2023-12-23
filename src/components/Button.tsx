import { ButtonHTMLAttributes } from "react"

interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'green' | 'blue' | 'gray'
    children: any
}

export default function Botao({ children, className, color = 'gray', ...props }: BotaoProps) {
    return (
        <button className={`
            bg-gradient-to-r from-${color}-400 to-${color}-700 text-white
            px-4 py-2 rounded-md
            ${className}
        `} {...props}>
            {children}
        </button>
    )
}