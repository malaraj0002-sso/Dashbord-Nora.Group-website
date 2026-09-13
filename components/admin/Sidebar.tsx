'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, Settings, Image, Info, FolderKanban, Layers,
  Wrench, MessageSquare, HelpCircle, FileText, Hammer, ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminData } from '@/lib/AdminDataContext';

export type AdminModule =
  | 'overview'
  | 'site'
  | 'hero'
  | 'about'
  | 'projects'
  | 'materials'
  | 'services'
  | 'testimonials'
  | 'blog';

const NAV_ITEMS: { id: AdminModule; label: string; labelAr: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Overview', labelAr: 'نظرة عامة', icon: LayoutDashboard },
  { id: 'site', label: 'Site & Navigation', labelAr: 'الموقع والتنقل', icon: Settings },
  { id: 'hero', label: 'Hero & Slider', labelAr: 'الواجهة والشرائح', icon: Image },
  { id: 'about', label: 'About Us', labelAr: 'من نحن', icon: Info },
  { id: 'projects', label: 'Projects', labelAr: 'المشاريع', icon: FolderKanban },
  { id: 'materials', label: 'Materials & Finishes', labelAr: 'المواد والتشطيبات', icon: Layers },
  { id: 'services', label: 'Services & Craft', labelAr: 'الخدمات والحرف', icon: Wrench },
  { id: 'testimonials', label: 'Testimonials & FAQ', labelAr: 'الآراء والأسئلة', icon: MessageSquare },
  { id: 'blog', label: 'Blog Manager', labelAr: 'المدونة', icon: FileText },
];

export function Sidebar({
  active,
  onSelect,
  collapsed,
  onToggleCollapse,
}: {
  active: AdminModule;
  onSelect: (id: AdminModule) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const { data } = useAdminData();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen glass-strong border-r border-border/50 transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 px-4 py-6 border-b border-border/50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30">
            <Hammer className="h-5 w-5 text-gold" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-foreground whitespace-nowrap" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {data.siteSettings.siteName}
              </h1>
              <p className="text-[10px] text-gold/70 whitespace-nowrap">Admin Dashboard</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto luxury-scroll px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all w-full',
                  isActive
                    ? 'text-gold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-gold/10 border border-gold/20"
                    transition={{ type: 'spring', duration: 0.3 }}
                  />
                )}
                <Icon className="h-5 w-5 shrink-0 relative z-10" />
                {!collapsed && <span className="relative z-10 whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-border/50 p-3">
          <button
            onClick={onToggleCollapse}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-gold transition-colors w-full"
          >
            <ChevronLeft className={cn('h-4 w-4 shrink-0 transition-transform', collapsed && 'rotate-180')} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
