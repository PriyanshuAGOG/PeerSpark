"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, BookOpen, Users, Calendar, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "suggestion" | "action"
}

const QUICK_ACTIONS = [
  {
    icon: BookOpen,
    label: "Study Plan",
    description: "Create a personalized study plan",
    action: "create-study-plan",
  },
  {
    icon: Users,
    label: "Find Pods",
    description: "Discover relevant study pods",
    action: "find-pods",
  },
  {
    icon: Calendar,
    label: "Schedule",
    description: "Plan your study sessions",
    action: "schedule-sessions",
  },
  {
    icon: Target,
    label: "Set Goals",
    description: "Define learning objectives",
    action: "set-goals",
  },
]

const AI_RESPONSES = {
  "create-study-plan":
    "I'd be happy to help you create a personalized study plan! What subject or skill would you like to focus on? Please share your current level, available time per day, and your target goals.",
  "find-pods":
    "Let me help you find the perfect study pods! What are you interested in learning? Some popular categories include:\n\n• Programming & Tech\n• Data Science & AI\n• Business & Finance\n• Design & Creative\n• Languages\n• Academic Subjects\n\nWhat catches your interest?",
  "schedule-sessions":
    "Great! Let's organize your study schedule. I can help you:\n\n• Plan daily study blocks\n• Set up pod session reminders\n• Balance different subjects\n• Track your progress\n\nWhat's your preferred study time and how many hours can you dedicate daily?",
  "set-goals":
    "Setting clear goals is crucial for success! Let's define your learning objectives:\n\n• Short-term goals (1-4 weeks)\n• Medium-term goals (1-3 months)\n• Long-term goals (3+ months)\n\nWhat would you like to achieve first?",
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI study assistant. I can help you create study plans, find the right pods, schedule sessions, and track your progress. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const pathname = usePathname()

  // Hide AI assistant on certain pages
  const shouldHideAssistant = pathname?.includes("/chat") || pathname?.includes("/settings")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("study plan") || lowerInput.includes("plan")) {
      return "I can help you create an effective study plan! To get started, I need to know:\n\n• What subject/skill you want to focus on\n• Your current experience level\n• How much time you can dedicate daily\n• Your target deadline or goals\n\nOnce I have this info, I'll create a personalized roadmap for you!"
    }

    if (lowerInput.includes("pod") || lowerInput.includes("group")) {
      return "Looking for study pods? Here are some popular ones based on your interests:\n\n🔥 **Trending Pods:**\n• DSA Masters - Algorithm practice\n• Web Dev Pro - Full-stack development\n• AI/ML Hub - Machine learning\n• System Design - Architecture patterns\n\nWould you like me to recommend pods based on your specific interests?"
    }

    if (lowerInput.includes("schedule") || lowerInput.includes("time")) {
      return "Let's optimize your study schedule! I recommend:\n\n📅 **Daily Structure:**\n• Morning: Focus sessions (2-3 hours)\n• Afternoon: Pod activities & discussions\n• Evening: Review & practice (1-2 hours)\n\n⏰ **Weekly Goals:**\n• 5-6 study days per week\n• 1-2 rest days for consolidation\n\nWhat's your current availability?"
    }

    if (lowerInput.includes("progress") || lowerInput.includes("track")) {
      return "Great question! Here's how to track your progress effectively:\n\n📊 **Key Metrics:**\n• Daily study hours completed\n• Pod session attendance\n• Practice problems solved\n• Concepts mastered\n\n🎯 **Weekly Reviews:**\n• Assess goal completion\n• Identify knowledge gaps\n• Adjust study plan as needed\n\nWould you like me to set up progress tracking for you?"
    }

    return "That's an interesting question! I'm here to help you with:\n\n• Creating personalized study plans\n• Finding the right study pods\n• Scheduling and time management\n• Tracking your learning progress\n• Answering study-related questions\n\nCould you be more specific about what you'd like help with?"
  }

  const handleQuickAction = (action: string) => {
    const response = AI_RESPONSES[action as keyof typeof AI_RESPONSES]
    if (response) {
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, aiMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (shouldHideAssistant) {
    return null
  }

  return (
    <>
      {/* AI Assistant Trigger Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 z-40"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* AI Assistant Chat Window */}
      {isOpen && (
        <Card
          className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 w-80 md:w-96 shadow-2xl z-50 transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[500px]"
          }`}
        >
          <CardHeader className="p-4 pb-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-sm font-medium">AI Study Assistant</CardTitle>
                <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[calc(500px-60px)]">
              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="p-4 border-b bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-3">Quick actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_ACTIONS.map((action) => (
                      <Button
                        key={action.action}
                        variant="outline"
                        size="sm"
                        className="h-auto p-2 flex flex-col items-start text-left bg-transparent"
                        onClick={() => handleQuickAction(action.action)}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <action.icon className="h-3 w-3" />
                          <span className="text-xs font-medium">{action.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{action.description}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div
                          className={`text-xs mt-1 opacity-70 ${
                            message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Ask me anything about studying..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 text-sm"
                    disabled={isTyping}
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="h-9 w-9"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  )
}
