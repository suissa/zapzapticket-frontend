import Title from "./Title"

interface LayoutProps {
  title: string
  children: JSX.Element
  width: string
}

export default function Layout({ title, children, width = "w-2/3" }: LayoutProps) {
  return (
    <div className={`
            flex flex-col ${width} rounded-md
            bg-white text-gray-800
        `}>
      <Title>{title}</Title>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}