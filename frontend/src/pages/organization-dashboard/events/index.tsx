import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  CalendarIcon,
  Clock,
  MapPin,
  MoreHorizontal,
  PlusCircle,
  Search,
  Users
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample events data
const eventsData = {
  active: [
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
    },
    {
      id: 104,
      title: 'Community Garden Project',
      date: '2023-08-12',
      time: '1:00 PM - 4:00 PM',
      location: 'Community Garden, Brooklyn',
      volunteersRegistered: 3,
      volunteersNeeded: 8,
      status: 'Active'
    }
  ],
  draft: [
    {
      id: 201,
      title: 'Beach Cleanup Drive',
      date: '2023-09-10',
      time: '8:00 AM - 11:00 AM',
      location: 'Rockaway Beach',
      volunteersNeeded: 25,
      status: 'Draft'
    },
    {
      id: 202,
      title: 'Wildlife Conservation Workshop',
      date: '2023-09-18',
      time: '3:00 PM - 5:00 PM',
      location: 'City Zoo',
      volunteersNeeded: 12,
      status: 'Draft'
    }
  ],
  past: [
    {
      id: 301,
      title: 'Earth Day Celebration',
      date: '2023-04-22',
      time: '10:00 AM - 2:00 PM',
      location: 'Bryant Park',
      volunteersRegistered: 28,
      volunteersNeeded: 30,
      status: 'Completed'
    },
    {
      id: 302,
      title: 'Park Restoration Project',
      date: '2023-05-15',
      time: '9:00 AM - 12:00 PM',
      location: 'Prospect Park',
      volunteersRegistered: 15,
      volunteersNeeded: 15,
      status: 'Completed'
    },
    {
      id: 303,
      title: 'Environmental Policy Workshop',
      date: '2023-06-10',
      time: '2:00 PM - 4:00 PM',
      location: 'Community Center',
      volunteersRegistered: 12,
      volunteersNeeded: 20,
      status: 'Completed'
    }
  ]
};

// Format date function
const formatDate = (dateString: string) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as Intl.DateTimeFormatOptions;
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function OrganizationEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtered events based on search query and status filter
  const getFilteredEvents = (events: any[]) => {
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredActive = getFilteredEvents(eventsData.active);
  const filteredDraft = getFilteredEvents(eventsData.draft);
  const filteredPast = getFilteredEvents(eventsData.past);

  return (
    <>
      <PageHead title="Manage Events | Organization Dashboard" />
      <div className="flex-1 space-y-4 p-4 pb-10 pt-6 md:p-8 md:pb-10">
        {/* Header with action buttons */}
        <div className="flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Manage Events</h2>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Event
          </Button>
        </div>

        {/* Search and filter section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all" onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Filter</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">
              Active ({filteredActive.length})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Draft ({filteredDraft.length})
            </TabsTrigger>
            <TabsTrigger value="past">Past ({filteredPast.length})</TabsTrigger>
          </TabsList>

          {/* Active Events Tab */}
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Events</CardTitle>
                <CardDescription>
                  Currently ongoing and upcoming events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Volunteers</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActive.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No active events found matching your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredActive.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            {event.title}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>
                                {event.volunteersRegistered}/
                                {event.volunteersNeeded}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{event.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Manage Volunteers
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Cancel Event
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Draft Events Tab */}
          <TabsContent value="draft">
            <Card>
              <CardHeader>
                <CardTitle>Draft Events</CardTitle>
                <CardDescription>
                  Events not yet published or visible to volunteers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Volunteers Needed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDraft.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No draft events found matching your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDraft.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            {event.title}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>{event.volunteersNeeded}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{event.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Publish Event
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Delete Draft
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Past Events Tab */}
          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Events</CardTitle>
                <CardDescription>Completed and archived events</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Volunteers</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPast.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No past events found matching your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPast.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium">
                            {event.title}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                <span>{event.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span>
                                {event.volunteersRegistered}/
                                {event.volunteersNeeded}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Report</DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Feedback
                                </DropdownMenuItem>
                                <DropdownMenuItem>Clone Event</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
