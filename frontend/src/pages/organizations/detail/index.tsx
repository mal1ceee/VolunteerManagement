import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  Phone,
  Mail,
  Globe,
  Clock
} from 'lucide-react';

// Sample organization data (in a real app, this would come from an API)
const organizationData = {
  id: 1,
  name: 'Green Earth Initiative',
  logo: '🌿',
  description:
    'Environmental conservation organization focused on community-based initiatives and education. We work to protect and restore natural habitats, promote sustainable practices, and educate communities about environmental issues.',
  longDescription:
    'Green Earth Initiative is a non-profit organization dedicated to environmental conservation through community engagement and education. Founded in 2010, we have been working tirelessly to protect and restore natural habitats, promote sustainable practices, and educate communities about pressing environmental issues.\n\nOur mission is to foster a sustainable relationship between humans and the environment. We believe that by empowering individuals and communities with knowledge and opportunities for action, we can create a more sustainable and environmentally conscious world.',
  category: 'Environment',
  location: 'New York, NY',
  address: '123 Green Street, New York, NY 10001',
  phone: '(212) 555-1234',
  email: 'info@greenearthinitiative.org',
  website: 'www.greenearthinitiative.org',
  foundedYear: 2010,
  eventsCount: 12,
  volunteersCount: 250,
  totalHours: 5280,
  isFollowing: true,
  socialMedia: {
    facebook: 'facebook.com/greenearthinitiative',
    twitter: 'twitter.com/greenearth',
    instagram: 'instagram.com/greenearth'
  },
  upcomingEvents: [
    {
      id: 101,
      title: 'Central Park Cleanup',
      date: '2023-07-15',
      time: '9:00 AM - 12:00 PM',
      location: 'Central Park, New York',
      spotsAvailable: 8,
      registrationDeadline: '2023-07-10'
    },
    {
      id: 102,
      title: 'Environmental Education Workshop',
      date: '2023-07-22',
      time: '2:00 PM - 4:00 PM',
      location: 'Public Library, New York',
      spotsAvailable: 15,
      registrationDeadline: '2023-07-18'
    },
    {
      id: 103,
      title: 'Tree Planting Day',
      date: '2023-08-05',
      time: '10:00 AM - 1:00 PM',
      location: 'Riverside Park, New York',
      spotsAvailable: 20,
      registrationDeadline: '2023-08-01'
    }
  ],
  pastEvents: [
    {
      id: 201,
      title: 'Earth Day Celebration',
      date: '2023-04-22',
      location: 'Bryant Park, New York',
      participantsCount: 150
    },
    {
      id: 202,
      title: 'Beach Cleanup Drive',
      date: '2023-05-18',
      location: 'Rockaway Beach, New York',
      participantsCount: 75
    },
    {
      id: 203,
      title: 'Environmental Policy Workshop',
      date: '2023-06-10',
      location: 'Community Center, New York',
      participantsCount: 40
    }
  ],
  impactStats: {
    treesPlanted: 550,
    wasteCollected: '2.5 tons',
    areasCleaned: 35,
    educationWorkshops: 28
  },
  reviews: [
    {
      id: 301,
      user: 'Sarah L.',
      rating: 5,
      date: '2023-05-10',
      comment:
        'Amazing organization! I volunteered for their beach cleanup and it was so well organized. The staff was friendly and passionate.'
    },
    {
      id: 302,
      user: 'Michael T.',
      rating: 4,
      date: '2023-04-15',
      comment:
        'Great experience volunteering with Green Earth. They provide all the necessary equipment and clear instructions.'
    },
    {
      id: 303,
      user: 'Emma K.',
      rating: 5,
      date: '2023-06-20',
      comment:
        "I've volunteered with them multiple times and always had a positive experience. Their tree planting events are my favorite!"
    }
  ]
};

