'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Link2, Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Eye, EyeOff, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import { GlassCard, SectionHeader, ImageUpload, FieldLabel, AddButton, DeleteButton, ReorderButtons, ItemRow } from '../shared';
import { LocalizedInput, LanguageTabs } from '../LanguageTabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function SiteModule() {
  const {
    data, updateSiteSettings,
    addNavItem, updateNavItem, deleteNavItem, reorderNavItems,
    addSocialLink, updateSocialLink, deleteSocialLink,
    addFooterLink, updateFooterLink, deleteFooterLink,
  } = useAdminData();
  const { siteSettings } = data;
  const [tab, setTab] = useState('brand');

  return (
    <div className="space-y-6">
      <SectionHeader title="Site & Navigation Manager" subtitle="Manage logo, brand info, navbar, and footer" icon={Settings} />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted/50 border border-border/50">
          <TabsTrigger value="brand" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">Brand Info</TabsTrigger>
          <TabsTrigger value="nav" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">Navbar Links</TabsTrigger>
          <TabsTrigger value="footer" className="data-[state=active]:bg-gold/10 data-[state=active]:text-gold">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-6">
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Logo & Brand</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ImageUpload
                  value={siteSettings.logoUrl}
                  onChange={(url) => updateSiteSettings({ logoUrl: url })}
                  label="Site Logo"
                />
                {siteSettings.logoUrl && (
                  <div className="mt-3 glass rounded-lg p-4 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={siteSettings.logoUrl} alt="Logo" className="h-12 w-auto" />
                    <span className="text-xs text-muted-foreground">Logo preview</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <FieldLabel>Site Name</FieldLabel>
                  <Input
                    value={siteSettings.siteName}
                    onChange={(e) => updateSiteSettings({ siteName: e.target.value })}
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <FieldLabel>Tagline</FieldLabel>
                    <LanguageTabs />
                  </div>
                  <LocalizedInput
                    value={siteSettings.tagline}
                    onChange={(v) => updateSiteSettings({ tagline: v })}
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel><span className="flex items-center gap-1"><Mail className="h-3 w-3" /> Email</span></FieldLabel>
                <Input
                  value={siteSettings.contactEmail}
                  onChange={(e) => updateSiteSettings({ contactEmail: e.target.value })}
                  className="bg-background/50"
                />
              </div>
              <div>
                <FieldLabel><span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Phone</span></FieldLabel>
                <Input
                  value={siteSettings.contactPhone}
                  onChange={(e) => updateSiteSettings({ contactPhone: e.target.value })}
                  className="bg-background/50"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <FieldLabel><span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</span></FieldLabel>
                  <LanguageTabs />
                </div>
                <LocalizedInput
                  value={siteSettings.contactAddress}
                  onChange={(v) => updateSiteSettings({ contactAddress: v })}
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="nav" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{siteSettings.navItems.length} navigation items</p>
            <AddButton onClick={addNavItem} label="Add Nav Item" />
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {[...siteSettings.navItems].sort((a, b) => a.order - b.order).map((item) => (
                <ItemRow key={item.id}>
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground/40" />
                    <ReorderButtons onUp={() => reorderNavItems(item.id, 'up')} onDown={() => reorderNavItems(item.id, 'down')} />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-muted-foreground">Label</span>
                          <LanguageTabs />
                        </div>
                        <LocalizedInput
                          value={item.label}
                          onChange={(v) => updateNavItem(item.id, { label: v })}
                        />
                      </div>
                      <div>
                        <FieldLabel>Link URL</FieldLabel>
                        <Input
                          value={item.href}
                          onChange={(e) => updateNavItem(item.id, { href: e.target.value })}
                          className="bg-background/50 h-10"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <Switch
                          checked={item.visible}
                          onCheckedChange={(v) => updateNavItem(item.id, { visible: v })}
                        />
                        {item.visible ? <Eye className="h-3 w-3 text-gold" /> : <EyeOff className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <DeleteButton onClick={() => deleteNavItem(item.id)} />
                    </div>
                  </div>
                </ItemRow>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="footer" className="space-y-6">
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Copyright Text</h3>
            <div className="flex items-center justify-between mb-1.5">
              <FieldLabel>Copyright</FieldLabel>
              <LanguageTabs />
            </div>
            <LocalizedInput
              value={siteSettings.footerCopyright}
              onChange={(v) => updateSiteSettings({ footerCopyright: v })}
            />
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Footer Links</h3>
              <AddButton onClick={addFooterLink} label="Add Link" />
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {siteSettings.footerLinks.map((link) => (
                  <ItemRow key={link.id}>
                    <div className="flex items-center gap-3">
                      <Link2 className="h-4 w-4 text-gold/50" />
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-muted-foreground">Label</span>
                            <LanguageTabs />
                          </div>
                          <LocalizedInput
                            value={link.label}
                            onChange={(v) => updateFooterLink(link.id, { label: v })}
                          />
                        </div>
                        <div>
                          <FieldLabel>Link URL</FieldLabel>
                          <Input
                            value={link.href}
                            onChange={(e) => updateFooterLink(link.id, { href: e.target.value })}
                            className="bg-background/50 h-10"
                          />
                        </div>
                      </div>
                      <DeleteButton onClick={() => deleteFooterLink(link.id)} />
                    </div>
                  </ItemRow>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4 text-gold" /> Social Links
              </h3>
              <AddButton onClick={addSocialLink} label="Add Social" />
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {siteSettings.socialLinks.map((social) => (
                  <ItemRow key={social.id}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 border border-gold/20">
                        <Globe className="h-4 w-4 text-gold" />
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <FieldLabel>Platform</FieldLabel>
                          <Input
                            value={social.platform}
                            onChange={(e) => updateSocialLink(social.id, { platform: e.target.value })}
                            className="bg-background/50 h-10"
                            placeholder="Instagram"
                          />
                        </div>
                        <div>
                          <FieldLabel>URL</FieldLabel>
                          <Input
                            value={social.url}
                            onChange={(e) => updateSocialLink(social.id, { url: e.target.value })}
                            className="bg-background/50 h-10"
                            placeholder="https://..."
                          />
                        </div>
                      </div>
                      <DeleteButton onClick={() => deleteSocialLink(social.id)} />
                    </div>
                  </ItemRow>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
