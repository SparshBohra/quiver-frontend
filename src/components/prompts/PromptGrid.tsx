'use client';

import { PromptCard } from './PromptCard';
import { mockPrompts, Prompt } from '@/data/mockPrompts';

interface PromptGridProps {
  prompts?: Prompt[];
}

export function PromptGrid({ prompts = mockPrompts }: PromptGridProps) {
  // Shuffle prompts to create visual interest
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Force some height variations for better visual rhythm
  const assignForcedHeights = (prompts: Prompt[]): Array<Prompt & { forcedHeight?: 'short' | 'medium' | 'tall' }> => {
    // Sort by content length to get a mix of long and short
    const sortedPrompts = [...prompts].sort((a, b) => a.content.length - b.content.length);
    
    // Assign heights to create visual rhythm
    // Force some cards to specific heights for better column balance
    const result = sortedPrompts.map((prompt, index) => {
      // First 20% of cards (shortest) should be forced short
      if (index < prompts.length * 0.2) {
        return { ...prompt, forcedHeight: 'short' as const };
      }
      
      // Last 20% of cards (longest) should be forced tall
      if (index > prompts.length * 0.8) {
        return { ...prompt, forcedHeight: 'tall' as const };
      }
      
      // The middle should be a mix - assigned by content length naturally
      return prompt;
    });
    
    // Shuffle the result to distribute heights
    return shuffleArray(result);
  };

  // Prepare prompts with forced heights where needed for better visual balance
  const processedPrompts = assignForcedHeights(prompts);

  return (
    <div className="masonry-grid">
      {processedPrompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          id={prompt.id}
          title={prompt.title}
          content={prompt.content}
          tags={prompt.tags}
          emoji={prompt.emoji}
          creatorName={prompt.creatorName}
          creatorAvatar={prompt.creatorAvatar}
          likes={prompt.likes}
          copies={prompt.copies}
          height={prompt.forcedHeight}
        />
      ))}
    </div>
  );
} 