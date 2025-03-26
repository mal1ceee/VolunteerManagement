import PageHead from '@/components/shared/page-head';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Sample achievements data
const earnedAchievements = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first volunteer event',
    icon: '🌟',
    dateEarned: '2023-03-15',
    category: 'Events'
  },
  {
    id: 2,
    name: 'Team Player',
    description: 'Volunteer with 3 different organizations',
    icon: '👥',
    dateEarned: '2023-04-22',
    category: 'Organizations'
  },
  {
    id: 3,
    name: 'Early Bird',
    description: 'Attend 5 morning volunteer events',
    icon: '🌅',
    dateEarned: '2023-05-10',
    category: 'Events'
  },
  {
    id: 4,
    name: 'Community Builder',
    description: 'Refer 3 friends who become volunteers',
    icon: '🏙️',
    dateEarned: '2023-06-05',
    category: 'Community'
  }
];

const inProgressAchievements = [
  {
    id: 5,
    name: 'Centurion',
    description: 'Complete 100 volunteer hours',
    icon: '⏱️',
    progress: 68,
    category: 'Hours'
  },
  {
    id: 6,
    name: 'Environmental Champion',
    description: 'Participate in 10 environmental events',
    icon: '🌳',
    progress: 40,
    category: 'Environment'
  },
  {
    id: 7,
    name: 'Food Hero',
    description: 'Volunteer at 15 food-related events',
    icon: '🍲',
    progress: 33,
    category: 'Food & Hunger'
  },
  {
    id: 8,
    name: 'Dedicated Volunteer',
    description: 'Volunteer every month for a year',
    icon: '📅',
    progress: 75,
    category: 'Consistency'
  }
];

const lockedAchievements = [
  {
    id: 9,
    name: 'Leadership Award',
    description: 'Lead a volunteer team for 5 events',
    icon: '👑',
    category: 'Leadership'
  },
  {
    id: 10,
    name: 'Global Citizen',
    description: 'Volunteer in 3 different cities',
    icon: '🌎',
    category: 'Travel'
  },
  {
    id: 11,
    name: 'Specialist',
    description: 'Complete 20 events in the same category',
    icon: '🔍',
    category: 'Specialization'
  },
  {
    id: 12,
    name: 'Mentor',
    description: 'Help train 10 new volunteers',
    icon: '🧑‍🏫',
    category: 'Training'
  }
];

// Statistics
const volunteerStats = {
  totalHours: 145,
  eventsCompleted: 18,
  organizations: 5,
  rank: 'Silver Volunteer'
};

export default function AchievementsPage() {
  return (
    <>
      <PageHead title="Achievements | Volunteer Connect" />
      <div className="max-h-screen flex-1 space-y-4 overflow-y-auto p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Achievements</h2>
          <Badge variant="secondary" className="px-4 py-1 text-base">
            Level: {volunteerStats.rank}
          </Badge>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {volunteerStats.totalHours}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Events Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {volunteerStats.eventsCompleted}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Organizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {volunteerStats.organizations}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Level</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-2xl font-bold">Gold Volunteer</div>
              <Progress value={68} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Achievement Tabs */}
        <Tabs defaultValue="earned" className="space-y-4">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="earned">
              Earned ({earnedAchievements.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressAchievements.length})
            </TabsTrigger>
            <TabsTrigger value="locked">
              Locked ({lockedAchievements.length})
            </TabsTrigger>
          </TabsList>

          {/* Earned Achievements */}
          <TabsContent value="earned" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {earnedAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="overflow-hidden border-green-200 shadow-sm"
                >
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {achievement.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Earned on{' '}
                          {new Date(
                            achievement.dateEarned
                          ).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    <Badge variant="outline" className="mt-3">
                      {achievement.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* In Progress Achievements */}
          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inProgressAchievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {achievement.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {achievement.progress}% complete
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    <Progress value={achievement.progress} className="mb-2" />
                    <Badge variant="outline">{achievement.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Locked Achievements */}
          <TabsContent value="locked" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lockedAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="overflow-hidden opacity-70"
                >
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {achievement.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Locked
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                    <Badge variant="outline" className="mt-3">
                      {achievement.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
