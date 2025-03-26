import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import PageHead from '@/components/shared/page-head';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  DownloadIcon,
  FileIcon,
  MailIcon,
  UserIcon,
  UsersIcon
} from 'lucide-react';
import { useState } from 'react';

// Mock data for the charts and statistics
const platformStats = [
  {
    title: 'Total Volunteers',
    value: '5,256',
    change: '+12%',
    changeType: 'positive',
    icon: UserIcon
  },
  {
    title: 'Total Organizations',
    value: '217',
    change: '+8%',
    changeType: 'positive',
    icon: UsersIcon
  },
  {
    title: 'Active Events',
    value: '382',
    change: '+15%',
    changeType: 'positive',
    icon: FileIcon
  },
  {
    title: 'Messages Sent',
    value: '24,853',
    change: '+32%',
    changeType: 'positive',
    icon: MailIcon
  }
];

const volunteerGrowthData = [
  { month: 'Jan', volunteers: 3250 },
  { month: 'Feb', volunteers: 3450 },
  { month: 'Mar', volunteers: 3800 },
  { month: 'Apr', volunteers: 4100 },
  { month: 'May', volunteers: 4350 },
  { month: 'Jun', volunteers: 4500 },
  { month: 'Jul', volunteers: 4750 },
  { month: 'Aug', volunteers: 4900 },
  { month: 'Sep', volunteers: 5050 },
  { month: 'Oct', volunteers: 5150 },
  { month: 'Nov', volunteers: 5250 },
  { month: 'Dec', volunteers: 5256 }
];

const organizationGrowthData = [
  { month: 'Jan', organizations: 120 },
  { month: 'Feb', organizations: 130 },
  { month: 'Mar', organizations: 145 },
  { month: 'Apr', organizations: 158 },
  { month: 'May', organizations: 170 },
  { month: 'Jun', organizations: 180 },
  { month: 'Jul', organizations: 190 },
  { month: 'Aug', organizations: 195 },
  { month: 'Sep', organizations: 203 },
  { month: 'Oct', organizations: 210 },
  { month: 'Nov', organizations: 215 },
  { month: 'Dec', organizations: 217 }
];

const eventCategoriesData = [
  { category: 'Environment', events: 125, percentage: 32.7 },
  { category: 'Community Service', events: 95, percentage: 24.9 },
  { category: 'Education', events: 65, percentage: 17.0 },
  { category: 'Healthcare', events: 48, percentage: 12.6 },
  { category: 'Animal Welfare', events: 32, percentage: 8.4 },
  { category: 'Other', events: 17, percentage: 4.4 }
];

const verificationStatusData = [
  { status: 'Verified', organizations: 172, percentage: 79.3 },
  { status: 'Pending', organizations: 31, percentage: 14.3 },
  { status: 'Rejected', organizations: 14, percentage: 6.4 }
];

const userActivityData = [
  { period: 'Daily Active Users', volunteers: 876, organizations: 102 },
  { period: 'Weekly Active Users', volunteers: 2143, organizations: 156 },
  { period: 'Monthly Active Users', volunteers: 3825, organizations: 201 }
];

// Available report exports
const availableReports = [
  {
    title: 'Volunteer Growth Report',
    description:
      'Monthly growth trends for volunteer registrations and activity.',
    lastGenerated: '2025-03-15'
  },
  {
    title: 'Organization Verification Status',
    description:
      'Overview of organization verification statuses and approval rates.',
    lastGenerated: '2025-03-20'
  },
  {
    title: 'Event Participation Metrics',
    description:
      'Detailed analysis of event participation, completion rates, and feedback.',
    lastGenerated: '2025-03-18'
  },
  {
    title: 'Geographic Distribution',
    description:
      'Regional distribution of volunteers and organizations across the platform.',
    lastGenerated: '2025-03-10'
  },
  {
    title: 'User Engagement Report',
    description:
      'Analysis of user interactions, session duration, and feature usage.',
    lastGenerated: '2025-03-22'
  }
];

