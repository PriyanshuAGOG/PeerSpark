"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  LinkIcon,
  Edit,
  MessageSquare,
  UserPlus,
  Target,
  BookOpen,
  Users,
  Clock,
  Award,
  TrendingUp,
  Heart,
  Share2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const USER_PROFILE = {
  name: "Alex Johnson",
  username: "@alex_codes",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Full-stack developer passionate about learning and sharing knowledge. Currently diving deep into system design and distributed systems.",
  location: "San Francisco, CA",
  website: "alexjohnson.dev",
  joinedDate: "March 2023",
  followers: 1247,
  following: 892,
  isFollowing: false,
  stats: {
    studyStreak: 45,
    totalHours: 324,
    podsJoined: 8,
    resourcesShared: 23,
    postsCreated: 67,
    helpfulVotes: 189,
  },
}

const USER_ACHIEVEMENTS = [
  {
    id: "1",
    title: "Study Streak Master",
    description: "Maintained a 30+ day study streak",
    icon: "🔥",
    earned: true,
    progress: 100,
    rarity: "Epic",
  },
  {
    id: "2",
    title: "Knowledge Sharer",
    description: "Shared 20+ helpful resources",
    icon: "📚",
    earned: true,
    progress: 100,
    rarity: "Rare",
  },
  {
    id: "3",
    title: "Community Helper",
    description: "Received 100+ helpful votes",
    icon: "🤝",
    earned: true,
    progress: 100,
    rarity: "Rare",
  },
  {
    id: "4",
    title: "Pod Leader",
    description: "Successfully led a study pod",
    icon: "👑",
    earned: false,
    progress: 75,
    rarity: "Legendary",
  },
  {
    id: "5",
    title: "Mentor",
    description: "Helped 50+ students achieve their goals",
    icon: "🎓",
    earned: false,
    progress: 60,
    rarity: "Epic",
  },
  {
    id: "6",
    title: "Code Warrior",
    description: "Solved 500+ coding problems",
    icon: "⚔️",
    earned: false,
    progress: 45,
    rarity: "Legendary",
  },
]

const USER_POSTS = [
  {
    id: "1",
    title: "My Journey Learning System Design",
    content:
      "After 6 months of consistent study, I finally feel confident about system design interviews. Here's what worked for me:\n\n1. Started with basics - scalability, reliability, availability\n2. Practiced with real-world examples\n3. Joined the System Design pod for peer learning\n4. Built actual projects to apply concepts\n\nThe key was consistent practice and getting feedback from experienced engineers.",
    timestamp: "2 days ago",
    likes: 34,
    comments: 12,
    shares: 8,
    tags: ["SystemDesign", "Learning", "Interview"],
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "2",
    content:
      "Quick tip for anyone learning React: Use the React Developer Tools browser extension. It's a game-changer for debugging component state and props. You can inspect the component tree, see state changes in real-time, and even time-travel debug! 🚀",
    timestamp: "5 days ago",
    likes: 28,
    comments: 7,
    shares: 15,
    tags: ["React", "Tips", "Development"],
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    title: "Free System Design Resources",
    content:
      "Compiled a list of free resources that helped me master system design:\n\n📖 Books:\n• Designing Data-Intensive Applications\n• System Design Interview by Alex Xu\n\n🎥 Videos:\n• Gaurav Sen's System Design series\n• Tech Dummies System Design\n\n🌐 Websites:\n• High Scalability blog\n• AWS Architecture Center\n\nHope this helps someone on their journey! 💪",
    timestamp: "1 week ago",
    likes: 67,
    comments: 23,
    shares: 45,
    tags: ["SystemDesign", "Resources", "Free"],
    isLiked: true,
    isBookmarked: true,
  },
]

