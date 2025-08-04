"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Users, Video, Plus, ChevronLeft, ChevronRight, Filter, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const CALENDAR_EVENTS = [
  {
    id: "1",
    title: "DSA Study Session",
    description: "Dynamic Programming practice with the team",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    date: "2024-01-15",
    type: "study",
    pod: "DSA Masters",
    attendees: 8,
    isJoined: true,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Biology Mock Test",
    description: "NEET Biology practice test and discussion",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    date: "2024-01-15",
    type: "test",
    pod: "NEET Biology Squad",
    attendees: 15,
    isJoined: false,
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Design Review Session",
    description: "Portfolio review and feedback session",
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    date: "2024-01-16",
    type: "review",
    pod: "Design Thinking Hub",
    attendees: 6,
    isJoined: true,
    color: "bg-purple-500",
  },
  {
    id: "4",
    title: "Math Problem Solving",
    description: "Calculus and Linear Algebra problems",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    date: "2024-01-17",
    type: "study",
    pod: "Mathematics Hub",
    attendees: 12,
    isJoined: false,
    color: "bg-orange-500",
  },
]

const UPCOMING_SESSIONS = [
  {
    id: "1",
    title: "Physics Doubt Clearing",
    time: "Today, 4:00 PM",
    pod: "JEE Physics Mastery",
    mentor: "Dr. Karan Singh",
    attendees: 25,
  },
  {
    id: "2",
    title: "Code Review Session",
    time: "Tomorrow, 10:00 AM",
    pod: "DSA Masters",
    mentor: "Arjun Patel",
    attendees: 18,
  },
  {
    id: "3",
    title: "Spanish Conversation",
    time: "Wed, 7:00 PM",
    pod: "Spanish Learning Circle",
    mentor: "Maria Rodriguez",
    attendees: 8,
  },
]

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "list">("month")
  const [showFilters, setShowFilters] = useState(false)
  const { toast } = useToast()

  const handleJoinSession = (sessionId: string) => {
    toast({
      title: "Joined session!",
      description: "You'll receive a reminder before the session starts",
    })
  }

  const handleLeaveSession = (sessionId: string) => {
    toast({
      title: "Left session",
      description: "You can rejoin anytime before it starts",
    })
  }

  const handleCreateEvent = () => {
    toast({
      title: "Create Event",
      description: "Opening event creation form...",
    })
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return CALENDAR_EVENTS.filter((event) => event.date === dateStr)
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-20 sm:h-24 p-1 border border-border/50"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const events = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = date.toDateString() === selectedDate.toDateString()

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-20 sm:h-24 p-1 border border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors ${
            isToday ? "bg-primary/10 border-primary/30" : ""
          } ${isSelected ? "bg-secondary" : ""}`}
        >
          <div className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>{day}</div>
          <div className="space-y-1">
            {events.slice(0, 2).map((event) => (
              <div key={event.id} className={`text-xs p-1 rounded text-white truncate ${event.color}`}>
                {event.title}
              </div>
            ))}
            {events.length > 2 && <div className="text-xs text-muted-foreground">+{events.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-3">
            <SidebarTrigger className="touch-target" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Calendar</h1>
              <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="touch-target" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="touch-target">
              <Bell className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleCreateEvent}>
              <Plus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Event</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="mobile-container pb-20">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "month" | "list")}>
              <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                <TabsTrigger value="month" className="text-xs">
                  Month
                </TabsTrigger>
                <TabsTrigger value="list" className="text-xs">
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {viewMode === "month" && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="touch-target">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-sm font-medium min-w-[120px] text-center">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="touch-target">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {viewMode === "month" ? (
            <div className="space-y-4">
              {/* Calendar Grid */}
              <Card className="mobile-card">
                <CardContent className="p-2 sm:p-4">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 mb-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day} className="text-center text-xs sm:text-sm font-medium text-muted-foreground p-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-0">{renderCalendarGrid()}</div>
                </CardContent>
              </Card>

              {/* Selected Date Events */}
              {getEventsForDate(selectedDate).length > 0 && (
                <Card className="mobile-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Events for {selectedDate.toLocaleDateString()}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{event.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {event.startTime} - {event.endTime} • {event.pod}
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={event.isJoined ? "outline" : "default"}
                          onClick={() => (event.isJoined ? handleLeaveSession(event.id) : handleJoinSession(event.id))}
                        >
                          {event.isJoined ? "Leave" : "Join"}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* List View */}
              {CALENDAR_EVENTS.map((event) => (
                <Card key={event.id} className="mobile-card hover:shadow-md transition-shadow">
                  <CardContent className="mobile-padding">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div className={`w-4 h-4 rounded-full ${event.color} mt-1 flex-shrink-0`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-sm truncate">{event.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{event.description}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="w-3 h-3" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {event.pod}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-3">
                        <Button
                          size="sm"
                          variant={event.isJoined ? "outline" : "default"}
                          onClick={() => (event.isJoined ? handleLeaveSession(event.id) : handleJoinSession(event.id))}
                          className="touch-target"
                        >
                          {event.isJoined ? "Leave" : "Join"}
                        </Button>
                        <Button variant="ghost" size="sm" className="touch-target">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Upcoming Sessions */}
          <Card className="mobile-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {UPCOMING_SESSIONS.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{session.mentor[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{session.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {session.time} • {session.mentor}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {session.attendees} attending • {session.pod}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => handleJoinSession(session.id)}>
                    Join
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
