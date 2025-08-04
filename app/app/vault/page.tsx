"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FolderOpen,
  Search,
  Upload,
  Filter,
  Grid3X3,
  List,
  FileText,
  ImageIcon,
  Video,
  Code,
  BookOpen,
  Download,
  Share2,
  Star,
  Eye,
  Clock,
  Heart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const RESOURCE_TYPES = [
  { id: "all", label: "All", icon: FolderOpen },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "videos", label: "Videos", icon: Video },
  { id: "code", label: "Code", icon: Code },
  { id: "flashcards", label: "Flashcards", icon: BookOpen },
]

const RESOURCES = [
  {
    id: "1",
    title: "Advanced Data Structures Notes",
    description: "Comprehensive notes covering trees, graphs, and advanced algorithms",
    type: "notes",
    format: "pdf",
    size: "2.4 MB",
    author: {
      name: "Arjun Patel",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    pod: "DSA Masters",
    tags: ["DSA", "Trees", "Graphs", "Algorithms"],
    uploadDate: "2 days ago",
    views: 234,
    likes: 45,
    comments: 12,
    downloads: 89,
    isBookmarked: true,
    visibility: "public",
    thumbnail: "/placeholder.svg?height=120&width=160&text=PDF+Notes",
  },
  {
    id: "2",
    title: "Cell Biology Diagrams",
    description: "High-quality diagrams for cell structure and organelles",
    type: "images",
    format: "png",
    size: "5.2 MB",
    author: {
      name: "Riya Sharma",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    pod: "NEET Biology Squad",
    tags: ["Biology", "Cell", "Diagrams", "NEET"],
    uploadDate: "1 day ago",
    views: 156,
    likes: 67,
    comments: 8,
    downloads: 123,
    isBookmarked: false,
    visibility: "pod",
    thumbnail: "/placeholder.svg?height=120&width=160&text=Cell+Diagrams",
  },
  {
    id: "3",
    title: "React Hooks Cheat Sheet",
    description: "Quick reference for all React hooks with examples",
    type: "code",
    format: "md",
    size: "156 KB",
    author: {
      name: "Priya Gupta",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    pod: "Web Dev Fundamentals",
    tags: ["React", "Hooks", "JavaScript", "Cheat Sheet"],
    uploadDate: "3 days ago",
    views: 345,
    likes: 89,
    comments: 23,
    downloads: 167,
    isBookmarked: true,
    visibility: "public",
    thumbnail: "/placeholder.svg?height=120&width=160&text=React+Code",
  },
  {
    id: "4",
    title: "Physics Formula Flashcards",
    description: "Interactive flashcards for important physics formulas",
    type: "flashcards",
    format: "json",
    size: "89 KB",
    author: {
      name: "Karan Singh",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    pod: "JEE Physics",
    tags: ["Physics", "Formulas", "JEE", "Flashcards"],
    uploadDate: "5 days ago",
    views: 278,
    likes: 56,
    comments: 15,
    downloads: 134,
    isBookmarked: false,
    visibility: "private",
    thumbnail: "/placeholder.svg?height=120&width=160&text=Flashcards",
  },
  {
    id: "5",
    title: "UI Design System Video Tutorial",
    description: "Complete walkthrough of building a design system",
    type: "videos",
    format: "mp4",
    size: "125 MB",
    author: {
      name: "Design Master",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    pod: "Design Thinking Hub",
    tags: ["UI/UX", "Design System", "Tutorial", "Video"],
    uploadDate: "1 week ago",
    views: 567,
    likes: 123,
    comments: 34,
    downloads: 89,
    isBookmarked: true,
    visibility: "public",
    thumbnail: "/placeholder.svg?height=120&width=160&text=Video+Tutorial",
  },
]

const FOLDERS = [
  { name: "My Notes", count: 23, icon: FileText },
  { name: "Shared Resources", count: 45, icon: Share2 },
  { name: "Bookmarked", count: 12, icon: Star },
  { name: "Recent", count: 8, icon: Clock },
]

export default function VaultPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("recent")
  const { toast } = useToast()

  const handleUpload = () => {
    toast({
      title: "Upload Resource",
      description: "Opening file picker...",
    })
  }

  const handleDownload = (resourceTitle: string) => {
    toast({
      title: "Downloading",
      description: `Starting download of ${resourceTitle}`,
    })
  }

  const handleLike = (resourceTitle: string) => {
    toast({
      title: "Resource Liked",
      description: `Added ${resourceTitle} to your liked resources`,
    })
  }

  const handleBookmark = (resourceTitle: string) => {
    toast({
      title: "Resource Bookmarked",
      description: `Saved ${resourceTitle} to your bookmarks`,
    })
  }

  const filteredResources = RESOURCES.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    const typeMap = {
      notes: FileText,
      images: ImageIcon,
      videos: Video,
      code: Code,
      flashcards: BookOpen,
    }
    const Icon = typeMap[type as keyof typeof typeMap] || FileText
    return <Icon className="w-4 h-4" />
  }

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "public":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pod":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "private":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
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
              <h2 className="text-3xl font-bold tracking-tight">Resource Vault</h2>
              <p className="text-muted-foreground">Your centralized learning library</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90">
              <Upload className="mr-2 h-4 w-4" />
              Upload Resource
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Folders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {FOLDERS.map((folder) => (
                  <Button key={folder.name} variant="ghost" className="w-full justify-start">
                    <folder.icon className="w-4 h-4 mr-3" />
                    <span className="flex-1 text-left">{folder.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {folder.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Resource Types */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resource Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {RESOURCE_TYPES.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "ghost"}
                    className={`w-full justify-start ${selectedType === type.id ? "bg-primary" : ""}`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <type.icon className="w-4 h-4 mr-3" />
                    {type.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Storage Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Storage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Used</span>
                  <span>2.4 GB / 5 GB</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "48%" }}></div>
                </div>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Upgrade Storage
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources, tags, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                    <SelectItem value="alphabetical">A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-primary" : ""}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-primary" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Resources */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          {/* Thumbnail */}
                          <div className="relative mb-3">
                            <img
                              src={resource.thumbnail || "/placeholder.svg"}
                              alt={resource.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className={getVisibilityColor(resource.visibility)}>{resource.visibility}</Badge>
                            </div>
                            <div className="absolute top-2 right-2">
                              <div className="bg-black/50 rounded-full p-1">{getTypeIcon(resource.type)}</div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold text-sm line-clamp-2">{resource.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{resource.description}</p>
                            </div>

                            {/* Author and Pod */}
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={resource.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{resource.author.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{resource.author.name}</span>
                              {resource.pod && (
                                <>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {resource.pod}
                                  </Badge>
                                </>
                              )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                              {resource.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {resource.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{resource.tags.length - 3}
                                </Badge>
                              )}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-3">
                                <span className="flex items-center">
                                  <Eye className="w-3 h-3 mr-1" />
                                  {resource.views}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="w-3 h-3 mr-1" />
                                  {resource.likes}
                                </span>
                                <span className="flex items-center">
                                  <Download className="w-3 h-3 mr-1" />
                                  {resource.downloads}
                                </span>
                              </div>
                              <span>{resource.size}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="flex-1 bg-primary hover:bg-primary/90"
                                onClick={() => handleDownload(resource.title)}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleLike(resource.title)}
                                className="bg-transparent"
                              >
                                <Heart className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookmark(resource.title)}
                                className="bg-transparent"
                              >
                                <Star className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            {/* Thumbnail */}
                            <img
                              src={resource.thumbnail || "/placeholder.svg"}
                              alt={resource.title}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-sm truncate">{resource.title}</h3>
                                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                    {resource.description}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <Avatar className="w-5 h-5">
                                      <AvatarImage src={resource.author.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-xs">{resource.author.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">{resource.author.name}</span>
                                    <span className="text-xs text-muted-foreground">•</span>
                                    <span className="text-xs text-muted-foreground">{resource.uploadDate}</span>
                                    <Badge className={getVisibilityColor(resource.visibility)}>
                                      {resource.visibility}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Stats and Actions */}
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <span className="flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {resource.views}
                                  </span>
                                  <span className="flex items-center">
                                    <Heart className="w-3 h-3 mr-1" />
                                    {resource.likes}
                                  </span>
                                  <span className="flex items-center">
                                    <Download className="w-3 h-3 mr-1" />
                                    {resource.downloads}
                                  </span>
                                  <span>{resource.size}</span>
                                  <Button
                                    size="sm"
                                    onClick={() => handleDownload(resource.title)}
                                    className="bg-primary hover:bg-primary/90"
                                  >
                                    <Download className="w-3 h-3 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="my-uploads" className="space-y-4">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No uploads yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Start sharing your knowledge with the community
                    </p>
                    <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Your First Resource
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarked" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources
                    .filter((r) => r.isBookmarked)
                    .map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={getVisibilityColor(resource.visibility)}>{resource.visibility}</Badge>
                            <Star className="w-4 h-4 text-accent fill-current" />
                          </div>
                          <h3 className="font-semibold text-sm mb-2">{resource.title}</h3>
                          <p className="text-xs text-muted-foreground mb-3">{resource.description}</p>
                          <Button
                            size="sm"
                            className="w-full bg-primary hover:bg-primary/90"
                            onClick={() => handleDownload(resource.title)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Viewed</CardTitle>
                    <CardDescription>Resources you've accessed in the last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredResources.slice(0, 5).map((resource) => (
                      <div key={resource.id} className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{resource.title}</h4>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>Viewed {resource.uploadDate}</span>
                            <span>•</span>
                            <span>{resource.size}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
