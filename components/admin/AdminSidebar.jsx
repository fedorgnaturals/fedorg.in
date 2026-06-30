'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, PlusCircle, Users, Settings, LogOut, ChevronRight } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/products/add', label: 'Add Product', icon: PlusCircle },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href, exact) => exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-64 shrink-0 bg-gray-900 min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="FEDORG Naturals" width={32} height={32} className="rounded-full object-contain" />
          <span className="font-bold text-white">FED<span className="text-primary-400">ORG</span><span className="text-gray-500 text-xs font-normal ml-1">Admin</span></span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
              <Icon className="w-4 h-4 shrink-0" />{label}
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-800">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <LogOut className="w-4 h-4" />Back to Site
        </Link>
      </div>
    </aside>
  );
}
