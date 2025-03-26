import React, { useState } from 'react';
import { Search, Send, Filter, MoreVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PageHead from '@/components/shared/page-head';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

// Define TypeScript types for data
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  read?: boolean;
}

interface Conversation {
  id: number;
  contactName: string;
  contactAvatar?: string;
  contactType: 'volunteer' | 'organization' | 'admin';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

// Sample data
const conversations: Conversation[] = [
  {
    id: 1,
    contactName: 'Michael Chen',
    contactAvatar: '/avatars/michael.jpg',
    contactType: 'volunteer',
    lastMessage: "I'm available to help with the upcoming event.",
    lastMessageTime: '2023-05-10T14:30:00',
    unreadCount: 2,
    messages: [
      {
        id: 1,
        text: 'Hello, I saw your organization is hosting an environmental cleanup event next week.',
        sender: 'other',
        timestamp: '2023-05-10T14:15:00',
        read: true
      },
      {
        id: 2,
        text: "Yes, we're organizing a beach cleanup on Saturday from 9am to 1pm.",
        sender: 'user',
        timestamp: '2023-05-10T14:20:00'
      },
      {
        id: 3,
        text: 'That sounds great! I have experience with beach cleanups.',
        sender: 'other',
        timestamp: '2023-05-10T14:25:00',
        read: true
      },
      {
        id: 4,
        text: "I'm available to help with the upcoming event.",
        sender: 'other',
        timestamp: '2023-05-10T14:30:00'
      }
    ]
  },
  {
    id: 2,
    contactName: 'Sarah Johnson',
    contactAvatar: '/avatars/sarah.jpg',
    contactType: 'volunteer',
    lastMessage: 'Thank you for accepting my application!',
    lastMessageTime: '2023-05-09T10:45:00',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        text: "I've just applied to volunteer for your organization.",
        sender: 'other',
        timestamp: '2023-05-09T10:30:00',
        read: true
      },
      {
        id: 2,
        text: "We're excited to have you! Your application has been approved.",
        sender: 'user',
        timestamp: '2023-05-09T10:40:00'
      },
      {
        id: 3,
        text: 'Thank you for accepting my application!',
        sender: 'other',
        timestamp: '2023-05-09T10:45:00',
        read: true
      }
    ]
  },
  {
    id: 3,
    contactName: 'City Parks Department',
    contactAvatar: '/avatars/cityparks.jpg',
    contactType: 'organization',
    lastMessage:
      'Would you be interested in collaborating on our annual tree planting initiative?',
    lastMessageTime: '2023-05-08T15:20:00',
    unreadCount: 1,
    messages: [
      {
        id: 1,
        text: "Hello, we're the City Parks Department.",
        sender: 'other',
        timestamp: '2023-05-08T15:10:00',
        read: true
      },
      {
        id: 2,
        text: 'Would you be interested in collaborating on our annual tree planting initiative?',
        sender: 'other',
        timestamp: '2023-05-08T15:20:00'
      }
    ]
  },
  {
    id: 4,
    contactName: 'David Rodriguez',
    contactAvatar: '/avatars/david.jpg',
    contactType: 'volunteer',
    lastMessage: 'I have some ideas for improving the garden layout.',
    lastMessageTime: '2023-05-07T09:15:00',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        text: "I've been volunteering with your organization for a few months now.",
        sender: 'other',
        timestamp: '2023-05-07T09:05:00',
        read: true
      },
      {
        id: 2,
        text: 'I have some ideas for improving the garden layout.',
        sender: 'other',
        timestamp: '2023-05-07T09:15:00',
        read: true
      }
    ]
  },
  {
    id: 5,
    contactName: 'Admin Support',
    contactType: 'admin',
    lastMessage: 'Your organization has been verified successfully.',
    lastMessageTime: '2023-05-05T11:30:00',
    unreadCount: 0,
    messages: [
      {
        id: 1,
        text: "We've received your request for verification.",
        sender: 'other',
        timestamp: '2023-05-04T14:20:00',
        read: true
      },
      {
        id: 2,
        text: 'Your organization has been verified successfully.',
        sender: 'other',
        timestamp: '2023-05-05T11:30:00',
        read: true
      }
    ]
  }
];

// Format date/time helper function
const formatMessageTime = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - messageDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return messageDate.toLocaleDateString([], { weekday: 'short' });
  } else {
    return messageDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    });
  }
};

