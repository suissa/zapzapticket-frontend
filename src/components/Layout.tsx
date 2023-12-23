import Title from "./Title"

interface LayoutProps {
  title: string
  children: JSX.Element
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className={`
            flex flex-col w-2/3 rounded-md
            bg-white text-gray-800
        `}>
      <Title>{title}</Title>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}