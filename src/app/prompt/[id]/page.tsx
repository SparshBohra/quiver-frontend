'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockPrompts } from '@/data/mockPrompts';
import { Bookmark, BookmarkIcon, Copy, Heart, Share, ArrowLeft, MessageSquare, Tag, AlertCircle, MoreHorizontal } from 'lucide-react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PromptPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  // Find the prompt by ID
  const prompt = mockPrompts.find(p => p.id === params.id) || mockPrompts[0];
  
  // Sample similar prompts
  const relatedPrompts = mockPrompts
    .filter(p => p.id !== prompt.id)
    .slice(0, 3);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="flex-grow md:pl-20 pt-20">
        <div className="w-full px-6 py-8">
          <div className="max-w-4xl mx-auto mb-16">
            {/* Back button */}
            <div className="mb-6">
              <Link 
                href="/home"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to prompts
              </Link>
            </div>
            
            {/* Main content card */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Prompt header */}
              <div className="p-6 md:p-8 border-b border-border">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold">{prompt.title}</h1>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="p-2 rounded-full hover:bg-secondary"
                    >
                      <Share size={20} />
                    </button>
                    
                    <div className="relative">
                      <button className="p-2 rounded-full hover:bg-secondary">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Creator info */}
                <div className="flex items-center gap-3 mb-6">
                  {prompt.creatorAvatar ? (
                    <Image 
                      src={prompt.creatorAvatar} 
                      alt={prompt.creatorName || 'Creator'} 
                      width={36} 
                      height={36} 
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                      {prompt.creatorName?.charAt(0) || 'A'}
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{prompt.creatorName || 'Anonymous'}</div>
                    <div className="text-xs text-muted-foreground">June 12, 2023</div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {prompt.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/explore?tag=${tag.name}`}
                      className="bg-secondary/50 text-xs rounded-md px-2 py-1 hover:bg-secondary"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Copy size={15} />
                    <span>{prompt.copies || 0} copies</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart size={15} />
                    <span>{prompt.likes || 0} likes</span>
                  </div>
                </div>
              </div>
              
              {/* Prompt content */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-sm font-medium flex items-center gap-2">
                      <Tag size={16} />
                      Prompt
                    </h2>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-lg p-4 md:p-6 relative break-words whitespace-pre-wrap">
                    {prompt.content}
                    
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-4 right-4 p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      {copied ? (
                        <span className="text-xs font-medium">Copied!</span>
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Tips */}
                <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Tips for using this prompt</h3>
                      <p className="text-sm text-muted-foreground">
                        For best results, copy the entire prompt and paste it into your preferred AI tool. You may need to adjust parts of the prompt based on your specific needs.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Copy size={18} />
                    {copied ? 'Copied!' : 'Copy prompt'}
                  </button>
                  
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      liked 
                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <Heart size={18} className={liked ? 'fill-red-500' : ''} />
                    {liked ? 'Liked' : 'Like'}
                  </button>
                  
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                      saved 
                        ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {saved ? (
                      <>
                        <BookmarkIcon size={18} className="fill-primary" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark size={18} />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Similar prompts */}
            {relatedPrompts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-xl font-semibold mb-6">Similar prompts you might like</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPrompts.map(relatedPrompt => (
                    <Link 
                      key={relatedPrompt.id}
                      href={`/prompt/${relatedPrompt.id}`}
                      className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-medium mb-2">{relatedPrompt.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {relatedPrompt.content}
                      </p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <div>{relatedPrompt.creatorName || 'Anonymous'}</div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Copy size={12} />
                            {relatedPrompt.copies || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart size={12} />
                            {relatedPrompt.likes || 0}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
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