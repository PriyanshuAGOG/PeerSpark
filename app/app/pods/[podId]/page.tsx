"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Settings,
  Crown,
  Video,
  MessageSquare,
  FolderOpen,
  Calendar,
  Share2,
  Star,
  Target,
  Download,
  Clock,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const POD_DATA = {
  "dsa-masters": {
    id: "dsa-masters",
    name: "DSA Masters",
    description: "Daily coding practice and algorithm discussions with industry experts",
    category: "Programming",
    members: 1247,
    rating: 4.9,
    difficulty: "Advanced",
    tags: ["DSA", "Algorithms", "Interview Prep", "Competitive Programming"],
    mentor: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=60&width=60",
      title: "Ex-Google SDE",
      bio: "5+ years at Google, helped 1000+ students crack tech interviews",
    },
    cover: "/placeholder.svg?height=200&width=800&text=DSA+Masters+Cover",
    isJoined: true,
    role: "Member",
    streak: 15,
    progress: 75,
    nextSession: "Today 8:00 PM",
    weeklyHours: "8-10 hours",
    features: ["Live Sessions", "1:1 Mentorship", "Mock Interviews", "Job Referrals"],
    stats: {
      totalSessions: 156,
      completionRate: 89,
      averageRating: 4.8,
      studyHours: 240,
    },
  },
}

const POD_MEMBERS = [
  {
    id: "1",
    name: "Arjun Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Member",
    streak: 22,
    joinedDate: "2 months ago",
    contributions: 45,
  },
  {
    id: "2",
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Moderator",
    streak: 18,
    joinedDate: "3 months ago",
    contributions: 67,
  },
  {
    id: "3",
    name: "Karan Singh",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Member",
    streak: 12,
    joinedDate: "1 month ago",
    contributions: 23,
  },
]

const POD_RESOURCES = [
  {
    id: "1",
    title: "Binary Trees Complete Guide",
    description: "Comprehensive guide covering all binary tree concepts and problems",
    type: "notes",
    author: "Rahul Sharma",
    uploadDate: "2 days ago",
    downloads: 234,
    size: "3.2 MB",
    thumbnail: "/placeholder.svg?height=120&width=160&text=Binary+Trees",
  },
  {
    id: "2",
    title: "Graph Algorithms Video Series",
    description: "Step-by-step video explanations of important graph algorithms",
    type: "videos",
    author: "Arjun Patel",
    uploadDate: "1 week ago",
    downloads: 156,
    size: "45 MB",
    thumbnail: "/placeholder.svg?height=120&width=160&text=Graph+Videos",
  },
  {
    id: "3",
    title: "Dynamic Programming Cheat Sheet",
    description: "Quick reference for all DP patterns and solutions",
    type: "code",
    author: "Priya Sharma",
    uploadDate: "3 days ago",
    downloads: 189,
    size: "1.1 MB",
    thumbnail: "/placeholder.svg?height=120&width=160&text=DP+Cheat+Sheet",
  },
]

const RECENT_ACTIVITIES = [
  {
    id: "1",
    type: "session",
    message: "Live session on 'Advanced Tree Algorithms' completed",
    time: "2 hours ago",
    participants: 45,
  },
  {
    id: "2",
    type: "resource",
    message: "New resource 'Binary Trees Guide' uploaded by Rahul Sharma",
    time: "1 day ago",
    downloads: 234,
  },
  {
    id: "3",
    type: "milestone",
    message: "Pod reached 1200+ members milestone!",
    time: "2 days ago",
    celebration: true,
  },
]

