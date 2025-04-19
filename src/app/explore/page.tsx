'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import Link from 'next/link';
import Image from 'next/image';
import { PromptCard } from '@/components/prompts/PromptCard';
import { mockPrompts } from '@/data/mockPrompts';
import { TrendingUp, Sparkles, Users, Filter } from 'lucide-react';

// Extract unique categories from all prompts
const allCategories = Array.from(
  new Set(
    mockPrompts.flatMap(prompt => 
      prompt.tags
        .filter(tag => 
          !tag.name.includes('GPT') && 
          !tag.name.includes('Claude') && 
          !tag.name.toLowerCase().includes('midjourney') && 
          !tag.name.toLowerCase().includes('dall-e')
        )
        .map(tag => tag.name)
    )
  )
);

// Define the categories with more labels
const categories = [
  { name: 'All', path: '/explore', emoji: null },
  { name: 'Trending', path: '/explore/trending', emoji: '🔥' },
  { name: 'Brainstorming', path: '/explore/brainstorming', emoji: '💡' },
  { name: 'Fun', path: '/explore/fun', emoji: '🧪' },
  { name: 'Business', path: '/explore/business', emoji: '📈' },
  { name: 'Roleplay', path: '/explore/roleplay', emoji: '🗣️' },
  { name: 'Visual', path: '/explore/visual', emoji: '🎨' },
  { name: 'Learning', path: '/explore/learning', emoji: '📚' },
  { name: 'Productivity', path: '/explore/productivity', emoji: '⚡' },
  { name: 'Creative', path: '/explore/creative', emoji: '✨' },
  { name: 'Writing', path: '/explore/writing', emoji: '✍️' },
  { name: 'Marketing', path: '/explore/marketing', emoji: '📢' },
  { name: 'Education', path: '/explore/education', emoji: '🎓' },
  { name: 'Gaming', path: '/explore/gaming', emoji: '🎮' },
  { name: 'Social Media', path: '/explore/social-media', emoji: '📱' },
  { name: 'Travel', path: '/explore/travel', emoji: '✈️' },
  { name: 'Email', path: '/explore/email', emoji: '📧' },
  { name: 'Cooking', path: '/explore/cooking', emoji: '🍳' },
];

// Define model options
const models = [
  { name: 'All Models', id: 'all' },
  { name: 'OpenAI', id: 'openai' },
  { name: 'Anthropic', id: 'anthropic' },
  { name: 'Gemini', id: 'gemini' },
  { name: 'Mistral', id: 'mistral' },
  { name: 'Llama', id: 'llama' },
  { name: 'Stable Diffusion', id: 'stable-diffusion' },
  { name: 'Midjourney', id: 'midjourney' },
  { name: 'DALL-E', id: 'dalle' },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModel, setActiveModel] = useState('all');
  
  // Get trending prompts (using likes as metric)
  const trendingPrompts = [...mockPrompts]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 4);
  
  // Get new creator highlights
  const creators = [
    {
      name: 'PromptArtist',
      prompts: mockPrompts.filter(p => p.creatorName === 'PromptArtist'),
      bio: 'Creative expert in AI image generation prompts',
      avatar: null
    },
    {
      name: 'CodeCraftsman',
      prompts: mockPrompts.filter(p => p.creatorName === 'CodeCraftsman'),
      bio: 'Software engineer sharing coding optimization prompts',
      avatar: null
    },
    {
      name: 'ZenMaster',
      prompts: mockPrompts.filter(p => p.creatorName === 'ZenMaster'),
      bio: 'Wellness and meditation prompt specialist',
      avatar: null
    }
  ];
  
  // Filter prompts based on category
  const filteredPrompts = mockPrompts.filter(prompt => {
    const matchesCategory = !selectedCategory || 
      prompt.tags.some(tag => tag.name === selectedCategory);
      
    return matchesCategory;
  });
  
  const displayedCategories = showAllCategories 
    ? allCategories 
    : allCategories.slice(0, 12);

  return (
    <>
      <Header />
      <main className="flex-grow md:pl-20 pt-20">
        <div className="w-full px-6 py-8">
          <div className="space-y-8">
            {/* Center-aligned title and description, styled like home page */}
            <section className="text-center max-w-3xl mx-auto mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Explore Prompts
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover new and trending prompts across different categories. Find inspiration for your next AI creation.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-lg font-medium mb-4">Browse by category</h2>
              <div className="overflow-x-auto pb-4 no-scrollbar">
                <div className="flex space-x-2 pl-1">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`category-pill flex-shrink-0 ${
                        activeCategory === category.name ? 'active' : ''
                      }`}
                    >
                      {category.emoji && <span>{category.emoji}</span>}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-medium mb-4">Filter by model</h2>
              <div className="overflow-x-auto pb-4 no-scrollbar">
                <div className="flex space-x-2 pl-1">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setActiveModel(model.id)}
                      className={`category-pill flex-shrink-0 ${
                        activeModel === model.id ? 'active' : ''
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            
            {/* Trending section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" />
                  Trending prompts
                </h2>
                <Link 
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  View all trending
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingPrompts.map((prompt) => (
                  <PromptCard 
                    key={prompt.id}
                    {...prompt}
                  />
                ))}
              </div>
            </section>
            
            {/* Creator Spotlight */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users size={20} className="text-primary" />
                  Creator spotlight
                </h2>
                <Link 
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  View all creators
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {creators.map((creator) => (
                  <div key={creator.name} className="bg-card border border-border rounded-xl p-5 transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                      {creator.avatar ? (
                        <Image
                          src={creator.avatar}
                          alt={creator.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-semibold">
                          {creator.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{creator.name}</h3>
                        <p className="text-xs text-muted-foreground">{creator.bio}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {creator.prompts.slice(0, 2).map(prompt => (
                        <div key={prompt.id} className="bg-secondary/50 rounded-lg p-3 text-xs">
                          <Link href={`/prompt/${prompt.id}`} className="hover:underline font-medium">
                            {prompt.title}
                          </Link>
                        </div>
                      ))}
                    </div>
                    
                    <Link href="#" className="mt-3 text-xs text-primary hover:underline block text-center">
                      View profile
                    </Link>
                  </div>
                ))}
              </div>
            </section>
            
            {/* All Prompts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" />
                  All prompts
                  {selectedCategory && <span className="text-sm font-normal text-muted-foreground">in {selectedCategory}</span>}
                </h2>
              </div>
              
              {/* Use the PromptGrid component for a Pinterest-style masonry layout */}
              <PromptGrid prompts={filteredPrompts.slice(0, 12)} />
              
              {filteredPrompts.length > 12 && (
                <div className="mt-8 text-center">
                  <button className="px-6 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors">
                    Load more
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 