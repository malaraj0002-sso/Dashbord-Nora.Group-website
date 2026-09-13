'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderKanban, Plus, Trash2, Star, X } from 'lucide-react';
import { useAdminData } from '@/lib/AdminDataContext';
import { GlassCard, SectionHeader, ImageUpload, FieldLabel, AddButton, DeleteButton, ItemRow, PublishToggle, StatusBadge, FeaturedBadge, EmptyState } from '../shared';
import { LocalizedInput, LanguageTabs } from '../LanguageTabs';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CATEGORIES = ['Residential', 'Commercial', 'Hospitality', 'Retail', 'Custom'];

export function ProjectsModule() {
  const { data, addProject, updateProject, deleteProject } = useAdminData();
  const { projects } = data;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newWoodType, setNewWoodType] = useState('');

  const editingProject = projects.find((p) => p.id === editingId);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Projects Showcase"
        subtitle="Manage project portfolio with images, descriptions, and wood types"
        icon={FolderKanban}
        action={<AddButton onClick={addProject} label="Add Project" />}
      />

      {projects.length === 0 ? (
        <EmptyState icon={FolderKanban} title="No projects yet" description="Add your first project to showcase your work." action={<AddButton onClick={addProject} label="Add Project" />} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard hover className="cursor-pointer group" >
                  <div onClick={() => setEditingId(project.id)}>
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-background/50">
                      {project.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.imageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <FolderKanban className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1.5">
                        <StatusBadge published={project.published} />
                      </div>
                      {project.featured && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-gold/20 text-gold border-gold/30">
                            <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{project.title.en || 'Untitled'}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{project.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.woodTypes.map((wt) => (
                        <Badge key={wt} variant="outline" className="text-[10px] text-gold/70 border-gold/20">{wt}</Badge>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border/50">
          {editingProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                  Edit Project
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <PublishToggle
                      published={editingProject.published}
                      onChange={(v) => updateProject(editingProject.id, { published: v })}
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={editingProject.featured}
                        onCheckedChange={(v) => updateProject(editingProject.id, { featured: v })}
                      />
                      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                        <Star className="h-3 w-3" /> Featured
                      </span>
                    </div>
                  </div>
                  <DeleteButton onClick={() => { deleteProject(editingProject.id); setEditingId(null); }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <ImageUpload
                      value={editingProject.imageUrl}
                      onChange={(url) => updateProject(editingProject.id, { imageUrl: url })}
                      label="Main Image"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <LanguageTabs />
                </div>

                <LocalizedInput
                  value={editingProject.title}
                  onChange={(v) => updateProject(editingProject.id, { title: v })}
                  label="Project Title"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={editingProject.category}
                      onValueChange={(v) => updateProject(editingProject.id, { category: v })}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Completion Date</FieldLabel>
                    <Input
                      type="date"
                      value={editingProject.completedDate}
                      onChange={(e) => updateProject(editingProject.id, { completedDate: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <LocalizedInput
                  value={editingProject.description}
                  onChange={(v) => updateProject(editingProject.id, { description: v })}
                  label="Description"
                  textarea
                />

                <div>
                  <FieldLabel>Wood Types Used</FieldLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editingProject.woodTypes.map((wt) => (
                      <Badge key={wt} className="bg-gold/10 text-gold border border-gold/20">
                        {wt}
                        <button onClick={() => updateProject(editingProject.id, {
                          woodTypes: editingProject.woodTypes.filter((w) => w !== wt),
                        })}>
                          <X className="h-3 w-3 ml-1" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newWoodType}
                      onChange={(e) => setNewWoodType(e.target.value)}
                      placeholder="Add wood type..."
                      className="bg-background/50 h-9"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newWoodType.trim()) {
                          updateProject(editingProject.id, {
                            woodTypes: [...editingProject.woodTypes, newWoodType.trim()],
                          });
                          setNewWoodType('');
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (newWoodType.trim()) {
                          updateProject(editingProject.id, {
                            woodTypes: [...editingProject.woodTypes, newWoodType.trim()],
                          });
                          setNewWoodType('');
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <FieldLabel>Gallery Images</FieldLabel>
                  <div className="grid grid-cols-3 gap-3">
                    {editingProject.galleryImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className="aspect-video rounded-lg overflow-hidden border border-input">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </div>
                        <button
                          onClick={() => updateProject(editingProject.id, {
                            galleryImages: editingProject.galleryImages.filter((_, i) => i !== idx),
                          })}
                          className="absolute top-1 right-1 rounded-full bg-destructive/80 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    ))}
                    <div className="aspect-video rounded-lg border border-dashed border-input flex items-center justify-center">
                      <input
                        type="text"
                        placeholder="Image URL"
                        className="w-full h-full text-center text-[10px] bg-transparent px-1 outline-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            if (target.value.trim()) {
                              updateProject(editingProject.id, {
                                galleryImages: [...editingProject.galleryImages, target.value.trim()],
                              });
                              target.value = '';
                            }
                          }
                        }}
                      />
                    </div>
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
