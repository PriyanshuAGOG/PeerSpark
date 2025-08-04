"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, Star, TrendingUp, Filter, Clock, BookOpen, Video, Crown, Plus, Eye, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const CATEGORIES = [
  { id: "all", label: "All Categories", count: 156 },
  { id: "programming", label: "Programming", count: 45 },
  { id: "neet", label: "NEET Preparation", count: 32 },
  { id: "jee", label: "JEE Preparation", count: 28 },
  { id: "design", label: "Design", count: 18 },
  { id: "languages", label: "Languages", count: 15 },
  { id: "business", label: "Business", count: 12 },
  { id: "music", label: "Music", count: 6 },
]

const FEATURED_PODS = [
  {
    id: "dsa-masters-pro",
    name: "DSA Masters Pro",
    description: "Advanced data structures and algorithms with industry experts",
    category: "programming",
    members: 1247,
    rating: 4.9,
    difficulty: "Advanced",
    tags: ["DSA", "Algorithms", "Interview Prep", "Competitive Programming"],
    mentor: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Ex-Google SDE",
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=DSA+Masters+Pro",
    isVerified: true,
    isPremium: true,
    weeklyHours: "8-10 hours",
    nextSession: "Today 8:00 PM",
    price: "₹2,999/month",
    features: ["Live Sessions", "1:1 Mentorship", "Mock Interviews", "Job Referrals"],
  },
  {
    id: "neet-biology-elite",
    name: "NEET Biology Elite",
    description: "Comprehensive biology preparation with top medical college graduates",
    category: "neet",
    members: 892,
    rating: 4.8,
    difficulty: "Intermediate",
    tags: ["NEET", "Biology", "Medical", "Botany", "Zoology"],
    mentor: {
      name: "Dr. Priya Gupta",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "AIIMS Graduate",
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=NEET+Biology+Elite",
    isVerified: true,
    isPremium: true,
    weeklyHours: "12-15 hours",
    nextSession: "Tomorrow 6:00 PM",
    price: "₹3,499/month",
    features: ["Daily Tests", "Doubt Sessions", "Study Material", "Progress Tracking"],
  },
  {
    id: "ui-ux-design-hub",
    name: "UI/UX Design Hub",
    description: "Learn modern design principles and build stunning portfolios",
    category: "design",
    members: 634,
    rating: 4.7,
    difficulty: "Beginner",
    tags: ["UI/UX", "Figma", "Design Systems", "Portfolio"],
    mentor: {
      name: "Arjun Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Senior Designer at Zomato",
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=UI+UX+Design+Hub",
    isVerified: true,
    isPremium: false,
    weeklyHours: "6-8 hours",
    nextSession: "Today 7:30 PM",
    price: "Free",
    features: ["Design Challenges", "Portfolio Reviews", "Industry Insights", "Networking"],
  },
  {
    id: "jee-physics-mastery",
    name: "JEE Physics Mastery",
    description: "Master physics concepts with IIT graduates and secure your JEE rank",
    category: "jee",
    members: 756,
    rating: 4.9,
    difficulty: "Advanced",
    tags: ["JEE", "Physics", "IIT", "Problem Solving"],
    mentor: {
      name: "Karan Singh",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "IIT Delhi Graduate",
    },
    thumbnail: "/placeholder.svg?height=200&width=300&text=JEE+Physics+Mastery",
    isVerified: true,
    isPremium: true,
    weeklyHours: "10-12 hours",
    nextSession: "Today 5:00 PM",
    price: "₹2,799/month",
    features: ["Concept Building", "Problem Solving", "Mock Tests", "Rank Prediction"],
  },
]

const TRENDING_PODS = [
  {
    id: "web-dev-bootcamp",
    name: "Full Stack Web Development",
    members: 423,
    growth: "+45%",
    category: "programming",
  },
  {
    id: "english-speaking",
    name: "English Speaking Club",
    members: 312,
    growth: "+38%",
    category: "languages",
  },
  {
    id: "startup-founders",
    name: "Startup Founders Circle",
    members: 189,
    growth: "+52%",
    category: "business",
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const { toast } = useToast()
  const router = useRouter()

  const handleJoinPod = (podName: string, isPremium: boolean) => {
    if (isPremium) {
      toast({
        title: "Premium Pod",
        description: `Redirecting to payment for ${podName}...`,
      })
    } else {
      toast({
        title: "Joining Pod",
        description: `Welcome to ${podName}! Redirecting to pod dashboard...`,
      })
      router.push("/app/pods")
    }
  }

  const handleViewPod = (podId: string) => {
    toast({
      title: "Opening Pod",
      description: "Loading pod details...",
    })
    router.push(`/app/pods/${podId}`)
  }

  const filteredPods = FEATURED_PODS.filter((pod) => {
    const matchesSearch =
      pod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || pod.category === selectedCategory
    const matchesDifficulty = difficultyFilter === "all" || pod.difficulty.toLowerCase() === difficultyFilter
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && !pod.isPremium) ||
      (priceFilter === "premium" && pod.isPremium)

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="-ml-1" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Explore Pods</h2>
              <p className="text-muted-foreground">Discover amazing learning communities</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/app/pods/create")}>
              <Plus className="mr-2 h-4 w-4" />
              Create Pod
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className={`w-full justify-between ${selectedCategory === category.id ? "bg-primary" : ""}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Trending Pods */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {TRENDING_PODS.map((pod, index) => (
                  <div key={pod.id} className="flex items-center space-x-3 p-2 rounded-lg bg-secondary/50">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{pod.name}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{pod.members} members</span>
                        <Badge variant="outline" className="text-xs text-green-600">
                          {pod.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Price</label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pods</SelectItem>
                      <SelectItem value="free">Free Only</SelectItem>
                      <SelectItem value="premium">Premium Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pods, mentors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="members">Most Members</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Pods */}
            <Tabs defaultValue="featured" className="space-y-4">
              <TabsList>
                <TabsTrigger value="featured">Featured Pods</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="new">New Pods</TabsTrigger>
                <TabsTrigger value="free">Free Pods</TabsTrigger>
              </TabsList>

              <TabsContent value="featured" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredPods.map((pod) => (
                    <Card key={pod.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        {/* Thumbnail */}
                        <div className="relative">
                          <img
                            src={pod.thumbnail || "/placeholder.svg"}
                            alt={pod.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-3 left-3 flex items-center space-x-2">
                            {pod.isVerified && (
                              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                <Crown className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {pod.isPremium && (
                              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                                Premium
                              </Badge>
                            )}
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge className={getDifficultyColor(pod.difficulty)}>{pod.difficulty}</Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <div>
                            <h3 className="font-bold text-lg mb-2">{pod.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{pod.description}</p>
                          </div>

                          {/* Mentor */}
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={pod.mentor.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{pod.mentor.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{pod.mentor.name}</div>
                              <div className="text-xs text-muted-foreground">{pod.mentor.title}</div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {pod.members.toLocaleString()}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                {pod.rating}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {pod.weeklyHours}
                              </span>
                            </div>
                            <div className="font-bold text-primary">{pod.price}</div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {pod.tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {pod.tags.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{pod.tags.length - 4}
                              </Badge>
                            )}
                          </div>

                          {/* Features */}
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">What's included:</div>
                            <div className="grid grid-cols-2 gap-1">
                              {pod.features.slice(0, 4).map((feature) => (
                                <div key={feature} className="text-xs flex items-center">
                                  <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Next Session */}
                          <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                            <div>
                              <div className="text-xs font-medium">Next Session</div>
                              <div className="text-xs text-muted-foreground">{pod.nextSession}</div>
                            </div>
                            <Video className="w-4 h-4 text-muted-foreground" />
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Button
                              className="flex-1 bg-primary hover:bg-primary/90"
                              onClick={() => handleJoinPod(pod.name, pod.isPremium)}
                            >
                              {pod.isPremium ? "Join Premium" : "Join Free"}
                            </Button>
                            <Button variant="outline" className="bg-transparent" onClick={() => handleViewPod(pod.id)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" className="bg-transparent">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="space-y-4">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Personalized Recommendations</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Join a few pods to get personalized recommendations based on your interests
                    </p>
                    <Button onClick={() => router.push("/app/pods")} className="bg-primary hover:bg-primary/90">
                      View My Pods
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new" className="space-y-4">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Plus className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">New Pods Coming Soon</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Fresh learning communities are being created every day
                    </p>
                    <Button onClick={() => router.push("/app/pods/create")} className="bg-primary hover:bg-primary/90">
                      Create Your Own Pod
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="free" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredPods
                    .filter((pod) => !pod.isPremium)
                    .map((pod) => (
                      <Card key={pod.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-lg">{pod.name}</h3>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                              Free
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{pod.description}</p>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {pod.members}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                {pod.rating}
                              </span>
                            </div>
                          </div>
                          <Button
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => handleJoinPod(pod.name, false)}
                          >
                            Join Free Pod
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
