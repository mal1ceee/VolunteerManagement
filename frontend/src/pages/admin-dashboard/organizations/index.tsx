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
  Clock
} from 'lucide-react';
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

// Type definitions
interface Organization {
  id: number;
  name: string;
  logo?: string;
  category: string;
  location: string;
  email: string;
  contactPerson: string;
  status: 'pending' | 'verified' | 'rejected' | 'suspended';
  events: number;
  volunteers: number;
  totalHours: number;
  joinDate: string;
  lastActive: string;
  description: string;
}

// Sample organizations data
const organizations: Organization[] = [
  {
    id: 1,
    name: 'Green Earth Initiative',
    logo: '/avatars/green-earth.jpg',
    category: 'Environmental',
    location: 'San Francisco, CA',
    email: 'contact@greenearth.org',
    contactPerson: 'Sarah Johnson',
    status: 'verified',
    events: 32,
    volunteers: 287,
    totalHours: 5423,
    joinDate: '2022-05-12T09:30:00',
    lastActive: '2023-06-15T14:20:00',
    description:
      'Focused on environmental conservation through community involvement and education.'
  },
  {
    id: 2,
    name: 'Food for All',
    logo: '/avatars/food-for-all.jpg',
    category: 'Social Welfare',
    location: 'New York, NY',
    email: 'info@foodforall.org',
    contactPerson: 'Michael Chen',
    status: 'verified',
    events: 28,
    volunteers: 342,
    totalHours: 4187,
    joinDate: '2022-07-18T11:45:00',
    lastActive: '2023-06-14T09:15:00',
    description:
      'Working to eliminate food insecurity through distribution programs and community gardens.'
  },
  {
    id: 3,
    name: 'Elder Care Alliance',
    logo: '/avatars/elder-care.jpg',
    category: 'Healthcare',
    location: 'Chicago, IL',
    email: 'contact@eldercare.org',
    contactPerson: 'Patricia Miller',
    status: 'verified',
    events: 24,
    volunteers: 156,
    totalHours: 3650,
    joinDate: '2022-08-05T15:30:00',
    lastActive: '2023-06-10T16:40:00',
    description:
      'Supporting elderly individuals through companionship and assistance programs.'
  },
  {
    id: 4,
    name: 'Save The Oceans',
    logo: '/avatars/save-oceans.jpg',
    category: 'Environmental',
    location: 'San Diego, CA',
    email: 'info@saveoceans.org',
    contactPerson: 'David Wilson',
    status: 'pending',
    events: 0,
    volunteers: 0,
    totalHours: 0,
    joinDate: '2023-06-15T10:30:00',
    lastActive: '2023-06-15T10:30:00',
    description:
      'Dedicated to marine conservation and coastal cleanup initiatives.'
  },
  {
    id: 5,
    name: 'Community Helpers',
    logo: '/avatars/community-helpers.jpg',
    category: 'Community Service',
    location: 'Chicago, IL',
    email: 'info@communityhelpers.org',
    contactPerson: 'James Thompson',
    status: 'pending',
    events: 0,
    volunteers: 0,
    totalHours: 0,
    joinDate: '2023-06-14T09:15:00',
    lastActive: '2023-06-14T09:15:00',
    description:
      'Providing a range of community services to underserved neighborhoods.'
  },
  {
    id: 6,
    name: 'Tech Education Foundation',
    logo: '/avatars/tech-edu.jpg',
    category: 'Education',
    location: 'Austin, TX',
    email: 'contact@techedu.org',
    contactPerson: 'Lisa Brown',
    status: 'pending',
    events: 0,
    volunteers: 0,
    totalHours: 0,
    joinDate: '2023-06-13T14:45:00',
    lastActive: '2023-06-13T14:45:00',
    description:
      'Bridging the digital divide through technology education programs.'
  },
  {
    id: 7,
    name: 'Homeless Aid Society',
    logo: '/avatars/homeless-aid.jpg',
    category: 'Social Welfare',
    location: 'New York, NY',
    email: 'info@homelessaid.org',
    contactPerson: 'Robert Clark',
    status: 'pending',
    events: 0,
    volunteers: 0,
    totalHours: 0,
    joinDate: '2023-06-12T16:20:00',
    lastActive: '2023-06-12T16:20:00',
    description:
      'Working to provide shelter, food, and support for the homeless population.'
  },
  {
    id: 8,
    name: 'Youth Mentorship Program',
    logo: '/avatars/youth-mentorship.jpg',
    category: 'Education',
    location: 'Boston, MA',
    email: 'contact@youthmentors.org',
    contactPerson: 'Jennifer Adams',
    status: 'verified',
    events: 18,
    volunteers: 89,
    totalHours: 3125,
    joinDate: '2022-09-15T13:20:00',
    lastActive: '2023-06-12T11:45:00',
    description:
      'Pairing youth with mentors to provide guidance and support in education and career paths.'
  },
  {
    id: 9,
    name: 'Animal Rescue League',
    logo: '/avatars/animal-rescue.jpg',
    category: 'Animal Welfare',
    location: 'Denver, CO',
    email: 'info@animalrescue.org',
    contactPerson: 'Thomas White',
    status: 'verified',
    events: 15,
    volunteers: 112,
    totalHours: 2890,
    joinDate: '2022-10-03T10:15:00',
    lastActive: '2023-06-11T15:30:00',
    description: 'Rescuing, rehabilitating, and rehoming animals in need.'
  },
  {
    id: 10,
    name: 'Global Education Network',
    logo: '/avatars/global-edu.jpg',
    category: 'Education',
    location: 'Seattle, WA',
    email: 'contact@globaledu.org',
    contactPerson: 'Karen Martinez',
    status: 'suspended',
    events: 7,
    volunteers: 43,
    totalHours: 985,
    joinDate: '2022-11-12T14:10:00',
    lastActive: '2023-03-05T09:45:00',
    description:
      'Providing educational resources to underserved communities worldwide.'
  },
  {
    id: 11,
    name: 'Disability Support Alliance',
    logo: '/avatars/disability-support.jpg',
    category: 'Healthcare',
    location: 'Philadelphia, PA',
    email: 'info@disabilitysupport.org',
    contactPerson: 'George Baker',
    status: 'rejected',
    events: 0,
    volunteers: 0,
    totalHours: 0,
    joinDate: '2023-05-18T13:25:00',
    lastActive: '2023-05-18T13:25:00',
    description:
      'Supporting individuals with disabilities through various assistance programs.'
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

// Get status badge for organization
const getStatusBadge = (status: Organization['status']) => {
  switch (status) {
    case 'verified':
      return (
        <Badge
          variant="outline"
          className="border-green-200 bg-green-50 text-green-600"
        >
          Verified
        </Badge>
      );
    case 'pending':
      return (
        <Badge
          variant="outline"
          className="border-yellow-200 bg-yellow-50 text-yellow-600"
        >
          Pending
        </Badge>
      );
    case 'rejected':
      return (
        <Badge
          variant="outline"
          className="border-red-200 bg-red-50 text-red-600"
        >
          Rejected
        </Badge>
      );
    case 'suspended':
      return (
        <Badge
          variant="outline"
          className="border-gray-200 bg-gray-50 text-gray-600"
        >
          Suspended
        </Badge>
      );
    default:
      return null;
  }
};

export default function OrganizationsAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');

  // Filter organizations based on search, category, and tab
  const getFilteredOrganizations = () => {
    let filtered = organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((org) => org.category === categoryFilter);
    }

    if (selectedTab !== 'all') {
      filtered = filtered.filter((org) => org.status === selectedTab);
    }

    return filtered;
  };

  // Extract unique categories for filter
  const categories = [
    'all',
    ...new Set(organizations.map((org) => org.category))
  ];

  // Count organizations per status
  const statusCounts = {
    all: organizations.length,
    verified: organizations.filter((org) => org.status === 'verified').length,
    pending: organizations.filter((org) => org.status === 'pending').length,
    rejected: organizations.filter((org) => org.status === 'rejected').length,
    suspended: organizations.filter((org) => org.status === 'suspended').length
  };

  return (
    <div className="flex h-full flex-col pb-10">
      <PageHead title="Manage Organizations" />

      <div className="flex-1 space-y-6 p-6">
        {/* Page header */}
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
            <p className="text-muted-foreground">
              Manage and verify organizations on your volunteer platform.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Organization
          </Button>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="col-span-1 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organizations.length}</div>
              <div className="text-xs text-muted-foreground">Organizations</div>
            </CardContent>
          </Card>

          <Card className="col-span-1 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.verified}</div>
              <div className="text-xs text-muted-foreground">Organizations</div>
            </CardContent>
          </Card>

          <Card className="col-span-1 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.pending}</div>
              <div className="text-xs text-muted-foreground">Organizations</div>
            </CardContent>
          </Card>

          <Card className="col-span-1 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.rejected}</div>
              <div className="text-xs text-muted-foreground">Organizations</div>
            </CardContent>
          </Card>

          <Card className="col-span-1 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
              <Shield className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statusCounts.suspended}</div>
              <div className="text-xs text-muted-foreground">Organizations</div>
            </CardContent>
          </Card>
        </div>

        {/* Organizations table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Organizations</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search organizations..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              value={selectedTab}
              onValueChange={setSelectedTab}
              className="w-full"
            >
              <TabsList className="mb-4 grid w-full max-w-2xl grid-cols-5">
                <TabsTrigger value="all">
                  All
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.all}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="verified">
                  Verified
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.verified}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.pending}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.rejected}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="suspended">
                  Suspended
                  <Badge variant="secondary" className="ml-2">
                    {statusCounts.suspended}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredOrganizations().length > 0 ? (
                      getFilteredOrganizations().map((org) => (
                        <TableRow key={org.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-9 w-9">
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
                                  {org.contactPerson}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{org.category}</TableCell>
                          <TableCell>{org.location}</TableCell>
                          <TableCell>{getStatusBadge(org.status)}</TableCell>
                          <TableCell>{formatDate(org.joinDate)}</TableCell>
                          <TableCell>{org.events}</TableCell>
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
                                  View Details
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
                                {org.status === 'pending' && (
                                  <>
                                    <DropdownMenuItem>
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                      Verify
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {org.status === 'verified' && (
                                  <DropdownMenuItem>
                                    <Shield className="mr-2 h-4 w-4 text-gray-500" />
                                    Suspend
                                  </DropdownMenuItem>
                                )}
                                {org.status === 'suspended' && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                    Reinstate
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No organizations found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
