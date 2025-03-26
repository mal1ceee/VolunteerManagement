import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHead from '@/components/shared/page-head';
import { Badge } from '@/components/ui/badge';
import {
  EyeIcon,
  MoreHorizontal,
  PenIcon,
  TrashIcon,
  UserPlusIcon,
  UsersIcon
} from 'lucide-react';
import { useState } from 'react';

// Types
interface Event {
  id: string;
  title: string;
  organizationId: string;
  organizationName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  volunteersRegistered: number;
  volunteersNeeded: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Sample data
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Central Park Cleanup',
    organizationId: 'org1',
    organizationName: 'Green Earth Initiative',
    date: '2025-04-15',
    time: '09:00 AM - 12:00 PM',
    location: 'Central Park, New York',
    description: 'Join us for a community cleanup event at Central Park.',
    volunteersRegistered: 15,
    volunteersNeeded: 25,
    status: 'upcoming',
    category: 'Environment',
    createdAt: '2025-03-01',
    updatedAt: '2025-03-01'
  },
  {
    id: '2',
    title: 'Food Drive for Homeless',
    organizationId: 'org2',
    organizationName: 'Community Food Bank',
    date: '2025-04-20',
    time: '10:00 AM - 02:00 PM',
    location: 'Downtown Community Center',
    description: 'Help collect and distribute food to those in need.',
    volunteersRegistered: 12,
    volunteersNeeded: 20,
    status: 'upcoming',
    category: 'Community Service',
    createdAt: '2025-03-05',
    updatedAt: '2025-03-05'
  },
  {
    id: '3',
    title: 'Literacy Workshop',
    organizationId: 'org3',
    organizationName: 'Education for All',
    date: '2025-04-22',
    time: '04:00 PM - 06:00 PM',
    location: 'Public Library',
    description: 'Volunteer to help improve literacy rates in our community.',
    volunteersRegistered: 8,
    volunteersNeeded: 10,
    status: 'upcoming',
    category: 'Education',
    createdAt: '2025-03-07',
    updatedAt: '2025-03-07'
  }
];

const ongoingEvents: Event[] = [
  {
    id: '4',
    title: 'Senior Care Program',
    organizationId: 'org4',
    organizationName: 'Elder Care Foundation',
    date: '2025-03-01',
    time: '09:00 AM - 05:00 PM',
    location: 'Silver Heights Retirement Home',
    description: 'Ongoing program to provide companionship to seniors.',
    volunteersRegistered: 30,
    volunteersNeeded: 35,
    status: 'ongoing',
    category: 'Healthcare',
    createdAt: '2025-02-15',
    updatedAt: '2025-02-15'
  },
  {
    id: '5',
    title: 'Animal Shelter Support',
    organizationId: 'org5',
    organizationName: 'Animal Welfare Society',
    date: '2025-03-15',
    time: '10:00 AM - 03:00 PM',
    location: 'City Animal Shelter',
    description: 'Help care for animals waiting for adoption.',
    volunteersRegistered: 18,
    volunteersNeeded: 20,
    status: 'ongoing',
    category: 'Animal Welfare',
    createdAt: '2025-02-20',
    updatedAt: '2025-02-20'
  }
];

const completedEvents: Event[] = [
  {
    id: '6',
    title: 'Beach Cleanup Drive',
    organizationId: 'org1',
    organizationName: 'Green Earth Initiative',
    date: '2025-02-12',
    time: '08:00 AM - 12:00 PM',
    location: 'Sunrise Beach',
    description: 'Successful community effort to clean our local beach.',
    volunteersRegistered: 40,
    volunteersNeeded: 35,
    status: 'completed',
    category: 'Environment',
    createdAt: '2025-01-20',
    updatedAt: '2025-02-13'
  },
  {
    id: '7',
    title: 'Community Garden Planting',
    organizationId: 'org6',
    organizationName: 'Urban Greening Project',
    date: '2025-02-25',
    time: '09:00 AM - 01:00 PM',
    location: 'Westside Community Garden',
    description: 'Planting day at our community garden.',
    volunteersRegistered: 25,
    volunteersNeeded: 20,
    status: 'completed',
    category: 'Environment',
    createdAt: '2025-01-30',
    updatedAt: '2025-02-26'
  },
  {
    id: '8',
    title: 'Youth Mentorship Workshop',
    organizationId: 'org7',
    organizationName: 'Future Leaders',
    date: '2025-03-05',
    time: '02:00 PM - 05:00 PM',
    location: 'Community Youth Center',
    description: 'Mentorship program for disadvantaged youth.',
    volunteersRegistered: 15,
    volunteersNeeded: 15,
    status: 'completed',
    category: 'Education',
    createdAt: '2025-02-10',
    updatedAt: '2025-03-06'
  }
];

const cancelledEvents: Event[] = [
  {
    id: '9',
    title: 'Marathon for Charity',
    organizationId: 'org8',
    organizationName: 'Health Foundation',
    date: '2025-03-30',
    time: '07:00 AM - 12:00 PM',
    location: 'City Park',
    description: 'Charity marathon to raise funds for medical research.',
    volunteersRegistered: 10,
    volunteersNeeded: 50,
    status: 'cancelled',
    category: 'Healthcare',
    createdAt: '2025-02-15',
    updatedAt: '2025-03-15'
  },
  {
    id: '10',
    title: 'Technology Workshop for Seniors',
    organizationId: 'org3',
    organizationName: 'Education for All',
    date: '2025-04-02',
    time: '01:00 PM - 04:00 PM',
    location: 'Senior Community Center',
    description: 'Workshop to help seniors learn basic computer skills.',
    volunteersRegistered: 5,
    volunteersNeeded: 12,
    status: 'cancelled',
    category: 'Education',
    createdAt: '2025-03-01',
    updatedAt: '2025-03-20'
  }
];

