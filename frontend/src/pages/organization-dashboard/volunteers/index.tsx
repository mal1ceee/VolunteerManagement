import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Download, Mail, UserCheck, Clock } from 'lucide-react';
import PageHead from '@/components/shared/page-head';

// Define TypeScript types for volunteer data
interface Volunteer {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  joinedDate: string;
  status: string;
  hoursLogged: number;
  skills: string[];
  eventsAttended: number;
  rating: number;
  lastActive?: string;
}

// Sample data
const volunteers: {
  active: Volunteer[];
  pending: Volunteer[];
  inactive: Volunteer[];
} = {
  active: [
    {
      id: 1,
      name: 'Michael Chen',
      avatar: '/avatars/michael.jpg',
      email: 'michael.chen@example.com',
      phone: '(555) 123-4567',
      joinedDate: '2023-01-15',
      status: 'active',
      hoursLogged: 48,
      skills: ['Teaching', 'First Aid', 'Event Planning'],
      eventsAttended: 6,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      email: 'sarah.johnson@example.com',
      phone: '(555) 987-6543',
      joinedDate: '2023-02-20',
      status: 'active',
      hoursLogged: 36,
      skills: ['Marketing', 'Photography', 'Social Media'],
      eventsAttended: 5,
      rating: 4.6
    },
    {
      id: 3,
      name: 'David Rodriguez',
      avatar: '/avatars/david.jpg',
      email: 'david.rodriguez@example.com',
      phone: '(555) 567-8901',
      joinedDate: '2023-03-10',
      status: 'active',
      hoursLogged: 62,
      skills: ['Gardening', 'Construction', 'Project Management'],
      eventsAttended: 8,
      rating: 4.9
    },
    {
      id: 4,
      name: 'Emily Wong',
      avatar: '/avatars/emily.jpg',
      email: 'emily.wong@example.com',
      phone: '(555) 234-5678',
      joinedDate: '2023-02-05',
      status: 'active',
      hoursLogged: 24,
      skills: ['Education', 'Counseling', 'Public Speaking'],
      eventsAttended: 4,
      rating: 4.5
    },
    {
      id: 5,
      name: 'James Wilson',
      avatar: '/avatars/james.jpg',
      email: 'james.wilson@example.com',
      phone: '(555) 876-5432',
      joinedDate: '2023-04-12',
      status: 'active',
      hoursLogged: 18,
      skills: ['IT Support', 'Web Development', 'Graphic Design'],
      eventsAttended: 3,
      rating: 4.7
    }
  ],
  pending: [
    {
      id: 6,
      name: 'Olivia Smith',
      avatar: '/avatars/olivia.jpg',
      email: 'olivia.smith@example.com',
      phone: '(555) 345-6789',
      joinedDate: '2023-05-02',
      status: 'pending',
      hoursLogged: 0,
      skills: ['Customer Service', 'Administration', 'Event Planning'],
      eventsAttended: 0,
      rating: 0
    },
    {
      id: 7,
      name: 'Ethan Brown',
      avatar: '/avatars/ethan.jpg',
      email: 'ethan.brown@example.com',
      phone: '(555) 654-3210',
      joinedDate: '2023-05-08',
      status: 'pending',
      hoursLogged: 0,
      skills: ['Teaching', 'Music', 'Youth Work'],
      eventsAttended: 0,
      rating: 0
    },
    {
      id: 8,
      name: 'Sophia Garcia',
      avatar: '/avatars/sophia.jpg',
      email: 'sophia.garcia@example.com',
      phone: '(555) 432-1098',
      joinedDate: '2023-05-10',
      status: 'pending',
      hoursLogged: 0,
      skills: ['Social Media', 'Content Creation', 'Photography'],
      eventsAttended: 0,
      rating: 0
    }
  ],
  inactive: [
    {
      id: 9,
      name: 'William Taylor',
      avatar: '/avatars/william.jpg',
      email: 'william.taylor@example.com',
      phone: '(555) 789-0123',
      joinedDate: '2022-10-15',
      status: 'inactive',
      hoursLogged: 42,
      skills: ['Fundraising', 'Public Relations', 'Event Planning'],
      eventsAttended: 5,
      rating: 4.3,
      lastActive: '2023-01-20'
    },
    {
      id: 10,
      name: 'Ava Martinez',
      avatar: '/avatars/ava.jpg',
      email: 'ava.martinez@example.com',
      phone: '(555) 210-9876',
      joinedDate: '2022-11-05',
      status: 'inactive',
      hoursLogged: 30,
      skills: ['Teaching', 'Childcare', 'Art'],
      eventsAttended: 4,
      rating: 4.4,
      lastActive: '2023-02-15'
    }
  ]
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function OrganizationVolunteers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  // Filter volunteers based on search query
  const getFilteredVolunteers = () => {
    return volunteers[activeTab as keyof typeof volunteers].filter(
      (volunteer) =>
        volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };

  return (
    <div className="flex flex-col space-y-6 p-8 pb-10">
      <PageHead title="Volunteers" />

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search volunteers..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Contact All
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-6">
          <div className="flex flex-col space-y-2">
            <CardTitle>Volunteer Management</CardTitle>
            <CardDescription>
              View, manage, and engage with volunteers for your organization's
              events.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Tabs
            defaultValue="active"
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="active">
                Active Volunteers
                <Badge
                  variant="secondary"
                  className="ml-2 bg-green-100 text-green-800"
                >
                  {volunteers.active.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending Approval
                <Badge
                  variant="secondary"
                  className="ml-2 bg-yellow-100 text-yellow-800"
                >
                  {volunteers.pending.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive
                <Badge
                  variant="secondary"
                  className="ml-2 bg-gray-100 text-gray-800"
                >
                  {volunteers.inactive.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Volunteer</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredVolunteers().map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={volunteer.avatar}
                              alt={volunteer.name}
                            />
                            <AvatarFallback>
                              {volunteer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{volunteer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Joined {formatDate(volunteer.joinedDate)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{volunteer.email}</span>
                          <span className="text-xs text-muted-foreground">
                            {volunteer.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.slice(0, 2).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {volunteer.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{volunteer.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{volunteer.hoursLogged}</span>
                        </div>
                      </TableCell>
                      <TableCell>{volunteer.eventsAttended}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="font-medium">
                            {volunteer.rating}
                          </span>
                          <span className="ml-1 text-yellow-500">★</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>Assign to Event</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Mark as Inactive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Volunteer</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredVolunteers().map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={volunteer.avatar}
                              alt={volunteer.name}
                            />
                            <AvatarFallback>
                              {volunteer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{volunteer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Applied {formatDate(volunteer.joinedDate)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{volunteer.email}</span>
                          <span className="text-xs text-muted-foreground">
                            {volunteer.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.slice(0, 2).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {volunteer.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{volunteer.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(volunteer.joinedDate)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <UserCheck className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                          >
                            Decline
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="inactive" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Volunteer</TableHead>
                    <TableHead>Contact Information</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Hours Contributed</TableHead>
                    <TableHead>Events Attended</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredVolunteers().map((volunteer) => (
                    <TableRow key={volunteer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={volunteer.avatar}
                              alt={volunteer.name}
                            />
                            <AvatarFallback>
                              {volunteer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{volunteer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Joined {formatDate(volunteer.joinedDate)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{volunteer.email}</span>
                          <span className="text-xs text-muted-foreground">
                            {volunteer.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(volunteer.lastActive || '')}
                      </TableCell>
                      <TableCell>{volunteer.hoursLogged}</TableCell>
                      <TableCell>{volunteer.eventsAttended}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="mr-1 h-4 w-4" />
                            Contact
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-primary"
                          >
                            Reactivate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
