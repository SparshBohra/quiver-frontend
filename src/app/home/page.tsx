'use client';

import { PromptGrid } from "@/components/prompts/PromptGrid";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { mockPrompts } from "@/data/mockPrompts";
import { UserPlus, Users } from "lucide-react";

// Define the categories with more labels
const categories = [
  { name: 'All', path: '/home', emoji: null },
  { name: 'Trending', path: '/trending', emoji: '🔥' },
  { name: 'Brainstorming', path: '/brainstorming', emoji: '💡' },
  { name: 'Fun', path: '/fun', emoji: '🧪' },
  { name: 'Business', path: '/business', emoji: '📈' },
  { name: 'Roleplay', path: '/roleplay', emoji: '🗣️' },
  { name: 'Visual', path: '/visual', emoji: '🎨' },
  { name: 'Learning', path: '/learning', emoji: '📚' },
  { name: 'Productivity', path: '/productivity', emoji: '⚡' },
  { name: 'Creative', path: '/creative', emoji: '✨' },
  { name: 'Writing', path: '/writing', emoji: '✍️' },
  { name: 'Marketing', path: '/marketing', emoji: '📢' },
  { name: 'Education', path: '/education', emoji: '🎓' },
  { name: 'Gaming', path: '/gaming', emoji: '🎮' },
  { name: 'Social Media', path: '/social-media', emoji: '📱' },
  { name: 'Travel', path: '/travel', emoji: '✈️' },
  { name: 'Email', path: '/email', emoji: '📧' },
  { name: 'Cooking', path: '/cooking', emoji: '🍳' },
];

// Sample friends data
const friends = [
  {
    id: '1',
    name: 'PromptArtist',
    avatar: null,
    bio: 'Creative expert in AI image generation prompts',
    recent: mockPrompts[3]
  },
  {
    id: '2',
    name: 'CodeCraftsman',
    avatar: null,
    bio: 'Software engineer sharing coding optimization prompts',
    recent: mockPrompts[8]
  },
  {
    id: '3',
    name: 'ZenMaster',
    avatar: null,
    bio: 'Wellness and meditation prompt specialist',
    recent: mockPrompts[15]
  },
  {
    id: '4',
    name: 'DataWizard',
    avatar: null,
    bio: 'Data science and analytics prompt engineer',
    recent: mockPrompts[22]
  }
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow md:pl-20 pt-20">
        <div className="w-full px-6 py-8">
          <div className="space-y-10">
            <section className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Discover what AI can do — one prompt at a time
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                Browse, copy, save, and share prompts across text, image, and video models.
                Your creative arsenal for AI exploration.
              </p>
            </section>
            
            {/* Category pills moved to a separate section above Recommended */}
            <section className="mb-2">
              <div className="overflow-x-auto pb-4 no-scrollbar">
                <div className="flex space-x-2 pl-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.path}
                      className={`category-pill flex-shrink-0 ${
                        category.path === '/home' ? 'active' : ''
                      }`}
                    >
                      {category.emoji && <span>{category.emoji}</span>}
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Friends section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="text-primary"><Users size={24} /></span>
                  Friends' Activity
                </h2>
                <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {friends.map((friend) => (
                  <div key={friend.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      {friend.avatar ? (
                        <Image
                          src={friend.avatar}
                          alt={friend.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold">
                          {friend.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{friend.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{friend.bio}</p>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 rounded-lg p-4 mb-3">
                      <div className="text-xs text-muted-foreground mb-1">Recently shared:</div>
                      <Link href={`/prompt/${friend.recent.id}`} className="text-sm font-medium hover:underline">
                        {friend.recent.title}
                      </Link>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link href={`/profile/${friend.id}`} className="text-xs text-primary hover:underline">
                        View profile
                      </Link>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                        <UserPlus size={14} />
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <span className="text-primary">✨</span>
                  Recommended
                </h2>
                <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
              
              <PromptGrid />
            </section>

            <section className="border-t border-border pt-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">
                  Ready to add your prompts?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Sign up and share your favorite prompts with the community.
                  Get feedback, inspire others, and build your collection.
                </p>
                <a href="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 