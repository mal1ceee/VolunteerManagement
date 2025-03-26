import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import PageHead from '@/components/shared/page-head';
import { EyeIcon, PenIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample student data
const students = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    major: 'Computer Science',
    gpa: 3.8,
    year: 'Senior'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    major: 'Biology',
    gpa: 3.9,
    year: 'Junior'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    major: 'Engineering',
    gpa: 3.5,
    year: 'Sophomore'
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    major: 'Psychology',
    gpa: 3.7,
    year: 'Senior'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.w@example.com',
    major: 'Business',
    gpa: 3.4,
    year: 'Freshman'
  }
];

export default function StudentPage() {
  return (
    <div className="flex flex-col">
      <PageHead title="Students | Dashboard" />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student information</p>
        </div>
        <Button>Add New Student</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>A list of all registered students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.major}</TableCell>
                  <TableCell>{student.gpa}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          to={`/dashboard/student/details?id=${student.id}`}
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <PenIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
