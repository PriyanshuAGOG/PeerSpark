"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, ImageIcon, FileText, Link, Hash, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreatePostModalProps {
  onPostCreated?: (post: any) => void
}

const AVAILABLE_PODS = [
  { id: "dsa-masters", name: "DSA Masters", members: 1247 },
  { id: "web-dev-pro", name: "Web Dev Pro", members: 892 },
  { id: "ai-ml-hub", name: "AI/ML Hub", members: 1456 },
  { id: "system-design", name: "System Design", members: 678 },
]

export function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [selectedPod, setSelectedPod] = useState("public-feed-only")
  const [attachments, setAttachments] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Content Required",
        description: "Please add some content to your post.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newPost = {
        id: Date.now().toString(),
        title: title || "Untitled Post",
        content,
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
          username: "@you",
        },
        timestamp: "Just now",
        likes: 0,
        comments: 0,
        shares: 0,
        tags,
        pod: selectedPod === "public-feed-only" ? null : AVAILABLE_PODS.find((p) => p.id === selectedPod),
        attachments,
        isLiked: false,
        isBookmarked: false,
      }

      onPostCreated?.(newPost)

      toast({
        title: "Post Created!",
        description: "Your post has been shared successfully.",
      })

      // Reset form
      setContent("")
      setTitle("")
      setTags([])
      setCurrentTag("")
      setSelectedPod("public-feed-only")
      setAttachments([])
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddAttachment = (type: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${type} attachment feature will be available soon!`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title (Optional)</label>
            <Input
              placeholder="Give your post a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Content *</label>
            <Textarea
              placeholder="What's on your mind? Share your thoughts, questions, or insights..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={2000}
            />
            <div className="text-xs text-muted-foreground text-right">{content.length}/2000 characters</div>
          </div>

          {/* Pod Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share to Pod (Optional)</label>
            <Select value={selectedPod} onValueChange={setSelectedPod}>
              <SelectTrigger>
                <SelectValue placeholder="Select a pod to share with..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public-feed-only">Public Feed Only</SelectItem>
                {AVAILABLE_PODS.map((pod) => (
                  <SelectItem key={pod.id} value={pod.id}>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{pod.name}</span>
                      <span className="text-muted-foreground">({pod.members} members)</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tags (Optional)</label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Add tags (press Enter)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  maxLength={20}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTag}
                disabled={!currentTag.trim() || tags.length >= 5}
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <div className="text-xs text-muted-foreground">{tags.length}/5 tags used</div>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Attachments (Coming Soon)</label>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={() => handleAddAttachment("Image")} disabled>
                <ImageIcon className="w-4 h-4 mr-2" />
                Image
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleAddAttachment("File")} disabled>
                <FileText className="w-4 h-4 mr-2" />
                File
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleAddAttachment("Link")} disabled>
                <Link className="w-4 h-4 mr-2" />
                Link
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {selectedPod === "public-feed-only" ? (
                <span>Posting to public feed</span>
              ) : (
                <span>Posting to {AVAILABLE_PODS.find((p) => p.id === selectedPod)?.name} and public feed</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!content.trim() || isSubmitting}>
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
