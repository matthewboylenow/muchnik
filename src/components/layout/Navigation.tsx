'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navigation } from '@/data/navigation';

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Close dropdown when pathname changes (after navigation)
  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let clickedInside = false;
      dropdownRefs.current.forEach((ref) => {
        if (ref && ref.contains(event.target as Node)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent, itemName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenDropdown(openDropdown === itemName ? null : itemName);
    } else if (event.key === 'Escape') {
      setOpenDropdown(null);
    }
  };

  const handleDropdownItemClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const hasChildren = 'children' in item && item.children && item.children.length > 0;

        if (hasChildren) {
          return (
            <div
              key={item.name}
              className="relative"
              ref={(el) => {
                if (el) dropdownRefs.current.set(item.name, el);
              }}
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDropdown(openDropdown === item.name ? null : item.name);
                }}
                onKeyDown={(e) => handleKeyDown(e, item.name)}
                className={cn(
                  'text-base font-medium transition-colors hover:text-gold inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded px-2 py-1',
                  isActive ? 'text-gold' : 'text-navy'
                )}
                aria-expanded={openDropdown === item.name}
                aria-haspopup="true"
              >
                {item.name}
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {openDropdown === item.name && (
                <div
                  className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  role="menu"
                  aria-label={`${item.name} submenu`}
                >
                  {item.children.map((child: { name: string; href: string }) => (
                    <button
                      key={child.href}
                      onClick={() => handleDropdownItemClick(child.href)}
                      className="block w-full text-left px-4 py-3 hover:bg-cream transition-colors focus:outline-none focus:bg-cream focus:ring-2 focus:ring-inset focus:ring-gold"
                      role="menuitem"
                    >
                      <div className="font-medium text-navy text-base hover:text-gold">
                        {child.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'text-base font-medium transition-colors hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded px-2 py-1',
              isActive ? 'text-gold' : 'text-navy'
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