const USER_ACTIVITY = [
  {
    id: "1",
    type: "achievement",
    message: "Earned the 'Study Streak Master' achievement",
    timestamp: "2 hours ago",
    icon: "🏆",
  },
  {
    id: "2",
    type: "post",
    message: "Created a new post about system design learning",
    timestamp: "2 days ago",
    icon: "📝",
  },
  {
    id: "3",
    type: "pod",
    message: "Joined the 'Advanced React Patterns' pod",
    timestamp: "3 days ago",
    icon: "👥",
  },
  {
    id: "4",
    type: "resource",
    message: "Shared 'System Design Cheat Sheet' resource",
    timestamp: "5 days ago",
    icon: "📚",
  },
  {
    id: "5",
    type: "milestone",
    message: "Reached 300+ study hours milestone",
    timestamp: "1 week ago",
    icon: "🎯",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(USER_PROFILE.isFollowing)
  const { toast } = useToast()

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You unfollowed ${USER_PROFILE.name}` : `You are now following ${USER_PROFILE.name}`,
    })
  }

  const handleMessage = () => {
    toast({
      title: "Message",
      description: "Opening chat with " + USER_PROFILE.name,
    })
  }

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing feature coming soon!",
    })
  }

  const handleLike = (postId: string) => {
    toast({
      title: "Liked",
      description: "Post liked successfully!",
    })
  }

  const handleShare = (postId: string) => {
    toast({
      title: "Shared",
      description: "Post link copied to clipboard!",
    })
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-500"
      case "Rare":
        return "text-blue-500"
      case "Epic":
        return "text-purple-500"
      case "Legendary":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage src={USER_PROFILE.avatar || "/placeholder.svg"} alt={USER_PROFILE.name} />
                <AvatarFallback className="text-2xl">
                  {USER_PROFILE.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{USER_PROFILE.name}</h1>
                  <p className="text-muted-foreground text-lg">{USER_PROFILE.username}</p>
                </div>

                <p className="text-muted-foreground max-w-2xl">{USER_PROFILE.bio}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{USER_PROFILE.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-primary cursor-pointer hover:underline">{USER_PROFILE.website}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {USER_PROFILE.joinedDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="cursor-pointer hover:underline">
                    <span className="font-semibold">{USER_PROFILE.following.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">Following</span>
                  </div>
                  <div className="cursor-pointer hover:underline">
                    <span className="font-semibold">{USER_PROFILE.followers.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-1">Followers</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button onClick={handleEditProfile} variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button onClick={handleMessage} variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  onClick={handleFollow}
                  className={isFollowing ? "bg-muted hover:bg-muted/80 text-muted-foreground" : ""}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl font-bold">{USER_PROFILE.stats.studyStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold">{USER_PROFILE.stats.totalHours}</div>
              <div className="text-sm text-muted-foreground">Study Hours</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold">{USER_PROFILE.stats.podsJoined}</div>
              <div className="text-sm text-muted-foreground">Pods Joined</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold">{USER_PROFILE.stats.resourcesShared}</div>
              <div className="text-sm text-muted-foreground">Resources Shared</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {USER_POSTS.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {post.title && <h3 className="font-semibold text-lg mb-3">{post.title}</h3>}
                  <div className="text-sm mb-4 whitespace-pre-wrap">{post.content}</div>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`${post.isLiked ? "text-red-500" : ""} hover:text-red-500`}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:text-blue-500">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(post.id)}
                        className="hover:text-green-500"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {USER_ACHIEVEMENTS.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`${achievement.earned ? "border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/10" : "opacity-75"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <Badge
                            variant={achievement.earned ? "default" : "secondary"}
                            className={`text-xs ${getRarityColor(achievement.rarity)}`}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {USER_ACTIVITY.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Study Consistency</span>
                        <span className="text-sm text-muted-foreground">92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Goal Achievement</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Community Engagement</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Achievements Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">3</div>
                      <div className="text-sm text-muted-foreground">Earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-muted-foreground">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">2</div>
                      <div className="text-sm text-muted-foreground">Epic</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">1</div>
                      <div className="text-sm text-muted-foreground">Legendary</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
