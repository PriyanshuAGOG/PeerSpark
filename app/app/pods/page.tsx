"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  Plus,
  MessageSquare,
  Video,
  FolderOpen,
  Settings,
  Crown,
  Flame,
  Clock,
  BookOpen,
  Target,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const MY_PODS = [
  {
    id: "dsa-masters",
    name: "DSA Masters",
    description: "Daily coding practice and algorithm discussions",
    members: 24,
    streak: 15,
    role: "Member",
    nextSession: "Today 8:00 PM",
    unreadMessages: 5,
    avatar: "/placeholder.svg?height=60&width=60",
    tags: ["DSA", "Coding", "Interview Prep"],
    progress: 75,
    isActive: true,
  },
  {
    id: "neet-biology",
    name: "NEET Biology Squad",
    description: "Comprehensive biology preparation for NEET",
    members: 18,
    streak: 22,
    role: "Moderator",
    nextSession: "Tomorrow 6:00 PM",
    unreadMessages: 12,
    avatar: "/placeholder.svg?height=60&width=60",
    tags: ["NEET", "Biology", "Medical"],
    progress: 60,
    isActive: true,
  },
  {
    id: "design-hub",
    name: "Design Thinking Hub",
    description: "UI/UX design principles and portfolio building",
    members: 12,
    streak: 8,
    role: "Leader",
    nextSession: "Today 7:30 PM",
    unreadMessages: 3,
    avatar: "/placeholder.svg?height=60&width=60",
    tags: ["UI/UX", "Design", "Portfolio"],
    progress: 90,
    isActive: false,
  },
]

const RECENT_ACTIVITY = [
  {
    id: "1",
    type: "session",
    pod: "DSA Masters",
    message: "Completed 2-hour coding session",
    time: "2 hours ago",
    icon: Video,
  },
  {
    id: "2",
    type: "message",
    pod: "NEET Biology Squad",
    message: "New resource shared: Cell Biology Notes",
    time: "4 hours ago",
    icon: MessageSquare,
  },
  {
    id: "3",
    type: "achievement",
    pod: "Design Thinking Hub",
    message: "Earned 'Consistent Learner' badge",
    time: "1 day ago",
    icon: Target,
  },
]

export default function PodsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const { toast } = useToast()

  const handleJoinSession = (podName: string) => {
    toast({
      title: "Joining Session",
      description: `Connecting you to ${podName} study session...`,
    })
  }

  const handleOpenChat = (podName: string) => {
    toast({
      title: "Opening Chat",
      description: `Loading ${podName} chat...`,
    })
  }

  const filteredPods = MY_PODS.filter(
    (pod) =>
      pod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <SidebarTrigger className="touch-target" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold">My Pods</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Your learning communities</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="touch-target" onClick={() => setShowSearch(!showSearch)}>
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="touch-target">
              <Bell className="w-4 h-4" />
            </Button>
            <Link href="/app/explore">
              <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <Search className="mr-2 h-4 w-4" />
                Explore
              </Button>
            </Link>
            <Link href="/app/pods/create">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="px-3 pb-3 sm:px-4 sm:pb-4 animate-fade-in">
            <Input
              placeholder="Search your pods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        )}
      </div>

      <div className="mobile-container pb-20">
        <div className="max-w-4xl mx-auto space-y-4">
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 h-10">
              <TabsTrigger value="active" className="text-xs font-medium">
                Active Pods
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-xs font-medium">
                Activity
              </TabsTrigger>
              <TabsTrigger value="archived" className="text-xs font-medium">
                Archived
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4">
                {filteredPods.map((pod) => (
                  <Card key={pod.id} className="mobile-card hover:shadow-md transition-shadow">
                    <CardContent className="mobile-padding">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                            <AvatarImage src={pod.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{pod.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-sm sm:text-base">{pod.name}</h3>
                              {pod.isActive && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={pod.role === "Leader" ? "default" : "secondary"} className="text-xs">
                                {pod.role === "Leader" && <Crown className="w-3 h-3 mr-1" />}
                                {pod.role}
                              </Badge>
                              {pod.unreadMessages > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {pod.unreadMessages}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="touch-target p-1">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">{pod.description}</p>

                      <div className="flex items-center justify-between text-xs mb-3">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {pod.members}
                          </span>
                          <span className="flex items-center text-accent">
                            <Flame className="w-3 h-3 mr-1" />
                            {pod.streak}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">Progress: {pod.progress}%</div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {pod.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="flex items-center text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {pod.nextSession}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-primary hover:bg-primary/90"
                          onClick={() => handleJoinSession(pod.name)}
                        >
                          <Video className="w-3 h-3 mr-2" />
                          Join
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => handleOpenChat(pod.name)}
                        >
                          <MessageSquare className="w-3 h-3 mr-2" />
                          Chat
                        </Button>
                      </div>

                      <Link href={`/app/pods/${pod.id}`}>
                        <Button variant="ghost" size="sm" className="w-full mt-2">
                          <FolderOpen className="w-3 h-3 mr-2" />
                          Open Dashboard
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="mobile-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                  <CardDescription className="text-sm">Your latest pod interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {RECENT_ACTIVITY.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{activity.pod}</span>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.message}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              <Card className="mobile-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Archived Pods</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    Pods you leave or complete will appear here for future reference.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
