'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Copy, Heart, BookmarkIcon } from 'lucide-react';

type Tag = {
  id: string;
  name: string;
  color?: string;
};

type PromptCardProps = {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
  emoji?: string;
  creatorName?: string;
  creatorAvatar?: string;
  likes?: number;
  copies?: number;
  height?: 'short' | 'medium' | 'tall'; // Used to force a certain height
};

export function PromptCard({
  id,
  title,
  content,
  tags,
  emoji = '💡',
  creatorName,
  creatorAvatar,
  likes = 0,
  copies = 0,
  height,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Filter out model-specific tags like GPT-4, Claude, etc.
  const filteredTags = tags.filter((tag) => 
    !tag.name.includes('GPT') && 
    !tag.name.includes('Claude') && 
    !tag.name.toLowerCase().includes('midjourney') && 
    !tag.name.toLowerCase().includes('dall-e')
  );

  // Determine card height based on content length or forced height
  const cardHeightClass = useMemo(() => {
    // If height is explicitly provided, use it
    if (height) return height;
    
    // Otherwise determine height based on content length
    const contentLength = content.length;
    if (contentLength < 200) return 'short';
    if (contentLength < 500) return 'medium';
    return 'tall';
  }, [content.length, height]);

  // Check if content is very long (for fade effect)
  const isLongContent = content.length > 650;
  
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <div className={`prompt-card ${cardHeightClass} ${isLongContent ? 'long-content' : ''}`}>
      <Link href={`/prompt/${id}`} className="block cursor-pointer">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-xl flex-shrink-0">{emoji}</span>
          <h3 className="prompt-card-title">{title}</h3>
        </div>

        {filteredTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {filteredTags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <p className="prompt-card-content mb-3">
          {content}
        </p>
      </Link>

      <div className="mt-auto">
        {creatorName && (
          <div className="flex items-center gap-2 mb-2">
            {(creatorAvatar && !creatorAvatar.includes('placeholder')) ? (
              <Image
                src={creatorAvatar}
                alt={creatorName}
                width={20}
                height={20}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                {creatorName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xs text-muted-foreground">{creatorName}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-1 rounded-full ${
                liked
                  ? 'text-red-500'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Like prompt"
            >
              <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={handleSave}
              className={`p-1 rounded-full ${
                saved
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Save prompt"
            >
              <BookmarkIcon size={14} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <button
            onClick={copyToClipboard}
            className={`copy-button ${copied ? 'copy-button-copied' : 'copy-button-default'}`}
          >
            <Copy size={14} />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 