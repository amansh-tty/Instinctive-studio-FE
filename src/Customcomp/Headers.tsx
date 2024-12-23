import { Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/Customcomp/ui/avatar"
import { Input } from "@/Customcomp/ui/input"

export function Header() {
  return (
    <header className="border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your course"
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>HD</AvatarFallback>
          </Avatar>
          <span className="font-medium">Madeline H. Dancy</span>
        </div>
      </div>
    </header>
  )
}

