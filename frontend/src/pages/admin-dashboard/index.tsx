import React from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart4,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  Pin,
  Plus,
  Speaker,
  TrendingUp,
  Users,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import PageHead from '@/components/shared/page-head';

// Sample data for admin dashboard
const stats = {
  totalVolunteers: 1254,
  totalOrganizations: 87,
  totalEvents: 342,
  totalHoursLogged: 23650,
  activeEvents: 48,
  pendingVerifications: 12,
  newUsersThisMonth: 134,
  platformGrowth: 24,
  organizationsGrowth: 18,
  volunteersGrowth: 32
};

// Recent activity data
const recentActivity = [
  {
    id: 1,
    type: 'organization_joined',
    name: 'Save The Oceans',
    timestamp: '2023-06-15T10:30:00',
    status: 'pending_verification'
  },
  {
    id: 2,
    type: 'event_created',
    name: 'City Park Cleanup',
    organization: 'Green Earth Initiative',
    timestamp: '2023-06-14T16:45:00',
    status: 'active'
  },
  {
    id: 3,
    type: 'user_joined',
    name: 'Emily Chen',
    timestamp: '2023-06-14T14:20:00',
    status: 'active'
  },
  {
    id: 4,
    type: 'organization_verified',
    name: 'Local Food Bank',
    timestamp: '2023-06-13T11:10:00',
    status: 'verified'
  },
  {
    id: 5,
    type: 'event_completed',
    name: 'Beach Cleanup Marathon',
    organization: 'Marine Conservation Group',
    timestamp: '2023-06-12T18:00:00',
    status: 'completed',
    impact: {
      volunteers: 78,
      hours: 312,
      waste: '542kg'
    }
  }
];

// Organizations awaiting verification
const pendingOrganizations = [
  {
    id: 1,
    name: 'Save The Oceans',
    logo: '/avatars/save-oceans.jpg',
    joinDate: '2023-06-15T10:30:00',
    category: 'Environmental',
    location: 'San Diego, CA'
  },
  {
    id: 2,
    name: 'Community Helpers',
    logo: '/avatars/community-helpers.jpg',
    joinDate: '2023-06-14T09:15:00',
    category: 'Community Service',
    location: 'Chicago, IL'
  },
  {
    id: 3,
    name: 'Tech Education Foundation',
    logo: '/avatars/tech-edu.jpg',
    joinDate: '2023-06-13T14:45:00',
    category: 'Education',
    location: 'Austin, TX'
  },
  {
    id: 4,
    name: 'Homeless Aid Society',
    logo: '/avatars/homeless-aid.jpg',
    joinDate: '2023-06-12T16:20:00',
    category: 'Social Welfare',
    location: 'New York, NY'
  }
];

// Top organizations by volunteer hours
const topOrganizations = [
  {
    id: 1,
    name: 'Green Earth Initiative',
    logo: '/avatars/green-earth.jpg',
    hours: 5423,
    events: 32,
    volunteers: 287
  },
  {
    id: 2,
    name: 'Food for All',
    logo: '/avatars/food-for-all.jpg',
    hours: 4187,
    events: 28,
    volunteers: 342
  },
  {
    id: 3,
    name: 'Elder Care Alliance',
    logo: '/avatars/elder-care.jpg',
    hours: 3650,
    events: 24,
    volunteers: 156
  },
  {
    id: 4,
    name: 'Youth Mentorship Program',
    logo: '/avatars/youth-mentorship.jpg',
    hours: 3125,
    events: 18,
    volunteers: 89
  }
];

// Upcoming events with highest registration
const upcomingEvents = [
  {
    id: 1,
    title: 'Annual City Cleanup Day',
    organization: 'Green Earth Initiative',
    date: '2023-07-15',
    volunteers: {
      registered: 145,
      needed: 200
    },
    location: 'Multiple locations',
    status: 'active'
  },
  {
    id: 2,
    title: 'Summer Food Drive',
    organization: 'Food for All',
    date: '2023-07-08',
    volunteers: {
      registered: 87,
      needed: 100
    },
    location: 'Central Community Center',
    status: 'active'
  },
  {
    id: 3,
    title: 'Elderly Home Visits Week',
    organization: 'Elder Care Alliance',
    date: '2023-07-10',
    volunteers: {
      registered: 64,
      needed: 80
    },
    location: 'Various elderly homes',
    status: 'active'
  }
];

// Format date helper function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time ago helper function
const formatTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffDays > 0) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else {
    return diffMinutes <= 1 ? 'just now' : `${diffMinutes} minutes ago`;
  }
};

