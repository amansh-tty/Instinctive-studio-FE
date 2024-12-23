import { cn } from "@/lib/utils"
import { Button } from "@/Customcomp/ui/button"
import { Search, Bell, MessageSquare, Settings, HelpCircle } from 'lucide-react'
import { Input } from "@/Customcomp/ui/input"
import { Sidebar } from "./Sidebar"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar Header */}
        <header className="border-b">
          <div className="flex h-16 items-center px-4 gap-4">
            {/* Search Input */}
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your course"
              className="w-[300px]"
            />

            {/* Action Buttons */}
            <div className="ml-auto flex items-center gap-4">

              {/* Messages */}
              <Button variant="ghost" size="icon">
                <span className="sr-only">Messages</span>
                <MessageSquare className="w-6 h-6" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <span className="sr-only">Notifications</span>
                <Bell className="w-6 h-6" />
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon">
                <span className="sr-only">Settings</span>
                <Settings className="w-6 h-6" />
              </Button>

              {/* Help */}
              <Button variant="ghost" size="icon">
                <span className="sr-only">Help</span>
                <HelpCircle className="w-6 h-6" />
              </Button>

              {/* Username */}
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <span className="font-medium">AS</span> 
              </div>
              <span className="font-small text-sm">Aman A Shetty</span>{/* Replace with dynamic username */}

            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-8">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
