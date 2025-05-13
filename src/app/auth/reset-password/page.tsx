'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { GalleryVerticalEnd, Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '@/actions/auth';

// Componente de carga mientras se resuelve Suspense
function Loading() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Quintero & Associates
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs text-center">
            <p>Cargando...</p>
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

// Componente interno que usa useSearchParams
function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get token from URL
    const urlToken = searchParams?.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      // No token provided, redirect to forgot password page
      toast.error('Invalid or missing reset token');
      router.push('/auth/forgot-password');
    }
  }, [searchParams, router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast.error('Please enter and confirm your new password');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await resetPassword(token, password);
      
      if (result.success) {
        setResetComplete(true);
        toast.success('Your password has been reset successfully');
      } else {
        toast.error(result.error || 'Failed to reset password. The link may have expired.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (resetComplete) {
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
                <h1 className="text-2xl font-bold mb-2">Password Reset Complete</h1>
                <p className="text-gray-600">
                  Your password has been reset successfully. You can now sign in with your new password.
                </p>
              </div>
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
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
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
              <p className="text-gray-600 mt-2">
                Enter your new password below
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 mt-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
            
            <div className="text-center text-sm mt-6">
              <a href="/auth/login" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-4">
                Back to Sign In
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

// Componente principal que envuelve el formulario en Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
