'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavItem } from '@/lib/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Icons } from '@/components/icons';
import { useSession } from '@/components/auth/session-provider';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from '@/actions/logout';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({ items, setOpen, isMobileNav = false }: DashboardNavProps) {
  const session = useSession();
  const path = usePathname();
  const router = useRouter();
  const { isMinimized } = useSidebar();

  if (!items?.length) return null;

  const showLabel = isMobileNav || (!isMinimized && !isMobileNav);

  const handleLogout = async (formData: FormData) => {
    const result = await logout();
    if (result.success && result.shouldRedirect) {
      router.push('/auth/login');
    } else if (result.error) {
      console.error('Logout failed:', result.error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <nav className="grid items-start gap-2">
        <TooltipProvider>
          {items.map(({ href, disabled, icon, title }) => {
            if (!href) return null;

            const Icon = Icons[icon || 'arrowRight'];
            const linkClasses = cn(
              'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              path === href && 'bg-accent',
              disabled && 'cursor-not-allowed opacity-80'
            );

            return (
              <Tooltip key={href}>
                <TooltipTrigger asChild>
                  <Link href={disabled ? '/' : href} className={linkClasses} onClick={() => setOpen?.(false)}>
                    <Icon className="ml-3 size-5 flex-none" />
                    {showLabel && <span className="mr-2 truncate">{title}</span>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent align="center" side="right" sideOffset={8} className={cn(!isMinimized && 'hidden')}>
                  {title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      {session?.isLoggedIn && (
        <div className="mt-auto pb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <form action={handleLogout}>
                  <button
                    type="submit"
                    className={cn(
                      'flex items-center gap-2 w-full rounded-md mt-12 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      'cursor-pointer'
                    )}
                  >
                    <PowerIcon className="ml-3 w-5 stroke-black dark:stroke-slate-100 stroke-2" />
                    {showLabel && <span className="truncate">Logout</span>}
                  </button>
                </form>
              </TooltipTrigger>
              <TooltipContent align="center" side="right" sideOffset={8} className={cn(!isMinimized && 'hidden')}>
                Logout
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
