'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GalleryVerticalEnd } from 'lucide-react';
import { forgotPassword } from '@/actions/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await forgotPassword(email);
      
      if (result.success) {
        setEmailSent(true);
        toast.success('If your email exists in our system, you will receive reset instructions shortly');
      } else {
        toast.error(result.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Quintero & Associates
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                <p className="text-gray-600">
                  We've sent password reset instructions to {email}. Please check your inbox.
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => router.push('/auth/login')}
                  className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
                >
                  Return to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <div className="absolute inset-0 h-full w-full bg-black">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-3xl font-bold text-white">Quintero & Associates</h1>
              <p className="text-white">Solutions for your business</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Quintero & Associates
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Forgot Password?</h1>
              <p className="text-gray-600 mt-2">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>
            
            <div className="text-center text-sm mt-6">
              Remember your password?{" "}
              <a href="/auth/login" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 h-full w-full bg-black">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold text-white">Quintero & Associates</h1>
            <p className="text-white">Solutions for your business</p>
          </div>
        </div>
      </div>
    </div>
  );
}