// Get appropriate icon for activity type
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'organization_joined':
      return <UserPlus className="h-4 w-4 text-blue-500" />;
    case 'organization_verified':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'event_created':
      return <Calendar className="h-4 w-4 text-purple-500" />;
    case 'event_completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'user_joined':
      return <UserPlus className="h-4 w-4 text-blue-500" />;
    default:
      return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

export default function AdminDashboard() {
  return (
    <div className="flex h-full flex-col pb-10">
      <PageHead title="Admin Dashboard" />

      <div className="flex-1 space-y-6 p-6">
        {/* Welcome header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome to the admin dashboard. Monitor and manage your volunteer
              platform.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Announcement
            </Button>
          </div>
        </div>

        {/* Stats overview cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Volunteers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <Badge variant="outline" className="mr-1 text-green-500">
                  +{stats.volunteersGrowth}%
                </Badge>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Organizations
              </CardTitle>
              <Speaker className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalOrganizations}
              </div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <Badge variant="outline" className="mr-1 text-green-500">
                  +{stats.organizationsGrowth}%
                </Badge>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeEvents}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                <span>out of {stats.totalEvents} total events</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Hours Logged
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalHoursLogged.toLocaleString()}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                <span>Community impact hours</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle row - Pending verifications & Recent activity */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Pending verifications */}
          <Card className="col-span-1">
            <CardHeader className="px-6">
              <div className="flex items-center justify-between">
                <CardTitle>Pending Verifications</CardTitle>
                <Badge variant="destructive">
                  {pendingOrganizations.length}
                </Badge>
              </div>
              <CardDescription>
                Organizations awaiting admin verification
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                {pendingOrganizations.map((org) => (
                  <div
                    key={org.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        {org.logo ? (
                          <AvatarImage src={org.logo} alt={org.name} />
                        ) : null}
                        <AvatarFallback className="bg-primary/10">
                          {org.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Pin className="h-3 w-3" />
                          {org.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Deny
                      </Button>
                      <Button size="sm">Verify</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="w-full">
                View All Verifications
              </Button>
            </CardFooter>
          </Card>

          {/* Recent activity */}
          <Card className="col-span-1">
            <CardHeader className="px-6">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex space-x-4">
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">
                          {activity.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activity.type === 'organization_joined' &&
                          'New organization joined the platform'}
                        {activity.type === 'organization_verified' &&
                          'Organization has been verified'}
                        {activity.type === 'event_created' &&
                          `New event created by ${activity.organization}`}
                        {activity.type === 'event_completed' &&
                          `Event completed by ${activity.organization}`}
                        {activity.type === 'user_joined' &&
                          'New volunteer joined the platform'}
                      </p>
                      {activity.type === 'event_completed' &&
                        activity.impact && (
                          <div className="mt-1 flex flex-wrap gap-2 text-xs">
                            <Badge variant="outline" className="bg-background">
                              <Users className="mr-1 h-3 w-3" />
                              {activity.impact.volunteers} volunteers
                            </Badge>
                            <Badge variant="outline" className="bg-background">
                              <Clock className="mr-1 h-3 w-3" />
                              {activity.impact.hours} hours
                            </Badge>
                            {activity.impact.waste && (
                              <Badge
                                variant="outline"
                                className="bg-background"
                              >
                                <Activity className="mr-1 h-3 w-3" />
                                {activity.impact.waste} collected
                              </Badge>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Bottom section - Tabs for orgs and events */}
        <Tabs defaultValue="organizations" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="organizations">Top Organizations</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          </TabsList>

          <TabsContent value="organizations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Organizations by Impact</CardTitle>
                <CardDescription>
                  Organizations with the highest volunteer hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topOrganizations.map((org) => (
                    <div key={org.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            {org.logo ? (
                              <AvatarImage src={org.logo} alt={org.name} />
                            ) : null}
                            <AvatarFallback className="bg-primary/10">
                              {org.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{org.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {org.events} events · {org.volunteers} volunteers
                            </div>
                          </div>
                        </div>
                        <div className="font-semibold">
                          {org.hours.toLocaleString()} hrs
                        </div>
                      </div>
                      <Progress
                        value={(org.hours / topOrganizations[0].hours) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="outline" className="w-full">
                  View All Organizations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Events with highest registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.organization} · {formatDate(event.date)}
                          </div>
                          <div className="mt-1 flex items-center text-sm text-muted-foreground">
                            <Pin className="mr-1 h-3 w-3" />
                            {event.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-1">
                            {event.volunteers.registered}/
                            {event.volunteers.needed} volunteers
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {Math.round(
                              (event.volunteers.registered /
                                event.volunteers.needed) *
                                100
                            )}
                            % filled
                          </div>
                        </div>
                      </div>
                      <Progress
                        value={
                          (event.volunteers.registered /
                            event.volunteers.needed) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
