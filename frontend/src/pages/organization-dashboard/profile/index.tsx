import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import PageHead from '@/components/shared/page-head';
import {
  Upload,
  Camera,
  Save,
  ExternalLink,
  Check,
  X,
  MapPin,
  Mail,
  Phone,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Users
} from 'lucide-react';

// Organization profile data
const organizationData = {
  name: 'Green Earth Initiative',
  logo: '/avatars/organization.jpg',
  coverImage: '/images/cover-image.jpg',
  shortDescription:
    'Environmental conservation organization focused on sustainability and education.',
  longDescription:
    'Green Earth Initiative is dedicated to protecting our planet through community-based environmental conservation projects. We focus on education, sustainability initiatives, and direct action to create a healthier environment for all. Founded in 2010, we have implemented dozens of successful projects across the country.',
  email: 'contact@greenearthinitiative.org',
  phone: '(555) 123-4567',
  website: 'https://www.greenearthinitiative.org',
  socialMedia: {
    facebook: 'https://facebook.com/greenearthinitiative',
    twitter: 'https://twitter.com/greenearth',
    instagram: 'https://instagram.com/greenearthinitiative'
  },
  address: {
    street: '123 Environmental Way',
    city: 'Green City',
    state: 'CA',
    zipCode: '94123',
    country: 'United States'
  },
  category: 'Environmental',
  subcategories: ['Conservation', 'Education', 'Climate Action'],
  foundingYear: 2010,
  teamSize: '11-50',
  isVerified: true,
  status: 'active',
  donationsAccepted: true,
  volunteerCapacity: 200,
  achievements: [
    { name: 'Community Impact Award', year: 2022 },
    { name: 'Environmental Excellence Recognition', year: 2021 },
    { name: 'Sustainability Champion', year: 2020 }
  ]
};

