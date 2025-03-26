import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import PageHead from '@/components/shared/page-head';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';

// Form schemas for validation
const generalSettingsSchema = z.object({
  platformName: z.string().min(2, {
    message: 'Platform name must be at least 2 characters.'
  }),
  platformDescription: z.string().min(10, {
    message: 'Platform description must be at least 10 characters.'
  }),
  adminEmail: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  supportEmail: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  logoUrl: z.string().url().optional(),
  faviconUrl: z.string().url().optional()
});

const registrationSettingsSchema = z.object({
  allowNewRegistrations: z.boolean().default(true),
  requireEmailVerification: z.boolean().default(true),
  autoApproveOrganizations: z.boolean().default(false),
  requireOrganizationVerification: z.boolean().default(true),
  allowSocialSignIn: z.boolean().default(true),
  registrationMessage: z.string().optional()
});

const emailSettingsSchema = z.object({
  emailProvider: z.string(),
  smtpHost: z.string().min(1, { message: 'SMTP host is required' }),
  smtpPort: z.coerce.number().int().positive(),
  smtpUsername: z.string().min(1, { message: 'SMTP username is required' }),
  smtpPassword: z.string().min(1, { message: 'SMTP password is required' }),
  fromEmail: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  fromName: z.string().min(1, { message: 'From name is required' }),
  enableEmailTemplates: z.boolean().default(true)
});