export default function OrganizationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(organizationData);
  const [isFollowing, setIsFollowing] = useState(organization.isFollowing);

  // In a real app, you would fetch the organization data based on the ID
  useEffect(() => {
    // This would be an API call in a real application
    // fetchOrganizationById(id).then(data => setOrganization(data));

    // For demo purposes, we're using the sample data
    setOrganization(organizationData);
  }, [id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // In a real app, you would make an API call to follow/unfollow
  };

  const handleRegister = (eventId) => {
    // In a real app, you would make an API call to register for the event
    console.log(`Registering for event ${eventId}`);
    // Then navigate to a confirmation page or show a success message
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <PageHead title={`${organization.name} | Volunteer Connect`} />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        {/* Header with back button */}
        <div className="mb-4 flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard/organizations')}
          >
            ← Back to Organizations
          </Button>
        </div>

        {/* Organization Header Card */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-primary/10 text-4xl">
                {organization.logo}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-2xl">
                    {organization.name}
                  </CardTitle>
                  <Badge variant="outline">{organization.category}</Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  {organization.location}
                </CardDescription>
                <div className="mt-2 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <UsersIcon className="h-4 w-4" />
                    <span>{organization.volunteersCount} volunteers</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Founded {organization.foundedYear}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{organization.totalHours} volunteer hours</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2 md:mt-0">
                <Button
                  variant={isFollowing ? 'default' : 'outline'}
                  onClick={handleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button>Contact</Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs Container */}
        <Tabs defaultValue="about" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About the Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="whitespace-pre-line text-sm">
                    {organization.longDescription}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                        <span>{organization.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span>{organization.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span>{organization.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <a
                          href={`https://${organization.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {organization.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Media</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(organization.socialMedia).map(
                        ([platform, url]) => (
                          <Button
                            key={platform}
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a
                              href={`https://${url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {platform.charAt(0).toUpperCase() +
                                platform.slice(1)}
                            </a>
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Register for upcoming volunteer opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organization.upcomingEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden border-muted"
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">
                            {event.title}
                          </CardTitle>
                          <Badge variant="outline">
                            {event.spotsAvailable} spots left
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pb-2 pt-0">
                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Registration deadline:{' '}
                          {formatDate(event.registrationDeadline)}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-2">
                        <Button
                          size="sm"
                          className="ml-auto"
                          onClick={() => handleRegister(event.id)}
                        >
                          Register
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Events</CardTitle>
                <CardDescription>
                  Previous volunteer opportunities organized by{' '}
                  {organization.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {organization.pastEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col justify-between rounded-lg border p-3 sm:flex-row sm:items-center"
                    >
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(event.date)} • {event.location}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 sm:mt-0">
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {event.participantsCount} participants
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Past Events
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Our Impact</CardTitle>
                <CardDescription>
                  See the difference {organization.name} has made
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Card className="border-none bg-primary/5">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Trees Planted
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-3xl font-bold">
                        {organization.impactStats.treesPlanted}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-primary/5">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Waste Collected
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-3xl font-bold">
                        {organization.impactStats.wasteCollected}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-primary/5">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Areas Cleaned
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-3xl font-bold">
                        {organization.impactStats.areasCleaned}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none bg-primary/5">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Education Workshops
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-3xl font-bold">
                        {organization.impactStats.educationWorkshops}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-medium">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">
                    At {organization.name}, our mission is to foster a
                    sustainable relationship between humans and the environment.
                    We believe that by empowering individuals and communities
                    with knowledge and opportunities for action, we can create a
                    more sustainable and environmentally conscious world.
                  </p>

                  <h3 className="mt-4 text-lg font-medium">Success Stories</h3>
                  <div className="space-y-3">
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Central Park Restoration</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Over 3 years, our volunteers have helped restore 5 acres
                        of Central Park, planting native species and removing
                        invasive plants. The area now serves as a thriving
                        habitat for local wildlife.
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="font-medium">Beach Cleanup Initiative</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Our annual beach cleanup drives have removed over 2.5
                        tons of waste from local shorelines, significantly
                        improving water quality and protecting marine life.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Reviews</CardTitle>
                <CardDescription>
                  What volunteers are saying about {organization.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organization.reviews.map((review) => (
                    <Card key={review.id} className="border-muted">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {review.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.user}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(review.date)}
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Write a Review</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
