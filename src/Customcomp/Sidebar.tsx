import { LayoutDashboard, Users, ClipboardList, Settings, HelpCircle } from 'lucide-react'

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Students",
    icon: Users,
    href: "/students",
  },
  {
    title: "Chapters",
    icon: ClipboardList,
    href: "/chapters",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
  {
    title: "Reports",
    icon: ClipboardList,
    href: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
 
]
export function Sidebar() {
  return (
    <div className="w-[240px] border-r bg-gray-50/40 px-3 py-4">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold">Quyl</h2>
      </div>
      <nav className="space-y-4">
        {sidebarItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </div>
        ))}
      </nav>
    </div>
  )
}
