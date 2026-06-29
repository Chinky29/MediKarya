'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, FileText, Plus, Folder, User, HeartPulse } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/cases', icon: FileText, label: 'All Cases' },
  { href: '/cases/new', icon: Plus, label: 'New Case' },
  { href: '/templates', icon: Folder, label: 'Templates' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <HeartPulse className="h-8 w-8 text-primary" />
        <span className="ml-3 text-xl font-bold text-primary">MediKarya</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
