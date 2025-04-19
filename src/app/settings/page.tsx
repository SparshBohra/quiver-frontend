'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Globe, 
  Palette, 
  Trash2, 
  LogOut, 
  ChevronRight, 
  Check,
  AlertCircle,
  MoonStar,
  Sun,
  Download
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [theme, setTheme] = useState('system');
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    copies: true,
    saves: true,
    remixes: true,
    emails: false
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pt-2 pb-10">
        <h1 className="text-2xl font-bold mb-8 mt-4">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Navigation */}
          <div className="w-full md:w-64 shrink-0">
            <nav className="bg-card rounded-lg p-2 shadow-sm">
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => setActiveTab('general')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${activeTab === 'general' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                  >
                    <Globe size={18} />
                    <span>General</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('account')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${activeTab === 'account' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                  >
                    <User size={18} />
                    <span>Account</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('appearance')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${activeTab === 'appearance' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                  >
                    <Palette size={18} />
                    <span>Appearance</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                  >
                    <Bell size={18} />
                    <span>Notifications</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('privacy')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${activeTab === 'privacy' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                  >
                    <Lock size={18} />
                    <span>Privacy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('data')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${activeTab === 'data' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'}`}
                  >
                    <Eye size={18} />
                    <span>Data Management</span>
                  </button>
                </li>
              </ul>
              
              <div className="mt-8 border-t pt-4">
                <button className="w-full text-left px-3 py-2 rounded-md flex items-center gap-3 text-destructive hover:bg-destructive/10">
                  <LogOut size={18} />
                  <span>Sign out</span>
                </button>
              </div>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="flex-grow bg-card rounded-lg p-6 shadow-sm mb-8">
            {activeTab === 'general' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">General Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Language</h3>
                    <select className="w-full md:w-64 bg-background border rounded-md px-3 py-2">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Time Zone</h3>
                    <select className="w-full md:w-64 bg-background border rounded-md px-3 py-2">
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Profile</h3>
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-secondary relative overflow-hidden">
                          <Image 
                            src="/assets/default-avatar.png" 
                            alt="Profile picture" 
                            width={80} 
                            height={80}
                            className="rounded-full object-cover"
                            onError={(e) => {
                              // @ts-ignore - this works but TypeScript doesn't like it
                              e.target.style.display = 'none';
                              // @ts-ignore - fallback to parent div with first initial
                              e.target.parentNode.setAttribute('data-content', 'P');
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold" 
                              data-content="P">
                            {/* This is shown only if the image fails to load */}
                          </div>
                        </div>
                        <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1">
                          <Palette size={14} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">Username</label>
                          <input type="text" defaultValue="promptmaster" className="w-full md:w-64 bg-background border rounded-md px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm text-muted-foreground mb-1">Display Name</label>
                          <input type="text" defaultValue="Prompt Master" className="w-full md:w-64 bg-background border rounded-md px-3 py-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Email Address</h3>
                    <input type="email" defaultValue="user@example.com" className="w-full md:w-80 bg-background border rounded-md px-3 py-2" />
                    <p className="text-sm text-muted-foreground mt-1">This email is used for notifications and account recovery</p>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Password</h3>
                    <button className="px-3 py-2 border border-primary text-primary rounded-md hover:bg-primary/5">
                      Change Password
                    </button>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-md font-medium text-destructive mb-2">Danger Zone</h3>
                    <button className="px-3 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive/5 flex items-center gap-2">
                      <Trash2 size={16} />
                      Delete Account
                    </button>
                    <p className="text-sm text-muted-foreground mt-1">This action is permanent and cannot be undone</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`flex items-center gap-3 border rounded-md p-3 ${theme === 'light' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                      >
                        <div className="bg-white border rounded-md p-2 text-black">
                          <Sun size={18} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Light</div>
                          <div className="text-sm text-muted-foreground">Light background with dark text</div>
                        </div>
                        {theme === 'light' && (
                          <Check size={18} className="ml-auto text-primary" />
                        )}
                      </button>
                      
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`flex items-center gap-3 border rounded-md p-3 ${theme === 'dark' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                      >
                        <div className="bg-gray-800 border rounded-md p-2 text-white">
                          <MoonStar size={18} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">Dark</div>
                          <div className="text-sm text-muted-foreground">Dark background with light text</div>
                        </div>
                        {theme === 'dark' && (
                          <Check size={18} className="ml-auto text-primary" />
                        )}
                      </button>
                      
                      <button 
                        onClick={() => setTheme('system')}
                        className={`flex items-center gap-3 border rounded-md p-3 ${theme === 'system' ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                      >
                        <div className="bg-gradient-to-br from-white to-gray-800 border rounded-md p-2 flex justify-center">
                          <Globe size={18} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">System</div>
                          <div className="text-sm text-muted-foreground">Follows your system theme</div>
                        </div>
                        {theme === 'system' && (
                          <Check size={18} className="ml-auto text-primary" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <span>When someone likes my prompts</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={notifications.likes} onChange={() => setNotifications({...notifications, likes: !notifications.likes})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <span>When someone follows me</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={notifications.follows} onChange={() => setNotifications({...notifications, follows: !notifications.follows})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <span>When someone copies my prompts</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={notifications.copies} onChange={() => setNotifications({...notifications, copies: !notifications.copies})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <span>When someone saves my prompts</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={notifications.saves} onChange={() => setNotifications({...notifications, saves: !notifications.saves})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <span>When someone remixes my prompts</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={notifications.remixes} onChange={() => setNotifications({...notifications, remixes: !notifications.remixes})} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Email Notifications</h3>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <span>Send me email notifications</span>
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notifications.emails} onChange={() => setNotifications({...notifications, emails: !notifications.emails})} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Profile Visibility</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <label className="inline-flex items-center me-5">
                          <input type="radio" name="visibility" value="public" className="form-radio text-primary" defaultChecked />
                          <span className="ml-2">Public</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input type="radio" name="visibility" value="private" className="form-radio text-primary" />
                          <span className="ml-2">Private</span>
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground">Public profiles can be viewed by anyone</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Prompt Sharing</h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <label className="inline-flex items-center me-5">
                          <input type="radio" name="prompt_visibility" value="public" className="form-radio text-primary" defaultChecked />
                          <span className="ml-2">Public by default</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input type="radio" name="prompt_visibility" value="private" className="form-radio text-primary" />
                          <span className="ml-2">Private by default</span>
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground">You can always change privacy settings for individual prompts</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-2">Activity Privacy</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <span>Show my likes to other users</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <span>Show my saves to other users</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'data' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Data Management</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Your Data</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You can request a copy of your data or delete all your information from our servers
                    </p>
                    
                    <div className="space-y-3">
                      <button className="text-sm text-primary hover:underline flex items-center gap-2">
                        <Eye size={16} />
                        View my data
                      </button>
                      
                      <button className="text-sm text-primary hover:underline flex items-center gap-2">
                        <Download size={16} />
                        Download my data
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-md font-medium text-destructive mb-2">Delete Data</h3>
                    <button className="px-3 py-2 border border-destructive text-destructive rounded-md hover:bg-destructive/5 flex items-center gap-2">
                      <AlertCircle size={16} />
                      Request Data Deletion
                    </button>
                    <p className="text-sm text-muted-foreground mt-2">This will permanently remove all your prompts, collections, and account information</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 