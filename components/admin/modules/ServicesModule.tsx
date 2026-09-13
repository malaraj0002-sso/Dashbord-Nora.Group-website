'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Plus, Trash2, GripVertical, Armchair, Home, DoorOpen, Hammer, PaintRoller, Ruler } from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import { GlassCard, SectionHeader, ImageUpload, FieldLabel, AddButton, DeleteButton, ItemRow, PublishToggle, StatusBadge, EmptyState } from '../shared';
import { LocalizedInput, LanguageTabs } from '../LanguageTabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ICON_OPTIONS = [
  { value: 'armchair', label: 'Armchair', icon: Armchair },
  { value: 'home', label: 'Home', icon: Home },
  { value: 'door-open', label: 'Door', icon: DoorOpen },
  { value: 'hammer', label: 'Hammer', icon: Hammer },
  { value: 'paint-roller', label: 'Paint Roller', icon: PaintRoller },
  { value: 'ruler', label: 'Ruler', icon: Ruler },
];

function getIcon(name: string) {
  return ICON_OPTIONS.find((o) => o.value === name)?.icon || Wrench;
}

export function ServicesModule() {
  const {
    data, addService, updateService, deleteService,
    addServiceStep, updateServiceStep, deleteServiceStep,
  } = useAdminData();
  const { services } = data;
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingService = services.find((s) => s.id === editingId);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Services & Craftsmanship"
        subtitle="Manage service list, icons, images, and process steps"
        icon={Wrench}
        action={<AddButton onClick={addService} label="Add Service" />}
      />

      {services.length === 0 ? (
        <EmptyState icon={Wrench} title="No services yet" description="Add your first service to showcase your craftsmanship." action={<AddButton onClick={addService} label="Add Service" />} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {services.map((svc) => {
              const Icon = getIcon(svc.icon);
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard hover className="cursor-pointer group" >
                    <div onClick={() => setEditingId(svc.id)}>
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-background/50">
                        {svc.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={svc.imageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Icon className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <StatusBadge published={svc.published} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gold/10 border border-gold/20">
                          <Icon className="h-3.5 w-3.5 text-gold" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{svc.title.en || 'Untitled'}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{svc.description.en}</p>
                      <p className="text-[10px] text-gold/60 mt-2">{svc.steps.length} process steps</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
          {editingService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Edit Service
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <PublishToggle
                    published={editingService.published}
                    onChange={(v) => updateService(editingService.id, { published: v })}
                  />
                  <DeleteButton onClick={() => { deleteService(editingService.id); setEditingId(null); }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUpload
                    value={editingService.imageUrl}
                    onChange={(url) => updateService(editingService.id, { imageUrl: url })}
                    label="Service Image"
                  />
                  <div>
                    <FieldLabel>Icon</FieldLabel>
                    <Select
                      value={editingService.icon}
                      onValueChange={(v) => updateService(editingService.id, { icon: v })}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((opt) => {
                          const OptIcon = opt.icon;
                          return (
                            <SelectItem key={opt.value} value={opt.value}>
                              <div className="flex items-center gap-2">
                                <OptIcon className="h-4 w-4" /> {opt.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <LanguageTabs />
                </div>

                <LocalizedInput
                  value={editingService.title}
                  onChange={(v) => updateService(editingService.id, { title: v })}
                  label="Service Title"
                />

                <LocalizedInput
                  value={editingService.description}
                  onChange={(v) => updateService(editingService.id, { description: v })}
                  label="Description"
                  textarea
                />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-foreground">Process Steps (How We Work)</h4>
                    <Button
                      onClick={() => addServiceStep(editingService.id)}
                      variant="outline"
                      size="sm"
                      className="border-gold/20 text-gold hover:bg-gold/10"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Step
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {editingService.steps.map((step, idx) => (
                        <ItemRow key={step.id}>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 border border-gold/30 text-xs font-bold text-gold">
                                  {idx + 1}
                                </div>
                                <span className="text-xs text-muted-foreground">Step {idx + 1}</span>
                              </div>
                              <DeleteButton onClick={() => deleteServiceStep(editingService.id, step.id)} className="h-7 w-7" />
                            </div>
                            <div className="flex items-center justify-end">
                              <LanguageTabs />
                            </div>
                            <LocalizedInput
                              value={step.title}
                              onChange={(v) => updateServiceStep(editingService.id, step.id, { title: v })}
                              label="Step Title"
                            />
                            <LocalizedInput
                              value={step.description}
                              onChange={(v) => updateServiceStep(editingService.id, step.id, { description: v })}
                              label="Step Description"
                              textarea
                            />
                          </div>
                        </ItemRow>
                      ))}
                    </AnimatePresence>
                    {editingService.steps.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-4">No process steps yet. Add one to describe how this service works.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