export default function OrganizationProfile() {
  const [formData, setFormData] = useState(organizationData);
  const [activeTab, setActiveTab] = useState('general');
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (
    parent: string,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving organization profile:', formData);
    // Here you would typically send an API request to update the organization profile
    setEditMode(false);
  };

  return (
    <div className="flex flex-col space-y-6 p-8 pb-10">
      <div className="flex items-center justify-between">
        <PageHead title="Organization Profile" />
        <Button
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          variant={editMode ? 'default' : 'outline'}
        >
          {editMode ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>Edit Profile</>
          )}
        </Button>
      </div>

      {/* Profile Header Card */}
      <Card className="relative">
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <img
            src={formData.coverImage || '/images/default-cover.jpg'}
            alt="Cover"
            className="h-full w-full object-cover"
          />
          {editMode && (
            <div className="absolute bottom-4 right-4">
              <Button variant="secondary" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Change Cover
              </Button>
            </div>
          )}
        </div>

        <div className="-mt-12 flex flex-col items-start gap-4 p-6 md:-mt-16 md:flex-row md:items-end">
          <div className="relative">
            <Avatar className="h-24 w-24 rounded-xl border-4 border-background md:h-32 md:w-32">
              <AvatarImage src={formData.logo} alt={formData.name} />
              <AvatarFallback className="text-2xl md:text-3xl">
                {formData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {editMode && (
              <Button
                size="icon"
                variant="outline"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
              >
                <Upload className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h2 className="text-2xl font-bold">
                {editMode ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-auto py-1 text-2xl font-bold"
                  />
                ) : (
                  formData.name
                )}
              </h2>
              {formData.isVerified && (
                <Badge variant="secondary" className="h-5 gap-1 text-xs">
                  <Check className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {editMode ? (
                    <Input
                      value={`${formData.address.city}, ${formData.address.state}`}
                      onChange={(e) => {
                        const [city, state] = e.target.value.split(', ');
                        handleNestedInputChange('address', 'city', city);
                        if (state)
                          handleNestedInputChange('address', 'state', state);
                      }}
                      className="h-7 py-1 text-sm"
                    />
                  ) : (
                    `${formData.address.city}, ${formData.address.state}`
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {editMode ? (
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) =>
                        handleInputChange('teamSize', value)
                      }
                    >
                      <SelectTrigger className="h-7 text-sm">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">
                          201-500 employees
                        </SelectItem>
                        <SelectItem value="501+">501+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    `${formData.teamSize} employees`
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>
                  {editMode ? (
                    <Input
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange('website', e.target.value)
                      }
                      className="h-7 py-1 text-sm"
                    />
                  ) : (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      Website <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Tabs
        defaultValue="general"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="general">General Information</TabsTrigger>
          <TabsTrigger value="contact">Contact & Location</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Basic information about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                {editMode ? (
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange('shortDescription', e.target.value)
                    }
                  />
                ) : (
                  <p>{formData.shortDescription}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">About</Label>
                {editMode ? (
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) =>
                      handleInputChange('longDescription', e.target.value)
                    }
                    rows={6}
                  />
                ) : (
                  <p className="whitespace-pre-wrap">
                    {formData.longDescription}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  {editMode ? (
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange('category', value)
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Environmental">
                          Environmental
                        </SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="Humanitarian">
                          Humanitarian
                        </SelectItem>
                        <SelectItem value="Arts">Arts & Culture</SelectItem>
                        <SelectItem value="Animal">Animal Welfare</SelectItem>
                        <SelectItem value="Community">
                          Community Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p>{formData.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundingYear">Founding Year</Label>
                  {editMode ? (
                    <Input
                      id="foundingYear"
                      type="number"
                      value={formData.foundingYear}
                      onChange={(e) =>
                        handleInputChange('foundingYear', e.target.value)
                      }
                    />
                  ) : (
                    <p>{formData.foundingYear}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Subcategories</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.subcategories.map((subcategory, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={editMode ? 'pr-1' : ''}
                    >
                      {subcategory}
                      {editMode && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="ml-1 h-4 w-4"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              subcategories: prev.subcategories.filter(
                                (_, i) => i !== index
                              )
                            }));
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </Badge>
                  ))}
                  {editMode && (
                    <Input
                      placeholder="Add subcategory..."
                      className="w-40"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          setFormData((prev) => ({
                            ...prev,
                            subcategories: [
                              ...prev.subcategories,
                              e.currentTarget.value
                            ]
                          }));
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Recognition and awards your organization has received
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    {editMode ? (
                      <>
                        <Input
                          value={achievement.name}
                          className="mr-2 flex-1"
                          onChange={(e) => {
                            const updatedAchievements = [
                              ...formData.achievements
                            ];
                            updatedAchievements[index].name = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              achievements: updatedAchievements
                            }));
                          }}
                        />
                        <Input
                          type="number"
                          value={achievement.year}
                          className="w-24"
                          onChange={(e) => {
                            const updatedAchievements = [
                              ...formData.achievements
                            ];
                            updatedAchievements[index].year = parseInt(
                              e.target.value
                            );
                            setFormData((prev) => ({
                              ...prev,
                              achievements: updatedAchievements
                            }));
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="ml-2"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              achievements: prev.achievements.filter(
                                (_, i) => i !== index
                              )
                            }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <span>{achievement.name}</span>
                        <Badge variant="outline">{achievement.year}</Badge>
                      </>
                    )}
                  </div>
                ))}

                {editMode && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        achievements: [
                          ...prev.achievements,
                          { name: '', year: new Date().getFullYear() }
                        ]
                      }));
                    }}
                  >
                    Add Achievement
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How volunteers and partners can reach your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  {editMode ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                    />
                  ) : (
                    <p>{formData.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  {editMode ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                    />
                  ) : (
                    <p>{formData.phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  {editMode ? (
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange('website', e.target.value)
                      }
                    />
                  ) : (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline"
                    >
                      {formData.website}{' '}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Social Media</Label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Facebook className="mr-2 h-4 w-4 text-muted-foreground" />
                    {editMode ? (
                      <Input
                        value={formData.socialMedia.facebook}
                        onChange={(e) =>
                          handleNestedInputChange(
                            'socialMedia',
                            'facebook',
                            e.target.value
                          )
                        }
                        placeholder="Facebook URL"
                      />
                    ) : formData.socialMedia.facebook ? (
                      <a
                        href={formData.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:underline"
                      >
                        Facebook <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">
                        Not provided
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Twitter className="mr-2 h-4 w-4 text-muted-foreground" />
                    {editMode ? (
                      <Input
                        value={formData.socialMedia.twitter}
                        onChange={(e) =>
                          handleNestedInputChange(
                            'socialMedia',
                            'twitter',
                            e.target.value
                          )
                        }
                        placeholder="Twitter URL"
                      />
                    ) : formData.socialMedia.twitter ? (
                      <a
                        href={formData.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:underline"
                      >
                        Twitter <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">
                        Not provided
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Instagram className="mr-2 h-4 w-4 text-muted-foreground" />
                    {editMode ? (
                      <Input
                        value={formData.socialMedia.instagram}
                        onChange={(e) =>
                          handleNestedInputChange(
                            'socialMedia',
                            'instagram',
                            e.target.value
                          )
                        }
                        placeholder="Instagram URL"
                      />
                    ) : formData.socialMedia.instagram ? (
                      <a
                        href={formData.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:underline"
                      >
                        Instagram <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">
                        Not provided
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Physical address and service area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                {editMode ? (
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) =>
                      handleNestedInputChange(
                        'address',
                        'street',
                        e.target.value
                      )
                    }
                  />
                ) : (
                  <p>{formData.address.street}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  {editMode ? (
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) =>
                        handleNestedInputChange(
                          'address',
                          'city',
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{formData.address.city}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  {editMode ? (
                    <Input
                      id="state"
                      value={formData.address.state}
                      onChange={(e) =>
                        handleNestedInputChange(
                          'address',
                          'state',
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{formData.address.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip/Postal Code</Label>
                  {editMode ? (
                    <Input
                      id="zipCode"
                      value={formData.address.zipCode}
                      onChange={(e) =>
                        handleNestedInputChange(
                          'address',
                          'zipCode',
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{formData.address.zipCode}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  {editMode ? (
                    <Input
                      id="country"
                      value={formData.address.country}
                      onChange={(e) =>
                        handleNestedInputChange(
                          'address',
                          'country',
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <p>{formData.address.country}</p>
                  )}
                </div>
              </div>

              {/* Here you could add a map component to display the organization's location */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your organization account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="donations">Accept Donations</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow supporters to donate to your organization
                  </p>
                </div>
                <Switch
                  id="donations"
                  checked={formData.donationsAccepted}
                  onCheckedChange={(checked) => {
                    if (editMode) {
                      setFormData((prev) => ({
                        ...prev,
                        donationsAccepted: checked
                      }));
                    }
                  }}
                  disabled={!editMode}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="volunteerCapacity">Volunteer Capacity</Label>
                  <p className="text-sm text-muted-foreground">
                    Maximum number of volunteers you can manage
                  </p>
                </div>
                {editMode ? (
                  <Input
                    id="volunteerCapacity"
                    type="number"
                    value={formData.volunteerCapacity}
                    onChange={(e) =>
                      handleInputChange('volunteerCapacity', e.target.value)
                    }
                    className="w-24 text-right"
                  />
                ) : (
                  <span>{formData.volunteerCapacity}</span>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="status">Organization Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Current status of your organization on the platform
                  </p>
                </div>
                {editMode ? (
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange('status', value)
                    }
                  >
                    <SelectTrigger id="status" className="w-32">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge
                    variant={
                      formData.status === 'active' ? 'default' : 'secondary'
                    }
                  >
                    {formData.status.charAt(0).toUpperCase() +
                      formData.status.slice(1)}
                  </Badge>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="verification">Verification Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Your organization's verification status
                  </p>
                </div>
                <Badge
                  variant={formData.isVerified ? 'success' : 'outline'}
                  className="gap-1 px-2 py-1"
                >
                  {formData.isVerified ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Verified
                    </>
                  ) : (
                    <>
                      <X className="h-3.5 w-3.5" />
                      Not Verified
                    </>
                  )}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="destructive" disabled={!editMode}>
                Deactivate Account
              </Button>
              <Button onClick={handleSave} disabled={!editMode}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