export default function AdminReports() {
  const [timeframe, setTimeframe] = useState('year');

  // Function to render stat cards with the appropriate change icon
  const renderChangeIcon = (changeType: string) => {
    if (changeType === 'positive') {
      return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    } else if (changeType === 'negative') {
      return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    } else {
      return <ArrowRightIcon className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <PageHead title="Reports & Analytics | Admin Dashboard" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Platform metrics and downloadable reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Platform Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {renderChangeIcon(stat.changeType)}
                <span
                  className={
                    stat.changeType === 'positive'
                      ? 'text-green-500'
                      : stat.changeType === 'negative'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1">since last {timeframe}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Growth Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Volunteer Growth</CardTitle>
            <CardDescription>Volunteer registrations over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {/* In a real app, this would be a Chart component */}
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-muted/20 p-4">
              <div className="mb-2 text-center">Bar Chart Visualization</div>
              <div className="text-xs text-muted-foreground">
                {volunteerGrowthData[0].month} (
                {volunteerGrowthData[0].volunteers}) →{' '}
                {volunteerGrowthData[volunteerGrowthData.length - 1].month} (
                {volunteerGrowthData[volunteerGrowthData.length - 1].volunteers}
                )
              </div>
              {/* Visual representation of the chart would go here */}
              <div className="mt-4 flex h-40 w-full items-end justify-between border-b border-l p-2">
                {volunteerGrowthData.map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-6 rounded-t-sm bg-primary"
                      style={{
                        height: `${(item.volunteers / 5500) * 100}%`,
                        opacity: 0.4 + (i / volunteerGrowthData.length) * 0.6
                      }}
                    ></div>
                    <div className="mt-1 text-[8px]">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Organization Growth</CardTitle>
            <CardDescription>
              Registered organizations over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            {/* In a real app, this would be a Chart component */}
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md bg-muted/20 p-4">
              <div className="mb-2 text-center">Line Chart Visualization</div>
              <div className="text-xs text-muted-foreground">
                {organizationGrowthData[0].month} (
                {organizationGrowthData[0].organizations}) →{' '}
                {
                  organizationGrowthData[organizationGrowthData.length - 1]
                    .month
                }{' '}
                (
                {
                  organizationGrowthData[organizationGrowthData.length - 1]
                    .organizations
                }
                )
              </div>
              {/* Visual representation of the chart would go here */}
              <div className="relative mt-4 h-40 w-full border-b border-l p-2">
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end">
                  {organizationGrowthData.map((item, i) => {
                    const nextPoint = organizationGrowthData[i + 1];
                    if (!nextPoint) return null;

                    return (
                      <div
                        key={i}
                        className="absolute h-1 bg-primary"
                        style={{
                          left: `${(i / (organizationGrowthData.length - 1)) * 100}%`,
                          bottom: `${(item.organizations / 250) * 100}%`,
                          width: `${(1 / (organizationGrowthData.length - 1)) * 100}%`,
                          transform: `rotate(${Math.atan2(
                            ((nextPoint.organizations - item.organizations) /
                              250) *
                              40,
                            (1 / (organizationGrowthData.length - 1)) * 40
                          )}rad)`,
                          transformOrigin: 'left bottom',
                          opacity:
                            0.7 + (i / organizationGrowthData.length) * 0.3
                        }}
                      ></div>
                    );
                  })}

                  {organizationGrowthData.map((item, i) => (
                    <div
                      key={i}
                      className="absolute size-2 rounded-full bg-primary"
                      style={{
                        left: `${(i / (organizationGrowthData.length - 1)) * 100}%`,
                        bottom: `${(item.organizations / 250) * 100}%`,
                        transform: 'translate(-50%, 50%)'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category and Verification Status Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Event Categories Distribution</CardTitle>
            <CardDescription>Breakdown of events by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventCategoriesData.map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-16 text-sm">{item.category}</div>
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <div className="relative h-2 w-full rounded-full bg-primary">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full bg-primary-foreground"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="min-w-12 text-right text-sm">
                        {item.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Organization Verification Status</CardTitle>
            <CardDescription>Current verification statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-60 items-center justify-center">
              {/* In a real app, this would be a Pie Chart component */}
              <div className="relative size-40 overflow-hidden rounded-full">
                {verificationStatusData.map((item, i) => {
                  // Calculate the rotation and size for the pie segments
                  const previousPercentages = verificationStatusData
                    .slice(0, i)
                    .reduce((sum, item) => sum + item.percentage, 0);

                  const colors = [
                    'bg-green-500',
                    'bg-yellow-500',
                    'bg-red-500'
                  ];

                  return (
                    <div
                      key={i}
                      className={`absolute left-0 top-0 size-full ${colors[i]}`}
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`,
                        transform: `rotate(${previousPercentages * 3.6}deg)`,
                        opacity: 0.8
                      }}
                    ></div>
                  );
                })}
                <div className="absolute inset-4 flex items-center justify-center rounded-full bg-background">
                  <div className="text-center">
                    <div className="text-sm font-medium">Total</div>
                    <div className="text-2xl font-bold">217</div>
                  </div>
                </div>
              </div>

              <div className="ml-8 space-y-2">
                {verificationStatusData.map((item, i) => {
                  const colors = [
                    'bg-green-500',
                    'bg-yellow-500',
                    'bg-red-500'
                  ];

                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`size-3 rounded-full ${colors[i]}`}></div>
                      <div>
                        <div className="text-sm font-medium">{item.status}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.organizations} orgs ({item.percentage}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>
            Active users across different time periods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {userActivityData.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="font-medium">{item.period}</div>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Volunteers</span>
                      <span>{item.volunteers}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(item.volunteers / 5256) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Organizations</span>
                      <span>{item.organizations}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-secondary"
                        style={{
                          width: `${(item.organizations / 217) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Downloadable Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>
            Download pre-generated reports and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {availableReports.map((report, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <div className="font-medium">{report.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {report.description}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Last generated: {report.lastGenerated}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
