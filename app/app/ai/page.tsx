"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Calendar,
  Calculator,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  Brain,
  FileText,
  Clock,
  Target,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface StudyPlan {
  id: string
  title: string
  subject: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  topics: string[]
}

interface QuickAction {
  icon: any
  label: string
  description: string
  prompt: string
  category: string
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: Lightbulb,
    label: "Explain Concept",
    description: "Get detailed explanations of complex topics",
    prompt: "Can you explain the concept of",
    category: "Learning",
  },
  {
    icon: BookOpen,
    label: "Summarize",
    description: "Create concise summaries of study material",
    prompt: "Please summarize this topic:",
    category: "Learning",
  },
  {
    icon: Calendar,
    label: "Study Plan",
    description: "Generate personalized study schedules",
    prompt: "Create a study plan for",
    category: "Planning",
  },
  {
    icon: Calculator,
    label: "Solve Problem",
    description: "Step-by-step problem solving assistance",
    prompt: "Help me solve this problem:",
    category: "Problem Solving",
  },
  {
    icon: Target,
    label: "Set Goals",
    description: "Define and track learning objectives",
    prompt: "Help me set learning goals for",
    category: "Planning",
  },
  {
    icon: FileText,
    label: "Create Notes",
    description: "Generate structured study notes",
    prompt: "Create study notes for",
    category: "Learning",
  },
]

const SAMPLE_STUDY_PLANS: StudyPlan[] = [
  {
    id: "1",
    title: "Calculus Mastery",
    subject: "Mathematics",
    duration: "4 weeks",
    difficulty: "Intermediate",
    topics: ["Limits", "Derivatives", "Integrals", "Applications"],
  },
  {
    id: "2",
    title: "Physics Fundamentals",
    subject: "Physics",
    duration: "6 weeks",
    difficulty: "Beginner",
    topics: ["Mechanics", "Thermodynamics", "Waves", "Electricity"],
  },
  {
    id: "3",
    title: "Data Structures Deep Dive",
    subject: "Computer Science",
    duration: "8 weeks",
    difficulty: "Advanced",
    topics: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
  },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI study assistant. I'm here to help you learn, understand concepts, solve problems, and create personalized study plans. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Explain quantum physics basics",
        "Create a study schedule",
        "Help with calculus problems",
        "Generate study notes",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! Let me break this down step by step...",
        "Great question! Here's what you need to know about this topic...",
        "I can definitely help you understand this concept better. Let me explain...",
        "That's an interesting problem! Let's work through it together...",
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          responses[Math.floor(Math.random() * responses.length)] +
          ` Regarding "${messageText}", here's a comprehensive explanation with examples and practical applications...`,
        timestamp: new Date(),
        suggestions: [
          "Can you give me more examples?",
          "How can I practice this?",
          "What's the next topic to learn?",
          "Create a quiz on this topic",
        ],
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.prompt + " ")
    setActiveTab("chat")
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Message content has been copied",
    })
  }

  const handleFeedback = (messageId: string, type: "up" | "down") => {
    toast({
      title: "Feedback received",
      description: `Thank you for your ${type === "up" ? "positive" : "negative"} feedback!`,
    })
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: "1",
        type: "assistant",
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date(),
        suggestions: [
          "Explain quantum physics basics",
          "Create a study schedule",
          "Help with calculus problems",
          "Generate study notes",
        ],
      },
    ])
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset",
    })
  }

  const handleCreateStudyPlan = (plan: StudyPlan) => {
    toast({
      title: "Study Plan Created",
      description: `${plan.title} has been added to your learning path`,
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="w-8 h-8 text-primary" />
          AI Study Assistant
        </h1>
        <p className="text-muted-foreground mt-2">Your personal AI tutor for enhanced learning and productivity</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
          <TabsTrigger value="plans">Study Plans</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Chat Assistant
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={handleClearChat}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex space-x-2 max-w-[80%] ${
                        message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        {message.type === "user" ? (
                          <>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.type === "assistant" && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyMessage(message.content)}
                              className="h-6 px-2 text-xs"
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(message.id, "up")}
                              className="h-6 px-2"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleFeedback(message.id, "down")}
                              className="h-6 px-2"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="h-6 px-2 text-xs bg-background/50"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-secondary rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about your studies..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_ACTIONS.map((action) => (
              <Card key={action.label} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6" onClick={() => handleQuickAction(action)}>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{action.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {action.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_STUDY_PLANS.map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">{plan.title}</h3>
                      <p className="text-sm text-muted-foreground">{plan.subject}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          plan.difficulty === "Beginner"
                            ? "secondary"
                            : plan.difficulty === "Intermediate"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {plan.difficulty}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {plan.duration}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Topics covered:</p>
                      <div className="flex flex-wrap gap-1">
                        {plan.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button onClick={() => handleCreateStudyPlan(plan)} className="w-full" variant="outline">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Use This Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    title: "Calculus Integration Techniques",
                    timestamp: "2 hours ago",
                    messages: 12,
                  },
                  {
                    title: "Physics: Newton's Laws Explained",
                    timestamp: "Yesterday",
                    messages: 8,
                  },
                  {
                    title: "Data Structures Study Plan",
                    timestamp: "3 days ago",
                    messages: 15,
                  },
                ].map((conversation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="font-medium">{conversation.title}</h4>
                      <p className="text-sm text-muted-foreground">{conversation.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{conversation.messages} messages</Badge>
                      <Button variant="ghost" size="sm">
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
