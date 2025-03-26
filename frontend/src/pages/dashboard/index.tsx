import PageHead from '@/components/shared/page-head';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, UserCheck, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample upcoming events
const upcomingEvents = [
  {
    id: 'evt1',
    title: 'Community Park Cleanup',
    date: '2023-05-15',
    time: '09:00 AM - 12:00 PM',
    location: 'Central Park',
    organization: 'Green Earth Initiative'
  },
  {
    id: 'evt2',
    title: 'Food Bank Distribution',
    date: '2023-05-20',
    time: '02:00 PM - 05:00 PM',
    location: 'Downtown Community Center',
    organization: 'Food for All'
  },
  {
    id: 'evt3',
    title: 'Senior Home Visit',
    date: '2023-05-25',
    time: '10:00 AM - 01:00 PM',
    location: 'Sunshine Senior Living',
    organization: 'Elder Care Alliance'
  }
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <>
      <PageHead title="Volunteer Dashboard | Volunteer Connect" />
      <div className="flex-1 space-y-4 p-4 pb-10 pt-6 md:p-8 md:pb-10">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome, Volunteer! 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Hours Volunteered
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45.5</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5 hours from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Events Joined
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +3 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Organizations
                  </CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    Across 3 categories
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Achievements
                  </CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    2 new this month
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>
                    Your next scheduled volunteer activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-4 rounded-md border p-4"
                      >
                        <div className="flex-1 space-y-1">
                          <p className="font-medium leading-none">
                            {event.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {event.organization}
                          </p>
                          <div className="flex items-center pt-2">
                            <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(event.date).toLocaleDateString()} •{' '}
                              {event.time}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/dashboard/events/${event.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Your Skills</CardTitle>
                  <CardDescription>
                    Skills and interests you've listed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
                        Teaching
                      </span>
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-900/30 dark:text-green-400">
                        Event Planning
                      </span>
                      <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Mentoring
                      </span>
                      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/30 dark:text-purple-400">
                        Web Development
                      </span>
                      <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-700/10 dark:bg-red-900/30 dark:text-red-400">
                        First Aid
                      </span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Update Your Skills
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="opportunities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Opportunities</CardTitle>
                <CardDescription>
                  Based on your skills and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    onClick={() => navigate('/dashboard/events')}
                  >
                    View All Opportunities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
