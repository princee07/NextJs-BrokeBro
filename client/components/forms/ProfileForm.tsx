"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ProfileForm({ user, onUpdate }: { user: any, onUpdate: (formData: FormData) => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    await onUpdate(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-white">Profile Information</h3>
        <p className="text-gray-400">Update your account's profile information and email address.</p>
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="given_name" className="block text-sm font-medium text-gray-300">
            First name
          </label>
          <div className="mt-1">
            <Input
              type="text"
              name="given_name"
              id="given_name"
              defaultValue={user?.given_name || ''}
              className="block w-full"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="family_name" className="block text-sm font-medium text-gray-300">
            Last name
          </label>
          <div className="mt-1">
            <Input
              type="text"
              name="family_name"
              id="family_name"
              defaultValue={user?.family_name || ''}
              className="block w-full"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <div className="mt-1">
            <Input
              type="email"
              name="email"
              id="email"
              defaultValue={user?.email || ''}
              disabled
              className="block w-full disabled:bg-gray-800 disabled:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
