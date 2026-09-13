'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu, Globe } from 'lucide-react';
import { Sidebar, type AdminModule } from '@/components/admin/Sidebar';
import { LanguageProvider, LanguageTabs } from '@/components/admin/LanguageTabs';
import { OverviewModule } from '@/components/admin/modules/OverviewModule';
import { SiteModule } from '@/components/admin/modules/SiteModule';
import { HeroModule } from '@/components/admin/modules/HeroModule';
import { AboutModule } from '@/components/admin/modules/AboutModule';
import { ProjectsModule } from '@/components/admin/modules/ProjectsModule';
import { MaterialsModule } from '@/components/admin/modules/MaterialsModule';
import { ServicesModule } from '@/components/admin/modules/ServicesModule';
import { TestimonialsFaqModule } from '@/components/admin/modules/TestimonialsFaqModule';
import { BlogModule } from '@/components/admin/modules/BlogModule';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [activeModule, setActiveModule] = useState<AdminModule>('overview');
  const [collapsed, setCollapsed] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'overview': return <OverviewModule onNavigate={setActiveModule} />;
      case 'site': return <SiteModule />;
      case 'hero': return <HeroModule />;
      case 'about': return <AboutModule />;
      case 'projects': return <ProjectsModule />;
      case 'materials': return <MaterialsModule />;
      case 'services': return <ServicesModule />;
      case 'testimonials': return <TestimonialsFaqModule />;
      case 'blog': return <BlogModule />;
      default: return <OverviewModule onNavigate={setActiveModule} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Sidebar
          active={activeModule}
          onSelect={setActiveModule}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />

        <div
          className="transition-all duration-300"
          style={{ marginLeft: collapsed ? 80 : 256 }}
        >
          {/* Top Bar */}
          <header className="sticky top-0 z-30 glass-strong border-b border-border/50 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-muted-foreground hover:text-gold transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="hidden md:flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 w-64 bg-background/50 border-border/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageTabs />
              <button className="relative text-muted-foreground hover:text-gold transition-colors p-2 rounded-lg hover:bg-white/5">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-border/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/5 border border-gold/30 text-gold text-xs font-bold">
                  N
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-foreground">Admin</p>
                  <p className="text-[10px] text-muted-foreground">Nora Group</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 max-w-[1400px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderModule()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}
