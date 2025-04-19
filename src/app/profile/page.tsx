'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Share, Edit, ExternalLink, Award, BookOpen, Bookmark, Heart, Copy, ChevronDown, Grid, Bookmark as BookmarkIcon } from 'lucide-react';
import { PromptCard } from '@/components/prompts/PromptCard';
import { mockPrompts } from '@/data/mockPrompts';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const userPrompts = mockPrompts.slice(0, 8);
const savedPrompts = mockPrompts.slice(8, 16);
const likedPrompts = mockPrompts.slice(16, 24);

const user = {
  name: "Sparsh Bohra",
  handle: "sparshbohra",
  bio: "AI prompt engineer. Creating effective prompts for text, image, and code generation.",
  avatar: "/avatars/placeholder.png", // Using a placeholder path instead of null
  followers: 128,
  following: 85,
  stats: {
    promptsCreated: 42,
    promptsSaved: 156,
    promptsLiked: 89,
    totalCopies: 1.2, // In thousands
    totalLikes: 3.4, // In thousands
  },
  collections: [
    { name: "Coding Assistants", count: 12, icon: "💻" },
    { name: "Image Generation", count: 8, icon: "🎨" },
    { name: "Writing Helpers", count: 15, icon: "✍️" },
    { name: "Productivity", count: 7, icon: "⚡" },
  ]
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'created' | 'saved' | 'liked' | 'collections'>('created');
  const [showAllStats, setShowAllStats] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-grow md:pl-20 pt-20">
        <div className="w-full px-6 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Profile header */}
            <section className="mb-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Updated Avatar Logic */}
                <div className="relative h-28 w-28 md:h-32 md:w-32 flex-shrink-0">
                  {(user.avatar && !user.avatar.includes('placeholder')) ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="rounded-full object-cover border-2 border-card"
                    />
                  ) : (
                    // Fallback avatar with initial
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-muted/60 to-muted flex items-center justify-center text-4xl text-foreground font-semibold border-2 border-card">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* User info */}
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
                  <p className="text-muted-foreground mb-3">@{user.handle}</p>
                  
                  {user.bio && (
                    <p className="mb-4 max-w-xl">{user.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm mb-4">
                    <div>
                      <span className="font-semibold">{user.stats.promptsCreated}</span> Prompts
                    </div>
                    <div>
                      <span className="font-semibold">{user.followers}</span> Followers
                    </div>
                    <div>
                      <span className="font-semibold">{user.following}</span> Following
                    </div>
                    
                    {showAllStats ? (
                      <>
                        <div>
                          <span className="font-semibold">{user.stats.totalCopies}k</span> Copies
                        </div>
                        <div>
                          <span className="font-semibold">{user.stats.totalLikes}k</span> Likes
                        </div>
                        <button 
                          onClick={() => setShowAllStats(false)}
                          className="text-primary hover:underline flex items-center"
                        >
                          Less <ChevronDown className="h-3 w-3 ml-1 transform rotate-180" />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setShowAllStats(true)}
                        className="text-primary hover:underline flex items-center"
                      >
                        More <ChevronDown className="h-3 w-3 ml-1" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Updated Action buttons */}
                <div className="flex space-x-2 flex-shrink-0 mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                    Follow
                  </button>
                  {/* Added px-3 for wider buttons */}
                  <button className="px-3 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    <Share size={18} />
                  </button>
                  <button className="px-3 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    <Edit size={18} />
                  </button>
                </div>
              </div>
            </section>

            {/* Profile tabs */}
            <div className="border-b border-border mb-8">
              <div className="flex overflow-x-auto hide-scrollbar">
                <button 
                  onClick={() => setActiveTab('created')}
                  className={`px-4 py-3 font-medium flex items-center gap-2 whitespace-nowrap border-b-2 ${
                    activeTab === 'created' 
                      ? 'border-primary text-foreground' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Award size={18} />
                  Created
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`px-4 py-3 font-medium flex items-center gap-2 whitespace-nowrap border-b-2 ${
                    activeTab === 'saved' 
                      ? 'border-primary text-foreground' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <BookmarkIcon size={18} />
                  Saved
                </button>
                <button 
                  onClick={() => setActiveTab('liked')}
                  className={`px-4 py-3 font-medium flex items-center gap-2 whitespace-nowrap border-b-2 ${
                    activeTab === 'liked' 
                      ? 'border-primary text-foreground' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart size={18} />
                  Liked
                </button>
                <button 
                  onClick={() => setActiveTab('collections')}
                  className={`px-4 py-3 font-medium flex items-center gap-2 whitespace-nowrap border-b-2 ${
                    activeTab === 'collections' 
                      ? 'border-primary text-foreground' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid size={18} />
                  Collections
                </button>
              </div>
            </div>

            {/* Created prompts */}
            {activeTab === 'created' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPrompts.map(prompt => (
                  <PromptCard
                    key={prompt.id}
                    {...prompt}
                    creatorName={user.name}
                    creatorAvatar={user.avatar}
                  />
                ))}
                
                <div className="col-span-full flex justify-center my-6">
                  <button className="px-6 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                    Load more
                  </button>
                </div>
              </div>
            )}

            {/* Saved prompts */}
            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPrompts.map(prompt => (
                  <PromptCard
                    key={prompt.id}
                    {...prompt}
                  />
                ))}
                
                <div className="col-span-full flex justify-center my-6">
                  <button className="px-6 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                    Load more
                  </button>
                </div>
              </div>
            )}

            {/* Liked prompts */}
            {activeTab === 'liked' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedPrompts.map(prompt => (
                  <PromptCard
                    key={prompt.id}
                    {...prompt}
                  />
                ))}
                
                <div className="col-span-full flex justify-center my-6">
                  <button className="px-6 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                    Load more
                  </button>
                </div>
              </div>
            )}

            {/* Collections */}
            {activeTab === 'collections' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.collections.map(collection => (
                    <Link 
                      key={collection.name}
                      href={`/profile/collection/${collection.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="h-10 w-10 rounded-md bg-secondary/70 flex items-center justify-center text-2xl">
                          {collection.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{collection.name}</h3>
                          <p className="text-sm text-muted-foreground">{collection.count} prompts</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="aspect-square bg-secondary/40 rounded-md" />
                        <div className="aspect-square bg-secondary/40 rounded-md" />
                      </div>
                    </Link>
                  ))}
                  
                  <button className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-secondary/10 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-secondary/40 flex items-center justify-center">
                      <Plus size={24} />
                    </div>
                    <p className="font-medium">Create new collection</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Plus icon component since we're using it only once
function Plus({ size = 24 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
} 