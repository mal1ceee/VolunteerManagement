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
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// Sample organizations data
const organizations = [
  {
    id: 1,
    name: 'Green Earth Initiative',
    logo: '🌿',
    description:
      'Environmental conservation organization focused on community-based initiatives and education.',
    category: 'Environment',
    location: 'New York, NY',
    eventsCount: 12,
    volunteersCount: 250,
    isFollowing: true
  },
  {
    id: 2,
    name: 'Food for All',
    logo: '🍲',
    description:
      'Fighting hunger through food drives, meal preparation, and distribution to underserved communities.',
    category: 'Food & Hunger',
    location: 'Boston, MA',
    eventsCount: 8,
    volunteersCount: 175,
    isFollowing: true
  },
  {
    id: 3,
    name: 'Elder Care Alliance',
    logo: '👵',
    description:
      'Providing companionship and support services to elderly individuals to enhance their quality of life.',
    category: 'Senior Care',
    location: 'Chicago, IL',
    eventsCount: 5,
    volunteersCount: 120,
    isFollowing: false
  },
  {
    id: 4,
    name: 'Future Leaders',
    logo: '🧠',
    description:
      'Mentoring and educational programs for youth to develop leadership skills and career readiness.',
    category: 'Education',
    location: 'Dallas, TX',
    eventsCount: 15,
    volunteersCount: 200,
    isFollowing: false
  },
  {
    id: 5,
    name: 'Ocean Conservancy',
    logo: '🌊',
    description:
      'Dedicated to ocean cleanup, marine life protection, and coastal conservation efforts.',
    category: 'Environment',
    location: 'San Diego, CA',
    eventsCount: 6,
    volunteersCount: 180,
    isFollowing: true
  },
  {
    id: 6,
    name: 'Habitat Builders',
    logo: '🏠',
    description:
      'Building and renovating affordable housing for low-income families in urban communities.',
    category: 'Housing',
    location: 'Atlanta, GA',
    eventsCount: 10,
    volunteersCount: 300,
    isFollowing: false
  }
];

// Categories for filtering
const categories = [
  'All',
  'Environment',
  'Food & Hunger',
  'Senior Care',
  'Education',
  'Housing',
  'Healthcare',
  'Animal Welfare'
];

export default function OrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || org.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHead title="Organizations | Volunteer Connect" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
          <h2 className="text-3xl font-bold tracking-tight">Organizations</h2>

          <div className="flex w-full space-x-2 sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                type="search"
                placeholder="Search organizations..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pb-4">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrganizations.length === 0 ? (
            <div className="col-span-full p-6 text-center">
              <p className="text-muted-foreground">
                No organizations found matching your search
              </p>
            </div>
          ) : (
            filteredOrganizations.map((org) => (
              <Card key={org.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-50 flex h-12 w-12 items-center justify-center rounded-lg text-2xl">
                      {org.logo}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{org.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {org.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {org.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {org.eventsCount}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Events
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {org.volunteersCount}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Volunteers
                      </span>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {org.category}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-1">
                  <Button
                    variant={org.isFollowing ? 'default' : 'outline'}
                    size="sm"
                    className="w-full"
                  >
                    {org.isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {filteredOrganizations.length > 0 && (
          <div className="my-4 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        )}
      </div>
    </>
  );
}