// Helper functions
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusBadge = (status: Event['status']) => {
  switch (status) {
    case 'upcoming':
      return <Badge className="bg-blue-500">Upcoming</Badge>;
    case 'ongoing':
      return <Badge className="bg-green-500">Ongoing</Badge>;
    case 'completed':
      return <Badge className="bg-gray-500">Completed</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return null;
  }
};

const getAllEvents = () => {
  return [
    ...upcomingEvents,
    ...ongoingEvents,
    ...completedEvents,
    ...cancelledEvents
  ];
};

export default function AdminEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Filter events based on search query and filters
  const getFilteredEvents = (events: Event[]) => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizationName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || event.category === categoryFilter;
      const matchesStatus =
        statusFilter === 'all' || event.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const handleSelectAllEvents = (events: Event[], checked: boolean) => {
    if (checked) {
      setSelectedEvents((prev) => [
        ...prev,
        ...events.map((event) => event.id)
      ]);
    } else {
      setSelectedEvents((prev) =>
        prev.filter((id) => !events.map((event) => event.id).includes(id))
      );
    }
  };

  const handleSelectEvent = (eventId: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents((prev) => [...prev, eventId]);
    } else {
      setSelectedEvents((prev) => prev.filter((id) => id !== eventId));
    }
  };

  const isEventSelected = (eventId: string) => {
    return selectedEvents.includes(eventId);
  };

  const allEvents = getAllEvents();
  const uniqueCategories = Array.from(
    new Set(allEvents.map((event) => event.category))
  );

  return (
    <div className="flex flex-col pb-10">
      <PageHead title="Events Management | Admin Dashboard" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all events on the platform
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          {selectedEvents.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete Selected
              </Button>
              <Button variant="outline" size="sm">
                Update Status
              </Button>
            </>
          )}
        </div>
        <Button>Add New Event</Button>
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter events by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[250px] flex-1">
              <Input
                placeholder="Search by title, organization, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="min-w-[180px]">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <Tabs defaultValue="all" className="w-full">
          <CardHeader className="p-4 pb-2">
            <TabsList className="mb-2">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="pt-0">
            <TabsContent value="all">
              <EventsTable
                events={getFilteredEvents(allEvents)}
                selectedEvents={selectedEvents}
                handleSelectAllEvents={handleSelectAllEvents}
                handleSelectEvent={handleSelectEvent}
                isEventSelected={isEventSelected}
              />
            </TabsContent>
            <TabsContent value="upcoming">
              <EventsTable
                events={getFilteredEvents(upcomingEvents)}
                selectedEvents={selectedEvents}
                handleSelectAllEvents={handleSelectAllEvents}
                handleSelectEvent={handleSelectEvent}
                isEventSelected={isEventSelected}
              />
            </TabsContent>
            <TabsContent value="ongoing">
              <EventsTable
                events={getFilteredEvents(ongoingEvents)}
                selectedEvents={selectedEvents}
                handleSelectAllEvents={handleSelectAllEvents}
                handleSelectEvent={handleSelectEvent}
                isEventSelected={isEventSelected}
              />
            </TabsContent>
            <TabsContent value="completed">
              <EventsTable
                events={getFilteredEvents(completedEvents)}
                selectedEvents={selectedEvents}
                handleSelectAllEvents={handleSelectAllEvents}
                handleSelectEvent={handleSelectEvent}
                isEventSelected={isEventSelected}
              />
            </TabsContent>
            <TabsContent value="cancelled">
              <EventsTable
                events={getFilteredEvents(cancelledEvents)}
                selectedEvents={selectedEvents}
                handleSelectAllEvents={handleSelectAllEvents}
                handleSelectEvent={handleSelectEvent}
                isEventSelected={isEventSelected}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}

interface EventsTableProps {
  events: Event[];
  selectedEvents: string[];
  handleSelectAllEvents: (events: Event[], checked: boolean) => void;
  handleSelectEvent: (eventId: string, checked: boolean) => void;
  isEventSelected: (eventId: string) => boolean;
}

function EventsTable({
  events,
  selectedEvents,
  handleSelectAllEvents,
  handleSelectEvent,
  isEventSelected
}: EventsTableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={
                  events.length > 0 &&
                  events.every((event) => isEventSelected(event.id))
                }
                onCheckedChange={(checked: boolean) =>
                  handleSelectAllEvents(events, checked)
                }
              />
            </TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Volunteers</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-8 text-center text-muted-foreground"
              >
                No events found matching your criteria
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <Checkbox
                    checked={isEventSelected(event.id)}
                    onCheckedChange={(checked: boolean) =>
                      handleSelectEvent(event.id, checked)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.organizationName}</TableCell>
                <TableCell>{formatDate(event.date)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <UsersIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>
                      {event.volunteersRegistered}/{event.volunteersNeeded}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(event.status)}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <PenIcon className="mr-2 h-4 w-4" />
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlusIcon className="mr-2 h-4 w-4" />
                        Manage Volunteers
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
