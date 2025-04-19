'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  
  // Mock login functions
  const handleGoogleLogin = () => {
    router.push('/home');
  };
  
  const handleGithubLogin = () => {
    router.push('/home');
  };
  
  const handleGuestLogin = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="w-full max-w-md px-8 py-12 rounded-2xl">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-5 rounded-full">
              <span className="text-6xl">🏹</span> 
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">Quiver</h1>
          <p className="text-xl text-gray-300 mb-6">Pinterest for AI Prompts</p>
          <p className="text-gray-400 mb-8">
            Discover, copy, save, and share prompts across text, image, and video models.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin} 
            className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
              </g>
            </svg>
            Continue with Google
          </button>

          <button 
            onClick={handleGithubLogin} 
            className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            <Github size={24} />
            Continue with GitHub
          </button>
          
          <button 
            onClick={handleGuestLogin} 
            className="w-full flex items-center justify-center gap-2 bg-transparent text-white border border-gray-600 px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition-colors mt-2"
          >
            Continue as Guest
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            By continuing, you agree to Quiver's <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
