import React, { useState } from 'react';
import {
  PieChart,
  BarChart2,
  Users,
  Calendar,
  Award,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import PageHead from '@/components/shared/page-head';

// Mock data for charts and metrics
const overviewMetrics = [
  {
    title: 'Total Volunteers',
    value: '186',
    change: '+12%',
    trend: 'up',
    icon: Users,
    description: 'Active volunteers in the last 30 days'
  },
  {
    title: 'Events Organized',
    value: '23',
    change: '+5%',
    trend: 'up',
    icon: Calendar,
    description: 'Events in the past 3 months'
  },
  {
    title: 'Volunteer Hours',
    value: '1,284',
    change: '+18%',
    trend: 'up',
    icon: Clock,
    description: 'Total hours contributed'
  },
  {
    title: 'Impact Score',
    value: '78',
    change: '-3%',
    trend: 'down',
    icon: Award,
    description: 'Based on community feedback'
  }
];

const eventAttendanceData = [
  { name: 'Beach Cleanup', attended: 42, registered: 50 },
  { name: 'Tree Planting', attended: 38, registered: 45 },
  { name: 'Food Drive', attended: 35, registered: 40 },
  { name: 'Charity Run', attended: 28, registered: 40 },
  { name: 'Workshop', attended: 22, registered: 30 }
];

const volunteerDemographics = {
  age: [
    { group: '18-24', percentage: 32 },
    { group: '25-34', percentage: 41 },
    { group: '35-44', percentage: 15 },
    { group: '45-54', percentage: 8 },
    { group: '55+', percentage: 4 }
  ],
  engagement: [
    { level: 'First-time', count: 45 },
    { level: 'Occasional', count: 78 },
    { level: 'Regular', count: 42 },
    { level: 'Core', count: 21 }
  ]
};

const impactMetrics = [
  {
    category: 'Environmental',
    metrics: [
      { name: 'Trees Planted', value: 350, unit: '' },
      { name: 'Waste Collected', value: 1250, unit: 'kg' },
      { name: 'Beach Area Cleaned', value: 8, unit: 'km' }
    ]
  },
  {
    category: 'Community',
    metrics: [
      { name: 'People Served', value: 1200, unit: '' },
      { name: 'Food Packages', value: 450, unit: '' },
      { name: 'Education Hours', value: 320, unit: 'hrs' }
    ]
  }
];

const topVolunteers = [
  { name: 'Michael Chen', hours: 42, events: 8 },
  { name: 'Sarah Johnson', hours: 36, events: 7 },
  { name: 'David Rodriguez', hours: 34, events: 6 },
  { name: 'Emily Wong', hours: 28, events: 5 },
  { name: 'James Wilson', hours: 24, events: 5 }
];

export default function OrganizationAnalytics() {
  const [timeRange, setTimeRange] = useState('3months');

  return (
    <div className="flex flex-col space-y-6 p-8 pb-10">
      <div className="flex items-center justify-between">
        <PageHead title="Analytics" />
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center pt-1">
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
                )}
                <p
                  className={`text-xs ${metric.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
                >
                  {metric.change}
                </p>
                <p className="ml-2 text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Event Performance</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteer Insights</TabsTrigger>
          <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Event Attendance Card */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Event Attendance</CardTitle>
                <CardDescription>
                  Registration vs. actual attendance for recent events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventAttendanceData.map((event, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{event.name}</span>
                          <Badge variant="outline">
                            {Math.round(
                              (event.attended / event.registered) * 100
                            )}
                            % attendance
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {event.attended} / {event.registered}
                        </span>
                      </div>
                      <Progress
                        value={(event.attended / event.registered) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Feedback Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Event Feedback</CardTitle>
                <CardDescription>
                  Average ratings from participants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Organization</span>
                    <span className="text-sm text-muted-foreground">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Experience</span>
                    <span className="text-sm text-muted-foreground">4.6/5</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Communication</span>
                    <span className="text-sm text-muted-foreground">4.5/5</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Would volunteer again
                    </span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Volunteer Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>
                  Age groups of active volunteers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteerDemographics.age.map((ageGroup, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {ageGroup.group}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {ageGroup.percentage}%
                        </span>
                      </div>
                      <Progress value={ageGroup.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Volunteer Engagement */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Levels</CardTitle>
                <CardDescription>
                  Volunteer participation frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteerDemographics.engagement.map((level, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-14 text-sm font-medium">
                        {level.level}
                      </div>
                      <div className="flex-1">
                        <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="bg-primary"
                            style={{
                              width: `${(level.count / volunteerDemographics.engagement.reduce((acc, curr) => acc + curr.count, 0)) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-10 text-right text-sm text-muted-foreground">
                        {level.count}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Volunteers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Volunteers</CardTitle>
                <CardDescription>Most active participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVolunteers.map((volunteer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {volunteer.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {volunteer.events} events
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {volunteer.hours} hrs
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {impactMetrics.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle>{category.category} Impact</CardTitle>
                  <CardDescription>
                    Measurable outcomes of your volunteer activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {category.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          {categoryIndex === 0 ? (
                            <PieChart className="h-6 w-6 text-primary" />
                          ) : (
                            <BarChart2 className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">{metric.name}</p>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold tracking-tight">
                              {metric.value}
                            </span>
                            {metric.unit && (
                              <span className="ml-1 text-sm text-muted-foreground">
                                {metric.unit}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Growth Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Growth & Trends</CardTitle>
              <CardDescription>
                Year-over-year comparison of key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Volunteer Growth
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold tracking-tight">
                      +26%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs. previous year
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Event Attendance
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold tracking-tight">
                      +18%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs. previous year
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Total Volunteer Hours
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold tracking-tight">
                      +32%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs. previous year
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Community Reach
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold tracking-tight">
                      +45%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs. previous year
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
