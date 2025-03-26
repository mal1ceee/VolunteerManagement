import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import PageHead from '@/components/shared/page-head';
import { ArrowLeft, GraduationCap, Mail, UserIcon } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

// Sample student data (same as in StudentPage)
const students = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    major: 'Computer Science',
    gpa: 3.8,
    year: 'Senior',
    enrollmentDate: 'September 10, 2021',
    expectedGraduation: 'May 15, 2025',
    address: '123 College Ave, University Town, UT 12345',
    phone: '(555) 123-4567',
    courses: [
      'Advanced Algorithm Design',
      'Machine Learning',
      'Database Systems',
      'Software Engineering'
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    major: 'Biology',
    gpa: 3.9,
    year: 'Junior',
    enrollmentDate: 'September 12, 2022',
    expectedGraduation: 'May 15, 2026',
    address: '456 University Blvd, College City, CC 23456',
    phone: '(555) 234-5678',
    courses: [
      'Molecular Biology',
      'Genetics',
      'Organic Chemistry',
      'Biochemistry'
    ]
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    major: 'Engineering',
    gpa: 3.5,
    year: 'Sophomore',
    enrollmentDate: 'September 15, 2023',
    expectedGraduation: 'May 15, 2027',
    address: '789 Engineering Drive, Tech City, TC 34567',
    phone: '(555) 345-6789',
    courses: [
      'Mechanics',
      'Thermodynamics',
      'Materials Science',
      'Fluid Dynamics'
    ]
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    major: 'Psychology',
    gpa: 3.7,
    year: 'Senior',
    enrollmentDate: 'September 8, 2021',
    expectedGraduation: 'May 15, 2025',
    address: '101 Psychology Lane, Mind Town, MT 45678',
    phone: '(555) 456-7890',
    courses: [
      'Cognitive Psychology',
      'Abnormal Psychology',
      'Social Psychology',
      'Research Methods'
    ]
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.w@example.com',
    major: 'Business',
    gpa: 3.4,
    year: 'Freshman',
    enrollmentDate: 'September 20, 2024',
    expectedGraduation: 'May 15, 2028',
    address: '202 Business Circle, Commerce City, CC 56789',
    phone: '(555) 567-8901',
    courses: [
      'Introduction to Business',
      'Accounting Principles',
      'Microeconomics',
      'Business Communication'
    ]
  }
];

export default function StudentDetailPage() {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('id');

  // Find the student with the matching ID
  const student = students.find((student) => student.id === Number(studentId));

  if (!student) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Student Not Found</h1>
        <p className="mb-4">The student you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/dashboard/student">Go Back to Students</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <PageHead title={`${student.name} | Student Details`} />

      <div className="mb-6 flex items-center">
        <Button variant="ghost" className="mr-4" asChild>
          <Link to="/dashboard/student">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-muted-foreground">
            {student.major} | {student.year}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Personal and contact details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="mr-2 font-medium">Name:</span>
              <span>{student.name}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="mr-2 font-medium">Email:</span>
              <span>{student.email}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="mr-2 font-medium">Major:</span>
              <span>{student.major}</span>
            </div>
            <div className="flex">
              <span className="ml-6 mr-2 font-medium">GPA:</span>
              <span>{student.gpa}</span>
            </div>
            <div className="flex">
              <span className="ml-6 mr-2 font-medium">Year:</span>
              <span>{student.year}</span>
            </div>
            <div className="flex">
              <span className="ml-6 mr-2 font-medium">Phone:</span>
              <span>{student.phone}</span>
            </div>
            <div className="flex">
              <span className="ml-6 mr-2 font-medium">Address:</span>
              <span>{student.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>Enrollment and course details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex">
              <span className="mr-2 font-medium">Enrollment Date:</span>
              <span>{student.enrollmentDate}</span>
            </div>
            <div className="flex">
              <span className="mr-2 font-medium">Expected Graduation:</span>
              <span>{student.expectedGraduation}</span>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-medium">Current Courses:</h3>
              <ul className="list-disc pl-6">
                {student.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline">Print Report</Button>
        <Button variant="default">Edit Information</Button>
      </div>
    </div>
  );
}
