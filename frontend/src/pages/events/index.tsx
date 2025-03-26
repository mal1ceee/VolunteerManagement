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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Sample events data
const upcomingEvents = [
  {
    id: 1,
    title: 'Community Park Cleanup',
    organization: 'Green Earth Initiative',
    location: 'Central Park',
    date: '2023-06-15',
    time: '09:00 AM - 12:00 PM',
    status: 'Registered',
    spots: '12/20'
  },
  {
    id: 2,
    title: 'Food Bank Distribution',
    organization: 'Food for All',
    location: 'Downtown Community Center',
    date: '2023-06-20',
    time: '02:00 PM - 05:00 PM',
    status: 'Registered',
    spots: '8/15'
  },
  {
    id: 3,
    title: 'Senior Home Visit',
    organization: 'Elder Care Alliance',
    location: 'Sunshine Senior Living',
    date: '2023-06-25',
    time: '10:00 AM - 01:00 PM',
    status: 'Pending',
    spots: '5/10'
  },
  {
    id: 4,
    title: 'Youth Mentoring Workshop',
    organization: 'Future Leaders',
    location: 'Public Library',
    date: '2023-06-30',
    time: '03:00 PM - 05:00 PM',
    status: 'Available',
    spots: '3/8'
  },
  {
    id: 5,
    title: 'Beach Cleanup Drive',
    organization: 'Ocean Conservancy',
    location: 'Bayside Beach',
    date: '2023-07-05',
    time: '08:00 AM - 11:00 AM',
    status: 'Available',
    spots: '25/30'
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = upcomingEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHead title="Events | Volunteer Connect" />
      <div className="flex-1 space-y-4 p-4 pb-10 pt-6 md:p-8 md:pb-10">
        <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">My Events</h2>

          <div className="flex w-full space-x-2 sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                type="search"
                placeholder="Search events..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              View your registered events and find new opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Spots</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No events found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {event.title}
                      </TableCell>
                      <TableCell>{event.organization}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {event.time}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            event.status === 'Registered'
                              ? 'default'
                              : event.status === 'Pending'
                                ? 'outline'
                                : 'secondary'
                          }
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.spots}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View Calendar</Button>
            <Button>Find New Events</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
