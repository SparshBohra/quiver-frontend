'use client';

import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Upload, ImageIcon, TextIcon, Save, ChevronDown, X, Plus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const models = [
  { name: 'OpenAI GPT-4', id: 'gpt-4' },
  { name: 'OpenAI GPT-3.5', id: 'gpt-3.5' },
  { name: 'Anthropic Claude 3', id: 'claude-3' },
  { name: 'Anthropic Claude 2', id: 'claude-2' },
  { name: 'Google Gemini', id: 'gemini' },
  { name: 'Mistral Large', id: 'mistral-large' },
  { name: 'Llama 3', id: 'llama-3' },
  { name: 'Midjourney', id: 'midjourney' },
  { name: 'DALL-E 3', id: 'dalle-3' },
  { name: 'Stable Diffusion', id: 'stable-diffusion' },
];

const categories = [
  { name: 'Brainstorming', emoji: '💡' },
  { name: 'Fun', emoji: '🧪' },
  { name: 'Business', emoji: '📈' },
  { name: 'Roleplay', emoji: '🗣️' },
  { name: 'Visual', emoji: '🎨' },
  { name: 'Learning', emoji: '📚' },
  { name: 'Productivity', emoji: '⚡' },
  { name: 'Creative', emoji: '✨' },
  { name: 'Writing', emoji: '✍️' },
  { name: 'Marketing', emoji: '📢' },
  { name: 'Education', emoji: '🎓' },
  { name: 'Gaming', emoji: '🎮' },
  { name: 'Social Media', emoji: '📱' },
  { name: 'Travel', emoji: '✈️' },
  { name: 'Cooking', emoji: '🍳' },
];

export default function CreatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the data to an API
    console.log({
      type: activeTab,
      title,
      content,
      selectedModel,
      selectedTags,
      image
    });
    
    // Navigate to the home page after submission
    router.push('/home');
  };

  return (
    <>
      <Header />
      <main className="flex-grow md:pl-20 pt-20">
        <div className="w-full px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Create Prompt</h1>
              <div className="flex gap-3">
                <button 
                  className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                    activeTab === 'text' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                  onClick={() => setActiveTab('text')}
                >
                  <TextIcon size={18} />
                  Text Prompt
                </button>
                <button 
                  className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                    activeTab === 'image' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                  onClick={() => setActiveTab('image')}
                >
                  <ImageIcon size={18} />
                  Image Prompt
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Left side - Image upload or preview */}
                <div className="md:col-span-2">
                  <div 
                    className={`relative border-2 border-dashed rounded-xl ${
                      isDragging ? 'border-primary bg-primary/5' : 'border-border'
                    } overflow-hidden aspect-square flex flex-col items-center justify-center text-center p-6`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {image ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={image} 
                          alt="Uploaded preview" 
                          fill 
                          className="object-cover rounded-lg"
                        />
                        <button 
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 bg-black/70 rounded-full p-1 text-white hover:bg-black"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 p-3 bg-secondary rounded-full">
                          <Upload size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-base font-medium mb-1">Upload an image</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {activeTab === 'image' 
                            ? 'Share the image generated from your prompt' 
                            : 'Add a visual example to your text prompt'}
                        </p>
                        <label className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium cursor-pointer">
                          Choose file
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="text-xs text-muted-foreground mt-3">
                          Drag and drop or click to upload
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Right side - Prompt details */}
                <div className="md:col-span-3 space-y-5">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="Give your prompt a descriptive title"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="prompt-content" className="block text-sm font-medium mb-1">
                      {activeTab === 'text' ? 'Prompt Content' : 'Prompt Used to Generate This Image'}
                    </label>
                    <textarea
                      id="prompt-content"
                      placeholder={activeTab === 'text' 
                        ? "Enter your prompt content here. Be as detailed as possible."
                        : "Enter the prompt you used to generate this image"
                      }
                      className="w-full px-4 py-3 rounded-lg border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px]"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      AI Model
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none px-4 py-3 rounded-lg border border-border bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                        value={selectedModel}
                        onChange={(e) => handleModelSelect(e.target.value)}
                        required
                      >
                        <option value="" disabled>Select an AI model</option>
                        {models.map(model => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, showMore ? categories.length : 8).map(category => (
                        <button
                          key={category.name}
                          type="button"
                          onClick={() => handleTagToggle(category.name)}
                          className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 ${
                            selectedTags.includes(category.name)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {category.emoji} {category.name}
                        </button>
                      ))}
                      <button 
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="px-3 py-1.5 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1"
                      >
                        {showMore ? 'Show less' : 'Show more'}
                        <ChevronDown size={14} className={`transition-transform ${showMore ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border flex justify-end gap-3">
                <Link 
                  href="/home"
                  className="px-5 py-2.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </Link>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 