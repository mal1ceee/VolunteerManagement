import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['volunteer', 'organization', 'admin'], {
    required_error: 'Please select a user role'
  })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: 'volunteer@example.com',
    password: '',
    role: 'volunteer' as const
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // Update email based on selected role
  const onRoleChange = (role: string) => {
    const emailMap = {
      volunteer: 'volunteer@example.com',
      organization: 'organization@example.com',
      admin: 'admin@example.com'
    };

    form.setValue('email', emailMap[role as keyof typeof emailMap]);
  };

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      console.log('Login data', data);
      // Simulate authentication success
      setTimeout(() => {
        // Store role information in localStorage (in a real app, this would come from backend)
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userToken', 'demo-token');

        // Redirect to appropriate dashboard based on role
        if (data.role === 'organization') {
          router.push('/organization');
        } else if (data.role === 'admin') {
          router.push('/dashboard/admin-dashboard');
        } else {
          router.push('/dashboard');
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    onRoleChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" type="button" disabled={loading}>
          Google
        </Button>
        <Button variant="outline" type="button" disabled={loading}>
          GitHub
        </Button>
        <Button variant="outline" type="button" disabled={loading}>
          Twitter
        </Button>
      </div>
    </>
  );
}
