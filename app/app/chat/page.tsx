"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Search,
  Plus,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Bell,
  Settings,
  ArrowLeft,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const DM_CONVERSATIONS = [
  {
    id: "1",
    name: "Riya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for sharing those notes!",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Arjun Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you help me with this problem?",
    timestamp: "15 min ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Priya Gupta",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great work on the design!",
    timestamp: "1 hour ago",
    unread: 1,
    online: false,
  },
]

const POD_CHATS = [
  {
    id: "dsa-masters",
    name: "DSA Masters",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "New coding challenge posted!",
    timestamp: "5 min ago",
    unread: 5,
    members: 24,
    type: "pod",
  },
  {
    id: "neet-biology",
    name: "NEET Biology Squad",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Mock test results are out",
    timestamp: "30 min ago",
    unread: 12,
    members: 18,
    type: "pod",
  },
  {
    id: "design-hub",
    name: "Design Thinking Hub",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Portfolio review session tomorrow",
    timestamp: "2 hours ago",
    unread: 3,
    members: 12,
    type: "pod",
  },
]

const SAMPLE_MESSAGES = [
  {
    id: "1",
    sender: "Riya Sharma",
    content: "Hey! Did you check out the new biology notes I shared?",
    timestamp: "10:30 AM",
    isMe: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    sender: "You",
    content: "Yes! They're really helpful. Thanks for sharing!",
    timestamp: "10:32 AM",
    isMe: true,
  },
  {
    id: "3",
    sender: "Riya Sharma",
    content: "No problem! Let me know if you need help with anything else.",
    timestamp: "10:35 AM",
    isMe: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    sender: "You",
    content: "Actually, I'm struggling with the photosynthesis chapter. Any tips?",
    timestamp: "10:40 AM",
    isMe: true,
  },
]

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dms")
  const [messages, setMessages] = useState(SAMPLE_MESSAGES)
  const { toast } = useToast()

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      content: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")

    toast({
      title: "Message sent",
      description: "Your message has been delivered",
    })
  }

  const handleStartCall = (type: "voice" | "video") => {
    toast({
      title: `Starting ${type} call`,
      description: "Connecting...",
    })
  }

  const filteredDMs = DM_CONVERSATIONS.filter((conv) => conv.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const filteredPods = POD_CHATS.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const selectedConversation = selectedChat
    ? [...DM_CONVERSATIONS, ...POD_CHATS].find((c) => c.id === selectedChat)
    : null

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <SidebarTrigger className="touch-target" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Chat</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Messages & Pod Chats</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="touch-target">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="touch-target">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat List Sidebar */}
        <div
          className={`${selectedChat ? "hidden sm:block" : "block"} w-full sm:w-80 border-r border-border bg-background`}
        >
          <div className="p-3 sm:p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="dms" className="text-xs">
                  Direct Messages
                </TabsTrigger>
                <TabsTrigger value="pods" className="text-xs">
                  Pod Chats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dms" className="mt-4">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-2">
                    {filteredDMs.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedChat(conversation.id)}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors touch-target ${
                          selectedChat === conversation.id ? "bg-secondary" : ""
                        }`}
                      >
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">{conversation.name}</h4>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate flex-1">{conversation.lastMessage}</p>
                            {conversation.unread > 0 && (
                              <Badge variant="destructive" className="text-xs ml-2">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="pods" className="mt-4">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-2">
                    {filteredPods.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat.id)}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors touch-target ${
                          selectedChat === chat.id ? "bg-secondary" : ""
                        }`}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{chat.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">{chat.name}</h4>
                            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">{chat.members}</span>
                              {chat.unread > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedChat ? "block" : "hidden sm:block"} flex-1 flex flex-col`}>
          {selectedChat && selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-background">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="sm:hidden touch-target"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{selectedConversation.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {"members" in selectedConversation
                        ? `${selectedConversation.members} members`
                        : selectedConversation.online
                          ? "Online"
                          : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="touch-target" onClick={() => handleStartCall("voice")}>
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="touch-target" onClick={() => handleStartCall("video")}>
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="touch-target">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-3 sm:p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${message.isMe ? "justify-end" : "justify-start"}`}
                    >
                      {!message.isMe && (
                        <Avatar className="w-6 h-6 mt-1">
                          <AvatarImage src={message.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{message.sender[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                          message.isMe ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                      </div>
                      {message.isMe && (
                        <Avatar className="w-6 h-6 mt-1">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-3 sm:p-4 border-t border-border bg-background">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="touch-target">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm" className="touch-target">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 touch-target"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground text-sm">
                  Choose a conversation from the sidebar to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
