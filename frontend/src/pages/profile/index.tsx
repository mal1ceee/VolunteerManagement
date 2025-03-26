import PageHead from '@/components/shared/page-head';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

// Sample user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'JD',
  role: 'Volunteer',
  bio: 'Passionate about making a positive impact in my community through volunteering. Experienced in environmental conservation and community outreach programs.',
  phone: '(123) 456-7890',
  location: 'New York, NY',
  joined: 'January 2023',
  skills: [
    'Environmental Conservation',
    'Event Planning',
    'Community Outreach',
    'First Aid',
    'Public Speaking'
  ],
  interests: ['Environment', 'Education', 'Elderly Care', 'Animal Welfare'],
  languages: ['English (Fluent)', 'Spanish (Intermediate)']
};

// Sample volunteer statistics
const volunteerStats = {
  eventsCompleted: 18,
  totalHours: 145,
  organizations: 5,
  upcomingEvents: 3,
  impact: {
    treesPlanted: 25,
    mealsServed: 120,
    peopleHelped: 85
  }
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    bio: userData.bio
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Here you would typically send the updated profile to your backend
    setIsEditing(false);
  };

  return (
    <>
      <PageHead title="My Profile | Volunteer Connect" />
      <div className="flex-1 space-y-4 p-4 pb-10 pt-6 md:p-8 md:pb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>

        {/* Profile Overview Card */}
        <Card>
          <CardHeader className="pb-0">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Avatar className="h-24 w-24 text-2xl">
                <AvatarImage
                  src="/profile-placeholder.png"
                  alt="Profile picture"
                />
                <AvatarFallback className="text-2xl">
                  {userData.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <Badge variant="outline" className="w-fit">
                      {userData.role}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Joined {userData.joined}
                    </span>
                  </div>
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-3 sm:ml-auto">
                <div className="flex min-w-20 flex-col items-center justify-center rounded-lg bg-muted p-2">
                  <span className="text-xl font-bold">
                    {volunteerStats.eventsCompleted}
                  </span>
                  <span className="text-xs text-muted-foreground">Events</span>
                </div>
                <div className="flex min-w-20 flex-col items-center justify-center rounded-lg bg-muted p-2">
                  <span className="text-xl font-bold">
                    {volunteerStats.totalHours}
                  </span>
                  <span className="text-xs text-muted-foreground">Hours</span>
                </div>
                <div className="flex min-w-20 flex-col items-center justify-center rounded-lg bg-muted p-2">
                  <span className="text-xl font-bold">
                    {volunteerStats.organizations}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Organizations
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="info" className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Personal Info</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and public profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                          Full Name
                        </h4>
                        <p>{userData.name}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                          Email Address
                        </h4>
                        <p>{userData.email}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                          Phone Number
                        </h4>
                        <p>{userData.phone}</p>
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                          Location
                        </h4>
                        <p>{userData.location}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-muted-foreground">
                        Bio
                      </h4>
                      <p className="text-sm">{userData.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              {isEditing && (
                <CardFooter className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              )}
            </Card>

            {/* Skills and Interests Card */}
            <Card>
              <CardHeader>
                <CardTitle>Skills &amp; Interests</CardTitle>
                <CardDescription>
                  Your volunteering skills and areas of interest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                        Add Skill
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {userData.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                        Add Interest
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {userData.languages.map((language, index) => (
                        <Badge key={index} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M12 5v14M5 12h14"></path>
                        </svg>
                        Add Language
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about events and organizations
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">
                      Push Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">Event Reminders</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders before your scheduled events
                    </p>
                  </div>
                  <Switch id="event-reminders" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">New Opportunities</h3>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new volunteer opportunities
                    </p>
                  </div>
                  <Switch id="new-opportunities" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Volunteer Preferences</CardTitle>
                <CardDescription>
                  Set your volunteer availability and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select defaultValue="weekends">
                    <SelectTrigger id="availability">
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekends">Weekends Only</SelectItem>
                      <SelectItem value="weekdays">Weekdays Only</SelectItem>
                      <SelectItem value="evenings">Evenings Only</SelectItem>
                      <SelectItem value="anytime">Anytime</SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Maximum Distance</Label>
                  <Select defaultValue="10">
                    <SelectTrigger id="distance">
                      <SelectValue placeholder="Select maximum distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                      <SelectItem value="25">Within 25 miles</SelectItem>
                      <SelectItem value="50">Within 50 miles</SelectItem>
                      <SelectItem value="any">Any Distance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select how often you want to volunteer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Impact</CardTitle>
                <CardDescription>
                  See the difference you've made through volunteering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Card className="border-none bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Trees Planted
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {volunteerStats.impact.treesPlanted}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Through environmental conservation events
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        Meals Served
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {volunteerStats.impact.mealsServed}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        At food banks and community kitchens
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        People Helped
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {volunteerStats.impact.peopleHelped}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Through various community programs
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-medium">
                    Impact Certificates
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="overflow-hidden">
                      <div className="h-1.5 border-b bg-gradient-to-r from-green-400 to-green-600"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Environmental Conservation
                        </CardTitle>
                        <CardDescription>
                          Issued by Green Earth Initiative
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm">
                          For dedication to environmental conservation through
                          park cleanups and tree planting initiatives.
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm">
                          Download Certificate
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="overflow-hidden">
                      <div className="h-1.5 border-b bg-gradient-to-r from-blue-400 to-blue-600"></div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Community Service
                        </CardTitle>
                        <CardDescription>
                          Issued by Food for All
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm">
                          In recognition of 50+ hours of dedicated service at
                          community food distribution events.
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm">
                          Download Certificate
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password &amp; Security</CardTitle>
                <CardDescription>
                  Update your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div></div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Protect your account with an additional verification step
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Privacy</CardTitle>
                <CardDescription>
                  Control who can see your profile and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select defaultValue="approved">
                    <SelectTrigger id="profile-visibility">
                      <SelectValue placeholder="Select who can see your profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Everyone)</SelectItem>
                      <SelectItem value="volunteers">
                        Volunteers Only
                      </SelectItem>
                      <SelectItem value="approved">
                        Approved Organizations Only
                      </SelectItem>
                      <SelectItem value="private">
                        Private (Only You)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">
                      Show My Statistics
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Display your volunteer hours and impact on your public
                      profile
                    </p>
                  </div>
                  <Switch id="show-stats" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-medium">
                      Allow Contact from Organizations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Let organizations send you messages about volunteer
                      opportunities
                    </p>
                  </div>
                  <Switch id="org-contact" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Privacy Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
