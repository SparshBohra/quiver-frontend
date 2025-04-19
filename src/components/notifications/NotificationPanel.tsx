'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Copy, 
  Heart, 
  BookmarkIcon, 
  Share2, 
  UserPlus, 
  RefreshCw, 
  Bell, 
  MoreHorizontal, 
  X,
  CheckCircle,
  CheckCheck
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Add global type declaration at the top of the file
declare global {
  interface Window {
    notificationState: ReturnType<typeof useNotifications> | null;
  }
}

// Types
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Prompt {
  id: string;
  title: string;
}

export type NotificationType = 
  | 'like' 
  | 'follow' 
  | 'copy' 
  | 'save' 
  | 'share' 
  | 'remix';

export interface Notification {
  id: string;
  type: NotificationType;
  user: User;
  prompt?: Prompt;
  createdAt: Date;
  read: boolean;
}

// Sample notification data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'copy',
    user: {
      id: 'user1',
      name: 'John Doe',
      avatar: '/avatars/placeholder.png'
    },
    prompt: {
      id: 'prompt1',
      title: 'Startup Name Generator'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: '2',
    type: 'like',
    user: {
      id: 'user2',
      name: 'Emma Smith',
      avatar: '/avatars/placeholder.png'
    },
    prompt: {
      id: 'prompt2',
      title: 'Creative Blog Introduction'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    user: {
      id: 'user3',
      name: 'Alex Johnson',
      avatar: '/avatars/placeholder.png'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
  },
  {
    id: '4',
    type: 'save',
    user: {
      id: 'user4',
      name: 'Sarah Williams',
      avatar: '/avatars/placeholder.png'
    },
    prompt: {
      id: 'prompt1',
      title: 'Startup Name Generator'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: '5',
    type: 'share',
    user: {
      id: 'user5',
      name: 'Michael Brown',
      avatar: '/avatars/placeholder.png'
    },
    prompt: {
      id: 'prompt3',
      title: 'Personal Bio Generator'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
  },
  {
    id: '6',
    type: 'remix',
    user: {
      id: 'user6',
      name: 'Jessica Lee',
      avatar: '/avatars/placeholder.png'
    },
    prompt: {
      id: 'prompt4',
      title: 'Code Review Checker'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
  },
  {
    id: '7',
    type: 'copy',
    user: {
      id: 'user7',
      name: 'David Wilson',
      avatar: '/avatars/placeholder.png'
    },
    prompt: {
      id: 'prompt5',
      title: 'Email Subject Line Generator'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    read: true,
  },
  {
    id: '8',
    type: 'like',
    user: {
      id: 'user8',
      name: 'Olivia Martin',
      avatar: '/avatars/placeholder.png'
    },
    prompt: {
      id: 'prompt6',
      title: 'Product Description Writer'
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    read: true,
  }
];

// A custom hook to expose notification state to parent components
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const hasUnread = unreadCount > 0;
  
  const markAllAsRead = useCallback(() => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  }, []);
  
  const markAsRead = useCallback((id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  }, []);
  
  return {
    notifications,
    unreadCount,
    hasUnread,
    markAllAsRead,
    markAsRead
  };
};

// Singleton instance to manage global notification state
export const notificationState = {
  instance: null as ReturnType<typeof useNotifications> | null,
  
  getState() {
    return this.instance;
  },
  
  setState(state: ReturnType<typeof useNotifications>) {
    this.instance = state;
  }
};

// Group notifications by date
const groupNotificationsByDate = (notifications: Notification[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - today.getDay());
  
  const groups: {
    title: string;
    notifications: Notification[];
  }[] = [
    { title: 'Today', notifications: [] },
    { title: 'Yesterday', notifications: [] },
    { title: 'This Week', notifications: [] },
    { title: 'Earlier', notifications: [] }
  ];
  
  notifications.forEach(notification => {
    const notifDate = new Date(notification.createdAt);
    notifDate.setHours(0, 0, 0, 0);
    
    if (notifDate.getTime() === today.getTime()) {
      groups[0].notifications.push(notification);
    } else if (notifDate.getTime() === yesterday.getTime()) {
      groups[1].notifications.push(notification);
    } else if (notifDate >= weekStart) {
      groups[2].notifications.push(notification);
    } else {
      groups[3].notifications.push(notification);
    }
  });
  
  // Remove empty groups
  return groups.filter(group => group.notifications.length > 0);
};

// Get notification icon based on type
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'copy':
      return <Copy size={16} className="text-blue-500" />;
    case 'like':
      return <Heart size={16} className="text-red-500" />;
    case 'save':
      return <BookmarkIcon size={16} className="text-purple-500" />;
    case 'share':
      return <Share2 size={16} className="text-green-500" />;
    case 'follow':
      return <UserPlus size={16} className="text-amber-500" />;
    case 'remix':
      return <RefreshCw size={16} className="text-cyan-500" />;
    default:
      return <Bell size={16} className="text-gray-500" />;
  }
};

// Get notification text based on type
const getNotificationText = (notification: Notification) => {
  const { type, user, prompt } = notification;
  const userName = <span className="font-semibold">{user.name}</span>;
  
  switch (type) {
    case 'copy':
      return (
        <>
          {userName} copied your prompt: <span className="font-medium">"{prompt?.title}"</span>
        </>
      );
    case 'like':
      return (
        <>
          {userName} liked your prompt: <span className="font-medium">"{prompt?.title}"</span>
        </>
      );
    case 'save':
      return (
        <>
          {userName} saved your prompt: <span className="font-medium">"{prompt?.title}"</span>
        </>
      );
    case 'share':
      return (
        <>
          {userName} shared your prompt: <span className="font-medium">"{prompt?.title}"</span>
        </>
      );
    case 'follow':
      return (
        <>
          {userName} started following you
        </>
      );
    case 'remix':
      return (
        <>
          {userName} remixed your prompt: <span className="font-medium">"{prompt?.title}"</span>
        </>
      );
    default:
      return (
        <>
          {userName} interacted with your prompt
        </>
      );
  }
};

// Format timestamp to relative time
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1 ? 'Yesterday' : `${diffInDays}d ago`;
  }
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const notificationState = useNotifications();
  const { notifications, markAllAsRead, markAsRead } = notificationState;
  
  // Set the global notification state
  useEffect(() => {
    // Export notification state for parent components to use
    window.notificationState = notificationState;
  }, [notificationState]);
  
  // Handle click outside to close panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Handle a notification click
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    // In a real app, you'd navigate to the relevant page based on notification type
  };
  
  // Group notifications
  const groupedNotifications = groupNotificationsByDate(notifications);
  
  // If not open, don't render anything
  if (!isOpen) return null;
  
  return (
    <div 
      ref={panelRef}
      className="fixed top-4 left-24 bottom-4 z-50 w-96 bg-background border border-border shadow-lg overflow-hidden transition-transform duration-300 rounded-xl"
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <div className="flex space-x-2">
          <button 
            onClick={markAllAsRead}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            title="Mark all as read"
          >
            <CheckCheck size={18} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            title="Close notifications"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto h-full pb-20">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <span className="text-3xl mb-2">📭</span>
            <p>No notifications yet</p>
          </div>
        ) : (
          <>
            {groupedNotifications.map(group => (
              <div key={group.title} className="mb-2">
                <div className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted/40">{group.title}</div>
                {group.notifications.map(notification => (
                  <NotificationItem 
                    key={notification.id} 
                    notification={notification}
                    onClick={() => handleNotificationClick(notification)}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  return (
    <div 
      className={`p-4 border-b border-border flex items-start hover:bg-muted/50 cursor-pointer transition-colors ${notification.read ? '' : 'bg-muted/20'}`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3 relative">
        {notification.user.avatar && !notification.user.avatar.includes('placeholder') ? (
          <Image 
            src={notification.user.avatar} 
            alt={notification.user.name}
            width={40}
            height={40}
            className="rounded-md"
          />
        ) : (
          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
            <span className="text-base font-medium">{notification.user.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
          <span className="text-xs">{getNotificationIcon(notification.type)}</span>
        </div>
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="text-sm">
          {getNotificationText(notification)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {formatRelativeTime(notification.createdAt)}
        </div>
      </div>
      
      {!notification.read && (
        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
      )}
    </div>
  );
} 