const notificationSettingsSchema = z.object({
  enableNotifications: z.boolean().default(true),
  newUserNotification: z.boolean().default(true),
  newOrganizationNotification: z.boolean().default(true),
  newEventNotification: z.boolean().default(false),
  reportGenerationNotification: z.boolean().default(true),
  notifyAdmins: z.boolean().default(true)
});

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');

  // General Settings Form
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      platformName: 'Volunteer Connect',
      platformDescription:
        'A platform connecting volunteers with organizations to make a difference.',
      adminEmail: 'admin@volunteerconnect.com',
      supportEmail: 'support@volunteerconnect.com',
      logoUrl: 'https://example.com/logo.png',
      faviconUrl: 'https://example.com/favicon.ico'
    }
  });

  // Registration Settings Form
  const registrationForm = useForm<z.infer<typeof registrationSettingsSchema>>({
    resolver: zodResolver(registrationSettingsSchema),
    defaultValues: {
      allowNewRegistrations: true,
      requireEmailVerification: true,
      autoApproveOrganizations: false,
      requireOrganizationVerification: true,
      allowSocialSignIn: true,
      registrationMessage: 'Thank you for registering with Volunteer Connect!'
    }
  });

  // Email Settings Form
  const emailForm = useForm<z.infer<typeof emailSettingsSchema>>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      emailProvider: 'smtp',
      smtpHost: 'smtp.example.com',
      smtpPort: 587,
      smtpUsername: 'notifications@volunteerconnect.com',
      smtpPassword: '••••••••••••',
      fromEmail: 'notifications@volunteerconnect.com',
      fromName: 'Volunteer Connect',
      enableEmailTemplates: true
    }
  });

  // Notification Settings Form
  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      enableNotifications: true,
      newUserNotification: true,
      newOrganizationNotification: true,
      newEventNotification: false,
      reportGenerationNotification: true,
      notifyAdmins: true
    }
  });

  const onSubmitGeneralSettings = (
    data: z.infer<typeof generalSettingsSchema>
  ) => {
    console.log('General Settings:', data);
    // In a real application, you would save these settings to your backend
  };

  const onSubmitRegistrationSettings = (
    data: z.infer<typeof registrationSettingsSchema>
  ) => {
    console.log('Registration Settings:', data);
    // In a real application, you would save these settings to your backend
  };

  const onSubmitEmailSettings = (data: z.infer<typeof emailSettingsSchema>) => {
    console.log('Email Settings:', data);
    // In a real application, you would save these settings to your backend
  };

  const onSubmitNotificationSettings = (
    data: z.infer<typeof notificationSettingsSchema>
  ) => {
    console.log('Notification Settings:', data);
    // In a real application, you would save these settings to your backend
  };

  return (
    <div className="flex flex-col space-y-6 pb-10">
      <PageHead title="Admin Settings | Volunteer Connect" />

      <div>
        <h1 className="text-2xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure platform settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="registration">Registration</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic platform settings and branding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form
                  onSubmit={generalForm.handleSubmit(onSubmitGeneralSettings)}
                  className="space-y-6"
                >
                  <FormField
                    control={generalForm.control}
                    name="platformName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The name of your volunteer platform
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="platformDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[100px]" />
                        </FormControl>
                        <FormDescription>
                          A brief description of your volunteer platform
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="adminEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Primary admin contact email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="supportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Support Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Public support contact email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            URL to your platform logo
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="faviconUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            URL to your platform favicon
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Save General Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Settings</CardTitle>
              <CardDescription>
                Configure user registration and account creation settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...registrationForm}>
                <form
                  onSubmit={registrationForm.handleSubmit(
                    onSubmitRegistrationSettings
                  )}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={registrationForm.control}
                      name="allowNewRegistrations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Allow New Registrations
                            </FormLabel>
                            <FormDescription>
                              When disabled, new users cannot register
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registrationForm.control}
                      name="requireEmailVerification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Require Email Verification
                            </FormLabel>
                            <FormDescription>
                              Users must verify their email address before
                              accessing the platform
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registrationForm.control}
                      name="autoApproveOrganizations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Auto-Approve Organizations
                            </FormLabel>
                            <FormDescription>
                              Automatically approve new organization
                              registrations
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registrationForm.control}
                      name="requireOrganizationVerification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Require Organization Verification
                            </FormLabel>
                            <FormDescription>
                              Organizations must be verified before they can
                              create events
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registrationForm.control}
                      name="allowSocialSignIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Allow Social Sign-In
                            </FormLabel>
                            <FormDescription>
                              Enable sign-in options via Google, Facebook, etc.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registrationForm.control}
                      name="registrationMessage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Message shown to users after successful registration"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This message will be shown to users after they
                            register
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Save Registration Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email provider and notification settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onSubmitEmailSettings)}
                  className="space-y-6"
                >
                  <FormField
                    control={emailForm.control}
                    name="emailProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Provider</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select email provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="smtp">SMTP</SelectItem>
                            <SelectItem value="sendgrid">SendGrid</SelectItem>
                            <SelectItem value="mailchimp">Mailchimp</SelectItem>
                            <SelectItem value="amazonses">
                              Amazon SES
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select your email service provider
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 rounded-md border p-4">
                    <h4 className="text-sm font-medium">SMTP Configuration</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={emailForm.control}
                        name="smtpHost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Host</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={emailForm.control}
                        name="smtpPort"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Port</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={emailForm.control}
                        name="smtpUsername"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={emailForm.control}
                        name="smtpPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={emailForm.control}
                      name="fromEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The email address displayed in the From field
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={emailForm.control}
                      name="fromName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>From Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The name displayed in the From field
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={emailForm.control}
                    name="enableEmailTemplates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable Email Templates
                          </FormLabel>
                          <FormDescription>
                            Use customizable HTML email templates for
                            notifications
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Save Email Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  onSubmit={notificationForm.handleSubmit(
                    onSubmitNotificationSettings
                  )}
                  className="space-y-6"
                >
                  <FormField
                    control={notificationForm.control}
                    name="enableNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable Notifications
                          </FormLabel>
                          <FormDescription>
                            Enable system notifications and email alerts
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">
                      Admin Notification Preferences
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select which events should trigger admin notifications
                    </p>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={notificationForm.control}
                        name="newUserNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>New User Registration</FormLabel>
                              <FormDescription>
                                Notify when a new user registers
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="newOrganizationNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                New Organization Registration
                              </FormLabel>
                              <FormDescription>
                                Notify when a new organization registers
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="newEventNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>New Event Creation</FormLabel>
                              <FormDescription>
                                Notify when a new event is created
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="reportGenerationNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Report Generation</FormLabel>
                              <FormDescription>
                                Notify when a new report is generated
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={notificationForm.control}
                      name="notifyAdmins"
                      render={({ field }) => (
                        <FormItem className="mt-4 flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Notify All Administrators
                            </FormLabel>
                            <FormDescription>
                              Send notifications to all platform administrators
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Save Notification Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