export default function PodDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const podId = params.podId as string

  const pod = POD_DATA[podId as keyof typeof POD_DATA]

  if (!pod) {
    return (
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Pod Not Found</h2>
            <p className="text-muted-foreground mb-4">The pod you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/app/pods")} className="bg-primary hover:bg-primary/90">
              Back to My Pods
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleJoinSession = () => {
    toast({
      title: "Joining Session",
      description: `Connecting you to ${pod.name} study session...`,
    })
  }

  const handleOpenChat = () => {
    toast({
      title: "Opening Chat",
      description: `Loading ${pod.name} chat room...`,
    })
  }

  const handleUploadResource = () => {
    toast({
      title: "Upload Resource",
      description: "Opening file picker for pod resource upload...",
    })
  }

  const handleDownloadResource = (resourceTitle: string) => {
    toast({
      title: "Downloading",
      description: `Starting download of ${resourceTitle}`,
    })
  }

  const handlePodSettings = () => {
    toast({
      title: "Pod Settings",
      description: "Opening pod management settings...",
    })
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Pod Header */}
        <div className="relative mb-8">
          <img
            src={pod.cover || "/placeholder.svg"}
            alt={`${pod.name} cover`}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <SidebarTrigger className="-ml-1 text-white hover:bg-white/20" />
              <div>
                <h1 className="text-4xl font-bold">{pod.name}</h1>
                <p className="text-lg opacity-90">{pod.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white border-white/30">
                <Users className="w-3 h-3 mr-1" />
                {pod.members.toLocaleString()} members
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Star className="w-3 h-3 mr-1" />
                {pod.rating} rating
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">{pod.difficulty}</Badge>
              {pod.role === "Leader" && (
                <Badge className="bg-yellow-500/80 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Leader
                </Badge>
              )}
            </div>
          </div>
          <div className="absolute top-6 right-6">
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={handlePodSettings}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleJoinSession}>
            <CardContent className="p-4 text-center">
              <Video className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm">Join Session</h3>
              <p className="text-xs text-muted-foreground">{pod.nextSession}</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleOpenChat}>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm">Pod Chat</h3>
              <p className="text-xs text-muted-foreground">5 new messages</p>
            </CardContent>
          </Card>
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/app/pods/${podId}/vault`)}
          >
            <CardContent className="p-4 text-center">
              <FolderOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm">Resource Vault</h3>
              <p className="text-xs text-muted-foreground">23 resources</p>
            </CardContent>
          </Card>
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push("/app/calendar")}
          >
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm">Schedule</h3>
              <p className="text-xs text-muted-foreground">View sessions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Your Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Your Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Overall Progress</span>
                          <span className="text-sm text-muted-foreground">{pod.progress}%</span>
                        </div>
                        <Progress value={pod.progress} className="w-full" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Study Streak</span>
                          <span className="text-sm text-muted-foreground">{pod.streak} days</span>
                        </div>
                        <Progress value={(pod.streak / 30) * 100} className="w-full" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{pod.stats.studyHours}</div>
                        <div className="text-sm text-muted-foreground">Study Hours</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{pod.stats.totalSessions}</div>
                        <div className="text-sm text-muted-foreground">Sessions Attended</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{pod.stats.completionRate}%</div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pod Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pod Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 md:grid-cols-2">
                      {pod.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Pod Resources</h3>
                  <Button onClick={handleUploadResource} size="sm">
                    Upload Resource
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {POD_RESOURCES.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <img
                            src={resource.thumbnail || "/placeholder.svg"}
                            alt={resource.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>By {resource.author}</span>
                              <span>{resource.size}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownloadResource(resource.title)}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Pod Members ({pod.members.toLocaleString()})</h3>
                </div>
                <div className="space-y-4">
                  {POD_MEMBERS.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h4 className="font-semibold">{member.name}</h4>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {member.role}
                                </Badge>
                                <span>•</span>
                                <span>{member.streak} day streak</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{member.contributions} contributions</div>
                            <div>Joined {member.joinedDate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="space-y-4">
                  {RECENT_ACTIVITIES.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.message}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {activity.time}
                              </span>
                              {activity.participants && (
                                <span className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {activity.participants} participants
                                </span>
                              )}
                              {activity.downloads && (
                                <span className="flex items-center">
                                  <Download className="w-3 h-3 mr-1" />
                                  {activity.downloads} downloads
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mentor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Pod Mentor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={pod.mentor.avatar || "/placeholder.svg"}
                    alt={pod.mentor.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{pod.mentor.name}</h4>
                    <p className="text-sm text-muted-foreground">{pod.mentor.title}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{pod.mentor.bio}</p>
                <Button className="w-full bg-transparent" variant="outline">
                  Message Mentor
                </Button>
              </CardContent>
            </Card>

            {/* Pod Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Pod Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-semibold">{pod.stats.averageRating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weekly Hours</span>
                  <span className="font-semibold">{pod.weeklyHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-semibold">{pod.stats.completionRate}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pod.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
