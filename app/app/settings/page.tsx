"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Globe, Download, Trash2, Upload, Crown, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    name: "Kundan Singh",
    username: "kundan_learner",
    email: "kundan@example.com",
    bio: "Passionate learner exploring DSA and Biology. Love helping others in study pods!",
    location: "Mumbai, India",
    website: "https://kundan.dev",
  })

  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showStudyStats: true,
    allowPodInvites: true,
    showOnlineStatus: false,
    allowDirectMessages: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    podUpdates: true,
    socialNotifications: false,
    weeklyDigest: true,
  })

  const { toast } = useToast()

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be ready for download shortly.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive",
    })
  }

  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="-ml-1" />
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="flex items-center">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-2xl">KS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Tell others about yourself..."
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your information and interact with you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Allow others to find and view your profile</p>
                    </div>
                    <Switch
                      checked={privacySettings.profilePublic}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, profilePublic: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Study Statistics</Label>
                      <p className="text-sm text-muted-foreground">
                        Display your study hours and streaks on your profile
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showStudyStats}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showStudyStats: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Pod Invitations</Label>
                      <p className="text-sm text-muted-foreground">Let others invite you to join their study pods</p>
                    </div>
                    <Switch
                      checked={privacySettings.allowPodInvites}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, allowPodInvites: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Online Status</Label>
                      <p className="text-sm text-muted-foreground">Display when you're online to other users</p>
                    </div>
                    <Switch
                      checked={privacySettings.showOnlineStatus}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, showOnlineStatus: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Direct Messages</Label>
                      <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
                    </div>
                    <Switch
                      checked={privacySettings.allowDirectMessages}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, allowDirectMessages: checked })
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleSavePrivacy} className="bg-primary hover:bg-primary/90">
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Session Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about upcoming study sessions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.sessionReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, sessionReminders: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Pod Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications about your pod activities</p>
                    </div>
                    <Switch
                      checked={notificationSettings.podUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, podUpdates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Social Notifications</Label>
                      <p className="text-sm text-muted-foreground">Likes, comments, and social interactions</p>
                    </div>
                    <Switch
                      checked={notificationSettings.socialNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, socialNotifications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Weekly summary of your learning progress</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, weeklyDigest: checked })
                      }
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications} className="bg-primary hover:bg-primary/90">
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how PeerSpark looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Theme</Label>
                      <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                    </div>
                    <ThemeToggle />
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option value="small">Small</option>
                      <option value="medium" selected>
                        Medium
                      </option>
                      <option value="large">Large</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option value="en" selected>
                        English
                      </option>
                      <option value="hi">हिंदी</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                      <option value="ist" selected>
                        India Standard Time (IST)
                      </option>
                      <option value="utc">Coordinated Universal Time (UTC)</option>
                      <option value="est">Eastern Standard Time (EST)</option>
                      <option value="pst">Pacific Standard Time (PST)</option>
                    </select>
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90">Save Appearance Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your account security and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>

                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Enable Two-Factor Authentication
                  </Button>

                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Globe className="w-4 h-4 mr-2" />
                    Connected Accounts
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Export or delete your account data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" onClick={handleExportData} className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export My Data
                </Button>

                <Button variant="destructive" onClick={handleDeleteAccount} className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="premium" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-accent" />
                  Premium Membership
                </CardTitle>
                <CardDescription>You're currently on the Premium plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <h3 className="font-semibold text-accent mb-2">Premium Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-accent" />
                      Unlimited AI assistant queries
                    </li>
                    <li className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-accent" />
                      Priority pod matching
                    </li>
                    <li className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-accent" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-accent" />
                      Exclusive premium pods
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Current Plan</span>
                    <Badge variant="secondary">Premium Monthly</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next Billing Date</span>
                    <span className="text-sm text-muted-foreground">February 15, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Amount</span>
                    <span className="font-semibold">₹299/month</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Cancel Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
