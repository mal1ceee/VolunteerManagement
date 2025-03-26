import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Mail,
  User,
  Pin,
  Shield,
  Calendar,
  Clock,
  Award,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHead from '@/components/shared/page-head';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

// Type definitions
interface Volunteer {
  id: number;
  name: string;
  avatar?: string;
  email: string;
  location: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending' | 'banned';
  skills: string[];
  interests: string[];
  eventsAttended: number;
  totalHours: number;
  achievements: number;
  verificationLevel: 'basic' | 'verified' | 'advanced';
}

// Sample volunteers data
const volunteers: Volunteer[] = [
  {
    id: 1,
    name: 'Emily Chen',
    avatar: '/avatars/emily.jpg',
    email: 'emily.chen@example.com',
    location: 'San Francisco, CA',
    joinDate: '2022-04-15T09:30:00',
    lastActive: '2023-06-15T14:20:00',
    status: 'active',
    skills: ['Teaching', 'First Aid', 'Language Translation'],
    interests: ['Education', 'Environment', 'Healthcare'],
    eventsAttended: 28,
    totalHours: 147,
    achievements: 12,
    verificationLevel: 'verified'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    avatar: '/avatars/marcus.jpg',
    email: 'marcus.johnson@example.com',
    location: 'Chicago, IL',
    joinDate: '2022-06-23T11:45:00',
    lastActive: '2023-06-13T10:15:00',
    status: 'active',
    skills: ['Carpentry', 'Cooking', 'Driving'],
    interests: ['Community Service', 'Homeless Support', 'Food Security'],
    eventsAttended: 19,
    totalHours: 102,
    achievements: 8,
    verificationLevel: 'advanced'
  },
  {
    id: 3,
    name: 'Sophie Williams',
    avatar: '/avatars/sophie.jpg',
    email: 'sophie.williams@example.com',
    location: 'New York, NY',
    joinDate: '2022-07-08T16:30:00',
    lastActive: '2023-06-12T09:45:00',
    status: 'active',
    skills: ['Graphic Design', 'Social Media', 'Photography'],
    interests: ['Arts & Culture', 'Community Engagement', 'Youth Programs'],
    eventsAttended: 15,
    totalHours: 89,
    achievements: 6,
    verificationLevel: 'verified'
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: '/avatars/david.jpg',
    email: 'david.kim@example.com',
    location: 'Los Angeles, CA',
    joinDate: '2022-05-19T13:20:00',
    lastActive: '2023-06-11T17:10:00',
    status: 'active',
    skills: ['Programming', 'Web Development', 'Teaching'],
    interests: ['Technology', 'Education', 'Mentorship'],
    eventsAttended: 21,
    totalHours: 124,
    achievements: 9,
    verificationLevel: 'advanced'
  },
  {
    id: 5,
    name: 'Olivia Carter',
    avatar: '/avatars/olivia.jpg',
    email: 'olivia.carter@example.com',
    location: 'Austin, TX',
    joinDate: '2023-01-05T10:15:00',
    lastActive: '2023-06-10T12:30:00',
    status: 'active',
    skills: ['Event Planning', 'Public Speaking', 'Administration'],
    interests: ['Community Building', 'Education', 'Arts & Culture'],
    eventsAttended: 8,
    totalHours: 52,
    achievements: 4,
    verificationLevel: 'basic'
  },
  {
    id: 6,
    name: 'James Wilson',
    avatar: '/avatars/james.jpg',
    email: 'james.wilson@example.com',
    location: 'Denver, CO',
    joinDate: '2022-11-12T09:00:00',
    lastActive: '2023-05-28T15:40:00',
    status: 'inactive',
    skills: ['Landscaping', 'Environment Knowledge', 'Animal Care'],
    interests: ['Environment', 'Wildlife Conservation', 'Sustainability'],
    eventsAttended: 11,
    totalHours: 67,
    achievements: 5,
    verificationLevel: 'verified'
  },
  {
    id: 7,
    name: 'Aisha Patel',
    avatar: '/avatars/aisha.jpg',
    email: 'aisha.patel@example.com',
    location: 'Seattle, WA',
    joinDate: '2023-02-28T14:20:00',
    lastActive: '2023-06-14T11:25:00',
    status: 'active',
    skills: ['Nursing', 'First Aid', 'Elderly Care'],
    interests: ['Healthcare', 'Senior Services', 'Community Welfare'],
    eventsAttended: 7,
    totalHours: 42,
    achievements: 3,
    verificationLevel: 'basic'
  },
  {
    id: 8,
    name: 'Robert Thompson',
    avatar: '/avatars/robert.jpg',
    email: 'robert.thompson@example.com',
    location: 'Boston, MA',
    joinDate: '2022-08-17T11:10:00',
    lastActive: '2023-03-15T10:05:00',
    status: 'inactive',
    skills: ['Teaching', 'Tutoring', 'Mentoring'],
    interests: ['Education', 'Youth Development', 'Literacy'],
    eventsAttended: 14,
    totalHours: 78,
    achievements: 7,
    verificationLevel: 'verified'
  },
  {
    id: 9,
    name: 'Maria Gonzalez',
    avatar: '/avatars/maria.jpg',
    email: 'maria.gonzalez@example.com',
    location: 'Miami, FL',
    joinDate: '2023-03-10T15:45:00',
    lastActive: '2023-06-09T16:50:00',
    status: 'active',
    skills: [
      'Translation (Spanish)',
      'Community Outreach',
      'Event Coordination'
    ],
    interests: ['Cultural Integration', 'Immigration Support', 'Education'],
    eventsAttended: 6,
    totalHours: 36,
    achievements: 2,
    verificationLevel: 'basic'
  },
  {
    id: 10,
    name: 'Daniel Smith',
    avatar: '/avatars/daniel.jpg',
    email: 'daniel.smith@example.com',
    location: 'Philadelphia, PA',
    joinDate: '2022-10-05T13:40:00',
    lastActive: '2023-06-08T09:20:00',
    status: 'active',
    skills: ['Construction', 'Carpentry', 'Project Management'],
    interests: ['Housing', 'Community Development', 'Disaster Relief'],
    eventsAttended: 12,
    totalHours: 92,
    achievements: 6,
    verificationLevel: 'verified'
  },
  {
    id: 11,
    name: 'Emma Davis',
    avatar: '/avatars/emma.jpg',
    email: 'emma.davis@example.com',
    location: 'Portland, OR',
    joinDate: '2023-05-18T09:30:00',
    lastActive: '2023-06-01T10:45:00',
    status: 'pending',
    skills: ['Social Media', 'Digital Marketing', 'Content Creation'],
    interests: ['Sustainability', 'Environment', 'Animal Welfare'],
    eventsAttended: 0,
    totalHours: 0,
    achievements: 0,
    verificationLevel: 'basic'
  },
  {
    id: 12,
    name: 'Tyler Jackson',
    avatar: '/avatars/tyler.jpg',
    email: 'tyler.jackson@example.com',
    location: 'Atlanta, GA',
    joinDate: '2023-04-22T16:15:00',
    lastActive: '2023-04-22T16:15:00',
    status: 'banned',
    skills: ['IT Support', 'Web Development', 'Database Management'],
    interests: ['Technology', 'Digital Inclusion', 'Education'],
    eventsAttended: 0,
    totalHours: 0,
    achievements: 0,
    verificationLevel: 'basic'
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

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else {
    return `${Math.floor(diffDays / 30)} months ago`;
  }
};

// Get status badge for volunteer
const getStatusBadge = (status: Volunteer['status']) => {
  switch (status) {
    case 'active':
      return (
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-green-600"
        >
          Active
        </Badge>
      );
    case 'inactive':
      return (
        <Badge
          variant="outline"
          className="border-yellow-200 bg-yellow-50 text-yellow-600"
        >
          Inactive
        </Badge>
      );
    case 'pending':
      return (
        <Badge
          variant="outline"
          className="border-blue-200 bg-blue-50 text-blue-600"
        >
          Pending
        </Badge>
      );
    case 'banned':
      return (
        <Badge
          variant="outline"
          className="border-red-200 bg-red-50 text-red-600"
        >
          Banned
        </Badge>
      );
    default:
      return null;
  }
};

// Get verification level badge
const getVerificationBadge = (level: Volunteer['verificationLevel']) => {
  switch (level) {
    case 'basic':
      return (
        <Badge
          variant="outline"
          className="border-gray-200 bg-gray-50 text-gray-600"
        >
          Basic
        </Badge>
      );
    case 'verified':
      return (
        <Badge
          variant="outline"
          className="border-blue-200 bg-blue-50 text-blue-600"
        >
          Verified
        </Badge>
      );
    case 'advanced':
      return (
        <Badge
          variant="outline"
          className="border-purple-200 bg-purple-50 text-purple-600"
        >
          Advanced
        </Badge>
      );
    default:
      return null;
  }
};

export default function VolunteersAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [selectedVolunteers, setSelectedVolunteers] = useState<number[]>([]);

  // Filter volunteers based on search, status, and verification level
  const getFilteredVolunteers = () => {
    let filtered = volunteers.filter(
      (volunteer) =>
        volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (volunteer) => volunteer.status === statusFilter
      );
    }

    if (verificationFilter !== 'all') {
      filtered = filtered.filter(
        (volunteer) => volunteer.verificationLevel === verificationFilter
      );
    }

    return filtered;
  };

  // Count volunteers per status
  const statusCounts = {
    all: volunteers.length,
    active: volunteers.filter((volunteer) => volunteer.status === 'active')
      .length,
    inactive: volunteers.filter((volunteer) => volunteer.status === 'inactive')
      .length,
    pending: volunteers.filter((volunteer) => volunteer.status === 'pending')
      .length,
    banned: volunteers.filter((volunteer) => volunteer.status === 'banned')
      .length
  };

  // Handle checkbox selection
  const handleSelectVolunteer = (volunteerId: number) => {
    if (selectedVolunteers.includes(volunteerId)) {
      setSelectedVolunteers(
        selectedVolunteers.filter((id) => id !== volunteerId)
      );
    } else {
      setSelectedVolunteers([...selectedVolunteers, volunteerId]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedVolunteers.length === getFilteredVolunteers().length) {
      setSelectedVolunteers([]);
    } else {
      setSelectedVolunteers(
        getFilteredVolunteers().map((volunteer) => volunteer.id)
      );
    }
  };

  return (
    <div className="flex h-full flex-col pb-10">
      <PageHead title="Manage Volunteers" />

      <div className="flex-1 space-y-6 p-6">
        {/* Page header */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Volunteers</h1>
            <p className="text-muted-foreground">
              Manage your volunteers and their verification status.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button>
              <Mail className="mr-2 h-4 w-4" />
              Send Announcement
            </Button>
          </div>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Volunteers
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{volunteers.length}</div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {volunteers
                  .reduce((sum, v) => sum + v.totalHours, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Events Attended
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {volunteers
                  .reduce((sum, v) => sum + v.eventsAttended, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Hours
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  volunteers.reduce((sum, v) => sum + v.totalHours, 0) /
                    volunteers.filter((v) => v.status === 'active').length
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Per active volunteer
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Volunteers table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Volunteers</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search volunteers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={verificationFilter}
                  onValueChange={setVerificationFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by verification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={statusFilter}
              onValueChange={setStatusFilter}
              className="w-full"
            >
              <TabsList className="mb-4 grid w-full max-w-2xl grid-cols-5">
                <TabsTrigger value="all">
                  All
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.all}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.active}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="inactive">
                  Inactive
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.inactive}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.pending}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="banned">
                  Banned
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.banned}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            getFilteredVolunteers().length > 0 &&
                            selectedVolunteers.length ===
                              getFilteredVolunteers().length
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Volunteer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredVolunteers().length > 0 ? (
                      getFilteredVolunteers().map((volunteer) => (
                        <TableRow key={volunteer.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedVolunteers.includes(
                                volunteer.id
                              )}
                              onCheckedChange={() =>
                                handleSelectVolunteer(volunteer.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-9 w-9">
                                {volunteer.avatar ? (
                                  <AvatarImage
                                    src={volunteer.avatar}
                                    alt={volunteer.name}
                                  />
                                ) : null}
                                <AvatarFallback className="bg-primary/10">
                                  {volunteer.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {volunteer.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {volunteer.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{volunteer.location}</TableCell>
                          <TableCell>
                            {getStatusBadge(volunteer.status)}
                          </TableCell>
                          <TableCell>
                            {getVerificationBadge(volunteer.verificationLevel)}
                          </TableCell>
                          <TableCell>{volunteer.eventsAttended}</TableCell>
                          <TableCell>{volunteer.totalHours}</TableCell>
                          <TableCell>
                            {formatTimeAgo(volunteer.lastActive)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Contact
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {volunteer.status === 'pending' && (
                                  <>
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {volunteer.status === 'active' && (
                                  <DropdownMenuItem>
                                    <Shield className="mr-2 h-4 w-4 text-red-500" />
                                    Ban
                                  </DropdownMenuItem>
                                )}
                                {volunteer.status === 'banned' && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    Unban
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          No volunteers found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {selectedVolunteers.length} of {getFilteredVolunteers().length}{' '}
                volunteers selected
              </div>
              <div className="flex gap-2">
                {selectedVolunteers.length > 0 && (
                  <>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Message Selected
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Bulk Edit
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
