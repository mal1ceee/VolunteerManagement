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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Sample organization data
const organizationData = {
  name: 'Green Earth Initiative',
  logo: '🌿',
  description:
    'Environmental conservation organization focused on community initiatives and education.',
  verified: true,
  category: 'Environment',
  location: 'New York, NY',
  stats: {
    totalEvents: 24,
    activeEvents: 8,
    pastEvents: 16,
    totalVolunteers: 250,
    totalHours: 4580,
    impactScore: 78
  },
  recentActivity: [
    {
      id: 1,
      type: 'registration',
      event: 'Central Park Cleanup',
      user: 'John Doe',
      userAvatar: 'JD',
      timestamp: '2023-06-25T14:30:00'
    },
    {
      id: 2,
      type: 'completion',
      event: 'Beach Cleanup Drive',
      user: 'Sarah Johnson',
      userAvatar: 'SJ',
      timestamp: '2023-06-24T16:45:00'
    },
    {
      id: 3,
      type: 'feedback',
      event: 'Environmental Workshop',
      user: 'Michael Chen',
      userAvatar: 'MC',
      rating: 5,
      timestamp: '2023-06-23T10:15:00'
    },
    {
      id: 4,
      type: 'registration',
      event: 'Tree Planting Day',
      user: 'Emma Wilson',
      userAvatar: 'EW',
      timestamp: '2023-06-22T09:30:00'
    },
    {
      id: 5,
      type: 'message',
      user: 'David Brown',
      userAvatar: 'DB',
      summary: 'Question about upcoming event location',
      timestamp: '2023-06-21T11:20:00'
    }
  ],
  upcomingEvents: [
    {
      id: 101,
      title: 'Central Park Cleanup',
      date: '2023-07-15',
      time: '9:00 AM - 12:00 PM',
      location: 'Central Park, New York',
      volunteersRegistered: 12,
      volunteersNeeded: 20,
      status: 'Active'
    },
    {
      id: 102,
      title: 'Environmental Education Workshop',
      date: '2023-07-22',
      time: '2:00 PM - 4:00 PM',
      location: 'Public Library, New York',
      volunteersRegistered: 5,
      volunteersNeeded: 10,
      status: 'Active'
    },
    {
      id: 103,
      title: 'Tree Planting Initiative',
      date: '2023-08-05',
      time: '10:00 AM - 1:00 PM',
      location: 'Riverside Park, New York',
      volunteersRegistered: 8,
      volunteersNeeded: 15,
      status: 'Active'
    }
  ],
  topVolunteers: [
    {
      id: 201,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      hours: 45,
      events: 8
    },
    {
      id: 202,
      name: 'Michael Chen',
      avatar: 'MC',
      hours: 38,
      events: 6
    },
    {
      id: 203,
      name: 'Emma Wilson',
      avatar: 'EW',
      hours: 32,
      events: 5
    }
  ]
};

// Format timestamp function
const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
};

// Format date
const formatDate = (dateString: string) => {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  } as Intl.DateTimeFormatOptions;
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function OrganizationDashboard() {
  return (
    <>
      <PageHead title="Organization Dashboard | Volunteer Connect" />
      <div className="flex-1 space-y-4 p-4 pb-10 pt-6 md:p-8 md:pb-10">
        {/* Organization Header Card */}
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-4xl">
                {organizationData.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">
                    {organizationData.name}
                  </CardTitle>
                  {organizationData.verified && (
                    <Badge variant="default">Verified</Badge>
                  )}
                </div>
                <CardDescription className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                  <span>{organizationData.description}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{organizationData.category}</Badge>
                    <span className="text-xs">{organizationData.location}</span>
                  </div>
                </CardDescription>
              </div>
              <Button>Create Event</Button>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizationData.stats.totalEvents}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {organizationData.stats.activeEvents} active,{' '}
                {organizationData.stats.pastEvents} completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Volunteers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizationData.stats.totalVolunteers}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Across all events
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Volunteer Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {organizationData.stats.totalHours}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Total hours contributed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Impact Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {organizationData.stats.impactScore}
                </div>
                <Badge variant="outline">Good</Badge>
              </div>
              <Progress
                value={organizationData.stats.impactScore}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Recent Activity */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest interactions with volunteers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizationData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 border-b pb-3 last:border-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>{activity.userAvatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">
                        {activity.type === 'registration' && (
                          <>
                            Registered for{' '}
                            <span className="font-medium">
                              {activity.event}
                            </span>
                          </>
                        )}
                        {activity.type === 'completion' && (
                          <>
                            Completed{' '}
                            <span className="font-medium">
                              {activity.event}
                            </span>
                          </>
                        )}
                        {activity.type === 'feedback' && (
                          <>
                            Left a {activity.rating}-star rating for{' '}
                            <span className="font-medium">
                              {activity.event}
                            </span>
                          </>
                        )}
                        {activity.type === 'message' && (
                          <>
                            Sent a message:{' '}
                            <span className="font-medium">
                              {activity.summary}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          {/* Top Volunteers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Volunteers</CardTitle>
              <CardDescription>Most active members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizationData.topVolunteers.map((volunteer) => (
                  <div key={volunteer.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback>{volunteer.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{volunteer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{volunteer.hours} hours</span>
                        <span>•</span>
                        <span>{volunteer.events} events</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Profile
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Volunteers
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Events scheduled in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {organizationData.upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden border-muted">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex flex-col items-center justify-center bg-muted p-3 text-center sm:w-28">
                      <div className="text-lg font-bold">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.time.split(' - ')[0]}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h4 className="text-base font-medium">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {event.location}
                          </p>
                        </div>
                        <Badge>{event.status}</Badge>
                      </div>
                      <div className="mt-2">
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Volunteers</span>
                          <span>
                            {event.volunteersRegistered}/
                            {event.volunteersNeeded}
                          </span>
                        </div>
                        <Progress
                          value={
                            (event.volunteersRegistered /
                              event.volunteersNeeded) *
                            100
                          }
                        />
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View Calendar</Button>
            <Button>Create New Event</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