// Format message timestamp for chat view
const formatChatTimestamp = (timestamp: string): string => {
  const messageDate = new Date(timestamp);
  return messageDate.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric'
  });
};

export default function OrganizationMessages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Filter conversations based on search query and active tab
  const getFilteredConversations = () => {
    let filtered = conversations.filter(
      (conversation) =>
        conversation.contactName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    if (activeTab === 'volunteers') {
      filtered = filtered.filter((c) => c.contactType === 'volunteer');
    } else if (activeTab === 'organizations') {
      filtered = filtered.filter((c) => c.contactType === 'organization');
    } else if (activeTab === 'unread') {
      filtered = filtered.filter((c) => c.unreadCount > 0);
    }

    return filtered;
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    // In a real app, you would send this to an API
    console.log(
      `Sending message to ${selectedChat.contactName}: ${newMessage}`
    );

    // For demo purposes, update the local state
    const updatedChat = {
      ...selectedChat,
      lastMessage: newMessage,
      lastMessageTime: new Date().toISOString(),
      messages: [
        ...selectedChat.messages,
        {
          id: selectedChat.messages.length + 1,
          text: newMessage,
          sender: 'user' as const,
          timestamp: new Date().toISOString()
        }
      ]
    };

    setSelectedChat(updatedChat);
    setNewMessage('');
  };

  return (
    <div className="flex h-full flex-col pb-10">
      <PageHead title="Messages" />

      <div className="flex h-[calc(100vh-9rem)] flex-1 overflow-hidden p-6">
        {/* Left sidebar - Conversations list */}
        <div className="flex h-full w-1/3 flex-col pr-4">
          <Card className="flex h-full flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden px-3">
              <Tabs
                defaultValue="all"
                onValueChange={(value) => setActiveTab(value)}
                className="w-full"
              >
                <TabsList className="mb-4 grid h-9 grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
                  <TabsTrigger value="organizations">Organizations</TabsTrigger>
                  <TabsTrigger value="unread" className="relative">
                    Unread
                    {conversations.reduce((sum, c) => sum + c.unreadCount, 0) >
                      0 && (
                      <Badge
                        variant="destructive"
                        className="ml-1 h-5 min-w-5 px-1"
                      >
                        {conversations.reduce(
                          (sum, c) => sum + c.unreadCount,
                          0
                        )}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-18rem)]">
                  <div className="space-y-2">
                    {getFilteredConversations().map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 ${
                          selectedChat?.id === conversation.id
                            ? 'bg-primary/10'
                            : 'hover:bg-background'
                        }`}
                        onClick={() => setSelectedChat(conversation)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            {conversation.contactAvatar ? (
                              <AvatarImage
                                src={conversation.contactAvatar}
                                alt={conversation.contactName}
                              />
                            ) : null}
                            <AvatarFallback>
                              {conversation.contactName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0"
                            >
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="truncate font-medium">
                              {conversation.contactName}
                            </h3>
                            <span className="whitespace-nowrap text-xs text-muted-foreground">
                              {formatMessageTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className="truncate text-sm text-muted-foreground">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    ))}

                    {getFilteredConversations().length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">
                        No conversations found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Chat area */}
        <div className="flex h-full w-2/3 flex-col pl-4">
          <Card className="flex h-full flex-col">
            {selectedChat ? (
              <>
                <CardHeader className="border-b pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {selectedChat.contactAvatar ? (
                          <AvatarImage
                            src={selectedChat.contactAvatar}
                            alt={selectedChat.contactName}
                          />
                        ) : null}
                        <AvatarFallback>
                          {selectedChat.contactName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {selectedChat.contactName}
                        </h3>
                        <p className="text-xs capitalize text-muted-foreground">
                          {selectedChat.contactType}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
                        <DropdownMenuItem>
                          Archive Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Block Contact
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-[calc(100vh-21rem)] px-6 pt-6">
                    <div className="space-y-4">
                      {selectedChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                              message.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p
                              className={`mt-1 text-xs ${
                                message.sender === 'user'
                                  ? 'text-primary-foreground/70'
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {formatChatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="border-t p-4">
                    <div className="flex items-end gap-2">
                      <Textarea
                        placeholder="Type your message..."
                        className="min-h-[60px]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-lg font-medium">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
