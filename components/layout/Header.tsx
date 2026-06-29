'use client';

import { useAuthor } from '@/context/AuthorContext';
import { Menu, Moon, Sun, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const { author } = useAuthor();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{author.name}</p>
            <p className="text-xs text-gray-500">{author.role}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {author.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
