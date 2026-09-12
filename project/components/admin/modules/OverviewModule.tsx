'use client';

import { motion } from 'framer-motion';
import {
  FolderKanban, Layers, Wrench, FileText, MessageSquare,
  Image, Info, Settings, TrendingUp, Eye, CheckCircle2, Clock,
} from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import { GlassCard } from '../shared';
import type { AdminModule } from '../Sidebar';

export function OverviewModule({ onNavigate }: { onNavigate: (m: AdminModule) => void }) {
  const { data } = useAdminData();

  const stats = [
    { label: 'Projects', value: data.projects.length, published: data.projects.filter(p => p.published).length, icon: FolderKanban, module: 'projects' as AdminModule },
    { label: 'Materials', value: data.materials.length, published: data.materials.filter(m => m.published).length, icon: Layers, module: 'materials' as AdminModule },
    { label: 'Services', value: data.services.length, published: data.services.filter(s => s.published).length, icon: Wrench, module: 'services' as AdminModule },
    { label: 'Blog Posts', value: data.blogPosts.length, published: data.blogPosts.filter(b => b.published).length, icon: FileText, module: 'blog' as AdminModule },
    { label: 'Testimonials', value: data.testimonials.length, published: data.testimonials.filter(t => t.published).length, icon: MessageSquare, module: 'testimonials' as AdminModule },
    { label: 'Hero Slides', value: data.heroSlides.length, published: data.heroSlides.filter(h => h.published).length, icon: Image, module: 'hero' as AdminModule },
  ];

  const quickLinks = [
    { label: 'Site Settings', icon: Settings, module: 'site' as AdminModule },
    { label: 'About Us', icon: Info, module: 'about' as AdminModule },
    { label: 'Projects', icon: FolderKanban, module: 'projects' as AdminModule },
    { label: 'Materials', icon: Layers, module: 'materials' as AdminModule },
    { label: 'Services', icon: Wrench, module: 'services' as AdminModule },
    { label: 'Blog', icon: FileText, module: 'blog' as AdminModule },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-playfair), serif' }}>
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground">Welcome to Nora Group admin panel. Manage your luxury carpentry website content.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard hover className="cursor-pointer" >
                <div onClick={() => onNavigate(stat.module)}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 border border-gold/20">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground">{stat.label}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle2 className="h-3 w-3 text-chart-2" />
                    <span className="text-[10px] text-muted-foreground">{stat.published} published</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gold" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.module)}
                  className="flex flex-col items-center gap-2 rounded-lg glass p-4 hover:border-gold/20 hover:bg-gold/5 transition-all"
                >
                  <Icon className="h-6 w-6 text-gold/70" />
                  <span className="text-xs text-muted-foreground">{link.label}</span>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="h-4 w-4 text-gold" />
            Site Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Site Name</span>
              <span className="text-sm font-medium text-foreground">{data.siteSettings.siteName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Navigation Items</span>
              <span className="text-sm font-medium text-foreground">{data.siteSettings.navItems.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Social Links</span>
              <span className="text-sm font-medium text-foreground">{data.siteSettings.socialLinks.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">FAQ Items</span>
              <span className="text-sm font-medium text-foreground">{data.faqs.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Featured Projects</span>
              <span className="text-sm font-medium text-gold">{data.projects.filter(p => p.featured).length}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Last Updated
              </span>
              <span className="text-xs text-foreground">Just now</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
